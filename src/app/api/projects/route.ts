import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;

    try {
        const where: any = {};
        if (role !== "superadmin") {
            where.tenantId = tenantId;
        }

        const projects = await db.project.findMany({
            where,
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Fetch error for projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;

    try {
        const body = await req.json();
        
        if (!body.name) {
            return NextResponse.json({ error: "Project name is required" }, { status: 400 });
        }

        if (!body.type) {
            return NextResponse.json({ error: "Project type is required" }, { status: 400 });
        }

        const targetTenantId = role === "superadmin" ? (body.tenantId || tenantId) : tenantId;

        if (!targetTenantId) {
            return NextResponse.json({ error: "Tenant ID is required" }, { status: 403 });
        }

        const project = await db.project.create({
            data: {
                name: body.name,
                type: body.type,
                location: body.location || null,
                description: body.description || null,
                tenantId: targetTenantId
            }
        });
        return NextResponse.json(project);
    } catch (error) {
        console.error("Create error for project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
