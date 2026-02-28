import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
        }

        const user = session.user as any;
        const tenantId = user.tenantId;
        const role = user.role;

        const { searchParams } = new URL(req.url);
        const unitId = searchParams.get('unitId');

        const where: any = {};
        if (role !== "superadmin") {
            if (!tenantId) {
                return NextResponse.json({ error: "Tenant ID not found" }, { status: 403 });
            }
            where.tenantId = tenantId;
        }
        
        if (unitId) {
            where.unitId = parseInt(unitId);
        }

        const payments = await db.rentPayment.findMany({
            where,
            include: {
                unit: true
            },
            orderBy: {
                paymentDate: 'desc'
            }
        });

        return NextResponse.json(payments);
    } catch (error) {
        console.error("Rent Payments GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
        }

        const user = session.user as any;
        const tenantId = user.tenantId;

        if (!tenantId) {
            return NextResponse.json({ error: "Tenant ID is required" }, { status: 403 });
        }

        const body = await req.json();

        if (!body.unitId || !body.amount || !body.month) {
            return NextResponse.json({ error: "Unit ID, amount, and month are required" }, { status: 400 });
        }

        const payment = await db.rentPayment.create({
            data: {
                unitId: parseInt(body.unitId),
                tenantId: tenantId,
                amount: parseFloat(body.amount),
                month: body.month,
                status: body.status || "paid"
            }
        });

        // Also add a finance entry for the rental income
        await db.financeEntry.create({
            data: {
                tenantId: tenantId,
                type: 'income',
                amount: parseFloat(body.amount),
                category: 'Rental Income',
                description: `Rent payment for unit ID ${body.unitId} for ${body.month}`
            }
        });

        return NextResponse.json(payment);
    } catch (error) {
        console.error("Rent Payments POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
