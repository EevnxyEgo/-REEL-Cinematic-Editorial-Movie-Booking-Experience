import Link from "next/link";

export default function NotFound() {
  return (
    <div className="gutter relative z-10 flex min-h-[70vh] flex-col items-start justify-center">
      <span className="kicker">Error · No Such Reel</span>
      <h1 className="display-hero mt-4">404</h1>
      <p className="pull-quote mt-6 max-w-lg text-ink-soft">
        The film has slipped its sprockets. This page was never in the programme — or
        the projectionist has already struck the print.
      </p>
      <Link
        href="/"
        data-cursor
        data-cursor-label="Home"
        className="underline-sweep mt-10 font-mono text-sm uppercase tracking-[0.2em] text-burgundy"
      >
        ← Return to the lobby
      </Link>
    </div>
  );
}
