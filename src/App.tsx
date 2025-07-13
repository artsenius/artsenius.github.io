import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout';
import AboutApp from './components/AboutApp';
import LiveTestAutomation from './components/LiveTestAutomation';
import BackToTop from './components/BackToTop';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const AppContent: React.FC = () => {
  const { isDarkMode, theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <Router basename="/about">
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<About isDark={isDarkMode} />} />
            <Route path="/about-app" element={<AboutApp isDark={isDarkMode} />} />
            <Route path="/automation" element={<LiveTestAutomation isDark={isDarkMode} />} />
            <Route path="/contact" element={<Contact isDark={isDarkMode} />} />
          </Routes>
        </Layout>
        <BackToTop />
      </Router>
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