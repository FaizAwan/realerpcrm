"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight, ArrowLeft, Loader2, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    // Geolocation API fetch
    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();

                    if (data && data.address) {
                        setFormData(prev => ({
                            ...prev,
                            city: data.address.city || data.address.town || data.address.village || "",
                            country: data.address.country || ""
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching location details:", error);
                    alert("Unable to retrieve detailed location automatically.");
                } finally {
                    setLocationLoading(false);
                }
            },
            (error) => {
                setLocationLoading(false);
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Location access denied. Please allow location access in your browser settings to use this feature.");
                } else {
                    alert("Unable to retrieve your location.");
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        whatsapp: "",
        city: "",
        country: "",
        companyName: "",
        industry: "",
        password: "",
        confirmPassword: ""
    });

    const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step !== 4) {
            handleNext();
            return;
        }

        // Final Submission (Mock)
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push("/login?registered=true");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">
            {/* Left side Image Base banner */}
            <div className="hidden lg:flex lg:w-[45%] bg-[#F8F9FC] relative items-center justify-center p-12">
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-slate-200/50 to-transparent pointer-events-none" />
                <div className="relative w-full max-w-lg z-10 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white/50 bg-white">
                        <Image
                            src="/construction-signup.png"
                            alt="Modern Construction Site - High Scale Building"
                            fill
                            style={{ objectFit: "cover" }}
                            className="scale-105 hover:scale-100 transition-transform duration-700"
                        />
                    </div>
                    <div className="mt-12 text-center max-w-sm">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Building2 className="text-primary w-8 h-8" />
                            <span className="text-2xl font-bold text-slate-800 tracking-tight">RealERP<span className="text-primary">CRM</span></span>
                        </div>
                        <p className="text-slate-500 font-medium">Smart, Fast, Reliable infrastructure for Real Estate and Property Management.</p>
                    </div>
                </div>
            </div>

            {/* Right side Multi-step form */}
            <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-6 sm:p-12 relative">

                {/* Header mobile logo (hidden on desktop) */}
                <div className="lg:hidden flex items-center gap-2 mb-10">
                    <Building2 className="text-primary w-8 h-8" />
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">RealERP<span className="text-primary">CRM</span></span>
                </div>

                <div className="w-full max-w-xl">
                    {/* Stepper Header */}
                    <div className="flex items-center justify-between mb-12 relative w-full px-4">
                        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -z-10 -translate-y-1/2" />

                        {["Personal", "Company", "Account", "Verification"].map((label, idx) => {
                            const stepNum = idx + 1;
                            const isActive = step >= stepNum;
                            const isCurrent = step === stepNum;

                            return (
                                <div key={label} className="flex flex-col items-center gap-3 bg-white px-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}>
                                        {isActive && !isCurrent ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                                    </div>
                                    <span className={`text-[11px] uppercase tracking-wider font-bold ${isCurrent ? "text-primary" : isActive ? "text-slate-800" : "text-slate-400"
                                        }`}>
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form Container */}
                    <form onSubmit={handleSubmit} className="bg-white p-2">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: Personal */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="relative">
                                            <input id="firstName" required type="text" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                            <label htmlFor="firstName" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">First name *</label>
                                        </div>
                                        <div className="relative">
                                            <input id="lastName" required type="text" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                            <label htmlFor="lastName" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Last name *</label>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <input id="email" required type="email" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        <label htmlFor="email" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Personal email *</label>
                                    </div>

                                    <div className="relative flex border border-slate-200 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                        <div className="bg-slate-50 px-3 py-2.5 border-r border-slate-200 flex items-center gap-2 text-sm text-slate-600 font-medium">
                                            <span className="text-lg leading-none">🇵🇰</span> +92
                                        </div>
                                        <input required id="mobile" type="tel" className="block flex-1 px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white appearance-none focus:outline-none focus:ring-0 peer transition-all" placeholder=" " value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
                                        <label htmlFor="mobile" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-[88px]">Mobile *</label>
                                    </div>

                                    <div className="relative flex border border-slate-200 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                        <div className="bg-slate-50 px-3 py-2.5 border-r border-slate-200 flex items-center gap-2 text-sm text-slate-600 font-medium">
                                            <span className="text-lg leading-none">🇵🇰</span> +92
                                        </div>
                                        <input required id="whatsapp" type="tel" className="block flex-1 px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white appearance-none focus:outline-none focus:ring-0 peer transition-all" placeholder=" " value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} />
                                        <label htmlFor="whatsapp" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-[88px]">WhatsApp *</label>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
                                        <div className="relative">
                                            <input id="city" type="text" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                            <label htmlFor="city" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">City</label>
                                        </div>
                                        <div className="relative">
                                            <input id="country" type="text" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} />
                                            <label htmlFor="country" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Country</label>

                                            {/* Location Detector Button */}
                                            <button
                                                type="button"
                                                onClick={handleDetectLocation}
                                                disabled={locationLoading}
                                                className="absolute -top-7 right-0 text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 bg-primary/10 px-2 py-1 rounded disabled:opacity-50"
                                            >
                                                {locationLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
                                                Detect My Location
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: Company */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="relative">
                                        <input id="companyName" required type="text" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} />
                                        <label htmlFor="companyName" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Company Name *</label>
                                    </div>
                                    <div className="relative">
                                        <select id="industry" required className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })}>
                                            <option value="" disabled hidden></option>
                                            <option value="builder">Builder & Developer</option>
                                            <option value="agency">Real Estate Agency</option>
                                            <option value="management">Property Management</option>
                                        </select>
                                        <label htmlFor="industry" className={`absolute text-sm font-medium duration-300 transform top-2 z-10 origin-[0] bg-white px-2 left-2 transition-all ${formData.industry ? '-translate-y-4 scale-75 text-primary' : '-translate-y-1/2 top-1/2 scale-100 text-slate-500 peer-focus:text-primary peer-focus:-translate-y-4 peer-focus:top-2 peer-focus:scale-75'}`}>Industry *</label>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: Account */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="relative">
                                        <input id="password" required type="password" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                        <label htmlFor="password" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Password *</label>
                                    </div>
                                    <div className="relative">
                                        <input id="confirmPassword" required type="password" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all" placeholder=" " value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                        <label htmlFor="confirmPassword" className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Confirm Password *</label>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: Verification */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShieldCheck className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Almost Done!</h3>
                                    <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Please confirm your details and agree to our terms of service to create your RealERPCRM account.</p>

                                    <div className="flex items-start gap-3 text-left bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100">
                                        <input required type="checkbox" id="terms" className="mt-1 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary accent-primary" />
                                        <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed font-medium">
                                            By creating an account, you agree to RealERPCRM&apos;s <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>, and to receive important lifecycle communications.
                                        </label>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className={`mt-10 flex items-center ${step === 1 ? 'justify-end' : 'justify-between'}`}>
                            {step > 1 && (
                                <button type="button" onClick={handleBack} className="text-slate-500 font-semibold text-sm hover:text-slate-800 transition-colors flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#009688] hover:bg-[#007b5e] text-white px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-primary/20 hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none"
                            >
                                {isLoading ? (
                                    <>Processing <Loader2 className="w-4 h-4 animate-spin" /></>
                                ) : step === 4 ? (
                                    "Finish Registration"
                                ) : (
                                    <>Next <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 text-center text-sm font-semibold text-slate-500 pb-10">
                        Already have your account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
