import type { Variants } from 'framer-motion';
import { easing, duration } from '../styles/tokens';

// Reusable Framer Motion variants. All distance-based transforms are kept
// modest so the reduced-motion fallbacks (opacity-only) stay coherent.

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base, ease: easing.out } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: duration.base, ease: easing.out } },
};

// Parent that releases its children one after another.
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// Word/letter mask reveal used by the hero name.
export const maskReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: duration.slow, ease: easing.out },
  },
};

// Reduced-motion equivalents: no movement, just opacity.
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};
