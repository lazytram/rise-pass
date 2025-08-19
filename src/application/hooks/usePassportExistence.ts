import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { PassportContractService } from "../../infrastructure/services/PassportContractService";
import { getContractAddress } from "../../lib/config";

export function usePassportExistence(discordId: string, roleId: string) {
  const [passportExists, setPassportExists] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const checkExistingPassport = async () => {
      if (!isConnected || !address || !discordId || !roleId) {
        setPassportExists(false);
        setIsChecking(false);
        return;
      }

      try {
        const contractAddress = getContractAddress();

        if (!contractAddress) {
          setPassportExists(false);
          setIsChecking(false);
          return;
        }

        const { BrowserProvider } = await import("ethers");
        const provider = new BrowserProvider(window.ethereum);
        const passportService = new PassportContractService(
          contractAddress,
          provider
        );

        const exists = await passportService.checkPassportExists(
          discordId,
          roleId
        );

        setPassportExists(exists);

        // If passport exists, get the token ID
        if (exists) {
          try {
            const tokenIdResult =
              await passportService.getTokenIdByAddressAndDiscord(
                address,
                discordId,
                roleId
              );
            setTokenId(tokenIdResult);
          } catch (error) {
            console.error("Error getting token ID:", error);
          }
        }
      } catch (error) {
        console.error("Error checking passport existence:", error);
        setPassportExists(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingPassport();
  }, [isConnected, address, discordId, roleId]);

  const refreshExistence = () => {
    setIsChecking(true);
    setPassportExists(false);
    setTokenId(null);

    // Force a re-check after a short delay to allow blockchain to update
    setTimeout(() => {
      const checkExistingPassport = async () => {
        if (!isConnected || !address || !discordId || !roleId) {
          setIsChecking(false);
          return;
        }

        try {
          const contractAddress = getContractAddress();
          console.log("Contract address in refreshExistence:", contractAddress);

          if (!contractAddress) {
            console.error("Contract address is empty in refreshExistence");
            setIsChecking(false);
            return;
          }

          const { BrowserProvider } = await import("ethers");
          const provider = new BrowserProvider(window.ethereum);
          const passportService = new PassportContractService(
            contractAddress,
            provider
          );

          const exists = await passportService.checkPassportExists(
            discordId,
            roleId
          );
          setPassportExists(exists);

          // If passport exists, get the token ID
          if (exists) {
            try {
              const tokenIdResult =
                await passportService.getTokenIdByAddressAndDiscord(
                  address,
                  discordId,
                  roleId
                );
              setTokenId(tokenIdResult);
            } catch (error) {
              console.error("Error getting token ID:", error);
            }
          }
        } catch (error) {
          console.error("Error checking passport existence:", error);
          setPassportExists(false);
        } finally {
          setIsChecking(false);
        }
      };

      checkExistingPassport();
    }, 2000); // Wait 2 seconds for blockchain to update
  };

  return {
    passportExists,
    isChecking,
    tokenId,
    refreshExistence,
  };
}
