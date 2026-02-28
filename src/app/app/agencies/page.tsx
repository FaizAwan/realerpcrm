"use client";

import { useState, useEffect, useCallback } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Plus, Search, X, ChevronRight, User, Phone, Mail, MapPin, Edit2, Trash2, DollarSign, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AgenciesPage() {
    const [agencies, setAgencies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
        commission: "",
        isActive: true
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/realerpcrm/api/agencies");
            const data = await res.json();
            setAgencies(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch agencies");
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
                name: item.name || "",
                contactPerson: item.contactPerson || "",
                phone: item.phone || "",
                email: item.email || "",
                address: item.address || "",
                commission: item.commission?.toString() || "",
                isActive: item.isActive ?? true
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                contactPerson: "",
                phone: "",
                email: "",
                address: "",
                commission: "",
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingItem ? `/api/agencies/${editingItem.id}` : "/api/agencies";
        const method = editingItem ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    commission: formData.commission ? parseFloat(formData.commission) : null
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
        if (!confirm("Delete this agency?")) return;
        try {
            const res = await fetch(`/realerpcrm/api/agencies/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            alert("Delete failed");
        }
    };

    const filteredAgencies = agencies.filter(a =>
        a.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            <ProjectHeader />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Agencies Management</h1>
                    <p className="text-sm text-slate-500">Real estate agent partnerships, commissions, and performance reporting.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#007b5e] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#00604a]"
                >
                    <Plus className="w-4 h-4" />
                    Add Agency
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">Total Agencies</p>
                        <Building2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{agencies.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">Active Partners</p>
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-600">{agencies.filter(a => a.isActive).length}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">Avg Commission</p>
                        <DollarSign className="w-5 h-5 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-600">
                        {agencies.length > 0
                            ? (agencies.reduce((acc, a) => acc + (parseFloat(a.commission) || 0), 0) / agencies.length).toFixed(1)
                            : 0}%
                    </h3>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search agencies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center">
                            <div className="w-12 h-12 border-4 border-[#007b5e]/20 border-t-[#007b5e] rounded-full animate-spin mx-auto" />
                        </div>
                    ) : filteredAgencies.length === 0 ? (
                        <div className="p-20 text-center text-slate-400">No agencies found</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Agency Name</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Contact Person</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Phone</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Email</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Commission</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredAgencies.map((agency) => (
                                    <tr key={agency.id} className="hover:bg-slate-50 group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#007b5e]/10 rounded-full flex items-center justify-center text-[#007b5e] font-bold">
                                                    {agency.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-slate-800">{agency.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{agency.contactPerson || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600">{agency.phone || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600">{agency.email || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-slate-800">{agency.commission || 0}%</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                                agency.isActive ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                                            )}>{agency.isActive ? 'Active' : 'Inactive'}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                                                <button onClick={() => handleOpenModal(agency)} className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-[#007b5e]/10 hover:text-[#007b5e]">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(agency.id)} className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
                                <h2 className="text-xl font-bold">{editingItem ? "Update Agency" : "Add Agency"}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Agency Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Agency name" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Contact Person</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input value={formData.contactPerson} onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Contact person name" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Commission %</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input type="number" value={formData.commission} onChange={e => setFormData({ ...formData, commission: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="%" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Email" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                                        <textarea value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm" rows={2} placeholder="Address" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded" />
                                    <span className="text-sm text-slate-600">Active</span>
                                </div>
                                <button type="submit" className="w-full py-4 bg-[#007b5e] text-white rounded-xl font-bold hover:bg-[#00604a] flex items-center justify-center gap-2 mt-4">
                                    {editingItem ? "Update" : "Create"} Agency <ChevronRight className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
