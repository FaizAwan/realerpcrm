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

        const bookings = await db.booking.findMany({
            where,
            include: {
                unit: {
                    include: {
                        project: true
                    }
                }
            }
        });
        
        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Bookings GET error:", error);
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
        
        if (!body.customerName) {
            return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
        }

        if (!body.unitId) {
            return NextResponse.json({ error: "Unit is required" }, { status: 400 });
        }

        const booking = await db.booking.create({
            data: {
                customerName: body.customerName,
                amountPaid: body.amountPaid ? parseFloat(body.amountPaid) : 0,
                status: body.status || "pending",
                unitId: parseInt(body.unitId),
                tenantId: tenantId,
                bookingDate: body.bookingDate ? new Date(body.bookingDate) : new Date()
            }
        });
        
        return NextResponse.json(booking);
    } catch (error) {
        console.error("Bookings POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
