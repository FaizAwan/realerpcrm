export type LeadStatus = "New lead" | "Contacted" | "Qualified" | "Won / Closed" | "Lost";
export type LeadSource = "Digital Marketing" | "Direct Referral" | "Cold Outreach" | "Exhibition";

export interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    source: string;
    status: string;
    createdAt: string;
}
