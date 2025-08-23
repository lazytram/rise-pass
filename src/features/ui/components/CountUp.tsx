"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  durationMs?: number;
  className?: string;
  locale?: string;
};

export default function CountUp({
  value,
  durationMs = 800,
  className,
  locale = "en-US",
}: Props) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);
  const targetRef = useRef(value);

  useEffect(() => {
    // capture the current displayed value as the start for smooth transition
    fromRef.current = display;
    targetRef.current = value;
    startRef.current = null;

    let raf = 0;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(
        fromRef.current + (targetRef.current - fromRef.current) * eased
      );
      setDisplay(current);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs, display]);

  return (
    <span className={className}>
      {Intl.NumberFormat(locale).format(display)}
    </span>
  );
}
