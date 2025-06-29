import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout';
import AboutApp from './components/AboutApp';
import LiveTestAutomation from './components/LiveTestAutomation';

interface ThemeProps {
  $isDark: boolean;
}

const GlobalStyle = createGlobalStyle<ThemeProps>`
  body {
    background-color: ${props => props.$isDark ? '#1a1a1a' : '#ffffff'};
    color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/about' : '';
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  React.useEffect(() => {
    // Check for redirect data in session storage
    const redirectDataStr = sessionStorage.getItem('redirectData');
    if (redirectDataStr) {
      try {
        const redirectData = JSON.parse(redirectDataStr);
        const { path, timestamp } = redirectData;

        // Only use the redirect if it's less than 5 seconds old to prevent stale redirects
        if (Date.now() - timestamp < 5000 && path && path !== '/') {
          // Clean up session storage
          sessionStorage.removeItem('redirectData');

          // Use the router's navigate function to restore the path
          window.history.replaceState(null, '', basename + path);
        }
      } catch (e) {
        console.error('Error parsing redirect data:', e);
        sessionStorage.removeItem('redirectData');
      }
    }
  }, [basename]);

  return (
    <BrowserRouter basename={basename}>
      <GlobalStyle $isDark={isDark} />
      <Layout>
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<About isDark={isDark} />} />
          <Route path="/contact" element={<Contact isDark={isDark} />} />
          <Route path="/about-app" element={<AboutApp isDark={isDark} />} />
          <Route path="/automation" element={<LiveTestAutomation isDark={isDark} />} />
          {/* Redirect any unknown routes to the About page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;