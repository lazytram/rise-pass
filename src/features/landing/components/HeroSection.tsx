"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { DiscordLoginButton, DiscordStatusCard } from "../../auth";
import { ConceptModal } from "../../modals";
import { HeroTitle, ProcessSteps, TrustIndicators } from "./";

export default function HeroSection() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative min-h-[76vh] md:min-h-screen flex items-center justify-center overflow-visible md:overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          {/* Main Content */}
          <div className="space-y-12">
            <HeroTitle />

            {/* Description */}
            <div className="max-w-2xl sm:max-w-4xl mx-auto space-y-6 sm:space-y-8 px-1">
              <p className="text-sm sm:text-lg text-white/70 leading-relaxed">
                Connect your Discord account to verify your community role, then
                link your EVM wallet to mint your personalized RISE Passport
                NFT. Your Discord role becomes a permanent, verifiable digital
                identity on the blockchain.
              </p>

              <ProcessSteps />
            </div>

            {/* CTA Section - Enhanced */}
            <div className="space-y-8">
              {/* If already connected to Discord, show a friendly status card */}
              {session && <DiscordStatusCard session={session} />}

              {/* Only show Discord login button if not connected */}
              {!session && (
                <div className="flex justify-center">
                  <div className="group transform hover:scale-105 transition-transform duration-200">
                    <DiscordLoginButton />
                  </div>
                </div>
              )}

              {/* Learn More Button */}
              <div className="flex justify-center px-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center justify-center px-5 py-3 text-sm sm:text-base font-semibold text-white/80 hover:text-white bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-xl border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <span className="mr-2">Learn More</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <TrustIndicators />
            </div>
          </div>
        </div>

        {/* Concept Modal */}
        <ConceptModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
