"use client";

import { useState } from "react";
import { Plus, Filter, Download, ChevronDown, ChevronRight, Search, FileText, X, Settings2, FileImage } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectHeader } from "@/components/ProjectHeader";

const MOCK_ASSETS = [
    {
        name: "National Bank Of Pakistan",
        subtitle: "BANK",
        value: "(58,314,634)",
        isNegative: true,
    },
    {
        name: "Stock",
        value: "5,366,890",
        isNegative: false,
    },
    {
        name: "Cheque to be deposited",
        value: "34,887,543",
        isNegative: false,
    },
    {
        name: "Petty Csh",
        subtitle: "Cash",
        value: "28,797,202",
        isNegative: false,
    },
    {
        name: "103-001 - Inventory Construction and Development",
        value: "3,469,320",
        isNegative: false,
    },
    {
        name: "501-002-001 - Development - Grey Structure",
        value: "281,000",
        isNegative: false,
    },
    {
        name: "Bank",
        value: "(828,920)",
        isNegative: true,
    },
    {
        name: "Cash",
        value: "(736,724,275)",
        isNegative: true,
        hasChildren: true,
        isExpanded: true,
        children: [
            {
                name: "AccountReceivable",
                value: "2,094,293,199",
                isNegative: false,
                isLeaf: true
            }
        ]
    }
];

const AccountItem = ({ item, depth = 0 }: { item: any; depth?: number }) => {
    const [expanded, setExpanded] = useState(item.isExpanded || false);

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between py-2 px-4 hover:bg-slate-50/80 transition-colors group">
                <div className="flex items-center gap-1.5" style={{ paddingLeft: `${depth * 20}px` }}>
                    <div className="w-5 flex items-center justify-center">
                        {item.hasChildren ? (
                            <button onClick={() => setExpanded(!expanded)} className="text-slate-400 hover:text-slate-700 transition-colors">
                                {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                            </button>
                        ) : null}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-sm tracking-tight",
                                item.isLeaf ? "text-[#0ea5e9]" : "text-[#0ea5e9] hover:underline cursor-pointer transition-all"
                            )}>{item.name}</span>
                            {!item.isLeaf && (
                                <button className="w-[15px] h-[15px] rounded-full bg-[#059669] text-white flex items-center justify-center hover:bg-[#047857] transition-colors shadow-sm cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                    <Plus className="w-[10px] h-[10px]" strokeWidth={3} />
                                </button>
                            )}
                        </div>
                        {item.subtitle && (
                            <span className="text-[11px] text-slate-400 font-medium -mt-0.5">{item.subtitle}</span>
                        )}
                    </div>
                </div>
                <div className={cn(
                    "text-[13px] font-medium tracking-wide tabular-nums",
                    item.isNegative ? "text-slate-600" : "text-[#059669]"
                )}>
                    {item.value}
                </div>
            </div>
            {item.hasChildren && expanded && item.children && (
                <div className="flex flex-col">
                    {item.children.map((child: any, i: number) => (
                        <AccountItem key={i} item={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const SectionHeader = ({ title, value, hasChildren = true, icon = ChevronDown, defaultExpanded = false }: { title: string; value: string; hasChildren?: boolean; icon?: any; defaultExpanded?: boolean }) => {
    const Icon = icon;
    return (
        <div className="flex items-center justify-between py-3 px-4 bg-emerald-50/30 border-b border-emerald-100/50 group rounded-t-lg">
            <div className="flex items-center gap-1.5">
                <div className="w-5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#0ea5e9]" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[15px] font-medium text-[#0ea5e9] tracking-tight">{title}</span>
                    <button className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center hover:bg-[#047857] transition-colors shadow-sm cursor-pointer">
                        <Plus className="w-[11px] h-[11px]" strokeWidth={3} />
                    </button>
                </div>
            </div>
            <div className="text-[15px] font-medium text-slate-600 tracking-wide tabular-nums">
                {value}
            </div>
        </div>
    );
}

export default function AccountsHeadPage() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            <ProjectHeader />

            {/* Main Accounts Container */}
            <div className="bg-white rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden">
                {/* Header Toolbar */}
                <div className="p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[22px] font-bold text-slate-700 tracking-tight flex items-center gap-3">
                            Accounts head
                            <div className="w-9 h-5 rounded-full bg-slate-200 relative cursor-pointer flex items-center p-0.5">
                                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <input
                                placeholder="Search Current"
                                className="w-[180px] pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all"
                            />
                        </div>
                        <button className="w-10 h-10 bg-[#00605A] text-white rounded-lg flex items-center justify-center hover:bg-[#004f4a] transition-colors shadow-sm">
                            <Filter className="w-4 h-4" fill="currentColor" />
                        </button>

                        <div className="relative group/dropdown">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 font-medium hover:bg-slate-50 transition-colors">
                                Statement of profit and loss
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 px-2 border-x border-slate-200">
                            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-50 transition-colors tooltip-trigger relative group">
                                <FileText className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors relative group">
                                <span className="font-bold text-[10px]">PDF</span>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-800">
                                    download pdf
                                </div>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center bg-[#059669] text-white rounded-full hover:bg-[#047857] transition-colors shadow-sm">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={() => setIsCreateOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#00605A] text-white rounded-lg text-sm font-medium hover:bg-[#004f4a] transition-all shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Create
                        </button>
                    </div>
                </div>

                {/* Filters Area */}
                <div className="px-5 py-3 border-b border-slate-100 bg-white flex items-center gap-3">
                    <span className="text-sm font-medium text-[#059669] italic">Filters:</span>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#059669]/30 rounded-full text-sm text-[#059669] font-medium shadow-sm">
                        Date to: 27/08/2024
                        <button className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center hover:bg-[#047857] transition-colors ml-1">
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Accounting Tree Container */}
                <div className="flex flex-col md:flex-row min-h-[500px] bg-slate-50/30">
                    {/* Left Panel */}
                    <div className="flex-1 border-r border-slate-200/60 p-4 space-y-4">
                        <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm overflow-hidden pb-4">
                            <SectionHeader title="Assets" value="1,371,227,325" />
                            <div className="flex flex-col pt-2">
                                {MOCK_ASSETS.map((asset, i) => (
                                    <AccountItem key={i} item={asset} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm overflow-hidden">
                            <SectionHeader title="Liabilities" value="42,494,000" icon={ChevronRight} />
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm overflow-hidden">
                            <SectionHeader title="Equity" value="78,537,816" icon={ChevronRight} />
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="flex-1 p-4 space-y-4">
                        <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm overflow-hidden">
                            <SectionHeader title="Income" value="987,312,760" icon={ChevronRight} />
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm overflow-hidden">
                            <SectionHeader title="Expense" value="907,449,944" icon={ChevronRight} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Account Modal */}
            <AnimatePresence>
                {isCreateOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreateOpen(false)}
                            className="fixed inset-0 z-[120] bg-slate-900/40 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed flex flex-col inset-y-0 right-0 z-[130] w-full max-w-md bg-white shadow-2xl border-l border-slate-200"
                        >
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Create Account Head</h2>
                                    <p className="text-sm text-slate-500 mt-1">Add a new node to the chart of accounts.</p>
                                </div>
                                <button onClick={() => setIsCreateOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="space-y-4 text-sm font-medium">
                                    <div className="space-y-1.5">
                                        <label className="text-slate-600">Parent Category</label>
                                        <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all appearance-none">
                                            <option>Assets</option>
                                            <option>Liabilities</option>
                                            <option>Equity</option>
                                            <option>Income</option>
                                            <option>Expense</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-600">Account Name</label>
                                        <input
                                            placeholder="e.g. Accounts Receivable"
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-600 flex items-center justify-between">
                                            Account Code
                                            <span className="text-xs font-normal text-slate-400">Optional</span>
                                        </label>
                                        <input
                                            placeholder="e.g. 100-01"
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-600 flex items-center justify-between">
                                            Description
                                            <span className="text-xs font-normal text-slate-400">Optional</span>
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Details about this account head..."
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all resize-none"
                                        />
                                    </div>

                                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#059669] focus:ring-[#059669]/20" />
                                        <div className="flex flex-col">
                                            <span className="text-slate-800">Has Child Accounts</span>
                                            <span className="text-xs font-normal text-slate-500">Enable this if you want to add sub-accounts under this head.</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setIsCreateOpen(false)}
                                    className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[#00605A] hover:bg-[#004f4a] rounded-lg transition-colors shadow-sm"
                                >
                                    Save Account
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
