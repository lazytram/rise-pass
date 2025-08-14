import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GradientText({ children, className = "" }: Props) {
  return <span className={`rise-gradient-text ${className}`}>{children}</span>;
}
