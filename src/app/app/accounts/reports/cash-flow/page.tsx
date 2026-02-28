"use client";

import { Download, Filter, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function CashFlowPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        Statement of Cash Flows
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Cash movements in and out of the business over a specific period.</p>
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
                <div className="flex flex-wrap items-center gap-4 text-sm w-full sm:w-auto">
                    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">From Date</label>
                        <input type="date" defaultValue="2024-03-01" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#059669]/20" />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">To Date</label>
                        <input type="date" defaultValue="2024-03-31" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#059669]/20" />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Comparison</label>
                        <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#059669]/20">
                            <option>YTD</option>
                            <option>Previous Period</option>
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
                <CircleDollarSign className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-emerald-50/50 pointer-events-none z-0 rotate-[15deg] opacity-70" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-2 border-b border-slate-200 pb-8">
                        <h2 className="text-3xl font-bold text-slate-800 font-serif tracking-tight">RealERP Institutional</h2>
                        <h3 className="text-xl font-semibold text-[#00605A]">Statement of Cash Flows</h3>
                        <p className="text-slate-500 font-medium font-mono text-sm">March 1, 2024 - March 31, 2024</p>
                    </div>

                    <div className="space-y-8">
                        {/* Operating Activities */}
                        <div>
                            <h4 className="text-lg font-bold text-[#00605A] border-b-2 border-[#00605A]/20 pb-2 mb-4">Operating Activities</h4>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group">
                                        <span className="text-slate-700 pl-4 font-semibold group-hover:text-[#059669] transition-colors">Net Income</span>
                                        <span className="font-mono font-semibold text-[#059669]">828,300</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group mt-2">
                                        <span className="text-slate-500 pl-4 italic text-xs uppercase tracking-wide">Adjustments to reconcile Net Income to Net Cash provided by operations:</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group">
                                        <span className="text-slate-600 pl-8 group-hover:text-slate-800 transition-colors">Accounts Receivable</span>
                                        <span className="font-mono text-rose-600">(150,000)</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group">
                                        <span className="text-slate-600 pl-8 group-hover:text-slate-800 transition-colors">Inventory</span>
                                        <span className="font-mono text-rose-600">(25,000)</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group">
                                        <span className="text-slate-600 pl-8 group-hover:text-slate-800 transition-colors">Accounts Payable</span>
                                        <span className="font-mono text-[#059669]">45,000</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group">
                                        <span className="text-slate-600 pl-8 group-hover:text-slate-800 transition-colors">Depreciation</span>
                                        <span className="font-mono text-[#059669]">12,500</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-4 mt-2 bg-[#00605A]/5 rounded font-bold border border-[#00605A]/10">
                                    <span className="text-[#00605A] pl-2 text-sm">Net Cash provided by Operating Activities</span>
                                    <span className="font-mono text-[#00605A]">710,800</span>
                                </div>
                            </div>
                        </div>

                        {/* Investing Activities */}
                        <div>
                            <h4 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-700/20 pb-2 mb-4 mt-8">Investing Activities</h4>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group">
                                        <span className="text-slate-600 pl-8 group-hover:text-indigo-600 transition-colors">Purchase of Equipment</span>
                                        <span className="font-mono text-rose-600">(250,000)</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-4 mt-2 bg-indigo-50/50 rounded font-bold border border-indigo-100">
                                    <span className="text-indigo-800 pl-2 text-sm">Net Cash used in Investing Activities</span>
                                    <span className="font-mono text-rose-600">(250,000)</span>
                                </div>
                            </div>
                        </div>

                        {/* Financing Activities */}
                        <div>
                            <h4 className="text-lg font-bold text-amber-700 border-b-2 border-amber-700/20 pb-2 mb-4 mt-8">Financing Activities</h4>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50/80 rounded group">
                                        <span className="text-slate-600 pl-8 group-hover:text-amber-600 transition-colors">Loan Repayment</span>
                                        <span className="font-mono text-rose-600">(50,000)</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-4 mt-2 bg-amber-50/50 rounded font-bold border border-amber-100">
                                    <span className="text-amber-800 pl-2 text-sm">Net Cash used in Financing Activities</span>
                                    <span className="font-mono text-rose-600">(50,000)</span>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="pt-8 mt-12 border-t-2 border-slate-200">
                            <div className="space-y-2">
                                <div className="flex justify-between py-2 px-4 bg-slate-50 rounded group">
                                    <span className="font-bold text-slate-800 text-base">Net Increase in Cash</span>
                                    <span className="font-mono font-bold text-lg text-[#059669]">410,800</span>
                                </div>
                                <div className="flex justify-between py-2 px-4 hover:bg-slate-50/80 rounded group">
                                    <span className="text-slate-600 font-medium pl-4">Cash at Beginning of Period</span>
                                    <span className="font-mono text-slate-800">4,089,200</span>
                                </div>
                                <div className="flex justify-between py-4 px-4 bg-[#00605A] text-white rounded-lg shadow-sm mt-4">
                                    <span className="font-bold text-base">Cash at End of Period</span>
                                    <span className="font-mono font-bold text-xl border-double border-b-4 border-white">4,500,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
