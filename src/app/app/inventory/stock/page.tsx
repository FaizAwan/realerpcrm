import { Layers, Activity, ArrowDownRight, ArrowUpRight, History } from "lucide-react";
import StockForm from "./StockForm";

// === MOCK ORM DATA START ===
// In a real Server Component workflow: 
// import prisma from "@/lib/prisma";
// const productsData = await prisma.product.findMany();
const productsData = [
    { id: "prod_1", name: "Alpha Steel Beams (20m)", sku: "SKU-A100", current_stock: 450 },
    { id: "prod_2", name: "Premium Cement 50kg", sku: "SKU-B200", current_stock: 120 },
    { id: "prod_3", name: "Heavy Duty Copper Wire", sku: "SKU-C300", current_stock: 8500 },
];

const mockLogs = [
    { id: "log_1", type: "IN", quantity: 50, reasonCode: "PURCHASE", userId: "usr_9000_fortify", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: "log_2", type: "OUT", quantity: 15, reasonCode: "SALE", userId: "usr_2001_john", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { id: "log_3", type: "IN", quantity: 300, reasonCode: "RETURN", userId: "usr_9000_fortify", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: "log_4", type: "OUT", quantity: 5, reasonCode: "DAMAGE", userId: "usr_2015_mary", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28) },
];
// === MOCK ORM DATA END ===

export default async function StockManagementPage() {
    // Normally:
    // const products = await prisma.product.findMany();
    // const logs = await prisma.stockLog.findMany({ orderBy: { createdAt: "desc" }, take: 10 });

    const products = productsData;
    const logs = mockLogs;

    const currentTotalStock = products.reduce((acc, p) => acc + p.current_stock, 0);
    const totalInward = logs.filter(l => l.type === "IN").reduce((acc, l) => acc + l.quantity, 0);
    const totalOutward = logs.filter(l => l.type === "OUT").reduce((acc, l) => acc + l.quantity, 0);

    // Opening stock = End Stock - Transactions in the period (simplification for this period dashboard)
    const openingStock = currentTotalStock - totalInward + totalOutward;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-8">

            {/* Header Segment */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <div className="bg-indigo-100 p-2.5 rounded-2xl">
                            <Layers className="w-8 h-8 text-indigo-600" />
                        </div>
                        Stock Ledger & Module
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Manage exact inventory flow with complete atomic data integrity.</p>
                </div>
            </div>

            {/* Real-time Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Opening Stock */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full blur-xl z-0 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative z-10">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Opening Stock</span>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black text-slate-800">{openingStock.toLocaleString()}</span>
                            <span className="text-sm text-slate-400 font-bold">Units</span>
                        </div>
                    </div>
                </div>

                {/* Total Inward */}
                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-100/50 rounded-full blur-xl z-0 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Total Inward</span>
                            <ArrowDownRight className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black text-emerald-900">{totalInward.toLocaleString()}</span>
                            <span className="text-sm text-emerald-600/60 font-bold">Units</span>
                        </div>
                    </div>
                </div>

                {/* Total Outward */}
                <div className="bg-gradient-to-br from-rose-50 to-white rounded-3xl p-6 border border-rose-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-100/50 rounded-full blur-xl z-0 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-rose-600 uppercase tracking-widest">Total Outward</span>
                            <ArrowUpRight className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black text-rose-900">{totalOutward.toLocaleString()}</span>
                            <span className="text-sm text-rose-600/60 font-bold">Units</span>
                        </div>
                    </div>
                </div>

                {/* Closing / Current Stock */}
                <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 rounded-3xl p-6 shadow-xl shadow-indigo-500/30 relative overflow-hidden text-white group">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/20 rounded-full blur-3xl z-0 group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-indigo-100 uppercase tracking-widest">Closing Stock</span>
                            <Activity className="w-5 h-5 text-indigo-200 animate-pulse" />
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black">{currentTotalStock.toLocaleString()}</span>
                            <span className="text-sm text-indigo-200 font-bold">Units</span>
                        </div>
                        <div className="mt-2 text-xs font-semibold text-indigo-200 bg-indigo-900/20 inline-block px-2 py-1 rounded-full">
                            Real-time live count
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Interactive Form Component (Client) */}
                <div className="lg:col-span-1">
                    <StockForm products={products} />
                </div>

                {/* Audit Trail Table */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
                    <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <History className="w-5 h-5 text-slate-400" /> Audit Trail & Logs
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Immutable record of every inventory fluctuation.</p>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-white text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-8 py-5">Timestamp</th>
                                    <th className="px-8 py-5">Type</th>
                                    <th className="px-8 py-5 text-right">Qty</th>
                                    <th className="px-8 py-5">Reason</th>
                                    <th className="px-8 py-5">Operator ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-slate-700">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors duration-200">
                                        <td className="px-8 py-5 font-medium text-slate-600 text-xs">
                                            <span className="text-slate-900">{log.createdAt.toLocaleDateString()}</span>{" "}
                                            {log.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${log.type === "IN" ? "bg-emerald-100/50 text-emerald-600 border border-emerald-200/50" : "bg-rose-100/50 text-rose-600 border border-rose-200/50"
                                                }`}>
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className={`px-8 py-5 font-black text-right text-base ${log.type === "IN" ? "text-emerald-600" : "text-rose-600"}`}>
                                            {log.type === "IN" ? "+" : "-"}{log.quantity}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200/50">
                                                {log.reasonCode}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-mono font-medium text-slate-400">
                                            {log.userId}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                        <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors">
                            View Full Accounting Ledger &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
