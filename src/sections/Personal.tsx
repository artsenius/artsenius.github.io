import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../motion/Reveal';
import { fadeUp } from '../motion/variants';
import { Kicker, SectionTitle, Lead } from './shared';
import familyImg from '../media/personal/family.jpg';
import soccerImg from '../media/personal/soccer.jpg';
import campingImg from '../media/personal/camping.jpg';
import skiingImg from '../media/personal/skiing.jpg';
import travelImg from '../media/personal/travel.jpg';
import standingImg from '../media/personal/standing.jpg';

// Bento sized to ~one viewport. The two portraits keep full-height columns;
// the landscapes (and the standing shot, cropped square-ish to fill the last
// slot) sit in near-square cells. Only gentle cover-crops.
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'family travel   soccer camping'
    'skiing standing soccer camping';
  gap: 0.9rem;
  height: clamp(320px, 50vh, 500px);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 1rem;
  }
`;

const Tile = styled(motion.figure)<{ $area: string }>`
  grid-area: ${p => p.$area};
  position: relative;
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.surface};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px ${p => p.theme.colors.shadow};
  }
  &:hover img {
    transform: scale(1.04);
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;

  @media (max-width: 768px) {
    height: auto;
    object-fit: contain;
  }
`;

const Caption = styled.figcaption`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.75rem 0.9rem 0.7rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
  pointer-events: none;
`;

interface TileDef {
  caption: string;
  src: string;
  area: string;
  w: number;
  h: number;
  position?: string;
}

const TILES: TileDef[] = [
  { caption: 'Girl dad × 3', src: familyImg, area: 'family', w: 1600, h: 1066, position: 'center 35%' },
  { caption: 'Weekend soccer', src: soccerImg, area: 'soccer', w: 1088, h: 1600 },
  { caption: 'Skiing', src: skiingImg, area: 'skiing', w: 1600, h: 1460 },
  { caption: 'Camping & the outdoors', src: campingImg, area: 'camping', w: 1185, h: 1600 },
  { caption: 'Always up for an adventure', src: travelImg, area: 'travel', w: 1600, h: 919 },
  { caption: 'Out & about', src: standingImg, area: 'standing', w: 1200, h: 1600, position: 'center 18%' },
];

const Personal: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <>
      <Reveal>
        <Kicker>05 · off the clock</Kicker>
        <SectionTitle data-testid="personal-title">Life beyond the terminal</SectionTitle>
        <Lead>
          Happy father of three daughters. I play soccer regularly and recharge outdoors —
          camping, traveling, and skiing whenever I can.
        </Lead>
      </Reveal>

      <Gallery data-testid="personal-gallery">
        {TILES.map((t, i) => (
          <Tile
            key={t.caption}
            $area={t.area}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: reduce ? 0 : i * 0.07 }}
            data-testid={`personal-tile-${i}`}
          >
            <Img
              src={t.src}
              alt={t.caption}
              width={t.w}
              height={t.h}
              loading="lazy"
              style={t.position ? { objectPosition: t.position } : undefined}
            />
            <Caption>{t.caption}</Caption>
          </Tile>
        ))}
      </Gallery>
    </>
  );
};

export default Personal;
