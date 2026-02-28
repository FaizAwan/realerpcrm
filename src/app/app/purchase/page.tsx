"use client";

import { useState, useEffect } from "react";
import {
    ShoppingCart,
    Plus,
    X,
    Search,
    Filter,
    ArrowRight,
    FileText,
    Clock,
    CheckCircle2,
    AlertCircle,
    BarChart3,
    History,
    Package,
    Hash,
    Truck,
    TrendingUp,
    ShieldCheck,
    Edit2,
    Trash2,
    ChevronRight,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PurchasePage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        supplierId: "",
        poNumber: "",
        total: "",
        status: "draft",
        priority: "Medium"
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [ordersRes, suppliersRes] = await Promise.all([
                fetch("/realerpcrm/api/purchase-orders"),
                fetch("/realerpcrm/api/suppliers")
            ]);
            const ordersData = await ordersRes.json();
            const suppliersData = await suppliersRes.json();
            setOrders(Array.isArray(ordersData) ? ordersData : []);
            setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);

            if (suppliersData.length > 0 && !formData.supplierId) {
                setFormData(prev => ({ ...prev, supplierId: suppliersData[0].id.toString() }));
            }
        } catch (error) {
            console.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (order?: any) => {
        if (order) {
            setEditingOrder(order);
            setFormData({
                supplierId: order.supplierId?.toString() || "",
                poNumber: order.poNumber || "",
                total: order.total?.toString() || "",
                status: order.status || "draft",
                priority: order.priority || "Medium"
            });
        } else {
            setEditingOrder(null);
            setFormData({
                supplierId: suppliers[0]?.id?.toString() || "",
                poNumber: `PO-${Math.floor(Math.random() * 90000) + 10000}`,
                total: "",
                status: "draft",
                priority: "Medium"
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingOrder ? `/api/purchase-orders/${editingOrder.id}` : "/api/purchase-orders";
        const method = editingOrder ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    supplierId: parseInt(formData.supplierId),
                    total: parseFloat(formData.total) || 0
                })
            });
            if (res.ok) {
                fetchData();
                setIsModalOpen(false);
            }
        } catch (error) {
            alert("Procurement handshake failed.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Authorize decommissioning of this order?")) return;
        try {
            const res = await fetch(`/realerpcrm/api/purchase-orders/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            alert("Order deletion failed.");
        }
    };

    const filteredOrders = orders.filter(o =>
        (o.poNumber || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-4 text-slate-800">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-4xl font-semibold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <ShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        Procurement Control
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Procurement Excellence & <span className="text-primary font-bold">Cost Effectiveness</span>
                    </p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-wide shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        <Plus className="w-4 h-4" />
                        Initialize PO
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Orders", val: orders.length, icon: FileText, color: "text-blue-500" },
                    { label: "Pending Transit", val: orders.filter(o => o.status === 'draft').length, icon: Clock, color: "text-amber-500" },
                    { label: "Total Valuation", val: orders.length, icon: BarChart3, color: "text-primary" },
                    { label: "Resource Nodes", val: suppliers.length, icon: Package, color: "text-indigo-500" },
                ].map((stat, i) => (
                    <motion.div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-md">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4"><stat.icon className={cn("w-5 h-5", stat.color)} /></div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.val}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <h4 className="text-xl font-semibold text-slate-800 tracking-tight uppercase">Procurement Log</h4>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search PO ledger..."
                            className="pl-12 pr-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium w-[250px] outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase">PO Number</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase">Supplier</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase">status</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase">valuation</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-slate-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan={5} className="py-20 text-center animate-pulse text-slate-300 font-bold uppercase text-xs">Syncing Procurement...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan={5} className="py-20 text-center text-slate-300 font-bold uppercase text-xs">No records found.</td></tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6 text-sm font-bold text-slate-800 tracking-tight">{order.poNumber}</td>
                                        <td className="px-8 py-6 text-sm font-semibold text-slate-600">
                                            {suppliers.find(s => s.id === order.supplierId)?.name || `ID: ${order.supplierId}`}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                                order.status === "delivered" ? "bg-green-100 text-green-600" :
                                                    order.status === "cancelled" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                                            )}>{order.status}</span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-slate-800">PKR {order.total}</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenModal(order)} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-primary hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(order.id)} className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-[200] bg-secondary/80 backdrop-blur-sm" />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 z-[210] h-full w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
                            <div className="h-full flex flex-col">
                                <div className="bg-primary px-4 py-3 text-white flex justify-between items-center shrink-0">
                                    <div>
                                        <h2 className="text-xl font-semibold tracking-normal">{editingOrder ? "Refine Order" : "Initialize Order"}</h2>
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wide">Authorized Procurement Protocol</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X className="w-6 h-6" /></button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-4 flex-1 flex flex-col justify-center">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight pl-1 mb-1 block">PO Ledger Number</label>
                                            <div className="relative group">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input required className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-sans" value={formData.poNumber} onChange={e => setFormData({ ...formData, poNumber: e.target.value })} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight pl-1 mb-1 block">Supplier Identity</label>
                                            <div className="relative group">
                                                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <select className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none" value={formData.supplierId} onChange={e => setFormData({ ...formData, supplierId: e.target.value })}>
                                                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight pl-1 mb-1 block">Resource Valuation (PKR)</label>
                                            <div className="relative group">
                                                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input type="number" required className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-sans" value={formData.total} onChange={e => setFormData({ ...formData, total: e.target.value })} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight pl-1 mb-1 block">Priority Protocol</label>
                                            <select className="w-full px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                                                <option value="High">Nuclear High</option>
                                                <option value="Medium">Standard Medium</option>
                                                <option value="Low">Economic Low</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight pl-1 mb-1 block">Lifecycle Status</label>
                                            <select className="w-full px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                                <option value="draft">Draft Protocol</option>
                                                <option value="pending">Pending Validation</option>
                                                <option value="delivered">Cycle Complete</option>
                                                <option value="cancelled">Decommissioned</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-2 mt-auto bg-primary text-white rounded-xl font-bold text-xs uppercase shadow-lg shadow-primary/20 hover:scale-[1.02] flex items-center justify-center gap-2 transition-all">
                                        Commit Protocol <ChevronRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
