"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronDown, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const solutionsData = [
    {
        title: "Real Estate Builders",
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400"
        ],
        links: ["Sales Booking", "Under Construction Building", "Industrial Site Planning"]
    },
    {
        title: "Developers",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400"
        ],
        links: ["Society On Booking", "Town Planing", "Construction Company"]
    },
    {
        title: "Facility Management",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400"
        ],
        links: ["Shopping Mall Management", "Co-Working Office Management"]
    },
    {
        title: "Rental Management",
        images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400"
        ],
        links: ["Building Management", "Cooperative Societies", "Town House Management", "Properties Management"]
    }
];

export default function Navbar() {
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

    return (
        <>
            <div className="bg-primary text-white py-2 hidden md:block">
                <div className="container mx-auto px-6 flex justify-between items-center text-xs font-medium">
                    <div className="flex items-center gap-6">
                        <a href="tel:+923074163810" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                            <Phone className="w-3 h-3 text-accent" /> +92 307 4163810
                        </a>
                        <a href="mailto:contact@realerpcrm.pk" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                            <Mail className="w-3 h-3 text-accent" /> contact@realerpcrm.pk
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 border-r border-white/20 pr-4 mr-1">
                            <Facebook className="w-3.5 h-3.5 hover:text-accent cursor-pointer transition-colors" />
                            <Linkedin className="w-3.5 h-3.5 hover:text-accent cursor-pointer transition-colors" />
                            <Instagram className="w-3.5 h-3.5 hover:text-accent cursor-pointer transition-colors" />
                            <Youtube className="w-3.5 h-3.5 hover:text-accent cursor-pointer transition-colors" />
                        </div>
                        <select className="bg-transparent border-none outline-none cursor-pointer">
                            <option className="text-black">English</option>
                        </select>
                    </div>
                </div>
            </div>

            <nav className="sticky top-0 w-full z-[100] bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all duration-500">
                            <Building2 className="text-white w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-secondary tracking-tighter leading-none italic uppercase">RealERPCRM</span>
                            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Enterprise Solutions</span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 font-bold text-slate-600 h-full">
                        <Link href="/" className="hover:text-primary transition-colors text-xs uppercase tracking-[0.1em] font-black">Home</Link>
                        <Link href="/about" className="hover:text-primary transition-colors text-xs uppercase tracking-[0.1em] font-black">About Us</Link>

                        {/* Mega Dropdown Trigger */}
                        <div
                            className="h-full flex items-center cursor-pointer group/nav"
                            onMouseEnter={() => setIsSolutionsOpen(true)}
                            onMouseLeave={() => setIsSolutionsOpen(false)}
                        >
                            <button className="flex items-center gap-2 hover:text-primary transition-all text-xs uppercase tracking-[0.1em] font-black py-8 relative">
                                Solutions
                                <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isSolutionsOpen && "rotate-180 text-primary")} />
                                {isSolutionsOpen && (
                                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                )}
                            </button>
                        </div>

                        <Link href="/features" className="hover:text-primary transition-colors text-xs uppercase tracking-[0.1em] font-black">Features</Link>
                        <Link href="#" className="hover:text-primary transition-colors text-xs uppercase tracking-[0.1em] font-black">Blog</Link>
                        <Link href="#" className="hover:text-primary transition-colors text-xs uppercase tracking-[0.1em] font-black">Testimonials</Link>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link href="/login" className="bg-primary text-white py-2 px-6 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary-dark transition-all shadow-md">
                            <LogIn className="w-3.5 h-3.5" /> Login
                        </Link>
                    </div>

                    {/* MEGA MENU */}
                    <AnimatePresence>
                        {isSolutionsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.15 }}
                                onMouseEnter={() => setIsSolutionsOpen(true)}
                                onMouseLeave={() => setIsSolutionsOpen(false)}
                                className="absolute top-full left-0 right-0 mx-auto w-full max-w-[1200px] pointer-events-none z-[110]"
                            >
                                <div className="bg-white shadow-2xl rounded-b-3xl border border-slate-100 overflow-hidden pointer-events-auto">
                                    <div className="grid grid-cols-4 gap-4 p-4">
                                        {solutionsData.map((sol, i) => (
                                            <div key={i} className="flex flex-col">
                                                <h4 className="text-secondary font-black text-[9px] mb-3 pb-1.5 border-b border-slate-50 italic uppercase tracking-[0.2em] flex items-center justify-between">
                                                    {sol.title}
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                </h4>
                                                <div className="grid grid-cols-1 gap-2 mb-4">
                                                    {sol.images.map((img, idx) => (
                                                        <div key={idx} className="aspect-video rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-50 group/img relative">
                                                            <NextImage
                                                                src={img}
                                                                alt={sol.title}
                                                                fill
                                                                unoptimized
                                                                className="object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <ul className="space-y-1">
                                                    {sol.links.map((link, j) => (
                                                        <motion.li
                                                            key={j}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 + j * 0.05 }}
                                                        >
                                                            <Link href="#" className="relative group/link block overflow-hidden rounded-xl border border-slate-50/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                                                                <div className="relative px-3 py-2 text-slate-500 group-hover/link:text-primary text-[10px] font-black italic uppercase tracking-[0.05em] flex items-center justify-between">
                                                                    {link}
                                                                    <motion.div
                                                                        initial={{ x: -10, opacity: 0 }}
                                                                        whileHover={{ x: 0, opacity: 1 }}
                                                                    >
                                                                        <ChevronDown className="w-3 h-3 -rotate-90" />
                                                                    </motion.div>
                                                                </div>
                                                                <motion.div
                                                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10 origin-left"
                                                                    initial={{ scaleX: 0 }}
                                                                    whileHover={{ scaleX: 1 }}
                                                                />
                                                            </Link>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-slate-50/80 p-4 flex justify-center border-t border-slate-100 group/footer">
                                        <div className="flex flex-col items-center gap-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic group-hover/footer:text-primary transition-colors duration-500">
                                                Building Intelligence for Modern Infrastructure
                                            </p>
                                            <div className="w-24 h-0.5 bg-primary/20 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="w-full h-full bg-primary"
                                                    animate={{ x: [-100, 100] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </>
    );
}
