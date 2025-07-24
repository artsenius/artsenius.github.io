import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const Nav = styled.nav<{ $theme: any, $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2c3e50' : props.$theme.colors.primary};
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    left: 0;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const NavContainer = styled.div`
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
    }
`;

interface NavButtonProps {
    $isActive: boolean;
}

const NavButton = styled.button<NavButtonProps>`
    background: none;
    border: none;
    color: ${props => props.$isActive ? '#3498db' : 'white'};
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
    font-weight: ${props => props.$isActive ? '600' : '400'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        color: #3498db;
    }

    @media (max-width: 768px) {
        padding: 0.5rem 0;
        width: 100%;
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
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:focus {
        outline: none;
    }
`;

const ThemeToggle = styled.button<{ $theme: any }>`
    background: none;
    border: none;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
    margin-left: 1rem;
    transition: color 0.3s;
    &:hover {
        color: ${props => props.$theme.colors.secondary};
    }
`;

interface HeaderProps {
    // Removed currentPage and setCurrentPage props
}

const Header: React.FC<HeaderProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const navRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // Map URL paths to page identifiers
    const getCurrentPage = (): 'about' | 'about-app' | 'automation' | 'contact' => {
        switch (location.pathname) {
            case '/about-app':
                return 'about-app';
            case '/automation':
                return 'automation';
            case '/contact':
                return 'contact';
            case '/':
            default:
                return 'about';
        }
    };

    const currentPage = getCurrentPage();

    const getPageTitle = () => {
        switch (currentPage) {
            case 'about':
                return 'About Me';
            case 'about-app':
                return 'About This App';
            case 'automation':
                return 'Live Automation';
            case 'contact':
                return 'Contact';
            default:
                return '';
        }
    };

    const toggleMenu = () => {
        setIsOpen(prev => {
            if (!prev) {
                // Opening menu - focus first nav item after DOM update
                setTimeout(() => {
                    const firstNavItem = navRef.current?.querySelector('button');
                    firstNavItem?.focus();
                }, 10);
            }
            return !prev;
        });
    };

    // Handle keyboard navigation in mobile menu
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                menuButtonRef.current?.focus();
            }

            if (e.key === 'Tab') {
                const navItems = navRef.current?.querySelectorAll('button');
                if (!navItems) return;

                const firstItem = navItems[0];
                const lastItem = navItems[navItems.length - 1];

                if (e.shiftKey && document.activeElement === firstItem) {
                    e.preventDefault();
                    lastItem.focus();
                } else if (!e.shiftKey && document.activeElement === lastItem) {
                    e.preventDefault();
                    firstItem.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleNavItemClick = (path: string) => {
        navigate(path);
        setIsOpen(false);
        // Announce page change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = `Navigated to ${getPageTitle()} page`;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    };

    return (
        <Nav 
            data-testid="header-nav" 
            $theme={theme} 
            $isDark={isDarkMode}
            id="navigation"
            role="banner"
            aria-label="Main navigation"
        >
            <NavContainer data-testid="nav-container">
                <MenuButton
                    ref={menuButtonRef}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                    aria-controls="main-navigation"
                    data-testid="nav-menu-button"
                >
                    {isOpen ? '✕' : '☰'}
                </MenuButton>
                <MobileTitle data-testid="mobile-page-title">
                    {getPageTitle()}
                </MobileTitle>
                <NavList 
                    ref={navRef}
                    data-testid="nav-list" 
                    $isOpen={isOpen}
                    id="main-navigation"
                    role="menu"
                    aria-label="Main navigation menu"
                >
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-about" 
                            $isActive={currentPage === 'about'} 
                            onClick={() => handleNavItemClick('/')}
                            role="menuitem"
                            aria-current={currentPage === 'about' ? 'page' : undefined}
                        >
                            About Me
                        </NavButton>
                    </li>
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-about-app" 
                            $isActive={currentPage === 'about-app'} 
                            onClick={() => handleNavItemClick('/about-app')}
                            role="menuitem"
                            aria-current={currentPage === 'about-app' ? 'page' : undefined}
                        >
                            About This App
                        </NavButton>
                    </li>
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-automation" 
                            $isActive={currentPage === 'automation'} 
                            onClick={() => handleNavItemClick('/automation')}
                            role="menuitem"
                            aria-current={currentPage === 'automation' ? 'page' : undefined}
                        >
                            Live Automation
                            <LiveDot aria-hidden="true" />
                        </NavButton>
                    </li>
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-contact" 
                            $isActive={currentPage === 'contact'} 
                            onClick={() => handleNavItemClick('/contact')}
                            role="menuitem"
                            aria-current={currentPage === 'contact' ? 'page' : undefined}
                        >
                            Contact
                        </NavButton>
                    </li>
                </NavList>
                <ThemeToggle
                    onClick={toggleTheme}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    data-testid="theme-toggle"
                    $theme={theme}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </ThemeToggle>
            </NavContainer>
        </Nav>
    );
};

export default Header;