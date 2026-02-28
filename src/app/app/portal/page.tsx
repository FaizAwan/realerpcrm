"use client";

import { useState } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import {
    LayoutDashboard,
    Wallet,
    Bell,
    FileText,
    Calendar,
    Share2,
    PieChart,
    ChevronRight,
    Search,
    Download
} from "lucide-react";
import { motion } from "framer-motion";

export default function AppPortalDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "installments", label: "Installments" },
        { id: "ledger", label: "Ledger" },
        { id: "notices", label: "Notices" },
        { id: "plan", label: "Distribution plan" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <ProjectHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Header Profile Section */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
                        <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white shadow-md overflow-hidden shrink-0">
                            <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold text-slate-800 mb-2">Sumaiya Asif</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5"><LayoutDashboard className="w-4 h-4" /> RealERPCRM</span>
                                <span className="hidden md:inline text-slate-300">•</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">R-21</span>
                                <span className="hidden md:inline text-slate-300">•</span>
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Booked on: 01/03/2022</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0 relative z-10 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                        <div className="text-center md:text-right w-full sm:w-auto">
                            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Registration No.</div>
                            <div className="text-lg font-bold text-slate-800 tracking-tight text-center md:text-right">OPR-00261</div>
                        </div>
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-primary/20 w-full sm:w-auto hover:-translate-y-0.5 whitespace-nowrap">
                            View Profile
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Left Column (Main Tabs + Content) */}
                    <div className="xl:col-span-3 space-y-8">
                        {/* Navigation Tabs */}
                        <div className="flex overflow-x-auto hide-scrollbar gap-2 p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap relative ${activeTab === tab.id
                                        ? "text-primary bg-primary/10 shadow-sm"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Financial Overview Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-3xl p-6 text-white shadow-lg shadow-sky-500/20 relative overflow-hidden group">
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                <Wallet className="w-8 h-8 opacity-50 mb-4" />
                                <div className="text-sm font-medium opacity-90 mb-1">Total Amount</div>
                                <div className="text-3xl font-bold tracking-tight">40,000,000</div>
                                <div className="text-xs font-semibold opacity-75 mt-4 flex items-center justify-between">
                                    <span>PKR</span>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden group">
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                <PieChart className="w-8 h-8 opacity-50 mb-4" />
                                <div className="text-sm font-medium opacity-90 mb-1">Paid Amount</div>
                                <div className="text-3xl font-bold tracking-tight">8,000,000</div>
                                <div className="text-xs font-semibold opacity-75 mt-4 flex items-center justify-between">
                                    <span>20% Paid</span>
                                    <div className="w-20 h-1.5 bg-black/20 rounded-full overflow-hidden">
                                        <div className="w-[20%] h-full bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-rose-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg shadow-amber-500/20 relative overflow-hidden group">
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                <Wallet className="w-8 h-8 opacity-50 mb-4" />
                                <div className="text-sm font-medium opacity-90 mb-1">Balance</div>
                                <div className="text-3xl font-bold tracking-tight">32,000,000</div>
                                <div className="text-xs font-semibold opacity-75 mt-4 flex items-center justify-between">
                                    <span>80% Remaining</span>
                                    <div className="w-20 h-1.5 bg-black/20 rounded-full overflow-hidden">
                                        <div className="w-[80%] h-full bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Recent Activity / Installments Table */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800">Recent Installments</h3>
                                <div className="flex gap-2">
                                    <button className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors">
                                        <Search className="w-4 h-4" />
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Installment</th>
                                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {[
                                            { name: "Down Payment", date: "01 Mar 2022", amount: "8,000,000", status: "Paid", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                                            { name: "1st Installment", date: "01 Jun 2022", amount: "2,000,000", status: "Pending", color: "text-amber-600 bg-amber-50 border-amber-200" },
                                            { name: "2nd Installment", date: "01 Sep 2022", amount: "2,000,000", status: "Upcoming", color: "text-slate-600 bg-slate-50 border-slate-200" },
                                            { name: "3rd Installment", date: "01 Dec 2022", amount: "2,000,000", status: "Upcoming", color: "text-slate-600 bg-slate-50 border-slate-200" },
                                        ].map((item, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="font-semibold text-slate-800 text-sm">{item.name}</div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {item.date}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="font-semibold text-slate-800 text-sm">{item.amount} <span className="text-xs text-slate-400 font-medium">PKR</span></div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.color}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button className="text-primary hover:text-primary/80 font-semibold text-sm inline-flex items-center gap-1 group">
                                                        Details <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar widgets) */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <Wallet className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold text-sm text-slate-700 group-hover:text-primary transition-colors">Pay Now</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                </button>
                                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold text-sm text-slate-700 group-hover:text-primary transition-colors">Download Ledger</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                </button>
                                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <Bell className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold text-sm text-slate-700 group-hover:text-primary transition-colors">Raise Ticket</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                </button>
                            </div>
                        </div>

                        {/* Recent Notices */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Notices</h3>
                                <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">2 New</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4 border-l-2 border-amber-400 pl-4 py-1">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-800 mb-0.5">Upcoming Installment</div>
                                        <div className="text-xs text-slate-500 line-clamp-2">Your 1st installment of PKR 2,000,000 is due on 01 Jun 2022.</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-2">2 days ago</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 border-l-2 border-primary pl-4 py-1">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-800 mb-0.5">Welcome!</div>
                                        <div className="text-xs text-slate-500 line-clamp-2">Welcome to your RealERPCRM portal. Your account is fully active.</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-2">1 month ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
