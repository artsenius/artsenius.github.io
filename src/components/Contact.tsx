import React, { useState, useRef } from 'react';
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

const ContactCard = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 2px solid transparent;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    &:focus-within {
        border-color: #3498db;
        box-shadow: 0 6px 12px rgba(52, 152, 219, 0.2);
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
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
        color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
    }

    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
        color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }
`;

const ContactLabel = styled.h3`
    color: #34495e;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
`;

const CopyButton = styled.button`
    background-color: #2c3e50;
    color: white;
    border: 2px solid transparent;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    margin-top: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    min-height: 44px; // Minimum touch target size

    &:hover {
        background-color: #34495e;
        transform: translateY(-1px);
    }

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const CopyMessage = styled.div<{ visible: boolean }>`
    color: #27ae60;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.2s;
    font-weight: 500;
    min-height: 1.2rem; // Prevent layout shift
`;

// Screen reader announcement area
const SRAnnouncement = styled.div`
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
`;

const Contact: React.FC = () => {
    const [copyMessages, setCopyMessages] = useState({
        email: false,
        phone: false,
        linkedin: false
    });
    
    const [copyingStates, setCopyingStates] = useState({
        email: false,
        phone: false,
        linkedin: false
    });

    const [announcement, setAnnouncement] = useState('');
    const announcementRef = useRef<HTMLDivElement>(null);

    const contactInfo = {
        email: 'arthursenko@gmail.com',
        phone: '(562) 338-9597',
        linkedin: 'https://www.linkedin.com/in/arthur-senko/'
    };

    const announceToScreenReader = (message: string) => {
        setAnnouncement(message);
        setTimeout(() => setAnnouncement(''), 1000);
    };

    const handleCopy = async (text: string, type: 'email' | 'phone' | 'linkedin') => {
        if (copyingStates[type]) return; // Prevent double-clicking

        setCopyingStates(prev => ({ ...prev, [type]: true }));

        try {
            await navigator.clipboard.writeText(text);
            setCopyMessages(prev => ({ ...prev, [type]: true }));
            
            const contactType = type === 'linkedin' ? 'LinkedIn profile URL' : type;
            announceToScreenReader(`${contactType} copied to clipboard`);
            
            setTimeout(() => {
                setCopyMessages(prev => ({ ...prev, [type]: false }));
            }, 3000);
        } catch (err) {
            console.error('Failed to copy:', err);
            announceToScreenReader(`Failed to copy ${type}. Please try again.`);
        } finally {
            setCopyingStates(prev => ({ ...prev, [type]: false }));
        }
    };

    return (
        <ContactSection data-testid="contact-section" aria-labelledby="contact-heading">
            <SRAnnouncement 
                ref={announcementRef}
                aria-live="polite" 
                aria-atomic="true"
                role="status"
            >
                {announcement}
            </SRAnnouncement>
            
            <Content>
                <ContactGrid data-testid="contact-grid" role="group" aria-label="Contact information">
                    <ContactCard data-testid="contact-card-email">
                        <ContactIcon data-testid="contact-icon-email" aria-hidden="true">📧</ContactIcon>
                        <ContactLabel data-testid="contact-label-email" id="email-heading">
                            Email
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-email"
                            href={`mailto:${contactInfo.email}`}
                            aria-describedby="email-heading"
                            aria-label={`Send email to ${contactInfo.email}`}
                        >
                            {contactInfo.email}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-email"
                            onClick={() => handleCopy(contactInfo.email, 'email')}
                            disabled={copyingStates.email}
                            aria-label={`Copy email address ${contactInfo.email} to clipboard`}
                            aria-describedby={copyMessages.email ? "email-copy-success" : undefined}
                        >
                            {copyingStates.email ? 'Copying...' : 'Copy Email'}
                        </CopyButton>
                        <CopyMessage
                            id="email-copy-success"
                            data-testid="copy-message-email"
                            visible={copyMessages.email}
                            aria-live="polite"
                        >
                            {copyMessages.email ? 'Email copied!' : ''}
                        </CopyMessage>
                    </ContactCard>

                    <ContactCard data-testid="contact-card-phone">
                        <ContactIcon data-testid="contact-icon-phone" aria-hidden="true">📱</ContactIcon>
                        <ContactLabel data-testid="contact-label-phone" id="phone-heading">
                            Phone
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-phone"
                            href={`tel:${contactInfo.phone}`}
                            aria-describedby="phone-heading"
                            aria-label={`Call ${contactInfo.phone}`}
                        >
                            {contactInfo.phone}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-phone"
                            onClick={() => handleCopy(contactInfo.phone, 'phone')}
                            disabled={copyingStates.phone}
                            aria-label={`Copy phone number ${contactInfo.phone} to clipboard`}
                            aria-describedby={copyMessages.phone ? "phone-copy-success" : undefined}
                        >
                            {copyingStates.phone ? 'Copying...' : 'Copy Phone'}
                        </CopyButton>
                        <CopyMessage
                            id="phone-copy-success"
                            data-testid="copy-message-phone"
                            visible={copyMessages.phone}
                            aria-live="polite"
                        >
                            {copyMessages.phone ? 'Phone copied!' : ''}
                        </CopyMessage>
                    </ContactCard>

                    <ContactCard data-testid="contact-card-linkedin">
                        <ContactIcon data-testid="contact-icon-linkedin" aria-hidden="true">💼</ContactIcon>
                        <ContactLabel data-testid="contact-label-linkedin" id="linkedin-heading">
                            LinkedIn
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-linkedin"
                            href={contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-describedby="linkedin-heading"
                            aria-label="View LinkedIn profile (opens in new tab)"
                        >
                            View Profile
                            <span aria-hidden="true"> ↗</span>
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-linkedin"
                            onClick={() => handleCopy(contactInfo.linkedin, 'linkedin')}
                            disabled={copyingStates.linkedin}
                            aria-label="Copy LinkedIn profile URL to clipboard"
                            aria-describedby={copyMessages.linkedin ? "linkedin-copy-success" : undefined}
                        >
                            {copyingStates.linkedin ? 'Copying...' : 'Copy Profile URL'}
                        </CopyButton>
                        <CopyMessage
                            id="linkedin-copy-success"
                            data-testid="copy-message-linkedin"
                            visible={copyMessages.linkedin}
                            aria-live="polite"
                        >
                            {copyMessages.linkedin ? 'LinkedIn URL copied!' : ''}
                        </CopyMessage>
                    </ContactCard>
                </ContactGrid>
            </Content>
        </ContactSection>
    );
};

export default Contact;