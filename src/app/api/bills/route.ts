import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;

    try {
        const where: any = {};
        if (role !== "superadmin") {
            where.tenantId = tenantId;
        }

        const items = await db.bill.findMany({
            where,
            include: { items: true },
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch bills" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const body = await req.json();
    const { billNumber, supplierId, amount, dueDate, items } = body;

    try {
        const result = await db.$transaction(async (tx) => {
            // 1. Create Bill
            const bill = await tx.bill.create({
                data: {
                    tenantId,
                    billNumber,
                    supplierId: parseInt(supplierId),
                    amount: parseFloat(amount),
                    dueDate: new Date(dueDate),
                    status: "unpaid",
                    items: {
                        create: items.map((item: any) => ({
                            storeItemId: item.storeItemId || null,
                            description: item.description,
                            quantity: parseInt(item.quantity),
                            price: parseFloat(item.price),
                            total: parseFloat(item.total),
                        }))
                    }
                },
                include: { items: true }
            });

            // 2. Update Inventory (Add on Purchase)
            for (const item of items) {
                if (item.storeItemId) {
                    await tx.storeItem.update({
                        where: { id: item.storeItemId, tenantId },
                        data: {
                            quantity: { increment: parseInt(item.quantity) }
                        }
                    });
                }
            }

            // 3. Accounting Integration (Ledger)
            // Best practice: Debit Inventory/Expense, Credit Accounts Payable

            // Find or create accounts
            let apAccount = await tx.chartOfAccount.findFirst({
                where: { tenantId, name: { contains: "Accounts Payable" } }
            });
            if (!apAccount) {
                apAccount = await tx.chartOfAccount.create({
                    data: { tenantId, name: "Accounts Payable", code: "2100", type: "Liability", category: "Current Liability" }
                });
            }

            let inventoryAccount = await tx.chartOfAccount.findFirst({
                where: { tenantId, name: { contains: "Inventory" } }
            });
            if (!inventoryAccount) {
                inventoryAccount = await tx.chartOfAccount.create({
                    data: { tenantId, name: "Inventory", code: "103-001", type: "Asset", category: "Current Asset" }
                });
            }

            // Create Journal
            await tx.journal.create({
                data: {
                    tenantId,
                    entryNumber: `BILL-ENTRY-${bill.billNumber}`,
                    date: new Date(),
                    description: `Bill ${bill.billNumber} from Supplier`,
                    debit: parseFloat(amount),
                    credit: parseFloat(amount),
                    account: "Inventory / AP",
                }
            });

            // Create Ledger Entries
            await tx.ledger.create({
                data: {
                    tenantId,
                    accountId: inventoryAccount.id,
                    date: new Date(),
                    description: `Purchase for Bill: ${bill.billNumber}`,
                    debit: parseFloat(amount),
                    credit: 0,
                    balance: parseFloat(amount),
                    reference: bill.billNumber
                }
            });

            await tx.ledger.create({
                data: {
                    tenantId,
                    accountId: apAccount.id,
                    date: new Date(),
                    description: `Purchase for Bill: ${bill.billNumber}`,
                    debit: 0,
                    credit: parseFloat(amount),
                    balance: parseFloat(amount),
                    reference: bill.billNumber
                }
            });

            return bill;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Bill Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
