"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SpotlightCard({ children, className, ...props }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10", className)}
      {...props}
    >
        <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500"
            style={{
                opacity,
                background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.15), transparent 80%)`,
            }}
        />
        {children}
    </div>
  );
}
