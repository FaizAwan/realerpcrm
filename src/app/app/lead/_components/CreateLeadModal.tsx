"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Phone, MessageSquare, ChevronRight, Briefcase } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lead } from "../types";

const leadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(5, "Valid phone number required"),
    email: z.string().email("Invalid email address").or(z.literal("")),
    source: z.string(),
    status: z.string(),
    priority: z.string(),
    notes: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface CreateLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LeadFormValues) => void;
    initialData?: Lead | null;
}

export function CreateLeadModal({ isOpen, onClose, onSubmit, initialData }: CreateLeadModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            source: "Digital Marketing",
            status: "New lead",
            priority: "Medium",
            notes: ""
        }
    });

    // Re-initialize form when modal opens with new data
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    ...initialData,
                    notes: (initialData as any).notes || "",
                    priority: (initialData as any).priority || "Medium"
                });
            } else {
                reset({
                    name: "",
                    phone: "",
                    email: "",
                    source: "Digital Marketing",
                    status: "New lead",
                    priority: "Medium",
                    notes: ""
                });
            }
        }
    }, [isOpen, initialData, reset]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        key="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer"
                    />
                    <motion.div
                        key="modal-content"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="bg-primary p-10 text-white relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                                        <UserPlus className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">{initialData ? "Evolutionary Update" : "Strategic Capture"}</h2>
                                        <p className="text-[10px] font-black uppercase text-white/60 tracking-widest">Lead Intelligence Protocol</p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-xl transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit((data) => {
                            onSubmit(data);
                        })} className="p-10 space-y-6 flex-1 overflow-y-auto bg-slate-50/50">
                            <div className="space-y-5">
                                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Core Identity</h3>
                                    <div>
                                        <div className="relative">
                                            <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input
                                                {...register("name")}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-inner"
                                                placeholder="Prospect Full Name"
                                            />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                <input
                                                    {...register("phone")}
                                                    className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-inner"
                                                    placeholder="Contact #"
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone.message}</p>}
                                        </div>

                                        <div>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                <input
                                                    {...register("email")}
                                                    className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-inner"
                                                    placeholder="Email Addr"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Classification</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                                                <select {...register("source")} className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-200 outline-primary rounded-2xl text-sm font-bold appearance-none cursor-pointer">
                                                    <option value="Digital Marketing">Digital Marketing</option>
                                                    <option value="Direct Referral">Direct Referral</option>
                                                    <option value="Cold Outreach">Cold Outreach</option>
                                                    <option value="Exhibition">Exhibition</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <select {...register("priority")} className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 outline-primary rounded-2xl text-sm font-bold cursor-pointer">
                                                <option value="Hot">🔥 Hot Priority</option>
                                                <option value="Medium">⚡ Medium Priority</option>
                                                <option value="Cold">❄️ Cold Priority</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <select {...register("status")} className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 outline-primary rounded-2xl text-sm font-bold cursor-pointer">
                                            <option value="new">New lead</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="won">Won / Closed</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Intelligence & Notes</h3>
                                    <textarea
                                        {...register("notes")}
                                        rows={4}
                                        className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-inner resize-none"
                                        placeholder="Historical interaction context, requirements, interests..."
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-[1.02] flex items-center justify-center gap-4 group">
                                {initialData ? "Synchronize Updates" : "Commit Lead to Pipeline"}
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
