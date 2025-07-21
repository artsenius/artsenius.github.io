import React, { useState, useRef } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const SectionTitle = styled.h1<{ $isDark: boolean }>`
    text-align: center;
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    margin-bottom: 3rem;
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
`;

const ContactContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`;

const ContactCardsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const ContactFormSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormTitle = styled.h2<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    text-align: center;
`;

const ContactGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
`;

const ContactCard = styled.div<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2d2d2d' : 'white'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: background-color 0.2s, color 0.2s, transform 0.2s;

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

const CopyButton = styled.button<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#34495e' : '#2c3e50'};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.$isDark ? '#4a5f7a' : '#34495e'};
    }

    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
    }
`;

const CopyMessage = styled.div<{ visible: boolean }>`
    color: #27ae60;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.2s;
`;

const ContactForm = styled.form<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2d2d2d' : 'white'};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const Label = styled.label<{ $isDark: boolean }>`
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-weight: 500;
`;

const Input = styled.input<{ $isDark: boolean; $hasError?: boolean }>`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid ${props => {
        if (props.$hasError) return '#e74c3c';
        return props.$isDark ? '#4a5f7a' : '#bdc3c7';
    }};
    border-radius: 4px;
    background-color: ${props => props.$isDark ? '#34495e' : 'white'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 1rem;
    transition: border-color 0.2s, background-color 0.2s, color 0.2s;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }

    &::placeholder {
        color: ${props => props.$isDark ? '#95a5a6' : '#7f8c8d'};
    }
`;

const TextArea = styled.textarea<{ $isDark: boolean; $hasError?: boolean }>`
    width: 100%;
    min-height: 120px;
    padding: 0.75rem;
    border: 2px solid ${props => {
        if (props.$hasError) return '#e74c3c';
        return props.$isDark ? '#4a5f7a' : '#bdc3c7';
    }};
    border-radius: 4px;
    background-color: ${props => props.$isDark ? '#34495e' : 'white'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.2s, background-color 0.2s, color 0.2s;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }

    &::placeholder {
        color: ${props => props.$isDark ? '#95a5a6' : '#7f8c8d'};
    }
`;

const ErrorMessage = styled.span`
    color: #e74c3c;
    font-size: 0.9rem;
    margin-top: 0.25rem;
    display: block;
`;

const SubmitButton = styled.button<{ $isDark: boolean; disabled?: boolean }>`
    background-color: ${props => props.disabled ? '#95a5a6' : '#3498db'};
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.2s, transform 0.1s;
    width: 100%;

    &:hover:not(:disabled) {
        background-color: #2980b9;
        transform: translateY(-1px);
    }

    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' | 'info'; $isDark: boolean }>`
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background-color: ${props => {
        if (props.type === 'success') return props.$isDark ? '#1e5128' : '#d4edda';
        if (props.type === 'error') return props.$isDark ? '#4a1c1c' : '#f8d7da';
        return props.$isDark ? '#1e3a8a' : '#cce5ff';
    }};
    color: ${props => {
        if (props.type === 'success') return props.$isDark ? '#a9d6b8' : '#155724';
        if (props.type === 'error') return props.$isDark ? '#f8b4b4' : '#721c24';
        return props.$isDark ? '#93c5fd' : '#004085';
    }};
    border: 1px solid ${props => {
        if (props.type === 'success') return props.$isDark ? '#2d5a3d' : '#c3e6cb';
        if (props.type === 'error') return props.$isDark ? '#672c2c' : '#f5c6cb';
        return props.$isDark ? '#2563eb' : '#b8daff';
    }};
`;

interface ContactProps {
    isDark: boolean;
}

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const Contact: React.FC<ContactProps> = ({ isDark }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [copyMessages, setCopyMessages] = useState({
        email: false,
        phone: false,
        linkedin: false
    });

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    const contactInfo = {
        email: 'arthursenko@gmail.com',
        phone: '(562) 338-9597',
        linkedin: 'https://www.linkedin.com/in/arthur-senko/'
    };

    // EmailJS configuration (these would normally be environment variables)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const EMAILJS_SERVICE_ID = 'your_service_id';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const EMAILJS_TEMPLATE_ID = 'your_template_id';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const EMAILJS_PUBLIC_KEY = 'your_public_key';

    const handleCopy = async (text: string, type: 'email' | 'phone' | 'linkedin') => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyMessages(prev => ({ ...prev, [type]: true }));
            setTimeout(() => {
                setCopyMessages(prev => ({ ...prev, [type]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setSubmitStatus({
                type: 'error',
                message: 'Please fix the errors above and try again.'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: 'info', message: 'Sending your message...' });

        try {
            // For demo purposes, we'll simulate a successful submission
            // In a real implementation, you would use EmailJS here:
            /*
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current!,
                EMAILJS_PUBLIC_KEY
            );
            */

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
            });

            // Reset form
            setFormData({ name: '', email: '', subject: '', message: '' });
            setErrors({});

        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Sorry, there was an error sending your message. Please try again or contact me directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ContactSection data-testid="contact-section">
            <SectionTitle $isDark={isDark}>Get In Touch</SectionTitle>
            
            <ContactContainer>
                <ContactCardsSection>
                    <ContactGrid data-testid="contact-grid">
                        <ContactCard 
                            data-testid="contact-card-email" 
                            $isDark={isDark}
                            role="group"
                            aria-labelledby="email-label"
                        >
                            <ContactIcon data-testid="contact-icon-email" aria-hidden="true">📧</ContactIcon>
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
                                $isDark={isDark}
                                onClick={() => handleCopy(contactInfo.email, 'email')}
                                aria-label={`Copy email address ${contactInfo.email} to clipboard`}
                            >
                                Copy Email
                            </CopyButton>
                            <CopyMessage
                                data-testid="copy-message-email"
                                visible={copyMessages.email}
                                role="status"
                                aria-live="polite"
                            >
                                Copied!
                            </CopyMessage>
                        </ContactCard>

                        <ContactCard 
                            data-testid="contact-card-phone" 
                            $isDark={isDark}
                            role="group"
                            aria-labelledby="phone-label"
                        >
                            <ContactIcon data-testid="contact-icon-phone" aria-hidden="true">📱</ContactIcon>
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
                                $isDark={isDark}
                                onClick={() => handleCopy(contactInfo.phone, 'phone')}
                                aria-label={`Copy phone number ${contactInfo.phone} to clipboard`}
                            >
                                Copy Phone
                            </CopyButton>
                            <CopyMessage
                                data-testid="copy-message-phone"
                                visible={copyMessages.phone}
                                role="status"
                                aria-live="polite"
                            >
                                Copied!
                            </CopyMessage>
                        </ContactCard>

                        <ContactCard 
                            data-testid="contact-card-linkedin" 
                            $isDark={isDark}
                            role="group"
                            aria-labelledby="linkedin-label"
                        >
                            <ContactIcon data-testid="contact-icon-linkedin" aria-hidden="true">💼</ContactIcon>
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
                                aria-label="View LinkedIn profile (opens in new tab)"
                            >
                                View Profile
                            </ContactLink>
                            <CopyButton
                                data-testid="copy-button-linkedin"
                                $isDark={isDark}
                                onClick={() => handleCopy(contactInfo.linkedin, 'linkedin')}
                                aria-label="Copy LinkedIn profile URL to clipboard"
                            >
                                Copy Profile URL
                            </CopyButton>
                            <CopyMessage
                                data-testid="copy-message-linkedin"
                                visible={copyMessages.linkedin}
                                role="status"
                                aria-live="polite"
                            >
                                Copied!
                            </CopyMessage>
                        </ContactCard>
                    </ContactGrid>
                </ContactCardsSection>

                <ContactFormSection>
                    <FormTitle $isDark={isDark} id="contact-form-title">Send Me a Message</FormTitle>
                    
                    {submitStatus.type && (
                        <StatusMessage 
                            type={submitStatus.type} 
                            $isDark={isDark}
                            role="alert"
                            aria-live="polite"
                        >
                            {submitStatus.message}
                        </StatusMessage>
                    )}

                    <ContactForm 
                        ref={formRef}
                        $isDark={isDark} 
                        onSubmit={handleSubmit}
                        noValidate
                        aria-labelledby="contact-form-title"
                    >
                        <FormGroup>
                            <Label htmlFor="name" $isDark={isDark}>
                                Name *
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                $isDark={isDark}
                                $hasError={!!errors.name}
                                placeholder="Your full name"
                                aria-describedby={errors.name ? "name-error" : undefined}
                                aria-required="true"
                            />
                            {errors.name && (
                                <ErrorMessage id="name-error" role="alert">
                                    {errors.name}
                                </ErrorMessage>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="email" $isDark={isDark}>
                                Email *
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                $isDark={isDark}
                                $hasError={!!errors.email}
                                placeholder="your.email@example.com"
                                aria-describedby={errors.email ? "email-error" : undefined}
                                aria-required="true"
                            />
                            {errors.email && (
                                <ErrorMessage id="email-error" role="alert">
                                    {errors.email}
                                </ErrorMessage>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="subject" $isDark={isDark}>
                                Subject *
                            </Label>
                            <Input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                $isDark={isDark}
                                $hasError={!!errors.subject}
                                placeholder="What's this about?"
                                aria-describedby={errors.subject ? "subject-error" : undefined}
                                aria-required="true"
                            />
                            {errors.subject && (
                                <ErrorMessage id="subject-error" role="alert">
                                    {errors.subject}
                                </ErrorMessage>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="message" $isDark={isDark}>
                                Message *
                            </Label>
                            <TextArea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                $isDark={isDark}
                                $hasError={!!errors.message}
                                placeholder="Tell me about your project, question, or just say hello!"
                                aria-describedby={errors.message ? "message-error" : undefined}
                                aria-required="true"
                            />
                            {errors.message && (
                                <ErrorMessage id="message-error" role="alert">
                                    {errors.message}
                                </ErrorMessage>
                            )}
                        </FormGroup>

                        <SubmitButton
                            type="submit"
                            $isDark={isDark}
                            disabled={isSubmitting}
                            aria-describedby="submit-help"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </SubmitButton>
                        
                        <div id="submit-help" style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: isDark ? '#95a5a6' : '#7f8c8d' }}>
                            * Required fields
                        </div>
                    </ContactForm>
                </ContactFormSection>
            </ContactContainer>
        </ContactSection>
    );
};

export default Contact;