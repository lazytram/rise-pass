import { ethers } from "ethers";
import {
  IPassportService,
  MintPassportRequest,
  PassportData,
  WalletUpgradeRequest,
} from "../../domain/interfaces/IPassportService";
import {
  PassportMintingService,
  PassportQueryService,
  WalletUpgradeService,
} from "./contracts";

export class PassportContractService implements IPassportService {
  private mintingService: PassportMintingService;
  private queryService: PassportQueryService;
  private walletUpgradeService: WalletUpgradeService;

  constructor(contractAddress: string, provider: ethers.BrowserProvider) {
    this.mintingService = new PassportMintingService(contractAddress, provider);
    this.queryService = new PassportQueryService(contractAddress, provider);
    this.walletUpgradeService = new WalletUpgradeService(
      contractAddress,
      provider
    );
  }

  async mintPassport(request: MintPassportRequest): Promise<PassportData> {
    return this.mintingService.mintPassport(request);
  }

  async checkPassportExists(
    discordId: string,
    roleId: string
  ): Promise<boolean> {
    return this.queryService.checkPassportExists(discordId, roleId);
  }

  async getPassportData(tokenId: string): Promise<PassportData> {
    return this.mintingService.getPassportData(tokenId);
  }

  async updateWalletForDiscord(
    request: WalletUpgradeRequest
  ): Promise<boolean> {
    return this.walletUpgradeService.updateWalletForDiscord(request);
  }

  async canUpgradeWallet(
    discordId: string,
    currentWallet: string
  ): Promise<boolean> {
    return this.queryService.canUpgradeWallet(discordId, currentWallet);
  }

  async getTokenIdByAddressAndDiscord(
    address: string,
    discordId: string,
    roleId: string
  ): Promise<string> {
    return this.queryService.getTokenIdByAddressAndDiscord(
      address,
      discordId,
      roleId
    );
  }
}
