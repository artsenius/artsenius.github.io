import React from 'react';
import styled from 'styled-components';

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

const Footer = styled.footer`
    background-color: #f5f5f5;
    padding: 1rem;
    text-align: center;
    margin-top: auto;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LayoutWrapper>
            <Main>{children}</Main>
            <Footer>
                <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
            </Footer>
        </LayoutWrapper>
    );
};

export default Layout;