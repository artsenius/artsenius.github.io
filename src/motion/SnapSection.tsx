import React from 'react';
import styled from 'styled-components';

interface SnapSectionProps {
  id: string;
  children: React.ReactNode;
  /** Full-bleed dark cinematic backdrop vs. themed surface. */
  variant?: 'cinematic' | 'surface';
  /** Center content vertically (hero-style) vs. top-aligned (content). */
  center?: boolean;
  className?: string;
  'aria-label'?: string;
}

const Section = styled.section<{ $center: boolean }>`
  position: relative;
  min-height: 100svh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  justify-content: ${p => (p.$center ? 'center' : 'flex-start')};
  box-sizing: border-box;
  padding: clamp(4rem, 10vh, 8rem) clamp(1.25rem, 5vw, 4rem);
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 5rem 1.25rem;
    scroll-snap-align: none;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

// A single full-viewport "screen" in the scroll-snap experience.
const SnapSection: React.FC<SnapSectionProps> = ({
  id,
  children,
  center = false,
  className,
  ...rest
}) => (
  <Section
    id={id}
    $center={center}
    className={className}
    data-section={id}
    aria-label={rest['aria-label']}
  >
    <Inner>{children}</Inner>
  </Section>
);

export default SnapSection;
