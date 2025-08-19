"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { MintButtonProps } from "../types";
import { generatePassportSVG } from "../../passport/services/svg";
import { PassportContractService } from "../../../infrastructure/services/PassportContractService";
import { getContractAddress, getMintingKey } from "../../../lib/config";
import { ethers } from "ethers";
import { MintActionButton } from "../../mint-flow";
import { StatusMessage } from "../../ui";
import { useToastContext } from "../../ui/context/ToastContext";

interface MintButtonComponentProps extends MintButtonProps {
  noWrapper?: boolean;
  onMintSuccess?: (data: unknown) => void;
  mintingKey?: string;
}

export default function MintButton({
  discordId,
  roleId,
  roleName,
  discordUser,
  mappedRoles,
  noWrapper = false,
  onMintSuccess,
  mintingKey,
}: MintButtonComponentProps) {
  const { address, isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useToastContext();

  const handleMint = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!discordId || !roleId || !roleName) {
      setError("Missing required passport data");
      return;
    }

    setIsMinting(true);
    setError(null);

    try {
      const finalContractAddress = getContractAddress();

      if (!finalContractAddress) {
        throw new Error("Contract address is not configured");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const passportService = new PassportContractService(
        finalContractAddress,
        provider
      );

      // Check if passport already exists
      const exists = await passportService.checkPassportExists(
        discordId,
        roleId
      );
      if (exists) {
        setError("Passport already exists for this Discord account");
        return;
      }

      // Generate SVG (using full version)
      const svg = generatePassportSVG({
        discordId,
        mintedAt: Math.floor(Date.now() / 1000),
        username: discordUser?.username || "User",
        primaryRole: {
          roleName: mappedRoles?.primary?.name || "",
          roleId: mappedRoles?.primary?.id || "",
          color: mappedRoles?.primary?.color || "",
        },
        secondaryRoles: mappedRoles?.secondary || [],
      });

      console.log("Frontend generated SVG length:", svg.length);
      console.log("SVG starts with:", svg.substring(0, 100));

      // Mint passport
      const passportData = await passportService.mintPassport({
        discordId,
        roleId,
        roleName,
        toAddress: address,
        svg,
        mintingKey: mintingKey || getMintingKey(),
        contractAddress: finalContractAddress,
      });

      // Show success toast with transaction hash
      if (passportData && passportData.hash) {
        showSuccess("RISE Passport minted successfully! 🎉", passportData.hash);
      } else {
        showSuccess("RISE Passport minted successfully! 🎉");
      }

      if (onMintSuccess) {
        onMintSuccess(passportData);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Minting failed";
      setError(errorMessage);
      showError("Minting failed");
    } finally {
      setIsMinting(false);
    }
  };

  const buttonContent = (
    <MintActionButton
      onClick={handleMint}
      disabled={!isConnected || !discordId || !roleId || !roleName}
      isLoading={isMinting}
    >
      Mint RISE Passport
    </MintActionButton>
  );

  const wrapperClass = noWrapper ? "space-y-4" : "max-w-md mx-auto space-y-6";

  return (
    <div className={wrapperClass}>
      {buttonContent}
      {error && (
        <StatusMessage
          type="error"
          title="Minting Failed"
          message={error}
          maxHeight="max-h-48"
        />
      )}
    </div>
  );
}
