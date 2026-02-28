"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextImage from "next/image";
import { CheckCircle2, Trophy, Building2, Users2, ChevronLeft, ChevronRight, LayoutDashboard, Map, Wallet, PieChart, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const achievements = [
    {
        title: "Tameer Expo 2021-22",
        description: "Recognized as the most innovative ERP solution for real estate builders.",
        image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800",
        tag: "Event Highlight"
    },
    {
        title: "100+ Builders Trust Us",
        description: "Successfully implemented our ERP across major construction groups in Pakistan.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        tag: "Milestone"
    },
    {
        title: "Digital Transformation Award",
        description: "Awarded for excellence in bringing digital efficiency to traditional real estate.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        tag: "Award"
    }
];

const coreModules = [
    {
        icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
        title: "Project Life Cycle",
        desc: "End-to-end management from land acquisition to final unit handover."
    },
    {
        icon: <Map className="w-8 h-8 text-primary" />,
        title: "Inventory Control",
        desc: "Real-time tracking of plots, apartments, and commercial units across multiple projects."
    },
    {
        icon: <Wallet className="w-8 h-8 text-primary" />,
        title: "Payment Recovery",
        desc: "Automated installment plans, late payment alerts, and integrated recovery workflows."
    },
    {
        icon: <PieChart className="w-8 h-8 text-primary" />,
        title: "Financial Analytics",
        desc: "Deep insights into project profitability, expense ratios, and sales performance."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Client Portal",
        desc: "Dedicated secure portals for buyers to track their investment and payment history."
    },
    {
        icon: <Users2 className="w-8 h-8 text-primary" />,
        title: "Lead Management",
        desc: "Advanced CRM to track prospects, follow-up schedules, and sales team performance."
    }
];

export default function AboutPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextAchievement = () => {
        setActiveIndex((prev) => (prev + 1) % achievements.length);
    };

    const prevAchievement = () => {
        setActiveIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* CEO Signature Block */}
            <div className="mt-12 flex items-center justify-center gap-4 opacity-60">
                <NextImage
                    src="https://signature.freebiestore.net/wp-content/uploads/2016/10/Signature-2.png"
                    alt="Signature"
                    width={200}
                    height={80}
                    className="h-12 w-auto filter invert brightness-0"
                    unoptimized
                />
            </div>

            {/* Hero Banner Section */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0"
                >
                    <NextImage
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/40 backdrop-blur-[1px]" />
                </motion.div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent font-semibold tracking-normal uppercase text-xs mb-4 block">Our Story & Vision</span>
                        <h1 className="text-5xl md:text-7xl font-semibold text-white  tracking-normal mb-6 inline-block">
                            Empowering <span className="text-primary ">Real Estate</span>
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg  font-medium leading-relaxed">
                            We are redefining how builders and developers manage their projects through cutting-edge ERP solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"
                            />
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative rounded-xl overflow-hidden border-[12px] border-white shadow-md shadow-primary/20"
                            >
                                <NextImage
                                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000"
                                    alt="Our Team"
                                    width={1000}
                                    height={667}
                                    className="w-full h-auto"
                                    unoptimized
                                />
                            </motion.div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
                        </div>

                        <div className="space-y-10">
                            <div>
                                <h2 className="text-xl m-0 p-0 font-semibold text-slate-800 mb-8 relative inline-block uppercase  tracking-normal">
                                    About us
                                    <span className="absolute bottom-[-10px] left-0 w-24 h-2 bg-primary rounded-full" />
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-xl  font-medium">
                                    RealERPCRM is a leading provider of cloud-based software solutions for the real estate industry. Our platform offers a <span className="text-primary font-semibold border-b-2 border-primary/20">one-stop</span> solution for managing every dimension of construction and sales.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                                    <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-3  uppercase tracking-tight">
                                        <Building2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                        Who We Are
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed ">
                                        We are a team of domain experts and tech innovators who spent over a decade understanding the complexities of real estate. We didn&apos;t just build a software; we built a digital partner for builders.
                                    </p>
                                </div>

                                <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                                    <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-3  uppercase tracking-tight">
                                        <Trophy className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                        Our Commitment
                                    </h3>
                                    <ul className="space-y-2">
                                        {[
                                            "Exceptional 24/7 technical support for our developer community.",
                                            "Continuous updates to meet the evolving real estate regulations.",
                                            "Enterprise-grade security for your sensitive financial and client data."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 text-sm  font-bold text-slate-500 items-start">
                                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Modules Section - ADDED CONTENT */}
            <section className="py-32 bg-secondary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-semibold  tracking-normal mb-6">Designed for the <span className="text-primary">Niche</span></h2>
                        <p className="text-white/60 max-w-2xl mx-auto  font-medium">Modular architecture built specifically to address the unique challenges of real estate builders and developers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreModules.map((module, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                <div className="mb-6 p-4 bg-primary/10 rounded-2xl inline-block">
                                    {module.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4  uppercase tracking-normal">{module.title}</h3>
                                <p className="text-white/50 leading-relaxed  text-sm">{module.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-32 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-stretch">
                        <div className="lg:w-1/3 bg-primary p-12 rounded-xl text-white shadow-md shadow-primary/30 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl m-0 p-0 font-semibold mb-8  uppercase tracking-normal">Our Achievements</h2>
                                <p className="text-white/80 leading-relaxed mb-12  font-medium text-lg">
                                    Milestones that define our journey as Pakistan&apos;s leading Real Estate ERP platform.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={prevAchievement}
                                    className="p-4 rounded-full bg-white/10 hover:bg-white/30 transition-all border border-white/20 active:scale-95"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextAchievement}
                                    className="p-4 rounded-full bg-white/10 hover:bg-white/30 transition-all border border-white/20 active:scale-95"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-2/3 relative h-[500px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    {/* Image Side */}
                                    <div className="relative h-[600px] rounded-xl overflow-hidden group shadow-md shadow-primary/20">
                                        <NextImage
                                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                            alt="About Us"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />

                                        {/* Floating Stat Card */}
                                        <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
                                            <span className="text-primary font-semibold text-xs uppercase tracking-normal mb-4 block ">{achievements[activeIndex].tag}</span>
                                            <h2 className="text-lg m-0 p-0 font-semibold text-slate-800  tracking-tight mb-6">Pakistan&apos;s Premier Infrastructure ERP</h2>
                                            <p className="text-slate-500  font-medium leading-relaxed">{achievements[activeIndex].description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clients Section */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-primary font-semibold tracking-normal uppercase text-xs mb-4 block">Trusted By Titans</span>
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-10 relative inline-block uppercase  tracking-normal">
                        Our Strategic Clients
                        <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-32 h-2 bg-primary rounded-full" />
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mb-20  font-medium text-lg leading-relaxed">
                        RealERPCRM powers the operations of top-tier real estate groups, ensuring transparency and efficiency at scale.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 items-center">
                        {['BRB GROUP', 'Riviera', 'EMAAR', 'OK BUILDERS', 'AL RAUF GROUP', 'FALAKNAZ', 'MEMAAR', 'PAK REALTY', 'SKYLINE', 'ELITE', 'TAMEER', 'PINNACLE'].map((client, i) => (
                            <motion.div
                                key={client}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center group cursor-pointer"
                            >
                                <div className="w-20 h-20 bg-slate-50 rounded-2xl mb-4 flex items-center justify-center group-hover:bg-primary/5 group-hover:shadow-lg transition-all duration-500 border border-slate-100 group-hover:border-primary/20 bg-white shadow-xl shadow-slate-100/50">
                                    <Building2 className="w-10 h-10 text-slate-300 group-hover:text-primary transition-colors duration-500" />
                                </div>
                                <span className="text-[10px] font-semibold text-slate-400 tracking-wide group-hover:text-slate-800 transition-colors uppercase ">{client}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
