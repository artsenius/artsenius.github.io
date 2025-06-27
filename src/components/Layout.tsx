import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import Footer from './Footer';

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: all 0.3s ease;
`;

const Main = styled.main`
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
    width: 100%;
`;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { theme } = useTheme();
    
    return (
        <LayoutWrapper data-testid="layout-wrapper" theme={theme}>
            <Main data-testid="main-content">{children}</Main>
            <Footer />
        </LayoutWrapper>
    );
};

export default Layout;