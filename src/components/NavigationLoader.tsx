"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationLoader() {
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(false);
    }, [pathname]);

    useEffect(() => {
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            if (href.startsWith('http') && !href.includes(window.location.host)) return;

            const currentPath = window.location.pathname;
            // Strict match handling for query params isn't fully covered here but covers basic paths
            if (href === currentPath || href === currentPath + '/') return;

            setIsNavigating(true);
        };

        // Listen for all clicks that might intuitively be navigations
        document.addEventListener('click', handleLinkClick, true);
        return () => document.removeEventListener('click', handleLinkClick, true);
    }, []);

    return (
        <AnimatePresence>
            {isNavigating && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[9999] origin-left shadow-[0_0_10px_rgba(var(--primary),0.8)] pointer-events-none"
                />
            )}
        </AnimatePresence>
    );
}
