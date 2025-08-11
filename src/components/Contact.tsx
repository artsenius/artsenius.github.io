import React, { useState, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const pulse = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
`;

const shimmer = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`;

const ContactSection = styled.section`
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    animation: ${fadeInUp} 0.8s ease-out;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
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

const Title = styled.h1<{ $isDark: boolean }>`
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #74b9ff, #0984e3, #00b894)'
        : 'linear-gradient(135deg, #3498db, #2c3e50, #27ae60)'
    };
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;

    @media (max-width: 768px) {
        font-size: 2.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
    }
`;

const Subtitle = styled.p<{ $isDark: boolean }>`
    font-size: 1.3rem;
    color: ${props => props.$isDark ? '#bdc3c7' : '#7f8c8d'};
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

const ContactCard = styled.div<{ $isDark: boolean; $index: number }>`
    background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
    };
    border: 1px solid ${props => props.$isDark ? '#404040' : '#e9ecef'};
    padding: 2.5rem 2rem;
    border-radius: 20px;
    box-shadow: ${props => props.$isDark 
        ? '0 10px 40px rgba(0, 0, 0, 0.3)'
        : '0 10px 40px rgba(0, 0, 0, 0.1)'
    };
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
        background: linear-gradient(90deg, #3498db, #2ecc71, #e74c3c, #f39c12);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: ${props => props.$isDark 
            ? '0 20px 60px rgba(0, 0, 0, 0.4)'
            : '0 20px 60px rgba(0, 0, 0, 0.15)'
        };
        
        &::before {
            opacity: 1;
        }
    }

    &:focus-within {
        outline: 3px solid #3498db;
        outline-offset: 4px;
    }
`;

const ContactIcon = styled.div<{ $isDark: boolean }>`
    font-size: 2.5rem;
    padding: 1.2rem;
    background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #3498db, #2980b9)'
        : 'linear-gradient(135deg, #74b9ff, #0984e3)'
    };
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
        animation: ${pulse} 1.5s infinite;
        
        &::before {
            left: 100%;
        }
    }
`;

const ContactLabel = styled.h3<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    transition: color 0.3s ease;
`;

const ContactLink = styled.a<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#74b9ff' : '#0984e3'};
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
        color: ${props => props.$isDark ? '#00b894' : '#00cec9'};
        background: ${props => props.$isDark ? 'rgba(116, 185, 255, 0.1)' : 'rgba(116, 185, 255, 0.1)'};
        transform: translateY(-2px);
    }

    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
    }
`;

const CopyButton = styled.button<{ $isDark: boolean; $isActive: boolean }>`
    background: ${props => props.$isActive 
        ? 'linear-gradient(135deg, #27ae60, #2ecc71)'
        : props.$isDark
            ? 'linear-gradient(135deg, #3498db, #2980b9)'
            : 'linear-gradient(135deg, #74b9ff, #0984e3)'
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
    background: #3498db;
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
                <HeaderSection data-testid="contact-header">
                    <Subtitle 
                        data-testid="contact-subtitle" 
                        $isDark={isDark}
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
                        $isDark={isDark}
                        $index={0}
                        role="listitem"
                        aria-labelledby="email-label"
                    >
                        <ContactIcon 
                            data-testid="contact-icon-email" 
                            aria-hidden="true"
                            $isDark={isDark}
                        >
                            📧
                        </ContactIcon>
                        <ContactLabel 
                            data-testid="contact-label-email" 
                            $isDark={isDark}
                            id="email-label"
                        >
                            Email
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-email"
                            href={`mailto:${contactInfo.email}`}
                            $isDark={isDark}
                            aria-label={`Send email to ${contactInfo.email}`}
                        >
                            {contactInfo.email}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-email"
                            onClick={() => handleCopy(contactInfo.email, 'email')}
                            aria-label={`Copy email address ${contactInfo.email} to clipboard`}
                            $isDark={isDark}
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
                        $isDark={isDark}
                        $index={1}
                        role="listitem"
                        aria-labelledby="phone-label"
                    >
                        <ContactIcon 
                            data-testid="contact-icon-phone" 
                            aria-hidden="true"
                            $isDark={isDark}
                        >
                            📱
                        </ContactIcon>
                        <ContactLabel 
                            data-testid="contact-label-phone" 
                            $isDark={isDark}
                            id="phone-label"
                        >
                            Phone
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-phone"
                            href={`tel:${contactInfo.phone}`}
                            $isDark={isDark}
                            aria-label={`Call ${contactInfo.phone}`}
                        >
                            {contactInfo.phone}
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-phone"
                            onClick={() => handleCopy(contactInfo.phone, 'phone')}
                            aria-label={`Copy phone number ${contactInfo.phone} to clipboard`}
                            $isDark={isDark}
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
                        $isDark={isDark}
                        $index={2}
                        role="listitem"
                        aria-labelledby="linkedin-label"
                    >
                        <ContactIcon 
                            data-testid="contact-icon-linkedin" 
                            aria-hidden="true"
                            $isDark={isDark}
                        >
                            💼
                        </ContactIcon>
                        <ContactLabel 
                            data-testid="contact-label-linkedin" 
                            $isDark={isDark}
                            id="linkedin-label"
                        >
                            LinkedIn
                        </ContactLabel>
                        <ContactLink
                            data-testid="contact-link-linkedin"
                            href={contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            $isDark={isDark}
                            aria-label={`Open LinkedIn profile in new tab`}
                        >
                            View Profile
                        </ContactLink>
                        <CopyButton
                            data-testid="copy-button-linkedin"
                            onClick={() => handleCopy(contactInfo.linkedin, 'linkedin')}
                            aria-label={`Copy LinkedIn profile URL to clipboard`}
                            $isDark={isDark}
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