"use client";

import { ChevronDown, ChevronRight, Download, Filter, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BalanceSheetPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        Balance Sheet
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Snapshot of your company&apos;s financial position at a specific point in time.</p>
                </motion.div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
                        <Filter className="w-4 h-4" />
                        Options
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00605A] text-white rounded-lg text-sm font-medium hover:bg-[#004f4a] transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 text-sm w-full sm:w-auto">
                    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">As of Date</label>
                        <input type="date" defaultValue="2024-03-24" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#059669]/20" />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Compare With</label>
                        <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#059669]/20">
                            <option>Previous Year</option>
                            <option>Previous Month</option>
                            <option>None</option>
                        </select>
                    </div>
                </div>
                <button className="px-5 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors w-full sm:w-auto shadow-sm self-end">
                    Update Report
                </button>
            </div>

            {/* Report Content */}
            <div className="bg-white border text-sm border-slate-200 rounded-xl shadow-sm overflow-hidden p-8 md:p-12 relative">
                {/* Watermark/Background Decoration */}
                <FileSpreadsheet className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-slate-50/50 pointer-events-none z-0 rotate-[-15deg]" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-2 border-b border-slate-200 pb-8">
                        <h2 className="text-3xl font-bold text-slate-800 font-serif tracking-tight">RealERP Institutional</h2>
                        <h3 className="text-xl font-semibold text-[#00605A]">Balance Sheet</h3>
                        <p className="text-slate-500 font-medium font-mono text-sm">As of March 24, 2024</p>
                    </div>

                    <div className="space-y-8">
                        {/* Assets Section */}
                        <div>
                            <h4 className="text-lg font-bold text-[#00605A] border-b-2 border-[#00605A]/20 pb-2 mb-4">Assets</h4>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-slate-700 mb-2 pl-2">Current Assets</h5>
                                    <div className="space-y-1">
                                        <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                            <span className="text-slate-600 pl-4 group-hover:text-[#059669] transition-colors">Bank Accounts</span>
                                            <span className="font-mono text-slate-800">4,500,000</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                            <span className="text-slate-600 pl-4 group-hover:text-[#059669] transition-colors">Accounts Receivable</span>
                                            <span className="font-mono text-slate-800">2,661,800</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                            <span className="text-slate-600 pl-4 group-hover:text-[#059669] transition-colors">Inventory</span>
                                            <span className="font-mono text-slate-800">1,250,000</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between py-2 px-4 mt-2 bg-slate-50/80 rounded font-semibold">
                                        <span className="text-slate-800 pl-2">Total Current Assets</span>
                                        <span className="font-mono text-slate-800">8,411,800</span>
                                    </div>
                                </div>

                                <div className="flex justify-between py-3 px-4 bg-[#00605A]/5 rounded border border-[#00605A]/10 mt-6">
                                    <span className="font-bold text-[#00605A] text-base">Total Assets</span>
                                    <span className="font-mono font-bold text-lg text-[#00605A] border-double border-b-4 border-[#00605A]">8,411,800</span>
                                </div>
                            </div>
                        </div>

                        {/* Liabilities & Equity */}
                        <div>
                            <h4 className="text-lg font-bold text-rose-700 border-b-2 border-rose-700/20 pb-2 mb-4">Liabilities & Equity</h4>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-slate-700 mb-2 pl-2">Current Liabilities</h5>
                                    <div className="space-y-1">
                                        <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                            <span className="text-slate-600 pl-4 group-hover:text-rose-600 transition-colors">Accounts Payable</span>
                                            <span className="font-mono text-slate-800">538,500</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                            <span className="text-slate-600 pl-4 group-hover:text-rose-600 transition-colors">Credit Cards</span>
                                            <span className="font-mono text-slate-800">45,000</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between py-2 px-4 mt-2 bg-slate-50/80 rounded font-semibold">
                                        <span className="text-slate-800 pl-2">Total Current Liabilities</span>
                                        <span className="font-mono text-slate-800">583,500</span>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-slate-700 mb-2 pl-2 mt-4">Equity</h5>
                                    <div className="space-y-1">
                                        <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                            <span className="text-slate-600 pl-4 group-hover:text-indigo-600 transition-colors">Retained Earnings</span>
                                            <span className="font-mono text-slate-800">7,000,000</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                            <span className="text-slate-600 pl-4 group-hover:text-indigo-600 transition-colors">Net Income</span>
                                            <span className="font-mono text-slate-800">828,300</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between py-2 px-4 mt-2 bg-slate-50/80 rounded font-semibold">
                                        <span className="text-slate-800 pl-2">Total Equity</span>
                                        <span className="font-mono text-slate-800">7,828,300</span>
                                    </div>
                                </div>

                                <div className="flex justify-between py-3 px-4 bg-rose-50/50 rounded border border-rose-100 mt-6">
                                    <span className="font-bold text-slate-800 text-base">Total Liabilities & Equity</span>
                                    <span className="font-mono font-bold text-lg text-slate-800 border-double border-b-4 border-slate-800">8,411,800</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
