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

        const items = await db.invoice.findMany({
            where,
            include: { items: true },
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const body = await req.json();
    const { invoiceNumber, customerName, customerEmail, customerPhone, amount, dueDate, date, items } = body;

    try {
        const result = await db.$transaction(async (tx) => {
            // 1. Create Invoice
            const invoice = await tx.invoice.create({
                data: {
                    tenantId,
                    invoiceNumber,
                    customerName,
                    customerEmail,
                    customerPhone,
                    amount: parseFloat(amount),
                    dueDate: dueDate ? new Date(dueDate) : null,
                    date: date ? new Date(date) : new Date(),
                    status: "pending",
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

            // 2. Update Inventory (Deduct on Sales)
            for (const item of items) {
                if (item.storeItemId) {
                    await tx.storeItem.update({
                        where: { id: item.storeItemId, tenantId },
                        data: {
                            quantity: { decrement: parseInt(item.quantity) }
                        }
                    });
                    
                    // Optional: Track in Product and StockLog if those models are used
                    // For simplicity and since StoreItem is tenant-aware, we use StoreItem.
                }
            }

            // 3. Accounting Integration (Ledger)
            // Best practice: Debit Accounts Receivable, Credit Sales Revenue
            
            // Find or create accounts
            let arAccount = await tx.chartOfAccount.findFirst({
                where: { tenantId, name: { contains: "Accounts Receivable" } }
            });
            if (!arAccount) {
                arAccount = await tx.chartOfAccount.create({
                    data: { tenantId, name: "Accounts Receivable", code: "1200", type: "Asset", category: "Current Asset" }
                });
            }

            let salesAccount = await tx.chartOfAccount.findFirst({
                where: { tenantId, name: { contains: "Sales Revenue" } }
            });
            if (!salesAccount) {
                salesAccount = await tx.chartOfAccount.create({
                    data: { tenantId, name: "Sales Revenue", code: "4000", type: "Revenue", category: "Operating Revenue" }
                });
            }

            // Create Journal
            await tx.journal.create({
                data: {
                    tenantId,
                    entryNumber: `INV-ENTRY-${invoice.invoiceNumber}`,
                    date: new Date(),
                    description: `Invoice ${invoice.invoiceNumber} - ${customerName}`,
                    debit: parseFloat(amount),
                    credit: parseFloat(amount),
                    account: "AR / Revenue",
                }
            });

            // Create Ledger Entries
            await tx.ledger.create({
                data: {
                    tenantId,
                    accountId: arAccount.id,
                    date: new Date(),
                    description: `Sale to ${customerName} (Inv: ${invoice.invoiceNumber})`,
                    debit: parseFloat(amount),
                    credit: 0,
                    balance: parseFloat(amount), // This is a simplification; normally it adds to existing balance
                    reference: invoice.invoiceNumber
                }
            });

            await tx.ledger.create({
                data: {
                    tenantId,
                    accountId: salesAccount.id,
                    date: new Date(),
                    description: `Sale to ${customerName} (Inv: ${invoice.invoiceNumber})`,
                    debit: 0,
                    credit: parseFloat(amount),
                    balance: parseFloat(amount),
                    reference: invoice.invoiceNumber
                }
            });

            return invoice;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Invoice Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
