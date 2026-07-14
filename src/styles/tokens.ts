// Design + motion tokens for the interactive rebuild (B/A hybrid:
// cinematic scroll storytelling with a terminal-flavored live test runner).

export const easing = {
  // Smooth, slightly springy "settle" used for most reveals.
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  // Snappy terminal/typing feel.
  snap: [0.16, 1, 0.3, 1] as const,
};

export const duration = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  intro: 1.1,
};

// Accent palette layered on top of the existing light/dark themes.
// Keeps the established brand blue + success green, adds a terminal green
// for the runner showpiece.
export const accent = {
  blue: '#3498db',
  blueDeep: '#2980b9',
  green: '#2ecc71',
  terminal: '#22c55e',
  amber: '#f39c12',
  red: '#ef4444',
};

// Deep backdrop used by full-bleed cinematic sections (independent of the
// surface theme so the hero reads the same in light + dark).
export const cinematic = {
  bg: '#0b0d12',
  bgSoft: '#11141b',
  grid: 'rgba(255,255,255,0.04)',
  text: '#e8ecf3',
  textMuted: '#8b93a7',
};

export const zLayer = {
  base: 1,
  nav: 50,
  cue: 40,
  overlay: 100,
};
