export interface TransactionStatus {
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: Error | null;
  hash: string | null;
}

export interface ITransactionService {
  getTransactionStatus(): TransactionStatus;
  resetTransactionStatus(): void;
}
