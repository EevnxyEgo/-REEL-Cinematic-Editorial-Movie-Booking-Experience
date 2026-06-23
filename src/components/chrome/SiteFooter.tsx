import Link from "next/link";

const SWATCHES = [
  { name: "Paper", varName: "--paper" },
  { name: "Ink", varName: "--ink" },
  { name: "Oxblood", varName: "--burgundy" },
  { name: "Sepia", varName: "--sepia" },
];

export function SiteFooter() {
  return (
    <footer className="no-print relative z-10 mt-32 border-t border-ink/15">
      <div className="gutter grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-4xl font-semibold">
            REEL<sup className="align-super font-mono text-xs text-burgundy">®</sup>
          </Link>
          <p className="pull-quote mt-4 max-w-sm text-ink-soft">
            A booking programme for people who still believe a film begins in the
            lobby.
          </p>
        </div>

        <div>
          <h3 className="kicker mb-4">The Palette</h3>
          <ul className="space-y-2.5">
            {SWATCHES.map((s) => (
              <li key={s.name} className="flex items-center gap-3">
                <span
                  className="h-4 w-4 border border-ink/25"
                  style={{ background: `var(${s.varName})` }}
                />
                <span className="meta uppercase tracking-[0.15em]">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="kicker mb-4">Colophon</h3>
          <ul className="meta space-y-2.5 leading-relaxed text-ink-soft">
            <li>Set in Fraunces, Archivo &amp; Space Mono</li>
            <li>Data — TMDB, with a curated archive fallback</li>
            <li>Built for the love of the matinee</li>
          </ul>
        </div>
      </div>

      <div className="gutter flex flex-col gap-2 border-t border-ink/10 py-5 md:flex-row md:items-center md:justify-between">
        <span className="meta uppercase tracking-[0.2em] text-ink-soft">
          REEL — Est. MCMLXXIV
        </span>
        <span className="meta uppercase tracking-[0.2em] text-ink-soft">
          A Portfolio Edition · MMXXVI
        </span>
      </div>
    </footer>
  );
}
