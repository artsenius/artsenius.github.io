import React, { useState } from 'react';
import styled from 'styled-components';

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

const ContactCard = styled.div<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2d2d2d' : 'white'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ContactIcon = styled.div`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2c3e50;
`;

const ContactLabel = styled.h3<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#34495e'};
    margin-bottom: 0.5rem;
    transition: color 0.3s;
`;

const ContactLink = styled.a<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    text-decoration: none;
    font-size: 1.1rem;
    display: block;
    margin-top: 1rem;
    transition: color 0.2s;

    &:hover {
        color: #3498db;
    }
`;

const CopyButton = styled.button`
    background-color: #2c3e50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #34495e;
    }
`;

const CopyMessage = styled.div<{ visible: boolean }>`
    color: #27ae60;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.2s;
`;

interface ContactProps {
    isDark: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDark }) => {
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
                    <ContactCard data-testid="contact-card-email" $isDark={isDark}>
                        <ContactIcon data-testid="contact-icon-email">📧</ContactIcon>
                        <ContactLabel data-testid="contact-label-email" $isDark={isDark}>Email</ContactLabel>
                        <ContactLink
                            data-testid="contact-link-email"
                            href={`mailto:${contactInfo.email}`}
                            $isDark={isDark}
                        >
                            {contactInfo.email}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-email"
                            onClick={() => handleCopy(contactInfo.email, 'email')}
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

                    <ContactCard data-testid="contact-card-phone" $isDark={isDark}>
                        <ContactIcon data-testid="contact-icon-phone">📱</ContactIcon>
                        <ContactLabel data-testid="contact-label-phone" $isDark={isDark}>Phone</ContactLabel>
                        <ContactLink
                            data-testid="contact-link-phone"
                            href={`tel:${contactInfo.phone}`}
                            $isDark={isDark}
                        >
                            {contactInfo.phone}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-phone"
                            onClick={() => handleCopy(contactInfo.phone, 'phone')}
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

                    <ContactCard data-testid="contact-card-linkedin" $isDark={isDark}>
                        <ContactIcon data-testid="contact-icon-linkedin">💼</ContactIcon>
                        <ContactLabel data-testid="contact-label-linkedin" $isDark={isDark}>LinkedIn</ContactLabel>
                        <ContactLink
                            data-testid="contact-link-linkedin"
                            href={contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            $isDark={isDark}
                        >
                            View Profile
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-linkedin"
                            onClick={() => handleCopy(contactInfo.linkedin, 'linkedin')}
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