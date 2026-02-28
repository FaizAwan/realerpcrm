"use client";

import { motion } from "framer-motion";
import {
    Facebook,
    Linkedin,
    Globe,
    MessageCircle,
    Instagram,
    Sparkles,
    CheckCircle2,
    Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntegrationsPage() {
    const integrations = [
        {
            name: "Meta webhooks",
            icon: Facebook,
            status: "available",
            buttonText: "Login",
            buttonColor: "bg-primary text-white hover:bg-primary-dark"
        },
        {
            name: "Whatsapp",
            icon: MessageCircle,
            status: "active",
            buttonText: "Contact now",
            buttonColor: "bg-emerald-500 text-white hover:bg-emerald-600"
        },
        {
            name: "AI Integration",
            icon: Cpu,
            status: "active",
            buttonText: "Configure AI",
            buttonColor: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
        },
        {
            name: "Instagram",
            icon: Instagram,
            status: "available",
            buttonText: "Login",
            buttonColor: "bg-slate-100 text-slate-400 hover:text-slate-600"
        },
        {
            name: "Linkedin",
            icon: Linkedin,
            status: "soon",
            buttonText: "Coming soon",
            buttonColor: "bg-slate-100 text-slate-400 cursor-not-allowed"
        },
        {
            name: "Google ads",
            icon: Globe,
            status: "soon",
            buttonText: "Coming soon",
            buttonColor: "bg-slate-100 text-slate-400 cursor-not-allowed"
        },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800">Integrations</h1>
                    <p className="text-xs text-slate-500 mt-1">Connect your acquisition channels to the central data nexus.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">AI Operations Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((item, i) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={cn(
                            "bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm group hover:shadow-md transition-all relative overflow-hidden",
                            item.name === "AI Integration" && "border-indigo-200 ring-1 ring-indigo-50"
                        )}
                    >
                        {item.name === "AI Integration" && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rotate-45 translate-x-12 -translate-y-12 rounded-full blur-2xl" />
                        )}

                        <div className="flex items-center gap-4 relative z-10">
                            <div className={cn(
                                "w-14 h-14 rounded-xl flex items-center justify-center border transition-all",
                                item.status === 'soon' ? "bg-slate-50 border-white grayscale" : "bg-white border-slate-100 group-hover:border-primary/20 shadow-sm"
                            )}>
                                <item.icon className={cn(
                                    "w-7 h-7",
                                    item.name === 'Meta webhooks' ? "text-blue-600" :
                                        item.name === 'Whatsapp' ? "text-emerald-500" :
                                            item.name === 'Instagram' ? "text-pink-600" :
                                                item.name === 'Linkedin' ? "text-sky-700" :
                                                    item.name === 'AI Integration' ? "text-indigo-600" :
                                                        "text-blue-500"
                                )} />
                            </div>
                            <div>
                                <span className="font-bold text-slate-700 block">{item.name}</span>
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                                    {item.status === 'soon' ? "Planned" : "Channel Sync"}
                                </span>
                            </div>
                        </div>
                        <button className={cn(
                            "px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95",
                            item.buttonColor
                        )}>
                            {item.buttonText}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* AI Capability Highlight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl shadow-indigo-200/20"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Omniscient AI Nexus</h3>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                            Your integrations are now monitored by the RealERPCRM AI engine. It automatically categorizes leads from
                            <span className="text-white font-bold mx-1">Instagram</span> and <span className="text-white font-bold mx-1">WhatsApp</span>
                            using sentiment analysis and historical conversion patterns.
                        </p>
                    </div>
                    <button className="md:ml-auto px-8 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
                        View AI Training
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
