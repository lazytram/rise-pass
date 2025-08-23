import { ethers } from "ethers";
import { CONFIG, getContractAddress } from "@/lib/config";
import { RISE_PASSPORT_ABI } from "@/lib/contracts/abis";

export type RoleCount = Record<string, number>;
export type RoleLabels = Record<string, string>;
export type CountsResult = { counts: RoleCount; labels: RoleLabels };

const baseUrl = "https://explorer.testnet.riselabs.xyz/api";
const baseUrlV2 = baseUrl.endsWith("/api")
  ? baseUrl.replace(/\/api$/, "/api/v2")
  : `${baseUrl}/v2`;

export async function fetchTotalPassports(params?: {
  rpcUrl?: string;
  contractAddress?: string;
}): Promise<number> {
  const rpcUrl = params?.rpcUrl || CONFIG.NETWORKS.RISE_TESTNET.rpcUrl;
  const contractAddress = params?.contractAddress || getContractAddress();
  if (!contractAddress) return 0;

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  const contract = new ethers.Contract(
    contractAddress,
    RISE_PASSPORT_ABI as unknown as ethers.InterfaceAbi,
    provider
  );
  const totalSupply = await contract.totalSupply();
  return Number(totalSupply);
}

export async function fetchUniqueHolders(): Promise<number> {
  const addr = getContractAddress();
  if (!addr) return 0;
  const contractAddress = addr.toLowerCase();

  // Try Blockscout v2 counters first

  const countersUrl = `${baseUrlV2}/tokens/${contractAddress}/counters`;
  const countersRes = await fetch(countersUrl, {
    headers: { accept: "application/json" },
  });

  const countersJson = (await countersRes.json()) as {
    token_holders_count?: string;
    transfers_count?: string;
  };
  const raw = countersJson?.token_holders_count ?? "";

  return Number(raw);
}
