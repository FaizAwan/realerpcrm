"use client";

import { Plus, Filter, Download, Search, MoreVertical, Calendar, Truck, DollarSign, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_BILLS = [
    { id: "BILL-24-001", supplier: "BuildCo Materials", date: "2024-03-02", dueDate: "2024-03-12", amount: 500000, status: "pending" },
    { id: "BILL-24-002", supplier: "Premium Cement", date: "2024-03-05", dueDate: "2024-03-25", amount: 25000, status: "pending" },
    { id: "BILL-24-003", supplier: "Office Supplies Depot", date: "2024-03-08", dueDate: "2024-03-15", amount: 1500, status: "paid" },
    { id: "BILL-24-004", supplier: "Fast Logistics", date: "2024-02-28", dueDate: "2024-03-05", amount: 12000, status: "overdue" },
];

export default function BillsPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        Vendor Bills
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Manage payables, track vendor bills, and schedule payments.</p>
                </motion.div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00605A] text-white rounded-lg text-sm font-medium hover:bg-[#004f4a] transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        Record Bill
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: "Total Payables", value: "Rs 538,500", icon: DollarSign, color: "text-amber-600" },
                    { title: "Overdue", value: "Rs 12,000", icon: AlertCircle, color: "text-rose-600" },
                    { title: "Paid This Month", value: "Rs 1,500", icon: Truck, color: "text-[#059669]" },
                    { title: "To Pay (7 Days)", value: "Rs 500,000", icon: Clock, color: "text-slate-500" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.title}</p>
                                <stat.icon className={`w-5 h-5 ${stat.color} opacity-80`} />
                            </div>
                            <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-white border text-sm border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search bills..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            All Statuses
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs">Bill #</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs">Supplier</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs hidden md:table-cell">Dates</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-right">Amount</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-center w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {MOCK_BILLS.map((bill, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[#059669] hover:underline cursor-pointer">{bill.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800 flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                                                <Truck className="w-3.5 h-3.5 text-slate-500" />
                                            </div>
                                            {bill.supplier}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>Billed: {bill.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                                                <AlertCircle className={`w-3.5 h-3.5 ${bill.status === 'overdue' ? 'text-rose-500' : 'text-amber-500'}`} />
                                                <span className={bill.status === 'overdue' ? 'text-rose-600 font-bold' : ''}>Due: {bill.dueDate}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right tabular-nums">
                                        <span className="font-semibold text-slate-800">
                                            Rs {bill.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize tracking-wide ${bill.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                                                    bill.status === 'overdue' ? 'bg-rose-100 text-rose-700' :
                                                        'bg-amber-100 text-amber-700'
                                                }`}>
                                                {bill.status}
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
