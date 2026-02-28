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
                status: body.status || "confirmed",
                unitId: parseInt(body.unitId),
                tenantId: tenantId,
                bookingDate: body.bookingDate ? new Date(body.bookingDate) : new Date()
            }
        });

        // Determine Unit Status and Ownership
        const isFullPayment = body.isFullPayment === true;
        const unitUpdateData: any = {
            status: isFullPayment ? "sold" : "booked"
        };

        if (isFullPayment) {
            unitUpdateData.ownerName = body.customerName;
            unitUpdateData.ownerPhone = body.customerPhone || null;
            unitUpdateData.saleDate = body.bookingDate ? new Date(body.bookingDate) : new Date();
            unitUpdateData.saleAgency = body.agency || "Direct Booking";
        }

        // Update Unit
        await db.unit.update({
            where: { id: parseInt(body.unitId) },
            data: unitUpdateData
        });

        // Create Finance Entry
        if (body.amountPaid && parseFloat(body.amountPaid) > 0) {
            await db.financeEntry.create({
                data: {
                    tenantId: tenantId,
                    type: 'income',
                    amount: parseFloat(body.amountPaid),
                    category: isFullPayment ? 'Full Payment' : 'Booking Payment',
                    description: `${isFullPayment ? 'Full payment' : 'Booking deposit'} from ${body.customerName} for Unit ID ${body.unitId}`
                }
            });
        }
        
        return NextResponse.json(booking);
    } catch (error) {
        console.error("Bookings POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
