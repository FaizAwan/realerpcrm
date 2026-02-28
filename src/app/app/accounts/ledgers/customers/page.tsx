"use client";

import { useState } from "react";
import { Plus, Filter, Download, UserPlus, Search, MoreVertical, FileText, ChevronRight, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_CUSTOMERS = [
    { id: "CUST-001", name: "Acme Corp", contact: "+1 234-567-8900", email: "billing@acme.com", balance: 145000, lastActivity: "2024-03-15" },
    { id: "CUST-002", name: "Global Tech", contact: "+44 20-7946-0958", email: "accounts@globaltech.co.uk", balance: 0, lastActivity: "2024-03-14" },
    { id: "CUST-003", name: "Stark Industries", contact: "+1 555-019-2831", email: "finance@stark.com", balance: -5200, lastActivity: "2024-03-10" },
    { id: "CUST-004", name: "Wayne Enterprises", contact: "+1 800-bat-cash", email: "bruce@wayne.com", balance: 2500000, lastActivity: "2024-03-18" },
    { id: "CUST-005", name: "Tyrell Corp", contact: "+1 626-555-0144", email: "nexus@tyrell.com", balance: 12000, lastActivity: "2024-03-01" },
];

export default function CustomerLedgersPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        Customer Ledgers
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Manage receivables and comprehensive customer transaction histories.</p>
                </motion.div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00605A] text-white rounded-lg text-sm font-medium hover:bg-[#004f4a] transition-colors shadow-sm">
                        <UserPlus className="w-4 h-4" />
                        New Customer
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Total Receivables", value: "Rs 2,661,800", subtitle: "From 121 active customers", type: "positive" },
                    { title: "Overdue Payments", value: "Rs 450,000", subtitle: "24 invoices overdue", type: "negative" },
                    { title: "New Customers (This Month)", value: "12", subtitle: "+15% from last month", type: "neutral" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.title}</p>
                            <h3 className={`text-2xl font-bold mt-2 ${stat.type === 'negative' ? 'text-rose-600' : 'text-slate-800'}`}>{stat.value}</h3>
                            <p className="text-xs font-medium text-slate-400 mt-1">{stat.subtitle}</p>
                        </div>
                        <Calculator className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-slate-50 rotate-[-15deg] z-0" />
                    </motion.div>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-white border text-sm border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search customers..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all font-medium"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm w-fit text-slate-600">
                        <Filter className="w-4 h-4" />
                        Advanced Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs">Customer Details</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs">Contact Info</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-right">Outstanding Balance</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs hidden md:table-cell">Last Activity</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wide text-xs text-center w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {MOCK_CUSTOMERS.map((customer, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-800">{customer.name}</span>
                                            <span className="text-xs font-medium text-slate-400">{customer.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-slate-600 font-medium">{customer.contact}</span>
                                            <span className="text-xs text-slate-400">{customer.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right tabular-nums">
                                        <div className="flex flex-col items-end">
                                            <span className={`font-semibold ${customer.balance > 0 ? 'text-[#059669]' : customer.balance < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                                                Rs {Math.abs(customer.balance).toLocaleString()}
                                                {customer.balance < 0 ? ' (CR)' : customer.balance > 0 ? ' (DR)' : ''}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-slate-500 font-medium">{new Date(customer.lastActivity).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-[#059669] hover:bg-[#059669]/10 rounded-md transition-colors tooltip-trigger" title="View Statement">
                                                <FileText className="w-4 h-4" />
                                            </button>
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

                <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">Showing 1 to {MOCK_CUSTOMERS.length} of 121 customers</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-400 bg-slate-50 cursor-not-allowed">Prev</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-white bg-[#00605A]">1</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">3</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
