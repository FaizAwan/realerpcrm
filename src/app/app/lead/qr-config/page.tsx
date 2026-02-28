"use client";

import { motion } from "framer-motion";
import {
    QrCode,
    Plus,
    Download,
    Share2,
    ExternalLink,
    ShieldCheck,
    Zap,
    Sparkles,
    Globe
} from "lucide-react";
import { useState } from "react";

export default function QrConfig() {
    const [qrs, setQrs] = useState([
        { id: "QR-101", name: "Main Exhibition Hall", scans: 142, leads: 12, status: "Active", source: "Exhibition" },
        { id: "QR-102", name: "Facebook Billboard A", scans: 2561, leads: 84, status: "Active", source: "Digital Marketing" },
        { id: "QR-103", name: "AN Residency Site Office", scans: 89, leads: 5, status: "Active", source: "Walk-in" },
    ]);

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">QR Acquisition Matrix</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Physical touchpoint tracking protocol</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" />
                    Generate Node
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">Active Tracking Nodes</h3>
                            <button className="text-[10px] font-bold text-primary uppercase">View Analytics</button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {qrs.map((qr) => (
                                <div key={qr.id} className="p-6 hover:bg-slate-50/50 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                            <QrCode className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-sm font-bold text-slate-800">{qr.name}</h4>
                                                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-100 text-emerald-600">{qr.status}</span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5 font-black text-slate-300">
                                                    ID: <span className="text-slate-500">{qr.id}</span>
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Globe className="w-3 h-3 text-primary" />
                                                    {qr.source}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10 text-right">
                                        <div>
                                            <p className="text-xs font-black text-slate-800">{qr.scans}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Scans</p>
                                        </div>
                                        <div className="pr-4">
                                            <p className="text-xs font-black text-emerald-500">{qr.leads}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Leads</p>
                                        </div>
                                        <button className="p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-300 hover:text-primary transition-all">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />
                        <Sparkles className="w-10 h-10 text-primary mb-6 animate-pulse" />
                        <h3 className="text-xl font-black tracking-tight mb-4 leading-tight">Augmented Physical Tracking</h3>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8">
                            Deploy QR nodes in physical spaces to bridge the gap between architectural presence and digital acquisition.
                        </p>
                        <div className="space-y-4">
                            <FeatureItem icon={ShieldCheck} label="Encrypted Linkage" />
                            <FeatureItem icon={Zap} label="Real-time Webhooks" />
                            <FeatureItem icon={Share2} label="Multi-channel Sync" />
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm group cursor-pointer hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Aggregate</p>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                        <h4 className="text-2xl font-black text-slate-800 tracking-tighter">2,792 Scans</h4>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase mt-1">+14.2% Growth Index</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ icon: Icon, label }: any) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{label}</span>
        </div>
    );
}
