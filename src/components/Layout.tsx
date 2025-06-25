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
    padding: 0 2rem 2rem;
    width: 100%;
    
    // Ensure focus is visible when skip link is used
    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 4px;
    }
    
    &:focus:not(:focus-visible) {
        outline: none;
    }
`;

// Add screen reader announcements for route changes
const RouteAnnouncement = styled.div`
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
`;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [routeAnnouncement, setRouteAnnouncement] = React.useState('');

    // Announce route changes to screen readers
    React.useEffect(() => {
        const path = window.location.pathname;
        let pageName = '';
        
        switch (path) {
            case '/':
                pageName = 'About Me page';
                break;
            case '/about-app':
                pageName = 'About This App page';
                break;
            case '/automation':
                pageName = 'Live Test Automation page';
                break;
            case '/contact':
                pageName = 'Contact page';
                break;
            default:
                pageName = 'Page';
        }
        
        setRouteAnnouncement(`Navigated to ${pageName}`);
        
        // Clear announcement after a brief delay
        const timer = setTimeout(() => {
            setRouteAnnouncement('');
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <LayoutWrapper data-testid="layout-wrapper">
            <RouteAnnouncement 
                aria-live="polite" 
                aria-atomic="true"
                role="status"
            >
                {routeAnnouncement}
            </RouteAnnouncement>
            <Main 
                id="main-content"
                tabIndex={-1}
                data-testid="main-content"
                role="main"
                aria-label="Main content"
            >
                {children}
            </Main>
            <Footer />
        </LayoutWrapper>
    );
};

export default Layout;