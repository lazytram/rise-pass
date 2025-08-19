export interface WalletInfo {
  address: string;
  isConnected: boolean;
}

export interface IWalletService {
  getWalletInfo(): WalletInfo;
  connect(connectorId: string): Promise<void>;
  disconnect(): void;
}
