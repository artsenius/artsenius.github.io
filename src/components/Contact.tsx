import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const ContactSection = styled.section`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Content = styled.div`
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.5;
    }
`;

const ContactGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    justify-content: center;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
`;

const ContactCard = styled.div<{ $theme: any }>`
    background-color: ${props => props.$theme.colors.surface};
    color: ${props => props.$theme.colors.text};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px ${props => props.$theme.colors.shadow};
    text-align: center;
    transition: transform 0.2s, background-color 0.3s ease, color 0.3s ease;
    border: 1px solid ${props => props.$theme.colors.border};

    &:hover {
        transform: translateY(-5px);
        background-color: ${props => props.$theme.colors.hover};
    }
`;

const ContactIcon = styled.div<{ $theme: any }>`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.$theme.colors.text};
`;

const ContactLink = styled.a<{ $theme: any }>`
    color: ${props => props.$theme.colors.text};
    text-decoration: none;
    font-size: 1.1rem;
    display: block;
    margin-top: 1rem;
    transition: color 0.2s;

    &:hover {
        color: ${props => props.$theme.colors.accent};
    }
`;

const ContactLabel = styled.h3<{ $theme: any }>`
    color: ${props => props.$theme.colors.text};
    margin-bottom: 0.5rem;
`;

const CopyButton = styled.button<{ $theme: any }>`
    background-color: ${props => props.$theme.colors.accent};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.$theme.colors.hover === '#404040' ? '#2980b9' : '#34495e'};
    }
`;

const CopyMessage = styled.div<{ visible: boolean }>`
    color: #27ae60;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.2s;
`;

const Contact: React.FC = () => {
    const { theme } = useTheme();
    const [copyMessages, setCopyMessages] = useState({
        email: false,
        phone: false,
        linkedin: false
    });

    const contactInfo = {
        email: 'arthursenko@gmail.com',
        phone: '(562) 338-9597',
        linkedin: 'https://www.linkedin.com/in/arthur-senko/'
    };

    const handleCopy = async (text: string, type: 'email' | 'phone' | 'linkedin') => {
        await navigator.clipboard.writeText(text);
        setCopyMessages(prev => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setCopyMessages(prev => ({ ...prev, [type]: false }));
        }, 2000);
    };

    return (
        <ContactSection data-testid="contact-section">
            <Content>
                <ContactGrid data-testid="contact-grid">
                    <ContactCard data-testid="contact-card-email" $theme={theme}>
                        <ContactIcon data-testid="contact-icon-email" $theme={theme}>📧</ContactIcon>
                        <ContactLabel data-testid="contact-label-email" $theme={theme}>Email</ContactLabel>
                        <ContactLink
                            data-testid="contact-link-email"
                            href={`mailto:${contactInfo.email}`}
                            $theme={theme}
                        >
                            {contactInfo.email}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-email"
                            onClick={() => handleCopy(contactInfo.email, 'email')}
                            $theme={theme}
                        >
                            Copy Email
                        </CopyButton>
                        <CopyMessage
                            data-testid="copy-message-email"
                            visible={copyMessages.email}
                        >
                            Copied!
                        </CopyMessage>
                    </ContactCard>

                    <ContactCard data-testid="contact-card-phone" $theme={theme}>
                        <ContactIcon data-testid="contact-icon-phone" $theme={theme}>📱</ContactIcon>
                        <ContactLabel data-testid="contact-label-phone" $theme={theme}>Phone</ContactLabel>
                        <ContactLink
                            data-testid="contact-link-phone"
                            href={`tel:${contactInfo.phone}`}
                            $theme={theme}
                        >
                            {contactInfo.phone}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-phone"
                            onClick={() => handleCopy(contactInfo.phone, 'phone')}
                            $theme={theme}
                        >
                            Copy Phone
                        </CopyButton>
                        <CopyMessage
                            data-testid="copy-message-phone"
                            visible={copyMessages.phone}
                        >
                            Copied!
                        </CopyMessage>
                    </ContactCard>

                    <ContactCard data-testid="contact-card-linkedin" $theme={theme}>
                        <ContactIcon data-testid="contact-icon-linkedin" $theme={theme}>💼</ContactIcon>
                        <ContactLabel data-testid="contact-label-linkedin" $theme={theme}>LinkedIn</ContactLabel>
                        <ContactLink
                            data-testid="contact-link-linkedin"
                            href={contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            $theme={theme}
                        >
                            View Profile
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-linkedin"
                            onClick={() => handleCopy(contactInfo.linkedin, 'linkedin')}
                            $theme={theme}
                        >
                            Copy Profile URL
                        </CopyButton>
                        <CopyMessage
                            data-testid="copy-message-linkedin"
                            visible={copyMessages.linkedin}
                        >
                            Copied!
                        </CopyMessage>
                    </ContactCard>
                </ContactGrid>
            </Content>
        </ContactSection>
    );
};

export default Contact;