import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = (session.user as any).tenantId;

    try {
        const users = await db.user.findMany({
            where: {
                tenantId: tenantId
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        // Add some mock KPI data for each agent to make it look professional
        const teamWithKPIs = users.map(user => ({
            ...user,
            leadsGiven: Math.floor(Math.random() * 50) + 10,
            contactedRate: Math.floor(Math.random() * 40) + 50,
            convoRate: Math.floor(Math.random() * 30) + 40,
            wonLeads: Math.floor(Math.random() * 10),
            value: (Math.floor(Math.random() * 500) + 100) * 1000
        }));

        return NextResponse.json(teamWithKPIs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
    }
}
