import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { stagger } from './variants';

interface StaggerProps {
  children: React.ReactNode;
  gap?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Parent container that releases its <Reveal> / motion children sequentially
// when scrolled into view. Pair with child variants named "hidden"/"show".
const Stagger: React.FC<StaggerProps> = ({
  children,
  gap = 0.08,
  delay = 0,
  once = true,
  amount = 0.25,
  className,
  style,
  ...rest
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={stagger(reduce ? 0 : gap, reduce ? 0 : delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      data-testid={rest['data-testid']}
    >
      {children}
    </motion.div>
  );
};

export default Stagger;
