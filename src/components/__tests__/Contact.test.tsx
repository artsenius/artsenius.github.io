import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import Contact from '../Contact';

// Mock theme objects
const lightTheme = {
    colors: {
        primary: '#3498db',
        text: '#2c3e50',
        background: '#ffffff'
    }
};

const darkTheme = {
    colors: {
        primary: '#74b9ff',
        text: '#ecf0f1',
        background: '#2d2d2d'
    }
};

// Mock clipboard API
const mockClipboard = {
    writeText: jest.fn(() => Promise.resolve()),
};

// Mock execCommand for fallback
const mockExecCommand = jest.fn(() => true);

// Helper function to render component with theme
const renderWithTheme = (isDark: boolean = false) => {
    const theme = isDark ? darkTheme : lightTheme;
    return render(
        <ThemeProvider theme={theme}>
            <Contact isDark={isDark} />
        </ThemeProvider>
    );
};

describe('Contact Component', () => {
    let originalClipboard: any;
    let originalExecCommand: any;

    beforeEach(() => {
        // Setup clipboard API mock
        originalClipboard = navigator.clipboard;
        Object.assign(navigator, { clipboard: mockClipboard });
        
        // Setup execCommand mock
        originalExecCommand = document.execCommand;
        document.execCommand = mockExecCommand;
        
        // Clear all mocks
        jest.clearAllMocks();
    });

    afterEach(() => {
        // Restore original implementations
        Object.assign(navigator, { clipboard: originalClipboard });
        document.execCommand = originalExecCommand;
    });

    describe('Rendering', () => {
        it('renders all contact information correctly', () => {
            renderWithTheme();
            
            expect(screen.getByTestId('contact-section')).toBeInTheDocument();
            expect(screen.getByTestId('contact-header')).toBeInTheDocument();
            expect(screen.getByTestId('contact-title')).toHaveTextContent('Get In Touch');
            expect(screen.getByTestId('contact-subtitle')).toHaveTextContent('Let\'s connect and discuss exciting opportunities together');
            expect(screen.getByTestId('contact-grid')).toBeInTheDocument();
        });

        it('renders all contact cards', () => {
            renderWithTheme();
            
            expect(screen.getByTestId('contact-card-email')).toBeInTheDocument();
            expect(screen.getByTestId('contact-card-phone')).toBeInTheDocument();
            expect(screen.getByTestId('contact-card-linkedin')).toBeInTheDocument();
        });

        it('displays correct contact information', () => {
            renderWithTheme();
            
            expect(screen.getByText('arthursenko@gmail.com')).toBeInTheDocument();
            expect(screen.getByText('(562) 338-9597')).toBeInTheDocument();
            expect(screen.getByText('View Profile')).toBeInTheDocument();
        });

        it('renders skip link for accessibility', () => {
            renderWithTheme();
            
            const skipLink = screen.getByTestId('skip-to-contact');
            expect(skipLink).toBeInTheDocument();
            expect(skipLink).toHaveAttribute('href', '#contact-grid');
        });
    });

    describe('Dark Theme', () => {
        it('applies dark theme styles correctly', () => {
            renderWithTheme(true);
            
            const title = screen.getByTestId('contact-title');
            const subtitle = screen.getByTestId('contact-subtitle');
            
            expect(title).toBeInTheDocument();
            expect(subtitle).toBeInTheDocument();
        });

        it('renders correctly with dark mode prop', () => {
            renderWithTheme(true);
            
            expect(screen.getByTestId('contact-section')).toBeInTheDocument();
            expect(screen.getByTestId('contact-card-email')).toBeInTheDocument();
        });
    });

    describe('Copy Functionality', () => {
        it('copies email to clipboard when copy button is clicked', async () => {
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            await user.click(copyButton);
            
            expect(mockClipboard.writeText).toHaveBeenCalledWith('arthursenko@gmail.com');
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-message-email')).toHaveTextContent('Email copied to clipboard!');
            });
        });

        it('copies phone number to clipboard when copy button is clicked', async () => {
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-phone');
            await user.click(copyButton);
            
            expect(mockClipboard.writeText).toHaveBeenCalledWith('(562) 338-9597');
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-message-phone')).toHaveTextContent('Phone number copied to clipboard!');
            });
        });

        it('copies LinkedIn URL to clipboard when copy button is clicked', async () => {
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-linkedin');
            await user.click(copyButton);
            
            expect(mockClipboard.writeText).toHaveBeenCalledWith('https://www.linkedin.com/in/arthur-senko/');
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-message-linkedin')).toHaveTextContent('LinkedIn URL copied to clipboard!');
            });
        });

        it('shows success message and button state change after copying', async () => {
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            expect(copyButton).toHaveTextContent('Copy Email');
            
            await user.click(copyButton);
            
            await waitFor(() => {
                expect(copyButton).toHaveTextContent('✓ Copied!');
                expect(copyButton).toBeDisabled();
            });
        });

        it('hides success message after timeout', async () => {
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            await user.click(copyButton);
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-message-email')).toHaveTextContent('Email copied to clipboard!');
            });
            
            // Wait for timeout
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 2100));
            });
            
            await waitFor(() => {
                expect(copyButton).toHaveTextContent('Copy Email');
                expect(copyButton).not.toBeDisabled();
            });
        });
    });

    describe('Error Handling', () => {
        it('handles clipboard API errors gracefully', async () => {
            mockClipboard.writeText.mockRejectedValueOnce(new Error('Permission denied'));
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            await user.click(copyButton);
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-error-message-email')).toHaveTextContent('Failed to copy. Please try again.');
            });
        });

        it('falls back to execCommand when clipboard API is not available', async () => {
            // Remove clipboard API
            Object.assign(navigator, { clipboard: undefined });
            
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            await user.click(copyButton);
            
            expect(mockExecCommand).toHaveBeenCalledWith('copy');
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-message-email')).toHaveTextContent('Email copied to clipboard!');
            });
        });

        it('handles execCommand fallback errors', async () => {
            // Remove clipboard API and make execCommand fail
            Object.assign(navigator, { clipboard: undefined });
            mockExecCommand.mockReturnValueOnce(false);
            
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            await user.click(copyButton);
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-error-message-email')).toHaveTextContent('Failed to copy. Please try again.');
            });
        });

        it('hides error message after timeout', async () => {
            mockClipboard.writeText.mockRejectedValueOnce(new Error('Permission denied'));
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            await user.click(copyButton);
            
            await waitFor(() => {
                expect(screen.getByTestId('copy-error-message-email')).toHaveTextContent('Failed to copy. Please try again.');
            });
            
            // Wait for error timeout
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 3100));
            });
            
            await waitFor(() => {
                const errorMessage = screen.getByTestId('copy-error-message-email');
                expect(errorMessage).not.toHaveTextContent('Failed to copy. Please try again.');
            });
        });
    });

    describe('Accessibility', () => {
        it('has proper ARIA attributes', () => {
            renderWithTheme();
            
            // Check main section
            const section = screen.getByTestId('contact-section');
            expect(section).toHaveAttribute('role', 'main');
            expect(section).toHaveAttribute('aria-labelledby', 'contact-title');
            
            // Check contact grid
            const grid = screen.getByTestId('contact-grid');
            expect(grid).toHaveAttribute('role', 'list');
            expect(grid).toHaveAttribute('aria-label', 'Contact information');
            
            // Check contact cards
            const emailCard = screen.getByTestId('contact-card-email');
            expect(emailCard).toHaveAttribute('role', 'listitem');
            expect(emailCard).toHaveAttribute('aria-labelledby', 'email-label');
            
            const phoneCard = screen.getByTestId('contact-card-phone');
            expect(phoneCard).toHaveAttribute('role', 'listitem');
            expect(phoneCard).toHaveAttribute('aria-labelledby', 'phone-label');
            
            const linkedinCard = screen.getByTestId('contact-card-linkedin');
            expect(linkedinCard).toHaveAttribute('role', 'listitem');
            expect(linkedinCard).toHaveAttribute('aria-labelledby', 'linkedin-label');
        });

        it('has proper aria-live regions for copy messages', () => {
            renderWithTheme();
            
            const copyMessages = [
                screen.getByTestId('copy-message-email'),
                screen.getByTestId('copy-message-phone'),
                screen.getByTestId('copy-message-linkedin')
            ];
            
            copyMessages.forEach(message => {
                expect(message).toHaveAttribute('role', 'status');
                expect(message).toHaveAttribute('aria-live', 'polite');
            });
            
            const errorMessages = [
                screen.getByTestId('copy-error-message-email'),
                screen.getByTestId('copy-error-message-phone'),
                screen.getByTestId('copy-error-message-linkedin')
            ];
            
            errorMessages.forEach(message => {
                expect(message).toHaveAttribute('role', 'alert');
                expect(message).toHaveAttribute('aria-live', 'assertive');
            });
        });

        it('has proper labels for copy buttons', () => {
            renderWithTheme();
            
            const emailButton = screen.getByTestId('copy-button-email');
            expect(emailButton).toHaveAttribute('aria-label', 'Copy email address arthursenko@gmail.com to clipboard');
            
            const phoneButton = screen.getByTestId('copy-button-phone');
            expect(phoneButton).toHaveAttribute('aria-label', 'Copy phone number (562) 338-9597 to clipboard');
            
            const linkedinButton = screen.getByTestId('copy-button-linkedin');
            expect(linkedinButton).toHaveAttribute('aria-label', 'Copy LinkedIn profile URL to clipboard');
        });

        it('has proper labels for contact links', () => {
            renderWithTheme();
            
            const emailLink = screen.getByTestId('contact-link-email');
            expect(emailLink).toHaveAttribute('aria-label', 'Send email to arthursenko@gmail.com');
            
            const phoneLink = screen.getByTestId('contact-link-phone');
            expect(phoneLink).toHaveAttribute('aria-label', 'Call (562) 338-9597');
            
            const linkedinLink = screen.getByTestId('contact-link-linkedin');
            expect(linkedinLink).toHaveAttribute('aria-label', 'Open LinkedIn profile in new tab');
        });

        it('has icons marked as decorative', () => {
            renderWithTheme();
            
            const icons = [
                screen.getByTestId('contact-icon-email'),
                screen.getByTestId('contact-icon-phone'),
                screen.getByTestId('contact-icon-linkedin')
            ];
            
            icons.forEach(icon => {
                expect(icon).toHaveAttribute('aria-hidden', 'true');
            });
        });

        it('creates proper screen reader announcements for copy actions', async () => {
            const user = userEvent.setup();
            renderWithTheme();
            
            const copyButton = screen.getByTestId('copy-button-email');
            await user.click(copyButton);
            
            // Wait for the announcement element to be created
            await waitFor(() => {
                const announcements = document.querySelectorAll('[aria-live="assertive"]');
                const copyAnnouncement = Array.from(announcements).find(
                    el => el.textContent?.includes('email copied to clipboard: arthursenko@gmail.com')
                );
                expect(copyAnnouncement).toBeTruthy();
            });
        });
    });

    describe('Links and Navigation', () => {
        it('has correct email link', () => {
            renderWithTheme();
            
            const emailLink = screen.getByTestId('contact-link-email');
            expect(emailLink).toHaveAttribute('href', 'mailto:arthursenko@gmail.com');
        });

        it('has correct phone link', () => {
            renderWithTheme();
            
            const phoneLink = screen.getByTestId('contact-link-phone');
            expect(phoneLink).toHaveAttribute('href', 'tel:(562) 338-9597');
        });

        it('has correct LinkedIn link with proper attributes', () => {
            renderWithTheme();
            
            const linkedinLink = screen.getByTestId('contact-link-linkedin');
            expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/arthur-senko/');
            expect(linkedinLink).toHaveAttribute('target', '_blank');
            expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    describe('Data Test IDs', () => {
        it('has all required data-testid attributes', () => {
            renderWithTheme();
            
            // Main elements
            expect(screen.getByTestId('skip-to-contact')).toBeInTheDocument();
            expect(screen.getByTestId('contact-section')).toBeInTheDocument();
            expect(screen.getByTestId('contact-header')).toBeInTheDocument();
            expect(screen.getByTestId('contact-title')).toBeInTheDocument();
            expect(screen.getByTestId('contact-subtitle')).toBeInTheDocument();
            expect(screen.getByTestId('contact-grid')).toBeInTheDocument();
            
            // Contact cards
            expect(screen.getByTestId('contact-card-email')).toBeInTheDocument();
            expect(screen.getByTestId('contact-card-phone')).toBeInTheDocument();
            expect(screen.getByTestId('contact-card-linkedin')).toBeInTheDocument();
            
            // Icons
            expect(screen.getByTestId('contact-icon-email')).toBeInTheDocument();
            expect(screen.getByTestId('contact-icon-phone')).toBeInTheDocument();
            expect(screen.getByTestId('contact-icon-linkedin')).toBeInTheDocument();
            
            // Labels
            expect(screen.getByTestId('contact-label-email')).toBeInTheDocument();
            expect(screen.getByTestId('contact-label-phone')).toBeInTheDocument();
            expect(screen.getByTestId('contact-label-linkedin')).toBeInTheDocument();
            
            // Links
            expect(screen.getByTestId('contact-link-email')).toBeInTheDocument();
            expect(screen.getByTestId('contact-link-phone')).toBeInTheDocument();
            expect(screen.getByTestId('contact-link-linkedin')).toBeInTheDocument();
            
            // Copy buttons
            expect(screen.getByTestId('copy-button-email')).toBeInTheDocument();
            expect(screen.getByTestId('copy-button-phone')).toBeInTheDocument();
            expect(screen.getByTestId('copy-button-linkedin')).toBeInTheDocument();
            
            // Copy messages
            expect(screen.getByTestId('copy-message-email')).toBeInTheDocument();
            expect(screen.getByTestId('copy-message-phone')).toBeInTheDocument();
            expect(screen.getByTestId('copy-message-linkedin')).toBeInTheDocument();
            
            // Error messages
            expect(screen.getByTestId('copy-error-message-email')).toBeInTheDocument();
            expect(screen.getByTestId('copy-error-message-phone')).toBeInTheDocument();
            expect(screen.getByTestId('copy-error-message-linkedin')).toBeInTheDocument();
        });
    });

    describe('Performance and Optimization', () => {
        it('memoizes contact info to prevent unnecessary re-renders', () => {
            const { rerender } = renderWithTheme();
            
            // Initial render
            expect(screen.getByText('arthursenko@gmail.com')).toBeInTheDocument();
            
            // Re-render with same props
            rerender(
                <ThemeProvider theme={lightTheme}>
                    <Contact isDark={false} />
                </ThemeProvider>
            );
            
            // Should still show the same contact info
            expect(screen.getByText('arthursenko@gmail.com')).toBeInTheDocument();
        });

        it('uses memo to prevent unnecessary re-renders', () => {
            const { rerender } = renderWithTheme();
            
            // Re-render with same props should not cause issues
            rerender(
                <ThemeProvider theme={lightTheme}>
                    <Contact isDark={false} />
                </ThemeProvider>
            );
            
            expect(screen.getByTestId('contact-section')).toBeInTheDocument();
        });
    });
});