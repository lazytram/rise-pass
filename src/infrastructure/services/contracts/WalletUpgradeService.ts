import { ethers } from "ethers";
import { WalletUpgradeRequest } from "../../../domain/interfaces/IPassportService";
import { RISE_PASSPORT_ABI } from "../../../lib/contracts/abis";

export class WalletUpgradeService {
  private provider: ethers.BrowserProvider;
  private contract: ethers.Contract;

  constructor(contractAddress: string, provider: ethers.BrowserProvider) {
    this.provider = provider;
    this.contract = new ethers.Contract(
      contractAddress,
      RISE_PASSPORT_ABI,
      provider
    );
  }

  async updateWalletForDiscord(
    request: WalletUpgradeRequest
  ): Promise<boolean> {
    try {
      const signer = await this.provider.getSigner();
      const contractWithSigner = this.contract.connect(signer);

      // Verify the current wallet matches
      const currentAddress = await signer.getAddress();
      if (
        currentAddress.toLowerCase() !==
        request.currentWalletAddress.toLowerCase()
      ) {
        throw new Error("Current wallet address does not match");
      }

      const updateWalletForDiscordFn = (
        contractWithSigner as unknown as {
          updateWalletForDiscord: (
            discordId: string,
            newWalletAddress: string
          ) => Promise<ethers.TransactionResponse>;
        }
      ).updateWalletForDiscord;

      const tx = await updateWalletForDiscordFn(
        request.discordId,
        request.newWalletAddress
      );

      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error updating wallet:", error);
      throw error;
    }
  }
}
