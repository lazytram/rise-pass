import { ethers } from "ethers";
import { CONFIG, getContractAddress } from "@/lib/config";
import { RISE_PASSPORT_ABI } from "@/lib/contracts/abis";

export type RoleCount = Record<string, number>;
export type RoleLabels = Record<string, string>;
export type CountsResult = { counts: RoleCount; labels: RoleLabels };

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
