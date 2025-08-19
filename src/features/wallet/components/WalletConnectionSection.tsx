"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

interface WalletConnectionSectionProps {
  isConnected: boolean;
}

export default function WalletConnectionSection({
  isConnected,
}: WalletConnectionSectionProps) {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
        <ConnectButton />
      </div>
      {!isConnected && (
        <p className="text-white/60 text-sm">
          Connect your wallet to mint your RISE Passport
        </p>
      )}
    </div>
  );
}
