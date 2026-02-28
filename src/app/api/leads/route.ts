import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = session.user as any;
        const where: any = {};
        if (user.role !== "superadmin") where.tenantId = user.tenantId;

        const leads = await db.lead.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = session.user as any;
        const tenantId = user.tenantId;
        if (!tenantId) return NextResponse.json({ error: "Tenant ID required" }, { status: 400 });

        const body = await req.json();

        const lead = await db.lead.create({
            data: {
                tenantId,
                name: body.name,
                phone: body.phone,
                email: body.email,
                source: body.source,
                status: body.status,
                priority: body.priority || "Medium",
                notes: body.notes,
                assignedTo: body.assignedTo ? parseInt(body.assignedTo) : null,
            }
        });

        return NextResponse.json(lead);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = session.user as any;
        const body = await req.json();
        const { id, ...data } = body;

        const lead = await db.lead.update({
            where: {
                id: parseInt(id),
                tenantId: user.role !== "superadmin" ? user.tenantId : undefined
            },
            data: {
                ...data,
                assignedTo: data.assignedTo ? parseInt(data.assignedTo) : null
            }
        });

        return NextResponse.json(lead);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = session.user as any;
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await db.lead.delete({
            where: {
                id: parseInt(id),
                tenantId: user.role !== "superadmin" ? user.tenantId : undefined
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
    }
}
