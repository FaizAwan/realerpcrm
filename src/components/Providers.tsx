"use client";

import { SessionProvider } from "next-auth/react";
import NavigationLoader from "./NavigationLoader";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <NavigationLoader />
            {children}
        </SessionProvider>
    );
}
