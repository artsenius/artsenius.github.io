import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
    currentPage: 'about' | 'about-app' | 'automation' | 'contact';
    setCurrentPage: (page: 'about' | 'about-app' | 'automation' | 'contact') => void;
}

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
    width: 100%;

    @media (max-width: 768px) {
        padding: 0 1rem 1rem;
    }
`;

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
    return (
        <LayoutWrapper data-testid="layout-wrapper">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Main data-testid="main-content">{children}</Main>
            <Footer />
        </LayoutWrapper>
    );
};

export default Layout;