import { keyframes } from 'styled-components';

// Fade and slide animations
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const fadeIn = keyframes`
  from { 
    opacity: 0; 
  }
  to { 
    opacity: 1; 
  }
`;

// Pulse animations
export const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

export const pulseScale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Loading animations
export const shimmer = keyframes`
  0% {
    background-position: -1200px 0;
  }
  100% {
    background-position: 1200px 0;
  }
`;

export const spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

// Page transition animation
export const pageSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;