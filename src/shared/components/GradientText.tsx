interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-[#7967e5] via-[#ffa0f2] to-[#ffc393] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
