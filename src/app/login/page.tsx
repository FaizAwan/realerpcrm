"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, Building2, Quote } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false
            });

            if (result?.error) {
                setError("Invalid email or password.");
            } else {
                // Use native window location instead of router.push + router.refresh 
                // to prevent Next.js internal router crashes and stuck blurry overlays
                window.location.href = "/realerpcrm/app";
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left side - Form */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white shadow-[10px_0_40px_-15px_rgba(0,0,0,0.05)] relative z-10">
                <div className="w-full max-w-sm mx-auto">
                    {/* Logo Header */}
                    <div className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            RealERP<span className="text-primary font-light">crm</span>
                        </span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome back</h1>
                        <p className="text-slate-500">Sign in to your account to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="block pl-10 pr-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all shadow-sm"
                                placeholder=" "
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 peer-focus:text-primary transition-colors" />
                            <label
                                htmlFor="email"
                                className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-9"
                            >
                                Email address
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="block pl-10 pr-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all shadow-sm"
                                placeholder=" "
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 peer-focus:text-primary transition-colors" />
                            <label
                                htmlFor="password"
                                className="absolute text-sm font-medium text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-9"
                            >
                                Password
                            </label>
                            <Link href="/forgot" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary hover:text-primary-dark hover:underline z-20">
                                Forgot?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold text-sm transition-all shadow-sm focus:ring-4 focus:ring-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                        <p className="text-sm text-slate-500">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-primary font-semibold hover:underline">
                                Sign up for free
                            </Link>
                        </p>

                        <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-500">
                                Demo: <span className="font-semibold text-slate-700">admin@realerpcrm.com</span> /{" "}
                                <span className="font-semibold text-slate-700">admin123</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Visuals */}
            <div className="hidden lg:flex w-[55%] bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/construction-login.png"
                        alt="High-end Residential Construction Development"
                        fill
                        className="object-cover opacity-50 mix-blend-luminosity"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-xl text-center flex flex-col items-center">
                    <div className="mb-8">
                        <Building2 className="w-16 h-16 text-white/90 mx-auto" />
                    </div>
                    <h2 className="text-4xl font-bold text-white tracking-tight leading-tight mb-6">
                        Enterprise Real Estate Management Made Simple.
                    </h2>
                    <p className="text-lg text-slate-300 font-medium leading-relaxed mb-12 max-w-lg mx-auto">
                        A smart, fast, and reliable CRM built from the ground up for modern real estate professionals and agencies. Focus on closing deals while we handle the data.
                    </p>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-left shadow-2xl relative">
                        <Quote className="absolute top-4 right-4 w-8 h-8 text-white/10" />
                        <p className="text-slate-200 italic mb-4">
                            &quot;RealERPCRM completely transformed how our agency handles leads and properties. The intuitive dashboard alone saved our team countless hours.&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-primary font-bold shadow-inner">
                                SJ
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Sarah Jenkins</p>
                                <p className="text-slate-400 text-xs">Director, Elite Property Group</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
