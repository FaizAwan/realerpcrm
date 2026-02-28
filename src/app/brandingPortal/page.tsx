"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    LayoutList,
    FileText,
    PieChart,
    Settings,
    HeadphonesIcon,
    Shield,
    Users,
    Wallet,
    Bell,
    Globe,
    UserCircle,
    Building2
} from "lucide-react";

export default function BrandingPortalPage() {
    return (
        <div className="min-h-screen bg-[#fafbfc]">
            <Navbar />

            {/* Hero Section */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-semibold text-slate-800 mb-4 ">Empower Clients, Enhance Engagement</h1>
                    <h2 className="text-4xl font-semibold text-slate-800 mb-6">Customer Satisfaction, Upgraded!</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium mb-10 leading-relaxed text-lg">
                        Enhance client satisfaction and engagement by providing transparency and convenience — through a secure, user-friendly portal.
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-20">
                        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-primary/25">
                            Get Demo
                        </button>
                        <button className="bg-white hover:bg-slate-50 text-primary border border-primary/20 px-8 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-sm">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-primary border-b-[5px] border-b-transparent"></div>
                            How It Works
                        </button>
                    </div>

                    {/* Screenshot / Mockup Placeholder */}
                    <div className="max-w-5xl mx-auto relative mt-10">
                        {/* Decorative floating elements could go here */}
                        <div className="relative z-10 bg-white rounded-t-3xl shadow-2xl border border-slate-200 overflow-hidden mx-4 pb-0">
                            {/* Browser/App header mock */}
                            <div className="bg-[#f8f9fa] border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                </div>
                                <div className="bg-white border text-center border-slate-200 rounded-full px-4 py-1.5 text-sm text-slate-400 w-1/2 flex items-center justify-center gap-2">
                                    <Globe className="w-3 h-3" />
                                    realerpcrm.com/app/brandingPortal/
                                </div>
                                <div className="w-20"></div> {/* Spacer for balance */}
                            </div>

                            {/* App Content Mockup replacing the image */}
                            <div className="p-0">
                                <div className="bg-white px-8 py-4 flex justify-between items-center border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary font-bold text-xl leading-none">RealERP</span>
                                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none mt-1">CRM</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                            {/* User avatar mock */}
                                            <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500">
                                                <UserCircle className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary px-8 py-16 text-center">
                                    <h3 className="text-white text-3xl font-bold mb-2">Welcome! Sumaiya Asif</h3>
                                    <p className="text-white/80 text-sm">Welcome to RealERPCRM</p>
                                </div>

                                <div className="px-8 -mt-8 relative z-20">
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 border-[3px] border-white shadow-sm overflow-hidden flex items-center justify-center">
                                                <UserCircle className="w-10 h-10 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> RealERPCRM</span>
                                                    <span>•</span>
                                                    <span>R-21</span>
                                                    <span>•</span>
                                                    <span>Booked on: 01/03/2022</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-slate-400 text-sm font-medium">OPR-00261</span>
                                            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">View profile</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 mt-6 pb-12 text-left">
                                    <div className="flex gap-4 border-b border-slate-200 mb-6 overflow-x-auto pb-2">
                                        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold whitespace-nowrap">Overview</button>
                                        <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap">Installments</button>
                                        <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap">Ledger</button>
                                        <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap">Notices</button>
                                        <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap">Distribution plan</button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="bg-sky-500 rounded-xl p-6 text-white h-32 flex flex-col justify-between">
                                            <Wallet className="w-8 h-8 opacity-50" />
                                            <div>
                                                <div className="text-sm font-medium opacity-80 mb-1">Total Amount</div>
                                                <div className="text-2xl font-bold">40,000,000</div>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-500 rounded-xl p-6 text-white h-32 flex flex-col justify-between">
                                            <Shield className="w-8 h-8 opacity-50" />
                                            <div>
                                                <div className="text-sm font-medium opacity-80 mb-1">Paid Amount</div>
                                                <div className="text-2xl font-bold">8,000,000</div>
                                            </div>
                                        </div>
                                        <div className="bg-purple-500 rounded-xl p-6 text-white h-32 flex flex-col justify-between">
                                            <PieChart className="w-8 h-8 opacity-50" />
                                            <div>
                                                <div className="text-sm font-medium opacity-80 mb-1">Balance</div>
                                                <div className="text-2xl font-bold">32,000,000</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Description section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Branding portal module</h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        RealERPCRM&apos;s client portal module provides your clients with secure, round-the-clock access to essential information and services. Enhance transparency, improve communication, and build stronger relationships by offering a user-friendly portal that meets all your clients&apos; needs.
                    </p>
                </div>
            </section>

            {/* Features Sub-section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <PieChart className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Dashboards</h3>
                                <p className="text-slate-500">Get a high-level overview of everything related to your account and properties in one place.</p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
                            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <FileText className="w-7 h-7 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Updated site report</h3>
                                <p className="text-slate-500">Access the latest site reports, construction updates, and media directly from the portal.</p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
                            <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                <HeadphonesIcon className="w-7 h-7 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Feedback by customers</h3>
                                <p className="text-slate-500">Submit queries, tickets, and feedback directly to our support team for quick resolution.</p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
                            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                                <Wallet className="w-7 h-7 text-purple-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Installments detail</h3>
                                <p className="text-slate-500">Review your payment schedule, paid installments, and upcoming dues flawlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
