import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur-[2px]">
      <div className="gutter flex h-14 items-center justify-between">
        <Link
          href="/"
          data-cursor
          data-cursor-label="Home"
          className="font-display text-2xl font-semibold leading-none tracking-tight"
        >
          REEL
          <sup className="ml-0.5 align-super font-mono text-[0.5rem] tracking-normal text-burgundy">
            ®
          </sup>
        </Link>

        <span className="kicker hidden md:block">A Cinematic Booking Programme</span>

        <ThemeToggle />
      </div>
    </header>
  );
}
