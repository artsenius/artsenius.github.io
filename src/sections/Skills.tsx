import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Reveal from '../motion/Reveal';
import { Kicker, SectionTitle, Lead } from './shared';
import { accent } from '../styles/tokens';

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
`;

const Pill = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: var(--font-display);
  cursor: pointer;
  border: 1px solid ${p => (p.$active ? accent.blue : p.theme.colors.border)};
  background: ${p => (p.$active ? accent.blue : 'transparent')};
  color: ${p => (p.$active ? '#fff' : p.theme.colors.text)};
  transition: all 0.2s ease;

  &:hover { border-color: ${accent.blue}; }
  &:focus-visible { outline: 3px solid ${accent.blue}66; outline-offset: 2px; }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const Chip = styled(motion.div)`
  padding: 0.7rem 1.1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.18s ease, border-color 0.18s ease;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${accent.green};
    flex: none;
  }

  &:hover { transform: translateY(-3px); border-color: ${accent.blue}; }
`;

const Count = styled.div`
  margin-top: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: ${p => p.theme.colors.textSecondary};
`;

const SKILLS: Record<string, string[]> = {
  automation: ['WebdriverIO', 'Cypress', 'Playwright', 'Selenium', 'Appium', 'JUnit/TestNG'],
  technologies: ['JavaScript/TypeScript/Node.js', 'Python', 'Java', 'React', 'React Native', 'Express.js', 'MongoDB Atlas'],
  cloud: ['BrowserStack', 'LambdaTest', 'SauceLabs'],
  tools: ['RESTful', 'GraphQL', 'Postman', 'Azure DevOps', 'GitHub Actions', 'Artillery.io', 'Loadster'],
  ai: ['Claude', 'Cursor', 'GitHub Copilot', 'KaneAI', 'TestSigma'],
  methodologies: ['DevOps', 'CI/CD Pipelines'],
};

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'automation', label: 'Test Automation' },
  { key: 'technologies', label: 'Technologies' },
  { key: 'cloud', label: 'Cloud & Testing' },
  { key: 'tools', label: 'DevOps Tools' },
  { key: 'ai', label: 'AI & Innovation' },
  { key: 'methodologies', label: 'Methodologies' },
];

const Skills: React.FC = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState('all');

  const items = useMemo(() => {
    const all = Object.entries(SKILLS).flatMap(([cat, list]) => list.map(skill => ({ skill, cat })));
    return active === 'all' ? all : all.filter(i => i.cat === active);
  }, [active]);

  return (
    <>
      <Reveal>
        <Kicker>03 · stack</Kicker>
        <SectionTitle data-testid="skills-title">Skills</SectionTitle>
        <Lead>
          A decade of test automation, full-stack engineering, and — lately — AI-driven
          testing. Filter by what you're hiring for.
        </Lead>
      </Reveal>

      <Reveal delay={0.1}>
        <Pills role="group" aria-label="Filter skills by category">
          {CATEGORIES.map(c => (
            <Pill
              key={c.key}
              $active={active === c.key}
              onClick={() => setActive(c.key)}
              aria-pressed={active === c.key}
              data-testid={`filter-${c.key}`}
            >
              {c.label}
            </Pill>
          ))}
        </Pills>
      </Reveal>

      <Grid data-testid="skills-grid" role="list" aria-label="Technical skills">
        <AnimatePresence mode="popLayout">
          {items.map(({ skill, cat }, i) => (
            <Chip
              key={skill}
              role="listitem"
              data-testid={`skill-item-${skill.toLowerCase().replace(/[\s/]/g, '-')}`}
              data-category={cat}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: reduce ? 0 : i * 0.025 } }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
            >
              {skill}
            </Chip>
          ))}
        </AnimatePresence>
      </Grid>

      <Count data-testid="skills-count">
        {items.length} {active === 'all' ? 'skills' : `in ${CATEGORIES.find(c => c.key === active)?.label}`}
      </Count>
    </>
  );
};

export default Skills;
