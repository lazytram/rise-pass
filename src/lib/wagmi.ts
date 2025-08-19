import { createConfig, http } from "wagmi";
import { riseTestnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [riseTestnet],
  connectors: [
    injected(),
    walletConnect({
      projectId:
        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "your-project-id",
    }),
  ],
  transports: {
    [riseTestnet.id]: http(riseTestnet.rpcUrls.default.http[0]),
  },
});

export const chains = [riseTestnet];
