import { riseTestnet } from "wagmi/chains";

export const CONFIG = {
  APP_NAME: "RISE Passport",
  NETWORKS: {
    RISE_TESTNET: {
      id: riseTestnet.id, // Utiliser l'ID correct du testnet Rise
      name: "Rise Testnet",
      rpcUrl: riseTestnet.rpcUrls.default.http[0], // Utiliser le même RPC que wagmi
      explorer: "https://explorer.testnet.riselabs.xyz",
    },
  },
  CONTRACTS: {
    RISE_PASSPORT: {
      name: "RISE Passport",
      symbol: "RISEPASS",
    },
  },
  SOCIAL_LINKS: {
    GITHUB: "https://github.com/lazytram/rise-pass",
    X: "https://x.com/c_nitram_",
  },
} as const;

export function getContractAddress(): string {
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  if (!address) {
    console.error(
      "NEXT_PUBLIC_CONTRACT_ADDRESS environment variable is not set"
    );
    return "";
  }

  // Basic Ethereum address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    console.error("Invalid contract address format:", address);
    return "";
  }

  return address;
}

export function getExplorerUrl(tokenId?: string): string {
  const contractAddress = getContractAddress();
  if (tokenId) {
    return `https://explorer.testnet.riselabs.xyz/token/${contractAddress}/instance/${tokenId}`;
  }
  return `https://explorer.testnet.riselabs.xyz/address/${contractAddress}`;
}

export const getMintingKey = (): string => {
  return process.env.MINTING_KEY || "";
};

export const getWalletConnectProjectId = (): string => {
  return process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "your-project-id";
};
