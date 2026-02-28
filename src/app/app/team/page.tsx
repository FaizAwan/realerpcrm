"use client";

import { motion } from "framer-motion";
import {
    Download,
    Filter,
    Search,
    Users,
    Mail,
    UserCircle,
    BadgeCheck,
    Settings,
    MoreHorizontal,
    Plus,
    ShieldAlert,
    Clock,
    UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function GlobalTeamManagement() {
    const [team, setTeam] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchTeam = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/realerpcrm/api/team");
            const data = await res.json();
            setTeam(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch global team registry");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const filteredTeam = team.filter(member =>
        member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: team.length,
        admins: team.filter(m => m.role === 'admin' || m.role === 'superadmin').length,
        agents: team.filter(m => m.role === 'agent').length,
        managers: team.filter(m => m.role === 'manager').length
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-2xl">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        Team Hierarchy & Management
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Control access levels, monitor agent performance, and synchronize your workforce.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="w-4 h-4" /> Export Registry
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-105 transition-all">
                        <UserPlus className="w-4 h-4" /> Provision New User
                    </button>
                </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={Users} label="Global Headcount" val={stats.total} color="primary" />
                <MetricCard icon={BadgeCheck} label="Primary Administrators" val={stats.admins} color="emerald" />
                <MetricCard icon={UserCircle} label="Active Field Force" val={stats.agents} color="indigo" />
                <MetricCard icon={ShieldAlert} label="System Managers" val={stats.managers} color="amber" />
            </div>

            {/* Registry Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col relative transition-all hover:shadow-xl hover:shadow-slate-200/50">
                <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <BadgeCheck className="w-5 h-5 text-primary" /> Personnel Registry
                        </h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Institutional User Matrix</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                            type="text"
                            placeholder="SEARCH IDENTITY..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FBFBFC] text-slate-400 font-black uppercase text-[9px] tracking-[0.2em] border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-6">Operator Details</th>
                                <th className="px-8 py-6">Functional Role</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Synchronized On</th>
                                <th className="px-8 py-6 text-right">Operational Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                                            <span className="uppercase text-[10px] tracking-[0.3em] text-slate-300 font-black animate-pulse">Initializing Data Stream...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTeam.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center uppercase text-[10px] tracking-[0.2em] text-slate-300 italic">No operators identified in the designated search parameters.</td>
                                </tr>
                            ) : (
                                filteredTeam.map((agent) => (
                                    <tr key={agent.id} className="group hover:bg-slate-50 transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-black text-lg border border-slate-200 group-hover:from-primary group-hover:to-primary-dark group-hover:text-white group-hover:border-transparent transition-all shadow-sm">
                                                    {agent.username[0].toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[15px] font-bold text-slate-800 leading-tight">{agent.username}</span>
                                                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-1">
                                                        <Mail className="w-3 h-3 translate-y-[0.5px]" /> {agent.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.15em]",
                                                roleStyles[agent.role as keyof typeof roleStyles]?.bg || "bg-slate-100 text-slate-500 border-slate-200"
                                            )}>
                                                {roleStyles[agent.role as keyof typeof roleStyles]?.icon && <Settings className="w-3 h-3" />}
                                                {agent.role}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Connected</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(agent.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                                <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-[#FBFBFC] border-t border-slate-100 flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {filteredTeam.length} Active System Operators</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase text-slate-400 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase text-slate-400 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const roleStyles = {
    superadmin: { bg: "bg-rose-50 text-rose-600 border-rose-100", icon: true },
    admin: { bg: "bg-primary/5 text-primary border-primary/10", icon: true },
    manager: { bg: "bg-amber-50 text-amber-600 border-amber-100", icon: true },
    agent: { bg: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: false },
};

function MetricCard({ icon: Icon, label, val, color }: any) {
    const colors: any = {
        primary: "bg-primary/5 text-primary border-primary/10",
        emerald: "bg-emerald-50 text-emerald-500 border-emerald-100",
        indigo: "bg-indigo-50 text-indigo-500 border-indigo-100",
        amber: "bg-amber-50 text-amber-500 border-amber-100"
    };

    return (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-all cursor-default">
            <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:scale-150 transition-transform duration-700", colors[color].split(' ')[0])} />
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 relative z-10 shadow-sm", colors[color])}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">{label}</p>
            <h2 className="text-4xl font-black text-slate-800 mt-2 relative z-10 tracking-tighter">{val}</h2>
        </div>
    );
}
