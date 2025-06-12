import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout';

const App: React.FC = () => {
  // Use basename only in production for GitHub Pages
  const basename = process.env.NODE_ENV === 'production' ? '/about' : '';

  return (
    <BrowserRouter basename={basename}>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Redirect any unknown routes to the About page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;