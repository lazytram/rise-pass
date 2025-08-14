"use client";

import React from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary:
      "text-black bg-white hover:bg-neutral-200 dark:text-white dark:bg-[rgba(255,255,255,0.08)] dark:hover:bg-[rgba(255,255,255,0.12)]",
    secondary:
      "text-white border border-white/15 bg-black/20 hover:bg-black/30",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
