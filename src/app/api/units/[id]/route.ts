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
                type: body.type ?? existingUnit.type,
                price: body.price !== undefined ? (body.price ? parseFloat(body.price) : null) : existingUnit.price,
                // Map Data Updates
                x: body.x !== undefined ? parseFloat(body.x) : existingUnit.x,
                y: body.y !== undefined ? parseFloat(body.y) : existingUnit.y,
                width: body.width !== undefined ? parseFloat(body.width) : existingUnit.width,
                height: body.height !== undefined ? parseFloat(body.height) : existingUnit.height,
                shapeType: body.shapeType ?? existingUnit.shapeType,
                // Ownership (Sale) Data
                ownerName: body.ownerName !== undefined ? body.ownerName : existingUnit.ownerName,
                ownerPhone: body.ownerPhone !== undefined ? body.ownerPhone : existingUnit.ownerPhone,
                saleDate: body.saleDate !== undefined ? (body.saleDate ? new Date(body.saleDate) : null) : existingUnit.saleDate,
                saleAgency: body.saleAgency !== undefined ? body.saleAgency : existingUnit.saleAgency,
                // Rental Data
                isRented: body.isRented !== undefined ? !!body.isRented : existingUnit.isRented,
                tenantName: body.tenantName !== undefined ? body.tenantName : existingUnit.tenantName,
                tenantPhone: body.tenantPhone !== undefined ? body.tenantPhone : existingUnit.tenantPhone,
                rentAmount: body.rentAmount !== undefined ? (body.rentAmount ? parseFloat(body.rentAmount) : null) : existingUnit.rentAmount,
                rentDate: body.rentDate !== undefined ? (body.rentDate ? new Date(body.rentDate) : null) : existingUnit.rentDate,
                rentAgency: body.rentAgency !== undefined ? body.rentAgency : existingUnit.rentAgency
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
