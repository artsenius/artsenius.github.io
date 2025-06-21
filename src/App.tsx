import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout';
import AboutApp from './components/AboutApp';
import LiveTestAutomation from './components/LiveTestAutomation';

const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/about' : '';

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
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-app" element={<AboutApp />} />
          <Route path="/automation" element={<LiveTestAutomation />} />
          {/* Redirect any unknown routes to the About page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;