import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../motion/Reveal';
import { fadeUp } from '../motion/variants';
import { Kicker, SectionTitle, Lead } from './shared';
import { accent } from '../styles/tokens';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
`;

const Card = styled(motion.div)`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: transform 0.25s ease, border-color 0.25s ease;

  &:hover { transform: translateY(-5px); border-color: ${accent.blue}; }
  &:focus-within { outline: 3px solid ${accent.blue}66; outline-offset: 3px; }
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  background: linear-gradient(135deg, ${accent.blue}, ${accent.blueDeep});
`;

const Label = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
  color: ${p => p.theme.colors.text};
`;

const Value = styled.a`
  display: block;
  color: ${accent.blue};
  font-size: 0.95rem;
  margin-bottom: 1rem;
  word-break: break-word;
  &:hover { text-decoration: underline; }
  &:focus-visible { outline: 2px solid ${accent.blue}; outline-offset: 2px; border-radius: 4px; }
`;

const CopyBtn = styled.button<{ $done: boolean }>`
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  color: #fff;
  background: ${p => (p.$done ? `linear-gradient(135deg, #27ae60, ${accent.green})` : `linear-gradient(135deg, ${accent.blue}, ${accent.blueDeep})`)};
  transition: transform 0.18s ease;
  &:hover { transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid ${accent.blue}88; outline-offset: 2px; }
`;

const Live = styled.span`
  position: absolute;
  width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0);
`;

type Key = 'email' | 'phone' | 'linkedin';

const Contact: React.FC = () => {
  const reduce = useReducedMotion();
  const [done, setDone] = useState<Key | null>(null);
  const [announce, setAnnounce] = useState('');

  const info = useMemo(() => ({
    email: 'arthursenko@gmail.com',
    phone: '(562) 338-9597',
    linkedin: 'https://www.linkedin.com/in/arthur-senko/',
  }), []);

  const copy = useCallback(async (key: Key, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(key);
      setAnnounce(`${key} copied to clipboard`);
      setTimeout(() => setDone(d => (d === key ? null : d)), 2000);
    } catch {
      setAnnounce('Copy failed — please copy manually.');
    }
  }, []);

  const cards: Array<{ key: Key; icon: string; label: string; value: string; href: string; copyText: string; cta: string }> = [
    { key: 'email', icon: '📧', label: 'Email', value: info.email, href: `mailto:${info.email}`, copyText: info.email, cta: 'Copy email' },
    { key: 'phone', icon: '📱', label: 'Phone', value: info.phone, href: `tel:${info.phone}`, copyText: info.phone, cta: 'Copy phone' },
    { key: 'linkedin', icon: '💼', label: 'LinkedIn', value: 'View profile', href: info.linkedin, copyText: info.linkedin, cta: 'Copy URL' },
  ];

  return (
    <>
      <Reveal>
        <Kicker>02 · connect</Kicker>
        <SectionTitle data-testid="contact-title">Let's connect</SectionTitle>
        <Lead>Open to Lead SDET / QA leadership roles and interesting automation problems. Reach out.</Lead>
      </Reveal>

      <Live aria-live="polite" role="status">{announce}</Live>

      <Grid data-testid="contact-grid" role="list" aria-label="Contact methods">
        {cards.map((c, i) => (
          <Card
            key={c.key}
            role="listitem"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: reduce ? 0 : i * 0.1 }}
            data-testid={`contact-card-${c.key}`}
          >
            <Icon aria-hidden="true">{c.icon}</Icon>
            <Label>{c.label}</Label>
            <Value
              href={c.href}
              target={c.key === 'linkedin' ? '_blank' : undefined}
              rel={c.key === 'linkedin' ? 'noopener noreferrer' : undefined}
              data-testid={`contact-link-${c.key}`}
            >
              {c.value}
            </Value>
            <CopyBtn
              $done={done === c.key}
              onClick={() => copy(c.key, c.copyText)}
              data-testid={`contact-copy-${c.key}`}
              aria-label={`Copy ${c.label.toLowerCase()}`}
            >
              {done === c.key ? '✓ Copied' : c.cta}
            </CopyBtn>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Contact;
