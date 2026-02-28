import Link from "next/link";
import { Building2, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, PlayCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer-bg">
            {/* CTA Section */}
            <div className="bg-primary/5 border-y border-primary/10 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-secondary mb-6">Unleash Your Business&apos;s True Potential With RealERPCRM!</h2>
                    <Link href="/signup">
                        <button className="bg-white text-primary px-10 py-4 rounded-lg font-bold shadow-xl shadow-primary/10 hover:bg-slate-50 transition-colors uppercase tracking-widest text-sm">
                            Get Demo
                        </button>
                    </Link>
                </div>
            </div>

            {/* Main Footer */}
            <div className="bg-[#f8fafc] pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Building2 className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-black text-secondary tracking-tight italic">RealERPCRM</span>
                            </Link>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                Save time, cut costs, and increase sales with complete control at their fingertips! RealERPCRM is a cloud-based project management solution designed for realtors, distributors, property managers, and marketing teams.
                            </p>
                            <div className="flex items-center gap-3">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <button key={i} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                        <Icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-secondary mb-8 relative">
                                Explore
                                <span className="absolute bottom-[-10px] left-0 w-8 h-1 bg-primary rounded-full"></span>
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'About', href: '/about' },
                                    { name: 'Features', href: '/features' },
                                    { name: 'Services', href: '#' },
                                    { name: 'Privacy Policy', href: '#' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="text-lg font-bold text-secondary mb-8 relative">
                                Get in Touch
                                <span className="absolute bottom-[-10px] left-0 w-8 h-1 bg-primary rounded-full"></span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-slate-500 text-sm italic">
                                        National Incubation Center, NED University, Karachi, 75270
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-slate-500 text-sm italic">+92 307 4163810</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-slate-500 text-sm italic">contact@realerpcrm.pk</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-400 text-xs font-medium">
                            Copyright © 2026 RealERPCRM. All Rights Reserved By <span className="text-primary">RealERPCRM</span>.
                        </p>
                        <div className="flex items-center gap-6 grayscale opacity-60">
                            <span className="text-xs font-bold text-slate-800">NIC</span>
                            <span className="text-xs font-bold text-slate-800">INVEST2INNOVATE</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
