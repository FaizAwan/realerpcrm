import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;
    const id = parseInt(params.id);

    try {
        const body = await req.json();
        
        const where: any = { id };
        if (role !== "superadmin") {
            where.tenantId = tenantId;
        }

        const existing = await db.financeEntry.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Finance entry not found" }, { status: 404 });

        const updated = await db.financeEntry.update({
            where,
            data: {
                type: body.type || existing.type,
                amount: body.amount ? parseFloat(body.amount) : existing.amount,
                category: body.category !== undefined ? body.category : existing.category,
                description: body.description !== undefined ? body.description : existing.description,
                date: body.date ? new Date(body.date) : existing.date
            }
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update finance error:", error);
        return NextResponse.json({ error: "Failed to update finance entry" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;
    const id = parseInt(params.id);

    try {
        const where: any = { id };
        if (role !== "superadmin") {
            where.tenantId = tenantId;
        }

        const existing = await db.financeEntry.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Finance entry not found" }, { status: 404 });

        await db.financeEntry.delete({ where });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Delete finance error:", error);
        return NextResponse.json({ error: "Failed to delete finance entry" }, { status: 500 });
    }
}
