"use client";

import { useState } from "react";
import { MintButtonProps } from "../../minting/types";
import MintSection from "./MintSection";
import MintProcessSteps from "./MintProcessSteps";
import NoRoleMessage from "./NoRoleMessage";
import { WalletConnectionSection } from "../../wallet";
import { useAccount } from "wagmi";
import { usePassportExistence } from "../../../application/hooks/usePassportExistence";
import { ExistingPassportView } from "../../passport-view";
import { LoadingSpinner, LoadingState } from "../../ui";

interface MintFlowContainerProps extends MintButtonProps {
  onMintSuccess?: (data: unknown) => void;
  hasEligibleRole: boolean;
}

export default function MintFlowContainer({
  hasEligibleRole,
  onMintSuccess,
  ...mintButtonProps
}: MintFlowContainerProps) {
  const { isConnected } = useAccount();
  const [isMintSuccess, setIsMintSuccess] = useState(false);
  const { passportExists, isChecking, tokenId, refreshExistence } =
    usePassportExistence(
      mintButtonProps.discordId || "",
      mintButtonProps.roleId || ""
    );

  const handleMintSuccess = async (data: unknown) => {
    setIsMintSuccess(true);

    // Refresh the existence check immediately
    await refreshExistence();

    if (onMintSuccess) {
      onMintSuccess(data);
    }
  };

  if (!hasEligibleRole) {
    return <NoRoleMessage />;
  }

  // Show loading state after successful mint
  if (isMintSuccess && !passportExists) {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative">
            <LoadingSpinner size="lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Minting Successful! 🎉
            </h2>
            <p className="text-white/80 text-lg max-w-md mx-auto">
              Your RISE Passport is being created on the blockchain...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // General loading while checking existing passport status
  if (isConnected && isChecking) {
    return <LoadingState message="Checking your passport..." />;
  }

  // If we already minted, show the existing passport view
  if (isConnected && !isChecking && passportExists) {
    return (
      <ExistingPassportView
        discordUser={mintButtonProps.discordUser || null}
        discordMember={mintButtonProps.discordMember || null}
        roleName={mintButtonProps.roleName || ""}
        roleId={mintButtonProps.roleId || ""}
        discordId={mintButtonProps.discordId || ""}
        mappedRoles={mintButtonProps.mappedRoles}
        tokenId={tokenId}
      />
    );
  }

  // Show minting flow (default case)
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Process Steps */}
      <div className="animate-fade-in-up-large">
        <MintProcessSteps />
      </div>

      {/* Wallet Connection */}
      <div className="animate-fade-in-up-delay-200">
        <WalletConnectionSection isConnected={isConnected} />
      </div>

      {/* Mint Section */}
      {isConnected && (
        <div className="animate-fade-in-up-delay-400">
          <MintSection {...mintButtonProps} onMintSuccess={handleMintSuccess} />
        </div>
      )}
    </div>
  );
}
