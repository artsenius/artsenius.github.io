import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from './ThemeProvider';

const footerSlideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const FooterContainer = styled.footer<{ $isDark: boolean }>`
    margin-top: auto;
    padding: 2rem 0 1rem;
    background-color: ${props => props.$isDark ? '#1a1a1a' : '#2c3e50'};
    color: ${props => props.$isDark ? '#ecf0f1' : 'white'};
    animation: ${footerSlideIn} 0.6s ease-out;
    transition: background-color 0.3s ease;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    
    @media (max-width: 768px) {
        padding: 0 1rem;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        text-align: center;
    }
`;

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FooterTitle = styled.h4<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : 'white'};
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    transition: color 0.3s ease;
`;

const FooterLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const FooterLink = styled.a<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#bdc3c7' : '#ecf0f1'};
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
        color: #3498db;
        transform: translateX(5px);
    }
`;

const SocialMediaContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    
    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const SocialIcon = styled.a<{ $isDark: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${props => props.$isDark ? '#2c3e50' : '#34495e'};
    color: ${props => props.$isDark ? '#ecf0f1' : 'white'};
    border-radius: 50%;
    text-decoration: none;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #3498db;
        color: white;
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
    }
`;

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ContactItem = styled.div<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#bdc3c7' : '#ecf0f1'};
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
    
    &:hover {
        color: #3498db;
    }
`;

const FooterBottom = styled.div<{ $isDark: boolean }>`
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid ${props => props.$isDark ? '#34495e' : '#34495e'};
    text-align: center;
    color: ${props => props.$isDark ? '#95a5a6' : '#bdc3c7'};
    font-size: 0.8rem;
    transition: color 0.3s ease;
`;

const BackToTopButton = styled.button<{ $isDark: boolean }>`
    background: none;
    border: none;
    color: ${props => props.$isDark ? '#ecf0f1' : 'white'};
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 auto 1rem;
    transition: all 0.3s ease;
    
    &:hover {
        color: #3498db;
        transform: translateY(-2px);
    }
`;

const Footer: React.FC = () => {
    const { isDarkMode } = useTheme();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <FooterContainer $isDark={isDarkMode} data-testid="footer">
            <FooterContent>
                <FooterSection>
                    <FooterTitle $isDark={isDarkMode}>Navigation</FooterTitle>
                    <FooterLinks>
                        <FooterLink $isDark={isDarkMode} href="#about">
                            📄 About Me
                        </FooterLink>
                        <FooterLink $isDark={isDarkMode} href="#projects">
                            🚀 Projects
                        </FooterLink>
                        <FooterLink $isDark={isDarkMode} href="#contact">
                            ✉️ Contact
                        </FooterLink>
                        <FooterLink $isDark={isDarkMode} href="#automation">
                            🔧 Live Automation
                        </FooterLink>
                    </FooterLinks>
                </FooterSection>

                <FooterSection>
                    <FooterTitle $isDark={isDarkMode}>Connect</FooterTitle>
                    <SocialMediaContainer>
                        <SocialIcon 
                            $isDark={isDarkMode}
                            href="https://github.com/artsenius"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                        >
                            🐙
                        </SocialIcon>
                        <SocialIcon 
                            $isDark={isDarkMode}
                            href="https://linkedin.com/in/arthur-senko"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                        >
                            💼
                        </SocialIcon>
                        <SocialIcon 
                            $isDark={isDarkMode}
                            href="mailto:contact@artsenius.com"
                            aria-label="Email Contact"
                        >
                            📧
                        </SocialIcon>
                        <SocialIcon 
                            $isDark={isDarkMode}
                            href="https://twitter.com/artsenius"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter Profile"
                        >
                            🐦
                        </SocialIcon>
                    </SocialMediaContainer>
                </FooterSection>

                <FooterSection>
                    <FooterTitle $isDark={isDarkMode}>Contact Info</FooterTitle>
                    <ContactInfo>
                        <ContactItem $isDark={isDarkMode}>
                            📍 Location: San Francisco, CA
                        </ContactItem>
                        <ContactItem $isDark={isDarkMode}>
                            📧 Email: contact@artsenius.com
                        </ContactItem>
                        <ContactItem $isDark={isDarkMode}>
                            🌐 Website: artsenius.github.io
                        </ContactItem>
                        <ContactItem $isDark={isDarkMode}>
                            💼 Open to opportunities
                        </ContactItem>
                    </ContactInfo>
                </FooterSection>
            </FooterContent>

            <FooterBottom $isDark={isDarkMode}>
                <BackToTopButton 
                    $isDark={isDarkMode}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    ↑ Back to Top
                </BackToTopButton>
                <p data-testid="footer-copyright">
                    © {currentYear} Arthur Senko. All rights reserved. Built with React & TypeScript ❤️
                </p>
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;
