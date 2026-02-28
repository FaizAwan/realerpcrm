"use client";

import { useState } from "react";
import { AlertTriangle, TrendingUp, Package, Truck, ArrowRight, ArrowRightLeft, ShieldAlert } from "lucide-react";
import { Warehouse, WarehouseStock, Product } from "./schema";

const MOCK_WAREHOUSES: Warehouse[] = [
    { id: "W1", name: "Main Distribution Center", location: "New York, NY" },
    { id: "W2", name: "West Coast Hub", location: "Los Angeles, CA" },
    { id: "W3", name: "Texas Depot", location: "Austin, TX" }
];

const MOCK_PRODUCTS: Product[] = [
    { sku: "SKU-1001", name: "Industrial Steel Beams", category: "Construction", uom: "Ton", price: 1200, globalStock: 125 },
    { sku: "SKU-1002", name: "Cement Bags (50kg)", category: "Construction", uom: "Bag", price: 15, globalStock: 450 },
    { sku: "SKU-2001", name: "Copper Wiring Bundle", category: "Electrical", uom: "Meter", price: 5, globalStock: 12000 },
];

const MOCK_STOCK: WarehouseStock[] = [
    { warehouseId: "W1", sku: "SKU-1001", quantity: 100, reorderPoint: 50 },
    { warehouseId: "W2", sku: "SKU-1001", quantity: 25, reorderPoint: 40 }, // <== Low Stock
    { warehouseId: "W1", sku: "SKU-1002", quantity: 300, reorderPoint: 100 },
    { warehouseId: "W2", sku: "SKU-1002", quantity: 150, reorderPoint: 200 }, // <== Low Stock
    { warehouseId: "W1", sku: "SKU-2001", quantity: 8000, reorderPoint: 5000 },
    { warehouseId: "W3", sku: "SKU-2001", quantity: 4000, reorderPoint: 5000 }, // <== Low Stock
];

export default function InventoryDashboard() {
    const [selectedWarehouse, setSelectedWarehouse] = useState<string>("ALL");

    // Aggregate Data
    const totalGlobalStock = MOCK_PRODUCTS.reduce((acc, curr) => acc + curr.globalStock, 0);
    const lowStockItems = MOCK_STOCK.filter(s => s.quantity <= s.reorderPoint && (selectedWarehouse === "ALL" || s.warehouseId === selectedWarehouse));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Package className="w-6 h-6 text-indigo-600" /> Multi-Location Inventory
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Real-time tracking of stock levels across all active warehouses.</p>
                </div>

                <div className="flex gap-2">
                    <select
                        value={selectedWarehouse}
                        onChange={e => setSelectedWarehouse(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    >
                        <option value="ALL">All Warehouses (Global View)</option>
                        {MOCK_WAREHOUSES.map(w => (
                            <option key={w.id} value={w.id}>{w.name}</option>
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
                        <p className="text-sm font-medium text-slate-500">Active Inbounds</p>
                        <p className="text-2xl font-bold text-slate-900">4 Pos</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                        <ArrowRightLeft className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">In Transit (IWT)</p>
                        <p className="text-2xl font-bold text-slate-900">2 Transfers</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Low Stock Watchlist */}
                <div className="bg-white rounded-2xl border border-rose-200 shadow-sm overflow-hidden lg:col-span-2">
                    <div className="bg-rose-50 border-b border-rose-100 p-4 flex items-center gap-2">
                        <ShieldAlert className="text-rose-600 w-5 h-5" />
                        <h3 className="font-bold text-rose-900">Critical Reorder Watchlist</h3>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b">
                                <tr>
                                    <th className="px-4 py-3">Product / SKU</th>
                                    <th className="px-4 py-3">Warehouse</th>
                                    <th className="px-4 py-3 text-right">Current Stock</th>
                                    <th className="px-4 py-3 text-right">Reorder Point</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {lowStockItems.length > 0 ? lowStockItems.map((item, idx) => {
                                    const prod = MOCK_PRODUCTS.find(p => p.sku === item.sku);
                                    const wh = MOCK_WAREHOUSES.find(w => w.id === item.warehouseId);
                                    return (
                                        <tr key={idx} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3">
                                                <div className="font-semibold text-slate-900">{prod?.name}</div>
                                                <div className="text-xs text-slate-400">{item.sku}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">{wh?.name}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-rose-600">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right">{item.reorderPoint}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm transition-colors">
                                                    Draft PO
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-6 text-slate-400 font-medium">No low stock items in selected view.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Transfer Quick Action / Status */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="border-b border-slate-100 p-4">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <ArrowRightLeft className="w-4 h-4 text-slate-400" /> Recent Transfers (IWT)
                        </h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {/* Mock Transfer Data */}
                        <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-500">TRF-9021</span>
                                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">In Transit</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-medium text-slate-800">
                                <span>Main Dist.</span>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                                <span>Texas Depot</span>
                            </div>
                            <div className="mt-2 text-xs text-slate-500">
                                SKU-2001 (500 Meters)
                            </div>
                        </div>

                        <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-500">TRF-9020</span>
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Completed</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-medium text-slate-800">
                                <span>West Coast</span>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                                <span>Main Dist.</span>
                            </div>
                            <div className="mt-2 text-xs text-slate-500">
                                SKU-1001 (50 Tons)
                            </div>
                        </div>

                        <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2.5 rounded-xl transition-colors">
                            <ArrowRightLeft className="w-4 h-4" /> New Inter-Warehouse Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
