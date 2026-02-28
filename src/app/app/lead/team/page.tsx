"use client";

import { motion } from "framer-motion";
import {
    Download,
    Filter,
    Search,
    Users,
    Phone,
    CornerUpRight,
    Eye,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    ShieldCheck,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function TeamDashboard() {
    const [team, setTeam] = useState<any[]>([]);
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [teamRes, leadsRes] = await Promise.all([
                fetch("/api/team"),
                fetch("/api/leads")
            ]);
            const teamData = await teamRes.json();
            const leadsData = await leadsRes.json();
            setTeam(Array.isArray(teamData) ? teamData : []);
            setLeads(Array.isArray(leadsData) ? leadsData : []);
        } catch (error) {
            console.error("Failed to fetch team data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filters = [
        { label: "Show by period", value: "All" },
        { label: "Date from", value: "16 Feb, 2026" },
        { label: "Date to", value: "21 Feb, 2026" },
        { label: "User status", value: "Active users" },
    ];

    const stats = {
        totalLeads: leads.length,
        unreached: leads.filter(l => l.status === 'new').length,
        won: leads.filter(l => l.status === 'won').length,
        contacted: leads.filter(l => l.status !== 'new').length
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Title and main actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">Team Intelligence Dashboard</h1>
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">Live Sync</div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all border border-slate-100 shadow-sm">
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        <Filter className="w-4 h-4" />
                        Refine Matrix
                    </button>
                </div>
            </div>

            {/* active filters */}
            <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">Core Parameters:</span>
                {filters.map((filter, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 shadow-sm">
                        {filter.label}: <span className="text-primary">{filter.value}</span>
                    </div>
                ))}
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50 rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4 relative z-10">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Unreached Delta</p>
                    <h2 className="text-3xl font-black text-slate-800 mt-1 relative z-10">{stats.unreached}</h2>
                    <div className="mt-4 inline-flex items-center px-2 py-1 rounded-lg bg-rose-100 text-[10px] font-bold text-rose-600 relative z-10">
                        {Math.round((stats.unreached / (stats.totalLeads || 1)) * 100)} % Variance
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Acquisition Velocity</p>
                        <h2 className="text-3xl font-black text-primary">{stats.contacted} <span className="text-slate-300">/</span> {stats.totalLeads}</h2>
                    </div>
                    <div className="w-full bg-slate-50 h-2 rounded-full mt-4 overflow-hidden border border-slate-100">
                        <div
                            className="bg-primary h-full rounded-full transition-all duration-1000"
                            style={{ width: `${(stats.contacted / (stats.totalLeads || 1)) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="md:col-span-2 lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Aggregated KPI Stats</h3>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatItem icon={Users} val={stats.totalLeads} label="Universe" color="blue" />
                        <StatItem icon={Phone} val={`${Math.round((stats.contacted / (stats.totalLeads || 1)) * 100)}%`} label="Voice Hit" color="emerald" />
                        <StatItem icon={CheckCircle2} val={stats.won} label="Conversion" color="indigo" />
                        <StatItem icon={Eye} val="--" label="Physicals" color="amber" />
                    </div>
                </div>
            </div>

            {/* Agent KPIs Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <div>
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Agent Performance Registry</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Live Operational Metrics</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input type="text" placeholder="Identify Agent..." className="pl-12 pr-6 py-2.5 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-primary/5 w-64 shadow-inner" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white border-b border-slate-100 font-black text-slate-400 uppercase text-[9px] tracking-widest">
                            <tr>
                                <th className="px-6 py-5">S#</th>
                                <th className="px-6 py-5">Initials</th>
                                <th className="px-6 py-5">Payload Given</th>
                                <th className="px-6 py-5">Hit Rate%</th>
                                <th className="px-6 py-5">Voice Convo</th>
                                <th className="px-6 py-5">Conversion</th>
                                <th className="px-6 py-5">Registry Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center uppercase text-[10px] tracking-[0.2em] text-slate-300 animate-pulse">Establishing Agent Linkage...</td>
                                </tr>
                            ) : team.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center uppercase text-[10px] tracking-[0.2em] text-slate-300 italic">No operators identified in this tenant.</td>
                                </tr>
                            ) : (
                                team.map((agent, i) => (
                                    <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors group italic">
                                        <td className="px-6 py-5 text-[10px] text-slate-300 not-italic">{i + 1}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-sm not-italic group-hover:bg-primary group-hover:text-white transition-all">
                                                    {agent.username[0].toUpperCase()}
                                                </div>
                                                <span className="text-sm font-bold text-slate-800 not-italic">{agent.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 not-italic text-sm">{agent.leadsGiven}</td>
                                        <td className="px-6 py-5 not-italic text-sm text-emerald-500">{agent.contactedRate}%</td>
                                        <td className="px-6 py-5 not-italic text-sm">{agent.convoRate}%</td>
                                        <td className="px-6 py-5 not-italic text-sm">{agent.wonLeads}</td>
                                        <td className="px-6 py-5 not-italic text-sm text-primary">{agent.value.toLocaleString()} PKR</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
                <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 h-[450px] shadow-sm flex flex-col relative overflow-hidden group hover:border-primary/20 transition-all">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Operational Flow Analysis
                    </h3>
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-50 rounded-3xl bg-slate-50/30">
                        <div className="w-20 h-1 bg-slate-100 rounded-full animate-pulse" />
                        <p className="text-slate-300 font-bold uppercase text-[10px] tracking-[0.3em]">Wait for Data Sync</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 h-[450px] shadow-sm flex flex-col relative overflow-hidden group hover:border-emerald-500/20 transition-all">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Security Trust Score
                    </h3>
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <div className="w-32 h-32 border-[12px] border-emerald-50 border-t-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                            <span className="text-3xl font-black text-slate-800 tracking-tighter">9.2</span>
                        </div>
                        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-4">Protocol Compliance</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatItem({ icon: Icon, val, label, color }: any) {
    const colors: any = {
        blue: "bg-blue-50 text-blue-500",
        emerald: "bg-emerald-50 text-emerald-500",
        indigo: "bg-indigo-50 text-indigo-500",
        amber: "bg-amber-50 text-amber-500"
    };

    return (
        <div className="flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm", colors[color])}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xl font-black text-slate-800 tracking-tighter leading-none">{val}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{label}</p>
            </div>
        </div>
    );
}
