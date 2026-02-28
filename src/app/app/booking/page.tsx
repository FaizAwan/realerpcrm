"use client";

import { useState, useEffect } from "react";
import {
    Building2,
    Calendar,
    User,
    Plus,
    X,
    Trash2,
    Edit2,
    CheckCircle2,
    Clock,
    Search,
    FileText,
    Filter,
    Download,
    Printer,
    MapPin,
    Hash,
    Briefcase,
    ShieldCheck,
    CreditCard,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import { useCallback } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [units, setUnits] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [editingBooking, setEditingBooking] = useState<any>(null);

    // Filters
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        customerName: "",
        amountPaid: "",
        status: "pending",
        unitId: "",
        bookingDate: new Date().toISOString().split('T')[0]
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [bookingsRes, unitsRes] = await Promise.all([
                fetch("/api/bookings"),
                fetch("/api/units")
            ]);
            const bookingsData = await bookingsRes.json();
            const unitsData = await unitsRes.json();
            setBookings(Array.isArray(bookingsData) ? bookingsData : []);
            setUnits(Array.isArray(unitsData) ? unitsData : []);

            if (unitsData.length > 0 && !formData.unitId) {
                setFormData(prev => ({ ...prev, unitId: unitsData[0].id.toString() }));
            }
        } catch (error) {
            console.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }, [formData.unitId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenModal = (booking?: any) => {
        if (booking) {
            setEditingBooking(booking);
            setFormData({
                customerName: booking.customerName,
                amountPaid: booking.amountPaid?.toString() || "",
                status: booking.status || "pending",
                unitId: booking.unitId?.toString() || "",
                bookingDate: new Date(booking.bookingDate).toISOString().split('T')[0]
            });
        } else {
            setEditingBooking(null);
            setFormData({
                customerName: "",
                amountPaid: "",
                status: "pending",
                unitId: units[0]?.id.toString() || "",
                bookingDate: new Date().toISOString().split('T')[0]
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingBooking ? `/api/bookings/${editingBooking.id}` : "/api/bookings";
        const method = editingBooking ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amountPaid: parseFloat(formData.amountPaid),
                    unitId: parseInt(formData.unitId)
                })
            });
            if (res.ok) {
                fetchData();
                setIsModalOpen(false);
            }
        } catch (error) {
            alert("Process failed.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Confirm permanent removal of this booking ledger?")) return;
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            alert("Delete failed.");
        }
    };

    const openInvoice = (booking: any) => {
        setSelectedInvoice(booking);
        setIsInvoiceOpen(true);
    };

    const filteredBookings = bookings.filter(b => {
        const matchesStatus = statusFilter === "all" || b.status === statusFilter;
        const matchesDate = !dateFilter || new Date(b.bookingDate).toISOString().split('T')[0] === dateFilter;
        const matchesSearch = !searchQuery || b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.unit?.unitNumber.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesDate && matchesSearch;
    });

    return (
        <div className="space-y-10 max-w-[1400px] mx-auto pb-4">
            <ProjectHeader />
            {/* Sleek Page Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-primary" />
                        </div>
                        Bookings <span className="text-primary">Vault</span>
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Institutional Ledger Protocol & Relationship Core</p>
                </motion.div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 flex items-center gap-1">
                        <button
                            onClick={() => setStatusFilter("all")}
                            className={cn("px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all", statusFilter === "all" ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:text-primary hover:bg-slate-50")}
                        >All</button>
                        <button
                            onClick={() => setStatusFilter("pending")}
                            className={cn("px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all", statusFilter === "pending" ? "bg-amber-500 text-white shadow-sm" : "text-slate-500 hover:text-amber-500 hover:bg-slate-50")}
                        >Pending</button>
                        <button
                            onClick={() => setStatusFilter("confirmed")}
                            className={cn("px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all", statusFilter === "confirmed" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500 hover:text-emerald-500 hover:bg-slate-50")}
                        >Confirmed</button>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold tracking-wide shadow-sm hover:bg-primary-dark transition-all focus:ring-2 focus:ring-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Acquisition
                    </button>
                </div>
            </div>

            {/* Advanced Filters Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Client or Unit..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-1.5 bg-white border border-slate-100 rounded-xl text-sm font-bold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg shadow-slate-100/50 outline-none"
                    />
                </div>
                <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={e => setDateFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-1.5 bg-white border border-slate-100 rounded-xl text-sm font-bold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg shadow-slate-100/50 outline-none"
                    />
                </div>
                <div className="bg-white border border-slate-100 rounded-xl px-8 py-5 flex items-center justify-between shadow-lg shadow-slate-100/50">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide ">Total Verified Assets</span>
                    <span className="text-xl font-semibold text-primary  leading-none">{filteredBookings.length}</span>
                </div>
            </div>

            {/* Bookings Grid */}
            {isLoading ? (
                <div className="p-24 flex flex-col items-center justify-center gap-6 bg-white rounded-xl border border-slate-100 shadow-md shadow-slate-200/40">
                    <div className="w-20 h-20 border-[6px] border-primary/5 border-t-primary rounded-full animate-spin" />
                    <p className="text-slate-400 font-semibold  uppercase text-xs tracking-normal animate-pulse">Establishing Secure Ledger Handshake...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence>
                        {filteredBookings.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-40 text-center bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200"
                            >
                                <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                <p className="text-slate-400 font-semibold  uppercase text-sm tracking-wide">No matching acquisition records found.</p>
                            </motion.div>
                        ) : (
                            filteredBookings.map((booking) => (
                                <motion.div
                                    layout
                                    key={booking.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden hover:shadow-sm transition-all duration-700 group relative"
                                >
                                    {/* Status Badge Overlap */}
                                    <div className={cn(
                                        "absolute top-6 right-6 px-4 py-2 rounded-2xl text-[9px] font-semibold uppercase tracking-wide flex items-center gap-2 z-10 shadow-lg",
                                        booking.status === 'confirmed' ? "bg-green-500 text-white shadow-green-500/30" :
                                            booking.status === 'cancelled' ? "bg-red-500 text-white shadow-red-500/30" :
                                                "bg-amber-500 text-white shadow-amber-500/30"
                                    )}>
                                        {booking.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {booking.status}
                                    </div>

                                    <div className="p-10 space-y-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner group-hover:bg-primary/5 transition-colors duration-500">
                                                <User className="w-8 h-8 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-2xl text-slate-800  leading-none tracking-tight group-hover:text-primary transition-colors">{booking.customerName}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-normal mt-2">Protocol ID: #BK-{booking.id.toString().padStart(4, '0')}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-5 py-6 border-y border-slate-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                                                        <Hash className="w-4 h-4 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide ">Unit Identity</p>
                                                        <p className="text-sm font-semibold text-slate-800 ">{booking.unit?.unitNumber || `Unit #${booking.unitId}`}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide ">Valuation</p>
                                                    <p className="text-lg font-semibold text-slate-800  group-hover:text-primary transition-colors tracking-normal">Rs {booking.amountPaid?.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                                                    <MapPin className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide ">Project Context</p>
                                                    <p className="text-sm font-semibold text-slate-800 ">{booking.unit?.project?.name || "Global Inventory"}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide ">Verification Date</p>
                                                    <p className="text-sm font-semibold text-slate-800 ">{new Date(booking.bookingDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => openInvoice(booking)}
                                                className="flex-1 py-4 bg-secondary text-white rounded-2xl font-semibold text-[10px] uppercase tracking-normal hover:bg-primary transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-2 group/btn"
                                            >
                                                <FileText className="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
                                                Review Invoice
                                            </button>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(booking)}
                                                    className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10 border border-transparent hover:border-red-500/20"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Acquisition Slide-Over Panel */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-[120] bg-secondary/80 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-md overflow-y-auto border-l border-white/20"
                        >
                            <div className="min-h-full relative flex flex-col">
                                <div className="bg-primary px-4 py-3 text-white relative overflow-hidden shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl opacity-50" />
                                    <h2 className="text-xl m-0 p-0 font-semibold  tracking-normal leading-none relative z-10">{editingBooking ? "Refine Protocol" : "New Acquisition"}</h2>
                                    <p className="text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0 flex items-center gap-2 relative z-10">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                        Authorized Interface
                                    </p>
                                    <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group z-20">
                                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-2 flex-1 flex flex-col justify-center">
                                    <div className="">
                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Client Identity</label>
                                            <div className="relative group">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    value={formData.customerName}
                                                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                    placeholder="Legal Entity Name"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Asset valuation</label>
                                            <div className="relative group">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    type="number"
                                                    value={formData.amountPaid}
                                                    onChange={e => setFormData({ ...formData, amountPaid: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-sans"
                                                    placeholder="PKR Amount"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Timeline</label>
                                            <div className="relative group">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    type="date"
                                                    value={formData.bookingDate}
                                                    onChange={e => setFormData({ ...formData, bookingDate: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Asset Link</label>
                                            <div className="relative group">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <select
                                                    required
                                                    value={formData.unitId}
                                                    onChange={e => setFormData({ ...formData, unitId: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                                                >
                                                    {units.map(u => (
                                                        <option key={u.id} value={u.id}>{u.unitNumber} - {u.project?.name || "Global"}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Protocol Status</label>
                                            <div className="relative group">
                                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <select
                                                    required
                                                    value={formData.status}
                                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                                                >
                                                    <option value="pending">Awaiting Validation</option>
                                                    <option value="confirmed">Verified Transaction</option>
                                                    <option value="cancelled">Protocol Terminated</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-1.5 mt-2 bg-primary text-white rounded-xl font-semibold text-xs uppercase tracking-normal shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                                        {editingBooking ? "Commit Updates" : "Authorize Acquisition"}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Premium Invoice Modal */}
            <AnimatePresence>
                {isInvoiceOpen && selectedInvoice && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-secondary/95 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white w-full max-w-4xl rounded-xl shadow-md relative overflow-hidden my-10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsInvoiceOpen(false)}
                                className="absolute top-10 right-10 p-3 bg-slate-100/50 hover:bg-slate-200 rounded-xl z-20 transition-all"
                            >
                                <X className="w-6 h-6 text-slate-800" />
                            </button>

                            {/* Printable Content */}
                            <div className="p-20" id="invoice-content">
                                {/* Invoice Header */}
                                <div className="flex flex-col md:flex-row justify-between gap-10 pb-16 border-b-2 border-slate-100">
                                    <div className="">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-md shadow-primary/20">
                                                <Building2 className="text-white w-8 h-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-lg m-0 p-0 font-semibold text-slate-800  tracking-normal leading-none">RealERPCRM</h2>
                                                <p className="text-[10px] font-semibold text-primary uppercase tracking-normal mt-2">Certified Ledger</p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className="text-xl font-semibold text-slate-800 ">{selectedInvoice.tenant?.name || "Corporate Enterprise"}</p>
                                            <p className="text-sm font-bold text-slate-400 ">Financial Operations Hub</p>
                                            <p className="text-sm font-bold text-slate-400 ">Islamabad, Pakistan</p>
                                        </div>
                                    </div>

                                    <div className="text-right space-y-4">
                                        <h1 className="text-7xl font-semibold text-slate-100  tracking-normal m-0 p-0 uppercase leading-none select-none">Invoice</h1>
                                        <div className="">
                                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide ">Reference Number</p>
                                            <p className="text-2xl font-semibold text-slate-800  tracking-normal">#INV-{selectedInvoice.id.toString().padStart(6, '0')}</p>
                                        </div>
                                        <div className="">
                                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide ">Issue Timeline</p>
                                            <p className="text-lg font-semibold text-primary  tracking-normal">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Billing Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-16">
                                    <div className="">
                                        <h5 className="text-[10px] font-semibold text-primary uppercase tracking-wide  flex items-center gap-2">
                                            <User className="w-3 h-3" />
                                            Acquisition Entity
                                        </h5>
                                        <div className="space-y-2">
                                            <p className="text-lg m-0 p-0 font-semibold text-slate-800  leading-none">{selectedInvoice.customerName}</p>
                                            <p className="text-slate-400 font-bold ">Official Registered Partner</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <h5 className="text-[10px] font-semibold text-primary uppercase tracking-wide  flex items-center gap-2">
                                            <CreditCard className="w-3 h-3" />
                                            Payment Protocol
                                        </h5>
                                        <div className="">
                                            <p className="text-xl font-semibold text-slate-800 ">{selectedInvoice.status === 'confirmed' ? "Verified Settlement" : "Awaiting Authorization"}</p>
                                            <p className="text-sm font-bold text-slate-400 ">Direct Account Wire / Ledger Entry</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Asset Table */}
                                <div className="rounded-xl border-2 border-slate-50 overflow-hidden shadow-inner bg-slate-50/20">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50">
                                                <th className="px-8 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Asset Description</th>
                                                <th className="px-8 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Reference</th>
                                                <th className="px-8 py-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wide text-right">Acquisition Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 bg-white">
                                            <tr>
                                                <td className="px-8 py-10">
                                                    <p className="font-semibold text-xl text-slate-800  leading-none">{selectedInvoice.unit?.project?.name || "Global Real Estate Asset"}</p>
                                                    <p className="text-xs font-bold text-slate-400  mt-3">{selectedInvoice.unit?.unitNumber ? `Exclusive Rights to Unit: ${selectedInvoice.unit.unitNumber}` : "Corporate Multi-Unit Inventory Acquisition"}</p>
                                                </td>
                                                <td className="px-8 py-10">
                                                    <p className="font-semibold text-slate-500  uppercase text-xs tracking-wide">UNIT-{selectedInvoice.unitId}</p>
                                                </td>
                                                <td className="px-8 py-10 text-right">
                                                    <p className="font-semibold text-2xl text-slate-800  tracking-normal">Rs {selectedInvoice.amountPaid?.toLocaleString()}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-secondary text-white">
                                                <td colSpan={2} className="px-8 py-8 text-right font-semibold text-[10px] uppercase tracking-normal ">Total Capital Investment</td>
                                                <td className="px-8 py-8 text-right font-semibold text-3xl  tracking-normal">Rs {selectedInvoice.amountPaid?.toLocaleString()}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                {/* Footer Signature */}
                                <div className="pt-20 flex justify-between items-end">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                                            <ShieldCheck className="text-green-500 w-7 h-7" />
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-400  leading-relaxed max-w-xs uppercase tracking-normal">
                                            This is a high-fidelity digital ledger entry. Authenticated through <span className="text-primary font-semibold">RealERPCRM</span> enterprise security layers.
                                        </p>
                                    </div>
                                    <div className="text-right space-y-6">
                                        <div className="pb-4 border-b-2 border-slate-100 w-64 ml-auto">
                                            <NextImage src="https://signature.freebiestore.net/wp-content/uploads/2016/10/Signature-2.png" alt="Signature" width={200} height={64} className="h-16 w-auto opacity-30 mx-auto mr-0 filter grayscale invert" unoptimized />
                                        </div>
                                        <p className="text-[10px] font-semibold text-slate-800 uppercase tracking-normal ">Authorized Registrar</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Bar */}
                            <div className="bg-slate-50 p-10 flex items-center justify-center gap-6">
                                <button
                                    onClick={() => window.print()}
                                    className="px-10 py-5 bg-white text-slate-800 rounded-xl font-semibold text-[11px] uppercase tracking-wide shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all border border-slate-100 flex items-center gap-3"
                                >
                                    <Printer className="w-5 h-5 text-primary" />
                                    Print Protocol
                                </button>
                                <button className="px-10 py-5 bg-primary text-white rounded-xl font-semibold text-[11px] uppercase tracking-normal shadow-md shadow-primary/30 hover:scale-[1.05] transition-all flex items-center gap-3">
                                    <Download className="w-5 h-5" />
                                    Export PDF
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * { visibility: hidden; }
                    #invoice-content, #invoice-content * { visibility: visible; }
                    #invoice-content { position: absolute; left: 0; top: 0; width: 100%; border-radius: 0; }
                    .no-print { display: none !important; }
                }
            `}</style>
        </div>
    );
}
