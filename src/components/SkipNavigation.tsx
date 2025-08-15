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
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    /* Remain hidden even on focus */
    &:focus {
        left: -999px;
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