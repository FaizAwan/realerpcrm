"use client";

import { useState, useEffect } from "react";
import {
    Users,
    TrendingUp,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    Plus,
    BarChart3,
    Activity,
    Building2,
    Home,
    DollarSign,
    FileText,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState({
        leads: 0,
        bookings: 0,
        tasks: 0,
        finance: 0,
        projects: 0,
        units: 0
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [recentBookings, setRecentBookings] = useState<any[]>([]);
    const [recentTasks, setRecentTasks] = useState<any[]>([]);
    const [monthlyData, setMonthlyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    leadsRes, 
                    bookingsRes, 
                    tasksRes, 
                    financeRes,
                    projectsRes,
                    unitsRes
                ] = await Promise.all([
                    fetch("/api/leads"),
                    fetch("/api/bookings"),
                    fetch("/api/tasks"),
                    fetch("/api/finance"),
                    fetch("/api/projects"),
                    fetch("/api/units")
                ]);

                const leads = await leadsRes.json();
                const bookings = await bookingsRes.json();
                const tasks = await tasksRes.json();
                const finance = await financeRes.json();
                const projects = await projectsRes.json();
                const units = await unitsRes.json();

                const totalIncome = Array.isArray(finance)
                    ? finance.reduce((acc: number, curr: any) => curr.type === 'income' ? acc + Number(curr.amount) : acc, 0)
                    : 0;

                setStats({
                    leads: Array.isArray(leads) ? leads.length : 0,
                    bookings: Array.isArray(bookings) ? bookings.length : 0,
                    tasks: Array.isArray(tasks) ? tasks.filter((t: any) => t.status === 'done').length : 0,
                    finance: totalIncome,
                    projects: Array.isArray(projects) ? projects.length : 0,
                    units: Array.isArray(units) ? units.length : 0
                });

                // Recent leads
                const sortedLeads = Array.isArray(leads) ? [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5) : [];
                setRecentLeads(sortedLeads);

                // Recent bookings
                const sortedBookings = Array.isArray(bookings) ? [...bookings].sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()).slice(0, 5) : [];
                setRecentBookings(sortedBookings);

                // Recent tasks
                const sortedTasks = Array.isArray(tasks) ? [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5) : [];
                setRecentTasks(sortedTasks);

                // Monthly bookings data
                const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                if (Array.isArray(bookings)) {
                    bookings.forEach((booking: any) => {
                        const month = new Date(booking.bookingDate).getMonth();
                        months[month]++;
                    });
                }
                setMonthlyData(months);

            } catch (error) {
                console.error("Dashboard sync error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Calculate max for chart
    const maxValue = Math.max(...monthlyData, 1);

    // Get activities from recent data
    const activities: { type: string; user: string; action: string; target: string; time: string; icon: any; color: string }[] = [];

    recentLeads.forEach((lead: any) => {
        const timeDiff = Date.now() - new Date(lead.createdAt).getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        activities.push({
            type: 'lead',
            user: lead.name || 'Unknown',
            action: 'New lead added',
            target: lead.source || 'Direct',
            time: hours < 1 ? 'Just now' : hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`,
            icon: Users,
            color: 'bg-blue-100 text-blue-600'
        });
    });

    recentBookings.forEach((booking: any) => {
        const timeDiff = Date.now() - new Date(booking.bookingDate).getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        activities.push({
            type: 'booking',
            user: booking.customerName || 'Unknown',
            action: 'Booking confirmed',
            target: booking.unit?.unitNumber || 'Unit',
            time: hours < 1 ? 'Just now' : hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`,
            icon: Home,
            color: 'bg-emerald-100 text-emerald-600'
        });
    });

    recentTasks.forEach((task: any) => {
        activities.push({
            type: 'task',
            user: task.assigned ? 'Team' : 'System',
            action: task.status === 'done' ? 'Task completed' : 'Task assigned',
            target: task.title || 'Task',
            time: 'Recently',
            icon: CheckCircle2,
            color: 'bg-amber-100 text-amber-600'
        });
    });

    // Sort by time and take top 6
    activities.sort((a, b) => a.time.localeCompare(b.time));
    const finalActivities = activities.slice(0, 6);

    return (
        <div className="space-y-8 pb-12 font-sans">
            {/* Sleek Page Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Activity className="w-4 h-4 text-primary" />
                        </div>
                        Command Center
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Real-time Institutional Oversight & <span className="text-primary font-bold">Asset Logistics</span>.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push("/app/projects?action=new")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold tracking-wide shadow-sm hover:bg-primary-dark transition-all focus:ring-2 focus:ring-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Global Project
                    </button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Leads", value: stats.leads, color: "text-blue-500", icon: Users, bg: "bg-blue-50" },
                    { label: "Projects", value: stats.projects, color: "text-indigo-500", icon: Building2, bg: "bg-indigo-50" },
                    { label: "Bookings", value: stats.bookings, color: "text-emerald-500", icon: Home, bg: "bg-emerald-50" },
                    { label: "Liquid Capital", value: `Rs ${stats.finance.toLocaleString()}`, color: "text-primary", icon: DollarSign, bg: "bg-primary/10", isString: true },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                <ArrowUpRight className="w-3 h-3" />
                                Live
                            </div>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold text-slate-800 mb-1">
                                {isLoading ? "..." : stat.isString ? stat.value : stat.value.toString()}
                            </h4>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Second Row Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Units", value: stats.units, icon: Home },
                    { label: "Completed Tasks", value: stats.tasks, icon: CheckCircle2 },
                    { label: "Revenue", value: `Rs ${(stats.finance / 1000000).toFixed(1)}M`, icon: TrendingUp },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i + 4) * 0.1 }}
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800">
                                    {isLoading ? "..." : stat.value}
                                </h4>
                                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h5 className="text-lg font-bold text-slate-800">Booking Performance</h5>
                            <p className="text-slate-500 text-sm">Monthly Booking Trends</p>
                        </div>
                        <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                            Filter
                        </button>
                    </div>

                    <div className="h-[300px] flex items-end justify-between gap-4 mt-auto">
                        {monthlyData.map((val, i) => {
                            const height = maxValue > 0 ? (val / maxValue) * 100 : 0;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                                    <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden flex-1 flex items-end min-h-[20px]">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            className="w-full bg-gradient-to-t from-primary to-primary/60 group-hover:from-primary-dark group-hover:to-primary transition-colors rounded-t-md"
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                    </span>
                                    <span className="text-xs font-bold text-primary">{val}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-primary" />
                        <h5 className="text-lg font-bold text-slate-800">Recent Activity</h5>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto max-h-[350px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                            </div>
                        ) : finalActivities.length === 0 ? (
                            <div className="text-center py-8 text-slate-400">
                                <p className="text-sm">No recent activity</p>
                            </div>
                        ) : (
                            finalActivities.map((activity, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold", activity.color)}>
                                        <activity.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-700 truncate">
                                            <span className="font-semibold">{activity.user}</span>
                                            <span className="text-slate-500 mx-1">{activity.action}</span>
                                        </p>
                                        <p className="text-xs text-primary font-medium truncate">{activity.target}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <button 
                        onClick={() => router.push('/app/lead')}
                        className="w-full mt-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                        View All Activity
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 opacity-80" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">Live</span>
                    </div>
                    <h3 className="text-3xl font-bold">{stats.leads}</h3>
                    <p className="text-blue-100 text-sm">Active Leads</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Home className="w-8 h-8 opacity-80" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">Live</span>
                    </div>
                    <h3 className="text-3xl font-bold">{stats.bookings}</h3>
                    <p className="text-emerald-100 text-sm">Total Bookings</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Building2 className="w-8 h-8 opacity-80" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">Live</span>
                    </div>
                    <h3 className="text-3xl font-bold">{stats.projects}</h3>
                    <p className="text-purple-100 text-sm">Active Projects</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign className="w-8 h-8 opacity-80" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">Live</span>
                    </div>
                    <h3 className="text-3xl font-bold">Rs {(stats.finance / 100000).toFixed(1)}L</h3>
                    <p className="text-amber-100 text-sm">Total Revenue</p>
                </div>
            </div>
        </div>
    );
}
