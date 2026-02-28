"use client";

import { useState } from "react";
import { Plus, Search, ChevronRight, Edit2, Trash2, Building2, Filter, FileSpreadsheet } from "lucide-react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AllCompaniesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Dummy companies
    const [companies, setCompanies] = useState([
        { id: 1, name: "Harmain Builders", type: "Company" }
    ]);

    // Filter states
    const [filters, setFilters] = useState({
        companyName: "",
        city: "",
        country: "Albania",
        status: "",
        sector: "",
        ntn: ""
    });

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            <ProjectHeader />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-slate-800" />
                    <h1 className="text-2xl font-bold text-slate-800">Companies</h1>
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#007b5e] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#00604a]"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    <Link
                        href="/app/company/newCompany"
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#007b5e] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#00604a]"
                    >
                        <Plus className="w-4 h-4" />
                        Create
                    </Link>
                </div>
            </div>

            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="text-xs font-bold uppercase text-[#007b5e] block mb-2">Company name</label>
                                <input
                                    className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-[#007b5e] rounded-t-lg text-sm focus:outline-none"
                                    value={filters.companyName}
                                    onChange={(e) => setFilters({ ...filters, companyName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-[#007b5e] block mb-2">City</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-[#007b5e] rounded-t-lg text-sm focus:outline-none appearance-none"
                                    value={filters.city}
                                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                >
                                    <option value=""></option>
                                    <option value="City1">City1</option>
                                    <option value="City2">City2</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-[#007b5e] block mb-2">Country</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-[#007b5e] rounded-t-lg text-sm focus:outline-none appearance-none"
                                    value={filters.country}
                                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                                >
                                    <option value="Albania">Albania</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-[#007b5e] block mb-2">Status</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-[#007b5e] rounded-t-lg text-sm focus:outline-none appearance-none"
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                >
                                    <option value=""></option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-[#007b5e] block mb-2">Sector</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-[#007b5e] rounded-t-lg text-sm focus:outline-none appearance-none"
                                    value={filters.sector}
                                    onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
                                >
                                    <option value=""></option>
                                    <option value="IT">IT</option>
                                    <option value="Real Estate">Real Estate</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-[#007b5e] block mb-2">NTN</label>
                                <input
                                    className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-[#007b5e] rounded-t-lg text-sm focus:outline-none"
                                    value={filters.ntn}
                                    onChange={(e) => setFilters({ ...filters, ntn: e.target.value })}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-500">S#</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-500">Company name</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-500">Company type</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-500 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-slate-50 group">
                                    <td className="px-6 py-4 text-slate-600 font-medium">{company.id}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-[#007b5e]">{company.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-[12px] font-medium border border-[#007b5e] text-[#007b5e]">
                                            {company.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-4">
                                        <input type="checkbox" className="w-4 h-4 text-[#007b5e] rounded cursor-pointer" />
                                        <button className="text-slate-400 hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
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
