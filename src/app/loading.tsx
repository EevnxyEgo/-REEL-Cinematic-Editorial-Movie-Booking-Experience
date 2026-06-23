/** Editorial skeleton: animated hairlines, not grey blobs. */
export default function Loading() {
  return (
    <div className="gutter relative z-10 py-20">
      <span className="kicker">Now Threading the Projector</span>

      <div className="mt-8 space-y-5">
        <div className="h-[1px] w-2/3 animate-pulse bg-ink/30" />
        <div className="h-[1px] w-1/2 animate-pulse bg-ink/20 [animation-delay:120ms]" />
        <div className="h-[1px] w-3/4 animate-pulse bg-ink/25 [animation-delay:240ms]" />
      </div>

      <p className="text-outline mt-10 font-display text-[clamp(3rem,12vw,9rem)] font-semibold leading-none">
        REEL
      </p>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse border border-ink/15 bg-paper-2/60"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>

      <p className="meta mt-10 uppercase tracking-[0.3em] text-ink-soft">Loading the programme…</p>
    </div>
  );
}
