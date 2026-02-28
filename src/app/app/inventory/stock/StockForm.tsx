"use client";

import { useOptimistic, useState, useRef } from "react";
import { useFormState } from "react-dom";
import { handleStockChange } from "./actions";
import { PackagePlus, PackageMinus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Product = {
    id: string;
    name: string;
    sku: string;
    current_stock: number;
};

export default function StockForm({ products }: { products: Product[] }) {
    const [state, formAction] = useFormState(handleStockChange, {});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeType, setActiveType] = useState<"IN" | "OUT">("IN");
    const formRef = useRef<HTMLFormElement>(null);

    // Optimistic UI for immediate stock update feedback
    const [optimisticProducts, addOptimisticUpdate] = useOptimistic(
        products,
        (currentProducts, optimisticData: { productId: string; type: string; quantity: number }) => {
            return currentProducts.map(p => {
                if (p.id === optimisticData.productId) {
                    const newStock = optimisticData.type === "IN"
                        ? p.current_stock + optimisticData.quantity
                        : p.current_stock - optimisticData.quantity;
                    return { ...p, current_stock: newStock };
                }
                return p;
            });
        }
    );

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        const productId = formData.get("productId") as string;
        const type = activeType;
        const quantity = Number(formData.get("quantity"));

        // Explicitly add type and dummy userId
        formData.append("type", type);
        formData.append("userId", "usr_9000_fortify");

        // Pre-emptively update UI
        if (quantity > 0 && productId) {
            addOptimisticUpdate({ productId, type, quantity });
        }

        await formAction(formData);

        setIsSubmitting(false);
        if (!state?.error) {
            formRef.current?.reset();
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2rem] p-8 shadow-2xl shadow-indigo-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-70 translate-x-1/2 -translate-y-1/2" />

            <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    Adjust Stock Levels
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Perform a manual ledger modification.
                </p>
            </div>

            {state?.success && (
                <div className="mb-6 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-800 animate-in zoom-in-95 fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <p className="text-sm font-medium">{state.message}</p>
                </div>
            )}

            {state?.error && (
                <div className="mb-6 bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 text-rose-800 animate-in zoom-in-95 fade-in">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <p className="text-sm font-medium">{state.error}</p>
                </div>
            )}

            <form ref={formRef} action={handleSubmit} className="space-y-6">

                {/* Type selector (IN / OUT) */}
                <div className="flex bg-slate-100/70 p-1.5 rounded-2xl">
                    <button
                        type="button"
                        onClick={() => setActiveType("IN")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeType === "IN"
                                ? "bg-white text-emerald-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                            }`}
                    >
                        <PackagePlus className="w-5 h-5" /> Stock IN
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveType("OUT")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeType === "OUT"
                                ? "bg-white text-rose-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                            }`}
                    >
                        <PackageMinus className="w-5 h-5" /> Stock OUT
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Target Product</label>
                    <div className="relative">
                        <select
                            name="productId"
                            required
                            defaultValue=""
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 block p-4 appearance-none transition-all outline-none"
                        >
                            <option value="" disabled>-- Select Product from Database --</option>
                            {optimisticProducts.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} ({p.sku}) — Available stock: {p.current_stock}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            required
                            placeholder="e.g. 50"
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 font-bold text-sm rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 block p-4 transition-all outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Reason Code</label>
                        <select
                            name="reasonCode"
                            required
                            defaultValue=""
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 block p-4 appearance-none transition-all outline-none"
                        >
                            <option value="" disabled>-- Reason --</option>
                            {activeType === "IN" ? (
                                <>
                                    <option value="PURCHASE">Purchase Order</option>
                                    <option value="RETURN">Customer Return</option>
                                    <option value="TRANSFER">Warehouse Transfer</option>
                                    <option value="ADJUSTMENT_IN">Found / Audit</option>
                                </>
                            ) : (
                                <>
                                    <option value="SALE">Sales Order</option>
                                    <option value="DAMAGE">Damaged / Spoiled</option>
                                    <option value="TRANSFER">Warehouse Transfer</option>
                                    <option value="ADJUSTMENT_OUT">Lost / Shrinkage</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-white font-bold flex justify-center items-center gap-2 transition-all duration-500 hover:scale-[1.02] shadow-xl ${activeType === "IN"
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:shadow-emerald-500/25"
                            : "bg-gradient-to-r from-rose-500 to-orange-500 hover:shadow-rose-500/25"
                        } focus:ring-4 focus:ring-offset-2 ${activeType === "IN" ? "focus:ring-emerald-500" : "focus:ring-rose-500"}`}
                >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        activeType === "IN" ? "Authorize Inbound" : "Authorize Outbound"
                    )}
                </button>
            </form>
        </div>
    );
}
