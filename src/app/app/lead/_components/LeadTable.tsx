"use client";

import { Edit2, Trash2, Users, Flame, Zap, Snowflake, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lead } from "../types";

interface LeadTableProps {
    leads: Lead[];
    onEdit: (lead: Lead) => void;
    onDelete: (id: string | number) => void;
    onStatusChange: (id: string | number, newStatus: string) => void;
}

const PriorityBadge = ({ priority }: { priority?: string }) => {
    switch (priority) {
        case 'Hot':
            return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-orange-100"><Flame className="w-3 h-3" /> Hot</span>;
        case 'Medium':
            return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-blue-100"><Zap className="w-3 h-3" /> Medium</span>;
        case 'Cold':
            return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider border border-slate-100"><Snowflake className="w-3 h-3" /> Cold</span>;
        default:
            return <span className="px-2.5 py-1 bg-slate-100 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-wider">Normal</span>;
    }
}

export function LeadTable({ leads, onEdit, onDelete, onStatusChange }: LeadTableProps) {
    if (leads.length === 0) {
        return (
            <div className="p-40 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <Users className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Lead Archive Empty</h3>
                <p className="text-slate-400 font-medium text-sm">Initiate prospecting to populate this registry.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" /> Active Prospects List
                </h3>
                <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">{leads.length} Records</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/30 border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prospect Entity</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Communication Channel</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority / Source</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pipeline Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Registration</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/50 group transition-all duration-200">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-110 transition-transform">
                                            {lead.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 text-base">{lead.name}</span>
                                            {(lead as any).notes && (
                                                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5 max-w-[150px] truncate italic">
                                                    <MessageSquare className="w-3 h-3 shrink-0" /> {(lead as any).notes}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-slate-700">{lead.phone}</span>
                                        <span className="text-[11px] font-medium text-slate-400 group-hover:text-primary transition-colors underline decoration-slate-200">{lead.email}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col gap-2">
                                        <PriorityBadge priority={(lead as any).priority} />
                                        <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded italic border border-slate-100 self-start">
                                            {lead.source}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <select
                                        value={lead.status}
                                        onChange={(e) => onStatusChange(lead.id, e.target.value)}
                                        className={cn(
                                            "pl-3 pr-8 py-2 rounded-xl text-[10px] font-black uppercase border cursor-pointer outline-none appearance-none text-center shadow-sm w-full max-w-[130px]",
                                            lead.status === 'new' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                lead.status === 'contacted' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                    lead.status === 'qualified' ? "bg-purple-50 text-purple-600 border-purple-100" :
                                                        lead.status === 'won' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                            "bg-rose-50 text-rose-600 border-rose-100"
                                        )}
                                    >
                                        <option value="new">New lead</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="won">Won / Closed</option>
                                        <option value="lost">Lost</option>
                                    </select>
                                </td>
                                <td className="px-8 py-6 text-[11px] font-bold text-slate-400 whitespace-nowrap">
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                        <button
                                            onClick={() => onEdit(lead)}
                                            className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 hover:text-primary hover:border-primary/20 transition-all shadow-sm hover:shadow-md"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(lead.id)}
                                            className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm hover:shadow-md"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
