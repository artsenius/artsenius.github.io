import React, { useState, Suspense } from 'react';
import Layout from './components/Layout';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Lazy load page components for better performance
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const AboutApp = React.lazy(() => import('./components/AboutApp'));
const LiveTestAutomation = React.lazy(() => import('./components/LiveTestAutomation'));

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