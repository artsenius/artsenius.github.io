import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { accent } from '../styles/tokens';

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'contact', label: 'Contact' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'personal', label: 'Life' },
  { id: 'runner', label: 'Live tests' },
];

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, ${accent.blue}, ${accent.green});
  transform-origin: left;
  z-index: 60;
  transition: width 0.1s linear;
`;

const Dots = styled.nav`
  position: fixed;
  right: clamp(0.75rem, 2vw, 1.5rem);
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DotButton = styled.button<{ $active: boolean }>`
  position: relative;
  width: 12px;
  height: 12px;
  padding: 0;
  border-radius: 50%;
  border: 2px solid ${p => (p.$active ? accent.blue : p.theme.colors.textSecondary)};
  background: ${p => (p.$active ? accent.blue : 'transparent')};
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover { border-color: ${accent.blue}; transform: scale(1.2); }
  &:hover span { opacity: 1; transform: translateX(0); }
  &:focus-visible { outline: 2px solid ${accent.blue}; outline-offset: 3px; }

  span {
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%) translateX(6px);
    white-space: nowrap;
    font-size: 0.78rem;
    font-weight: 500;
    color: ${p => p.theme.colors.text};
    background: ${p => p.theme.colors.surface};
    border: 1px solid ${p => p.theme.colors.border};
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
`;

const ScrollNav: React.FC = () => {
  const [active, setActive] = useState('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.section || 'hero');
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.querySelector(`[data-section="${s.id}"]`);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <ProgressBar style={{ width: `${progress}%` }} aria-hidden="true" data-testid="scroll-progress" />
      <Dots aria-label="Section navigation" data-testid="section-nav">
        {SECTIONS.map(s => (
          <DotButton
            key={s.id}
            $active={active === s.id}
            onClick={() => go(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={active === s.id ? 'true' : undefined}
            data-testid={`nav-dot-${s.id}`}
          >
            <span>{s.label}</span>
          </DotButton>
        ))}
      </Dots>
    </>
  );
};

export default ScrollNav;
