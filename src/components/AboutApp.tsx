import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const AboutAppSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1<{ $theme: any }>`
    color: ${props => props.$theme.colors.text};
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
`;

const Content = styled.div`
    font-size: 1.1rem;
    line-height: 1.6;

    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.5;
    }
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2<{ $theme: any }>`
    color: ${props => props.$theme.colors.text};
    font-size: 1.8rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

const SubTitle = styled.h3<{ $theme: any }>`
    color: ${props => props.$theme.colors.text};
    font-size: 1.4rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const TechStack = styled.div`
    margin-top: 1rem;
`;

const TechItem = styled.div<{ $theme: any }>`
    background-color: ${props => props.$theme.colors.surface};
    color: ${props => props.$theme.colors.text};
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid ${props => props.$theme.colors.border};
    transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const GithubLink = styled.a`
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
        color: #2980b9;
        text-decoration: underline;
    }
`;

const LiveLink = styled(Link)`
    color: #e74c3c;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s;

    &:hover {
        color: #c0392b;
    }

    &::after {
        content: '🔴';
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;

const AboutApp: React.FC = () => {
    const { theme } = useTheme();
    return (
        <AboutAppSection data-testid="about-app-section">
            <Content>
                <Section data-testid="about-app-description">
                    <p>
                        This portfolio website is more than just a resume - it's a demonstration of my
                        ability to architect and implement comprehensive end-to-end solutions. The entire project
                        was developed in about 15 hours using AI pair programming with GitHub Copilot in VS Code
                        and OpenAI's Codex. The test automation framework leverages Playwright's Model Context
                        Protocol (MCP) server to give AI access to browser automation capabilities.
                    </p>
                    <p>
                        The project showcases how modern AI tools can accelerate development while maintaining
                        high quality, incorporating best practices in web development, automated testing, and
                        continuous integration/deployment.
                    </p>
                </Section>

                <Section data-testid="about-app-components">
                    <SectionTitle $theme={theme}>Project Components</SectionTitle>
                    <TechStack>
                        <TechItem data-testid="about-app-frontend" $theme={theme}>
                            <h3>Frontend Application</h3>
                            <p>
                                A modern React application built with TypeScript, featuring responsive design
                                and smooth animations. The codebase follows best practices and is fully tested.
                            </p>
                            <GithubLink
                                href="https://github.com/artsenius/about"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="github-frontend-link"
                            >
                                View Frontend Code →
                            </GithubLink>
                        </TechItem>

                        <TechItem data-testid="about-app-backend" $theme={theme}>
                            <h3>Backend Server</h3>
                            <p>
                                An Express.js server with MongoDB integration, providing RESTful APIs for
                                storing and retrieving test automation results. Deployed on Azure for
                                reliable access.
                            </p>
                            <GithubLink
                                href="https://github.com/artsenius/about-me-backend"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="github-backend-link"
                            >
                                View Backend Code →
                            </GithubLink>
                        </TechItem>

                        <TechItem data-testid="about-app-automation-framework" $theme={theme}>
                            <h3>Test Automation Framework</h3>
                            <p>
                                A comprehensive Playwright-based automation framework implementing the Model
                                Context Protocol (MCP). Features include daily automated testing, detailed
                                reporting, and result publishing.
                            </p>
                            <GithubLink
                                href="https://github.com/artsenius/about-me-automation"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="about-app-automation-link"
                            >
                                View Automation Code →
                            </GithubLink>
                        </TechItem>
                    </TechStack>
                </Section>

                <Section data-testid="about-app-live-test-results">
                    <SectionTitle $theme={theme}>Live Test Results</SectionTitle>
                    <p>
                        This website is continuously tested using the Playwright automation framework with
                        tests running daily. You can view the live test results and detailed reports in
                        real-time on our Live Automation page.
                    </p>
                    <LiveLink
                        to="/automation"
                        data-testid="live-automation-link"
                    >
                        View Live Test Results
                    </LiveLink>
                </Section>
            </Content>
        </AboutAppSection>
    );
};

export default AboutApp;
