import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  // No props needed now - using React Router hooks
}

const Header: React.FC<HeaderProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

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
                return 'About Me';
        }
    };

    const isActivePage = (path: string) => {
        return location.pathname === path;
    };

    const navigateTo = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <Nav data-testid="header-nav" $theme={theme} $isDark={isDarkMode}>
            <NavContainer data-testid="nav-container">
                <MenuButton
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    data-testid="nav-menu-button"
                >
                    {isOpen ? '✕' : '☰'}
                </MenuButton>
                <MobileTitle data-testid="mobile-page-title">
                    {getPageTitle()}
                </MobileTitle>
                <NavList data-testid="nav-list" $isOpen={isOpen}>
                    <li><NavButton data-testid="nav-link-about" $isActive={isActivePage('/')} onClick={() => navigateTo('/')}>About Me</NavButton></li>
                    <li><NavButton data-testid="nav-link-about-app" $isActive={isActivePage('/about-app')} onClick={() => navigateTo('/about-app')}>About This App</NavButton></li>
                    <li>
                        <NavButton data-testid="nav-link-automation" $isActive={isActivePage('/automation')} onClick={() => navigateTo('/automation')}>
                            Live Automation
                            <LiveDot />
                        </NavButton>
                    </li>
                    <li><NavButton data-testid="nav-link-contact" $isActive={isActivePage('/contact')} onClick={() => navigateTo('/contact')}>Contact</NavButton></li>
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