"use client";

import { motion } from "framer-motion";
import {
    Filter,
    Search,
    Download,
    BookOpen,
    DollarSign,
    Clock,
    Wallet,
    TrendingDown,
    ChevronDown,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LeadReports() {
    const stats = [
        { label: "Bookings", value: "36", icon: BookOpen, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Deal price", value: "236,041 k", icon: DollarSign, color: "text-sky-500", bg: "bg-sky-50" },
        { label: "Due", value: "93,302 k", icon: Clock, color: "text-slate-400", bg: "bg-slate-50" },
        { label: "Received", value: "57,715 k", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Expense", value: "180 k", icon: TrendingDown, color: "text-rose-500", bg: "bg-rose-50" },
    ];

    const reportData = [
        { site: "RealERPCRM apartments", bookings: 7, dealPrice: "165,699,040", due: "56,184,561", receipts: "-", expense: 0 },
        { site: "Falaknaz Hills View (Falaknaz Group)", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
        { site: "Hill Top Residency", bookings: 0, dealPrice: 0, due: "145,000", receipts: "-", expense: 0 },
        { site: "AN Residency", bookings: 17, dealPrice: "31,811,600", due: "16,230,480", receipts: "-", expense: 0 },
        { site: "Samad Housing Society", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
        { site: "Dream City", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 180000 },
        { site: "Sohaib Society", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
        { site: "Munib Bros Housing", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
        { site: "Zam Zam golden", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
        { site: "Finvest homes", bookings: 0, dealPrice: 0, due: "3,500,000", receipts: "-", expense: 0 },
        { site: "Baloch colony", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
        { site: "Jamali housing society", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
        { site: "Stayrunners", bookings: 0, dealPrice: 0, due: 0, receipts: "-", expense: 0 },
    ];

    return (
        <div className="space-y-6 pb-20">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stats.map((stat, i) => (
                    <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", stat.bg)}>
                            <stat.icon className={cn("w-5 h-5", stat.color)} />
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-bold text-slate-800">{stat.value}</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-slate-800">Overall summary</h2>
                        <div className="flex items-center gap-2">
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                    This month
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-all">
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-bold text-emerald-600 italic">Filters:</span>
                        {[
                            { label: "Date from", val: "01/08/2024" },
                            { label: "Date to", val: "31/08/2024" },
                            { label: "Cash based", val: "Yes" },
                        ].map(f => (
                            <div key={f.label} className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-700">
                                {f.label}: {f.val}
                                <X className="w-3 h-3" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase">
                                <th className="px-6 py-3 w-16">S#</th>
                                <th className="px-6 py-3">Site name</th>
                                <th className="px-6 py-3 text-right">Bookings</th>
                                <th className="px-6 py-3 text-right">Deal price</th>
                                <th className="px-6 py-3 text-right">Due</th>
                                <th className="px-6 py-3 text-right">Receipts</th>
                                <th className="px-6 py-3 text-right">Expense</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                            {reportData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-slate-300">{i + 1}</td>
                                    <td className="px-6 py-4 font-bold text-primary group-hover:underline cursor-pointer">{row.site}</td>
                                    <td className="px-6 py-4 text-right text-sky-600">{row.bookings}</td>
                                    <td className="px-6 py-4 text-right text-emerald-600">{row.dealPrice.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-rose-500">{row.due}</td>
                                    <td className="px-6 py-4 text-right text-slate-300">{row.receipts}</td>
                                    <td className="px-6 py-4 text-right text-slate-400">{row.expense.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
