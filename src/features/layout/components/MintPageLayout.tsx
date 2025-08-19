"use client";

import { GradientText } from "../../../shared/components";

interface MintPageLayoutProps {
  children: React.ReactNode;
}

export default function MintPageLayout({ children }: MintPageLayoutProps) {
  return (
    <div className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-visible md:overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header with enhanced styling */}
        <div className="mb-16 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight">
              <GradientText>RISE Passport</GradientText>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
              Your digital passport on the fastest blockchain built for speed
            </p>
          </div>
        </div>

        {/* Main Content with enhanced spacing */}
        <div className="space-y-10 sm:space-y-14 animate-fade-in-up px-2 sm:px-0">
          {children}
        </div>
      </div>
    </div>
  );
}
