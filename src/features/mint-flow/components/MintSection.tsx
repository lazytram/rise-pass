"use client";

import { MintButtonProps } from "../../minting/types";
import { MintButton } from "../../minting";

interface MintSectionProps extends MintButtonProps {
  onMintSuccess?: (data: unknown) => void;
}

export default function MintSection({
  onMintSuccess,
  ...mintButtonProps
}: MintSectionProps) {
  return (
    <div className="space-y-12">
      {/* Minting Section */}
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/25 rounded-3xl p-8 shadow-2xl shadow-black/20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Ready to Mint?</h3>
            <p className="text-white/70 text-base">
              Click the button below to create your RISE Passport NFT
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <MintButton
              {...mintButtonProps}
              onMintSuccess={onMintSuccess}
              noWrapper={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
