import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background-color: #2c3e50;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const NavContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const Header: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <Nav data-testid="header-nav">
            <NavContainer data-testid="nav-container">
                <MenuButton
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    data-testid="nav-menu-button"
                >
                    {isOpen ? '✕' : '☰'}
                </MenuButton>
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
            </NavContainer>
        </Nav>
    );
};

export default Header;