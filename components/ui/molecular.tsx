/**
 * Molecular SVG decoration — scientific visual identity element for SVK.
 * Drawn as inline SVG circles + connecting lines.
 */
export function MolecularDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      width="260"
      height="300"
      viewBox="0 0 260 300"
      fill="none"
      className={`pointer-events-none ${className}`}
    >
      {/* Main molecule nodes */}
      <circle cx="130" cy="60" r="18" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <circle cx="130" cy="60" r="4" fill="white" opacity="0.4" />

      <circle cx="60" cy="140" r="14" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="140" r="3" fill="white" opacity="0.3" />

      <circle cx="200" cy="120" r="22" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <circle cx="200" cy="120" r="5" fill="white" opacity="0.3" />

      <circle cx="100" cy="220" r="16" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="220" r="4" fill="white" opacity="0.3" />

      <circle cx="190" cy="240" r="12" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <circle cx="190" cy="240" r="3" fill="white" opacity="0.3" />

      <circle cx="160" cy="160" r="10" stroke="white" strokeWidth="1" opacity="0.3" />

      {/* Connecting bonds */}
      <line x1="130" y1="78" x2="70" y2="130" stroke="white" strokeWidth="1" opacity="0.25" />
      <line x1="145" y1="75" x2="190" y2="100" stroke="white" strokeWidth="1" opacity="0.25" />
      <line x1="70" y1="152" x2="95" y2="206" stroke="white" strokeWidth="1" opacity="0.2" />
      <line x1="200" y1="142" x2="190" y2="228" stroke="white" strokeWidth="1" opacity="0.2" />
      <line x1="112" y1="228" x2="178" y2="240" stroke="white" strokeWidth="1" opacity="0.2" />
      <line x1="160" y1="160" x2="130" y2="78" stroke="white" strokeWidth="1" opacity="0.15" />
      <line x1="160" y1="160" x2="200" y2="142" stroke="white" strokeWidth="1" opacity="0.15" />

      {/* Small floating atoms */}
      <circle cx="40" cy="80" r="4" stroke="white" strokeWidth="1" opacity="0.2" />
      <circle cx="230" cy="200" r="6" stroke="white" strokeWidth="1" opacity="0.2" />
      <circle cx="80" cy="280" r="5" stroke="white" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

/**
 * Light-theme molecular decoration with brand color.
 */
export function MolecularDecorationLight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="200"
      height="240"
      viewBox="0 0 200 240"
      fill="none"
      className={`pointer-events-none ${className}`}
    >
      <circle cx="100" cy="50" r="16" stroke="#059CD5" strokeWidth="1" opacity="0.15" />
      <circle cx="100" cy="50" r="3" fill="#059CD5" opacity="0.1" />

      <circle cx="40" cy="110" r="12" stroke="#059CD5" strokeWidth="1" opacity="0.12" />
      <circle cx="160" cy="100" r="18" stroke="#059CD5" strokeWidth="1" opacity="0.1" />

      <circle cx="80" cy="180" r="14" stroke="#059CD5" strokeWidth="1" opacity="0.12" />
      <circle cx="150" cy="190" r="10" stroke="#059CD5" strokeWidth="1" opacity="0.1" />

      <line x1="100" y1="66" x2="48" y2="102" stroke="#059CD5" strokeWidth="1" opacity="0.1" />
      <line x1="112" y1="63" x2="152" y2="85" stroke="#059CD5" strokeWidth="1" opacity="0.1" />
      <line x1="48" y1="120" x2="73" y2="168" stroke="#059CD5" strokeWidth="1" opacity="0.08" />
      <line x1="160" y1="118" x2="155" y2="180" stroke="#059CD5" strokeWidth="1" opacity="0.08" />
      <line x1="93" y1="188" x2="140" y2="190" stroke="#059CD5" strokeWidth="1" opacity="0.08" />
    </svg>
  );
}
