"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Package,
    Plus,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    ClipboardList,
    Truck,
    Warehouse,
    MoreVertical,
    Sparkles,
    BarChart3,
    Database,
    X,
    Trash2,
    Edit2,
    CheckCircle2,
    Hash,
    Layers,
    ShieldCheck,
    CreditCard,
    ArrowRight,
    TrendingUp,
    AlertCircle,
    MapPin,
    UserCircle,
    FileText,
    Clock,
    ShoppingCart,
    Factory
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function StorePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Inventory Registry");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Data States
    const [items, setItems] = useState<any[]>([]);
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
    const [bills, setBills] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // AI States
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiInsight, setAiInsight] = useState<string | null>(null);

    const inventoryTabs = [
        "Inventory Registry", "Warehouses", "Suppliers", "Procurement", "Bills"
    ];

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [itemsRes, whRes, supRes, poRes, billRes] = await Promise.all([
                fetch("/api/store"),
                fetch("/api/warehouses"),
                fetch("/api/suppliers"),
                fetch("/api/purchase-orders"),
                fetch("/api/bills")
            ]);

            const [itemsData, whData, supData, poData, billData] = await Promise.all([
                itemsRes.json(), whRes.json(), supRes.json(), poRes.json(), billRes.json()
            ]);

            setItems(Array.isArray(itemsData) ? itemsData : []);
            setWarehouses(Array.isArray(whData) ? whData : []);
            setSuppliers(Array.isArray(supData) ? supData : []);
            setPurchaseOrders(Array.isArray(poData) ? poData : []);
            setBills(Array.isArray(billData) ? billData : []);

            if (itemsData.length > 0 && !selectedItem) {
                setSelectedItem(itemsData[0]);
            }
        } catch (error) {
            console.error("Failed to sync supply chain data");
        } finally {
            setIsLoading(false);
        }
    }, [selectedItem]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Form Data State
    const [formData, setFormData] = useState<any>({
        // Combined form fields
        name: "", category: "", quantity: "0", unit: "bags", price: "", // Item
        location: "", // Warehouse
        contact: "", phone: "", email: "", address: "", // Supplier
        poNumber: "", supplierId: "", total: "", // PO
        billNumber: "", amount: "", dueDate: "", status: "unpaid" // Bill
    });

    const handleOpenModal = (item?: any) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item, quantity: item.quantity?.toString() || "0", price: item.price?.toString() || "" });
        } else {
            setEditingItem(null);
            setFormData({
                name: "", category: "", quantity: "0", unit: "bags", price: "",
                location: "", contact: "", phone: "", email: "", address: "",
                poNumber: `PO-${Date.now().toString().slice(-6)}`, supplierId: suppliers[0]?.id || "", total: "0",
                billNumber: `INV-${Date.now().toString().slice(-6)}`, amount: "0", dueDate: new Date().toISOString().split('T')[0], status: "unpaid"
            });
        }
        setIsModalOpen(true);
    };

    const getApiUrl = () => {
        switch (activeTab) {
            case "Inventory Registry": return "/api/store";
            case "Warehouses": return "/api/warehouses";
            case "Suppliers": return "/api/suppliers";
            case "Procurement": return "/api/purchase-orders";
            case "Bills": return "/api/bills";
            default: return "/api/store";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingItem ? `${getApiUrl()}/${editingItem.id}` : getApiUrl();
        const method = editingItem ? "PATCH" : "POST";

        let payload: any = {};

        if (activeTab === "Inventory Registry") {
            payload = {
                name: formData.name,
                category: formData.category,
                quantity: parseInt(formData.quantity) || 0,
                unit: formData.unit,
                price: formData.price ? parseFloat(formData.price) : null,
            };
        } else if (activeTab === "Warehouses") {
            payload = {
                name: formData.name,
                location: formData.location
            };
        } else if (activeTab === "Suppliers") {
            payload = {
                name: formData.name,
                contact: formData.contact,
                phone: formData.phone,
                email: formData.email,
                address: formData.address
            };
        } else if (activeTab === "Procurement") {
            payload = {
                poNumber: formData.poNumber,
                supplierId: parseInt(formData.supplierId),
                total: parseFloat(formData.total) || 0,
                status: formData.status || "draft"
            };
        } else if (activeTab === "Bills") {
            payload = {
                billNumber: formData.billNumber,
                amount: parseFloat(formData.amount) || 0,
                dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : new Date().toISOString(),
                supplierId: parseInt(formData.supplierId),
                status: formData.status || "unpaid"
            };
        }

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                fetchData();
                setIsModalOpen(false);
            } else {
                const err = await res.json();
                alert(`Protocol Error: ${err.error || "Update failed"}`);
            }
        } catch (error) {
            alert("Critical system handshake failure.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Authorize permanent decommissioning?")) return;
        try {
            const res = await fetch(`${getApiUrl()}/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            alert("Deletion protocol failed.");
        }
    };

    const runAiAdvisor = async (context: any) => {
        setIsAnalyzing(true);
        setAiInsight(null);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        { role: "user", content: `Generate tactical strategy for ${activeTab}: ${JSON.stringify(context)}. Focused on construction ERP optimizations.` }
                    ],
                    context: { module: "ERP Supply Chain", tab: activeTab }
                }),
            });
            const data = await response.json();
            setAiInsight(data.content);
        } catch (err) {
            setAiInsight("AI Advisor synchronization failed.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const renderActiveContext = () => {
        const currentData = activeTab === "Inventory Registry" ? items :
            activeTab === "Warehouses" ? warehouses :
                activeTab === "Suppliers" ? suppliers :
                    activeTab === "Procurement" ? purchaseOrders : bills;

        const filtered = currentData.filter((d: any) =>
            (d.name || d.poNumber || d.billNumber || d.title || "").toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                {/* Unified Sidebar */}
                <div className="xl:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-md p-10 space-y-8 h-full min-h-[600px]">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800  mb-6">Master Registry</h3>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 transition-colors" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder={`Search ${activeTab}...`}
                                    className="w-full pl-12 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
                            {isLoading ? (
                                <div className="py-20 flex flex-col items-center gap-4 animate-pulse">
                                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="py-20 text-center text-[10px] font-semibold text-slate-300 uppercase ">No active ledger found.</div>
                            ) : (
                                filtered.map((item: any) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        className={cn(
                                            "w-full p-8 rounded-xl text-left transition-all border-2",
                                            selectedItem?.id === item.id ? "bg-primary/5 border-primary shadow-lg" : "bg-slate-50/50 border-transparent hover:bg-slate-50"
                                        )}
                                    >
                                        <p className={cn("text-lg font-semibold  mb-1", selectedItem?.id === item.id ? "text-primary" : "text-slate-800")}>
                                            {item.name || item.poNumber || item.billNumber}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 ">ID: #{item.id.toString().padStart(4, '0')}</p>
                                    </button>
                                ))
                            )}
                        </div>

                        <button
                            onClick={() => handleOpenModal()}
                            className="w-full py-1.5 mt-2 bg-secondary text-white rounded-xl font-semibold text-[10px] uppercase tracking-wide flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-secondary/10"
                        >
                            <Plus className="w-4 h-4" />
                            Initialize New Protocol
                        </button>
                    </div>
                </div>

                {/* Unified Detail Area */}
                <div className="xl:col-span-3 space-y-8">
                    {selectedItem ? (
                        <div className="bg-white rounded-xl border border-slate-100 shadow-md p-16 relative overflow-hidden">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
                                <div>
                                    <h2 className="text-5xl font-semibold text-slate-800  uppercase tracking-normal leading-none mb-4">{selectedItem.name || selectedItem.poNumber || selectedItem.billNumber}</h2>
                                    <div className="flex items-center gap-4">
                                        <span className="px-5 py-2 bg-primary text-white text-[9px] font-semibold uppercase tracking-wide rounded-full shadow-lg shadow-primary/20 ">Validated Context</span>
                                        <span className="text-slate-400 font-bold ">{activeTab} Operational Portal</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => runAiAdvisor(selectedItem)} className="p-5 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all"><Sparkles className="w-6 h-6" /></button>
                                    <button onClick={() => handleOpenModal(selectedItem)} className="p-5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><Edit2 className="w-6 h-6" /></button>
                                    <button onClick={() => handleDelete(selectedItem.id)} className="p-5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-6 h-6" /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {Object.entries(selectedItem).filter(([k]) => !['id', 'tenantId', 'createdAt', 'updatedAt'].includes(k)).map(([key, val]: any) => (
                                    <div key={key}>
                                        <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wide  mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                                        <p className="text-xl font-semibold text-slate-800  tracking-tight">{val?.toString() || "N/A"}</p>
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence>
                                {aiInsight && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-20 p-12 bg-secondary rounded-xl text-white shadow-md relative">
                                        <div className="flex items-center gap-4 mb-6"><Sparkles className="text-primary w-6 h-6" /><h4 className="text-xl font-semibold ">Strategic AI Insight</h4></div>
                                        <p className="text-slate-300  font-medium leading-relaxed font-sans">{aiInsight}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center py-40 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                            <Database className="w-20 h-20 text-slate-200 mb-8" />
                            <h3 className="text-2xl font-semibold text-slate-300  uppercase">Awaiting Registry Handshake</h3>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-12 pb-4">
            {/* Enterprise Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-4xl font-semibold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                            <Database className="w-6 h-6 text-white" />
                        </div>
                        Strategic Supply Control
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Universal Supply Chain & Inventory Protocol. Powered by <span className="text-primary font-bold">STITCH ERP Engine</span>.
                    </p>
                </motion.div>
                <div className="hidden lg:flex items-center gap-4 bg-white px-5 py-3 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex flex-col items-end">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">System Status</p>
                        <p className="text-xs font-semibold text-green-500 flex items-center gap-2">Protocol Online <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /></p>
                    </div>
                </div>
            </div>

            {/* Tactical Navigation Tabs */}
            <div className="bg-secondary p-2 rounded-xl flex flex-wrap gap-1 shadow-md relative overflow-hidden max-w-4xl">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
                {inventoryTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setSelectedItem(null); }}
                        className={cn(
                            "px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all relative z-10",
                            activeTab === tab ? "bg-primary text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/10"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Quick Utility Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { label: "Inventory Velocity", val: "24.8%", icon: TrendingUp, color: "bg-teal-500" },
                    { label: "Active Suppy Nodes", val: suppliers.length, icon: Factory, color: "bg-blue-500" },
                    { label: "Open Procurement", val: purchaseOrders.filter(p => p.status === 'draft').length, icon: ShoppingCart, color: "bg-orange-500" },
                    { label: "Financial Liabilities", val: bills.filter(b => b.status === 'unpaid').length, icon: CreditCard, color: "bg-red-500" },
                ].map((stat, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={stat.label} className={cn("p-10 rounded-xl text-white shadow-xl relative overflow-hidden", stat.color)}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                        <stat.icon className="w-8 h-8 opacity-40 mb-8" />
                        <h4 className="text-5xl font-semibold  tracking-normal mb-2 leading-none">{stat.val}</h4>
                        <p className="text-[10px] font-semibold uppercase tracking-wide opacity-60 leading-none">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {renderActiveContext()}

            {/* Master Logistics Slide-Over Panel */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-[200] bg-secondary/80 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 z-[210] h-full w-full max-w-lg bg-white shadow-md overflow-y-auto border-l border-white/20"
                        >
                            <div className="min-h-full relative flex flex-col">
                                <div className="bg-primary px-4 py-3 text-white relative overflow-hidden shrink-0">
                                    <h2 className="text-xl m-0 p-0 font-semibold  tracking-normal leading-none relative z-10">{editingItem ? "Refine Ledger" : "Instate Protocol"}</h2>
                                    <p className="text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0 relative z-10 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                        Authorized {activeTab} Data Entry
                                    </p>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl opacity-50" />
                                    <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group z-20">
                                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 space-y-2 flex-1 flex flex-col justify-center">
                                    <div className="">
                                        {activeTab === "Inventory Registry" && (
                                            <>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Asset Designation</label>
                                                    <div className="relative group">
                                                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input required placeholder="Item Name" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Metric Volume</label>
                                                    <div className="relative group">
                                                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input required placeholder="Quantity" type="number" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-sans" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Industrial Unit</label>
                                                    <div className="relative group">
                                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input placeholder="e.g bags" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {activeTab === "Warehouses" && (
                                            <>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Warehouse Identity</label>
                                                    <div className="relative group">
                                                        <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input required placeholder="Facility Name" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Geographic Protocol</label>
                                                    <div className="relative group">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input placeholder="Location Address" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {activeTab === "Suppliers" && (
                                            <>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Entity Name</label>
                                                    <div className="relative group">
                                                        <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input required placeholder="Supplier Name" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Contact Email</label>
                                                    <div className="relative group">
                                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input placeholder="Email Address" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Identity Hotline</label>
                                                    <div className="relative group">
                                                        <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input placeholder="Phone Number" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {activeTab === "Procurement" && (
                                            <>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">PO Ledger Number</label>
                                                    <div className="relative group">
                                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input required placeholder="PO Number" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.poNumber} onChange={e => setFormData({ ...formData, poNumber: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Supplier</label>
                                                    <div className="relative group">
                                                        <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <select className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none" value={formData.supplierId} onChange={e => setFormData({ ...formData, supplierId: e.target.value })}>
                                                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Resource Valuation</label>
                                                    <div className="relative group">
                                                        <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input placeholder="Total Amount" type="number" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-sans" value={formData.total} onChange={e => setFormData({ ...formData, total: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {activeTab === "Bills" && (
                                            <>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Invoice Serial</label>
                                                    <div className="relative group">
                                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input required placeholder="Bill Number" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none" value={formData.billNumber} onChange={e => setFormData({ ...formData, billNumber: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Supplier</label>
                                                    <div className="relative group">
                                                        <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <select className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none" value={formData.supplierId} onChange={e => setFormData({ ...formData, supplierId: e.target.value })}>
                                                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Financial Liability</label>
                                                    <div className="relative group">
                                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input placeholder="Amount" type="number" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-sans" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ">Due Date</label>
                                                    <div className="relative group">
                                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input type="date" className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm font-semibold  text-slate-800 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-400" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <button type="submit" className="w-full py-1.5 mt-2 bg-primary text-white rounded-xl font-semibold text-xs uppercase tracking-normal shadow-sm hover:scale-[1.02] flex items-center justify-center gap-4 transition-all group">
                                        {editingItem ? "Update Ledger" : "Authorize Creation"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
