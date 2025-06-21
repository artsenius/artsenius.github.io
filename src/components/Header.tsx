import React from 'react';
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
    padding: 0 2rem;
`;

const NavList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2rem;
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

    &:hover {
        color: #3498db;
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

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <Nav data-testid="header-nav">
            <NavContainer data-testid="nav-container">
                <NavList data-testid="nav-list">
                    <li><NavLink data-testid="nav-link-about" to="/" $isActive={location.pathname === "/"}>About Me</NavLink></li>
                    <li><NavLink data-testid="nav-link-about-app" to="/about-app" $isActive={location.pathname === "/about-app"}>About This App</NavLink></li>
                    <li>
                        <NavLink data-testid="nav-link-automation" to="/automation" $isActive={location.pathname === "/automation"}>
                            Live Automation
                            <LiveDot />
                        </NavLink>
                    </li>
                    <li><NavLink data-testid="nav-link-contact" to="/contact" $isActive={location.pathname === "/contact"}>Contact</NavLink></li>
                </NavList>
            </NavContainer>
        </Nav>
    );
};

export default Header;