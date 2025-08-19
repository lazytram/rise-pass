import { useState, useCallback } from "react";

interface ToastData {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  txHash?: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (
      message: string,
      type: "success" | "error" | "info" = "info",
      txHash?: string,
      duration?: number
    ) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastData = {
        id,
        message,
        type,
        txHash,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string, txHash?: string) => {
      showToast(message, "success", txHash, 5000); // Longer duration for success
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string) => {
      showToast(message, "error", undefined, 5000);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      showToast(message, "info", undefined, 4000);
    },
    [showToast]
  );

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    removeToast,
  };
}
