"use client";

import { Download, Filter, Calculator, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_TRIAL_BALANCE = [
    { account: "1000 Bank Accounts", debit: 4500000, credit: null, type: "asset" },
    { account: "1200 Accounts Receivable", debit: 2661800, credit: null, type: "asset" },
    { account: "1300 Inventory", debit: 1250000, credit: null, type: "asset" },
    { account: "2000 Accounts Payable", debit: null, credit: 538500, type: "liability" },
    { account: "2100 Credit Cards", debit: null, credit: 45000, type: "liability" },
    { account: "3000 Retained Earnings", debit: null, credit: 7000000, type: "equity" },
    { account: "4000 Sales Revenue", debit: null, credit: 1560500, type: "income" },
    { account: "4100 Service Income", debit: null, credit: 420000, type: "income" },
    { account: "5000 Cost of Goods Sold", debit: 650000, credit: null, type: "expense" },
    { account: "6000 Rent Expense", debit: 120000, credit: null, type: "expense" },
    { account: "6100 Salaries Expense", debit: 350000, credit: null, type: "expense" },
    { account: "6200 Depreciation Expense", debit: 12500, credit: null, type: "expense" },
    { account: "6300 Utilities Expense", debit: 19700, credit: null, type: "expense" },
];

export default function TrialBalancePage() {
    const totalDebit = MOCK_TRIAL_BALANCE.reduce((acc, curr) => acc + (curr.debit || 0), 0);
    const totalCredit = MOCK_TRIAL_BALANCE.reduce((acc, curr) => acc + (curr.credit || 0), 0);

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        Trial Balance
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Verification of total debits equals total credits across all ledger accounts.</p>
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
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">As of Date</label>
                        <input type="date" defaultValue="2024-03-31" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#059669]/20" />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors border border-slate-200">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669]/20 border-slate-300" />
                            Hide Zero Balances
                        </label>
                    </div>
                </div>
                <button className="px-5 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors w-full sm:w-auto shadow-sm self-end">
                    Update Report
                </button>
            </div>

            {/* Report Content */}
            <div className="bg-white border text-sm border-slate-200 rounded-xl shadow-sm overflow-hidden p-8 md:p-12 relative min-h-[500px]">
                {/* Watermark/Background Decoration */}
                <Calculator className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-indigo-50/50 pointer-events-none z-0 rotate-[-15deg] opacity-70" />

                <div className="relative z-10 max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-2 border-b border-slate-200 pb-8">
                        <h2 className="text-3xl font-bold text-slate-800 font-serif tracking-tight">RealERP Institutional</h2>
                        <h3 className="text-xl font-semibold text-[#00605A]">Trial Balance</h3>
                        <p className="text-slate-500 font-medium font-mono text-sm">As of March 31, 2024</p>
                    </div>

                    <div className="space-y-4">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-[#00605A] bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-[#00605A] uppercase tracking-wide text-xs w-3/5">Account</th>
                                    <th className="px-6 py-4 font-bold text-slate-800 uppercase tracking-wide text-xs text-right w-1/5">Debit</th>
                                    <th className="px-6 py-4 font-bold text-slate-800 uppercase tracking-wide text-xs text-right w-1/5">Credit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/80">
                                {MOCK_TRIAL_BALANCE.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-3">
                                            <span className={cn(
                                                "font-medium tracking-tight",
                                                row.type === 'asset' || row.type === 'expense' ? "text-slate-700" : "text-slate-600 pl-6"
                                            )}>{row.account}</span>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            {row.debit !== null ? (
                                                <span className="font-mono font-medium text-slate-800">
                                                    {row.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </span>
                                            ) : <span className="text-slate-300">-</span>}
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            {row.credit !== null ? (
                                                <span className="font-mono font-medium text-slate-800">
                                                    {row.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </span>
                                            ) : <span className="text-slate-300">-</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="border-t-2 border-[#00605A]">
                                <tr className="bg-[#00605A]/5">
                                    <td className="px-6 py-5 font-bold text-[#00605A] uppercase tracking-wide">
                                        Total
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="font-mono font-bold text-lg text-slate-800 border-double border-b-4 border-slate-800 inline-block px-1">
                                            {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="font-mono font-bold text-lg text-slate-800 border-double border-b-4 border-slate-800 inline-block px-1">
                                            {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </div>
                                    </td>
                                </tr>
                                {totalDebit === totalCredit && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide rounded-full shadow-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                Balanced
                                            </span>
                                        </td>
                                    </tr>
                                )}
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
