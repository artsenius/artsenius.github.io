import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LayoutWrapper data-testid="layout-wrapper">
            <Main data-testid="main-content">{children}</Main>
            <Footer />
        </LayoutWrapper>
    );
};

export default Layout;