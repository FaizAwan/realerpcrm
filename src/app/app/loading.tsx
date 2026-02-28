"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="space-y-8 pb-12 font-sans">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-10 w-36 bg-slate-200 rounded-lg animate-pulse" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse" />
                            <div className="w-12 h-4 bg-slate-200 rounded animate-pulse" />
                        </div>
                        <div className="h-8 w-20 bg-slate-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                    </div>
                ))}
            </div>

            {/* Chart and Activity Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-4" />
                    <div className="h-[300px] flex items-end justify-between gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <div key={i} className="flex-1 bg-slate-200 rounded-t animate-pulse" style={{ height: `${Math.random() * 80 + 20}%` }} />
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-4" />
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                                <div className="flex-1">
                                    <div className="h-4 w-full bg-slate-200 rounded animate-pulse mb-1" />
                                    <div className="h-3 w-2/3 bg-slate-200 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
