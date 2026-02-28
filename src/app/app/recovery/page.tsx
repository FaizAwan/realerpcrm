"use client";

import { useState, useEffect, useCallback } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Plus, Search, Filter, Download, X, ChevronRight, DollarSign, Calendar, Phone, User, Edit2, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function RecoveryPage() {
    const [recoveries, setRecoveries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        amount: "",
        paidAmount: "",
        dueDate: "",
        unitNumber: "",
        projectName: "",
        status: "pending"
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/recoveries");
            const data = await res.json();
            setRecoveries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch recoveries");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenModal = (item?: any) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                customerName: item.customerName || "",
                customerPhone: item.customerPhone || "",
                amount: item.amount?.toString() || "",
                paidAmount: item.paidAmount?.toString() || "0",
                dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : "",
                unitNumber: item.unitNumber || "",
                projectName: item.projectName || "",
                status: item.status || "pending"
            });
        } else {
            setEditingItem(null);
            setFormData({
                customerName: "",
                customerPhone: "",
                amount: "",
                paidAmount: "0",
                dueDate: "",
                unitNumber: "",
                projectName: "",
                status: "pending"
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingItem ? `/api/recoveries/${editingItem.id}` : "/api/recoveries";
        const method = editingItem ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount),
                    paidAmount: parseFloat(formData.paidAmount) || 0,
                    dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : new Date().toISOString()
                })
            });
            if (res.ok) {
                fetchData();
                setIsModalOpen(false);
            }
        } catch (error) {
            alert("Operation failed");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this recovery record?")) return;
        try {
            const res = await fetch(`/api/recoveries/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            alert("Delete failed");
        }
    };

    const totalAmount = recoveries.reduce((acc, r) => acc + (parseFloat(r.amount) || 0), 0);
    const totalPaid = recoveries.reduce((acc, r) => acc + (parseFloat(r.paidAmount) || 0), 0);
    const totalDue = totalAmount - totalPaid;
    const overdueCount = recoveries.filter(r => new Date(r.dueDate) < new Date() && r.status !== 'paid').length;

    const filteredRecoveries = recoveries.filter(r => {
        const matchesSearch = r.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.unitNumber?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            <ProjectHeader />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Recovery & Installments</h1>
                    <p className="text-sm text-slate-500">Overdue collection follow-ups, payment schedules, and recovery pipelines.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#007b5e] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#00604a]"
                >
                    <Plus className="w-4 h-4" />
                    Add Recovery
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">Total Receivable</p>
                        <DollarSign className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{totalAmount.toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">Amount Received</p>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-600">{totalPaid.toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">Balance Due</p>
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-600">{totalDue.toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">Overdue</p>
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-600">{overdueCount}</h3>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 bg-slate-50 border-none rounded-xl text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="partial">Partial</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center">
                            <div className="w-12 h-12 border-4 border-[#007b5e]/20 border-t-[#007b5e] rounded-full animate-spin mx-auto" />
                        </div>
                    ) : filteredRecoveries.length === 0 ? (
                        <div className="p-20 text-center text-slate-400">No recovery records found</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Customer</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Unit</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Total Amount</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Paid</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Balance</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Due Date</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRecoveries.map((item) => {
                                    const balance = (parseFloat(item.amount) || 0) - (parseFloat(item.paidAmount) || 0);
                                    const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'paid';
                                    return (
                                        <tr key={item.id} className="hover:bg-slate-50 group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#007b5e]/10 rounded-full flex items-center justify-center text-[#007b5e] font-bold">
                                                        {item.customerName?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{item.customerName}</p>
                                                        <p className="text-xs text-slate-400">{item.customerPhone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-slate-800">{item.unitNumber}</p>
                                                <p className="text-xs text-slate-400">{item.projectName}</p>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-800">{parseFloat(item.amount || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4 font-semibold text-emerald-600">{parseFloat(item.paidAmount || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4 font-semibold text-amber-600">{balance.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn("text-sm", isOverdue ? "text-red-500 font-bold" : "text-slate-500")}>
                                                    {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '-'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                                    item.status === 'paid' ? "bg-emerald-100 text-emerald-600" :
                                                        isOverdue ? "bg-red-100 text-red-600" :
                                                            item.status === 'partial' ? "bg-amber-100 text-amber-600" :
                                                                "bg-blue-100 text-blue-600"
                                                )}>{isOverdue ? 'overdue' : item.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                                                    <button onClick={() => handleOpenModal(item)} className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-[#007b5e]/10 hover:text-[#007b5e]">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer" />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-2xl overflow-hidden flex flex-col">
                            <div className="bg-[#007b5e] p-6 text-white">
                                <h2 className="text-xl font-bold">{editingItem ? "Update Recovery" : "Add Recovery"}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Customer Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input required value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Customer name" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input value={formData.customerPhone} onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Phone number" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Total Amount</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input type="number" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Amount" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Paid Amount</label>
                                        <input type="number" value={formData.paidAmount} onChange={e => setFormData({ ...formData, paidAmount: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Paid" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Unit Number</label>
                                        <input value={formData.unitNumber} onChange={e => setFormData({ ...formData, unitNumber: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Unit #" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Due Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input type="date" required value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Project Name</label>
                                    <input value={formData.projectName} onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Project name" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm">
                                        <option value="pending">Pending</option>
                                        <option value="partial">Partial</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-4 bg-[#007b5e] text-white rounded-xl font-bold hover:bg-[#00604a] flex items-center justify-center gap-2 mt-4">
                                    {editingItem ? "Update" : "Create"} Recovery <ChevronRight className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
