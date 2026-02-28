"use client";

import { useState, useEffect, useCallback } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Settings, Users, Building2, FileText, Shield, Bell, Palette, Database, Plus, X, ChevronRight, Edit2, Trash2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [users, setUsers] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "agent",
        username: ""
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [usersRes, projectsRes] = await Promise.all([
                fetch("/realerpcrm/api/team"),
                fetch("/realerpcrm/api/projects")
            ]);
            const usersData = await usersRes.json();
            const projectsData = await projectsRes.json();
            setUsers(Array.isArray(usersData) ? usersData : []);
            setProjects(Array.isArray(projectsData) ? projectsData : []);
        } catch (error) {
            console.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const tabs = [
        { id: "general", label: "General", icon: Settings },
        { id: "team", label: "Team & Users", icon: Users },
        { id: "projects", label: "Projects", icon: Building2 },
        { id: "templates", label: "Templates", icon: FileText },
        { id: "roles", label: "Roles & Permissions", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "backup", label: "Backup & Data", icon: Database },
    ];

    const handleOpenModal = (type: string) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("Settings saved successfully!");
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            <ProjectHeader />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Project Settings</h1>
                    <p className="text-sm text-slate-500">Configure RealERPCRM Apartments project rules, user roles, document templates, and workflows.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-[#007b5e] text-white shadow-md"
                                        : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        {activeTab === "general" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-800">General Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Company Name</label>
                                        <input className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm" defaultValue="RealERPCRM" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Currency</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm">
                                            <option>PKR - Pakistani Rupee</option>
                                            <option>USD - US Dollar</option>
                                            <option>EUR - Euro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Timezone</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm">
                                            <option>Asia/Karachi</option>
                                            <option>America/New_York</option>
                                            <option>Europe/London</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Date Format</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm">
                                            <option>DD/MM/YYYY</option>
                                            <option>MM/DD/YYYY</option>
                                            <option>YYYY-MM-DD</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="px-6 py-3 bg-[#007b5e] text-white rounded-xl text-sm font-bold hover:bg-[#00604a]">
                                    Save Changes
                                </button>
                            </div>
                        )}

                        {activeTab === "team" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-800">Team & Users</h3>
                                    <button onClick={() => handleOpenModal("user")} className="flex items-center gap-2 px-4 py-2 bg-[#007b5e] text-white rounded-xl text-sm font-bold">
                                        <Plus className="w-4 h-4" /> Add User
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50">
                                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">User</th>
                                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Email</th>
                                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Role</th>
                                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {users.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400">No users found</td>
                                                </tr>
                                            ) : (
                                                users.map((user) => (
                                                    <tr key={user.id} className="hover:bg-slate-50">
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-[#007b5e]/10 rounded-full flex items-center justify-center text-[#007b5e] font-bold">
                                                                    {user.username?.charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="font-medium text-slate-800">{user.username}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-slate-600">{user.email}</td>
                                                        <td className="px-4 py-4">
                                                            <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium">{user.role || 'agent'}</span>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-medium">Active</span>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <button className="p-2 text-slate-400 hover:text-[#007b5e]">
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "projects" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-800">Projects</h3>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-[#007b5e] text-white rounded-xl text-sm font-bold">
                                        <Plus className="w-4 h-4" /> Add Project
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className="p-4 border border-slate-200 rounded-xl hover:border-[#007b5e] transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-slate-800">{project.name}</h4>
                                                <span className="px-2 py-1 bg-slate-100 rounded text-xs">{project.type}</span>
                                            </div>
                                            <p className="text-sm text-slate-500">{project.location || 'No location'}</p>
                                        </div>
                                    ))}
                                    {projects.length === 0 && (
                                        <div className="col-span-2 p-8 text-center text-slate-400">No projects found</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "templates" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-800">Document Templates</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {["Booking Form", "Payment Receipt", "Contract Template", "NDA Template"].map((template, i) => (
                                        <div key={i} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between hover:border-[#007b5e] transition-colors">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-slate-400" />
                                                <span className="font-medium text-slate-800">{template}</span>
                                            </div>
                                            <button className="text-[#007b5e] text-sm font-medium">Edit</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "roles" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-800">Roles & Permissions</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: "Super Admin", desc: "Full access to all features", color: "bg-red-100 text-red-600" },
                                        { name: "Admin", desc: "Full access except billing", color: "bg-purple-100 text-purple-600" },
                                        { name: "Manager", desc: "Manage team and projects", color: "bg-blue-100 text-blue-600" },
                                        { name: "Agent", desc: "Limited to leads and sales", color: "bg-green-100 text-green-600" },
                                    ].map((role, i) => (
                                        <div key={i} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                                            <div>
                                                <h4 className="font-bold text-slate-800">{role.name}</h4>
                                                <p className="text-sm text-slate-500">{role.desc}</p>
                                            </div>
                                            <span className={cn("px-3 py-1 rounded-full text-xs font-bold", role.color)}>{role.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-800">Notification Settings</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Email notifications for new leads", enabled: true },
                                        { label: "SMS alerts for overdue payments", enabled: true },
                                        { label: "Daily sales summary", enabled: false },
                                        { label: "Team activity updates", enabled: true },
                                    ].map((notif, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                                            <span className="text-slate-800">{notif.label}</span>
                                            <button className={cn(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                notif.enabled ? "bg-[#007b5e]" : "bg-slate-200"
                                            )}>
                                                <span className={cn(
                                                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                                                    notif.enabled ? "left-7" : "left-1"
                                                )} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "appearance" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-800">Appearance</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Primary Color</label>
                                        <div className="flex items-center gap-4">
                                            <input type="color" defaultValue="#007b5e" className="w-12 h-12 rounded-lg border-0 cursor-pointer" />
                                            <span className="text-slate-600">#007b5e</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Logo</label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                                            <p className="text-slate-400 text-sm">Upload logo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "backup" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-800">Backup & Data</h3>
                                <div className="space-y-4">
                                    <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-800">Export All Data</h4>
                                            <p className="text-sm text-slate-500">Download all your data as CSV</p>
                                        </div>
                                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200">
                                            Export
                                        </button>
                                    </div>
                                    <div className="p-4 border border-red-200 bg-red-50 rounded-xl flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-red-800">Delete All Data</h4>
                                            <p className="text-sm text-red-600">Permanently delete all data</p>
                                        </div>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm cursor-pointer" />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            className="fixed top-0 right-0 z-[130] h-full w-full max-w-lg bg-white shadow-2xl overflow-hidden flex flex-col">
                            <div className="bg-[#007b5e] p-6 text-white">
                                <h2 className="text-xl font-bold">Add New User</h2>
                                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Username</label>
                                    <input required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Username" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Email</label>
                                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Email address" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Role</label>
                                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm">
                                        <option value="agent">Agent</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-4 bg-[#007b5e] text-white rounded-xl font-bold hover:bg-[#00604a] flex items-center justify-center gap-2 mt-4">
                                    Create User <ChevronRight className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
