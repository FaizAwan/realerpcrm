"use client";

import { useState, useEffect, useCallback } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Filter, Folder, Users, BarChart3, Wallet, Coins, UserPlus, X, Plus, Building2, Search, Edit2, Trash2, ChevronRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SalesPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [units, setUnits] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [formData, setFormData] = useState({
        customerName: "",
        unitId: "",
        amountPaid: "",
        status: "pending"
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [bookingsRes, unitsRes] = await Promise.all([
                fetch("/realerpcrm/api/bookings"),
                fetch("/realerpcrm/api/units")
            ]);
            const bookingsData = await bookingsRes.json();
            const unitsData = await unitsRes.json();
            setBookings(Array.isArray(bookingsData) ? bookingsData : []);
            setUnits(Array.isArray(unitsData) ? unitsData : []);
        } catch (error) {
            console.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/realerpcrm/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    unitId: parseInt(formData.unitId),
                    amountPaid: formData.amountPaid ? parseFloat(formData.amountPaid) : 0
                })
            });
            if (res.ok) {
                fetchData();
                setIsModalOpen(false);
                setFormData({ customerName: "", unitId: "", amountPaid: "", status: "pending" });
            }
        } catch (error) {
            alert("Failed to create booking");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this booking?")) return;
        try {
            const res = await fetch(`/realerpcrm/api/bookings/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            alert("Delete failed");
        }
    };

    const totalSales = bookings.reduce((acc, b) => acc + (parseFloat(b.amountPaid) || 0), 0);
    const totalUnits = units.length;
    const bookedUnits = units.filter(u => u.status === 'booked' || u.status === 'sold').length;
    const availableUnits = units.filter(u => u.status === 'available').length;

    const filteredBookings = bookings.filter(b => {
        const matchesSearch = b.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const inventoryByType = units.reduce((acc: any, unit) => {
        const type = unit.project?.type || 'Other';
        if (!acc[type]) acc[type] = { total: 0, booked: 0, available: 0 };
        acc[type].total++;
        if (unit.status === 'booked' || unit.status === 'sold') acc[type].booked++;
        if (unit.status === 'available') acc[type].available++;
        return acc;
    }, {});

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-20 relative">
            <ProjectHeader />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 pb-10 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-6">
                        <div className="w-28 h-28 rounded-full bg-sky-100 flex items-center justify-center border-4 border-white shadow-sm">
                            <Building2 className="w-12 h-12 text-slate-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h3 className="text-2xl font-bold text-slate-800">Sales Dashboard</h3>
                            </div>
                            <p className="text-sm font-medium text-slate-500">Real-time sales tracking and analytics</p>
                        </div>
                    </div>

                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#007b5e" strokeWidth="12"
                                strokeDasharray={`${2 * Math.PI * 40}`}
                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - bookedUnits / (totalUnits || 1))}`}
                                strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-sm font-semibold text-slate-500">Sold</span>
                            <span className="text-xl font-bold text-slate-800">{Math.round((bookedUnits / (totalUnits || 1)) * 100)}%</span>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    placeholder="Search bookings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#007b5e] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#00604a]"
                        >
                            <Plus className="w-4 h-4" />
                            New Booking
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <Folder className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-slate-800">{totalUnits}</span>
                                <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Units</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                <Users className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-slate-800">{bookings.length}</span>
                                <span className="text-[11px] font-bold uppercase text-slate-400 block">Clients</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-slate-800">{totalSales.toLocaleString()}</span>
                                <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Sales</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                                <Wallet className="w-4 h-4 text-teal-500" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-slate-800">{availableUnits}</span>
                                <span className="text-[11px] font-bold uppercase text-slate-400 block">Available</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-slate-700">Bookings by quarter</h4>
                        <div className="relative h-64 w-full">
                            <div className="absolute inset-0 flex flex-col justify-between">
                                {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map(val => (
                                    <div key={val} className="w-full border-b border-slate-100 flex items-center relative">
                                        <span className="absolute -left-6 text-[10px] font-semibold text-slate-400">{val}</span>
                                    </div>
                                ))}
                            </div>
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <polyline points="0,100 25,100 50,98 75,75 100,10" fill="none" stroke="#007b5e" strokeWidth="1.5" />
                                <circle cx="0" cy="100" r="1.5" fill="#007b5e" />
                                <circle cx="25" cy="100" r="1.5" fill="#007b5e" />
                                <circle cx="50" cy="98" r="1.5" fill="#007b5e" />
                                <circle cx="75" cy="75" r="1.5" fill="#007b5e" />
                                <circle cx="100" cy="10" r="1.5" fill="#007b5e" />
                            </svg>
                            <div className="absolute -bottom-6 w-full flex justify-between text-[10px] font-semibold text-slate-400">
                                <span>Q3-2023</span>
                                <span>Q4-2023</span>
                                <span>Q1-2024</span>
                                <span>Q2-2024</span>
                                <span>Q3-2024</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-slate-700">Property units inventory</h4>
                        <div className="w-full">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100/80 bg-slate-50/50">
                                        <th className="py-3 px-2 font-bold text-slate-500 text-[11px] uppercase">Category</th>
                                        <th className="py-3 px-2 font-bold text-slate-500 text-[11px] uppercase">Total</th>
                                        <th className="py-3 px-2 font-bold text-slate-500 text-[11px] uppercase">Booked</th>
                                        <th className="py-3 px-2 font-bold text-slate-500 text-[11px] uppercase">Available</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(inventoryByType).map(([type, data]: any, index) => (
                                        <tr key={index} className="border-b border-slate-100">
                                            <td className="py-5 px-2 font-semibold text-slate-700">{type}</td>
                                            <td className="py-5 px-2 text-slate-500 font-medium">{data.total}</td>
                                            <td className="py-5 px-2 text-slate-500 font-medium">{data.booked}</td>
                                            <td className="py-5 px-2 text-slate-500 font-medium">{data.available}</td>
                                        </tr>
                                    ))}
                                    {Object.keys(inventoryByType).length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-slate-400">No inventory data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-slate-100">
                    <h4 className="text-lg font-bold text-slate-700 mb-6">Recent Bookings</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Customer</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Unit</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Amount Paid</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Date</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No bookings found</td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-4 font-semibold text-slate-800">{booking.customerName}</td>
                                            <td className="px-4 py-4 text-slate-600">{booking.unit?.unitNumber}</td>
                                            <td className="px-4 py-4 text-slate-800 font-medium">{parseFloat(booking.amountPaid || 0).toLocaleString()}</td>
                                            <td className="px-4 py-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                                    booking.status === 'confirmed' ? "bg-emerald-100 text-emerald-600" :
                                                        booking.status === 'cancelled' ? "bg-red-100 text-red-600" :
                                                            "bg-amber-100 text-amber-600"
                                                )}>{booking.status}</span>
                                            </td>
                                            <td className="px-4 py-4 text-slate-500">
                                                {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <button onClick={() => handleDelete(booking.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer" />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-2xl overflow-hidden flex flex-col">
                            <div className="bg-[#007b5e] p-6 text-white">
                                <h2 className="text-xl font-bold">New Booking</h2>
                                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Customer Name</label>
                                    <input required value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium" placeholder="Enter customer name" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Unit</label>
                                    <select required value={formData.unitId} onChange={e => setFormData({ ...formData, unitId: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium">
                                        <option value="">Select Unit</option>
                                        {units.filter(u => u.status === 'available').map(u => (
                                            <option key={u.id} value={u.id}>{u.unitNumber} - {u.project?.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Amount Paid</label>
                                    <input type="number" value={formData.amountPaid} onChange={e => setFormData({ ...formData, amountPaid: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium" placeholder="Enter amount" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium">
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-4 bg-[#007b5e] text-white rounded-xl font-bold hover:bg-[#00604a] flex items-center justify-center gap-2">
                                    Create Booking <ChevronRight className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
