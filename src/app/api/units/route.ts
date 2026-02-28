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

        const units = await db.unit.findMany({
            where,
            include: {
                project: true
            }
        });
        
        return NextResponse.json(units);
    } catch (error) {
        console.error("Units GET error:", error);
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
        
        if (!body.unitNumber) {
            return NextResponse.json({ error: "Unit number is required" }, { status: 400 });
        }

        if (!body.projectId) {
            return NextResponse.json({ error: "Project is required" }, { status: 400 });
        }

        const unit = await db.unit.create({
            data: {
                unitNumber: body.unitNumber,
                projectId: parseInt(body.projectId),
                status: body.status || "available",
                price: body.price ? parseFloat(body.price) : null,
                tenantId: tenantId
            }
        });
        
        return NextResponse.json(unit);
    } catch (error) {
        console.error("Units POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
