import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { riseTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RISE Passport",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "rise-passport-id",
  chains: [riseTestnet],
  ssr: true,
});

export const chains = [riseTestnet];
