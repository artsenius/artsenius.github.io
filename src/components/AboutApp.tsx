import React from 'react';
import styled from 'styled-components';

const AboutAppSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
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

const SectionTitle = styled.h2<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 1.8rem;
    margin-bottom: 1rem;
    transition: color 0.3s;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

const SubSectionTitle = styled.h3<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    margin-top: 1.5rem;
    transition: color 0.3s;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

const TechStack = styled.div`
    margin-top: 1rem;
`;

const TechItem = styled.div<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2d2d2d' : '#f8f9fa'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: background-color 0.3s, color 0.3s;
`;

const FeatureList = styled.ul`
    margin: 1rem 0;
    padding-left: 1.5rem;
`;

const FeatureItem = styled.li`
    margin-bottom: 0.5rem;
`;

const ArchitectureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ArchitectureCard = styled.div<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2d2d2d' : '#f8f9fa'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    transition: background-color 0.3s, color 0.3s;
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

const LiveButton = styled.button`
    color: #e74c3c;
    background: none;
    border: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;

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

interface AboutAppProps {
    isDark: boolean;
    onGoToAutomation?: () => void;
}

const AboutApp: React.FC<AboutAppProps> = ({ isDark, onGoToAutomation }) => {
    return (
        <AboutAppSection data-testid="about-app-section">
            <Content>
                <Section data-testid="about-app-description">
                    <p data-testid="about-app-description-paragraph-1">
                        This website build from scratch by me demonstrates a complete end-to-end solution architecture, showcasing modern development practices, 
                        AI-powered development workflows, and comprehensive automation testing. The project consists of a <strong>React frontend</strong> hosted on 
                        <strong> GitHub Pages</strong>, an <strong>Express.js + MongoDB backend</strong> hosted on <strong>Azure Cloud</strong>, and 
                        <strong> Playwright test automation</strong> running in <strong>GitHub Actions</strong> with a robust CI/CD pipeline.
                    </p>
                    <p data-testid="about-app-description-paragraph-2">
                        The entire solution was developed using modern AI-powered tools including <strong>Cursor IDE</strong> with Background Agents 
                        integrated with <strong>Slack</strong> and <strong>Playwright's Model Context Protocol (MCP) </strong> 
                        for intelligent test automation.
                    </p>
                </Section>

                <Section data-testid="about-app-architecture">
                    <SectionTitle data-testid="architecture-title" $isDark={isDark}>System Architecture & CI/CD Pipeline</SectionTitle>
                    <p data-testid="architecture-description">
                        The application implements a complete CI/CD process where merging code to the <code>main</code> branch triggers automated deployments 
                        and comprehensive testing workflows:
                    </p>
                    
                    <ArchitectureGrid data-testid="architecture-grid">
                        <ArchitectureCard data-testid="frontend-deployment-card" $isDark={isDark}>
                            <h4 data-testid="frontend-deployment-title">Frontend Deployment</h4>
                            <p data-testid="frontend-deployment-description">React app → GitHub Pages → Test Automation trigger</p>
                            <FeatureList data-testid="frontend-features">
                                <FeatureItem data-testid="frontend-feature-1">Automatic build and deployment on <code>main</code> branch merge</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-2">Custom domain configuration (www.arthursenko.com)</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-3">Triggers automated testing pipeline post-deployment</FeatureItem>
                            </FeatureList>
                        </ArchitectureCard>
                        
                        <ArchitectureCard data-testid="backend-deployment-card" $isDark={isDark}>
                            <h4 data-testid="backend-deployment-title">Backend Deployment</h4>
                            <p data-testid="backend-deployment-description">Express.js + MongoDB → Azure Cloud</p>
                            <FeatureList data-testid="backend-features">
                                <FeatureItem data-testid="backend-feature-1">Auto-deployment to Azure on <code>main</code> branch merge</FeatureItem>
                                <FeatureItem data-testid="backend-feature-2">MongoDB Atlas integration for data persistence</FeatureItem>
                                <FeatureItem data-testid="backend-feature-3">RESTful API for test results and application data</FeatureItem>
                            </FeatureList>
                        </ArchitectureCard>
                    </ArchitectureGrid>
                </Section>

                <Section data-testid="about-app-components">
                    <SectionTitle data-testid="components-title" $isDark={isDark}>Application Components</SectionTitle>
                    <TechStack>
                        <TechItem data-testid="about-app-frontend" $isDark={isDark}>
                            <SubSectionTitle data-testid="frontend-title" $isDark={isDark}>Frontend Application</SubSectionTitle>
                            <p data-testid="frontend-description">
                                A modern React application built from scratch with TypeScript, featuring PWA capabilities, 
                                comprehensive responsive design, and advanced user experience enhancements.
                            </p>
                            
                            <h4 data-testid="frontend-features-title">Key Features:</h4>
                            <FeatureList data-testid="frontend-features-list">
                                <FeatureItem data-testid="frontend-feature-responsive"><strong>Responsive Mobile Design:</strong> Fully optimized for mobile devices with adaptive layouts, touch-friendly interactions, and mobile-first CSS media queries</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-dark-mode"><strong>Dark Mode Implementation:</strong> Complete theme system with persistent user preferences, smooth transitions, and system preference detection</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-sticky-footer"><strong>Sticky Footer Layout:</strong> Header and footer always visible, even on short pages, ensuring optimal user experience</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-code-quality"><strong>Code Quality Tools:</strong> ESLint with pre-commit hooks, automated CI/CD checks, and comprehensive TypeScript integration</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-animations"><strong>Advanced Animations:</strong> CSS keyframe animations, hover effects, loading shimmer effects, and smooth page transitions</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-interactive"><strong>Interactive Components:</strong> Collapsible navigation, expandable content sections, live status indicators with pulse animations</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-accessibility"><strong>Accessibility Features:</strong> ARIA labels, keyboard navigation support, focus management, and semantic HTML structure</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-performance"><strong>Performance Optimizations:</strong> Component lazy loading, optimized images, and efficient state management</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-typescript"><strong>TypeScript Integration:</strong> Full type safety with custom interfaces and comprehensive error handling</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-styled"><strong>Styled Components:</strong> Dynamic theming, responsive breakpoints, and component-scoped styling</FeatureItem>
                            </FeatureList>

                            <GithubLink
                                href="https://github.com/artsenius/about"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="github-frontend-link"
                            >
                                View Frontend Code →
                            </GithubLink>
                        </TechItem>

                        <TechItem data-testid="about-app-backend" $isDark={isDark}>
                            <SubSectionTitle data-testid="backend-title" $isDark={isDark}>Backend Server</SubSectionTitle>
                            <p data-testid="backend-description">
                                A robust Express.js server with MongoDB integration, providing secure and scalable 
                                RESTful APIs for data management and test result storage.
                            </p>
                            
                            <h4 data-testid="backend-features-title">Technical Features:</h4>
                            <FeatureList data-testid="backend-features-list">
                                <FeatureItem data-testid="backend-feature-express"><strong>Express.js Framework:</strong> RESTful API design with middleware for CORS, security, and error handling</FeatureItem>
                                <FeatureItem data-testid="backend-feature-mongodb"><strong>MongoDB Integration:</strong> Document-based data storage with Mongoose ODM for schema validation</FeatureItem>
                                <FeatureItem data-testid="backend-feature-azure"><strong>Azure Cloud Hosting:</strong> Scalable cloud deployment with automatic scaling and high availability</FeatureItem>
                                <FeatureItem data-testid="backend-feature-api"><strong>API Endpoints:</strong> Comprehensive endpoints for test result storage, retrieval, and analytics</FeatureItem>
                                <FeatureItem data-testid="backend-feature-security"><strong>Security Features:</strong> Input validation, rate limiting, and secure data handling practices</FeatureItem>
                                <FeatureItem data-testid="backend-feature-deployment"><strong>Auto-Deployment:</strong> Continuous deployment pipeline triggered by <code>main</code> branch updates</FeatureItem>
                            </FeatureList>

                            <GithubLink
                                href="https://github.com/artsenius/about-me-backend"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="github-backend-link"
                            >
                                View Backend Code →
                            </GithubLink>
                        </TechItem>

                        <TechItem data-testid="about-app-automation-framework" $isDark={isDark}>
                            <SubSectionTitle data-testid="automation-title" $isDark={isDark}>Test Automation Framework & Live Results</SubSectionTitle>
                            <p data-testid="automation-description">
                                A comprehensive Playwright-based automation framework implementing the Model Context Protocol (MCP) 
                                for AI-driven test creation and execution. The framework provides continuous testing with detailed 
                                reporting and real-time result visualization.
                            </p>
                            
                            <h4 data-testid="automation-features-title">Automation Features:</h4>
                            <FeatureList data-testid="automation-features-list">
                                <FeatureItem data-testid="automation-feature-mcp"><strong>Playwright MCP Integration:</strong> AI-powered test generation using Model Context Protocol for intelligent browser automation</FeatureItem>
                                <FeatureItem data-testid="automation-feature-multi-trigger"><strong>Multi-Trigger Execution:</strong> Tests run daily via scheduled GitHub Actions and are automatically triggered after frontend deployments</FeatureItem>
                                <FeatureItem data-testid="automation-feature-cross-browser"><strong>Cross-Browser Testing:</strong> Comprehensive testing across Chromium, Firefox, and WebKit browsers</FeatureItem>
                                <FeatureItem data-testid="automation-feature-reporting"><strong>Comprehensive Reporting:</strong> Detailed HTML reports with screenshots, video recordings, and performance metrics</FeatureItem>
                                <FeatureItem data-testid="automation-feature-publishing"><strong>Result Publishing:</strong> Automated upload of test results to the backend server for persistent storage and analysis</FeatureItem>
                                <FeatureItem data-testid="automation-feature-dashboard"><strong>Live Dashboard:</strong> Real-time test result visualization with expandable details, error tracking, and historical data</FeatureItem>
                                <FeatureItem data-testid="automation-feature-cicd"><strong>CI/CD Integration:</strong> Seamless integration with GitHub Actions for automated testing in the deployment pipeline</FeatureItem>
                                <FeatureItem data-testid="automation-feature-performance"><strong>Performance Monitoring:</strong> Test execution time tracking, success rate analytics, and trend analysis</FeatureItem>
                            </FeatureList>

                            <p data-testid="automation-summary">
                                The test automation framework generates comprehensive reports after each run, uploads results to the backend server, 
                                and provides a live dashboard where you can view all recent test executions, detailed results, and historical trends 
                                on the Live Automation page.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1rem' }}>
                                <GithubLink
                                    href="https://github.com/artsenius/about-me-automation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="about-app-automation-link"
                                >
                                    View Automation Code →
                                </GithubLink>
                                
                                <LiveButton
                                    type="button"
                                    onClick={onGoToAutomation}
                                    data-testid="live-automation-link"
                                >
                                    View Live Test Results
                                </LiveButton>
                            </div>
                        </TechItem>
                    </TechStack>
                </Section>

                <Section data-testid="about-app-development-tools">
                    <SectionTitle data-testid="development-tools-title" $isDark={isDark}>Development Tools & AI Integration</SectionTitle>
                    <p data-testid="development-tools-description">
                        This project showcases the power of modern AI-assisted development workflows and demonstrates 
                        how cutting-edge tools can accelerate development while maintaining code quality:
                    </p>
                    
                    <FeatureList data-testid="development-tools-list">
                        <FeatureItem data-testid="development-tool-cursor"><strong>Cursor IDE:</strong> AI-powered code editor with intelligent code suggestions and refactoring capabilities</FeatureItem>
                        <FeatureItem data-testid="development-tool-agents"><strong>Background Agents:</strong> Automated AI agents integrated with Slack for continuous monitoring and notifications</FeatureItem>
                        <FeatureItem data-testid="development-tool-mcp"><strong>Playwright MCP:</strong> Model Context Protocol integration enabling AI to directly interact with browser automation tools</FeatureItem>
                        <FeatureItem data-testid="development-tool-typescript"><strong>TypeScript:</strong> Full type safety and enhanced developer experience with IntelliSense</FeatureItem>
                        <FeatureItem data-testid="development-tool-github"><strong>GitHub Actions:</strong> Automated CI/CD pipeline with parallel job execution and dependency management</FeatureItem>
                    </FeatureList>
                </Section>
            </Content>
        </AboutAppSection>
    );
};

export default AboutApp;
