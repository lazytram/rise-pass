"use client";
interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-white/20 border-t-white`}
      ></div>
      {message && (
        <p className="text-white/60 text-sm font-medium">{message}</p>
      )}
    </div>
  );
}
