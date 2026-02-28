"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, X, Truck, User, Calendar, FileText, ArrowLeft, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BillItem {
    storeItemId: number | null;
    description: string;
    quantity: number;
    price: number;
    total: number;
}

interface StoreItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Supplier {
    id: number;
    name: string;
}

export default function NewBillPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [bill, setBill] = useState({
        billNumber: `BILL-${Date.now().toString().slice(-6)}`,
        supplierId: "",
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [{ storeItemId: null, description: "", quantity: 1, price: 0, total: 0 }] as BillItem[]
    });

    useEffect(() => {
        fetchStoreItems();
        fetchSuppliers();
    }, []);

    const fetchStoreItems = async () => {
        try {
            const res = await fetch('/api/store');
            const data = await res.json();
            if (Array.isArray(data)) setStoreItems(data);
        } catch (err) {
            console.error("Failed to fetch store items", err);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const res = await fetch('/api/suppliers');
            const data = await res.json();
            if (Array.isArray(data)) setSuppliers(data);
        } catch (err) {
            console.error("Failed to fetch suppliers", err);
        }
    };

    const addItem = () => {
        setBill({
            ...bill,
            items: [...bill.items, { storeItemId: null, description: "", quantity: 1, price: 0, total: 0 }]
        });
    };

    const removeItem = (index: number) => {
        if (bill.items.length === 1) return;
        const newItems = bill.items.filter((_, i) => i !== index);
        setBill({ ...bill, items: newItems });
    };

    const updateItem = (index: number, field: keyof BillItem, value: any) => {
        const newItems = [...bill.items];
        const item = { ...newItems[index], [field]: value };

        if (field === 'storeItemId') {
            const selected = storeItems.find(s => s.id === parseInt(value));
            if (selected) {
                item.description = selected.name;
                item.price = Number(selected.price);
            }
        }

        item.total = item.quantity * item.price;
        newItems[index] = item;
        setBill({ ...bill, items: newItems });
    };

    const totalAmount = bill.items.reduce((sum, item) => sum + item.total, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bill.supplierId) return alert("Please select a supplier");

        setLoading(true);
        try {
            const res = await fetch('/api/bills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...bill, amount: totalAmount })
            });

            if (res.ok) {
                router.push('/app/accounts/bills');
                router.refresh();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to record bill");
            }
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4">
            {/* Navigation */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/app/accounts/bills" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Record Purchase Bill</h1>
                    <p className="text-slate-500">Add vendor bills, update stock, and track payables.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
                    >
                        <div className="flex items-center gap-2 text-[#00605A] font-bold text-lg border-b pb-4">
                            <Truck className="w-5 h-5" />
                            Supplier Details
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Select Supplier</label>
                                <select
                                    required
                                    value={bill.supplierId}
                                    onChange={e => setBill({ ...bill, supplierId: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00605A]/20 outline-none transition-all"
                                >
                                    <option value="">Choose a supplier...</option>
                                    {suppliers.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Bill Number</label>
                                <input
                                    required
                                    value={bill.billNumber}
                                    onChange={e => setBill({ ...bill, billNumber: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00605A]/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
                    >
                        <div className="flex items-center gap-2 text-[#00605A] font-bold text-lg border-b pb-4">
                            <FileText className="w-5 h-5" />
                            Bill Info
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Bill Date</label>
                                <input
                                    type="date"
                                    required
                                    value={bill.date}
                                    onChange={e => setBill({ ...bill, date: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00605A]/20 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Due Date</label>
                                <input
                                    type="date"
                                    required
                                    value={bill.dueDate}
                                    onChange={e => setBill({ ...bill, dueDate: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00605A]/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Items Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#00605A] font-bold text-lg">
                            <ShoppingCart className="w-5 h-5" />
                            Purchase Items
                        </div>
                        <button
                            type="button"
                            onClick={addItem}
                            className="flex items-center gap-2 px-4 py-2 bg-[#00605A] text-white rounded-lg text-sm font-bold hover:bg-[#004f4a] transition-all shadow-sm"
                        >
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left text-xs uppercase font-bold text-slate-500 tracking-wider">
                                    <th className="px-6 py-4">Item / Product (Updates Stock)</th>
                                    <th className="px-6 py-4 w-32">Qty</th>
                                    <th className="px-6 py-4 w-40">Cost (PKR)</th>
                                    <th className="px-6 py-4 w-40 text-right">Total</th>
                                    <th className="px-6 py-4 w-20"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence mode="popLayout">
                                    {bill.items.map((item, idx) => (
                                        <motion.tr
                                            key={idx}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <select
                                                    value={item.storeItemId || ""}
                                                    onChange={e => updateItem(idx, 'storeItemId', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00605A]/20 outline-none"
                                                >
                                                    <option value="">Select a product to update stock</option>
                                                    {storeItems.map(s => (
                                                        <option key={s.id} value={s.id}>{s.name} (Current: {s.quantity})</option>
                                                    ))}
                                                </select>
                                                <input
                                                    placeholder="Item description / Expense type"
                                                    value={item.description}
                                                    onChange={e => updateItem(idx, 'description', e.target.value)}
                                                    className="mt-2 w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00605A]/20 outline-none"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={e => updateItem(idx, 'quantity', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00605A]/20 outline-none font-bold"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={e => updateItem(idx, 'price', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00605A]/20 outline-none font-bold"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-bold text-slate-900">
                                                    Rs {item.total.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(idx)}
                                                    className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer / Summary */}
                    <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col items-end gap-4 text-right">
                        <div className="pt-4 w-64 space-y-1">
                            <p className="text-[#00605A] text-sm font-bold uppercase tracking-widest">Total Bill Amount</p>
                            <p className="text-4xl font-black text-slate-900">Rs {totalAmount.toLocaleString()}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        className={cn(
                            "flex items-center gap-2 px-10 py-3 bg-[#00605A] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 active:scale-95",
                            loading && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {loading ? "Recording..." : "Record Bill & Update Stock"}
                    </button>
                </div>
            </form>
        </div>
    );
}
