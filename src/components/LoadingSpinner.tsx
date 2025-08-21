import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;
`;

const Spinner = styled.div<{ $isDark?: boolean }>`
  border: 4px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-top: 4px solid ${props => props.$isDark ? '#4f9cf9' : '#3498db'};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p<{ $isDark?: boolean }>`
  color: ${props => props.$isDark ? '#e2e8f0' : '#64748b'};
  font-size: 1rem;
  margin: 0;
`;

interface LoadingSpinnerProps {
  isDark?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = React.memo(({ 
  isDark = false, 
  text = 'Loading...' 
}) => {
  return (
    <SpinnerContainer>
      <Spinner $isDark={isDark} />
      <LoadingText $isDark={isDark}>{text}</LoadingText>
    </SpinnerContainer>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;