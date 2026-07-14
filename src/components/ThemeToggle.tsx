import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';
import { accent } from '../styles/tokens';

const Button = styled.button`
  position: fixed;
  top: 1.1rem;
  right: clamp(0.75rem, 2vw, 1.5rem);
  z-index: 70;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.surface};
  color: ${p => p.theme.colors.text};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px ${p => p.theme.colors.shadow};
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover { transform: translateY(-2px) scale(1.05); border-color: ${accent.blue}; }
  &:focus-visible { outline: 3px solid ${accent.blue}88; outline-offset: 2px; }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <Button
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
      data-testid="theme-toggle"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </Button>
  );
};

export default ThemeToggle;
