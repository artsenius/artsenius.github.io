import styled from 'styled-components';
import { accent } from '../styles/tokens';

// Shared building blocks for content sections (consistent kicker + title rhythm).

export const Kicker = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${accent.blue};
  margin-bottom: 0.85rem;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0 0 1rem;
  color: ${props => props.theme.colors.text};
`;

export const Lead = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  line-height: 1.7;
  max-width: 46rem;
  margin: 0 0 2.5rem;
`;
