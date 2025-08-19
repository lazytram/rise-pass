import { ethers } from "ethers";
import {
  MintPassportRequest,
  PassportData,
} from "../../../domain/interfaces/IPassportService";
import { RISE_PASSPORT_ABI } from "../../../lib/contracts/abis";
import { generatePassportSVG } from "../../../features/passport/services/svg";
import { getAllRoles } from "../../../lib/discordRoleMap";

export class PassportMintingService {
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

  async mintPassport(request: MintPassportRequest): Promise<PassportData> {
    const signer = await this.provider.getSigner();
    const connected = this.contract.connect(signer);

    // Use provided data (now required)
    const discordId = request.discordId;
    const roleId = request.roleId;
    const roleName = request.roleName;

    // Use the SVG provided in the request, or generate a fallback
    let svgData = request.svg;

    if (!svgData || svgData.length === 0) {
      // Only generate SVG if none provided
      const allRoles = getAllRoles();
      const roleInfo = allRoles.find((role) => role.id === roleId);
      const roleColor = roleInfo?.color || "#7967e5";

      const passportDataForSVG = {
        discordId,
        mintedAt: Math.floor(Date.now() / 1000),
        username: request.username || "User",
        primaryRole: {
          roleName: request.roleName,
          roleId: request.roleId,
          color: roleColor,
        },
        secondaryRoles: request.secondaryRoles || [],
      };
      svgData = generatePassportSVG(passportDataForSVG);
    }

    // Generate token URI
    const tokenURI = this.generateTokenURI(svgData, {
      tokenId: "0", // Will be updated after mint
      discordId,
      roleId,
      roleName,
      mintedAt: Math.floor(Date.now() / 1000),
    });

    const mintFn = (
      connected as unknown as {
        mint: (
          to: string,
          discordId: string,
          roleId: string,
          roleName: string,
          mintingKey: string,
          svgData: string,
          tokenURI: string
        ) => Promise<ethers.TransactionResponse>;
      }
    ).mint;

    const tx = await mintFn(
      request.toAddress,
      discordId,
      roleId,
      roleName,
      request.mintingKey,
      svgData,
      tokenURI
    );

    const receipt = await tx.wait();

    // Parse the event to get the token ID
    const event = receipt?.logs.find((log: ethers.Log) => {
      try {
        const parsed = this.contract.interface.parseLog(log);
        return parsed?.name === "PassportMinted";
      } catch {
        return false;
      }
    });

    if (event) {
      const parsed = this.contract.interface.parseLog(event);
      const tokenId = parsed?.args[0];

      // Verify the data was stored correctly
      const passportData = await this.getPassportData(tokenId.toString());

      // Add transaction hash to the passport data
      return {
        ...passportData,
        hash: tx.hash,
      };
    }

    // If event not found, try to get the token ID from the transaction
    console.warn("PassportMinted event not found in transaction logs");

    // For now, return a basic PassportData structure
    // In a production environment, you might want to query the contract for the latest token ID
    throw new Error(
      `Failed to mint passport. Transaction hash: ${tx.hash}. Check transaction logs for details.`
    );
  }

  async getPassportData(tokenId: string): Promise<PassportData> {
    const data = await this.contract.getPassportData(tokenId);
    return {
      tokenId: tokenId,
      discordId: data.discordId,
      roleId: data.roleId,
      roleName: data.roleName,
      mintedAt: Number(data.mintedAt),
    };
  }

  async getTokenURI(tokenId: string): Promise<string> {
    const uri = await this.contract.tokenURI(tokenId);
    return uri;
  }

  async getStoredSVG(tokenId: string): Promise<string> {
    const svg = await this.contract.getTokenSVG(tokenId);
    return svg;
  }

  private generateTokenURI(
    svgData: string,
    passportData: PassportData
  ): string {
    const json = {
      name: `RISE Passport #${passportData.tokenId}`,
      description: `RISE Passport NFT - A digital identity token representing membership in the RISE community.\n\nThis soulbound token serves as proof of your role and contribution within the RISE ecosystem. Each passport is permanently linked to your Discord identity and cannot be transferred, ensuring authentic representation of your place in our community.\n\nRole: ${passportData.roleName}\n\nThis passport represents your unique contribution to the RISE community and serves as a permanent record of your membership.`,
      image: `data:image/svg+xml;base64,${btoa(svgData)}`,
      attributes: [
        { trait_type: "Role", value: passportData.roleName },
        { trait_type: "Discord ID", value: passportData.discordId },
        { trait_type: "Role ID", value: passportData.roleId },
        { trait_type: "Minted At", value: passportData.mintedAt.toString() },
      ],
      external_url: "https://rise-pass.vercel.app",
      background_color: "000000",
    };

    return `data:application/json;base64,${btoa(JSON.stringify(json))}`;
  }
}
