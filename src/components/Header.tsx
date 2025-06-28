import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const Nav = styled.nav<{ $theme: any }>`
    background-color: ${props => props.$theme.colors.primary};
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100vw;
    left: 0;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    transition: background-color 0.3s ease;

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
    }
`;

interface NavLinkProps {
    $isActive: boolean;
}

const NavLink = styled(Link) <NavLinkProps>`
    color: ${props => props.$isActive ? '#3498db' : 'white'};
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
    font-weight: ${props => props.$isActive ? '600' : '400'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;

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
    border: 2px solid ${props => props.$theme.colors.accent};
    color: ${props => props.$theme.colors.accent};
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    margin-left: auto;

    &:hover {
        background-color: ${props => props.$theme.colors.accent};
        color: ${props => props.$theme.colors.primary};
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${props => props.$theme.colors.accent}33;
    }

    @media (max-width: 768px) {
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
        margin-left: 0;
        margin-right: 0.5rem;
    }
`;

const Header: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, isDarkMode, toggleTheme } = useTheme();

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

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <Nav data-testid="header-nav" $theme={theme}>
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
                    <li><NavLink data-testid="nav-link-about" to="/" $isActive={location.pathname === "/"} onClick={() => setIsOpen(false)}>About Me</NavLink></li>
                    <li><NavLink data-testid="nav-link-about-app" to="/about-app" $isActive={location.pathname === "/about-app"} onClick={() => setIsOpen(false)}>About This App</NavLink></li>
                    <li>
                        <NavLink data-testid="nav-link-automation" to="/automation" $isActive={location.pathname === "/automation"} onClick={() => setIsOpen(false)}>
                            Live Automation
                            <LiveDot />
                        </NavLink>
                    </li>
                    <li><NavLink data-testid="nav-link-contact" to="/contact" $isActive={location.pathname === "/contact"} onClick={() => setIsOpen(false)}>Contact</NavLink></li>
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