import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AnimatedBackground from "../features/landing/components/AnimatedBackground";
import ToastContainer from "../features/ui/components/ToastContainer";
import { ToastProvider } from "../features/ui/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RISE Passport",
  description:
    "Start your journey across the RISE ecosystem on RiseChain — mint your RISE Passport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative`}
      >
        <Providers>
          <ToastProvider>
            {/* Animated Background for entire page */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <AnimatedBackground />
            </div>

            <div className="relative z-10">
              <Navigation />
              <div className="mx-auto max-w-5xl px-6 pt-16">{children}</div>
              <Footer />
            </div>

            {/* Toast Container */}
            <ToastContainer />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
