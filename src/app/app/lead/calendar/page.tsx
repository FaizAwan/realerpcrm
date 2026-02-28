"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    Plus,
    X,
    Filter,
    CheckCircle2,
    Clock3,
    AlertCircle,
    ChevronRight as ChevronRightIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LeadCalendar() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 21));

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

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const febDays = Array.from({ length: 28 }, (_, i) => i + 1);

    const getTasksForDay = (day: number) => {
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            const date = new Date(task.dueDate);
            return date.getDate() === day && date.getMonth() === 1 && date.getFullYear() === 2026;
        });
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">Temporal Engagement Matrix</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Operational Timeline Sync</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        Synchronize
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Schedule entry
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row">
                {/* Left side: Calendar Grid */}
                <div className="flex-1 p-10 border-r border-slate-100 bg-white">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                <CalendarIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tighter">February 2026</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all border border-slate-100 group">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all border border-slate-100 group">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {days.map(day => (
                            <div key={day} className="py-2 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">{day}</div>
                        ))}
                        {febDays.map(day => {
                            const dayTasks = getTasksForDay(day);
                            const isToday = day === 21;

                            return (
                                <div key={day} className={cn(
                                    "min-h-[140px] p-4 rounded-3xl transition-all cursor-pointer relative group border-2 border-transparent",
                                    isToday ? "bg-primary/5 border-primary/20 shadow-inner" : "bg-slate-50/50 hover:bg-white hover:border-slate-100 hover:shadow-xl"
                                )}>
                                    <span className={cn(
                                        "text-xs font-black w-8 h-8 flex items-center justify-center rounded-xl transition-all shadow-sm",
                                        isToday ? "bg-primary text-white scale-110" : "bg-white text-slate-400 group-hover:text-primary group-hover:scale-110"
                                    )}>{day}</span>

                                    <div className="mt-4 space-y-2">
                                        {dayTasks.slice(0, 3).map((task, i) => (
                                            <div key={i} className={cn(
                                                "px-3 py-1.5 rounded-xl text-[9px] font-bold leading-tight truncate shadow-sm italic",
                                                task.status === 'done' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-white text-slate-600 border border-slate-100"
                                            )}>
                                                {task.title}
                                            </div>
                                        ))}
                                        {dayTasks.length > 3 && (
                                            <div className="text-[8px] font-bold text-slate-400 text-center uppercase tracking-widest">+ {dayTasks.length - 3} More</div>
                                        )}
                                    </div>
                                    {dayTasks.length > 0 && (
                                        <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right side: Summary/Upcoming */}
                <div className="w-full lg:w-96 p-10 bg-slate-50/30">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            Agenda: {currentDate.getDate()} Feb
                        </h3>
                        <Filter className="w-4 h-4 text-slate-300 hover:text-primary cursor-pointer transition-all" />
                    </div>

                    <div className="space-y-5">
                        {isLoading ? (
                            <div className="p-10 text-center uppercase text-[10px] tracking-widest text-slate-300 italic animate-pulse">Syncing Timeline...</div>
                        ) : getTasksForDay(21).length === 0 ? (
                            <div className="p-10 text-center flex flex-col items-center gap-4 bg-white/50 rounded-3xl border border-dashed border-slate-200">
                                <AlertCircle className="w-8 h-8 text-slate-200" />
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No Protocol Scheduled</p>
                            </div>
                        ) : (
                            getTasksForDay(21).map((task, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 relative overflow-hidden group hover:scale-105 transition-all">
                                    <div className={cn(
                                        "absolute top-0 left-0 bottom-0 w-1.5",
                                        task.status === 'done' ? "bg-emerald-500" : "bg-primary"
                                    )} />
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-[10px] font-black text-slate-300 uppercase italic">
                                            {task.status === 'done' ? "Historical Record" : "Active Engagement"}
                                        </p>
                                        {task.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-800 leading-tight mb-3 group-hover:text-primary transition-colors">{task.title}</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                            <Clock3 className="w-3 h-3" />
                                            10:00 AM
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-primary uppercase tracking-tighter">
                                            <ChevronRightIcon className="w-3 h-3" />
                                            Registry Detail
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40 group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-primary italic">Strategy Recap</h4>
                        <p className="text-xs font-bold leading-relaxed text-slate-300 mb-6 italic">Protocol indicates 3 key touchpoints pending for higher acquisition resonance.</p>
                        <button className="w-full py-3 bg-primary text-white rounded-2xl font-bold uppercase text-[9px] tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">Generate Summary</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
