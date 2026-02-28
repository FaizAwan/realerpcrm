import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;

    try {
        const where: any = { id: parseInt(params.id) };
        if (role !== "superadmin") {
            where.tenantId = tenantId;
        }

        const unit = await db.unit.findUnique({
            where,
            include: {
                project: true,
                bookings: true
            }
        });

        if (!unit) return NextResponse.json({ error: "Unit not found" }, { status: 404 });
        return NextResponse.json(unit);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch unit" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;
    const body = await req.json();

    try {
        const where: any = { id: parseInt(params.id) };
        if (role !== "superadmin") {
            where.tenantId = tenantId;
        }

        const existingUnit = await db.unit.findUnique({ where });
        if (!existingUnit) return NextResponse.json({ error: "Unit not found" }, { status: 404 });

        const unit = await db.unit.update({
            where,
            data: {
                unitNumber: body.unitNumber ?? existingUnit.unitNumber,
                projectId: body.projectId ?? existingUnit.projectId,
                status: body.status ?? existingUnit.status,
                price: body.price !== undefined ? (body.price ? parseFloat(body.price) : null) : existingUnit.price
            }
        });
        return NextResponse.json(unit);
    } catch (error) {
        console.error("Update unit error:", error);
        return NextResponse.json({ error: "Failed to update unit" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;

    try {
        const where: any = { id: parseInt(params.id) };
        if (role !== "superadmin") {
            where.tenantId = tenantId;
        }

        const existingUnit = await db.unit.findUnique({ where });
        if (!existingUnit) return NextResponse.json({ error: "Unit not found" }, { status: 404 });

        await db.unit.delete({ where });
        return NextResponse.json({ message: "Unit deleted successfully" });
    } catch (error) {
        console.error("Delete unit error:", error);
        return NextResponse.json({ error: "Failed to delete unit" }, { status: 500 });
    }
}
