"use client";

import { motion } from "framer-motion";
import { Plus, Search, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Lead } from "./types";

import { LeadTable } from "./_components/LeadTable";
import { CreateLeadModal } from "./_components/CreateLeadModal";
import { ImportExportButtons } from "./_components/ImportExportButtons";

const INITIAL_MOCK_LEADS: Lead[] = [
    { id: "1", name: "Alice Johnson", phone: "+1 555 1234", email: "alice@example.com", source: "Digital Marketing", status: "New lead", createdAt: "2026-02-20" },
    { id: "2", name: "Bob Smith", phone: "+1 555 5678", email: "bob@tech.com", source: "Direct Referral", status: "Contacted", createdAt: "2026-02-21" },
    { id: "3", name: "Charlie Davis", phone: "+1 555 9876", email: "charlie@enterprise.net", source: "Cold Outreach", status: "Qualified", createdAt: "2026-02-22" },
    { id: "4", name: "Diana Prince", phone: "+1 555 4321", email: "diana@amazon.com", source: "Exhibition", status: "Won / Closed", createdAt: "2026-02-23" },
    { id: "5", name: "Evan Wright", phone: "+1 555 1111", email: "evan@domain.org", source: "Digital Marketing", status: "Lost", createdAt: "2026-02-24" },
];

const STATUS_OPTIONS = ["All Statuses", "New lead", "Contacted", "Qualified", "Won / Closed", "Lost"];
const SOURCE_OPTIONS = ["All Sources", "Digital Marketing", "Direct Referral", "Cold Outreach", "Exhibition"];

export default function LeadDashboard() {
    const [leads, setLeads] = useState<Lead[]>(INITIAL_MOCK_LEADS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [sourceFilter, setSourceFilter] = useState("All Sources");

    const handleOpenModal = (lead?: Lead) => {
        if (lead) {
            setEditingLead(lead);
        } else {
            setEditingLead(null);
        }
        setIsModalOpen(true);
    };

    const handleSaveLead = (formData: Omit<Lead, "id" | "createdAt">) => {
        if (editingLead) {
            // Update
            setLeads(leads.map(l => l.id === editingLead.id ? { ...l, ...formData } : l));
        } else {
            // Create
            const newLead: Lead = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                createdAt: new Date().toISOString().split('T')[0]
            };
            setLeads([newLead, ...leads]);
        }
    };

    const handleDeleteLead = (id: string) => {
        if (confirm("Are you sure you want to delete this lead?")) {
            setLeads(leads.filter(l => l.id !== id));
        }
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    };

    const handleImport = (importedLeads: Omit<Lead, "id" | "createdAt">[]) => {
        const mapped = importedLeads.map(l => ({
            id: Math.random().toString(36).substr(2, 9),
            ...l,
            createdAt: new Date().toISOString().split('T')[0]
        }));
        setLeads([...mapped, ...leads]);
        // alert(`Imported ${mapped.length} leads successfully!`);
    };

    // Calculate metrics
    const overallTotal = leads.length;
    const metrics = STATUS_OPTIONS.slice(1).map(status => ({
        status,
        total: leads.filter(l => l.status === status).length
    }));

    // Filtering
    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.phone.includes(searchQuery);
        const matchesStatus = statusFilter === "All Statuses" || lead.status === statusFilter;
        const matchesSource = sourceFilter === "All Sources" || lead.source === sourceFilter;

        return matchesSearch && matchesStatus && matchesSource;
    });

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Home className="w-6 h-6 text-primary" /> Leads Dashboard
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Manage and track your primary prospect pipelines.</p>
                </div>

                <div className="flex items-center gap-3">
                    <ImportExportButtons leads={leads} onImport={handleImport} />
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold uppercase shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-primary-dark transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Lead
                    </button>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {metrics.map((item, i) => (
                    <motion.div
                        key={item.status}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setStatusFilter(item.status)}
                        className={cn(
                            "p-5 rounded-2xl border cursor-pointer hover:shadow-md transition-all duration-300 relative overflow-hidden group",
                            statusFilter === item.status
                                ? "bg-primary/5 border-primary shadow-sm"
                                : "bg-white border-slate-200 hover:border-slate-300"
                        )}
                    >
                        <div className="flex flex-col gap-1 relative z-10">
                            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                                {item.status}
                            </span>
                            <span className="text-3xl font-black text-slate-800 tracking-tight">
                                {item.total}
                            </span>
                        </div>
                        {statusFilter === item.status && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Toolbar Filters Section */}
            <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search leads by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 md:w-48 px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                    >
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>

                    <select
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                        className="flex-1 md:w-48 px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                    >
                        {SOURCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <LeadTable
                    leads={filteredLeads}
                    onEdit={handleOpenModal}
                    onDelete={handleDeleteLead}
                    onStatusChange={handleStatusChange}
                />
            </motion.div>

            {/* Modal */}
            <CreateLeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveLead}
                initialData={editingLead}
            />
        </div>
    );
}
