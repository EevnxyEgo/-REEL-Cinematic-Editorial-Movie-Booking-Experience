import type { ReactNode } from "react";

export function Tag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`meta inline-flex items-center border border-ink/25 px-2 py-1 uppercase leading-none tracking-[0.12em] ${className}`}
    >
      {children}
    </span>
  );
}
