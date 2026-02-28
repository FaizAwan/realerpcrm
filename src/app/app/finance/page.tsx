"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    DollarSign,
    PieChart,
    Calendar,
    TrendingUp,
    X,
    Trash2,
    Edit2,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function FinancePage() {
    const [entries, setEntries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<any>(null);
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        type: "income",
        description: ""
    });

    const fetchEntries = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/realerpcrm/api/finance");
            const data = await res.json();
            setEntries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch finance entries");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const totals = entries.reduce((acc, curr) => {
        const val = parseFloat(curr.amount) || 0;
        if (curr.type === 'income') acc.income += val;
        else acc.expense += val;
        return acc;
    }, { income: 0, expense: 0 });

    const handleOpenModal = (entry?: any) => {
        if (entry) {
            setEditingEntry(entry);
            setFormData({
                amount: entry.amount.toString(),
                category: entry.category,
                type: entry.type,
                description: entry.description || ""
            });
        } else {
            setEditingEntry(null);
            setFormData({
                amount: "",
                category: "",
                type: "income",
                description: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingEntry ? `/api/finance/${editingEntry.id}` : "/api/finance";
        const method = editingEntry ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount)
                })
            });
            if (res.ok) {
                fetchEntries();
                setIsModalOpen(false);
            }
        } catch (error) {
            alert("Transaction failed.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Remove transaction legacy?")) return;
        try {
            const res = await fetch(`/realerpcrm/api/finance/${id}`, { method: "DELETE" });
            if (res.ok) fetchEntries();
        } catch (error) {
            alert("Delete failed.");
        }
    };

    return (
        <div className="space-y-12 pb-4">
            {/* Sleek Page Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-primary" />
                        </div>
                        Financial Ledger
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Synchronized Asset Tracking & <span className="text-primary font-bold">Institutional Capital Control</span>.</p>
                </motion.div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold tracking-wide shadow-sm hover:bg-primary-dark transition-all focus:ring-2 focus:ring-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Entry
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "Gross Inflow", value: `Rs ${totals.income.toLocaleString()}`, type: "income", icon: DollarSign, color: "text-primary" },
                    { label: "Operational Outflow", value: `Rs ${totals.expense.toLocaleString()}`, type: "expense", icon: PieChart, color: "text-red-500" },
                    { label: "Net Liquid Balance", value: `Rs ${(totals.income - totals.expense).toLocaleString()}`, type: "income", icon: TrendingUp, color: "text-indigo-600" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-10 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 -z-10 group-hover:bg-primary/5 transition-colors" />
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform">
                            <stat.icon className={cn("w-7 h-7", stat.color)} />
                        </div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2 ">Global {stat.label}</p>
                        <h4 className={cn("text-3xl font-semibold  tracking-normal", stat.color)}>{stat.value}</h4>
                    </motion.div>
                ))}
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-md shadow-secondary/5 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <h5 className="text-xl font-semibold text-slate-800  tracking-tight">Audit Trail / Recent Ledger Entries</h5>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] uppercase font-semibold tracking-wide text-slate-500 hover:text-primary transition-all shadow-sm">
                        <Download className="w-4 h-4" />
                        Export Audit
                    </button>
                </div>

                {isLoading ? (
                    <div className="p-20 text-center flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-slate-400 font-semibold  uppercase text-xs tracking-wide">Reading Encrypted Ledger...</p>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="p-20 text-center">
                        <p className="text-slate-400 font-semibold  uppercase text-xs">No capital movement recorded.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Class</th>
                                    <th className="px-10 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Classification / Origin</th>
                                    <th className="px-10 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Timeframe</th>
                                    <th className="px-10 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide text-right">Valuation</th>
                                    <th className="px-10 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Authorize</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {entries.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-50/20 transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center",
                                                tx.type === 'income' ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
                                            )}>
                                                {tx.type === 'income' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <p className="font-semibold text-slate-800  tracking-tight text-lg">{tx.category}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">UUID: {tx.id}</p>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 ">
                                                <Calendar className="w-4 h-4 text-primary opacity-50" />
                                                {new Date(tx.entryDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <span className={cn(
                                                "font-semibold text-2xl  tracking-normal",
                                                tx.type === 'income' ? "text-primary" : "text-slate-800"
                                            )}>
                                                {tx.type === 'income' ? "+" : "-"} {parseFloat(tx.amount).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(tx)}
                                                    className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(tx.id)}
                                                    className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-200"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Finance Slide-Over Panel */}
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
                            <div className="min-h-full relative flex flex-col">
                                <div className="bg-primary px-4 py-3 text-white relative overflow-hidden shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl opacity-50" />
                                    <h2 className="text-xl m-0 p-0 font-semibold  tracking-normal leading-none relative z-10">{editingEntry ? "Modify Ledger" : "Initial Capital Entry"}</h2>
                                    <p className="text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0 flex items-center gap-2 relative z-10">
                                        <Briefcase className="w-4 h-4 text-white" />
                                        Certified Transaction Auth
                                    </p>
                                    <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group z-20">
                                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-2 flex-1 flex flex-col justify-center">
                                    <div className="">
                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Classification</label>
                                            <div className="relative group">
                                                <PieChart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <select
                                                    required
                                                    value={formData.type}
                                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                                                >
                                                    <option value="income">Inward Capital (Income)</option>
                                                    <option value="expense">Outward Asset (Expense)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Denominated Value</label>
                                            <div className="relative group">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    type="number"
                                                    value={formData.amount}
                                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-sans"
                                                    placeholder="Amount in PKR"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Origin/Category</label>
                                            <div className="relative group">
                                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    value={formData.category}
                                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-sans"
                                                    placeholder="e.g. Booking Payment, Rent, etc."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-1.5 mt-2 bg-primary text-white rounded-xl font-semibold text-xs uppercase tracking-normal shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                                        {editingEntry ? "Update Audit" : "Authorize Entry"}
                                        <TrendingUp className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
