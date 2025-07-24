import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  return (
    <StyledThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                <PageTransition pageKey="about" duration={400}>
                  <Suspense fallback={<LoadingSpinner isDark={isDarkMode} text="Loading page..." />}>
                    <ErrorBoundary>
                      <About isDark={isDarkMode} />
                    </ErrorBoundary>
                  </Suspense>
                </PageTransition>
              } 
            />
            <Route 
              path="/about-app" 
              element={
                <PageTransition pageKey="about-app" duration={400}>
                  <Suspense fallback={<LoadingSpinner isDark={isDarkMode} text="Loading page..." />}>
                    <ErrorBoundary>
                      <AboutApp isDark={isDarkMode} />
                    </ErrorBoundary>
                  </Suspense>
                </PageTransition>
              } 
            />
            <Route 
              path="/automation" 
              element={
                <PageTransition pageKey="automation" duration={400}>
                  <Suspense fallback={<LoadingSpinner isDark={isDarkMode} text="Loading page..." />}>
                    <ErrorBoundary>
                      <LiveTestAutomation isDark={isDarkMode} />
                    </ErrorBoundary>
                  </Suspense>
                </PageTransition>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <PageTransition pageKey="contact" duration={400}>
                  <Suspense fallback={<LoadingSpinner isDark={isDarkMode} text="Loading page..." />}>
                    <ErrorBoundary>
                      <Contact isDark={isDarkMode} />
                    </ErrorBoundary>
                  </Suspense>
                </PageTransition>
              } 
            />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <BackToTop />
      </Router>
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