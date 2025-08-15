import React, { useState, useEffect, ReactNode } from 'react';
import styled from 'styled-components';

interface ProgressiveEnhancementProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

const FallbackContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  .loading-message {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin: 2rem 0;
  }
  
  .basic-structure {
    display: block !important;
    visibility: visible !important;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProgressiveEnhancement: React.FC<ProgressiveEnhancementProps> = ({ 
  children, 
  fallback, 
  delay = 100 
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    // Hide the basic fallback content from HTML
    const fallbackElement = document.querySelector('.basic-fallback');
    if (fallbackElement) {
      (fallbackElement as HTMLElement).style.display = 'none';
    }

    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsHydrated(true);
      setShowFallback(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Show fallback content while hydrating
  if (!isHydrated || showFallback) {
    return fallback ? (
      <FallbackContent>
        {fallback}
      </FallbackContent>
    ) : (
      <FallbackContent>
        <div className="basic-structure">
          <header>
            <nav data-testid="header-nav-fallback">
              <h1>About Me - Arthur Senko</h1>
            </nav>
          </header>
          <main>
            <section className="profile-section" data-testid="profile-section-fallback">
              <h1 data-testid="profile-name-fallback">Arthur Senko</h1>
              <h2>Lead QA Engineer, SDET, AI Enthusiast</h2>
              <div className="loading-message">
                Enhancing your experience...
              </div>
            </section>
          </main>
        </div>
      </FallbackContent>
    );
  }

  // Show enhanced React content after hydration
  return <>{children}</>;
};

export default ProgressiveEnhancement;