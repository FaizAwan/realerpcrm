"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    CheckCircle2,
    Circle,
    Calendar,
    User,
    Search,
    ChevronRight,
    X,
    Trash2,
    Edit2,
    CheckSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function TasksPage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "todo"
    });

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/realerpcrm/api/tasks");
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
                description: task.description || "",
                status: task.status
            });
        } else {
            setEditingTask(null);
            setFormData({
                title: "",
                description: "",
                status: "todo"
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
            alert("Task operation failed.");
        }
    };

    const toggleStatus = async (task: any) => {
        const newStatus = task.status === "done" ? "todo" : "done";
        try {
            const res = await fetch(`/realerpcrm/api/tasks/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) fetchTasks();
        } catch (error) {
            console.error("Failed to toggle status");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Remove this task?")) return;
        try {
            const res = await fetch(`/realerpcrm/api/tasks/${id}`, { method: "DELETE" });
            if (res.ok) fetchTasks();
        } catch (error) {
            alert("Delete failed.");
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-4xl font-semibold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <CheckSquare className="w-6 h-6 text-white" />
                        </div>
                        Deployment Directives
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Systematic Task Execution & <span className="text-primary font-bold">Lifecycle Control</span>.</p>
                </motion.div>
                <div className="flex items-center gap-3">
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-bold uppercase tracking-wide shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        <Plus className="w-4 h-4" />
                        New Assignment
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-md shadow-secondary/5 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
                    <div className="flex gap-4">
                        <button className="px-8 py-3 bg-primary text-white rounded-2xl text-[10px] uppercase font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all">All Tasks</button>
                        <button className="px-8 py-3 text-slate-400 hover:text-primary rounded-2xl text-[10px] uppercase font-semibold tracking-wide transition-all">Active</button>
                        <button className="px-8 py-3 text-slate-400 hover:text-primary rounded-2xl text-[10px] uppercase font-semibold tracking-wide transition-all">Archived</button>
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {isLoading ? (
                        <div className="p-20 text-center flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-slate-400 font-semibold  uppercase text-xs tracking-wide">Refreshing Task Engine...</p>
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="p-20 text-center">
                            <p className="text-slate-400 font-semibold  uppercase text-xs">No strategic tasks in the pipeline.</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 hover:bg-slate-50/30 transition-all group flex items-start gap-8"
                            >
                                <button
                                    onClick={() => toggleStatus(task)}
                                    className="mt-1 flex-shrink-0"
                                >
                                    {task.status === 'done'
                                        ? <CheckCircle2 className="w-8 h-8 text-primary" />
                                        : <Circle className="w-8 h-8 text-slate-200 group-hover:text-primary transition-colors" />}
                                </button>

                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h6 className={cn(
                                            "font-semibold text-xl  transition-all tracking-tight",
                                            task.status === 'done' ? "text-slate-300 line-through" : "text-slate-800"
                                        )}>
                                            {task.title}
                                        </h6>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium  leading-relaxed mb-4">{task.description || "No supplemental details provided."}</p>

                                    <div className="flex flex-wrap items-center gap-8 text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            Target: {new Date(task.dueDate || Date.now()).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-primary" />
                                            Origin: Authorized User
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(task)}
                                        className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-200"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Task Slide-Over Panel */}
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
                                    <h2 className="text-xl m-0 p-0 font-semibold  tracking-normal leading-none relative z-10">{editingTask ? "Modify Task" : "Log Objective"}</h2>
                                    <p className="text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0 flex items-center gap-2 relative z-10">
                                        <CheckSquare className="w-4 h-4 text-white" />
                                        Precision Goal Setting
                                    </p>
                                    <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group z-20">
                                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-2 flex-1 flex flex-col justify-center">
                                    <div className="">
                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Objective Title</label>
                                            <div className="relative group">
                                                <CheckSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    value={formData.title}
                                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                    placeholder="Primary Mission Statement"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Context & Details (Optional)</label>
                                            <div className="relative group">
                                                <Edit2 className="absolute left-6 top-6 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <textarea
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-bold  text-slate-600 focus:ring-4 focus:ring-primary/10 transition-all outline-none min-h-[160px] resize-y"
                                                    placeholder="Define execution parameters..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-1.5 mt-2 bg-primary text-white rounded-xl font-semibold text-xs uppercase tracking-normal shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                                        {editingTask ? "Update Objective" : "Commit Mission"}
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
