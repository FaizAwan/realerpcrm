"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Banknote,
    CheckSquare,
    FolderKanban,
    Cpu,
    LogOut,
    Building2,
    Warehouse,
    BarChart3,
    Truck,
    ShoppingCart,
    Receipt,
    Wallet,
    ChevronDown,
    ChevronRight,
    FileText,
    List,
    FileSpreadsheet,
    FileBox,
    Calculator,
    ScrollText,
    CircleDollarSign,
    Settings,
    Map
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { name: "Dashboard", href: "/app", icon: LayoutDashboard },
    {
        name: "Company",
        icon: Building2,
        subItems: [
            { name: "New company", href: "/app/company/newCompany", icon: FileText },
            { name: "All companies", href: "/app/company/companies", icon: List },
            { name: "Agencies", href: "/app/agencies", icon: Users },
            { name: "Company", href: "/app/company/companyDetail", icon: Building2 },
        ]
    },
    { name: "Contact", href: "/app/contact", icon: Users },
    { name: "Leads", href: "/app/lead", icon: Users },
    { name: "Administration", href: "/app/administration", icon: Settings },
    { name: "User guide", href: "/app/user-guide", icon: BookOpen },
    { name: "Get started", href: "/app/get-started", icon: LayoutDashboard },
    { name: "Bookings", href: "/app/booking", icon: BookOpen },
    { name: "Finance", href: "/app/finance", icon: Banknote },
    {
        name: "Accounts",
        icon: Wallet,
        subItems: [
            { name: "Chart of Accounts", href: "/app/accounts/chart-of-accounts", icon: List },
            { name: "Customer Ledgers", href: "/app/accounts/ledgers/customers", icon: Users },
            { name: "Supplier Ledgers", href: "/app/accounts/ledgers/suppliers", icon: Truck },
            { name: "Invoices", href: "/app/accounts/invoices", icon: FileText },
            { name: "Bills", href: "/app/accounts/bills", icon: Receipt },
            { name: "Journals", href: "/app/accounts/journals", icon: BookOpen },
            { name: "Balance Sheet", href: "/app/accounts/reports/balance-sheet", icon: FileSpreadsheet },
            { name: "Cash Flow", href: "/app/accounts/reports/cash-flow", icon: CircleDollarSign },
            { name: "Trial Balance", href: "/app/accounts/reports/trial-balance", icon: Calculator },
            { name: "Income Statement", href: "/app/accounts/reports/income-statement", icon: ScrollText },
        ]
    },
    { name: "Tasks", href: "/app/tasks", icon: CheckSquare },
    { name: "Projects", href: "/app/projects", icon: FolderKanban },
    { name: "Map View", href: "/app/map-view", icon: Map },
    { name: "Store", href: "/app/store", icon: Warehouse },
    { name: "Suppliers/Vendors", href: "/app/suppliers", icon: Truck },
    { name: "Purchase", href: "/app/purchase", icon: ShoppingCart },
    { name: "Billing", href: "/app/billing", icon: Receipt },
    { name: "Reports", href: "/app/reports", icon: BarChart3 },
    { name: "Copilot", href: "/app/copilot", icon: Cpu },
];

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [expandedMenu, setExpandedMenu] = useState<string | null>(() => {
        // Init state based on current path
        if (pathname.startsWith('/app/accounts')) return 'Accounts';
        return null;
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center gap-6 bg-slate-50">
                <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-normal animate-pulse">Synchronizing Cryptographic Identity...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const toggleMenu = (name: string) => {
        setExpandedMenu(expandedMenu === name ? null : name);
    };

    return (
        <div className="flex h-screen bg-[#F8F9FC] font-sans overflow-hidden">
            {/* Ultra-Premium Sidebar */}
            <aside className="w-64 bg-secondary flex flex-col border-r border-secondary-dark/50 relative z-30 transition-all duration-300">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 ring-1 ring-white/10 mr-3">
                        <Building2 className="text-white w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-white tracking-tight leading-none">RealERP</span>
                        <span className="text-[9px] font-bold text-primary-light uppercase tracking-widest mt-0.5 opacity-80">Institutional</span>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="px-3 mb-3">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Main Menu</p>
                    </div>
                    {sidebarItems.map((item) => {
                        const hasSubmenu = !!item.subItems;
                        const isExpanded = expandedMenu === item.name;

                        // Check if main item or any child is active
                        const isActive = item.href && pathname === item.href;
                        const isChildActive = hasSubmenu && item.subItems?.some(sub => pathname === sub.href);
                        const isHighlighted = isActive || isChildActive;

                        return (
                            <div key={item.name} className="flex flex-col">
                                {hasSubmenu ? (
                                    <button
                                        onClick={() => toggleMenu(item.name)}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 relative group overflow-hidden w-full text-left",
                                            isHighlighted || isExpanded
                                                ? "bg-primary/10 text-primary-light"
                                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        )}
                                    >
                                        {(isHighlighted || isExpanded) && !hasSubmenu && (
                                            <motion.div layoutId="activeNav" className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                                        )}
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn("w-4 h-4 transition-transform duration-200", isHighlighted ? "" : "group-hover:scale-110")} />
                                            <span className="font-semibold text-[13px] tracking-wide">{item.name}</span>
                                        </div>
                                        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300 opacity-60", isExpanded ? "rotate-180" : "rotate-0")} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group overflow-hidden",
                                            isActive
                                                ? "bg-primary/10 text-primary-light"
                                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div layoutId="activeNav" className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                                        )}
                                        <item.icon className={cn("w-4 h-4 transition-transform duration-200", isActive ? "" : "group-hover:scale-110")} />
                                        <span className="font-semibold text-[13px] tracking-wide">{item.name}</span>
                                    </Link>
                                )}

                                {/* Submenu */}
                                <AnimatePresence>
                                    {hasSubmenu && isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-9 pr-3 py-2 space-y-1">
                                                {item.subItems!.map((sub) => {
                                                    const isSubActive = pathname === sub.href;
                                                    return (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href}
                                                            className={cn(
                                                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                                                                isSubActive
                                                                    ? "text-primary-light bg-primary/5"
                                                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "w-1.5 h-1.5 rounded-full transition-colors",
                                                                isSubActive ? "bg-primary" : "bg-transparent border border-slate-600"
                                                            )} />
                                                            <span className="font-medium text-xs tracking-wide">{sub.name}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </nav>

                {/* User Drop Area */}
                <div className="p-4 border-t border-white/5 shrink-0">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-white/5 text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 group border border-white/5"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold text-xs tracking-wide">End Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Hub */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Sleek Top Navigation using Glassmorphism */}
                <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                {(pathname.split('/').pop() || 'Dashboard').toUpperCase().replace(/-/g, ' ')} <span className="text-slate-300 mx-1">/</span> COMMAND
                            </h2>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide leading-none">System Optimal</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-[13px] font-bold text-slate-800 leading-none mb-1">{session?.user?.name || 'Authorized Personnel'}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Security ID: ST-0923</span>
                        </div>

                        {/* Professional Dropdown Menu */}
                        <div className="relative group">
                            <button className="w-10 h-10 bg-gradient-to-tr from-primary to-emerald-400 rounded-full border-2 border-white shadow-md flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all overflow-hidden">
                                <span className="text-white font-bold text-sm">
                                    {(session?.user?.name || session?.user?.email || 'U')[0].toUpperCase()}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                {/* User Info Header */}
                                <div className="p-4 bg-gradient-to-r from-primary/5 to-emerald-50 border-b border-slate-100">
                                    <p className="font-bold text-slate-800 text-sm">{session?.user?.name || 'User'}</p>
                                    <p className="text-xs text-slate-500">{session?.user?.email}</p>
                                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-full">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                        <span className="text-[10px] font-semibold text-emerald-700 uppercase">Active</span>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <Link href="/app/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                                        <Settings className="w-4 h-4" />
                                        <span className="font-medium">Settings</span>
                                    </Link>
                                    <Link href="/app/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                                        <Users className="w-4 h-4" />
                                        <span className="font-medium">Profile</span>
                                    </Link>
                                    <Link href="/app/team" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                                        <Users className="w-4 h-4" />
                                        <span className="font-medium">Team Management</span>
                                    </Link>
                                    <hr className="my-2 border-slate-100" />
                                    <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        <span className="font-medium">Sign Out</span>
                                    </button>
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-400 text-center">RealERPcrm v1.0.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#F8F9FC] relative custom-scrollbar">
                    {/* Background subtle mesh/gradient for ultra-premium feel */}
                    <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-slate-100/50 to-transparent pointer-events-none -z-10" />

                    <div className="p-8 pb-20 md:p-10 max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
