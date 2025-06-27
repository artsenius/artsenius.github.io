export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
    shadow: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#2c3e50',
    secondary: '#34495e',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    accent: '#3498db',
    border: '#e9ecef',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#ffffff',
    secondary: '#e9ecef',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#adb5bd',
    accent: '#4fc3f7',
    border: '#404040',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};