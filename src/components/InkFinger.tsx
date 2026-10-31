// Left index finger with the indelible ink line — the hero motif.
// The stroke draws once on mount (CSS .ink-stroke); everything else is static.
export default function InkFinger({
  animate = true,
  inked = true,
  className = "",
}: {
  animate?: boolean;
  inked?: boolean;
  className?: string;
}) {
  const ink = animate ? "ink-stroke" : undefined;
  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label={inked ? "An index finger marked with indelible ink" : "An index finger, not yet inked"}
    >
      <defs>
        <linearGradient id="vw-skin" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8f5634" />
          <stop offset=".35" stopColor="#c98a5e" />
          <stop offset=".7" stopColor="#b8784c" />
          <stop offset="1" stopColor="#7e4a2b" />
        </linearGradient>
        <linearGradient id="vw-nail" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f6d9c6" />
          <stop offset="1" stopColor="#e2b296" />
        </linearGradient>
        <radialGradient id="vw-shine" cx=".35" cy=".1" r=".6">
          <stop offset="0" stopColor="#fff" stopOpacity=".45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="52" y="14" width="96" height="320" rx="48" fill="url(#vw-skin)" />
      <rect x="52" y="14" width="96" height="320" rx="48" fill="url(#vw-shine)" />
      <rect x="68" y="30" width="64" height="78" rx="30" fill="url(#vw-nail)" />
      <path d="M70 168c18 8 42 8 60 0M74 178c14 5 38 5 52 0" stroke="#6e3f22" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".5" />
      <path d="M72 270c16 7 40 7 56 0" stroke="#6e3f22" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".4" />
      {/* Ink: from the top of the nail down to the first joint */}
      {inked && (
        <>
          <path d="M100 36 L100 160" pathLength={120} stroke="#5a2fd0" strokeWidth="13" strokeLinecap="round" className={ink} />
          <path
            d="M97 36 L97 160"
            pathLength={120}
            stroke="#a68bff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity=".6"
            className={ink}
          />
        </>
      )}
    </svg>
  );
}
