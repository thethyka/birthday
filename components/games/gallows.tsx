"use client";

/**
 * The classic gallows, drawn one piece per wrong guess.
 *
 * There are 8 pieces. If the content file sets a different number of lives the
 * drawing still fills up evenly, so `lives` stays a free dial.
 */
export function Gallows({ wrong, lives }: { wrong: number; lives: number }) {
  const PARTS = 8;
  const shown = Math.min(PARTS, Math.round((wrong / Math.max(lives, 1)) * PARTS));

  const stroke = {
    stroke: "currentColor",
    strokeWidth: 5,
    strokeLinecap: "round" as const,
    fill: "none",
  };

  // Each entry appears once `shown` reaches its index + 1.
  const parts = [
    <line key="base" x1="20" y1="200" x2="120" y2="200" {...stroke} />,
    <line key="pole" x1="50" y1="200" x2="50" y2="20" {...stroke} />,
    <line key="beam" x1="50" y1="20" x2="140" y2="20" {...stroke} />,
    <line key="rope" x1="140" y1="20" x2="140" y2="45" {...stroke} />,
    <circle key="head" cx="140" cy="62" r="17" {...stroke} />,
    <line key="body" x1="140" y1="79" x2="140" y2="135" {...stroke} />,
    <g key="arms">
      <line x1="140" y1="95" x2="115" y2="120" {...stroke} />
      <line x1="140" y1="95" x2="165" y2="120" {...stroke} />
    </g>,
    <g key="legs">
      <line x1="140" y1="135" x2="118" y2="175" {...stroke} />
      <line x1="140" y1="135" x2="162" y2="175" {...stroke} />
    </g>,
  ];

  const dead = shown >= PARTS;

  return (
    <svg
      viewBox="0 0 200 220"
      className={`w-36 h-40 sm:w-44 sm:h-48 transition-colors duration-500 ${
        dead ? "text-coral" : "text-cream/70"
      }`}
      aria-label={`${wrong} of ${lives} wrong guesses`}
      role="img"
    >
      {parts.slice(0, shown).map((part, i) => (
        <g
          key={i}
          style={{ animation: "bounce-in .35s ease-out both" }}
          className="origin-center"
        >
          {part}
        </g>
      ))}
    </svg>
  );
}
