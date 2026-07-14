import React from 'react';
import styled from 'styled-components';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import SnapSection from './motion/SnapSection';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Personal from './sections/Personal';
import Runner from './sections/Runner';
import Contact from './sections/Contact';
import ScrollNav from './components/ScrollNav';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { RunnerProvider } from './runner/RunnerProvider';

const Page = styled.main`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const goToRunner = () => document.getElementById('runner')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <StyledThemeProvider theme={theme}>
      <RunnerProvider>
        <ThemeToggle />
        <ScrollNav />
        <Page>
          <Hero onViewTests={goToRunner} />

          <SnapSection id="contact" aria-label="Contact">
            <Contact />
          </SnapSection>

          <SnapSection id="skills" aria-label="Skills">
            <Skills />
          </SnapSection>

          <SnapSection id="experience" aria-label="Experience">
            <Experience />
          </SnapSection>

          <SnapSection id="personal" aria-label="Life beyond the terminal">
            <Personal />
          </SnapSection>

          <SnapSection id="runner" aria-label="Live test runner">
            <Runner />
          </SnapSection>

          <Footer />
        </Page>
        <BackToTop />
      </RunnerProvider>
    </StyledThemeProvider>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
