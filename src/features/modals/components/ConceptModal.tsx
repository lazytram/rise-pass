"use client";

import { useEffect } from "react";

interface ConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConceptModal({ isOpen, onClose }: ConceptModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">
            RISE Passport Concept
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white/80 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6 text-white/80">
          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              What is RISE Passport?
            </h3>
            <p className="leading-relaxed">
              RISE Passport is a soulbound NFT that serves as your digital
              identity within the RISE ecosystem. It&apos;s permanently linked
              to your Discord account and represents your role and contributions
              to the community.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Key Features
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong>Soulbound:</strong> Cannot be transferred or sold -
                it&apos;s permanently yours
              </li>
              <li>
                <strong>Discord Integration:</strong> Automatically reflects
                your Discord roles and permissions
              </li>
              <li>
                <strong>Dynamic:</strong> Updates automatically when your
                Discord roles change
              </li>
              <li>
                <strong>Verifiable:</strong> Proof of your community membership
                and contributions
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              How It Works
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Connect Discord</h4>
                  <p className="text-sm">
                    Verify your Discord account and community membership
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ffa0f2] to-[#ffc393] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Connect Wallet</h4>
                  <p className="text-sm">
                    Link your EVM wallet to receive your NFT
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ffc393] to-[#7967e5] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Mint Passport</h4>
                  <p className="text-sm">
                    Create your unique digital identity on the blockchain
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Technical Details
            </h3>
            <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
              <p>
                <strong>Blockchain:</strong> RISE
              </p>
              <p>
                <strong>Standard:</strong> ERC-721 (Soulbound)
              </p>
              <p>
                <strong>Metadata:</strong> On-chain SVG with Discord integration
              </p>
              <p>
                <strong>Upgrades:</strong> Automatic role-based updates
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] text-white rounded-xl hover:from-[#7967e5]/90 hover:to-[#ffa0f2]/90 transition-all"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
