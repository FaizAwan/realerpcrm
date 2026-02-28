import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "RealERPCRM | Leading Real Estate ERP & Society Management System",
  description: "The ultimate cloud-based CRM/ERP for developers and builders. Manage leads, society maps, inventory, and automated accounting with RealERPCRM.",
  keywords: ["Real Estate ERP", "Property Management Software", "Society Management System", "Real Estate CRM Pakistan", "Plot Management", "Real Estate Accounting"],
  openGraph: {
    title: "RealERPCRM | Professional Real Estate Operations",
    description: "Empowering developers with interactive maps, lead automation, and financial intelligence.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RealERPCRM Dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RealERPCRM | Real Estate Intelligence",
    description: "The complete solution for modern real estate developers.",
    images: ["/og-image.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
