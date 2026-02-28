import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

async function getAuthSession() {
    return await getServerSession(authOptions);
}

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

        const tasks = await db.task.findMany({
            where
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Tasks GET error:", error);
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

        if (!body.title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const task = await db.task.create({
            data: {
                title: body.title,
                description: body.description || null,
                assignedTo: body.assignedTo || null,
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                status: body.status || "todo",
                tenantId: tenantId
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error("Tasks POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
