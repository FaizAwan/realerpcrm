"use client";

import { Download, Filter, ScrollText } from "lucide-react";
import { motion } from "framer-motion";

export default function IncomeStatementPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        Income Statement
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Profit and Loss over a specified period. Evaluates company&apos;s financial performance.</p>
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
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Compare</label>
                        <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#059669]/20">
                            <option>YTD</option>
                            <option>Previous Quarter</option>
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
                <ScrollText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-orange-50/50 pointer-events-none z-0 rotate-[15deg] opacity-70" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-2 border-b border-slate-200 pb-8">
                        <h2 className="text-3xl font-bold text-slate-800 font-serif tracking-tight">RealERP Institutional</h2>
                        <h3 className="text-xl font-semibold text-[#00605A]">Income Statement</h3>
                        <p className="text-slate-500 font-medium font-mono text-sm">March 1, 2024 - March 31, 2024</p>
                    </div>

                    <div className="space-y-8">
                        {/* Revenues */}
                        <div>
                            <h4 className="text-lg font-bold text-[#00605A] border-b-2 border-[#00605A]/20 pb-2 mb-4">Revenues</h4>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                        <span className="text-slate-600 pl-4 group-hover:text-[#059669] transition-colors">Sales Revenue</span>
                                        <span className="font-mono text-slate-800">1,560,500</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                        <span className="text-slate-600 pl-4 group-hover:text-[#059669] transition-colors">Service Income</span>
                                        <span className="font-mono text-slate-800">420,000</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-4 mt-2 bg-slate-50/80 rounded font-bold border-t border-slate-200">
                                    <span className="text-slate-800 pl-2">Total Revenues</span>
                                    <span className="font-mono text-slate-800">1,980,500</span>
                                </div>
                            </div>
                        </div>

                        {/* Cost of Goods Sold */}
                        <div>
                            <h4 className="text-lg font-bold text-slate-700 border-b-2 border-slate-200 pb-2 mb-4">Cost of Goods Sold (COGS)</h4>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                        <span className="text-slate-600 pl-4 transition-colors">Cost of Goods Sold</span>
                                        <span className="font-mono text-slate-800">650,000</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-4 mt-2 bg-slate-50/80 rounded font-bold border-t border-slate-200">
                                    <span className="text-slate-800 pl-2">Total COGS</span>
                                    <span className="font-mono text-slate-800">650,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Gross Profit */}
                        <div>
                            <div className="flex justify-between py-3 px-4 bg-[#00605A]/10 rounded border border-[#00605A]/20 mt-6 shadow-sm">
                                <span className="font-bold text-[#00605A] text-lg uppercase tracking-wide">Gross Profit</span>
                                <span className="font-mono font-bold text-xl text-[#00605A] border-b-2 border-[#00605A]">1,330,500</span>
                            </div>
                        </div>

                        {/* Operating Expenses */}
                        <div className="pt-4">
                            <h4 className="text-lg font-bold text-rose-700 border-b-2 border-rose-700/20 pb-2 mb-4">Operating Expenses</h4>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                        <span className="text-slate-600 pl-4 group-hover:text-rose-600 transition-colors">Rent Expense</span>
                                        <span className="font-mono text-slate-800">120,000</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                        <span className="text-slate-600 pl-4 group-hover:text-rose-600 transition-colors">Salaries Expense</span>
                                        <span className="font-mono text-slate-800">350,000</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                        <span className="text-slate-600 pl-4 group-hover:text-rose-600 transition-colors">Depreciation Expense</span>
                                        <span className="font-mono text-slate-800">12,500</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 px-4 hover:bg-slate-50 rounded group">
                                        <span className="text-slate-600 pl-4 group-hover:text-rose-600 transition-colors">Utilities Expense</span>
                                        <span className="font-mono text-slate-800">19,700</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-4 mt-2 bg-rose-50/50 rounded font-bold border-t border-rose-100">
                                    <span className="text-rose-800 pl-2">Total Operating Expenses</span>
                                    <span className="font-mono text-rose-800">502,200</span>
                                </div>
                            </div>
                        </div>

                        {/* Net Income */}
                        <div className="pt-8">
                            <div className="flex justify-between py-4 px-4 bg-[#00605A] text-white rounded-lg shadow-sm border border-[#004f4a]">
                                <span className="font-bold text-lg uppercase tracking-wide">Net Income</span>
                                <span className="font-mono font-bold text-2xl border-double border-b-4 border-white">828,300</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
