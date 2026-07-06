/*
 * Warm illustrated portrait of a mom and her kid — used as the
 * profile photo in the app render. Swap for a real (licensed)
 * photo asset before launch if preferred.
 */
export function MomKidIllustration({ className }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Illustration of a mother and her child smiling together"
    >
      <defs>
        <linearGradient id="vgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9BF" />
          <stop offset="100%" stopColor="#FFD98E" />
        </linearGradient>
      </defs>

      {/* background */}
      <rect width="400" height="300" fill="url(#vgSky)" />
      <circle cx="330" cy="60" r="34" fill="#FFF4DC" />
      {/* rolling park hills */}
      <ellipse cx="90" cy="310" rx="220" ry="90" fill="#2E6B5B" opacity="0.35" />
      <ellipse cx="330" cy="325" rx="240" ry="100" fill="#1E4D42" opacity="0.28" />

      {/* tree */}
      <rect x="42" y="150" width="10" height="60" rx="5" fill="#8A6510" />
      <circle cx="47" cy="130" r="34" fill="#2E6B5B" />
      <circle cx="70" cy="148" r="24" fill="#3C7A64" />

      {/* ---- mom ---- */}
      {/* hair */}
      <path
        d="M208 96c0-30 22-50 48-50s48 20 48 50c0 12-4 22-10 30l6 44h-88l6-44c-6-8-10-18-10-30z"
        fill="#3B2A24"
      />
      {/* face */}
      <circle cx="256" cy="104" r="32" fill="#8D5A3B" />
      {/* smile */}
      <path
        d="M244 114c4 5 9 7 12 7s8-2 12-7"
        stroke="#5C3823"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* eyes */}
      <circle cx="245" cy="100" r="3.4" fill="#2B1B12" />
      <circle cx="267" cy="100" r="3.4" fill="#2B1B12" />
      {/* earrings */}
      <circle cx="226" cy="112" r="3" fill="#FFD98E" />
      <circle cx="286" cy="112" r="3" fill="#FFD98E" />
      {/* body */}
      <path
        d="M204 232c0-34 22-58 52-58s52 24 52 58v68H204v-68z"
        fill="#1E4D42"
      />
      {/* arm wrapping around kid */}
      <path
        d="M212 200c-16 10-28 28-30 48l-4 52h30l6-56c2-16 10-28 20-34z"
        fill="#1E4D42"
      />

      {/* ---- kid ---- */}
      {/* hair puffs */}
      <circle cx="150" cy="160" r="14" fill="#3B2A24" />
      <circle cx="182" cy="160" r="14" fill="#3B2A24" />
      <circle cx="166" cy="150" r="16" fill="#3B2A24" />
      {/* face */}
      <circle cx="166" cy="176" r="24" fill="#A06A45" />
      {/* smile */}
      <path
        d="M157 184c3 4 7 5 9 5s6-1 9-5"
        stroke="#5C3823"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* eyes */}
      <circle cx="158" cy="172" r="2.8" fill="#2B1B12" />
      <circle cx="174" cy="172" r="2.8" fill="#2B1B12" />
      {/* body */}
      <path
        d="M132 268c0-26 15-44 34-44s34 18 34 44v32h-68v-32z"
        fill="#FF6B5B"
      />
      {/* kid arm reaching up to mom */}
      <path
        d="M196 234c8-8 18-14 26-16l6 14c-8 4-16 10-22 18z"
        fill="#FF6B5B"
      />

      {/* floating hearts */}
      <path
        d="M96 84c0-6 5-10 10-10 4 0 7 2 8 5 1-3 4-5 8-5 5 0 10 4 10 10 0 10-18 20-18 20S96 94 96 84z"
        fill="#FF6B5B"
        opacity="0.85"
      />
      <path
        d="M320 140c0-4 3-7 7-7 2.5 0 4.5 1.3 5.5 3.2 1-1.9 3-3.2 5.5-3.2 4 0 7 3 7 7 0 7-12.5 14-12.5 14S320 147 320 140z"
        fill="#FF6B5B"
        opacity="0.6"
      />
    </svg>
  );
}
