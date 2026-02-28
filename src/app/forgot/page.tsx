"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, ArrowRight, Mail, Lock, ShieldCheck, Loader2, CheckCircle2, KeyRound, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: ""
    });

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/forgot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Identity check failed");
            }

            setStep(2);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Credential update failed");
            }

            setIsSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F4F4] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent rounded-full blur-[120px]" />
            </div>

            <div className="max-w-md w-full relative">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-md shadow-primary/30 mb-4"
                    >
                        <Building2 className="text-white w-9 h-9" />
                    </motion.div>
                    <h2 className="text-lg m-0 p-0 font-semibold text-slate-800 tracking-normal font-outfit ">Access Recovery</h2>
                    <p className="text-slate-500 mt-2 font-medium ">Override protocol for lost credentials</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-xl border border-white/50 shadow-md shadow-secondary/10 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="text-primary w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-800  mb-4 font-outfit">Access Restored</h3>
                                <p className="text-slate-500 font-medium  mb-8 px-6 text-sm">
                                    Your secure access key has been updated. Redirecting to terminal...
                                </p>
                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className=""
                            >
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold rounded-2xl flex items-center gap-2  uppercase tracking-wider">
                                        <ShieldCheck className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}

                                {step === 1 ? (
                                    <form onSubmit={handleRequestOTP} className="">
                                        <div className="space-y-2">
                                            <label>Identify Work Account</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="admin@elitedev.com"
                                                    className="!pl-12"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-2.5 bg-primary text-white rounded-xl font-semibold text-xs uppercase tracking-normal flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30 group disabled:opacity-70"
                                        >
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                                <>
                                                    Initiate Recovery
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleResetPassword} className="">
                                        <div className="space-y-2">
                                            <label>Security Token (OTP)</label>
                                            <div className="relative">
                                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <input
                                                    required
                                                    maxLength={6}
                                                    type="text"
                                                    value={formData.otp}
                                                    onChange={e => setFormData({ ...formData, otp: e.target.value })}
                                                    placeholder="123456"
                                                    className="!pl-12 tracking-normal"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label>New Access Key</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <input
                                                    required
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.newPassword}
                                                    onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                                                    placeholder="••••••••"
                                                    className="!pl-12 !pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors p-1"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-2.5 bg-secondary text-white rounded-xl font-semibold text-xs uppercase tracking-normal flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-secondary/30 group disabled:opacity-70"
                                        >
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                                <>
                                                    Update Identity
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                        <Link href="/login" className="text-slate-400 text-[10px] font-semibold uppercase tracking-normal hover:text-primary transition-colors ">
                            Back to Terminal Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
