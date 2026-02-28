"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Grid2X2,
    Search,
    Filter,
    Download,
    Plus,
    Building2,
    CheckCircle2,
    Clock,
    X,
    MoreVertical,
    ChevronRight,
    Edit2,
    Trash2,
    Building,
    MapPin,
    DollarSign,
    ShieldCheck,
    ArrowRight,
    Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function UnitsPage() {
    const [units, setUnits] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUnit, setEditingUnit] = useState<any>(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [projectFilter, setProjectFilter] = useState("all");

    const [formData, setFormData] = useState({
        unitNumber: "",
        projectId: "",
        status: "available",
        price: ""
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [unitsRes, projectsRes] = await Promise.all([
                fetch("/realerpcrm/api/units"),
                fetch("/realerpcrm/api/projects")
            ]);
            const unitsData = await unitsRes.json();
            const projectsData = await projectsRes.json();
            setUnits(Array.isArray(unitsData) ? unitsData : []);
            setProjects(Array.isArray(projectsData) ? projectsData : []);
        } catch (error) {
            console.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenModal = (unit?: any) => {
        if (unit) {
            setEditingUnit(unit);
            setFormData({
                unitNumber: unit.unitNumber,
                projectId: unit.projectId?.toString() || "",
                status: unit.status || "available",
                price: unit.price?.toString() || ""
            });
        } else {
            setEditingUnit(null);
            setFormData({
                unitNumber: "",
                projectId: projects[0]?.id?.toString() || "",
                status: "available",
                price: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingUnit ? `/api/units/${editingUnit.id}` : "/api/units";
        const method = editingUnit ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    projectId: parseInt(formData.projectId),
                    price: formData.price ? parseFloat(formData.price) : null
                })
            });
            if (res.ok) {
                fetchData();
                setIsModalOpen(false);
            } else {
                const err = await res.json();
                alert(err.error || "Operation failed");
            }
        } catch (error) {
            alert("Operation failed");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this unit? This action cannot be undone.")) return;
        try {
            const res = await fetch(`/realerpcrm/api/units/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchData();
            } else {
                alert("Delete failed");
            }
        } catch (error) {
            alert("Delete failed");
        }
    };

    const filteredUnits = units.filter(unit => {
        const matchesSearch = 
            unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.project?.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || unit.status === statusFilter;
        const matchesProject = projectFilter === "all" || unit.projectId?.toString() === projectFilter;
        return matchesSearch && matchesStatus && matchesProject;
    });

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
                            <Grid2X2 className="w-6 h-6 text-white" />
                        </div>
                        Inventory Matrix
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Real-time tracking of <span className="text-secondary font-bold">Physical Asset Status</span> & Valuation.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Log Inventory
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Asset Count", val: units.length, icon: Building2, color: "text-blue-500" },
                    { label: "Available Inventory", val: units.filter(u => u.status === 'available').length, icon: CheckCircle2, color: "text-emerald-500" },
                    { label: "Pending Possession", val: units.filter(u => u.status === 'booked').length, icon: Clock, color: "text-amber-500" },
                    { label: "Asset Deployment", val: `${Math.round((units.filter(u => u.status === 'sold').length / (units.length || 1)) * 100)}%`, icon: Grid2X2, color: "text-indigo-500" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-secondary/30 transition-all">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-secondary/10 transition-colors", stat.color)}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{stat.val}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-secondary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan for Unit ID or Project..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                        <option value="sold">Sold</option>
                        <option value="reserved">Reserved</option>
                    </select>
                    <select
                        value={projectFilter}
                        onChange={(e) => setProjectFilter(e.target.value)}
                        className="px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    >
                        <option value="all">All Projects</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Units Inventory Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Synchronizing Asset Registry...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Reference</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parent Node</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valuation</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registry Status</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ops</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 italic">
                                {filteredUnits.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">No matching assets found in the matrix.</td>
                                    </tr>
                                ) : (
                                    filteredUnits.map((unit) => (
                                        <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-secondary/5 rounded-xl flex items-center justify-center text-secondary border border-secondary/10 group-hover:bg-secondary group-hover:text-white transition-all">
                                                        <Grid2X2 className="w-5 h-5" />
                                                    </div>
                                                    <Link href={`/app/units/${unit.id}`} className="text-sm font-bold text-slate-800 not-italic hover:text-secondary transition-colors underline decoration-secondary/20 underline-offset-4">
                                                        {unit.unitNumber}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700 not-italic">{unit.project?.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{unit.project?.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-bold text-slate-800 not-italic">
                                                    {unit.price ? `${parseFloat(unit.price).toLocaleString()} PKR` : 'TBD'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] shadow-sm",
                                                    unit.status === 'available' ? "bg-emerald-100 text-emerald-600 border border-emerald-200" :
                                                        unit.status === 'sold' ? "bg-indigo-100 text-indigo-600 border border-indigo-200" :
                                                            unit.status === 'reserved' ? "bg-amber-100 text-amber-600 border border-amber-200" :
                                                                "bg-blue-100 text-blue-600 border border-blue-200"
                                                )}>{unit.status}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleOpenModal(unit)}
                                                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-200 hover:text-slate-800 transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(unit.id)}
                                                        className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
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

            {/* Unit Slide-Over Panel */}
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
                                <div className="bg-secondary px-4 py-3 text-white relative overflow-hidden shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl opacity-50" />
                                    <h2 className="text-xl m-0 p-0 font-semibold tracking-normal leading-none relative z-10">
                                        {editingUnit ? "Reconfigure Asset" : "Initialize Unit"}
                                    </h2>
                                    <p className="text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0 flex items-center gap-2 relative z-10">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                        Certified Inventory Protocol
                                    </p>
                                    <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group z-20">
                                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-2 flex-1 flex flex-col justify-center">
                                    <div className="">
                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Asset Reference</label>
                                            <div className="relative group">
                                                <Grid2X2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <input
                                                    required
                                                    value={formData.unitNumber}
                                                    onChange={e => setFormData({ ...formData, unitNumber: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-800 focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                                                    placeholder="e.g. A-101, B-205"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Parent Node</label>
                                            <div className="relative group">
                                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <select
                                                    required
                                                    value={formData.projectId}
                                                    onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-800 focus:ring-4 focus:ring-secondary/10 transition-all outline-none appearance-none"
                                                >
                                                    {projects.map(p => (
                                                        <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Valuation</label>
                                            <div className="relative group">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <input
                                                    type="number"
                                                    value={formData.price}
                                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-800 focus:ring-4 focus:ring-secondary/10 transition-all outline-none font-sans"
                                                    placeholder="Price in PKR"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Registry Status</label>
                                            <div className="relative group">
                                                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <select
                                                    required
                                                    value={formData.status}
                                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-800 focus:ring-4 focus:ring-secondary/10 transition-all outline-none appearance-none"
                                                >
                                                    <option value="available">Available</option>
                                                    <option value="booked">Booked</option>
                                                    <option value="reserved">Reserved</option>
                                                    <option value="sold">Sold</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-1.5 mt-2 bg-secondary text-white rounded-xl font-semibold text-xs uppercase tracking-normal shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                                        {editingUnit ? "Verify Reconfiguration" : "Authorize Development"}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
