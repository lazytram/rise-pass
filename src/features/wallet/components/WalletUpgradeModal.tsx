"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { PassportContractService } from "../../../infrastructure/services/PassportContractService";
import { getContractAddress } from "../../../lib/config";
import { ethers } from "ethers";

interface WalletUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  discordId: string;
  onUpgradeSuccess?: () => void;
}

export default function WalletUpgradeModal({
  isOpen,
  onClose,
  discordId,
  onUpgradeSuccess,
}: WalletUpgradeModalProps) {
  const { address, isConnected } = useAccount();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    setIsUpgrading(true);
    setError(null);

    try {
      const contractAddress = getContractAddress();

      if (!contractAddress) {
        throw new Error("Contract address is not configured");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const passportService = new PassportContractService(
        contractAddress,
        provider
      );

      const canUpgrade = await passportService.canUpgradeWallet(
        discordId,
        address
      );

      if (!canUpgrade) {
        setError("You are not eligible for wallet upgrade");
        return;
      }

      await passportService.updateWalletForDiscord({
        discordId,
        currentWalletAddress: address,
        newWalletAddress: address,
      });

      setSuccess(true);
      if (onUpgradeSuccess) {
        onUpgradeSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upgrade failed");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-4">Upgrade Wallet</h3>

        <p className="text-white/70 text-sm mb-6">
          Update your wallet address for Discord ID: {discordId}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
            Wallet upgraded successfully!
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-white/60 hover:text-white/80 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            disabled={isUpgrading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpgrade}
            disabled={isUpgrading || !isConnected}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] text-white rounded-lg hover:from-[#7967e5]/90 hover:to-[#ffa0f2]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpgrading ? "Upgrading..." : "Upgrade"}
          </button>
        </div>
      </div>
    </div>
  );
}
