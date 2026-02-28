"use client";

import { Edit2, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lead } from "../types";

interface LeadTableProps {
    leads: Lead[];
    onEdit: (lead: Lead) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, newStatus: string) => void;
}

export function LeadTable({ leads, onEdit, onDelete, onStatusChange }: LeadTableProps) {
    if (leads.length === 0) {
        return (
            <div className="p-20 text-center">
                <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold uppercase text-xs">No leads found</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50/50 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-800 uppercase">Leads List</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Name</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Contact</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Source</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/50 group transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                            {lead.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-semibold text-slate-800">{lead.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-600">{lead.phone}</span>
                                        <span className="text-xs text-slate-400">{lead.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">
                                        {lead.source}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={lead.status}
                                        onChange={(e) => onStatusChange(lead.id, e.target.value)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border-none cursor-pointer outline-none appearance-none text-center min-w-[100px]",
                                            lead.status === 'New lead' ? "bg-blue-100 text-blue-700" :
                                                lead.status === 'Contacted' ? "bg-amber-100 text-amber-700" :
                                                    lead.status === 'Qualified' ? "bg-purple-100 text-purple-700" :
                                                        lead.status === 'Won / Closed' ? "bg-emerald-100 text-emerald-700" :
                                                            "bg-rose-100 text-rose-700"
                                        )}
                                    >
                                        <option className="bg-white text-slate-900" value="New lead">New lead</option>
                                        <option className="bg-white text-slate-900" value="Contacted">Contacted</option>
                                        <option className="bg-white text-slate-900" value="Qualified">Qualified</option>
                                        <option className="bg-white text-slate-900" value="Won / Closed">Won / Closed</option>
                                        <option className="bg-white text-slate-900" value="Lost">Lost</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-500 whitespace-nowrap">
                                    {lead.createdAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => onEdit(lead)} className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(lead.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
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
