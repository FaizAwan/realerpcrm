"use client";

import { Plus, Filter, Download, Search, MoreVertical, Calendar, FileBox, Calculator, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_JOURNALS = [
    { id: "JV-2024-0001", date: "2024-03-20", reference: "Depreciation Q1", narration: "Quarterly depreciation of office equipment", amount: 12500, status: "posted" },
    { id: "JV-2024-0002", date: "2024-03-21", reference: "Payroll Adjust", narration: "Correction in payroll for Feb 2024", amount: 4500, status: "posted" },
    { id: "JV-2024-0003", date: "2024-03-22", reference: "Bank Charges", narration: "Monthly bank maintenance fees", amount: 1500, status: "draft" },
    { id: "JV-2024-0004", date: "2024-03-23", reference: "Prepaid Rent", narration: "Amortization of prepaid rent", amount: 25000, status: "pending" },
];

export default function JournalsPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        Journal Entries
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Record manual adjustments, depreciation, and complex accounting transactions.</p>
                </motion.div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00605A] text-white rounded-lg text-sm font-medium hover:bg-[#004f4a] transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        Create Journal
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border text-sm border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search journals..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs">Journal #</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs hidden md:table-cell">Reference / Narration</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-right">Amount</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-center w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {MOCK_JOURNALS.map((journal, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[#059669] hover:underline cursor-pointer">{journal.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-600 font-medium whitespace-nowrap">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            {journal.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-slate-700">{journal.reference}</span>
                                            <span className="text-xs text-slate-500 max-w-sm truncate">{journal.narration}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right tabular-nums">
                                        <span className="font-semibold text-slate-800">
                                            Rs {journal.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize tracking-wide ${journal.status === 'posted' ? 'bg-emerald-100 text-emerald-700' :
                                                    journal.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-100 text-slate-700'
                                                }`}>
                                                {journal.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors tooltip-trigger" title="More options">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
