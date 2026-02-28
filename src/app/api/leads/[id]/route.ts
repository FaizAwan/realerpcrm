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

        const existing = await db.lead.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

        const updated = await db.lead.update({
            where,
            data: {
                name: body.name || existing.name,
                phone: body.phone !== undefined ? body.phone : existing.phone,
                email: body.email !== undefined ? body.email : existing.email,
                source: body.source || existing.source,
                status: body.status || existing.status,
                assignedTo: body.assignedTo !== undefined ? body.assignedTo : existing.assignedTo
            }
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update lead error:", error);
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
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

        const existing = await db.lead.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

        await db.lead.delete({ where });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Delete lead error:", error);
        return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
    }
}
