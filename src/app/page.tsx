"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2, DollarSign, FileText, Users, Home, ShoppingCart,
  Package, Truck, CreditCard, CheckCircle, LayoutGrid, MapPin,
  MessageSquare, Bell, ClipboardList, BarChart3, TrendingUp,
  Key, Map, Phone, Mail, Calendar, Settings, Shield, Layers
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />

      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Platform Elevate Section */}
      <section className="py-24 bg-teal-500 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              A Platform to Elevate Real Estate Success
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Real Estate Builders */}
            <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col pt-0 pb-6 px-0 shadow-xl border-4 border-white">
              <div className="h-48 relative overflow-hidden rounded-t-[2rem]">
                <img src="/hero_img_1.png" alt="Real Estate Builders" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-teal-600 mb-4 border-b-2 border-slate-100 pb-2">Real Estate Builders</h3>
                <div className="flex flex-wrap gap-2 mb-8 flex-1 content-start">
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Sales booking</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Under construction building</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Industrial site planning</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Construction company</span>
                </div>
                <Link href="/features">
                  <button className="text-slate-500 font-medium text-xs hover:text-teal-600 transition-colors flex items-center gap-1 group mt-auto">
                    View features <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">»</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Developers */}
            <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col pt-0 pb-6 px-0 shadow-xl border-4 border-white">
              <div className="h-48 relative overflow-hidden rounded-t-[2rem]">
                <img src="/hero_img_2.png" alt="Developers" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-teal-600 mb-4 border-b-2 border-slate-100 pb-2">Developers</h3>
                <div className="flex flex-wrap gap-2 mb-8 flex-1 content-start">
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Society on booking</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Plot booking</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Town planing</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Under construction building</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Properties Management</span>
                </div>
                <button className="text-slate-500 font-medium text-xs hover:text-teal-600 transition-colors flex items-center gap-1 group mt-auto">
                  View features <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">»</span>
                </button>
              </div>
            </div>

            {/* Agencies */}
            <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col pt-0 pb-6 px-0 shadow-xl border-4 border-white">
              <div className="h-48 relative overflow-hidden rounded-t-[2rem]">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" alt="Agencies" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-teal-600 mb-4 border-b-2 border-slate-100 pb-2">Agencies</h3>
                <div className="flex flex-wrap gap-2 mb-8 flex-1 content-start">
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Plot for sale</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Lead generation</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Dealers & brokers</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Sales team</span>
                </div>
                <button className="text-slate-500 font-medium text-xs hover:text-teal-600 transition-colors flex items-center gap-1 group mt-auto">
                  View features <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">»</span>
                </button>
              </div>
            </div>

            {/* Property Management */}
            <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col pt-0 pb-6 px-0 shadow-xl border-4 border-white">
              <div className="h-48 relative overflow-hidden rounded-t-[2rem]">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Property Management" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-teal-600 mb-4 border-b-2 border-slate-100 pb-2">Property Management</h3>
                <div className="flex flex-wrap gap-2 mb-8 flex-1 content-start">
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Building management</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Cooperative societies</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Shopping mall management</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Town house management</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Co-working office management</span>
                  <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-sm text-center">Hotel management</span>
                </div>
                <Link href="/features">
                  <button className="text-slate-500 font-medium text-xs hover:text-teal-600 transition-colors flex items-center gap-1 group mt-auto">
                    View features <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">»</span>
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions Section - Ultra Compact Command Center Style */}
      <section className="h-screen min-h-[800px] w-full m-0 p-0 relative overflow-hidden bg-white flex flex-col justify-center">
        {/* Advanced Fluid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

          {/* Removed heavy blurs for clarity */}
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
          {/* Header Block - Zero Spacing Focus */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="p-0 m-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-2"
              >
                <div className="w-8 h-1 bg-primary rounded-full" />
                <span className="text-[10px] font-semibold text-primary uppercase tracking-normal ">Enterprise Protocol</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-semibold text-slate-800  tracking-normal leading-[0.9] font-outfit m-0 p-0"
              >
                Visionary <span className="text-primary ">Infrastructure</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-md"
            >
              <p className="text-slate-800 font-semibold text-sm  leading-relaxed m-0 p-0 border-l-2 border-primary/20 pl-4">
                Redefining the DNA of Real Estate management through <span className="text-primary">dynamic precision</span> and automated scalability.
              </p>
            </motion.div>
          </div>

          {/* Solutions Grid - Screen Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 m-0 p-0 bg-slate-100/50 rounded-xl overflow-hidden border border-slate-100">
            {[
              {
                title: "Property Core",
                icon: <Building2Icon className="w-8 h-8" />,
                items: ['Building Mgmt', 'Socities', 'Malls', 'Townhouses', 'Co-working', 'Hotels'],
                gradient: "from-primary/20 via-white to-white"
              },
              {
                title: "Builder Suite",
                icon: <BuildingIcon className="w-8 h-8" />,
                items: ['Sales Booking', 'Under-Con', 'Site Planning', 'Construction', 'Ledgers', 'Materials'],
                gradient: "from-primary/20 via-white to-white"
              },
              {
                title: "Dev Terminal",
                icon: <UsersIcon className="w-8 h-8" />,
                items: ['Society Booking', 'Plotting', 'Installments', 'Property', 'Approvals', 'Finance'],
                gradient: "from-primary/20 via-white to-white"
              }
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg group-hover:bg-primary transition-all duration-500 group-hover:-rotate-6">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-slate-800  tracking-tight font-outfit uppercase group-hover:text-primary transition-colors">{card.title}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-8">
                      {card.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/item:bg-primary transition-all" />
                          <span className="text-slate-800 font-semibold  text-[11px] group-hover/item:text-primary transition-colors truncate uppercase tracking-normal">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="flex items-center justify-between group/btn pt-6 border-t border-slate-50">
                    <span className="text-[10px] font-semibold uppercase tracking-normal text-slate-400 group-hover/btn:text-primary transition-colors ">Interface Details</span>
                    <ArrowRightIcon className="w-4 h-4 text-slate-300 group-hover/btn:text-primary transition-all group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Tab Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight mb-4">
              Our Core Solutions
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Everything you need to scale your real estate enterprise
            </p>
          </div>

          <FeaturesTabComponent />
        </div>
      </section>

      {/* Partners/Logos Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-800 font-semibold mb-16 text-[11px] tracking-normal uppercase ">Trusted By Premier Infrastructure Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {['BRB GROUP', 'EMAAR', 'AL RAUF GROUP', 'FALAKNAZ', 'RIVIERA', 'SKYLINE'].map((logo) => (
              <span key={logo} className="text-lg m-0 p-0 font-semibold text-slate-800  hover:text-primary cursor-default tracking-normal transition-all hover:scale-110">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Building2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  )
}

function BuildingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

const slides = [
  {
    title: "Empower Your Vision With RealERPCRM",
    subtitle: "The only Cloud-ERP in Pakistan precision-engineered for developers and builders. Take total command of your enterprise today.",
    image: "/hero_img_1.png",
    accent: "Vision"
  },
  {
    title: "Precision-Engineered Infrastructure Solutions",
    subtitle: "Architecting success through automated workflows and accurate data streams. Precision in every booking, every plot, every record.",
    image: "/hero_img_2.png",
    accent: "Precision"
  },
  {
    title: "Absolute Command Over Your Inventory",
    subtitle: "From industrial site planning to retail inventory accuracy. RealERPCRM provides the scalability your enterprise demands.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
    accent: "Command"
  }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[700px] overflow-hidden bg-secondary">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'}`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
          </div>
        </div>
      ))}

      <div className="container mx-auto px-6 h-full relative z-10 flex items-center">
        <div className="max-w-3xl">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary font-semibold text-[10px] uppercase tracking-normal mb-8 ">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Industry Protocol V1.0
            </div>

            <h1 className="text-6xl md:text-8xl font-semibold text-white mb-8 leading-[1.05] tracking-normal ">
              {slides[current].title.split(slides[current].accent)[0]}
              <span className="text-primary">{slides[current].accent}</span>
              {slides[current].title.split(slides[current].accent)[1]}
            </h1>

            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl  font-medium">
              {slides[current].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/signup" className="w-full sm:w-auto">
                <button className="w-full bg-primary text-white px-12 py-5 rounded-2xl font-semibold shadow-md shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-normal text-xs">
                  Request Exclusive Demo
                </button>
              </Link>
              <button className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-2xl font-semibold hover:bg-white/10 transition-all uppercase tracking-normal text-xs">
                Explore Ecosystem
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative"
          >
            <div className={`h-1 transition-all duration-500 rounded-full ${current === i ? 'w-12 bg-primary' : 'w-6 bg-white/20 group-hover:bg-white/40'}`} />
            {current === i && (
              <motion.div
                layoutId="timer"
                className="absolute top-0 left-0 h-full bg-white opacity-40 rounded-full"
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

const tabs = [
  { id: 'all', label: 'All', icon: <Building2Icon className="w-4 h-4" /> },
  { id: 'builders', label: 'Builders and developers', icon: <BuildingIcon className="w-4 h-4" /> },
  { id: 'agencies', label: 'Agencies', icon: <UsersIcon className="w-4 h-4" /> },
  { id: 'property', label: 'Property Management', icon: <Building2Icon className="w-4 h-4" /> }
];

const featuresData: Record<string, any[]> = {
  all: [
    {
      group: "Site Management",
      items: [
        { name: "Sales", desc: "Make your sales cycle smooth & succesful", icon: TrendingUp, color: "bg-blue-500" },
        { name: "Units", desc: "Managing leases, maximized occupany", icon: Home, color: "bg-indigo-500" },
        { name: "Tokens", desc: "Enhance your property visibility", icon: Key, color: "bg-purple-500" },
        { name: "Bookings", desc: "Effortless property and tenant management.", icon: Calendar, color: "bg-emerald-500" },
        { name: "Maps", desc: "Leverage geographic insights", icon: Map, color: "bg-amber-500" },
        { name: "Reports", desc: "Transform your data into actionable insights", icon: BarChart3, color: "bg-cyan-500" }
      ]
    },
    {
      group: "Accounts And Finance",
      items: [
        { name: "Finance", desc: "Automated & accurate accounts", icon: DollarSign, color: "bg-green-500" },
        { name: "Approvals", desc: "Ensures timely,secure decisions", icon: Shield, color: "bg-red-500" },
        { name: "Billing", desc: "Simplify and track bills", icon: CreditCard, color: "bg-orange-500" },
        { name: "Collection", desc: "Track payments and comprehensive reports", icon: Layers, color: "bg-teal-500" },
        { name: "Reports", desc: "Transform your data into actionable insights", icon: BarChart3, color: "bg-cyan-500" }
      ]
    },
    {
      group: "Facility Management",
      items: [
        { name: "Tenants", desc: "Effortless property and tenant management.", icon: Users, color: "bg-blue-500" },
        { name: "Rental", desc: "Minimize advertising efforts", icon: Home, color: "bg-emerald-500" },
        { name: "Portal", desc: "Secure, user-friendly, reliable", icon: LayoutGrid, color: "bg-violet-500" }
      ]
    },
    {
      group: "Customer Relationships",
      items: [
        { name: "CRM", desc: "Improve customer service", icon: Users, color: "bg-pink-500" },
        { name: "Leads", desc: "Turn prospect into loyal customer", icon: Phone, color: "bg-amber-500" },
        { name: "Social Media", desc: "Connect with your audience", icon: MessageSquare, color: "bg-sky-500" },
        { name: "Notices", desc: "Automated,timely remainders", icon: Bell, color: "bg-rose-500" }
      ]
    },
    {
      group: "Purchases & Inventory",
      items: [
        { name: "Store", desc: "Maximum accuracy and efficiency", icon: Package, color: "bg-slate-500" },
        { name: "Suppliers", desc: "Solution to optimize your vendor experience", icon: Truck, color: "bg-yellow-500" },
        { name: "Orders", desc: "Informed purchases decision", icon: ShoppingCart, color: "bg-indigo-500" },
        { name: "Billing", desc: "Simplify and track bills", icon: CreditCard, color: "bg-orange-500" }
      ]
    },
    {
      group: "Human Resource",
      items: [
        { name: "HR", desc: "Providing you insights of daily operations", icon: Users, color: "bg-lime-500" },
        { name: "Tasks", desc: "Real time updates & customizable flow", icon: ClipboardList, color: "bg-cyan-500" }
      ]
    }
  ],
  builders: [
    {
      group: "Site Management",
      items: [
        { name: "Sales", desc: "Make your sales cycle smooth & succesful", icon: TrendingUp, color: "bg-blue-500" },
        { name: "Units", desc: "Managing leases, maximized occupany", icon: Home, color: "bg-indigo-500" },
        { name: "Bookings", desc: "Effortless property and tenant management.", icon: Calendar, color: "bg-emerald-500" },
        { name: "Maps", desc: "Leverage geographic insights", icon: Map, color: "bg-amber-500" },
      ]
    },
    {
      group: "Finance & Accounts",
      items: [
        { name: "Finance", desc: "Automated & accurate accounts", icon: DollarSign, color: "bg-green-500" },
        { name: "Approvals", desc: "Ensures timely,secure decisions", icon: Shield, color: "bg-red-500" },
      ]
    },
    {
      group: "Purchases & Inventory",
      items: [
        { name: "Store", desc: "Maximum accuracy and efficiency", icon: Package, color: "bg-slate-500" },
        { name: "Suppliers", desc: "Solution to optimize your vendor experience", icon: Truck, color: "bg-yellow-500" },
        { name: "Orders", desc: "Informed purchases decision", icon: ShoppingCart, color: "bg-indigo-500" }
      ]
    }
  ],
  agencies: [
    {
      group: "Customer Relationships",
      items: [
        { name: "CRM", desc: "Improve customer service", icon: Users, color: "bg-emerald-500" },
        { name: "Leads", desc: "Turn prospect into loyal customer", icon: Phone, color: "bg-emerald-500" },
        { name: "Social Media", desc: "Connect with your audience", icon: MessageSquare, color: "bg-emerald-500" },
        { name: "Notices", desc: "Automated,timely remainders", icon: FileText, color: "bg-emerald-500" }
      ]
    },
    {
      group: "Human Resource",
      items: [
        { name: "HR", desc: "Providing you insights of daily operations", icon: Users, color: "bg-emerald-500" },
        { name: "Tasks", desc: "Real time updates & customizable flow", icon: ClipboardList, color: "bg-emerald-500" }
      ]
    }
  ],
  property: [
    {
      group: "Customer Relationships",
      items: [
        { name: "CRM", desc: "Improve customer service", icon: Users, color: "bg-emerald-500" },
        { name: "Tasks", desc: "Real time updates & customizable flow", icon: ClipboardList, color: "bg-emerald-500" },
        { name: "Leads", desc: "Turn prospect into loyal customer", icon: Phone, color: "bg-emerald-500" },
        { name: "Social Media", desc: "Connect with your audience", icon: MessageSquare, color: "bg-emerald-500" }
      ]
    },
    {
      group: "Sales & Rental Management",
      items: [
        { name: "Sales", desc: "Make your sales cycle smooth & succesful", icon: TrendingUp, color: "bg-emerald-500" },
        { name: "Units", desc: "Managing leases, maximized occupany", icon: Home, color: "bg-emerald-500" },
        { name: "Tokens", desc: "Enhance your property visibility", icon: Key, color: "bg-emerald-500" },
        { name: "Rental agreement", desc: "Effective property, and tenant management.", icon: FileText, color: "bg-emerald-500" },
        { name: "Maps", desc: "Leverage geographic insights", icon: Map, color: "bg-emerald-500" },
        { name: "Reports", desc: "Transform your data into actionable insights", icon: BarChart3, color: "bg-emerald-500" }
      ]
    },
    {
      group: "Accounts And Finance",
      items: [
        { name: "Finance", desc: "Automated & accurate accounts", icon: DollarSign, color: "bg-emerald-500" },
        { name: "Approvals", desc: "Ensures timely,secure decisions", icon: Shield, color: "bg-emerald-500" },
        { name: "Reports", desc: "Transform your data into actionable insights", icon: BarChart3, color: "bg-emerald-500" }
      ]
    },
    {
      group: "Facility Management",
      items: [
        { name: "Tenants", desc: "Effortless property, and tenant management", icon: Users, color: "bg-emerald-500" },
        { name: "Rental", desc: "Minimize advertising efforts", icon: Home, color: "bg-emerald-500" }
      ]
    },
    {
      group: "Collection & Recovery",
      items: [
        { name: "Collection", desc: "Track payments and comprehensive reports", icon: Layers, color: "bg-emerald-500" },
        { name: "Notices", desc: "Automated,timely remainders", icon: Bell, color: "bg-emerald-500" }
      ]
    },
    {
      group: "Purchases & Inventory",
      items: [
        { name: "Store", desc: "Maximum accuracy and efficiency", icon: Package, color: "bg-emerald-500" },
        { name: "Suppliers", desc: "Solution to optimize your vendor experience", icon: Truck, color: "bg-emerald-500" },
        { name: "Orders", desc: "Informed purchases decision", icon: ShoppingCart, color: "bg-emerald-500" },
        { name: "Billing", desc: "Simplify and track bills", icon: CreditCard, color: "bg-emerald-500" }
      ]
    },
    {
      group: "Customer Portal",
      items: [
        { name: "Portal", desc: "Secure, user-friendly, reliable", icon: LayoutGrid, color: "bg-emerald-500" }
      ]
    }
  ]
};

function FeaturesTabComponent() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-12 overflow-x-auto pb-4">
        <div className="inline-flex items-center p-1 bg-slate-50 border border-slate-100 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${activeTab === tab.id
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-500 hover:text-primary hover:bg-slate-100"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 transition-all duration-500 min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-16"
          >
            {(featuresData[activeTab as keyof typeof featuresData] || []).length > 0 ? (
              (featuresData[activeTab as keyof typeof featuresData] || []).map((group, groupIdx) => (
                <div key={groupIdx}>
                  <h3 className="text-[30px] font-bold text-gray-900 px-3 pb-6 border-b border-gray-100 mb-8 tracking-tight">
                    {group.group}
                  </h3>
                  <div className="flex flex-wrap items-center -mx-4 gap-y-6">
                    {group.items.map((item: any, itemIdx: number) => (
                      <div key={itemIdx} className="w-full md:w-1/3 px-4">
                        <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl p-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer group">
                          <div className="flex items-center justify-between gap-4">
                            <div className="w-12 h-12 shrink-0 overflow-hidden bg-transparent flex items-center justify-center group-hover:scale-110 transition-transform">
                              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                                <item.icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-lg font-bold text-gray-900 mb-0 leading-none group-hover:text-primary transition-colors">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500 leading-tight mt-1 mb-0">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center text-slate-400 font-medium w-full">
                Select the &quot;All&quot; tab to view all features, or check back later for specific filters.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
