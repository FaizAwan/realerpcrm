"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        setProgress(0);

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + Math.random() * 30;
            });
        }, 100);

        // Complete loading
        setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsLoading(false);
            }, 200);
        }, 500);

        return () => clearInterval(interval);
    }, [pathname]);

    return (
        <>
            {/* Top Progress Bar */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent"
                    >
                        {/* Background track */}
                        <div className="absolute inset-0 bg-slate-200/50" />
                        {/* Progress bar */}
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary via-emerald-400 to-cyan-400"
                            style={{ width: `${progress}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeInOut" }}
                        />
                        {/* Glow effect */}
                        <motion.div
                            className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white/30 to-transparent"
                            animate={{
                                x: [0, 200],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Content with Fade Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    );
}
