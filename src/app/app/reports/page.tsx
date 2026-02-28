"use client";

import {
    PieChart,
    BarChart3,
    TrendingUp,
    Download,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectHeader } from "@/components/ProjectHeader";

const reportCards = [
    { title: "Monthly Revenue", value: "PKR 12.5M", change: "+14%", isPositive: true, icon: TrendingUp },
    { title: "New Bookings", value: "48", change: "+8%", isPositive: true, icon: BarChart3 },
    { title: "Lead Conversion", value: "24%", change: "-2%", isPositive: false, icon: PieChart },
    { title: "Pending Recoveries", value: "PKR 4.2M", change: "+12%", isPositive: false, icon: FileText },
];

export default function ReportsPage() {
    return (
        <div className="space-y-10 pb-4 max-w-[1400px] mx-auto">
            <ProjectHeader />
            {/* Sleek Page Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <PieChart className="w-4 h-4 text-primary" />
                        </div>
                        Strategic Analytics
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Data-driven insights for <span className="text-primary font-bold">Institutional Growth</span>.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-all focus:ring-2 focus:ring-slate-200 focus:outline-none">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        Date Range
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold tracking-wide shadow-sm hover:bg-primary-dark transition-all focus:ring-2 focus:ring-primary/20">
                        <Download className="w-4 h-4" />
                        Export Data
                    </button>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reportCards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:border-primary/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors text-slate-400 group-hover:text-white">
                                <card.icon className="w-6 h-6" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-semibold ",
                                card.isPositive ? "text-green-500" : "text-rose-500"
                            )}>
                                {card.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {card.change}
                            </div>
                        </div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">{card.title}</p>
                        <h3 className="text-2xl font-semibold text-slate-800  tracking-tight">{card.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Breakdown Chart Mockup */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h4 className="text-xl font-semibold text-slate-800  tracking-tight uppercase">Revenue Stream breakdown</h4>
                        <div className="flex items-center gap-4">
                            <button className="text-[10px] font-semibold text-primary uppercase tracking-wide border-b-2 border-primary">Monthly</button>
                            <button className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Yearly</button>
                        </div>
                    </div>

                    <div className="h-[400px] w-full flex items-end justify-between gap-4 py-10">
                        {[40, 70, 45, 90, 65, 80, 55, 100, 85, 75, 60, 95].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className="w-full bg-slate-100 rounded-t-xl relative group"
                            >
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-primary">
                                    {h}M
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between px-2 text-[10px] font-semibold text-slate-300 uppercase tracking-wide">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
                    </div>
                </div>

                {/* Performance Table */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 p-10">
                    <h4 className="text-xl font-semibold text-slate-800  tracking-tight uppercase mb-8">Agent performance</h4>
                    <div className="">
                        {[
                            { name: "Ali Ahmed", score: "92", leads: "145", status: "Gold" },
                            { name: "Sara Khan", score: "88", leads: "120", status: "Gold" },
                            { name: "Hamza Malik", score: "75", leads: "98", status: "Silver" },
                            { name: "Zainab Ali", score: "68", leads: "76", status: "Silver" },
                            { name: "Bilal Sheikh", score: "54", leads: "42", status: "Bronze" },
                        ].map((agent, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 transition-colors p-3 rounded-2xl -mx-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xs  border-2 border-white shadow-sm">
                                    {agent.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-sm font-semibold text-slate-800 ">{agent.name}</h5>
                                    <p className="text-[10px] font-bold text-slate-400 ">{agent.leads} Leads Reached</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-primary ">{agent.score}%</p>
                                    <span className="text-[9px] font-semibold text-slate-300 uppercase tracking-wide">{agent.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 py-4 bg-slate-50 text-slate-400 rounded-2xl font-semibold text-[10px] uppercase tracking-wide hover:bg-slate-100 transition-all border border-slate-100">
                        View Complete Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
}
