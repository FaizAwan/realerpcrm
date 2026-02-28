"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    X,
    Trash2,
    Edit2,
    CheckSquare,
    ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LeadTasks() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        leadId: "", // Optional, but good to have
        dueDate: new Date().toISOString().split('T')[0],
        status: "todo",
        description: "",
        assignedTo: ""
    });

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/tasks");
            const data = await res.json();
            setTasks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch tasks");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleOpenModal = (task?: any) => {
        if (task) {
            setEditingTask(task);
            setFormData({
                title: task.title,
                leadId: task.leadId || "",
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                status: task.status || "todo",
                description: task.description || "",
                assignedTo: task.assignedTo || ""
            });
        } else {
            setEditingTask(null);
            setFormData({
                title: "",
                leadId: "",
                dueDate: new Date().toISOString().split('T')[0],
                status: "todo",
                description: "",
                assignedTo: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingTask ? `/api/tasks/${editingTask.id}` : "/api/tasks";
        const method = editingTask ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                fetchTasks();
                setIsModalOpen(false);
            }
        } catch (error) {
            alert("Process failed.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Confirm Deletion?")) return;
        try {
            const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
            if (res.ok) fetchTasks();
        } catch (error) {
            alert("Delete failed.");
        }
    };

    const toggleStatus = async (task: any) => {
        const newStatus = task.status === 'done' ? 'todo' : 'done';
        try {
            const res = await fetch(`/api/tasks/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) fetchTasks();
        } catch (error) {
            console.error("Status update failed");
        }
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">Operational Objective Matrix</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Live task synchronization</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    New Directive
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex flex-wrap gap-6 items-center justify-between bg-slate-50/20">
                    <div className="flex gap-2 p-1 bg-slate-100/50 rounded-2xl border border-slate-100">
                        <button className="px-5 py-2 bg-primary text-white rounded-xl shadow-md text-[10px] font-black uppercase tracking-widest">All Directives</button>
                        <button className="px-5 py-2 text-slate-400 hover:text-primary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Pending</button>
                        <button className="px-5 py-2 text-slate-400 hover:text-primary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Historical</button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-all" />
                        <input type="text" placeholder="Identify Directive..." className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 w-72 transition-all shadow-inner" />
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {isLoading ? (
                        <div className="p-20 text-center flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                            <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Awaiting Pulse...</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {tasks.map((task, i) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-6 hover:bg-slate-50/50 transition-all group flex items-start gap-6 relative"
                                >
                                    {task.status === 'done' && <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500" />}
                                    <button
                                        onClick={() => toggleStatus(task)}
                                        className={cn(
                                            "mt-1 w-8 h-8 rounded-xl border flex items-center justify-center transition-all shadow-sm",
                                            task.status === 'done' ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-slate-200 hover:border-primary text-transparent hover:text-primary/20"
                                        )}
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className={cn(
                                                    "text-sm font-bold transition-all",
                                                    task.status === 'done' ? "text-slate-300 line-through" : "text-slate-800"
                                                )}>{task.title}</h3>
                                                <div className="flex flex-wrap items-center gap-5 mt-3 text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                                                    <span className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg group-hover:bg-white transition-all">
                                                        <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
                                                    </span>
                                                    <span className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg group-hover:bg-white transition-all">
                                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                                        {task.status === 'done' ? "Resolved" : "Active Flow"}
                                                    </span>
                                                    <div className={cn("px-2 py-1 rounded-lg italic", task.status === 'done' ? "bg-emerald-50 text-emerald-600" : "bg-primary/5 text-primary")}>
                                                        Registry #{task.id}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenModal(task)} className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-primary transition-all rounded-xl shadow-sm"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(task.id)} className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-500 transition-all rounded-xl shadow-sm"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-[11px] text-slate-500 font-medium leading-relaxed max-w-2xl">{task.description || "No execution parameters provided for this objective."}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                    {!isLoading && tasks.length === 0 && (
                        <div className="p-20 text-center flex flex-col items-center gap-6 saturate-0 opacity-40">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                                <CheckSquare className="w-10 h-10 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Directive Registry Empty</p>
                                <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold">Initialize a new objective to begin tracking.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Task Slide-Over */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-2xl flex flex-col"
                        >
                            <div className="bg-slate-900 p-12 text-white shrink-0 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                                            <CheckSquare className="w-7 h-7 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black tracking-tighter mb-1">{editingTask ? "Amend Directive" : "Initial Objective"}</h2>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Directive Parameter Protocol</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-12 space-y-10 flex-1 overflow-y-auto bg-slate-50/30">
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Directive Nomenclature</label>
                                        <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-6 py-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/10 transition-all italic" placeholder="System Objective" />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Temporal Deadline</label>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input type="date" required value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/10 transition-all" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Execution Context</label>
                                        <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={5} className="w-full px-6 py-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/10 resize-none transition-all placeholder:italic" placeholder="Operational parameters and acquisition specifics..." />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-4 group">
                                    {editingTask ? "Commit Matrix Updates" : "Initialize Protocol Objective"}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function UsersIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
