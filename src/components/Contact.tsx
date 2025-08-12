import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { fadeInUp, pulseScale } from '../styles/animations';

const ContactSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    animation: ${fadeInUp} 0.8s ease-out;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const PageTitle = styled.h1`
    color: ${props => props.theme.colors.text};
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    animation: ${fadeInUp} 0.8s ease-out;
    position: relative;
    letter-spacing: -0.02em;

    &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 4rem;
        height: 3px;
        background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accent}66);
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const HeaderSection = styled.div`
    text-align: center;
    margin-bottom: 4rem;
    animation: ${fadeInUp} 0.8s ease-out 0.2s both;

    @media (max-width: 768px) {
        margin-bottom: 3rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.3rem;
    color: ${props => props.theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const ContactGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    margin-top: 3rem;
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-top: 2rem;
    }
    
    @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
        max-width: 1000px;
        margin: 3rem auto 0;
    }
`;

const ContactCard = styled.div<{ $index: number }>`
    background: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    padding: 2.5rem 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px ${props => props.theme.colors.shadow};
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 0.25, 0, 1);
    animation: ${fadeInUp} 0.8s ease-out ${props => 0.3 + props.$index * 0.1}s both;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${props => props.theme.colors.accent}, #2ecc71, #e74c3c, #f39c12);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 20px 60px ${props => props.theme.colors.shadow};
        
        &::before {
            opacity: 1;
        }
    }

    &:focus-within {
        outline: 3px solid ${props => props.theme.colors.accent};
        outline-offset: 4px;
    }
`;

const ContactIcon = styled.div`
    font-size: 2.5rem;
    padding: 1.2rem;
    background: linear-gradient(135deg, ${props => props.theme.colors.accent}, #2980b9);
    border-radius: 50%;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
        );
        transition: left 0.6s ease;
    }

    &:hover {
        transform: scale(1.1);
        animation: ${pulseScale} 1.5s infinite;
        
        &::before {
            left: 100%;
        }
    }
`;

const ContactLabel = styled.h3`
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    transition: color 0.3s ease;
`;

const ContactLink = styled.a`
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    display: block;
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        color: #00b894;
        background: ${props => props.theme.colors.hover};
        transform: translateY(-2px);
    }

    &:focus {
        outline: 2px solid ${props => props.theme.colors.accent};
        outline-offset: 2px;
    }
`;

const CopyButton = styled.button<{ $isActive: boolean }>`
    background: ${props => props.$isActive 
        ? 'linear-gradient(135deg, #27ae60, #2ecc71)'
        : `linear-gradient(135deg, ${props.theme.colors.accent}, #2980b9)`
    };
    color: white;
    border: none;
    padding: 0.8rem 1.8rem;
    border-radius: 25px;
    margin-top: 1rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
        );
        transition: left 0.5s ease;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
        
        &::before {
            left: 100%;
        }
    }

    &:active {
        transform: translateY(-1px);
    }

    &:focus {
        outline: 2px solid #fff;
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const CopyMessage = styled.div<{ visible: boolean; $isError?: boolean }>`
    color: ${props => props.$isError ? '#e74c3c' : '#27ae60'};
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 0.8rem;
    opacity: ${props => props.visible ? 1 : 0};
    transform: translateY(${props => props.visible ? '0' : '10px'});
    transition: all 0.3s ease;
    min-height: 1.2rem;
`;

const SkipLink = styled.a`
    position: absolute;
    top: -40px;
    left: 6px;
    background: ${props => props.theme.colors.accent};
    color: white;
    padding: 8px 12px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    z-index: 1000;
    
    &:focus {
        top: 6px;
    }
`;

interface ContactProps {
    isDark: boolean;
}

interface CopyState {
    email: boolean;
    phone: boolean;
    linkedin: boolean;
    email_error?: boolean;
    phone_error?: boolean;
    linkedin_error?: boolean;
}

const Contact: React.FC<ContactProps> = React.memo(({ isDark }) => {

    const [copyMessages, setCopyMessages] = useState<CopyState>({
        email: false,
        phone: false,
        linkedin: false
    });

    const contactInfo = useMemo(() => ({
        email: 'arthursenko@gmail.com',
        phone: '(562) 338-9597',
        linkedin: 'https://www.linkedin.com/in/arthur-senko/'
    }), []);

    const handleCopy = useCallback(async (text: string, type: 'email' | 'phone' | 'linkedin') => {
        try {
            // Clear any previous messages
            setCopyMessages(prev => ({ 
                ...prev, 
                [type]: false, 
                [`${type}_error`]: false 
            }));

            if (!navigator.clipboard) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (!successful) {
                    throw new Error('Fallback copy failed');
                }
            } else {
                await navigator.clipboard.writeText(text);
            }
            
            setCopyMessages(prev => ({ ...prev, [type]: true }));
            
            // Announce to screen readers
            const announcement = `${type} copied to clipboard: ${text}`;
            const ariaLive = document.createElement('div');
            ariaLive.setAttribute('aria-live', 'assertive');
            ariaLive.setAttribute('aria-atomic', 'true');
            ariaLive.textContent = announcement;
            ariaLive.style.position = 'absolute';
            ariaLive.style.left = '-10000px';
            ariaLive.style.height = '1px';
            ariaLive.style.overflow = 'hidden';
            document.body.appendChild(ariaLive);
            
            setTimeout(() => {
                if (document.body.contains(ariaLive)) {
                    document.body.removeChild(ariaLive);
                }
                setCopyMessages(prev => ({ ...prev, [type]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyMessages(prev => ({ 
                ...prev, 
                [`${type}_error`]: true 
            }));
            
            setTimeout(() => {
                setCopyMessages(prev => ({ ...prev, [`${type}_error`]: false }));
            }, 3000);
        }
    }, []);

    return (
        <>
            <SkipLink 
                href="#contact-grid" 
                data-testid="skip-to-contact"
            >
                Skip to contact information
            </SkipLink>
            <ContactSection 
                data-testid="contact-section" 
                role="main" 
                aria-labelledby="contact-title"
            >
                <PageTitle 
                    id="contact-title" 
                    data-testid="contact-page-title"
                >
                    Contact
                </PageTitle>
                
                <HeaderSection data-testid="contact-header">
                    <Subtitle 
                        data-testid="contact-subtitle"
                    >
                        Let's connect and discuss exciting opportunities together
                    </Subtitle>
                </HeaderSection>

                <ContactGrid 
                    data-testid="contact-grid" 
                    id="contact-grid"
                    role="list"
                    aria-label="Contact information"
                >
                    <ContactCard 
                        data-testid="contact-card-email"
                        $index={0}
                        role="listitem"
                        aria-labelledby="email-label"
                    >
                        <ContactIcon 
                            data-testid="contact-icon-email" 
                            aria-hidden="true"
                        >
                            📧
                        </ContactIcon>
                        <ContactLabel 
                            data-testid="contact-label-email" 
                            id="email-label"
                        >
                            Email
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-email"
                            href={`mailto:${contactInfo.email}`}
                            aria-label={`Send email to ${contactInfo.email}`}
                        >
                            {contactInfo.email}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-email"
                            onClick={() => handleCopy(contactInfo.email, 'email')}
                            aria-label={`Copy email address ${contactInfo.email} to clipboard`}
                            $isActive={copyMessages.email}
                            disabled={copyMessages.email}
                        >
                            {copyMessages.email ? '✓ Copied!' : 'Copy Email'}
                        </CopyButton>
                        <CopyMessage
                            data-testid="copy-message-email"
                            visible={copyMessages.email}
                            role="status"
                            aria-live="polite"
                        >
                            Email copied to clipboard!
                        </CopyMessage>
                        <CopyMessage
                            data-testid="copy-error-message-email"
                            visible={!!copyMessages.email_error}
                            $isError={true}
                            role="alert"
                            aria-live="assertive"
                        >
                            Failed to copy. Please try again.
                        </CopyMessage>
                    </ContactCard>

                    <ContactCard 
                        data-testid="contact-card-phone" 
                        $index={1}
                        role="listitem"
                        aria-labelledby="phone-label"
                    >
                        <ContactIcon 
                            data-testid="contact-icon-phone" 
                            aria-hidden="true"
                        >
                            📱
                        </ContactIcon>
                        <ContactLabel 
                            data-testid="contact-label-phone" 
                            id="phone-label"
                        >
                            Phone
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-phone"
                            href={`tel:${contactInfo.phone}`}
                            aria-label={`Call ${contactInfo.phone}`}
                        >
                            {contactInfo.phone}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-phone"
                            onClick={() => handleCopy(contactInfo.phone, 'phone')}
                            aria-label={`Copy phone number ${contactInfo.phone} to clipboard`}
                            $isActive={copyMessages.phone}
                            disabled={copyMessages.phone}
                        >
                            {copyMessages.phone ? '✓ Copied!' : 'Copy Phone'}
                        </CopyButton>
                        <CopyMessage
                            data-testid="copy-message-phone"
                            visible={copyMessages.phone}
                            role="status"
                            aria-live="polite"
                        >
                            Phone number copied to clipboard!
                        </CopyMessage>
                        <CopyMessage
                            data-testid="copy-error-message-phone"
                            visible={!!copyMessages.phone_error}
                            $isError={true}
                            role="alert"
                            aria-live="assertive"
                        >
                            Failed to copy. Please try again.
                        </CopyMessage>
                    </ContactCard>

                    <ContactCard 
                        data-testid="contact-card-linkedin" 
                        $index={2}
                        role="listitem"
                        aria-labelledby="linkedin-label"
                    >
                        <ContactIcon 
                            data-testid="contact-icon-linkedin" 
                            aria-hidden="true"
                        >
                            💼
                        </ContactIcon>
                        <ContactLabel 
                            data-testid="contact-label-linkedin" 
                            id="linkedin-label"
                        >
                            LinkedIn
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-linkedin"
                            href={contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open LinkedIn profile in new tab`}
                        >
                            View Profile
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-linkedin"
                            onClick={() => handleCopy(contactInfo.linkedin, 'linkedin')}
                            aria-label={`Copy LinkedIn profile URL to clipboard`}
                            $isActive={copyMessages.linkedin}
                            disabled={copyMessages.linkedin}
                        >
                            {copyMessages.linkedin ? '✓ Copied!' : 'Copy Profile URL'}
                        </CopyButton>
                        <CopyMessage
                            data-testid="copy-message-linkedin"
                            visible={copyMessages.linkedin}
                            role="status"
                            aria-live="polite"
                        >
                            LinkedIn URL copied to clipboard!
                        </CopyMessage>
                        <CopyMessage
                            data-testid="copy-error-message-linkedin"
                            visible={!!copyMessages.linkedin_error}
                            $isError={true}
                            role="alert"
                            aria-live="assertive"
                        >
                            Failed to copy. Please try again.
                        </CopyMessage>
                    </ContactCard>
                </ContactGrid>
            </ContactSection>
        </>
    );
});

Contact.displayName = 'Contact';

export default Contact;