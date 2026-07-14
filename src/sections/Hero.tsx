import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import profilePhoto from '../media/art.jpg';
import resumePDF from '../media/A_Senko_Lead_SDET.pdf';
import { cinematic, accent, easing } from '../styles/tokens';
import { maskReveal, fadeUp } from '../motion/variants';

const Wrap = styled.div`
  position: relative;
  min-height: 100svh;
  width: 100%;
  display: flex;
  align-items: center;
  scroll-snap-align: start;
  background: ${cinematic.bg};
  color: ${cinematic.text};
  overflow: hidden;
  padding: clamp(4rem, 9vh, 7rem) clamp(1.25rem, 5vw, 4rem);
  box-sizing: border-box;

  /* faint grid + radial glow */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(${cinematic.grid} 1px, transparent 1px),
      linear-gradient(90deg, ${cinematic.grid} 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
  }
  &::after {
    content: '';
    position: absolute;
    top: -20%;
    left: 50%;
    width: 90vw;
    height: 90vw;
    max-width: 1100px;
    max-height: 1100px;
    transform: translateX(-50%);
    background: radial-gradient(circle, ${accent.blue}22 0%, transparent 60%);
    pointer-events: none;
  }
`;

const Grid = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }
`;

const BootLine = styled(motion.div)`
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: ${accent.terminal};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 9px;
  height: 1.1em;
  background: ${accent.terminal};
  animation: blink 1s steps(1) infinite;
  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const NameMask = styled.span`
  display: block;
  overflow: hidden;
  line-height: 1.04;
`;

const Name = styled.h1`
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  letter-spacing: -0.03em;
  margin: 0;
  color: ${cinematic.text};
`;

const Role = styled(motion.div)`
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  font-weight: 500;
  margin-top: 0.75rem;
  color: ${cinematic.text};

  span {
    color: ${accent.blue};
    font-weight: 600;
  }
`;

const Tagline = styled(motion.p)`
  margin: 1.5rem 0 2.25rem;
  max-width: 34rem;
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.7;
  color: ${cinematic.textMuted};

  @media (max-width: 860px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const CtaRow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.6rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  font-family: var(--font-display);
  color: #fff;
  background: linear-gradient(135deg, ${accent.blue}, ${accent.blueDeep});
  box-shadow: 0 8px 24px ${accent.blue}40;
  transition: transform 0.2s ${easing.out.join(',')}, box-shadow 0.2s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 12px 32px ${accent.blue}55; }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 3px solid ${accent.blue}88; outline-offset: 3px; }
`;

const GhostBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.6rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: ${cinematic.text};
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.03);
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover { border-color: ${accent.blue}; background: rgba(255, 255, 255, 0.07); transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid ${accent.blue}88; outline-offset: 3px; }
`;

const PhotoWrap = styled(motion.div)`
  position: relative;
  justify-self: center;
  width: clamp(220px, 32vw, 340px);
  aspect-ratio: 1;
`;

const PhotoRing = styled.div`
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, ${accent.blue}, ${accent.green}, ${accent.blue});
  opacity: 0.55;
  filter: blur(2px);
  animation: spin 9s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const Photo = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${cinematic.bg};
`;

const ScrollCue = styled(motion.button)`
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: ${cinematic.textMuted};
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  .mouse {
    width: 24px;
    height: 38px;
    border: 2px solid ${cinematic.textMuted};
    border-radius: 14px;
    position: relative;
  }
  .wheel {
    position: absolute;
    top: 6px;
    left: 50%;
    width: 4px;
    height: 7px;
    margin-left: -2px;
    border-radius: 2px;
    background: ${cinematic.textMuted};
    animation: wheel 1.6s ease-in-out infinite;
  }
  @keyframes wheel {
    0% { opacity: 0; transform: translateY(0); }
    40% { opacity: 1; }
    100% { opacity: 0; transform: translateY(12px); }
  }
  @media (prefers-reduced-motion: reduce) { .wheel { animation: none; } }
`;

interface HeroProps {
  onViewTests?: () => void;
}

const BOOT_TEXT = 'initializing portfolio';

const Hero: React.FC<HeroProps> = ({ onViewTests }) => {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? BOOT_TEXT : '');
  const [booted, setBooted] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(BOOT_TEXT.slice(0, i));
      if (i >= BOOT_TEXT.length) {
        clearInterval(id);
        setTimeout(() => setBooted(true), 250);
      }
    }, 45);
    return () => clearInterval(id);
  }, [reduce]);

  // Children play in sequence after the boot line resolves.
  const base = booted ? 0 : 0;
  const t = (n: number) => ({ delay: reduce ? 0 : base + n });

  return (
    <Wrap id="hero" data-section="hero" aria-label="Introduction">
      <Grid>
        <div>
          <BootLine
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            data-testid="hero-boot-line"
          >
            <span style={{ color: accent.terminal }}>$</span>
            <span style={{ color: cinematic.textMuted }}>{typed}</span>
            {booted ? (
              <span style={{ color: accent.terminal }}>✓</span>
            ) : (
              <Cursor aria-hidden="true" />
            )}
          </BootLine>

          {booted && (
            <>
              <Name data-testid="profile-name">
                <NameMask>
                  <motion.span style={{ display: 'block' }} variants={maskReveal} initial="hidden" animate="show" transition={t(0.05)}>
                    Arthur
                  </motion.span>
                </NameMask>
                <NameMask>
                  <motion.span style={{ display: 'block' }} variants={maskReveal} initial="hidden" animate="show" transition={t(0.15)}>
                    Senko
                  </motion.span>
                </NameMask>
              </Name>

              <Role variants={fadeUp} initial="hidden" animate="show" transition={t(0.35)} data-testid="profile-position">
                <span>Lead SDET</span> — building quality you can watch happen
              </Role>

              <Tagline variants={fadeUp} initial="hidden" animate="show" transition={t(0.5)} data-testid="hero-tagline">
                I build and scale QA from the ground up with modern automation and
                AI-driven testing. This site runs its own Playwright suite live —
                press a button and watch it test itself.
              </Tagline>

              <CtaRow variants={fadeUp} initial="hidden" animate="show" transition={t(0.65)}>
                <PrimaryBtn onClick={onViewTests} data-testid="hero-view-tests">
                  ▶ Run the live tests
                </PrimaryBtn>
                <GhostBtn
                  href={resumePDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="resume-link"
                >
                  Download résumé ↗
                </GhostBtn>
              </CtaRow>
            </>
          )}
        </div>

        {booted && (
          <PhotoWrap
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={t(0.4)}
          >
            <PhotoRing aria-hidden="true" />
            <Photo src={profilePhoto} alt="Arthur Senko — professional headshot" data-testid="profile-image" />
          </PhotoWrap>
        )}
      </Grid>

      {booted && (
        <ScrollCue
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 1.4, duration: 0.6 }}
          aria-label="Scroll to next section"
          data-testid="hero-scroll-cue"
        >
          <span className="mouse"><span className="wheel" /></span>
          Scroll
        </ScrollCue>
      )}
    </Wrap>
  );
};

export default Hero;
