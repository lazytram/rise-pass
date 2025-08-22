// Global type declarations for the EIP-1193 provider injected by wallets

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider;
  }
}

export {};
