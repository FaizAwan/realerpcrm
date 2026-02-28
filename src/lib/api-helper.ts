import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function getAuthSession() {
    return await getServerSession(authOptions);
}

export function createHandler(modelName: keyof typeof db) {
    return {
        async GET() {
            const session = await getAuthSession();
            if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

            const tenantId = (session.user as any).tenantId;
            const role = (session.user as any).role;

            try {
                const where: any = {};
                // Superadmins see everything, others only their tenant's data
                if (role !== "superadmin") {
                    if (tenantId === undefined || tenantId === null) {
                        return NextResponse.json({ error: "Tenant Identity Missing" }, { status: 403 });
                    }
                    where.tenantId = tenantId;
                }

                // @ts-ignore
                const items = await db[modelName].findMany({
                    where,
                    orderBy: { id: 'desc' }
                });
                return NextResponse.json(items);
            } catch (error) {
                console.error(`Fetch error for ${String(modelName)}:`, error);
                return NextResponse.json({ error: `Failed to fetch ${String(modelName)}` }, { status: 500 });
            }
        },

        async POST(req: Request) {
            const session = await getAuthSession();
            if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

            const tenantId = (session.user as any).tenantId;
            const role = (session.user as any).role;

            const body = await req.json();
            try {
                // Determine tenantId to use (superadmins might specify one in body, or use null)
                const targetTenantId = role === "superadmin" ? (body.tenantId || null) : tenantId;

                if (role !== "superadmin" && !targetTenantId) {
                    return NextResponse.json({ error: "Tenant Identity Required" }, { status: 403 });
                }

                // @ts-ignore
                const item = await db[modelName].create({
                    data: { ...body, tenantId: targetTenantId }
                });
                return NextResponse.json(item);
            } catch (error) {
                console.error(`Create error for ${String(modelName)}:`, error);
                return NextResponse.json({ error: `Failed to create ${String(modelName)}` }, { status: 500 });
            }
        }
    };
}

export function createIndividualHandler(modelName: keyof typeof db) {
    return {
        async PATCH(req: Request, { params }: { params: { id: string } }) {
            const session = await getAuthSession();
            if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

            const tenantId = (session.user as any).tenantId;
            const role = (session.user as any).role;

            const id = parseInt(params.id);
            const body = await req.json();
            try {
                const where: any = { id };
                if (role !== "superadmin") {
                    where.tenantId = tenantId;
                }

                // @ts-ignore
                const item = await db[modelName].update({
                    where,
                    data: body
                });
                return NextResponse.json(item);
            } catch (error) {
                console.error(`Update error for ${String(modelName)}:`, error);
                return NextResponse.json({ error: `Failed to update ${String(modelName)}` }, { status: 500 });
            }
        },

        async DELETE(req: Request, { params }: { params: { id: string } }) {
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

                // @ts-ignore
                await db[modelName].delete({
                    where
                });
                return NextResponse.json({ message: "Deleted successfully" });
            } catch (error) {
                console.error(`Delete error for ${String(modelName)}:`, error);
                return NextResponse.json({ error: `Failed to delete ${String(modelName)}` }, { status: 500 });
            }
        }
    };
}
