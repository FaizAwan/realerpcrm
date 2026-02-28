"use client";

import React, { useState } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import {
    Phone, Mail, MapPin, Search, Plus, Truck, Building, FileText, CheckCircle2, MoreVertical, Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SuppliersPage() {
    const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

    // Mock data for suppliers/vendors
    const suppliers = [
        {
            id: 1,
            name: "Apex Construction Co.",
            category: "General Contractor",
            status: "Active",
            contact: "James Wilson",
            email: "contact@apexconstruction.com",
            phone: "+1 (555) 123-4567",
            address: "123 Build Street, New York, NY",
            rating: 4.8,
            deliveries: 12,
            lastOrder: "2024-05-15"
        },
        {
            id: 2,
            name: "Global Materials Inc.",
            category: "Building Materials",
            status: "Active",
            contact: "Robert Taylor",
            email: "sales@globalmaterials.com",
            phone: "+1 (555) 234-5678",
            address: "100 Industrial Parkway, Chicago, IL",
            rating: 4.8,
            deliveries: 156,
            lastOrder: "2024-05-15"
        },
        {
            id: 3,
            name: "EcoSteel Suppliers",
            category: "Steel & Metals",
            status: "Active",
            contact: "Amanda Lewis",
            email: "amanda.l@ecosteel.com",
            phone: "+1 (555) 987-6543",
            address: "200 Metal Works Rd, Pittsburgh, PA",
            rating: 4.9,
            deliveries: 89,
            lastOrder: "2024-05-18"
        },
        {
            id: 4,
            name: "SkyHigh Cranes",
            category: "Equipment Rental",
            status: "Active",
            contact: "Emily Chen",
            email: "emily@skyhighcranes.com",
            phone: "+1 (555) 234-5678",
            address: "101 Lift Way, Staten Island, NY",
            rating: 4.7,
            deliveries: 15,
            lastOrder: "2024-05-10"
        },
    ];

    const activeSupplier = suppliers.find(s => s.id === selectedSupplier) || suppliers[0];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <ProjectHeader />

            <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
                {/* Left Sidebar: Supplier List */}
                <div className="w-[350px] bg-white border-r border-slate-200 flex flex-col h-full z-10">
                    <div className="p-4 border-b border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">Suppliers/Vendors</h2>
                            <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search suppliers..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar p-2 space-y-1">
                        {suppliers.map((supplier) => (
                            <button
                                key={supplier.id}
                                onClick={() => setSelectedSupplier(supplier.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all border ${(selectedSupplier === supplier.id || (!selectedSupplier && suppliers[0].id === supplier.id))
                                    ? "bg-primary/5 border-primary/20 shadow-sm"
                                    : "bg-transparent border-transparent hover:bg-slate-50"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className={`font-semibold ${(selectedSupplier === supplier.id || (!selectedSupplier && suppliers[0].id === supplier.id))
                                        ? "text-primary"
                                        : "text-slate-700"
                                        }`}>{supplier.name}</h3>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${supplier.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                                        }`}>
                                        {supplier.status}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-500 flex items-center gap-1.5 mb-2">
                                    <Package className="w-3.5 h-3.5" /> {supplier.category}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Area: Supplier Profile Detail */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50 p-8 h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSupplier.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-5xl mx-auto space-y-6"
                        >
                            {/* Header Card */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden flex justify-between items-start">
                                {/* Decorative circle */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                <div className="flex gap-6 relative z-10 w-full">
                                    <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner flex items-center justify-center shrink-0">
                                        <Truck className="w-12 h-12 text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                                                    {activeSupplier.name}
                                                    {activeSupplier.status === "Active" && (
                                                        <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                                                            <CheckCircle2 className="w-3 h-3" /> Active
                                                        </span>
                                                    )}
                                                </h1>
                                                <div className="text-lg text-slate-500 font-medium mt-1 mb-4 flex items-center gap-2">
                                                    <Package className="w-5 h-5 text-primary" /> {activeSupplier.category}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="bg-white border border-slate-200 text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm focus:outline-none">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                                <button className="bg-primary text-white border border-primary px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                                                    Create PO
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                <Building className="w-4 h-4 text-slate-400" /> {activeSupplier.contact}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                <Phone className="w-4 h-4 text-slate-400" /> {activeSupplier.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                <Mail className="w-4 h-4 text-slate-400" /> {activeSupplier.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                <MapPin className="w-4 h-4 text-slate-400" /> {activeSupplier.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Stats Cards - Left Column */}
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                                        <div className="absolute right-0 bottom-0 w-24 h-24 bg-sky-50 rounded-tl-full -translate-x-4 translate-y-4 group-hover:scale-110 transition-transform"></div>
                                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Total Deliveries/Projects</div>
                                        <div className="text-3xl font-black text-slate-800 tracking-tight relative z-10">{activeSupplier.deliveries}</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                                        <div className="absolute right-0 bottom-0 w-24 h-24 bg-amber-50 rounded-tl-full -translate-x-4 translate-y-4 group-hover:scale-110 transition-transform"></div>
                                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Quality Rating</div>
                                        <div className="text-3xl font-black text-amber-500 tracking-tight flex items-baseline gap-1 relative z-10">
                                            {activeSupplier.rating.toFixed(1)} <span className="text-sm font-bold text-slate-400">/ 5.0</span>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                                        <div className="absolute right-0 bottom-0 w-24 h-24 bg-purple-50 rounded-tl-full -translate-x-4 translate-y-4 group-hover:scale-110 transition-transform"></div>
                                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Last Order</div>
                                        <div className="text-lg font-bold text-slate-800 tracking-tight relative z-10">{activeSupplier.lastOrder}</div>
                                    </div>
                                </div>

                                {/* Main Detailed Table Area */}
                                <div className="col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-primary" /> Recent Purchase Orders
                                        </h3>
                                        <button className="text-sm text-primary font-bold hover:underline">View All</button>
                                    </div>
                                    <div className="overflow-x-auto flex-1 p-0">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-100">
                                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest pl-8">PO Number</th>
                                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {[
                                                    { id: "PO-4429", date: "May 15, 2024", amount: "$12,450.00", status: "Delivered", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                                                    { id: "PO-4388", date: "Apr 28, 2024", amount: "$8,200.00", status: "In Transit", statusColor: "text-sky-700 bg-sky-50 border-sky-200" },
                                                    { id: "PO-4310", date: "Apr 10, 2024", amount: "$45,000.00", status: "Delivered", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                                                    { id: "PO-4255", date: "Mar 05, 2024", amount: "$3,100.00", status: "Processing", statusColor: "text-amber-700 bg-amber-50 border-amber-200" },
                                                    { id: "PO-4102", date: "Feb 18, 2024", amount: "$15,600.00", status: "Delivered", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                                                ].map((po, i) => (
                                                    <tr key={i} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                                                        <td className="py-4 px-6 pl-8">
                                                            <div className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{po.id}</div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="text-sm text-slate-600 font-medium">{po.date}</div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="font-bold text-slate-800 text-sm">{po.amount}</div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${po.statusColor}`}>
                                                                {po.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
