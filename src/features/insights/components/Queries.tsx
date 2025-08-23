"use client";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTotalPassports,
  fetchUniqueHolders,
} from "@/infrastructure/services/contracts";

const REFRESH_INTERVAL = 600_000;

export function useTotalMintedQuery() {
  return useQuery<number>({
    queryKey: ["insights", "totalMinted"],
    queryFn: async () => fetchTotalPassports(),
    refetchOnMount: true,
    refetchInterval: REFRESH_INTERVAL,
  });
}

export function useUniqueHoldersQuery() {
  return useQuery<number>({
    queryKey: ["insights", "uniqueHolders"],
    queryFn: async () => fetchUniqueHolders(),
    refetchOnMount: true,
    refetchInterval: REFRESH_INTERVAL,
    retry: 2,
    refetchOnWindowFocus: false,
    gcTime: 30 * 60 * 1000,
  });
}
