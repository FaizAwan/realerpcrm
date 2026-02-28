"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Map, Search, Filter, ZoomIn, ZoomOut, Maximize,
    Home, Users, Clock, AlertCircle, Calendar, CreditCard,
    Phone, Mail, X
} from 'lucide-react';

// Mock Data for the Society Plots
const MOCK_PLOTS = [
    { id: '101', type: 'Residential', status: 'available', size: '120 Sq Yd', owner: null },
    {
        id: '102', type: 'Residential', status: 'sold', size: '120 Sq Yd',
        owner: { name: 'Ali Asghar', phone: '03332877345', plan: 'Gold - 2 Bed', ref: 'SUN-970581', lastPayment: '17/09/2022', daysPending: 9 }
    },
    {
        id: '103', type: 'Commercial', status: 'overdue', size: '200 Sq Yd',
        owner: { name: 'Sumera Amjad', phone: '03337008343', plan: 'Gold - 3 Bed', ref: 'SUN12376', lastPayment: '16/09/2022', daysPending: 10 }
    },
    { id: '104', type: 'Residential', status: 'available', size: '120 Sq Yd', owner: null },
    {
        id: '105', type: 'Residential', status: 'sold', size: '120 Sq Yd',
        owner: { name: 'Saqib Arain', phone: '03337008343', plan: 'Ground floor - Shops', ref: 'SUN569346', lastPayment: '28/08/2022', daysPending: 29 }
    },
    {
        id: '106', type: 'Commercial', status: 'critical', size: '200 Sq Yd',
        owner: { name: 'Ali Memon', phone: '03337008343', plan: 'Ground floor - Shops', ref: 'SUN234878', lastPayment: '25/08/2022', daysPending: 32 }
    },
    {
        id: '107', type: 'Residential', status: 'sold', size: '120 Sq Yd',
        owner: { name: 'Kamran Khan', phone: '03001234567', plan: 'Silver - 2 Bed', ref: 'SUN-445123', lastPayment: '01/10/2022', daysPending: 5 }
    },
    { id: '108', type: 'Commercial', status: 'available', size: '400 Sq Yd', owner: null },
];

// Generate a grid of plots dynamically
const generatePlots = () => {
    const plots = [];
    const rows = 6;
    const cols = 15;

    // Road logic
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Leave gaps for roads
            if (c === 5 || c === 10 || r === 2) continue;

            const plotId = `${r + 1}0${c + 1}`;
            const mockData = MOCK_PLOTS.find(p => p.id === plotId) || {
                id: plotId,
                type: Math.random() > 0.8 ? 'Commercial' : 'Residential',
                status: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'sold' : (Math.random() > 0.5 ? 'overdue' : 'critical')) : 'available',
                size: '120 Sq Yd',
                owner: Math.random() > 0.6 ? {
                    name: `Owner ${plotId}`,
                    phone: `0300-${Math.floor(1000000 + Math.random() * 9000000)}`,
                    plan: 'Standard - 2 Bed',
                    ref: `SUN-${plotId}88`,
                    lastPayment: '01/01/2023',
                    daysPending: Math.floor(Math.random() * 40)
                } : null
            };
            plots.push({ ...mockData, r, c });
        }
    }
    return plots;
};

const ALL_PLOTS = generatePlots();

export function PlotManagementMap({ hideHeader = false }: { hideHeader?: boolean }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [selectedPlot, setSelectedPlot] = useState<any | null>(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const mapRef = useRef<HTMLDivElement>(null);

    // Zoom Handlers
    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const handleResetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    // Filter Logic
    const filteredPlots = ALL_PLOTS.filter(plot => {
        if (filter !== 'all' && plot.status !== filter) return false;
        if (searchTerm && !plot.id.includes(searchTerm) && (!plot.owner || !plot.owner.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
            return false;
        }
        return true;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'fill-white stroke-slate-300';
            case 'sold': return 'fill-emerald-500 stroke-emerald-600';
            case 'overdue': return 'fill-amber-500 stroke-amber-600';
            case 'critical': return 'fill-rose-500 stroke-rose-600';
            default: return 'fill-slate-100 stroke-slate-300';
        }
    };

    return (
        <div className={hideHeader ? "h-[750px] flex flex-col pt-0" : "h-[calc(100vh-8rem)] flex flex-col pt-0"}>
            {/* Header Area */}
            {!hideHeader && (
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                            <Map className="w-8 h-8 text-primary" />
                            Interactive Map View
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Complete Plot Management System for Sunrise Society
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search plots or owners..."
                                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold / Clear</option>
                            <option value="overdue">Payment Overdue</option>
                            <option value="critical">Critical Arrears</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Map Container */}
            <div className="flex-1 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative shadow-inner flex">

                {/* Tools Overlay */}
                <div className="absolute left-4 top-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg p-2 flex flex-col gap-2">
                    <button onClick={handleZoomIn} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Zoom In">
                        <ZoomIn className="w-5 h-5" />
                    </button>
                    <button onClick={handleZoomOut} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Zoom Out">
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <div className="h-px bg-slate-200 my-1" />
                    <button onClick={handleResetZoom} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Reset View">
                        <Maximize className="w-5 h-5" />
                    </button>
                </div>

                {/* Legend Overlay */}
                <div className="absolute right-4 top-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg p-4 flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status Legend</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded border border-slate-300 bg-white" /> Available
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded border border-emerald-600 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" /> Sold / Clear
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded border border-amber-600 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" /> Payment Overdue
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded border border-rose-600 bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.3)]" /> Critical / Defaulter
                    </div>
                </div>

                {/* The Interactive Map Surface */}
                <div
                    ref={mapRef}
                    className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden relative touch-none bg-slate-50 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="absolute w-[2000px] h-[1200px] origin-center transition-transform duration-75 ease-out"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        }}
                    >
                        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 2000 1200">
                            {/* Base Society Grounds / Layout Blocks */}
                            <path d="M 200 150 L 1800 150 L 1900 1050 L 100 1050 Z" className="fill-slate-50 opacity-90 stroke-slate-200 stroke-2" />

                            {/* Block A Label */}
                            <text x="300" y="220" className="text-4xl font-bold fill-slate-300 uppercase tracking-widest font-sans">Sunrise Society Block A</text>

                            {/* Render Plots */}
                            <g className="plots-group" transform="rotate(-5, 1000, 600) translate(250, 300)">
                                {filteredPlots.map((plot) => {
                                    const plotWidth = 60;
                                    const plotHeight = 100;
                                    const gap = 8;

                                    // Custom positioning logic based on r, c coordinates to mimic the screenshot's angled rows
                                    const xOffset = plot.c * (plotWidth + gap) + (plot.r * 20);
                                    const yOffset = plot.r * (plotHeight + gap * 4);

                                    const isSelected = selectedPlot?.id === plot.id;
                                    const isAvailable = plot.status === 'available';

                                    return (
                                        <g
                                            key={plot.id}
                                            transform={`translate(${xOffset}, ${yOffset})`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPlot(plot);
                                            }}
                                            className="cursor-pointer transition-all duration-300"
                                        >
                                            <rect
                                                width={plotWidth}
                                                height={plotHeight}
                                                rx="4"
                                                className={`${getStatusColor(plot.status)} hover:brightness-110 transition-all ${isSelected ? 'stroke-4 stroke-primary shadow-2xl drop-shadow-[0_0_15px_rgba(0,150,136,0.6)]' : ''}`}
                                                strokeWidth={isSelected ? "4" : "1.5"}
                                            />
                                            {/* Plot Number */}
                                            <text
                                                x={plotWidth / 2}
                                                y={plotHeight / 2 + 5}
                                                textAnchor="middle"
                                                className={`text-[16px] font-bold pointer-events-none ${isAvailable ? 'fill-slate-400' : 'fill-white'}`}
                                                transform={`rotate(-90, ${plotWidth / 2}, ${plotHeight / 2})`}
                                            >
                                                {plot.id}
                                            </text>
                                        </g>
                                    );
                                })}
                            </g>

                            {/* Landmarks / Mosque / Parks */}
                            <g transform="translate(450, 700)">
                                <rect width="300" height="200" rx="10" className="fill-emerald-50/80 stroke-emerald-200 stroke-2" />
                                <text x="150" y="110" textAnchor="middle" className="text-xl font-bold fill-emerald-600/50 uppercase tracking-widest">Central Park</text>
                            </g>
                            <g transform="translate(1300, 300)">
                                <rect width="250" height="250" rx="125" className="fill-blue-50/80 stroke-blue-200 stroke-2" />
                                <text x="125" y="130" textAnchor="middle" className="text-xl font-bold fill-blue-600/50 uppercase tracking-widest">Grand Mosque</text>
                            </g>

                        </svg>
                    </div>
                </div >

                {/* Animated Plot Detail Panel (Floating over map) */}
                <AnimatePresence>
                    {
                        selectedPlot && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="absolute right-6 top-6 bottom-6 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col z-20"
                            >
                                <div className="bg-slate-900 text-white p-5 flex justify-between items-start relative overflow-hidden">
                                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Home className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Plot Details</span>
                                        </div>
                                        <h2 className="text-3xl font-bold font-sans tracking-tight">Plot #{selectedPlot.id}</h2>
                                        <p className="text-slate-400 text-sm">{selectedPlot.type} • {selectedPlot.size}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPlot(null)}
                                        className="p-1.5 bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 rounded-lg transition-colors relative z-10"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                                    {selectedPlot.status === 'available' ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                                                <AlertCircle className="w-10 h-10 text-slate-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-700">Plot Available</h3>
                                                <p className="text-sm text-slate-500 max-w-xs mt-2">This plot is currently available for booking. Assign a lead or process a direct booking.</p>
                                            </div>
                                            <button className="mt-4 px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all w-full uppercase tracking-wide">
                                                Initiate Booking
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                            {/* Owner Info Card */}
                                            <div className="relative">
                                                {/* Days Badge strictly matching the image design */}
                                                <div className={`absolute -top-4 -right-2 px-4 py-1.5 rounded-l-full rounded-tr-none font-bold text-white text-sm shadow-lg ${selectedPlot.status === 'sold' ? 'bg-emerald-500' :
                                                    selectedPlot.status === 'overdue' ? 'bg-amber-500' : 'bg-rose-500'
                                                    }`}>
                                                    {selectedPlot.owner.daysPending} Days
                                                </div>

                                                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md shrink-0">
                                                        {/* Avatar placeholder resembling image */}
                                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-800 leading-tight">{selectedPlot.owner.name}</h3>
                                                        <p className="text-sm text-slate-500 mt-0.5">{selectedPlot.owner.plan}</p>
                                                        <div className="text-xs font-semibold text-primary mt-1 px-2 py-0.5 bg-primary/10 rounded inline-block">
                                                            {selectedPlot.owner.ref}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Detailed Specs list */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <Phone className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Mobile</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-800">{selectedPlot.owner.phone}</span>
                                                </div>

                                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <CreditCard className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Last Payment</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                                        {selectedPlot.owner.lastPayment}
                                                        {selectedPlot.status !== 'sold' && (
                                                            <AlertCircle className={`w-4 h-4 ${selectedPlot.status === 'overdue' ? 'text-amber-500' : 'text-rose-500'}`} />
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <Calendar className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Payment Status</span>
                                                    </div>
                                                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${selectedPlot.status === 'sold' ? 'bg-emerald-100 text-emerald-700' :
                                                        selectedPlot.status === 'overdue' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-rose-100 text-rose-700'
                                                        }`}>
                                                        {selectedPlot.status === 'sold' ? 'Clear' : selectedPlot.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="grid grid-cols-2 gap-3 pt-4">
                                                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition-colors border border-slate-200 shadow-sm uppercase">
                                                    <CreditCard className="w-4 h-4" /> View Ledger
                                                </button>
                                                <button className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs transition-colors shadow-sm uppercase ${selectedPlot.status === 'overdue' || selectedPlot.status === 'critical'
                                                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                                                    : 'bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20'
                                                    }`}>
                                                    <Mail className="w-4 h-4" />
                                                    {selectedPlot.status === 'sold' ? 'Send Update' : 'Send Reminder'}
                                                </button>
                                            </div>
                                        </div >
                                    )
                                    }
                                </div >
                            </motion.div >
                        )
                    }
                </AnimatePresence >
            </div >
        </div >
    );
}
