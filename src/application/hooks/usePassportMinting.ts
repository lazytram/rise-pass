import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { PassportContractService } from "../../infrastructure/services/PassportContractService";
import {
  MintPassportRequest,
  PassportData,
} from "../../domain/interfaces/IPassportService";
import { getContractAddress } from "../../lib/config";

export function usePassportMinting() {
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const { address } = useAccount();

  const mintPassport = useCallback(
    async (
      request: Omit<MintPassportRequest, "toAddress">
    ): Promise<PassportData> => {
      if (!address) {
        throw new Error("Wallet not connected");
      }

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("Ethereum provider not available");
      }

      setIsMinting(true);
      setError(null);
      setSuccess(false);

      try {
        const contractAddress = getContractAddress();

        if (!contractAddress) {
          throw new Error("Contract address is not configured");
        }

        const { BrowserProvider } = await import("ethers");
        const provider = new BrowserProvider(window.ethereum);
        const passportService = new PassportContractService(
          contractAddress,
          provider
        );

        const fullRequest: MintPassportRequest = {
          ...request,
          toAddress: address,
        };

        const result = await passportService.mintPassport(fullRequest);
        setSuccess(true);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        throw error;
      } finally {
        setIsMinting(false);
      }
    },
    [address]
  );

  const checkPassportExists = useCallback(
    async (discordId: string, roleId: string): Promise<boolean> => {
      if (!address) {
        throw new Error("Wallet not connected");
      }

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("Ethereum provider not available");
      }

      try {
        const contractAddress = getContractAddress();
        console.log(
          "Contract address in checkPassportExists:",
          contractAddress
        );

        if (!contractAddress) {
          throw new Error("Contract address is not configured");
        }

        const { BrowserProvider } = await import("ethers");
        const provider = new BrowserProvider(window.ethereum);
        const passportService = new PassportContractService(
          contractAddress,
          provider
        );

        return await passportService.checkPassportExists(discordId, roleId);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        throw error;
      }
    },
    [address]
  );

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    mintPassport,
    checkPassportExists,
    isMinting,
    error,
    success,
    resetState,
  };
}
