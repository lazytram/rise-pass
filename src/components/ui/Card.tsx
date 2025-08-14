import React from "react";

type CardProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`card-surface rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}
