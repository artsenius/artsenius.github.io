import React from 'react';
import styled from 'styled-components';
import { accent } from '../styles/tokens';

const Wrap = styled.footer`
  padding: 2.5rem 1.5rem 3rem;
  text-align: center;
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.textSecondary};
  border-top: 1px solid ${p => p.theme.colors.border};
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  a {
    color: ${p => p.theme.colors.text};
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }
  a:hover { color: ${accent.blue}; }
  a:focus-visible { outline: 2px solid ${accent.blue}; outline-offset: 3px; border-radius: 4px; }
`;

const Note = styled.p`
  font-size: 0.82rem;
  margin: 0;

  span { color: ${accent.green}; }
`;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <Wrap data-testid="footer">
      <Links>
        <a href="https://github.com/artsenius" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/arthur-senko/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:arthursenko@gmail.com">Email</a>
      </Links>
      <Note data-testid="footer-copyright">
        © {year} Arthur Senko · React + Vite · <span>tested live</span> with Playwright on GitHub Actions
      </Note>
    </Wrap>
  );
};

export default Footer;
