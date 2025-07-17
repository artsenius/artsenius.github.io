import React from 'react';
import styled from 'styled-components';

const SkipNavContainer = styled.div`
    position: absolute;
    top: -100px;
    left: 0;
    z-index: 9999;
`;

const SkipLink = styled.a`
    position: absolute;
    top: -100px;
    left: 8px;
    background: #000;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: top 0.2s ease;
    
    &:focus {
        top: 8px;
        outline: 3px solid #3498db;
        outline-offset: 2px;
    }
`;

const SkipNavigation: React.FC = () => {
    return (
        <SkipNavContainer>
            <SkipLink href="#main-content">
                Skip to main content
            </SkipLink>
            <SkipLink href="#navigation">
                Skip to navigation
            </SkipLink>
        </SkipNavContainer>
    );
};

export default SkipNavigation;