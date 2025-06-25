import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background-color: #2c3e50;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100vw;
    left: 0;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);

    @media (max-width: 768px) {
        margin-left: -2rem;
        margin-right: -2rem;
        width: calc(100% + 4rem);
    }
`;

const NavContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        padding: 0 1rem;
    }
`;

const MobileTitle = styled.h1`
    display: none;
    color: white;
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
    flex: 1;
    padding: 0 3rem; // Space for menu button

    @media (max-width: 768px) {
        display: block;
    }
`;

const NavList = styled.ul<{ $isOpen: boolean }>`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
        display: ${props => props.$isOpen ? 'flex' : 'none'};
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #2c3e50;
        padding: 1rem;
        gap: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-top: 1px solid #34495e;
    }
`;

interface NavLinkProps {
    $isActive: boolean;
}

const NavLink = styled(Link) <NavLinkProps>`
    color: ${props => props.$isActive ? '#3498db' : 'white'};
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease, outline 0.2s ease;
    font-weight: ${props => props.$isActive ? '600' : '400'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    padding: 0.5rem;
    border-radius: 4px;
    position: relative;

    &:hover {
        color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
    }

    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
        color: #3498db;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }

    @media (max-width: 768px) {
        padding: 0.75rem;
        width: 100%;
        justify-content: flex-start;
    }
`;

const LiveDot = styled.span`
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }

    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #e74c3c;
    border-radius: 50%;
    animation: pulse 2s infinite;
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    border: 2px solid transparent;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
    border-radius: 4px;
    transition: all 0.2s ease;

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }

    &:focus {
        outline: none;
        border-color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
    }

    &:focus:not(:focus-visible) {
        border-color: transparent;
        background-color: transparent;
    }
`;

// Skip link for screen reader users
const SkipLink = styled.a`
    position: absolute;
    top: -40px;
    left: 6px;
    background: #3498db;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    font-size: 0.9rem;
    transition: top 0.2s ease;

    &:focus {
        top: 6px;
    }
`;

// Screen reader only text
const SROnly = styled.span`
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
`;

const Header: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'About Me';
            case '/about-app':
                return 'About This App';
            case '/automation':
                return 'Live Automation';
            case '/contact':
                return 'Contact';
            default:
                return '';
        }
    };

    const toggleMenu = () => {
        setIsOpen((prev: boolean) => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
        // Return focus to menu button after closing
        if (menuButtonRef.current) {
            menuButtonRef.current.focus();
        }
    };

    // Handle escape key to close menu
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    // Handle keyboard navigation in menu
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen || !menuRef.current) return;

        const menuItems = Array.from(menuRef.current.querySelectorAll('a')) as HTMLElement[];
        const currentIndex = menuItems.findIndex(item => item === document.activeElement);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
                menuItems[nextIndex]?.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                menuItems[prevIndex]?.focus();
                break;
            case 'Home':
                e.preventDefault();
                menuItems[0]?.focus();
                break;
            case 'End':
                e.preventDefault();
                menuItems[menuItems.length - 1]?.focus();
                break;
        }
    };

    // Add keyboard navigation when menu is open
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    // Focus first menu item when menu opens
    useEffect(() => {
        if (isOpen && menuRef.current) {
            const firstMenuItem = menuRef.current.querySelector('a') as HTMLElement;
            firstMenuItem?.focus();
        }
    }, [isOpen]);

    return (
        <>
            <SkipLink href="#main-content">
                Skip to main content
            </SkipLink>
            <Nav role="banner" data-testid="header-nav">
                <NavContainer data-testid="nav-container">
                    <MenuButton
                        ref={menuButtonRef}
                        onClick={toggleMenu}
                        aria-expanded={isOpen}
                        aria-controls="main-navigation"
                        aria-label={`${isOpen ? 'Close' : 'Open'} navigation menu`}
                        data-testid="nav-menu-button"
                    >
                        {isOpen ? '✕' : '☰'}
                        <SROnly>
                            {isOpen ? 'Close menu' : 'Open menu'}
                        </SROnly>
                    </MenuButton>
                    <MobileTitle data-testid="mobile-page-title">
                        {getPageTitle()}
                    </MobileTitle>
                    <NavList 
                        ref={menuRef}
                        id="main-navigation"
                        role="navigation"
                        aria-label="Main navigation"
                        data-testid="nav-list" 
                        $isOpen={isOpen}
                    >
                        <li role="none">
                            <NavLink 
                                data-testid="nav-link-about" 
                                to="/" 
                                $isActive={location.pathname === "/"} 
                                onClick={closeMenu}
                                aria-current={location.pathname === "/" ? "page" : undefined}
                            >
                                About Me
                            </NavLink>
                        </li>
                        <li role="none">
                            <NavLink 
                                data-testid="nav-link-about-app" 
                                to="/about-app" 
                                $isActive={location.pathname === "/about-app"} 
                                onClick={closeMenu}
                                aria-current={location.pathname === "/about-app" ? "page" : undefined}
                            >
                                About This App
                            </NavLink>
                        </li>
                        <li role="none">
                            <NavLink 
                                data-testid="nav-link-automation" 
                                to="/automation" 
                                $isActive={location.pathname === "/automation"} 
                                onClick={closeMenu}
                                aria-current={location.pathname === "/automation" ? "page" : undefined}
                            >
                                Live Automation
                                <LiveDot aria-hidden="true" />
                                <SROnly>(Live updates available)</SROnly>
                            </NavLink>
                        </li>
                        <li role="none">
                            <NavLink 
                                data-testid="nav-link-contact" 
                                to="/contact" 
                                $isActive={location.pathname === "/contact"} 
                                onClick={closeMenu}
                                aria-current={location.pathname === "/contact" ? "page" : undefined}
                            >
                                Contact
                            </NavLink>
                        </li>
                    </NavList>
                </NavContainer>
            </Nav>
        </>
    );
};

export default Header;