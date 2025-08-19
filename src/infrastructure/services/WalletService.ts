import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  IWalletService,
  WalletInfo,
} from "../../domain/interfaces/IWalletService";

export function useWalletService(): IWalletService {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const getWalletInfo = (): WalletInfo => {
    return {
      address: address || "",
      isConnected: isConnected || false,
    };
  };

  const connectWallet = async (connectorId: string) => {
    const connector = connectors.find((c) => c.id === connectorId);
    if (connector) {
      await connect({ connector });
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return {
    getWalletInfo,
    connect: connectWallet,
    disconnect: disconnectWallet,
  };
}
