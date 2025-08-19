"use client";

import Toast from "./Toast";
import { useToastContext } from "../context/ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            transform: `translateY(${-index * 80}px)`,
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            txHash={toast.txHash}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        </div>
      ))}
    </div>
  );
}
