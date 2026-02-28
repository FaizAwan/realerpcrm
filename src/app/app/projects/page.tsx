"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Building2,
    Plus,
    MapPin,
    Grid2X2,
    X,
    Trash2,
    Edit2,
    LayoutGrid,
    Search,
    TrendingUp,
    ShieldCheck,
    ArrowRight,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        type: "society",
        location: "",
        description: ""
    });

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/realerpcrm/api/projects");
            const data = await res.json();
            setProjects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const searchParams = useSearchParams();
    useEffect(() => {
        if (searchParams.get("action") === "new") {
            handleOpenModal();
        }
    }, [searchParams]);

    const handleOpenModal = (project?: any) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                name: project.name,
                type: project.type,
                location: project.location || "",
                description: project.description || ""
            });
        } else {
            setEditingProject(null);
            setFormData({
                name: "",
                type: "society",
                location: "",
                description: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
        const method = editingProject ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                fetchProjects();
                setIsModalOpen(false);
            }
        } catch (error) {
            alert("Project operation failed.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete project and its data?")) return;
        try {
            const res = await fetch(`/realerpcrm/api/projects/${id}`, { method: "DELETE" });
            if (res.ok) fetchProjects();
        } catch (error) {
            alert("Delete failed.");
        }
    };

    return (
        <div className="space-y-10 pb-4">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-4xl font-semibold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        Infrastructure Assets
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Strategic Asset Deployment & <span className="text-primary font-bold">Lifecycle Management</span>.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-bold uppercase tracking-wide shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        <Plus className="w-4 h-4" />
                        Initialize Asset
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Developments", val: projects.length.toString(), color: "text-blue-500" },
                    { label: "Asset Density", val: "High", color: "text-indigo-500" },
                    { label: "Market Reach", val: "Regional", color: "text-amber-500" },
                    { label: "System Health", val: "Optimal", color: "text-primary" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all"
                    >
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-normal mb-2">{stat.label}</p>
                        <h3 className={cn("text-3xl font-semibold  tracking-normal", stat.color)}>{stat.val}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Projects Grid */}
            {isLoading ? (
                <div className="p-20 text-center flex flex-col items-center gap-4 bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                    <p className="text-slate-400 font-semibold  uppercase text-xs tracking-wide">Compiling Asset Matrix...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length === 0 ? (
                        <div className="col-span-full p-20 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                            <p className="text-slate-400 font-semibold  uppercase text-xs">No developments registered.</p>
                        </div>
                    ) : (
                        projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 p-10 hover:border-primary/30 transition-all group overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 -z-10 group-hover:bg-primary/5 transition-colors" />

                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20">
                                        <Building2 className="w-8 h-8 text-primary group-hover:text-white" />
                                    </div>
                                    <span className="px-4 py-1.5 bg-slate-50 text-[9px] font-semibold text-slate-400 uppercase tracking-wide rounded-full border border-slate-100">Project #{project.id}</span>
                                </div>

                                <h4 className="text-2xl font-semibold text-slate-800 mb-3  tracking-tight">{project.name}</h4>
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 mb-8 uppercase tracking-wide">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                    {project.location || "Remote Deployment"} • {project.type}
                                </div>

                                <div className="">
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-3 ">Resource Allocation</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Grid2X2 className="w-4 h-4 text-primary" />
                                                <span className="font-semibold text-slate-800 ">Pool Managed</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="font-semibold text-green-500 ">Growing</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(project)}
                                            className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-200"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <Link href={`/app/projects/${project.id}`}>
                                        <button className="px-6 py-3 bg-secondary text-white rounded-2xl text-[10px] font-semibold uppercase tracking-wide hover:bg-secondary-light transition-all shadow-lg shadow-secondary/20">
                                            Architecture Details
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}

            {/* Project Initialization Slide-Over */}
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
                                    <h2 className="text-xl m-0 p-0 font-semibold  tracking-normal leading-none relative z-10">{editingProject ? "Reconfigure Asset" : "Initialize Project"}</h2>
                                    <p className="text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0 flex items-center gap-2 relative z-10">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                        Certified Strategic Asset
                                    </p>
                                    <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group z-20">
                                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-2 flex-1 flex flex-col justify-center">
                                    <div className="">
                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Project Identity</label>
                                            <div className="relative group">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                    placeholder="e.g. Northern Greens"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Deployment Matrix</label>
                                            <div className="relative group">
                                                <Grid2X2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <select
                                                    required
                                                    value={formData.type}
                                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                                                >
                                                    <option value="society">Society</option>
                                                    <option value="building">Commercial Building</option>
                                                    <option value="industrial">Industrial Hub</option>
                                                    <option value="townhouse">Townhouse Complex</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Core Location</label>
                                            <div className="relative group">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    value={formData.location}
                                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                    placeholder="City/Zone"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Technical Briefing</label>
                                            <div className="relative group">
                                                <FileText className="absolute left-6 top-6 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <textarea
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-bold  text-slate-600 focus:ring-4 focus:ring-primary/10 transition-all outline-none min-h-[150px]"
                                                    placeholder="Asset parameters and details..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-1.5 mt-2 bg-primary text-white rounded-xl font-semibold text-xs uppercase tracking-normal shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                                        {editingProject ? "Verify Reconfiguration" : "Authorize Development"}
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
