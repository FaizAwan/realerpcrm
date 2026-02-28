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

        const leads = await db.lead.findMany({
            where
        });
        
        return NextResponse.json(leads);
    } catch (error) {
        console.error("Leads GET error:", error);
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
        
        if (!body.name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const lead = await db.lead.create({
            data: {
                name: body.name,
                phone: body.phone || null,
                email: body.email || null,
                source: body.source || "Direct",
                status: body.status || "new",
                assignedTo: body.assignedTo || null,
                tenantId: tenantId
            }
        });
        
        return NextResponse.json(lead);
    } catch (error) {
        console.error("Leads POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
