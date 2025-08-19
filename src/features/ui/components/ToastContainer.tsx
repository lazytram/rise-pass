"use client";

import Toast from "./Toast";
import { useToastContext } from "../context/ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-[9999] space-y-2 pointer-events-none">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
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
