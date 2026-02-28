"use client";

import { useState, useEffect, useRef } from "react";
import { 
    Grid2X2, 
    Building2, 
    MapPin, 
    DollarSign, 
    ShieldCheck, 
    ArrowLeft, 
    CheckCircle2, 
    Calendar,
    Phone,
    User,
    Calculator,
    Map as MapIcon,
    Home,
    Layers,
    ArrowRight,
    LucideIcon,
    Printer,
    FileText,
    TrendingUp,
    Users,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Unit {
    id: number;
    unitNumber: string;
    type: string | null;
    status: string;
    price: string | null;
    ownerName: string | null;
    ownerPhone: string | null;
    saleDate: string | null;
    saleAgency: string | null;
    isRented: boolean;
    tenantName: string | null;
    tenantPhone: string | null;
    rentAmount: string | null;
    rentDate: string | null;
    rentAgency: string | null;
    project: {
        name: string;
        type: string;
        location: string | null;
        description: string | null;
    };
}

export default function PropertyDetailsPage() {
    const params = useParams();
    const [unit, setUnit] = useState<Unit | null>(null);
    const [loading, setLoading] = useState(true);
    const [installmentMonths, setInstallmentMonths] = useState(24);
    
    // Admin States
    const [rentPayments, setRentPayments] = useState<any[]>([]);
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [isRentModalOpen, setIsRentModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const [saleForm, setSaleForm] = useState({ ownerName: "", ownerPhone: "", saleAgency: "", saleDate: new Date().toISOString().split('T')[0] });
    const [rentForm, setRentForm] = useState({ tenantName: "", tenantPhone: "", rentAmount: "", rentAgency: "", rentDate: new Date().toISOString().split('T')[0] });
    const [paymentForm, setPaymentForm] = useState({ amount: "", month: "" });
    const [bookingForm, setBookingForm] = useState({ 
        customerName: "", 
        customerPhone: "", 
        amountPaid: "", 
        bookingDate: new Date().toISOString().split('T')[0],
        isFullPayment: false,
        agency: ""
    });

    // View States
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [heroView, setHeroView] = useState<'photo' | 'layout'>('photo');

    const handlePrintCertificate = () => {
        const printContent = document.getElementById("certificate-print-area");
        const originalContent = document.body.innerHTML;
        
        if (printContent) {
            document.body.innerHTML = printContent.innerHTML;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload(); // Reload to restore React bindings
        }
    };

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const res = await fetch(`/realerpcrm/api/units/${params.id}`);
                const data = await res.json();
                if (res.ok) setUnit(data);
            } catch (error) {
                console.error("Failed to fetch unit details", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPayments = async () => {
            try {
                const res = await fetch(`/realerpcrm/api/rent-payments?unitId=${params.id}`);
                const data = await res.json();
                if (res.ok) setRentPayments(data);
            } catch (error) {
                console.error("Failed to fetch payments", error);
            }
        };

        if (params.id) {
            fetchUnit();
            fetchPayments();
        }
    }, [params.id]);

    const fetchUnitExt = async () => {
        try {
            const res = await fetch(`/realerpcrm/api/units/${params.id}`);
            if (res.ok) setUnit(await res.json());
        } catch (error) {}
    };

    const fetchPaymentsExt = async () => {
        try {
            const res = await fetch(`/realerpcrm/api/rent-payments?unitId=${params.id}`);
            if (res.ok) setRentPayments(await res.json());
        } catch (error) {}
    };

    const handleSell = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/realerpcrm/api/units/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...saleForm, status: "sold" })
            });
            if (res.ok) {
                fetchUnitExt();
                setIsSellModalOpen(false);
            }
        } catch (error) {
            alert("Transaction failed");
        }
    };

    const handleRent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/realerpcrm/api/units/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...rentForm, isRented: true })
            });
            if (res.ok) {
                fetchUnitExt();
                setIsRentModalOpen(false);
            }
        } catch (error) {
            alert("Transaction failed");
        }
    };

    const handleAddPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/realerpcrm/api/rent-payments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...paymentForm, unitId: params.id })
            });
            if (res.ok) {
                fetchPaymentsExt();
                setIsPaymentModalOpen(false);
                setPaymentForm({ amount: "", month: "" });
            }
        } catch (error) {
            alert("Payment recording failed");
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/realerpcrm/api/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...bookingForm, unitId: params.id })
            });
            if (res.ok) {
                fetchUnitExt();
                setIsBookingModalOpen(false);
                setBookingForm({ customerName: "", customerPhone: "", amountPaid: "", bookingDate: new Date().toISOString().split('T')[0], isFullPayment: false, agency: "" });
            }
        } catch (error) {
            alert("Booking failed");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#00a99d]/20 border-t-[#00a99d] rounded-full animate-spin" />
                    <p className="text-[#1a2b3c] font-bold uppercase text-[10px] tracking-widest animate-pulse italic">Synchronizing Asset Archive...</p>
                </div>
            </div>
        );
    }

    if (!unit) {
        return (
            <div className="min-h-screen bg-[#fafbfc] p-8">
                <Link href="/app/units" className="flex items-center gap-2 text-[#00a99d] font-bold mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Inventory
                </Link>
                <div className="bg-white p-12 rounded-[32px] border border-slate-100 shadow-sm text-center">
                    <h2 className="text-2xl font-bold text-[#1a2b3c]">Asset Not Found</h2>
                    <p className="text-slate-500 mt-2 italic font-medium">The requested property identifier does not exist in our registry.</p>
                </div>
            </div>
        );
    }

    const monthlyInstallment = unit.price ? parseFloat(unit.price) / installmentMonths : 0;

    return (
        <div className="min-h-screen bg-[#fafbfc] pb-20 space-y-12 animate-in fade-in duration-700">
            {/* Nav & Hero */}
            <div className="space-y-6">
                <Link 
                    href="/app/units" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#00a99d] transition-all"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Matrix
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Hero Section: Image Gallery */}
                    <div className="lg:col-span-2 relative h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-slate-900">
                        <AnimatePresence mode="wait">
                            {heroView === 'photo' ? (
                                <motion.img 
                                    key="photo"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                                    alt="Property Hero" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <motion.div 
                                    key="layout"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="w-full h-full flex flex-col items-center justify-center bg-[#1a2b3c] p-20 text-center"
                                >
                                    <Layers className="w-20 h-20 text-[#00a99d] mb-6 opacity-20" />
                                    <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Architectural Blueprint</h3>
                                    <p className="text-[#00a99d] font-bold text-[10px] uppercase tracking-[0.3em]">Technical Layout Layers Synchronized</p>
                                    <div className="mt-12 w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-[#00a99d]" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b3c]/80 to-transparent pointer-events-none" />
                        
                        <div className="absolute bottom-10 left-10 text-white z-10">
                            <span className="px-4 py-1.5 bg-[#00a99d] rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                                {unit.project.type}
                            </span>
                            <h1 className="text-5xl font-black tracking-tighter mb-2">{unit.project.name} - {unit.unitNumber}</h1>
                            <p className="flex items-center gap-2 text-white/80 italic font-medium">
                                <MapPin className="w-4 h-4 text-[#00a99d]" /> {unit.project.location || "Islamabad, Pakistan"}
                            </p>
                        </div>

                        {/* Thumbnail Gallery Overlay */}
                        <div className="absolute bottom-10 right-10 flex gap-2 z-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-16 h-16 rounded-2xl border-2 border-white/20 overflow-hidden cursor-pointer hover:border-[#00a99d] transition-all">
                                    <img 
                                        src={`https://images.unsplash.com/photo-${1582407947304 + i}-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} 
                                        alt={`Thumbnail ${i}`} 
                                        className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="absolute top-8 right-8 flex gap-3 z-10">
                            <button 
                                onClick={() => setHeroView(heroView === 'photo' ? 'layout' : 'photo')}
                                className={cn(
                                    "p-3 backdrop-blur-md rounded-2xl transition-all border",
                                    heroView === 'layout' ? "bg-[#00a99d] border-[#00a99d] text-white" : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                                )}
                                title={heroView === 'photo' ? "Switch to Layout View" : "Switch to Photo View"}
                            >
                                <Layers className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => setIsGalleryOpen(true)}
                                className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                                title="Open Full Gallery"
                            >
                                <Grid2X2 className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Specs Card */}
                    <div className="bg-[#1a2b3c] p-8 rounded-[32px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
                        
                        <div className="space-y-8 relative z-10">
                            <div>
                                <p className="text-[#00a99d] font-black uppercase text-[10px] tracking-widest mb-1 italic">Asset Valuation</p>
                                <h3 className="text-4xl font-black tracking-tighter">
                                    {unit.price ? `${parseFloat(unit.price).toLocaleString()} PKR` : "TBD"}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Unit Ref</p>
                                    <p className="font-bold flex items-center gap-2"><Home className="w-4 h-4 text-[#00a99d]" /> {unit.unitNumber}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Status</p>
                                    <p className="font-bold flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#00a99d]" /> 
                                        <span className="capitalize">{unit.status}</span>
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Size/Type</p>
                                    <p className="font-bold flex items-center gap-2"><Layers className="w-4 h-4 text-[#00a99d]" /> 5 Marla / Std</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Ownership</p>
                                    <p className="font-bold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#00a99d]" /> Verified</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsBookingModalOpen(true)}
                            disabled={unit.status !== 'available'}
                            className={cn(
                                "w-full mt-12 py-4 rounded-full font-black uppercase text-[12px] tracking-widest shadow-lg transition-all flex items-center justify-center gap-3 relative z-10 group",
                                unit.status === 'available' 
                                    ? "bg-[#00a99d] text-white shadow-[#00a99d]/30 hover:shadow-[#00a99d]/50 hover:-translate-y-1" 
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                            )}
                        >
                            {unit.status === 'available' ? 'Book This Unit' : `Unit ${unit.status.toUpperCase()}`} 
                            {unit.status === 'available' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Details & Features */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Features Grid */}
                    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-black text-[#1a2b3c] mb-8 tracking-tight">Premium Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { icon: Building2, label: "Structural Integrity" },
                                { icon: MapPin, label: "Prime Location" },
                                { icon: DollarSign, label: "ROI Potential" },
                                { icon: ShieldCheck, label: "Gated Security" },
                                { icon: Home, label: "Modern Layout" },
                                { icon: Layers, label: "Lush Greenery" },
                                { icon: Calculator, label: "Easy Installments" },
                                { icon: CheckCircle2, label: "Possession Ready" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 group text-center">
                                    <div className="w-16 h-16 rounded-[24px] bg-[#fafbfc] border border-slate-100 flex items-center justify-center group-hover:bg-[#00a99d]/10 group-hover:border-[#00a99d]/20 transition-all">
                                        <item.icon className="w-6 h-6 text-[#1a2b3c] group-hover:text-[#00a99d] transition-colors" />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-black text-[#1a2b3c] mb-6 tracking-tight">Architectural Narrative</h2>
                        <p className="text-slate-600 leading-relaxed italic font-medium">
                            {unit.project.description || "This exceptional property represents the pinnacle of urban living. Crafted with meticulous attention to detail, the unit offers a seamless blend of luxury and functionality. Situated in a prime location within the project, it provides unparalleled access to community amenities and central transport routes."}
                        </p>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm h-[400px] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                             <div className="text-center">
                                <MapIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Geospatial Intelligence Matrix Loading...</p>
                             </div>
                        </div>
                        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-200 shadow-lg z-10">
                             <h4 className="text-[12px] font-black text-[#1a2b3c] uppercase tracking-widest">Asset Coordinates</h4>
                             <p className="text-[10px] text-slate-500 font-bold italic">Latitude 33.6844, Longitude 73.0479</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Calculator & Contact */}
                <div className="space-y-8">
                    {/* Installment Calculator */}
                    <div className="bg-white p-8 rounded-[32px] border-2 border-slate-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a99d]/5 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#00a99d]/10 rounded-xl flex items-center justify-center">
                                <Calculator className="w-5 h-5 text-[#00a99d]" />
                            </div>
                            <h3 className="text-xl font-black text-[#1a2b3c] tracking-tight uppercase">Payment Plan</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Duration (Months)</label>
                                <input 
                                    type="range" 
                                    min="12" 
                                    max="60" 
                                    step="12" 
                                    value={installmentMonths}
                                    onChange={(e) => setInstallmentMonths(parseInt(e.target.value))}
                                    className="w-full accent-[#00a99d] h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                                    <span>12M</span>
                                    <span className="text-[#00a99d]">{installmentMonths} Months</span>
                                    <span>60M</span>
                                </div>
                            </div>

                            <div className="p-6 bg-[#fafbfc] rounded-2xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Monthly</p>
                                <p className="text-2xl font-black text-[#1a2b3c]">
                                    {monthlyInstallment.toLocaleString()} <span className="text-xs text-slate-400">PKR</span>
                                </p>
                            </div>

                            <p className="text-[10px] text-slate-400 font-bold italic">
                                * Standard 20% down payment applicable. Terms subject to institutional verification.
                            </p>
                        </div>
                    </div>

                    {/* Agent Card */}
                    <div className="bg-[#1a2b3c] p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
                         <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00a99d]/10 rounded-full translate-y-24 translate-x-24 blur-3xl group-hover:bg-[#00a99d]/20 transition-all" />
                         
                         <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden border border-white/20">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" alt="Agent" />
                            </div>
                            <div>
                                <h4 className="font-black tracking-tight">Executive Portfolio Manager</h4>
                                <p className="text-[10px] text-[#00a99d] font-bold uppercase tracking-widest italic">Institutional Sales Division</p>
                            </div>
                         </div>

                         <div className="space-y-4 relative z-10">
                            <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3">
                                <Phone className="w-4 h-4" /> Initiate Consultation
                            </button>
                            <button className="w-full py-4 bg-white text-[#1a2b3c] rounded-full font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3">
                                <Calendar className="w-4 h-4" /> Schedule Site Visit
                            </button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Administrative Protocol Section */}
            <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm mt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-[#1a2b3c] tracking-tight">Administrative Protocol</h2>
                    <button onClick={() => handlePrintCertificate()} className="px-6 py-3 bg-[#00a99d]/10 text-[#00a99d] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#00a99d] hover:text-white transition-all flex items-center gap-2">
                        <Printer className="w-4 h-4" /> Print Dossier
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {unit.status !== 'sold' && (
                        <button onClick={() => setIsSellModalOpen(true)} className="p-8 rounded-[24px] bg-[#fafbfc] border border-slate-100 hover:border-[#00a99d]/30 hover:bg-white transition-all text-left group">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-indigo-500" />
                            </div>
                            <h3 className="font-black text-lg text-[#1a2b3c] mb-1">Execute Sale</h3>
                            <p className="text-xs font-bold text-slate-400">Transfer ownership rights</p>
                        </button>
                    )}

                    {unit.status === 'sold' && !unit.isRented && (
                        <button onClick={() => setIsRentModalOpen(true)} className="p-8 rounded-[24px] bg-[#fafbfc] border border-slate-100 hover:border-[#00a99d]/30 hover:bg-white transition-all text-left group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="font-black text-lg text-[#1a2b3c] mb-1">Lease Property</h3>
                            <p className="text-xs font-bold text-slate-400">Initiate rental agreement</p>
                        </button>
                    )}

                    {unit.isRented && (
                        <button onClick={() => setIsPaymentModalOpen(true)} className="p-8 rounded-[24px] bg-[#fafbfc] border border-slate-100 hover:border-[#00a99d]/30 hover:bg-white transition-all text-left group">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <DollarSign className="w-6 h-6 text-amber-500" />
                            </div>
                            <h3 className="font-black text-lg text-[#1a2b3c] mb-1">Record Rent</h3>
                            <p className="text-xs font-bold text-slate-400">Log monthly lease payment</p>
                        </button>
                    )}
                </div>

                {unit.isRented && rentPayments.length > 0 && (
                    <div className="mt-8 border-t border-slate-100 pt-8">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Payment Ledger</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-widest">
                                        <th className="py-4">Month/Cycle</th>
                                        <th className="py-4">Amount</th>
                                        <th className="py-4">Date</th>
                                        <th className="py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="font-bold">
                                    {rentPayments.map((p) => (
                                        <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                            <td className="py-4">{p.month}</td>
                                            <td className="py-4">{parseFloat(p.amount).toLocaleString()} PKR</td>
                                            <td className="py-4">{new Date(p.paymentDate).toLocaleDateString()}</td>
                                            <td className="py-4"><span className="text-emerald-500 text-[10px] bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest">{p.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden Printable Certificate */}
            <div className="hidden">
                <div id="certificate-print-area" className="p-16 font-sans text-slate-800" style={{ width: '800px', margin: '0 auto' }}>
                    <div className="text-center mb-12 border-b-2 border-slate-800 pb-8">
                        <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-4">Official Property Dossier</h1>
                        <p className="text-sm font-bold tracking-widest text-slate-500">REAL ESTATE INTELLIGENCE SYSTEM</p>
                    </div>
                    
                    <div className="mb-10">
                        <h2 className="text-xl font-black mb-4 bg-slate-100 p-3">Asset Designation</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                            <p><span className="font-bold w-32 inline-block">Project:</span> {unit.project.name}</p>
                            <p><span className="font-bold w-32 inline-block">Unit ID:</span> {unit.unitNumber}</p>
                            <p><span className="font-bold w-32 inline-block">Status:</span> {unit.status.toUpperCase()}</p>
                            <p><span className="font-bold w-32 inline-block">Valuation:</span> {unit.price ? `${parseFloat(unit.price).toLocaleString()} PKR` : "N/A"}</p>
                        </div>
                    </div>

                    {unit.status === 'sold' && (
                        <div className="mb-10">
                            <h2 className="text-xl font-black mb-4 bg-slate-100 p-3">Ownership Decree</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                                <p><span className="font-bold w-32 inline-block">Proprietor:</span> {unit.ownerName}</p>
                                <p><span className="font-bold w-32 inline-block">Contact:</span> {unit.ownerPhone}</p>
                                <p><span className="font-bold w-32 inline-block">Execution Date:</span> {unit.saleDate ? new Date(unit.saleDate).toLocaleDateString() : 'N/A'}</p>
                                <p><span className="font-bold w-32 inline-block">Agency:</span> {unit.saleAgency || "Direct Allocation"}</p>
                            </div>
                        </div>
                    )}

                    {unit.isRented && (
                        <div className="mb-10">
                            <h2 className="text-xl font-black mb-4 bg-slate-100 p-3">Lease Agreement Summary</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                                <p><span className="font-bold w-32 inline-block">Tenant:</span> {unit.tenantName}</p>
                                <p><span className="font-bold w-32 inline-block">Contact:</span> {unit.tenantPhone}</p>
                                <p><span className="font-bold w-32 inline-block">Monthly Rent:</span> {unit.rentAmount ? `${parseFloat(unit.rentAmount).toLocaleString()} PKR` : 'N/A'}</p>
                                <p><span className="font-bold w-32 inline-block">Lease Date:</span> {unit.rentDate ? new Date(unit.rentDate).toLocaleDateString() : 'N/A'}</p>
                                <p><span className="font-bold w-32 inline-block">Agency:</span> {unit.rentAgency || "Direct Allocation"}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-20 pt-8 border-t-2 border-slate-800 text-center">
                        <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">This is a system generated document. Validated at {new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isSellModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white rounded-[32px] p-10 w-full max-w-xl shadow-2xl">
                            <h2 className="text-2xl font-black mb-6">Execute Sale Protocol</h2>
                            <form onSubmit={handleSell} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Proprietor Name</label>
                                    <input required value={saleForm.ownerName} onChange={e => setSaleForm({...saleForm, ownerName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Number</label>
                                    <input required value={saleForm.ownerPhone} onChange={e => setSaleForm({...saleForm, ownerPhone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Agency Involved (Optional)</label>
                                    <input value={saleForm.saleAgency} onChange={e => setSaleForm({...saleForm, saleAgency: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" placeholder="e.g. Skyline Real Estate" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Execution Date</label>
                                    <input type="date" required value={saleForm.saleDate} onChange={e => setSaleForm({...saleForm, saleDate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button type="button" onClick={() => setIsSellModalOpen(false)} className="px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 flex-1">Cancel</button>
                                    <button type="submit" className="px-6 py-4 rounded-xl font-bold bg-[#00a99d] text-white flex-1 hover:shadow-lg hover:shadow-[#00a99d]/30 transition-all">Confirm Sale</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {isRentModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white rounded-[32px] p-10 w-full max-w-xl shadow-2xl">
                            <h2 className="text-2xl font-black mb-6">Lease Agreement Protocol</h2>
                            <form onSubmit={handleRent} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tenant Name</label>
                                    <input required value={rentForm.tenantName} onChange={e => setRentForm({...rentForm, tenantName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tenant Contact</label>
                                    <input required value={rentForm.tenantPhone} onChange={e => setRentForm({...rentForm, tenantPhone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Monthly Rent (PKR)</label>
                                    <input type="number" required value={rentForm.rentAmount} onChange={e => setRentForm({...rentForm, rentAmount: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Agency Involved (Optional)</label>
                                    <input value={rentForm.rentAgency} onChange={e => setRentForm({...rentForm, rentAgency: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" placeholder="e.g. Skyline Real Estate" />
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button type="button" onClick={() => setIsRentModalOpen(false)} className="px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 flex-1">Cancel</button>
                                    <button type="submit" className="px-6 py-4 rounded-xl font-bold bg-[#00a99d] text-white flex-1 hover:shadow-lg hover:shadow-[#00a99d]/30 transition-all">Initiate Lease</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {isPaymentModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white rounded-[32px] p-10 w-full max-w-md shadow-2xl">
                            <h2 className="text-2xl font-black mb-6">Record Payment</h2>
                            <form onSubmit={handleAddPayment} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Amount Received (PKR)</label>
                                    <input type="number" required value={paymentForm.amount} onChange={e => setPaymentForm({...paymentForm, amount: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rent Cycle (Month/Year)</label>
                                    <input required placeholder="e.g. Feb 2026" value={paymentForm.month} onChange={e => setPaymentForm({...paymentForm, month: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl mt-1 text-sm font-bold border-none" />
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 flex-1">Cancel</button>
                                    <button type="submit" className="px-6 py-4 rounded-xl font-bold bg-[#00a99d] text-white flex-1">Save Ledger</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {isBookingModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white rounded-[32px] p-10 w-full max-w-2xl shadow-2xl">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-[#1a2b3c]">Initiate Asset Booking</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Transaction Node: {unit.unitNumber}</p>
                                </div>
                                <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-6">
                                {/* Payment Type Toggle */}
                                <div className="flex p-1 bg-slate-100 rounded-2xl">
                                    <button 
                                        type="button" 
                                        onClick={() => setBookingForm({...bookingForm, isFullPayment: false, amountPaid: ""})}
                                        className={cn("flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", !bookingForm.isFullPayment ? "bg-white text-[#00a99d] shadow-sm" : "text-slate-500")}
                                    >
                                        Token / Down Payment
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setBookingForm({...bookingForm, isFullPayment: true, amountPaid: unit.price || ""})}
                                        className={cn("flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", bookingForm.isFullPayment ? "bg-white text-[#00a99d] shadow-sm" : "text-slate-500")}
                                    >
                                        Full Payment (Sale)
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Customer Name</label>
                                        <input required value={bookingForm.customerName} onChange={e => setBookingForm({...bookingForm, customerName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold border-none" placeholder="Primary Stakeholder" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Number</label>
                                        <input required value={bookingForm.customerPhone} onChange={e => setBookingForm({...bookingForm, customerPhone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold border-none" placeholder="Active Line" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Amount to Pay (PKR)</label>
                                        <input 
                                            type="number" 
                                            required 
                                            readOnly={bookingForm.isFullPayment}
                                            value={bookingForm.amountPaid} 
                                            onChange={e => setBookingForm({...bookingForm, amountPaid: e.target.value})} 
                                            className={cn("w-full px-4 py-3 rounded-xl text-sm font-bold border-none", bookingForm.isFullPayment ? "bg-[#00a99d]/10 text-[#00a99d]" : "bg-slate-50")} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Transaction Date</label>
                                        <input type="date" required value={bookingForm.bookingDate} onChange={e => setBookingForm({...bookingForm, bookingDate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold border-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Interpreting Agency (Optional)</label>
                                    <input value={bookingForm.agency} onChange={e => setBookingForm({...bookingForm, agency: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold border-none" placeholder="e.g. Premium Realty" />
                                </div>

                                {/* Financial Summary */}
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-400 uppercase tracking-widest">Total Asset Valuation</span>
                                        <span className="text-[#1a2b3c]">{unit.price ? `${parseFloat(unit.price).toLocaleString()} PKR` : 'TBD'}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold border-t border-slate-200 pt-2">
                                        <span className="text-slate-400 uppercase tracking-widest">Remaining Balance</span>
                                        <span className="text-[#00a99d]">
                                            {unit.price ? (parseFloat(unit.price) - (parseFloat(bookingForm.amountPaid) || 0)).toLocaleString() : '0'} PKR
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button type="button" onClick={() => setIsBookingModalOpen(false)} className="px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 flex-1">Abort</button>
                                    <button type="submit" className="px-6 py-4 rounded-xl font-bold bg-[#00a99d] text-white flex-1 hover:shadow-lg hover:shadow-[#00a99d]/30 transition-all uppercase text-[10px] tracking-widest">
                                        Confirm {bookingForm.isFullPayment ? 'Sale' : 'Booking'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
