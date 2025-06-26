import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

const LayoutWrapper = styled.div<{ $isDarkMode: boolean }>`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${props => props.$isDarkMode ? darkTheme.colors.background : lightTheme.colors.background};
    color: ${props => props.$isDarkMode ? darkTheme.colors.text : lightTheme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
`;

const Main = styled.main`
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
    width: 100%;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isDarkMode } = useTheme();
    
    return (
        <LayoutWrapper data-testid="layout-wrapper" $isDarkMode={isDarkMode}>
            <Main data-testid="main-content">{children}</Main>
            <Footer />
        </LayoutWrapper>
    );
};

export default Layout;