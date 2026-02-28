"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, TrendingUp, Package, Truck, ArrowRight, ArrowRightLeft, ShieldAlert, Loader2 } from "lucide-react";

interface StoreItem {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    unit: string;
}

export default function InventoryDashboard() {
    const [items, setItems] = useState<StoreItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await fetch('/realerpcrm/api/store');
            const data = await res.json();
            if (Array.isArray(data)) setItems(data);
        } catch (err) {
            console.error("Failed to fetch inventory", err);
        } finally {
            setLoading(false);
        }
    };

    const categories = Array.from(new Set(items.map(i => i.category || 'Uncategorized')));
    const filteredItems = items.filter(i => selectedCategory === "ALL" || i.category === selectedCategory);

    const totalGlobalStock = items.reduce((acc, curr) => acc + Number(curr.quantity), 0);
    const lowStockItems = items.filter(s => s.quantity < 10); // Simple reorder point logic

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Package className="w-6 h-6 text-indigo-600" /> Inventory & Stock Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Real-time tracking of stock levels across all active warehouses.</p>
                </div>

                <div className="flex gap-2">
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 shadow-sm"
                    >
                        <option value="ALL">All Categories</option>
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Global Stock Units</p>
                        <p className="text-2xl font-bold text-slate-900">{totalGlobalStock.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-rose-100 p-3 rounded-xl text-rose-600">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Low Stock Alerts</p>
                        <p className="text-2xl font-bold text-rose-600">{lowStockItems.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                        <Truck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Inventory Value</p>
                        <p className="text-2xl font-bold text-slate-900">
                            Rs {items.reduce((acc, curr) => acc + (Number(curr.quantity) * Number(curr.price)), 0).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                        <ArrowRightLeft className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Products</p>
                        <p className="text-2xl font-bold text-slate-900">{items.length}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Stock Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            Full Inventory Table
                        </h3>
                        <button onClick={fetchInventory} className="text-indigo-600 text-sm font-bold hover:underline">Refresh</button>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <p className="font-medium">Syncing inventory...</p>
                            </div>
                        ) : (
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b">
                                    <tr>
                                        <th className="px-6 py-4">Product Name</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-right">Unit Price</th>
                                        <th className="px-6 py-4 text-right">Current Stock</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredItems.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{item.name}</div>
                                                <div className="text-xs text-slate-400">ID: {item.id}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{item.category || 'General'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium">Rs {Number(item.price).toLocaleString()}</td>
                                            <td className={`px-6 py-4 text-right font-bold ${item.quantity < 10 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                {item.quantity} {item.unit}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.quantity < 10 ? (
                                                    <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
                                                ) : (
                                                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">In Stock</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
