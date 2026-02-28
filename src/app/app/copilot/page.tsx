"use client";

import { useState, useRef, useEffect } from "react";
import {
    Cpu,
    Send,
    Mic,
    History,
    TrendingUp,
    AlertCircle,
    FileBarChart,
    Wallet,
    Calendar,
    Loader2,
    CheckCircle2,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function CopilotPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I'm RealERPCRM Copilot. I've analyzed your current projects and finances. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/realerpcrm/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    context: {
                        projectName: "Northern Greens",
                        totalRevenue: "Rs 45.2M",
                        collectionRate: "82%",
                        overdue: "Rs 4.1M",
                    }
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, data]);
        } catch (err: any) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `⚠️ Error: ${err.message}. Please ensure your API key is configured.`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-lg m-0 p-0 font-semibold text-slate-800 flex items-center gap-3  tracking-tight">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Cpu className="w-6 h-6 text-white" />
                        </div>
                        RealERPCRM Copilot
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium ">Your AI Strategic Partner for Real Estate Growth</p>
                </motion.div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-primary transition-all shadow-sm">
                        <History className="w-4 h-4" />
                        Chat History
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-wide shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        <Sparkles className="w-4 h-4" />
                        New Strategy
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                {/* Chat Section */}
                <div className="lg:col-span-2 flex flex-col bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
                    <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={cn(
                                        "flex gap-3 p-3 rounded-xl relative group transition-all",
                                        msg.role === 'assistant'
                                            ? "bg-primary/5 mr-12 border border-primary/10 rounded-tl-none"
                                            : "bg-slate-50 ml-12 border border-slate-100 rounded-tr-none"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                                        msg.role === 'assistant' ? "bg-primary text-white" : "bg-secondary text-white"
                                    )}>
                                        {msg.role === 'assistant' ? <Cpu className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-semibold uppercase tracking-normal mb-1 opacity-50">
                                            {msg.role === 'assistant' ? "RealERPCRM Copilot" : "You"}
                                        </p>
                                        <div className="text-xs leading-tight text-slate-700 font-medium  whitespace-pre-wrap">
                                            {msg.role === 'assistant' ? (
                                                <div className="prose prose-sm prose-indigo max-w-none ">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    </div>

                                    {msg.role === 'assistant' && (
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <CheckCircle2 className="w-3 h-3 text-primary" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-3 p-3 bg-primary/5 mr-12 rounded-xl rounded-tl-none border border-primary/10"
                            >
                                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                </div>
                                <div className="flex flex-col gap-1 py-1">
                                    <span className="text-[9px] font-bold uppercase tracking-wide opacity-50">Thinking...</span>
                                    <div className="flex gap-1">
                                        <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-50 bg-[#fafbfc]">
                        <div className="relative max-w-4xl mx-auto">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Consult your AI partner..."
                                className="w-full pl-10 pr-4 py-1.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs font-medium shadow-sm "
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                    <Mic className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading}
                                    className="p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real-time Insights Sidebar */}
                <div className="space-y-8 overflow-y-auto pb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-secondary p-8 rounded-xl text-white shadow-md shadow-secondary/30 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rotate-45 translate-x-16 -translate-y-16 rounded-full blur-3xl" />

                        <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-normal mb-4">Live Performance</p>
                        <h4 className="text-xl m-0 p-0 font-semibold mb-1  tracking-normal">Rs 45.2M</h4>
                        <p className="text-sm text-primary font-bold flex items-center gap-2 mb-8">
                            <TrendingUp className="w-4 h-4" />
                            +14% GROWTH
                        </p>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <Wallet className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-xs font-bold ">RECOVERIES</span>
                                </div>
                                <span className="text-sm font-semibold">82%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-accent" />
                                    </div>
                                    <span className="text-xs font-bold ">OVERDUE</span>
                                </div>
                                <span className="text-sm font-semibold text-accent tracking-tight">Rs 4.1M</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-xl border border-slate-100 shadow-xl shadow-slate-100/50"
                    >
                        <h5 className="font-semibold text-slate-800 mb-6 flex items-center gap-3  uppercase text-sm tracking-wider">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-primary" />
                            </div>
                            Recommendations
                        </h5>
                        <div className="space-y-2">
                            {[
                                "12 high-priority follow-ups",
                                "Expense anomalies detected",
                                "High conversion lead: 'Sara'",
                            ].map((rec, i) => (
                                <div key={i} className="flex gap-4 text-xs font-bold  leading-relaxed text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 transition-all cursor-pointer group">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 group-hover:scale-150 transition-transform" />
                                    {rec}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <button className="w-full py-2.5 bg-primary/5 text-primary border-2 border-primary/20 rounded-xl font-semibold text-xs uppercase tracking-normal hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-500 flex items-center justify-center gap-3 group">
                        <FileBarChart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Generate Intelligence
                    </button>
                </div>
            </div>
        </div>
    );
}
