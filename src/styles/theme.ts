export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    hover: string;
    accent: string;
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
    border: '#e9ecef',
    hover: '#3498db',
    accent: '#3498db',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#ecf0f1',
    secondary: '#bdc3c7',
    background: '#1a1a1a',
    surface: '#2c2c2c',
    text: '#ecf0f1',
    textSecondary: '#95a5a6',
    border: '#404040',
    hover: '#3498db',
    accent: '#3498db',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};