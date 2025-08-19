import { ethers } from "ethers";
import { RISE_PASSPORT_ABI } from "@/lib/contracts/abis";

export class PassportQueryService {
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

  async checkPassportExists(
    discordId: string,
    roleId: string
  ): Promise<boolean> {
    try {
      const signer = await this.provider.getSigner();
      const address = await signer.getAddress();
      return await this.contract.passportExists(address, discordId, roleId);
    } catch (error) {
      console.error("Error checking passport existence:", error);
      return false;
    }
  }

  async getTokenIdByAddressAndDiscord(
    address: string,
    discordId: string,
    roleId: string
  ): Promise<string> {
    try {
      const tokenId = await this.contract.getTokenIdByAddressAndDiscord(
        address,
        discordId,
        roleId
      );
      return tokenId.toString();
    } catch (error) {
      console.error("Error getting token ID:", error);
      throw error;
    }
  }

  async canUpgradeWallet(
    discordId: string,
    currentWallet: string
  ): Promise<boolean> {
    try {
      const registeredAddress = await this.contract.getAddressByDiscord(
        discordId
      );
      return registeredAddress.toLowerCase() === currentWallet.toLowerCase();
    } catch (error) {
      console.error("Error checking wallet upgrade eligibility:", error);
      return false;
    }
  }
}
