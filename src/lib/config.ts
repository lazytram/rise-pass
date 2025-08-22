import { riseTestnet } from "wagmi/chains";

function getRpcUrl(): string {
  // Prefer server-only env when available
  const serverUrl = process.env.RPC_URL?.trim();
  if (serverUrl) return serverUrl;

  // Fallback to public env (only if you explicitly want to expose it)
  const publicUrl = process.env.NEXT_PUBLIC_RPC_URL?.trim();
  if (publicUrl) return publicUrl;

  // Default from the chain definition
  return riseTestnet.rpcUrls.default.http[0];
}

export const CONFIG = {
  APP_NAME: "RISE Passport",
  NETWORKS: {
    RISE_TESTNET: {
      id: riseTestnet.id,
      name: "Rise Testnet",
      rpcUrl: getRpcUrl(),
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
