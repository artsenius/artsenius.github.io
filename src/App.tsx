import React, { useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout';
import AboutApp from './components/AboutApp';
import LiveTestAutomation from './components/LiveTestAutomation';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

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
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Layout>
        <PageTransition pageKey={currentPage} duration={400}>
          {PageComponent}
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