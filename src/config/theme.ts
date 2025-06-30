import { Theme } from '../types/theme';

export const lightTheme: Theme = {
  colors: {
    primary: '#2c3e50',
    secondary: '#34495e',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2c3e50',
    textSecondary: '#6c757d',
    border: '#dee2e6',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#3498db',
    hover: '#e9ecef'
  }
};

export const darkTheme: Theme = {
  colors: {
    primary: '#2c3e50', // Dark header to match footer
    secondary: '#34495e',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ecf0f1',
    textSecondary: '#95a5a6',
    border: '#404040',
    shadow: 'rgba(0, 0, 0, 0.3)',
    accent: '#3498db',
    hover: '#404040'
  }
};