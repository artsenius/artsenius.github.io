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

    &:hover {
        color: #3498db;
    }
`;

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <Nav>
            <NavContainer>
                <NavList>
                    <li><NavLink to="/" $isActive={location.pathname === "/"}>About</NavLink></li>
                    <li><NavLink to="/projects" $isActive={location.pathname === "/projects"}>Projects</NavLink></li>
                    <li><NavLink to="/contact" $isActive={location.pathname === "/contact"}>Contact</NavLink></li>
                </NavList>
            </NavContainer>
        </Nav>
    );
};

export default Header;