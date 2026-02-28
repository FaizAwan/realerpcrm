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

        const existing = await db.task.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });

        const updated = await db.task.update({
            where,
            data: {
                title: body.title || existing.title,
                description: body.description !== undefined ? body.description : existing.description,
                assignedTo: body.assignedTo !== undefined ? body.assignedTo : existing.assignedTo,
                dueDate: body.dueDate ? new Date(body.dueDate) : (existing.dueDate),
                status: body.status || existing.status
            }
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update task error:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
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

        const existing = await db.task.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });

        await db.task.delete({ where });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Delete task error:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
