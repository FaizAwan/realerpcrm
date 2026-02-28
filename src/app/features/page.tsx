"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PlotManagementMap = dynamic(() => import("@/app/app/map-view/MapComponent").then(mod => mod.PlotManagementMap), { ssr: false });
import {
    Users,
    LayoutList,
    Building2,
    Home,
    UserCircle,
    ClipboardCheck,
    Target,
    Share2,
    FileText,
    TrendingUp,
    Layers,
    CircleDollarSign,
    Map as MapIcon,
    PieChart,
    ShieldCheck,
    Receipt,
    Wallet,
    Bell,
    Key,
    Plus,
    Minus
} from "lucide-react";

export default function FeaturesPage() {
    const [activeTab, setActiveTab] = useState("all");

    const categories = [
        { id: "all", label: "All", icon: LayoutList },
        { id: "builders", label: "Builders and developers", icon: Building2 },
        { id: "agencies", label: "Agencies", icon: Users },
        { id: "management", label: "Property Managment", icon: Home },
    ];

    const featureGroupsAll = [
        {
            group: "Customer Relationships",
            features: [
                { name: "CRM", desc: "Improve customer service", icon: UserCircle },
                { name: "Tasks", desc: "Real time updates & customizable flow", icon: ClipboardCheck },
                { name: "Leads", desc: "Turn prospect into loyal customer", icon: Target },
                { name: "Social Media", desc: "Connect with your audience", icon: Share2 },
            ],
        },
        {
            group: "Sales & Rental Management",
            features: [
                { name: "Sales", desc: "Make your sales cycle smooth & successful", icon: TrendingUp },
                { name: "Units", desc: "Managing leases, maximized occupancy", icon: Layers },
                { name: "Tokens", desc: "Enhance your property visibility", icon: Key },
                { name: "Rental agreement", desc: "Effortless property and tenant management", icon: FileText },
                { name: "Maps", desc: "Leverage geographic insights", icon: MapIcon },
                { name: "Reports", desc: "Transform your data into actionable insights", icon: PieChart },
            ],
        },
        {
            group: "Accounts And Finance",
            features: [
                { name: "Finance", desc: "Automated & accurate accounts", icon: CircleDollarSign },
                { name: "Approvals", desc: "Ensures timely, secure decisions", icon: ShieldCheck },
                { name: "Reports", desc: "Transform your data into actionable insights", icon: PieChart },
            ],
        },
        {
            group: "Facility Management",
            features: [
                { name: "Tenants", desc: "Effortless property and tenant management.", icon: Users },
                { name: "Rental", desc: "Minimize advertising efforts", icon: Home },
            ],
        },
        {
            group: "Collection & Recovery",
            features: [
                { name: "Collection", desc: "Track payments and comprehensive reports", icon: Wallet },
                { name: "Notices", desc: "Automated, timely reminders", icon: Bell },
            ],
        },
        {
            group: "Purchases & Inventory",
            features: [
                { name: "Store", desc: "Maximum accuracy and efficiency", icon: LayoutList },
                { name: "Suppliers", desc: "Solution to optimize your vendor experience", icon: Users },
                { name: "Orders", desc: "Informed purchases decision", icon: ClipboardCheck },
                { name: "Billing", desc: "Simplify and track bills", icon: Receipt },
            ],
        },
        {
            group: "Customer Portal",
            features: [
                { name: "Portal", desc: "Secure, user-friendly, reliable", icon: LayoutList },
            ],
        },
    ];

    const featureGroupsAgencies = [
        {
            group: "Customer Relationships",
            features: [
                { name: "CRM", desc: "Improve customer service", icon: UserCircle },
                { name: "Leads", desc: "Turn prospect into loyal customer", icon: Target },
                { name: "Social Media", desc: "Connect with your audience", icon: Share2 },
                { name: "Notices", desc: "Automated, timely reminders", icon: Bell },
            ],
        },
        {
            group: "Human Resource",
            features: [
                { name: "HR", desc: "Providing you insights of daily operations", icon: Users },
                { name: "Tasks", desc: "Real time updates & customizable flow", icon: ClipboardCheck },
            ],
        },
    ];

    const featureGroupsBuilders = [
        {
            group: "Customer Relationships",
            features: [
                { name: "CRM", desc: "Improve customer service", icon: UserCircle },
                { name: "Tasks", desc: "Real time updates & customizable flow", icon: ClipboardCheck },
                { name: "Leads", desc: "Turn prospect into loyal customer", icon: Target },
                { name: "Social Media", desc: "Connect with your audience", icon: Share2 },
            ],
        },
        {
            group: "Sales & Offplan",
            features: [
                { name: "Sales", desc: "Make your sales cycle smooth & successful", icon: TrendingUp },
                { name: "Units", desc: "Managing leases, maximized occupancy", icon: Layers },
                { name: "Tokens", desc: "Enhance your property visibility", icon: Key },
                { name: "Bookings", desc: "Effortless property and tenant management.", icon: FileText },
                { name: "Maps", desc: "Leverage geographic insights", icon: MapIcon },
                { name: "Reports", desc: "Transform your data into actionable insights", icon: PieChart },
            ],
        },
        {
            group: "Accounts And Finance",
            features: [
                { name: "Finance", desc: "Automated & accurate accounts", icon: CircleDollarSign },
                { name: "Approvals", desc: "Ensures timely, secure decisions", icon: ShieldCheck },
                { name: "Reports", desc: "Transform your data into actionable insights", icon: PieChart },
            ],
        },
        {
            group: "Collection & Recovery",
            features: [
                { name: "Collection", desc: "Track payments and comprehensive reports", icon: Wallet },
                { name: "Notices", desc: "Automated, timely reminders", icon: Bell },
            ],
        },
        {
            group: "Distributor",
            features: [
                { name: "Dashboard", desc: "Transform your data into actionable insights", icon: PieChart },
                { name: "Tokens", desc: "Enhance your property visibility", icon: Key },
            ],
        },
        {
            group: "Customer Portal",
            features: [
                { name: "Portal", desc: "Secure, user-friendly, reliable", icon: LayoutList },
            ],
        },
    ];

    // Note: The HTML didn't specify "Property Management" tabs distinct from 'All', 
    // but looking at "tags" from user's snippet, "All" and "Property Management" might be the same?
    // User wrote: "and this snapshot must be under Property Management  under Property Managment <div class="react-tabs..." (which lists Customer Relationships, Sales & Rental Management, etc.)
    // It's literally the same content as what they described for "Property Management". 
    // So if "management" is selected we use `featureGroupsAll` logic, because the snippet they posted starting with `under Property Managment` matches the first block exactly.

    const filteredGroups = activeTab === "all" ? featureGroupsAll
        : activeTab === "agencies" ? featureGroupsAgencies
            : activeTab === "management" ? featureGroupsAll
                : featureGroupsBuilders;

    const integrations = [
        { name: "ORACLE", color: "text-[#f80000]" },
        { name: "quickbooks", color: "text-[#2ca01c]" },
        { name: "EXCEL", color: "text-[#1d6f42]" },
        { name: "salesforce", color: "text-[#00a1e0]" },
        { name: "Microsoft Dynamics 365", color: "text-[#002050]" },
    ];

    return (
        <div className="min-h-screen bg-[#fafbfc]">
            <Navbar />

            <section className="py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-semibold text-slate-800 mb-4 ">Explore our features</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium mb-12 ">
                        RealERPCRM helps real estate teams to plan the work, track the progress and get prjects done.
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-16 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 max-w-fit mx-auto transition-all">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm ${activeTab === cat.id
                                    ? "bg-slate-50 text-slate-800 border fill-primary stroke-primary border-slate-200 stroke-[0.5px] shadow-sm"
                                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
                                    }`}
                            >
                                <cat.icon className={`w-4 h-4 ${activeTab === cat.id ? "text-primary" : ""}`} />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Features Grid */}
                    <div className="space-y-16 text-left">
                        {filteredGroups.map((group, idx) => (
                            <div key={idx} className="relative">
                                {/* Vertical bar before the heading */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                                    <h2 className="text-xl m-0 p-0 font-bold text-slate-800 tracking-tight">
                                        {group.group}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {group.features.map((feature, fIdx) => (
                                        <div
                                            key={fIdx}
                                            className="bg-white p-6 rounded-2xl border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group flex items-center gap-5"
                                        >
                                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                                <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div>
                                                <h4 className="text-[17px] font-bold text-slate-900 leading-tight mb-1 transition-colors">{feature.name}</h4>
                                                <p className="text-slate-500 text-xs font-semibold leading-tight mt-0">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tags Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-3">
                        <span className="text-sm font-bold text-slate-400 mr-4">Tags:</span>
                        {(activeTab === "builders" ? [
                            "Sales booking", "Plot booking", "Town planing",
                            "Under construction building", "Industrial site planning", "Properties Management"
                        ] : [
                            "Building management", "Hotel management", "shopping mall management",
                            "Co-working office management", "Cooperative societies", "Town house management"
                        ]).map((tag) => (
                            <span key={tag} className="px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl font-semibold text-slate-800 mb-4 ">Integrations</h2>
                    <p className="text-slate-500 mb-16  font-medium">RealERPCRM supports integrations with all mainstream solutions, including</p>

                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
                        {integrations.map((brand) => (
                            <span key={brand.name} className={`text-2xl font-semibold tracking-normal ${brand.color}`}>
                                {brand.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map View */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl font-semibold text-slate-800 mb-4 ">Map View</h2>
                    <p className="text-slate-500 mb-12  font-medium">Now change the way you manage your modern Societies with <span className="text-primary font-bold">RealERPCRM</span></p>

                    <div className="max-w-6xl mx-auto rounded-xl shadow-md overflow-hidden relative">
                        <PlotManagementMap hideHeader={true} />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
