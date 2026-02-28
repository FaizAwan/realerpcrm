"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Bell, ChevronDown } from "lucide-react";

const TABS = [
    { name: 'Sales', href: '/app/sales' },
    { name: 'Agencies', href: '/app/agencies' },
    { name: 'Recovery', href: '/app/recovery' },
    { name: 'Units', href: '/app/units' },
    { name: 'Bookings', href: '/app/booking' },
    { name: 'Reports', href: '/app/reports' },
    { name: 'Accounts', href: '/app/accounts/chart-of-accounts' },
    { name: 'Settings', href: '/app/settings' }
];

export function ProjectHeader() {
    const pathname = usePathname();

    const isTabActive = (tabName: string, href: string) => {
        if (tabName === 'Accounts') return pathname.startsWith('/app/accounts');
        if (tabName === 'Bookings') return pathname.startsWith('/app/booking');
        if (tabName === 'Settings') return pathname.startsWith('/app/settings');
        if (tabName === 'Reports') return pathname.startsWith('/app/reports');
        if (tabName === 'Units') return pathname.startsWith('/app/units');
        if (tabName === 'Recovery') return pathname.startsWith('/app/recovery');
        if (tabName === 'Agencies') return pathname.startsWith('/app/agencies');
        if (tabName === 'Sales') return pathname.startsWith('/app/sales');
        return pathname === href;
    };

    return (
        <div className="mb-8 rounded-xl shadow-sm border border-slate-200 overflow-hidden bg-white">
            {/* Dark Green Header */}
            <div className="bg-[#007b5e] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-white rounded p-2 flex flex-col items-center justify-center shadow-sm h-12">
                        <span className="text-[#007b5e] font-bold text-lg leading-none tracking-tight">RealERP</span>
                        <span className="text-[8px] text-[#007b5e] font-bold tracking-widest uppercase">CRM</span>
                    </div>
                    <h2 className="text-white text-xl font-semibold tracking-tight">RealERPCRM Master Module</h2>
                </div>

                <div className="flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                        <span className="text-sm font-medium">in, PKR</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                    <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                    <div className="relative cursor-pointer hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <div className="absolute 0 top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#007b5e]" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-slate-200 overflow-hidden relative cursor-pointer shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="User" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                </div>
            </div>

            {/* White Tabs Bar */}
            <div className="px-2">
                <div className="flex overflow-x-auto gap-1 sm:gap-6 custom-scrollbar">
                    {TABS.map((tab) => {
                        const active = isTabActive(tab.name, tab.href);
                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={cn(
                                    "px-4 py-3 text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all border-b-2",
                                    active
                                        ? "border-[#007b5e] text-[#007b5e]"
                                        : "border-transparent text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {tab.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
