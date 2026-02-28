"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Map, Search, Filter, ZoomIn, ZoomOut, Maximize,
    Home, Users, Clock, AlertCircle, Calendar, CreditCard,
    Phone, Mail, X, Plus, Save, Trash2, Edit3, Move, MousePointer2, Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface Unit {
    id: number;
    unitNumber: string;
    projectId: number;
    status: string;
    price: number | null;
    x: number;
    y: number;
    width: number;
    height: number;
    shapeType: string;
    ownerName: string | null;
    ownerPhone: string | null;
    isRented: boolean;
    rentAmount: number | null;
}

interface Project {
    id: number;
    name: string;
    mapImage: string | null;
}

export function PlotManagementMap({ hideHeader = false }: { hideHeader?: boolean }) {
    // --- State Management ---
    const [projects, setProjects] = useState<Project[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [scale, setScale] = useState(0.8);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [isDraggingMap, setIsDraggingMap] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddingMode, setIsAddingMode] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const mapRef = useRef<HTMLDivElement>(null);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                if (!res.ok) {
                    console.error("Failed to fetch projects:", res.status);
                    setProjects([]);
                    return;
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                    if (data.length > 0) setSelectedProjectId(data[0].id);
                } else {
                    setProjects([]);
                }
            } catch (error) {
                console.error("Fetch projects error:", error);
                setProjects([]);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (!selectedProjectId) return;
        const fetchUnits = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/units?projectId=${selectedProjectId}`);
                if (!res.ok) {
                    setUnits([]);
                    return;
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Filter by projectId just in case the generic API returns all for tenant
                    setUnits(data.filter((u: any) => u.projectId === selectedProjectId));
                } else {
                    setUnits([]);
                }
            } catch (error) {
                console.error("Fetch units error:", error);
                setUnits([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUnits();
    }, [selectedProjectId]);

    // --- Handlers ---
    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.2));
    const handleResetZoom = () => { setScale(0.8); setPosition({ x: 50, y: 50 }); };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isAddingMode) return;
        setIsDraggingMap(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingMap) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDraggingMap(false);

    const handleMapClick = async (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isAddingMode || !selectedProjectId) return;

        // Calculate SVG coordinates
        const svg = e.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const cursorPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());

        const newUnitData = {
            unitNumber: `B-${units.length + 1}`,
            projectId: selectedProjectId,
            x: cursorPt.x - 30, // Center the new block
            y: cursorPt.y - 50,
            width: 60,
            height: 100,
            shapeType: 'rect',
            status: 'available'
        };

        try {
            const res = await fetch('/api/units', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUnitData)
            });
            const data = await res.json();
            setUnits([...units, data]);
            toast.success("Block created successfully");
            setIsAddingMode(false);
        } catch (error) {
            toast.error("Failed to create block");
        }
    };

    const handleUpdateUnit = async (id: number, updates: Partial<Unit>) => {
        try {
            const res = await fetch(`/api/units/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            setUnits(units.map(u => u.id === id ? data : u));
            if (selectedUnit?.id === id) setSelectedUnit(data);
            toast.success("Block updated");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDeleteUnit = async (id: number) => {
        if (!confirm("Are you sure you want to delete this block?")) return;
        try {
            await fetch(`/api/units/${id}`, { method: 'DELETE' });
            setUnits(units.filter(u => u.id !== id));
            setSelectedUnit(null);
            toast.success("Block deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const filteredUnits = units.filter(u => {
        const matchesSearch = u.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (u.ownerName && u.ownerName.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = statusFilter === 'all' || u.status === statusFilter || (statusFilter === 'rented' && u.isRented);
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (unit: Unit) => {
        if (unit.isRented) return 'fill-blue-500 stroke-blue-600';
        switch (unit.status) {
            case 'available': return 'fill-white stroke-slate-300';
            case 'booked': return 'fill-amber-400 stroke-amber-500';
            case 'sold': return 'fill-emerald-500 stroke-emerald-600';
            case 'reserved': return 'fill-purple-500 stroke-purple-600';
            default: return 'fill-slate-100 stroke-slate-300';
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col pt-0 font-sans">
            {/* --- Global Action Bar --- */}
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl">
                        <Map className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Society Map Hub</h1>
                        <div className="flex items-center gap-2">
                            <select
                                value={selectedProjectId || ''}
                                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                                className="text-sm font-bold text-slate-500 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-primary transition-colors p-0"
                            >
                                {Array.isArray(projects) && projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Find Block or Owner..."
                            className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 w-48 lg:w-64 font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="h-6 w-px bg-slate-100 mx-2" />

                    <button
                        onClick={() => { setIsAddingMode(!isAddingMode); setIsEditMode(false); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isAddingMode ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                        <Plus className="w-4 h-4" /> Add Block
                    </button>
                    <button
                        onClick={() => { setIsEditMode(!isEditMode); setIsAddingMode(false); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isEditMode ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                        <Settings className="w-4 h-4" /> Layout Mode
                    </button>

                    <div className="h-6 w-px bg-slate-100 mx-2" />

                    <select
                        className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 border-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Units</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="rented">Rented</option>
                    </select>
                </div>
            </div>

            {/* --- Main Interactive Area --- */}
            <div className="flex-1 bg-slate-100 rounded-[2.5rem] border border-slate-200 overflow-hidden relative shadow-inner flex">

                {/* Navigation Tools */}
                <div className="absolute left-6 top-6 z-10 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-2 flex flex-col gap-2">
                        <button onClick={handleZoomIn} className="p-3 hover:bg-slate-100 rounded-xl text-slate-600 transition-all hover:scale-110 active:scale-90" title="Zoom In">
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button onClick={handleZoomOut} className="p-3 hover:bg-slate-100 rounded-xl text-slate-600 transition-all hover:scale-110 active:scale-90" title="Zoom Out">
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <div className="h-px bg-slate-100 mx-2" />
                        <button onClick={handleResetZoom} className="p-3 hover:bg-slate-100 rounded-xl text-slate-600 transition-all hover:scale-110 active:scale-90" title="Center Map">
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>

                    {isAddingMode && (
                        <div className="bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-xl animate-bounce text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <MousePointer2 className="w-4 h-4" /> Click on Map to Place Block
                        </div>
                    )}
                </div>

                {/* Status Legend */}
                <div className="absolute right-6 top-6 z-10 bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl shadow-xl p-6 hidden md:flex flex-col gap-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Portfolio Legend</h3>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <div className="w-5 h-5 rounded-lg border-2 border-slate-200 bg-white" /> Available
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <div className="w-5 h-5 rounded-lg border-2 border-emerald-600 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" /> Sold Asset
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <div className="w-5 h-5 rounded-lg border-2 border-blue-600 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" /> Rented
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <div className="w-5 h-5 rounded-lg border-2 border-amber-500 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]" /> Booked
                    </div>
                </div>

                {/* INTERACTIVE SVG SURFACE */}
                <div
                    ref={mapRef}
                    className={`w-full h-full relative touch-none bg-slate-50 [background-image:radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:40px_40px]
                                ${isDraggingMap ? 'cursor-grabbing' : isAddingMode ? 'cursor-crosshair' : 'cursor-grab'}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="absolute origin-center transition-transform duration-75 ease-out"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        }}
                    >
                        <svg
                            className="w-[3000px] h-[2000px] drop-shadow-2xl overflow-visible"
                            viewBox="0 0 3000 2000"
                            onClick={handleMapClick}
                        >
                            {/* Society Layout Background */}
                            <rect width="3000" height="2000" fill="transparent" />
                            <path d="M 100 200 L 2800 100 L 2900 1800 L 200 1900 Z" className="fill-slate-100/50 stroke-slate-200 stroke-[4]" />

                            {/* Render All Dynamic Blocks */}
                            {filteredUnits.map((unit) => {
                                const isSelected = selectedUnit?.id === unit.id;

                                return (
                                    <g
                                        key={unit.id}
                                        transform={`translate(${unit.x}, ${unit.y})`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedUnit(unit);
                                        }}
                                        className="cursor-pointer group"
                                    >
                                        {unit.shapeType === 'circle' ? (
                                            <motion.circle
                                                cx={unit.width / 2}
                                                cy={unit.height / 2}
                                                r={Math.min(unit.width, unit.height) / 2}
                                                className={`${getStatusColor(unit)} transition-all duration-300 ${isSelected ? 'stroke-[6] stroke-primary' : 'stroke-2 hover:stroke-primary/50'}`}
                                            />
                                        ) : unit.shapeType === 'house' ? (
                                            <motion.path
                                                d={`M ${unit.width / 2} 0 L ${unit.width} ${unit.height / 3} L ${unit.width} ${unit.height} L 0 ${unit.height} L 0 ${unit.height / 3} Z`}
                                                className={`${getStatusColor(unit)} transition-all duration-300 ${isSelected ? 'stroke-[6] stroke-primary' : 'stroke-2 hover:stroke-primary/50'}`}
                                            />
                                        ) : (
                                            <motion.rect
                                                width={unit.width}
                                                height={unit.height}
                                                rx="8"
                                                className={`${getStatusColor(unit)} transition-all duration-300 ${isSelected ? 'stroke-[6] stroke-primary' : 'stroke-2 hover:stroke-primary/50'}`}
                                            />
                                        )}
                                        <text
                                            x={unit.width / 2}
                                            y={unit.height / 2 + 5}
                                            textAnchor="middle"
                                            className={`text-[12px] font-black pointer-events-none select-none ${unit.status === 'available' ? 'fill-slate-400' : 'fill-white'}`}
                                            transform={`rotate(-90, ${unit.width / 2}, ${unit.height / 2})`}
                                        >
                                            {unit.unitNumber}
                                        </text>

                                        {/* Action Indicators for Edit Mode */}
                                        {isEditMode && isSelected && (
                                            <g transform={`translate(${unit.width + 10}, 0)`}>
                                                <rect width="20" height="20" rx="4" fill="#6366f1" className="cursor-move" />
                                                <Move className="w-3 h-3 text-white" x="4" y="4" />
                                            </g>
                                        )}
                                    </g>
                                );
                            })}

                            <text x="500" y="300" className="text-6xl font-black fill-slate-200 uppercase tracking-[0.5em] pointer-events-none">{projects.find(p => p.id === selectedProjectId)?.name}</text>
                        </svg>
                    </div>
                </div>

                {/* --- UNIT INTELLIGENCE PANEL --- */}
                <AnimatePresence>
                    {selectedUnit && (
                        <motion.div
                            initial={{ opacity: 0, x: 40, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 40, scale: 0.9 }}
                            className="absolute right-8 top-8 bottom-8 w-[420px] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden flex flex-col z-50"
                        >
                            {/* Panel Header */}
                            <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-primary">
                                            <Home className="w-5 h-5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Property Intelligence</span>
                                        </div>
                                        <h2 className="text-4xl font-black tracking-tight">{selectedUnit.unitNumber}</h2>
                                        <p className="text-slate-400 font-medium text-sm mt-1">{selectedUnit.shapeType === 'rect' ? 'Standard Block' : 'Custom Plot'}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedUnit(null)}
                                        className="p-3 bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 rounded-2xl transition-all"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                {/* Shape & Status Protocol */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Protocols</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 ml-1">SHAPE ARCHITECTURE</label>
                                            <select
                                                value={selectedUnit.shapeType}
                                                onChange={(e) => handleUpdateUnit(selectedUnit.id, { shapeType: e.target.value })}
                                                className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black uppercase tracking-widest text-slate-600 outline-none"
                                            >
                                                <option value="rect">■ Rectangle</option>
                                                <option value="circle">● Circle</option>
                                                <option value="house">⌂ House</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 ml-1">MARKET STATUS</label>
                                            <select
                                                value={selectedUnit.status}
                                                onChange={(e) => handleUpdateUnit(selectedUnit.id, { status: e.target.value })}
                                                className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black uppercase tracking-widest text-slate-600 outline-none"
                                            >
                                                <option value="available">Available</option>
                                                <option value="booked">Booked</option>
                                                <option value="sold">Sold</option>
                                                <option value="reserved">Reserved</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (!selectedUnit.ownerName) return toast.error("Assign an owner first");
                                            try {
                                                const res = await fetch('/api/invoices', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
                                                        customerName: selectedUnit.ownerName,
                                                        amount: selectedUnit.price || 0,
                                                        items: [{ description: `Purchase of ${selectedUnit.unitNumber}`, quantity: 1, price: selectedUnit.price || 0, total: selectedUnit.price || 0 }]
                                                    })
                                                });
                                                if (res.ok) {
                                                    await handleUpdateUnit(selectedUnit.id, { status: 'sold' });
                                                    toast.success("Sale processed & ledger updated!");
                                                }
                                            } catch (e) { toast.error("Sale failed"); }
                                        }}
                                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <CreditCard className="w-4 h-4" /> Finalize Legal Sale
                                    </button>
                                </div>

                                {/* Ownership Details */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Custodian</h3>
                                    <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 space-y-5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 ml-1">OWNER NAME</label>
                                            <input
                                                defaultValue={selectedUnit.ownerName || ''}
                                                onBlur={(e) => handleUpdateUnit(selectedUnit.id, { ownerName: e.target.value })}
                                                placeholder="Unassigned"
                                                className="w-full bg-white px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 ml-1">MONTHLY RENT (PKR)</label>
                                            <input
                                                type="number"
                                                defaultValue={selectedUnit.rentAmount || ''}
                                                onBlur={(e) => handleUpdateUnit(selectedUnit.id, { rentAmount: parseFloat(e.target.value) })}
                                                placeholder="0.00"
                                                className="w-full bg-white px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Layout (If in Layout Mode) */}
                                {isEditMode && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dimension Protocol</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400">Width</label>
                                                <input type="number" value={selectedUnit.width} onChange={(e) => handleUpdateUnit(selectedUnit.id, { width: parseFloat(e.target.value) })} className="w-full bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400">Height</label>
                                                <input type="number" value={selectedUnit.height} onChange={(e) => handleUpdateUnit(selectedUnit.id, { height: parseFloat(e.target.value) })} className="w-full bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400">X Position</label>
                                                <input type="number" value={selectedUnit.x} onChange={(e) => handleUpdateUnit(selectedUnit.id, { x: parseFloat(e.target.value) })} className="w-full bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400">Y Position</label>
                                                <input type="number" value={selectedUnit.y} onChange={(e) => handleUpdateUnit(selectedUnit.id, { y: parseFloat(e.target.value) })} className="w-full bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Panel Footer */}
                            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
                                <button
                                    onClick={() => handleDeleteUnit(selectedUnit.id)}
                                    className="flex-1 py-4 bg-white text-rose-600 border border-rose-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete Block
                                </button>
                                <button
                                    className="flex-1 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Save Intel
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
