import React, { useState } from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h1`
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const ContactGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
`;

const ContactCard = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ContactIcon = styled.div`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2c3e50;
`;

const ContactLink = styled.a`
    color: #2c3e50;
    text-decoration: none;
    font-size: 1.1rem;
    display: block;
    margin-top: 1rem;
    transition: color 0.2s;

    &:hover {
        color: #3498db;
    }
`;

const ContactLabel = styled.h3`
    color: #34495e;
    margin-bottom: 0.5rem;
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

const Contact: React.FC = () => {
    const [copyMessages, setCopyMessages] = useState({
        email: false,
        phone: false
    });

    const contactInfo = {
        email: 'arthursenko@gmail.com',
        phone: '(562) 338-9597',
        linkedin: 'https://www.linkedin.com/in/arthur-senko/'
    };

    const handleCopy = async (text: string, type: 'email' | 'phone') => {
        await navigator.clipboard.writeText(text);
        setCopyMessages(prev => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setCopyMessages(prev => ({ ...prev, [type]: false }));
        }, 2000);
    };

    return (
        <ContactSection data-testid="contact-section">
            <Title data-testid="contact-title">Get in Touch</Title>
            <ContactGrid data-testid="contact-grid">
                <ContactCard data-testid="contact-card-email">
                    <ContactIcon data-testid="contact-icon-email">📧</ContactIcon>
                    <ContactLabel data-testid="contact-label-email">Email</ContactLabel>
                    <ContactLink 
                        data-testid="contact-link-email"
                        href={`mailto:${contactInfo.email}`}
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

                <ContactCard data-testid="contact-card-phone">
                    <ContactIcon data-testid="contact-icon-phone">📱</ContactIcon>
                    <ContactLabel data-testid="contact-label-phone">Phone</ContactLabel>
                    <ContactLink 
                        data-testid="contact-link-phone"
                        href={`tel:${contactInfo.phone}`}
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

                <ContactCard data-testid="contact-card-linkedin">
                    <ContactIcon data-testid="contact-icon-linkedin">💼</ContactIcon>
                    <ContactLabel data-testid="contact-label-linkedin">LinkedIn</ContactLabel>
                    <ContactLink
                        data-testid="contact-link-linkedin"
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Profile
                    </ContactLink>
                </ContactCard>
            </ContactGrid>
        </ContactSection>
    );
};

export default Contact;