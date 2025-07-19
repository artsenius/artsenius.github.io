import React, { useState, Suspense } from 'react';
import Layout from './components/Layout';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
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
      PageComponent = <AboutApp isDark={isDarkMode} onGoToAutomation={() => setCurrentPage('automation')} />;
      break;
    case 'automation':
      PageComponent = <LiveTestAutomation isDark={isDarkMode} />;
      break;
    case 'contact':
      PageComponent = <Contact isDark={isDarkMode} />;
      break;
    case 'about':
    default:
      PageComponent = <About isDark={isDarkMode} setCurrentPage={setCurrentPage} />;
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
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;