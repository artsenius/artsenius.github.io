import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BackToTopButton = styled.button<{ $isVisible: boolean }>`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.accent};
    color: white;
    border: none;
    cursor: pointer;
    opacity: ${props => props.$isVisible ? 1 : 0};
    visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
    transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(10px)'};
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;

    &:hover {
        background-color: #2980b9;
        transform: ${props => props.$isVisible ? 'translateY(-2px)' : 'translateY(10px)'};
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${props => props.theme.colors.accent}33;
    }

    &:active {
        transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(10px)'};
    }

    @media (max-width: 768px) {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
    }
`;

const BackToTop: React.FC = React.memo(() => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <BackToTopButton
            $isVisible={isVisible}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
        >
            ↑
        </BackToTopButton>
    );
});

BackToTop.displayName = 'BackToTop';

export default BackToTop;