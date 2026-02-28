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

        const where: any = {};
        if (role !== "superadmin") {
            if (!tenantId) {
                return NextResponse.json({ error: "Tenant ID not found" }, { status: 403 });
            }
            where.tenantId = tenantId;
        }

        const financeEntries = await db.financeEntry.findMany({
            where
        });
        
        return NextResponse.json(financeEntries);
    } catch (error) {
        console.error("Finance GET error:", error);
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
        const role = user.role;

        if (!tenantId) {
            return NextResponse.json({ error: "Tenant ID is required" }, { status: 403 });
        }

        const body = await req.json();
        
        if (!body.type || !body.amount) {
            return NextResponse.json({ error: "Type and amount are required" }, { status: 400 });
        }

        const entry = await db.financeEntry.create({
            data: {
                type: body.type,
                amount: parseFloat(body.amount),
                category: body.category || null,
                description: body.description || null,
                date: body.date ? new Date(body.date) : new Date(),
                tenantId: tenantId
            }
        });
        
        return NextResponse.json(entry);
    } catch (error) {
        console.error("Finance POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
