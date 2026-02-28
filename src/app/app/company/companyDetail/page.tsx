"use client";

import { useState } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import {
    Building,
    MapPin,
    Globe,
    Phone,
    Users,
    FileText,
    Edit2,
    Save,
    X,
    Building2,
    Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CompanyDetailPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [companyData, setCompanyData] = useState({
        name: "Harmain Builders",
        phone: "+92 300 1234567",
        website: "www.harmainbuilders.com",
        employees: "150",
        ntn: "1234567-8",
        companyType: "Company",
        sector: "Real Estate",
        companyCode: "HB-001",
        street: "Main Boulevard",
        district: "Gulberg III",
        zip: "54000",
        city: "Lahore",
        country: "Pakistan",
        externalRef: "REF-2024-001"
    });

    const [activeTab, setActiveTab] = useState("Information");

    const tabs = [
        { name: "Information", icon: Building },
        { name: "Address", icon: MapPin },
        { name: "Security", icon: Shield },
    ];

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            <ProjectHeader />

            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-slate-800" />
                    <h1 className="text-2xl font-bold text-slate-800">Company Details</h1>
                </div>
                <div className="flex items-center gap-3">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2.5 bg-[#007b5e] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#00604a] flex items-center gap-2 transition-all"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Details
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2.5 bg-[#007b5e] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#00604a] flex items-center gap-2 transition-all"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-72 space-y-2">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
                        <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-emerald-100">
                            <Building2 className="w-10 h-10 text-[#007b5e]" />
                        </div>
                        <h3 className="text-center font-bold text-slate-800 text-lg">{companyData.name}</h3>
                        <p className="text-center text-xs text-slate-500 font-medium uppercase tracking-wider">{companyData.sector}</p>
                    </div>

                    <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                    activeTab === tab.name
                                        ? "bg-emerald-50 text-[#007b5e]"
                                        : "text-slate-500 hover:bg-slate-50"
                                )}
                            >
                                <tab.icon className={cn("w-5 h-5", activeTab === tab.name ? "text-[#007b5e]" : "text-slate-400")} />
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                        <div className="p-8">
                            {activeTab === "Information" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                            <Building className="w-5 h-5 text-[#007b5e]" />
                                            General Information
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                            <DetailItem label="Company Name" value={companyData.name} isEditing={isEditing} icon={Building} />
                                            <DetailItem label="Phone Number" value={companyData.phone} isEditing={isEditing} icon={Phone} />
                                            <DetailItem label="Website" value={companyData.website} isEditing={isEditing} icon={Globe} />
                                            <DetailItem label="Employees" value={companyData.employees} isEditing={isEditing} icon={Users} />
                                            <DetailItem label="NTN Number" value={companyData.ntn} isEditing={isEditing} icon={FileText} />
                                            <DetailItem label="Sector" value={companyData.sector} isEditing={isEditing} icon={Building2} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Address" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-[#007b5e]" />
                                            Location Details
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                            <DetailItem label="Street" value={companyData.street} isEditing={isEditing} />
                                            <DetailItem label="District" value={companyData.district} isEditing={isEditing} />
                                            <DetailItem label="City" value={companyData.city} isEditing={isEditing} />
                                            <DetailItem label="Zip Code" value={companyData.zip} isEditing={isEditing} />
                                            <DetailItem label="Country" value={companyData.country} isEditing={isEditing} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Security" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-[#007b5e]" />
                                            System & Security
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                            <DetailItem label="Company Code" value={companyData.companyCode} isEditing={false} />
                                            <DetailItem label="External Reference" value={companyData.externalRef} isEditing={false} />
                                            <DetailItem label="Last Updated" value="Oct 24, 2023" isEditing={false} />
                                            <DetailItem label="Data Residency" value="Pakistan (Primary)" isEditing={false} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, isEditing, icon: Icon }: { label: string, value: string, isEditing: boolean, icon?: any }) {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                {label}
            </label>
            {isEditing ? (
                <input
                    defaultValue={value}
                    className="w-full px-4 py-2 bg-slate-50 border-b-2 border-emerald-500 rounded-t-lg transition-all focus:outline-none text-sm font-medium text-slate-700"
                />
            ) : (
                <div className="flex items-center gap-2 py-1">
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#007b5e]/60" />}
                    <span className="text-sm font-semibold text-slate-700">{value || "---"}</span>
                </div>
            )}
        </div>
    );
}
