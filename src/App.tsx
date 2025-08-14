import React, { useState, Suspense } from 'react';
import Layout from './components/Layout';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ProgressiveEnhancement from './components/ProgressiveEnhancement';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Lazy load page components for better performance
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const AboutApp = React.lazy(() => import('./components/AboutApp'));
const LiveTestAutomation = React.lazy(() => import('./components/LiveTestAutomation'));

// Fallback content component for progressive enhancement
const AppFallback: React.FC = () => (
  <div className="basic-structure">
    <header>
      <nav data-testid="header-nav">
        <h1>About Me - Arthur Senko</h1>
      </nav>
    </header>
    <main>
      <section className="profile-section" data-testid="profile-section">
        <h1 data-testid="profile-name">Arthur Senko</h1>
        <h2>Lead QA Engineer, SDET, AI Enthusiast</h2>
        <p>Welcome to my portfolio. I'm a passionate QA Engineer with expertise in test automation, AI integration, and modern web technologies.</p>
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
          Loading enhanced experience...
        </div>
      </section>
    </main>
    <noscript>
      <div style={{ background: '#f8f9fa', padding: '1rem', marginTop: '1rem', borderRadius: '4px' }}>
        <p>For the best experience, please enable JavaScript in your browser.</p>
      </div>
    </noscript>
  </div>
);

const AppContent: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<'about' | 'about-app' | 'automation' | 'contact'>('about');

  let PageComponent;
  switch (currentPage) {
    case 'about-app':
      PageComponent = (
        <ErrorBoundary>
          <AboutApp isDark={isDarkMode} onGoToAutomation={() => setCurrentPage('automation')} />
        </ErrorBoundary>
      );
      break;
    case 'automation':
      PageComponent = (
        <ErrorBoundary>
          <LiveTestAutomation isDark={isDarkMode} />
        </ErrorBoundary>
      );
      break;
    case 'contact':
      PageComponent = (
        <ErrorBoundary>
          <Contact isDark={isDarkMode} />
        </ErrorBoundary>
      );
      break;
    case 'about':
    default:
      PageComponent = (
        <ErrorBoundary>
          <About isDark={isDarkMode} setCurrentPage={setCurrentPage} />
        </ErrorBoundary>
      );
      break;
  }

  return (
    <ProgressiveEnhancement fallback={<AppFallback />} delay={200}>
      <StyledThemeProvider theme={theme}>
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <PageTransition pageKey={currentPage} duration={400}>
            <Suspense fallback={<LoadingSpinner isDark={isDarkMode} text="Loading page..." />}>
              {PageComponent}
            </Suspense>
          </PageTransition>
        </Layout>
        <BackToTop />
      </StyledThemeProvider>
    </ProgressiveEnhancement>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;