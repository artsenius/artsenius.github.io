import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { fadeUp, reducedFade } from './variants';

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  /** Animate once when scrolled into view (default) vs. every entry. */
  once?: boolean;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
  delay?: number;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Scroll-triggered reveal. Honors prefers-reduced-motion by swapping in an
// opacity-only variant, so nothing ever moves for users who opt out.
const Reveal: React.FC<RevealProps> = ({
  children,
  variants = fadeUp,
  once = true,
  amount = 0.3,
  delay = 0,
  className,
  as = 'div',
  style,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const active = reduce ? reducedFade : variants;
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      variants={active}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
      data-testid={rest['data-testid']}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
