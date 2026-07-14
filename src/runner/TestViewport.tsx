import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CurrentTest, SectionId } from './types';
import { accent, cinematic } from '../styles/tokens';
import Hero from '../sections/Hero';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Personal from '../sections/Personal';
import Contact from '../sections/Contact';

// A miniature "browser" that renders the REAL section component under test,
// scaled down, with a Playwright-style target highlight and cursor. Not a
// screenshot — the live React tree testing itself.

const VIRT_W = 1280; // virtual desktop viewport width

const Frame = styled.div`
  margin-top: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
  background: ${cinematic.bgSoft};
`;

const Chrome = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.16); flex: none; }
  .url {
    flex: 1;
    max-width: 320px;
    margin-left: 0.35rem;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: ${cinematic.textMuted};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .env {
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: ${cinematic.textMuted};
    white-space: nowrap;
  }
`;

const Body = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  background: ${cinematic.bg};

  @media (max-width: 640px) {
    height: 220px;
  }
`;

const Stage = styled.div<{ $bg: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${VIRT_W}px;
  transform-origin: top left;
  pointer-events: none;
  user-select: none;
  background: ${p => (p.$bg ? p.theme.colors.background : 'transparent')};
`;

const SectionPad = styled.div`
  padding: 2.5rem 3rem;
`;

const Highlight = styled(motion.div)`
  position: absolute;
  border: 2px solid ${accent.amber};
  background: ${accent.amber}1f;
  border-radius: 4px;
  pointer-events: none;
  z-index: 3;
`;

const Cursor = styled(motion.div)`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(0, 0, 0, 0.45);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 4;
`;

const StepBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.75rem;
  background: rgba(5, 7, 12, 0.82);
  backdrop-filter: blur(4px);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: ${cinematic.text};

  .arrow { color: ${accent.amber}; }
  .count { margin-left: auto; color: ${cinematic.textMuted}; white-space: nowrap; }
`;

const Launching = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: ${cinematic.textMuted};

  .caret {
    width: 8px;
    height: 1.05em;
    background: ${accent.terminal};
    animation: blink 1s steps(1) infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
`;

const SECTIONS: Record<SectionId, React.ReactNode> = {
  hero: <Hero />,
  skills: <SectionPad><Skills /></SectionPad>,
  experience: <SectionPad><Experience /></SectionPad>,
  personal: <SectionPad><Personal /></SectionPad>,
  contact: <SectionPad><Contact /></SectionPad>,
};

interface TestViewportProps {
  test: CurrentTest | null;
  queued: boolean;
}

const TestViewport: React.FC<TestViewportProps> = ({ test, queued }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / VIRT_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stepCount = test?.steps.length ?? 0;
  const stepIdx = test
    ? Math.min(
        Math.floor(((Date.now() - test.startedAt) / test.durationMs) * stepCount),
        stepCount - 1,
      )
    : 0;
  const target = test?.targets[stepIdx] ?? { x: 40, y: 40, w: 20, h: 10 };

  return (
    <Frame data-testid="runner-viewport">
      <Chrome>
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="url">www.arthursenko.com</span>
        <span className="env">chromium · 1280×720</span>
      </Chrome>
      <Body ref={bodyRef}>
        {queued || !test ? (
          <Launching data-testid="runner-viewport-launching">
            launching chromium
            <span className="caret" aria-hidden="true" />
          </Launching>
        ) : (
          <>
            <Stage
              key={test.section}
              $bg={test.section !== 'hero'}
              style={{ transform: `scale(${scale})` }}
              aria-hidden="true"
            >
              {SECTIONS[test.section]}
            </Stage>
            <Highlight
              animate={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                width: `${target.w}%`,
                height: `${target.h}%`,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              data-testid="runner-viewport-highlight"
            />
            <Cursor
              animate={{
                left: `${target.x + target.w / 2}%`,
                top: `${target.y + target.h / 2}%`,
                scale: [1, 0.7, 1],
              }}
              transition={{
                left: { type: 'spring', stiffness: 200, damping: 24 },
                top: { type: 'spring', stiffness: 200, damping: 24 },
                scale: { duration: 0.35 },
              }}
            />
            <StepBar data-testid="runner-viewport-step">
              <span className="arrow">▸</span>
              <span>{test.steps[stepIdx]}</span>
              <span className="count">step {stepIdx + 1}/{stepCount}</span>
            </StepBar>
          </>
        )}
      </Body>
    </Frame>
  );
};

export default TestViewport;
