"use client";

import { useState } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Copy, Save, X, Building, MapPin, Link as LinkIcon } from "lucide-react";

export default function NewCompanyPage() {
    const [formData, setFormData] = useState({
        name: "", phone: "", website: "", employees: "",
        ntn: "", companyType: "", sector: "", companyCode: "", logo: null,
        street: "", district: "", zip: "", city: "", postal: "", country: "",
        externalRef: ""
    });

    const [activeTab, setActiveTab] = useState("Company Information");

    const tabs = [
        { name: "Company Information", icon: Building },
        { name: "Company address", icon: MapPin },
        { name: "Reference code", icon: LinkIcon },
    ];

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            <ProjectHeader />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
                    <span className="text-[#007b5e] border-b-2 border-[#007b5e] pb-1">New company</span>
                    <span>All companies</span>
                    <span>Agencies</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-700">
                        Select key
                    </button>
                    <button className="px-4 py-2 bg-white border border-[#007b5e] text-[#007b5e] flex items-center gap-2 rounded-lg text-sm font-semibold hover:bg-green-50">
                        <X className="w-4 h-4" /> Cancel
                    </button>
                    <button className="px-4 py-2 bg-[#007b5e] text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#00604a]">
                        <Save className="w-4 h-4" /> Save
                    </button>
                </div>
            </div>

            <div className="flex gap-8 bg-white p-6 rounded-xl border border-slate-200">
                {/* Tabs */}
                <div className="w-64 border-r border-slate-100 flex flex-col space-y-2 pr-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.name
                                    ? "bg-green-50 text-[#007b5e]"
                                    : "text-slate-500 hover:bg-slate-50"
                                }`}
                        >
                            <tab.icon className={`w-5 h-5 ${activeTab === tab.name ? "text-[#007b5e]" : "text-slate-400"}`} />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 drop-shadow-sm">Company Information</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Company name *</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Phone</label>
                                <div className="flex text-sm">
                                    <span className="flex items-center px-3 bg-slate-100 border-b-2 border-slate-200 rounded-tl-lg">PK +92</span>
                                    <input className="flex-1 px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-tr-lg transition-colors focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Website</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2"># of employees</label>
                                <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">NTN</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Company type *</label>
                                <select className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none appearance-none">
                                    <option value=""></option>
                                    <option value="Company">Company</option>
                                    <option value="Individual">Individual</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Sector</label>
                                <select className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none appearance-none">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Company code</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Logo</label>
                                <button className="px-4 py-2 bg-[#007b5e] text-white text-sm font-semibold rounded hover:bg-[#00604a]">
                                    Choose file
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 drop-shadow-sm">Company address</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Company address</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Street</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">District</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Zip code</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Postal code</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">City</label>
                                <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Country</label>
                                <select className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none appearance-none">
                                    <option value=""></option>
                                    <option value="Pakistan">Pakistan</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 drop-shadow-sm">External reference</h2>
                        <div>
                            <label className="text-xs font-bold uppercase text-slate-400 block mb-2">External reference</label>
                            <input className="w-full px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 focus:border-[#007b5e] rounded-t-lg transition-colors focus:outline-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
