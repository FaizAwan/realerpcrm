"use client";

import {
    ArrowLeft,
    Building2,
    Calendar,
    MapPin,
    Grid2X2,
    Users,
    TrendingUp,
    ShieldCheck,
    FileText,
    MoreVertical,
    Plus,
    MessageSquare,
    Phone,
    Banknote,
    X,
    ChevronRight,
    Edit3,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);

    // Edit Project Form State
    const [projectForm, setProjectForm] = useState({
        name: "",
        location: "",
        type: "society",
        description: ""
    });

    // Add Unit Form State
    const [unitForm, setUnitForm] = useState({
        unitNumber: "",
        price: "",
        status: "available"
    });

    const fetchProject = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/projects/${id}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setProject(data);
            setProjectForm({
                name: data.name,
                location: data.location || "",
                type: data.type,
                description: data.description || ""
            });
        } catch (error) {
            console.error("Fetch project error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProject();
    }, [id]);

    const handleUpdateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectForm)
            });
            if (res.ok) {
                fetchProject();
                setIsEditModalOpen(false);
            }
        } catch (error) {
            alert("Update failed");
        }
    };

    const handleAddUnit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/units`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...unitForm,
                    projectId: parseInt(id as string)
                })
            });
            if (res.ok) {
                fetchProject();
                setIsAddUnitModalOpen(false);
                setUnitForm({ unitNumber: "", price: "", status: "available" });
            }
        } catch (error) {
            alert("Add unit failed");
        }
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compiling Project Intelligence...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-4">
                <p className="text-slate-400">Project not found.</p>
                <Link href="/app/projects" className="text-primary font-bold hover:underline">Return to Projects</Link>
            </div>
        );
    }

    const stats = [
        { label: "Total Units", value: project.units?.length || 0, icon: Grid2X2 },
        { label: "Available", value: project.units?.filter((u: any) => u.status === 'available').length || 0, icon: Users },
        { label: "Booked/Sold", value: project.units?.filter((u: any) => u.status === 'booked' || u.status === 'sold').length || 0, icon: Banknote },
        { label: "Valuation", value: "TBD", icon: TrendingUp },
    ];

    return (
        <div className="space-y-10 pb-4">
            {/* Nav Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Link href="/app/projects" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-400 hover:text-primary transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl m-0 p-0 font-bold text-slate-800 tracking-tight">{project.name}</h1>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wide">Dynamic Archive</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 ">{project.location} • {project.type}</p>
                </div>

                <div className="md:ml-auto flex items-center gap-3">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-wide text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                    >
                        <Edit3 className="w-4 h-4" />
                        Modify Detail
                    </button>
                    <button
                        onClick={() => setIsAddUnitModalOpen(true)}
                        className="px-6 py-3 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-wide shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Unit
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Image */}
                    <div className="h-[400px] w-full bg-slate-200 rounded-3xl overflow-hidden relative group shadow-2xl shadow-slate-200/50">
                        <NextImage
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                            alt="Project"
                            fill
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-12">
                            <div className="text-white">
                                <h2 className="text-2xl font-bold tracking-tight mb-2">Exclusive Site Intelligence</h2>
                                <p className="text-white/70 font-medium ">Synchronized {new Date(project.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-primary/30 transition-all">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary transition-colors text-slate-400 group-hover:text-white">
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <span className="text-xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                        <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                            <div className="w-8 h-px bg-primary/20" />
                            Project Parameters
                        </h3>
                        <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
                            {project.description || "Establishment parameters not yet finalized in the primary registry."}
                        </p>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Physical Inventory</h3>
                            <button className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline px-4 py-2 bg-primary/5 rounded-lg transition-all">Export Protocol</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identity ID</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financial Position</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sync Status</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Stakeholder</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ops</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium">
                                    {project.units?.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic">No inventory registered for this node.</td>
                                        </tr>
                                    ) : (
                                        project.units?.map((unit: any) => (
                                            <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5 text-sm font-bold text-slate-800">{unit.unitNumber}</td>
                                                <td className="px-8 py-5 text-sm font-bold text-slate-600">
                                                    {unit.price ? `${parseFloat(unit.price).toLocaleString()} PKR` : 'UNSET'}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                                                        unit.status === 'sold' ? "bg-indigo-100 text-indigo-600" :
                                                            unit.status === 'booked' ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                                                    )}>{unit.status}</span>
                                                </td>
                                                <td className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                    {unit.bookings?.[0]?.customerName || "Protocol Neutral"}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="p-2 text-slate-300 hover:text-slate-800 transition-all opacity-0 group-hover:opacity-100">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Completion Card */}
                    <div className="bg-secondary p-10 rounded-3xl text-white shadow-2xl shadow-secondary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16 rounded-full blur-3xl" />
                        <h4 className="text-xl font-bold mb-2 tracking-tight">Project Health</h4>
                        <p className="text-white/70 font-bold uppercase tracking-widest text-[10px] mb-8">Positional Optimization: Active</p>

                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 border-[10px] border-white/10 border-t-primary rounded-full flex items-center justify-center relative shadow-inner">
                                <span className="text-2xl font-bold ">85%</span>
                            </div>
                            <div className="space-y-4 flex-1 font-bold italic">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    NOC SECURED
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    SYNC Q4 2026
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Preview */}
                    <div className="bg-white p-3 rounded-3xl border border-slate-100 shadow-sm h-[300px] overflow-hidden relative group">
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center italic">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Geospatial Node Placeholder</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-primary rounded-full animate-ping opacity-10" />
                            <MapPin className="text-primary w-8 h-8 absolute drop-shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Project Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-2xl p-10 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Modify Node Detail</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Primary Registry Update</p>
                                </div>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"><X className="w-6 h-6" /></button>
                            </div>

                            <form onSubmit={handleUpdateProject} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Project Identity</label>
                                    <input required value={projectForm.name} onChange={e => setProjectForm({ ...projectForm, name: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Geospatial Nexus (Location)</label>
                                    <input required value={projectForm.location} onChange={e => setProjectForm({ ...projectForm, location: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Classification</label>
                                    <select value={projectForm.type} onChange={e => setProjectForm({ ...projectForm, type: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none">
                                        <option value="society">Residential Society</option>
                                        <option value="building">Commercial Building</option>
                                        <option value="industrial">Industrial Complex</option>
                                        <option value="townhouse">Townhouse Development</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Operational Context</label>
                                    <textarea rows={6} value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 resize-none" />
                                </div>
                                <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-3">
                                    Commit Updates
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Add Unit Modal */}
            <AnimatePresence>
                {isAddUnitModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsAddUnitModalOpen(false)}
                            className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            className="fixed inset-x-0 bottom-0 z-[130] w-full max-w-xl mx-auto bg-white shadow-2xl rounded-t-[3rem] p-12"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Sync New Physical Node</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Inventory Registration</p>
                                </div>
                                <button onClick={() => setIsAddUnitModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"><X className="w-6 h-6" /></button>
                            </div>

                            <form onSubmit={handleAddUnit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Unit Identity (Number)</label>
                                        <input required placeholder="e.g. U-402" value={unitForm.unitNumber} onChange={e => setUnitForm({ ...unitForm, unitNumber: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Valuation (Price)</label>
                                        <input type="number" required placeholder="PKR Amount" value={unitForm.price} onChange={e => setUnitForm({ ...unitForm, price: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Initial Status</label>
                                    <select value={unitForm.status} onChange={e => setUnitForm({ ...unitForm, status: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none">
                                        <option value="available">Sync: Available</option>
                                        <option value="booked">Sync: Booked</option>
                                        <option value="sold">Sync: Transferred (Sold)</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-5 bg-secondary text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-secondary/30 hover:bg-secondary-dark transition-all flex items-center justify-center gap-3">
                                    Initialize Inventory
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
