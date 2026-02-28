"use client";

import { useSession } from "next-auth/react";
import {
    User,
    Mail,
    Shield,
    Calendar,
    Key,
    Bell,
    Globe,
    ChevronRight,
    Camera,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserProfilePage() {
    const { data: session } = useSession();
    const user = session?.user;

    const profileSections = [
        {
            title: "Security & Authentication",
            items: [
                { icon: Key, label: "Two-Factor Authentication", desc: "Add an extra layer of security", status: "Inactive", action: "Enable" },
                { icon: Shield, label: "Login History", desc: "Monitor recent account activity", status: "7 Devices", action: "Review" },
            ]
        },
        {
            title: "Notifications & Connectivity",
            items: [
                { icon: Bell, label: "Push Notifications", desc: "System alerts and lead updates", status: "Active", action: "Configure" },
                { icon: Globe, label: "Regional Settings", desc: "Timezone and language preference", status: "UTC+5", action: "Edit" },
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Profile Hero */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm relative group transition-all hover:shadow-xl hover:shadow-slate-200/50">
                <div className="h-48 bg-gradient-to-r from-primary/20 via-primary to-primary-dark relative">
                    <div className="absolute inset-0 bg-grid-white/10" />
                </div>

                <div className="px-10 pb-10 relative">
                    <div className="flex flex-col md:flex-row items-end gap-6 -mt-20">
                        <div className="relative group/avatar">
                            <div className="w-40 h-40 rounded-3xl bg-white p-2 shadow-2xl relative z-10 overflow-hidden ring-4 ring-white">
                                <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center text-5xl font-black text-slate-300 group-hover/avatar:bg-primary group-hover/avatar:text-white transition-all duration-500">
                                    {(user?.name || user?.email || "U")[0].toUpperCase()}
                                </div>
                                <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20">
                                    <Camera className="text-white w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 pb-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user?.name || "Authorized Personnel"}</h1>
                                <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-emerald-200/50">
                                    <CheckCircle2 className="w-3 h-3" /> Identity Verified
                                </div>
                            </div>
                            <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {user?.email}
                            </p>
                        </div>

                        <button className="px-8 py-3.5 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all mb-2 ring-1 ring-white/20">
                            Edit Identity Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Index</p>
                        <p className="text-2xl font-black text-slate-800 tracking-tighter mt-0.5">9.8/10.0</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Nodes</p>
                        <p className="text-2xl font-black text-slate-800 tracking-tighter mt-0.5">Admin Level</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Since</p>
                        <p className="text-2xl font-black text-slate-800 tracking-tighter mt-0.5">Feb 2024</p>
                    </div>
                </div>
            </div>

            {/* Core Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                {profileSections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                            {section.title}
                        </h3>
                        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                            {section.items.map((item, i) => (
                                <div key={i} className={cn(
                                    "p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors",
                                    i !== section.items.length - 1 && "border-b border-slate-100"
                                )}>
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{item.label}</p>
                                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                            {item.status}
                                        </span>
                                        <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest hover:underline">
                                            {item.action} <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
