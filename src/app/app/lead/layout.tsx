"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users2,
    CheckSquare,
    Calendar,
    UserPlus,
    Share2,
    BarChart3,
    QrCode
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/app/lead", icon: LayoutDashboard },
    { name: "Team dashboard", href: "/app/lead/team", icon: Users2 },
    { name: "Tasks", href: "/app/lead/tasks", icon: CheckSquare },
    { name: "Calendar", href: "/app/lead/calendar", icon: Calendar },
    { name: "Assignment", href: "/app/lead/assignment", icon: UserPlus },
    { name: "Integrations", href: "/app/lead/integrations", icon: Share2 },
    { name: "Report", href: "/app/lead/report", icon: BarChart3 },
    { name: "QR config", href: "/app/lead/qr-config", icon: QrCode },
];

export default function LeadLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="space-y-6">
            <div className="bg-white border-b border-slate-200 -mx-8 -mt-8 px-8 pt-4 pb-0 sticky top-0 z-10">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-1 pb-4 text-sm font-semibold transition-all relative whitespace-nowrap",
                                    isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="leadNav"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="mt-6">
                {children}
            </div>
        </div>
    );
}
