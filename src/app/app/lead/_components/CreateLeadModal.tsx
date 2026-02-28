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
        defaultValues: initialData || {
            name: "",
            phone: "",
            email: "",
            source: "Digital Marketing",
            status: "New lead"
        }
    });

    // Re-initialize form when modal opens with new data
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset(initialData);
            } else {
                reset({
                    name: "",
                    phone: "",
                    email: "",
                    source: "Digital Marketing",
                    status: "New lead"
                });
            }
        }
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-2xl overflow-hidden flex flex-col"
            >
                <div className="bg-primary p-10 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                <UserPlus className="w-7 h-7" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{initialData ? "Update Lead" : "New Lead"}</h2>
                                <p className="text-[10px] font-bold uppercase text-white/60">Capture Protocol Actions</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-xl transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                    onClose(); // Automatically close after submission logic (depends on parent)
                })} className="p-10 space-y-6 flex-1 overflow-y-auto bg-slate-50/50">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 block mb-2">Contact Identity *</label>
                            <div className="relative">
                                <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                <input
                                    {...register("name")}
                                    className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-sm"
                                    placeholder="Full Legal Name"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 block mb-2">Phone *</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <input
                                        {...register("phone")}
                                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-sm"
                                        placeholder="+1 555 1234"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone.message}</p>}
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 block mb-2">Email</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <input
                                        {...register("email")}
                                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-sm"
                                        placeholder="client@hq.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 block mb-2">Source</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <select {...register("source")} className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-sm appearance-none">
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Direct Referral">Direct Referral</option>
                                        <option value="Cold Outreach">Cold Outreach</option>
                                        <option value="Exhibition">Exhibition</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 block mb-2">Status</label>
                                <select {...register("status")} className="w-full px-6 py-4 bg-white border border-slate-200 outline-primary rounded-2xl text-sm font-bold shadow-sm">
                                    <option value="New lead">New lead</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Won / Closed">Won / Closed</option>
                                    <option value="Lost">Lost</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full pt-5 pb-5 mt-6 bg-primary text-white rounded-2xl font-bold uppercase shadow-lg hover:bg-primary-dark transition-all hover:scale-[1.02] flex items-center justify-center gap-4">
                        {initialData ? "Save Changes" : "Submit Lead"}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </form>
            </motion.div>
        </AnimatePresence>
    );
}
