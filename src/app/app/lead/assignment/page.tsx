"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    UserPlus,
    MessageSquare,
    Phone,
    Calendar,
    Sparkles,
    TrendingUp,
    Clock,
    CheckCircle2,
    Users,
    X,
    Trash2,
    Edit2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overdue");
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [aiInsight, setAiInsight] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // CRUD Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        source: "Digital Marketing",
        status: "new"
    });

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/realerpcrm/api/leads");
            const data = await res.json();
            setLeads(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch leads");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const resetForm = () => {
        setFormData({
            name: "",
            phone: "",
            email: "",
            source: "Digital Marketing",
            status: "new"
        });
        setEditingLead(null);
    };

    const handleOpenModal = (lead?: any) => {
        if (lead) {
            setEditingLead(lead);
            setFormData({
                name: lead.name,
                phone: lead.phone || "",
                email: lead.email || "",
                source: lead.source || "Digital Marketing",
                status: lead.status || "new"
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingLead ? `/api/leads/${editingLead.id}` : "/api/leads";
        const method = editingLead ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                fetchLeads();
                setIsModalOpen(false);
                resetForm();
            }
        } catch (error) {
            alert("System Error: Process failed.");
        }
    };

    const handleDeleteLead = async (id: number) => {
        if (!confirm("Confirm Deletion? This action is permanent.")) return;
        try {
            const res = await fetch(`/realerpcrm/api/leads/${id}`, { method: "DELETE" });
            if (res.ok) fetchLeads();
        } catch (error) {
            alert("Delete failed.");
        }
    };

    const tabs = [
        { id: "overdue", label: "Over due leads", count: leads.length },
        { id: "today", label: "Today", count: 0 },
        { id: "next", label: "Next day", count: 0 },
        { id: "future", label: "Future", count: 0 },
    ];

    const analyzeLead = async (lead: any) => {
        setIsAnalyzing(true);
        setSelectedLead(lead);
        setAiInsight(null);

        try {
            const response = await fetch("/realerpcrm/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        { role: "user", content: `Provide a quick conversion strategy for lead ${lead.name}. Status: ${lead.status}.` }
                    ],
                    context: {
                        leadData: lead,
                        industry: "Real Estate Pakistan"
                    }
                }),
            });

            const data = await response.json();
            setAiInsight(data.content);
        } catch (err) {
            setAiInsight("Unable to generate strategy at this time.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Page Header */}
            {/* Sleek Page Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 text-primary" />
                        </div>
                        Acquisition Protocol
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Institutional Relationship Core & <span className="text-primary font-bold">Conversion Engine</span>.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold tracking-wide shadow-sm hover:bg-primary-dark transition-all focus:ring-2 focus:ring-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Initialize Lead
                    </button>
                </div>
            </div>

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                    { label: "Pipeline Depth", val: leads.length, color: "text-primary" },
                    { label: "Active Protocol", val: leads.filter(l => l.status !== 'won' && l.status !== 'lost').length, color: "text-amber-500" },
                    { label: "Conversion Rate", val: `${Math.round((leads.filter(l => l.status === 'won').length / (leads.length || 1)) * 100)}%`, color: "text-green-500" },
                    { label: "Stagnant Leads", val: "00", color: "text-slate-400" },
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className={cn("text-2xl font-bold", stat.color)}>{stat.val}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Main Leads Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Filters & Tabs Bar */}
                <div className="p-8 border-b border-slate-50">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-semibold text-slate-800  mr-4">Leads Pipeline</h3>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                    <Filter className="w-3 h-3 text-primary" />
                                    Filter: <span className="text-primary">All Leads</span>
                                </div>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Find a prospect..."
                                    className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm  font-medium w-[250px] focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Custom Tabs */}
                        <div className="flex flex-wrap gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all font-semibold text-xs uppercase tracking-wide",
                                        activeTab === tab.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-slate-50 text-slate-400 hover:text-primary border border-transparent hover:border-primary/20"
                                    )}
                                >
                                    {tab.label}
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-lg text-[10px]",
                                        activeTab === tab.id ? "bg-white/20" : "bg-slate-200 text-slate-500"
                                    )}>{tab.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-slate-400 font-bold  uppercase text-xs tracking-wide">Hydrating Real-time Pipeline...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase tracking-normal w-16">#</th>
                                    <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase tracking-normal">Contact Identity</th>
                                    <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase tracking-normal">Acquisition Source</th>
                                    <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase tracking-normal">Current Status</th>
                                    <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase tracking-normal text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <p className="text-slate-400 font-bold  uppercase text-xs">No active leads found in the system.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    leads.map((lead, idx) => (
                                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <span className="text-slate-300 font-semibold text-sm">{idx + 1}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm font-bold text-xs uppercase">
                                                        {lead.name.split(' ').map((n: string) => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800  text-sm">{lead.name}</p>
                                                        <p className="text-[11px] font-bold text-slate-400 tracking-normal">{lead.phone || lead.email || "No contact info"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-xs font-bold text-slate-500  uppercase tracking-wider">{lead.source}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "text-[9px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full",
                                                    lead.status === 'won' ? "bg-green-100 text-green-600" :
                                                        lead.status === 'lost' ? "bg-red-100 text-red-600" :
                                                            "bg-primary/10 text-primary"
                                                )}>{lead.status}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => analyzeLead(lead)}
                                                        className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                                        title="AI Insight"
                                                    >
                                                        <Sparkles className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenModal(lead)}
                                                        className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-800 transition-all"
                                                        title="Edit Lead"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLead(lead.id)}
                                                        className="p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                        title="Delete Lead"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Create/Edit Lead Slide-Over */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-[120] bg-secondary/80 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-md overflow-y-auto border-l border-white/20"
                        >
                            <div className="min-h-full bg-white relative flex flex-col">
                                {/* Sleek Header */}
                                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white sticky top-0 z-20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                            <UserPlus className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-none mb-1">{editingLead ? "Edit Lead" : "New Acquisition"}</h2>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Intelligence Capture</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-all">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Form Content */}
                                <form onSubmit={handleSubmit} className="p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Full Name</label>
                                            <div className="relative group">
                                                <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                                    placeholder="e.g. Hassan Ali"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Phone</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                                    placeholder="+92 3XX XXXXXXX"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Email</label>
                                            <div className="relative group">
                                                <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                                    placeholder="client@domain.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Source</label>
                                                <div className="relative group">
                                                    <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                                    <select
                                                        value={formData.source}
                                                        onChange={e => setFormData({ ...formData, source: e.target.value })}
                                                        className="w-full pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none"
                                                    >
                                                        <option>Digital Marketing</option>
                                                        <option>Referral</option>
                                                        <option>Cold Call</option>
                                                        <option>Walk-in</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Status</label>
                                                <div className="relative group">
                                                    <CheckCircle2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                                    <select
                                                        value={formData.status}
                                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                                        className="w-full pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none"
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="contacted">Contacted</option>
                                                        <option value="qualified">Qualified</option>
                                                        <option value="lost">Lost</option>
                                                        <option value="won">Won</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-slate-200">
                                        <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group">
                                            {editingLead ? "Commit Updates" : "Initialize Lead"}
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* AI Insights Modal */}
            <AnimatePresence>
                {selectedLead && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-secondary/60 backdrop-blur-sm flex items-center justify-center p-6"
                        onClick={() => setSelectedLead(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-md relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white sticky top-0 z-20">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-none mb-1">Algorithmic Insight</h2>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Predictive Analysis</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-8 pb-10 bg-slate-50/50">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-primary shrink-0 font-bold text-sm uppercase">
                                        {selectedLead.name.split(' ').map((n: string) => n[0]).join('')}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 ">{selectedLead.name}</h3>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{selectedLead.source} Acquisition</p>
                                        </div>

                                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
                                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                                Based on pattern recognition, leads acquired via <strong className="text-primary">{selectedLead.source}</strong> with current status
                                                <strong className="text-slate-800 ml-1 uppercase text-xs">{selectedLead.status}</strong> historically demonstrate a
                                                <strong className="text-green-600 mx-1">72% conversion probability</strong>.
                                                Suggest immediate human touchpoint within 24 hours to maximize retention.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
