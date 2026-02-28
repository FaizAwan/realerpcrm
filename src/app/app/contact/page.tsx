"use client";

import { motion } from "framer-motion";
import { Plus, Search, Home, Loader2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Lead } from "../lead/types";

import { LeadTable } from "../lead/_components/LeadTable";
import { CreateLeadModal } from "../lead/_components/CreateLeadModal";
import { ImportExportButtons } from "../lead/_components/ImportExportButtons";

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "All Statuses" },
    { label: "New Lead", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Qualified", value: "qualified" },
    { label: "Won / Closed", value: "won" },
    { label: "Lost", value: "lost" }
];
const SOURCE_OPTIONS = ["All Sources", "Digital Marketing", "Direct Referral", "Cold Outreach", "Exhibition"];

export default function ContactDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [sourceFilter, setSourceFilter] = useState("All Sources");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch('/realerpcrm/api/leads');
            const data = await res.json();
            if (Array.isArray(data)) setLeads(data);
        } catch (err) {
            console.error("Failed to fetch leads", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (lead?: Lead) => {
        setEditingLead(lead || null);
        setIsModalOpen(true);
    };

    const handleSaveLead = async (formData: any) => {
        try {
            const method = editingLead ? 'PUT' : 'POST';
            const body = editingLead ? { ...formData, id: editingLead.id } : formData;

            const res = await fetch('/realerpcrm/api/leads', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                fetchLeads();
                setIsModalOpen(false);
            } else {
                alert("Failed to save lead");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteLead = async (id: string | number) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        try {
            const res = await fetch(`/realerpcrm/api/leads?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchLeads();
            else alert("Failed to delete lead");
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusChange = async (id: string | number, newStatus: string) => {
        try {
            const res = await fetch('/realerpcrm/api/leads', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            if (res.ok) fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const handleImport = async (importedLeads: any[]) => {
        setLoading(true);
        for (const lead of importedLeads) {
            await fetch('/realerpcrm/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lead)
            });
        }
        fetchLeads();
    };

    // Calculate metrics
    const metrics = STATUS_OPTIONS.slice(1).map(opt => ({
        label: opt.label,
        value: opt.value,
        total: leads.filter(l => l.status === opt.value).length
    }));

    // Filtering
    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.phone?.includes(searchQuery);
        const matchesStatus = statusFilter === "All Statuses" || lead.status === statusFilter;
        const matchesSource = sourceFilter === "All Sources" || lead.source === sourceFilter;

        return matchesSearch && matchesStatus && matchesSource;
    });

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <Home className="w-8 h-8 text-primary" /> Contact Registry
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Unified communication hub for all institutional contacts.</p>
                </div>

                <div className="flex items-center gap-3">
                    <ImportExportButtons leads={leads} onImport={handleImport} />
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold uppercase shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-primary-dark transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="w-5 h-5" />
                        New Contact Engagement
                    </button>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {metrics.map((item, i) => (
                    <motion.div
                        key={item.value}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setStatusFilter(item.value)}
                        className={cn(
                            "p-6 rounded-3xl border cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden group",
                            statusFilter === item.value
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-white border-slate-200 hover:border-primary/50"
                        )}
                    >
                        <div className="flex flex-col gap-1 relative z-10">
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest",
                                statusFilter === item.value ? "text-white/60" : "text-slate-400"
                            )}>
                                {item.label}
                            </span>
                            <span className="text-4xl font-black tracking-tighter">
                                {item.total}
                            </span>
                        </div>
                        {statusFilter === item.value && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Toolbar Filters Section */}
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search leads by name, email, or phone identifier..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                    />
                </div>
                <div className="flex w-full md:w-auto gap-4">
                    <div className="relative flex-1 md:w-56">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl text-[12px] font-black uppercase text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                            {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>

                    <div className="relative flex-1 md:w-56">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select
                            value={sourceFilter}
                            onChange={(e) => setSourceFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl text-[12px] font-black uppercase text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                            {SOURCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {loading ? (
                    <div className="p-40 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <p className="font-bold uppercase text-[10px] tracking-widest animate-pulse">Synchronizing Leads Archive...</p>
                    </div>
                ) : (
                    <LeadTable
                        leads={filteredLeads}
                        onEdit={handleOpenModal}
                        onDelete={handleDeleteLead}
                        onStatusChange={handleStatusChange}
                    />
                )}
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
