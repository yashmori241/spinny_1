import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { ToastProvider } from "@/components/ui/Toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spinny — Find Your Perfect Car. Guaranteed.",
  description:
    "India's most trusted certified used car platform. Browse 10,000+ quality-checked cars with 5-day money-back guarantee, free RC transfer, and home delivery.",
  keywords: ["used cars", "certified cars", "buy car", "sell car", "Spinny", "India"],
  openGraph: {
    title: "Spinny — Find Your Perfect Car. Guaranteed.",
    description:
      "India's most trusted certified used car platform. Browse 10,000+ quality-checked cars.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <LenisProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <ToastProvider>
            <main>{children}</main>
          </ToastProvider>
          <Footer />
          <LoadingScreen />
        </LenisProvider>
      </body>
    </html>
  );
}
