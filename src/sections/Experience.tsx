import React from 'react';
import styled from 'styled-components';
import Reveal from '../motion/Reveal';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../motion/variants';
import { Kicker, SectionTitle, Lead } from './shared';
import { accent } from '../styles/tokens';

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;
  margin-bottom: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: linear-gradient(${accent.blue}, ${accent.green});
  }
`;

const Entry = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${accent.blue};
    box-shadow: 0 0 0 4px ${accent.blue}33;
  }
`;

const Role = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  color: ${p => p.theme.colors.text};

  a { color: ${accent.blue}; }
  a:hover { text-decoration: underline; }
`;

const When = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: ${p => p.theme.colors.textSecondary};
  margin: 0.35rem 0 1rem;
`;

const Bullets = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.85rem;
`;

const Bullet = styled(motion.li)`
  position: relative;
  padding-left: 1.75rem;
  line-height: 1.6;
  color: ${p => p.theme.colors.text};

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 0;
    color: ${accent.green};
    font-weight: 700;
  }
`;

const AchTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1.25rem;
  color: ${p => p.theme.colors.text};
`;

const ROLE_BULLETS = [
  'Established the entire QA function from scratch as the first QA hire — testing strategy, processes, and quality standards org-wide.',
  'End-to-end test strategy: planning, test case development, feature validation, UAT coordination, and release support.',
  'Built a Playwright automation framework: regression, smoke, non-invasive production testing, reducing manual effort.',
  'Introduced AI-driven workflows (Claude, agents) for test generation, exploratory testing, and faster defect detection.',
  'Monitoring with Sentry, Hotjar, and Google Analytics; validated Auth0, Postmark, ActiveCampaign, HubSpot, and Zendesk.',
];

const ACHIEVEMENTS = [
  'Built QA teams and processes from the ground up in startup and enterprise environments.',
  'Played a key role on every project, demonstrating responsibility and commitment to success.',
  'Led QA initiatives directly contributing to millions in company revenue.',
  'Pioneered adoption of advanced automation tools and frameworks, driving innovation.',
  'Co-founded a startup, helping people launch careers with a 95% graduate employment rate.',
];

const Experience: React.FC = () => {
  const reduce = useReducedMotion();
  return (
  <>
    <Reveal>
      <Kicker>04 · timeline</Kicker>
      <SectionTitle data-testid="experience-title">Experience</SectionTitle>
      <Lead>Building quality from zero — currently as the first QA hire at Healthcasts.</Lead>
    </Reveal>

    <Reveal delay={0.05}>
      <Timeline>
        <Entry data-testid="experience-item">
          <Role>
            Lead SDET @{' '}
            <a href="https://healthcasts.com/" target="_blank" rel="noopener noreferrer" data-testid="healthcasts-link">
              Healthcasts
            </a>
          </Role>
          <When data-testid="role-duration">October 2025 – Present · Remote</When>
          <Bullets>
            {ROLE_BULLETS.map((b, i) => (
              <Bullet
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: reduce ? 0 : i * 0.08 }}
                data-testid={`role-achievement-${i}`}
              >
                {b}
              </Bullet>
            ))}
          </Bullets>
        </Entry>
      </Timeline>
    </Reveal>

    <Reveal delay={0.1}>
      <AchTitle data-testid="achievements-title">Notable achievements</AchTitle>
      <Bullets data-testid="achievements-list">
        {ACHIEVEMENTS.map((a, i) => (
          <Bullet
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : i * 0.07 }}
            data-testid={`achievement-${i}`}
          >
            {a}
          </Bullet>
        ))}
      </Bullets>
    </Reveal>
  </>
  );
};

export default Experience;
