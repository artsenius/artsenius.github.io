import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

interface TransitionContainerProps {
  $isVisible: boolean;
  $duration: number;
}

const TransitionContainer = styled.div<TransitionContainerProps>`
  animation: ${props => props.$isVisible ? fadeIn : fadeOut} ${props => props.$duration}ms ease-in-out;
  animation-fill-mode: both;
`;

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  duration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  pageKey, 
  duration = 300 
}) => {
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (children !== displayedChildren) {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, update content and fade in
      const timeoutId = setTimeout(() => {
        setDisplayedChildren(children);
        setIsVisible(true);
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [children, displayedChildren, duration]);

  return (
    <TransitionContainer 
      $isVisible={isVisible} 
      $duration={duration}
      key={pageKey}
    >
      {displayedChildren}
    </TransitionContainer>
  );
};

export default PageTransition;