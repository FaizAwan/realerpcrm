"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, ShoppingCart, Wallet, LayoutDashboard, Users, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const GUIDE_SECTIONS = [
    {
        title: "Introduction",
        icon: Zap,
        content: "Welcome to RealERPCRM. This institutional-grade platform is designed to manage every aspect of your business from lead generation to final accounting. Use the sidebar to navigate through professional modules.",
        color: "bg-emerald-50 text-emerald-600"
    },
    {
        title: "Sales & Invoicing",
        icon: FileText,
        content: "Create professional invoices in the Sales & CRM module. When an invoice is created and products are selected, the system automatically deducts stock from your inventory and records entries in the Customer Ledger.",
        features: ["Create Invoices", "Manage Leads", "Dynamic Stock Deduction", "Auto-Ledger Posting"],
        color: "bg-blue-50 text-blue-600"
    },
    {
        title: "Purchase & Inventory",
        icon: ShoppingCart,
        content: "Manage your supply chain by recording Vendor Bills. Every recorded bill increases your product quantity in the Inventory Dashboard and updates your Accounts Payable.",
        features: ["Stock In/Out Tracking", "Low Stock Alerts", "Supplier Management", "Real-time Quantity Updates"],
        color: "bg-amber-50 text-amber-600"
    },
    {
        title: "Finance & Accounting",
        icon: Wallet,
        content: "Follows standard double-entry bookkeeping. Every sale and purchase is reflected in the Chart of Accounts, Ledgers, and Journals for audit-ready reporting.",
        features: ["Balance Sheets", "Profit & Loss", "Trial Balance", "Double-Entry Journals"],
        color: "bg-purple-50 text-purple-600"
    }
];

export default function UserGuidePage() {
    return (
        <div className="max-w-[1200px] mx-auto pb-20">
            {/* Hero Section */}
            <div className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-4"
                >
                    <div className="w-12 h-12 bg-[#00605A] rounded-xl flex items-center justify-center shadow-lg shadow-[#00605A]/20">
                        <BookOpen className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System User Guide</h1>
                        <p className="text-slate-500 font-medium">Master the RealERPCRM platform with this comprehensive manual.</p>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    {GUIDE_SECTIONS.map((section, idx) => (
                        <motion.section
                            key={section.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${section.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                <section.icon className="w-7 h-7" />
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h2>
                            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                                {section.content}
                            </p>

                            {section.features && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {section.features.map(feature => (
                                        <div key={feature} className="flex items-center gap-2 text-slate-700 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    ))}
                </div>

                {/* Sidebar Sticky Actions */}
                <div className="space-y-6">
                    <div className="sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="bg-[#00605A] rounded-3xl p-8 text-white shadow-xl shadow-[#00605A]/20 overflow-hidden relative"
                        >
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                            <ShieldCheck className="w-10 h-10 mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Need Support?</h3>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed">
                                Our technical team is available 24/7 to assist you with system onboarding and data migration.
                            </p>
                            <button className="w-full py-4 bg-white text-[#00605A] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
                                Contact Support <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>

                        <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                Quick Start Tips
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    "Set up Chart of Accounts first.",
                                    "Add Suppliers before Recording Bills.",
                                    "Define Store Items for Stock sync.",
                                    "Use Invoices to automatically deduct qty."
                                ].map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
