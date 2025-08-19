"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useToast } from "../hooks/useToast";

interface ToastContextType {
  showToast: (
    message: string,
    type?: "success" | "error" | "info",
    txHash?: string,
    duration?: number
  ) => void;
  showSuccess: (message: string, txHash?: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  removeToast: (id: string) => void;
  toasts: Array<{
    id: string;
    message: string;
    type: "success" | "error" | "info";
    txHash?: string;
    duration?: number;
  }>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const toastMethods = useToast();

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}
