import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
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

        const project = await db.project.findUnique({
            where,
            include: {
                units: true
            }
        });

        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

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

        const existing = await db.project.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Project not found" }, { status: 404 });

        const updated = await db.project.update({
            where,
            data: {
                name: body.name || existing.name,
                type: body.type || existing.type,
                location: body.location !== undefined ? body.location : existing.location,
                description: body.description !== undefined ? body.description : existing.description
            }
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update project error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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

        const existing = await db.project.findUnique({ where });
        if (!existing) return NextResponse.json({ error: "Project not found" }, { status: 404 });

        await db.project.delete({ where });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Delete project error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
