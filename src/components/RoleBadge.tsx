import React from "react";

type Props = {
  roleName: string;
  color?: string; // hex or css color
  description?: string;
};

export default function RoleBadge({ roleName, color, description }: Props) {
  const bg = color || "#7967e5";
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
        style={{
          color: bg,
          background: `radial-gradient(circle at 20% 20%, ${bg}22 0, ${bg}10 45%, transparent 60%)`,
          border: `1px solid ${bg}55`,
          boxShadow: `inset 0 8px 16px ${bg}15, 0 1px 0 rgba(255,255,255,0.2)`,
          WebkitBackdropFilter: "blur(6px)",
          backdropFilter: "blur(6px)",
          textShadow: "none",
        }}
      >
        {roleName}
      </span>
      {description ? (
        <span className="text-xs text-white/60">{description}</span>
      ) : null}
    </div>
  );
}
