import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const AboutAppSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    scroll-behavior: smooth;

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

const Section = styled.div<{ delay?: number }>`
    margin-bottom: 3rem;
    animation: ${fadeInUp} 0.8s ease-out ${props => (props.delay || 0) * 0.2}s both;
    
    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const SectionTitle = styled.h2<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 3px;
        background: linear-gradient(135deg, #3498db, #2ecc71);
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const SubSectionTitle = styled.h3<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

const TechStack = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const TechItem = styled.div<{ $isDark: boolean; category?: string }>`
    background: ${props => {
        if (props.category === 'frontend') return props.$isDark ? 'linear-gradient(135deg, #2d2d2d, #1a365d)' : 'linear-gradient(135deg, #f8f9fa, #e3f2fd)';
        if (props.category === 'backend') return props.$isDark ? 'linear-gradient(135deg, #2d2d2d, #1a4a2e)' : 'linear-gradient(135deg, #f8f9fa, #e8f5e8)';
        if (props.category === 'automation') return props.$isDark ? 'linear-gradient(135deg, #2d2d2d, #4a1a1a)' : 'linear-gradient(135deg, #f8f9fa, #ffeaa7)';
        return props.$isDark ? '#2d2d2d' : '#f8f9fa';
    }};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid ${props => {
        if (props.category === 'frontend') return '#3498db';
        if (props.category === 'backend') return '#2ecc71';
        if (props.category === 'automation') return '#e67e22';
        return '#3498db';
    }};
    transition: all 0.3s ease;
    box-shadow: ${props => props.$isDark 
        ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
        : '0 4px 6px rgba(0, 0, 0, 0.1)'};
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: ${props => {
            if (props.category === 'frontend') return 'linear-gradient(90deg, #3498db, #2ecc71)';
            if (props.category === 'backend') return 'linear-gradient(90deg, #2ecc71, #f39c12)';
            if (props.category === 'automation') return 'linear-gradient(90deg, #e67e22, #e74c3c)';
            return 'linear-gradient(90deg, #3498db, #2ecc71)';
        }};
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${props => props.$isDark 
            ? '0 8px 25px rgba(0, 0, 0, 0.4)' 
            : '0 8px 25px rgba(0, 0, 0, 0.15)'};
    }
    
    &:focus-within {
        outline: 2px solid ${props => props.$isDark ? '#3498db' : '#2980b9'};
        outline-offset: 2px;
    }
`;

const FeatureList = styled.ul`
    margin: 1.5rem 0;
    padding-left: 1.5rem;
    
    &[role="list"] {
        list-style: none;
        padding-left: 0;
    }
`;

const FeatureItem = styled.li<{ delay?: number }>`
    margin-bottom: 0.8rem;
    position: relative;
    animation: ${slideInLeft} 0.6s ease-out ${props => (props.delay || 0) * 0.1}s both;
    
    &::before {
        content: '✓';
        color: #2ecc71;
        font-weight: bold;
        margin-right: 0.5rem;
    }
    
    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const ArchitectureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

const ArchitectureCard = styled.div<{ $isDark: boolean; delay?: number }>`
    background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #2d2d2d, #1e3a8a)' 
        : 'linear-gradient(135deg, #ffffff, #f0f8ff)'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid #3498db;
    transition: all 0.3s ease;
    box-shadow: ${props => props.$isDark 
        ? '0 6px 20px rgba(0, 0, 0, 0.3)' 
        : '0 6px 20px rgba(0, 0, 0, 0.1)'};
    animation: ${fadeInUp} 0.8s ease-out ${props => (props.delay || 0) * 0.3}s both;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2ecc71, #f39c12);
        border-radius: 12px 12px 0 0;
    }

    &:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: ${props => props.$isDark 
            ? '0 12px 40px rgba(0, 0, 0, 0.4)' 
            : '0 12px 40px rgba(0, 0, 0, 0.15)'};
    }

    h4 {
        color: ${props => props.$isDark ? '#64b5f6' : '#1976d2'};
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        &::before {
            content: '🚀';
            font-size: 1rem;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        animation: none;
        
        &:hover {
            transform: none;
        }
    }
`;

const TechIcon = styled.span<{ icon: string }>`
    font-size: 1.5rem;
    margin-right: 0.5rem;
    
    &::before {
        content: ${props => `'${props.icon}'`};
    }
`;

const StatusBadge = styled.span<{ status: 'live' | 'stable' | 'active' }>`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: ${props => {
        switch (props.status) {
            case 'live': return 'linear-gradient(135deg, #e74c3c, #c0392b)';
            case 'stable': return 'linear-gradient(135deg, #2ecc71, #27ae60)';
            case 'active': return 'linear-gradient(135deg, #f39c12, #e67e22)';
            default: return '#95a5a6';
        }
    }};
    color: white;
    animation: ${pulse} 2s infinite;
    
    &::before {
        content: ${props => {
            switch (props.status) {
                case 'live': return "'🔴'";
                case 'stable': return "'🟢'";
                case 'active': return "'🟠'";
                default: return "'⚪'";
            }
        }};
        font-size: 0.6rem;
    }
    
    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const GithubLink = styled.a`
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 2px solid transparent;

    &::before {
        content: '📂';
        font-size: 1rem;
    }

    &:hover {
        color: #2980b9;
        background-color: rgba(52, 152, 219, 0.1);
        border-color: #3498db;
        transform: translateX(4px);
    }

    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
    }
`;

const LiveButton = styled.button`
    color: #e74c3c;
    background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1));
    border: 2px solid #e74c3c;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;

    &:hover {
        background: linear-gradient(135deg, rgba(231, 76, 60, 0.2), rgba(192, 57, 43, 0.2));
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
    }

    &:focus {
        outline: 2px solid #e74c3c;
        outline-offset: 2px;
    }

    &::after {
        content: '🔴';
        animation: ${pulse} 2s infinite;
    }
    
    @media (prefers-reduced-motion: reduce) {
        &::after {
            animation: none;
        }
    }
`;

const IntroText = styled.p<{ delay?: number }>`
    font-size: 1.2rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    animation: ${fadeInUp} 0.8s ease-out ${props => (props.delay || 0) * 0.2}s both;
    
    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const SkipLink = styled.a`
    position: absolute;
    top: -40px;
    left: 6px;
    background: #3498db;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    
    &:focus {
        top: 6px;
    }
`;

interface AboutAppProps {
    isDark: boolean;
    onGoToAutomation?: () => void;
}

const AboutApp: React.FC<AboutAppProps> = ({ isDark, onGoToAutomation }) => {
    return (
        <AboutAppSection 
            data-testid="about-app-section" 
            role="main"
            aria-labelledby="about-app-title"
        >
            <SkipLink href="#main-content" data-testid="skip-link">
                Skip to main content
            </SkipLink>
            
            <Content id="main-content">
                <Section data-testid="about-app-description" delay={0} role="region" aria-labelledby="description-title">
                    <SectionTitle 
                        id="description-title" 
                        data-testid="about-app-main-title" 
                        $isDark={isDark}
                    >
                        🚀 Full-Stack Solution Architecture
                    </SectionTitle>
                    
                    <IntroText data-testid="about-app-description-paragraph-1" delay={1}>
                        This website build from scratch by me demonstrates a complete end-to-end solution architecture, showcasing modern development practices, 
                        AI-powered development workflows, and comprehensive automation testing. The project consists of a <strong>React frontend</strong> hosted on 
                        <strong> GitHub Pages</strong>, an <strong>Express.js + MongoDB backend</strong> hosted on <strong>Azure Cloud</strong>, and 
                        <strong> Playwright test automation</strong> running in <strong>GitHub Actions</strong> with a robust CI/CD pipeline.
                    </IntroText>
                    
                    <IntroText data-testid="about-app-description-paragraph-2" delay={2}>
                        The entire solution was developed using modern AI-powered tools including <strong>Cursor IDE</strong> with Background Agents 
                        integrated with <strong>Slack</strong> and <strong>Playwright's Model Context Protocol (MCP) </strong> 
                        for intelligent test automation.
                    </IntroText>
                </Section>

                <Section 
                    data-testid="about-app-architecture" 
                    delay={1} 
                    role="region" 
                    aria-labelledby="architecture-title"
                >
                    <SectionTitle 
                        id="architecture-title" 
                        data-testid="architecture-title" 
                        $isDark={isDark}
                    >
                        🏗️ System Architecture & CI/CD Pipeline
                    </SectionTitle>
                    
                    <IntroText data-testid="architecture-description" delay={3}>
                        The application implements a complete CI/CD process where merging code to the <code>main</code> branch triggers automated deployments 
                        and comprehensive testing workflows:
                    </IntroText>
                    
                    <ArchitectureGrid 
                        data-testid="architecture-grid" 
                        role="grid" 
                        aria-label="System architecture components"
                    >
                        <ArchitectureCard 
                            data-testid="frontend-deployment-card" 
                            $isDark={isDark} 
                            delay={0}
                            role="gridcell"
                            tabIndex={0}
                            aria-describedby="frontend-deployment-description"
                        >
                            <h4 data-testid="frontend-deployment-title">
                                Frontend Deployment
                                <StatusBadge status="live" data-testid="frontend-status-badge">Live</StatusBadge>
                            </h4>
                            <p id="frontend-deployment-description" data-testid="frontend-deployment-description">
                                React app → GitHub Pages → Test Automation trigger
                            </p>
                            <FeatureList data-testid="frontend-features" role="list" aria-label="Frontend deployment features">
                                <FeatureItem data-testid="frontend-feature-1" delay={0}>Automatic build and deployment on <code>main</code> branch merge</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-2" delay={1}>Custom domain configuration (www.arthursenko.com)</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-3" delay={2}>Triggers automated testing pipeline post-deployment</FeatureItem>
                            </FeatureList>
                        </ArchitectureCard>
                        
                        <ArchitectureCard 
                            data-testid="backend-deployment-card" 
                            $isDark={isDark} 
                            delay={1}
                            role="gridcell"
                            tabIndex={0}
                            aria-describedby="backend-deployment-description"
                        >
                            <h4 data-testid="backend-deployment-title">
                                Backend Deployment
                                <StatusBadge status="stable" data-testid="backend-status-badge">Stable</StatusBadge>
                            </h4>
                            <p id="backend-deployment-description" data-testid="backend-deployment-description">
                                Express.js + MongoDB → Azure Cloud
                            </p>
                            <FeatureList data-testid="backend-features" role="list" aria-label="Backend deployment features">
                                <FeatureItem data-testid="backend-feature-1" delay={0}>Auto-deployment to Azure on <code>main</code> branch merge</FeatureItem>
                                <FeatureItem data-testid="backend-feature-2" delay={1}>MongoDB Atlas integration for data persistence</FeatureItem>
                                <FeatureItem data-testid="backend-feature-3" delay={2}>RESTful API for test results and application data</FeatureItem>
                            </FeatureList>
                        </ArchitectureCard>
                    </ArchitectureGrid>
                </Section>

                <Section 
                    data-testid="about-app-components" 
                    delay={2} 
                    role="region" 
                    aria-labelledby="components-title"
                >
                    <SectionTitle 
                        id="components-title" 
                        data-testid="components-title" 
                        $isDark={isDark}
                    >
                        🛠️ Application Components
                    </SectionTitle>
                    
                    <TechStack data-testid="tech-stack-container">
                        <TechItem 
                            data-testid="about-app-frontend" 
                            $isDark={isDark} 
                            category="frontend"
                            tabIndex={0}
                            role="article"
                            aria-labelledby="frontend-title"
                        >
                            <SubSectionTitle id="frontend-title" data-testid="frontend-title" $isDark={isDark}>
                                <TechIcon icon="⚛️" />
                                Frontend Application
                                <StatusBadge status="live" data-testid="frontend-component-status">Live</StatusBadge>
                            </SubSectionTitle>
                            <p data-testid="frontend-description">
                                A modern React application built from scratch with TypeScript, featuring PWA capabilities, 
                                comprehensive responsive design, and advanced user experience enhancements.
                            </p>
                            
                            <h4 data-testid="frontend-features-title">Key Features:</h4>
                            <FeatureList data-testid="frontend-features-list" role="list" aria-label="Frontend application features">
                                <FeatureItem data-testid="frontend-feature-responsive" delay={0}><strong>Responsive Mobile Design:</strong> Fully optimized for mobile devices with adaptive layouts, touch-friendly interactions, and mobile-first CSS media queries</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-dark-mode" delay={1}><strong>Dark Mode Implementation:</strong> Complete theme system with persistent user preferences, smooth transitions, and system preference detection</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-sticky-footer" delay={2}><strong>Sticky Footer Layout:</strong> Header and footer always visible, even on short pages, ensuring optimal user experience</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-code-quality" delay={3}><strong>Code Quality Tools:</strong> ESLint with pre-commit hooks, automated CI/CD checks, and comprehensive TypeScript integration</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-animations" delay={4}><strong>Advanced Animations:</strong> CSS keyframe animations, hover effects, loading shimmer effects, and smooth page transitions</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-interactive" delay={5}><strong>Interactive Components:</strong> Collapsible navigation, expandable content sections, live status indicators with pulse animations</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-accessibility" delay={6}><strong>Accessibility Features:</strong> ARIA labels, keyboard navigation support, focus management, and semantic HTML structure</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-performance" delay={7}><strong>Performance Optimizations:</strong> Component lazy loading, optimized images, and efficient state management</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-typescript" delay={8}><strong>TypeScript Integration:</strong> Full type safety with custom interfaces and comprehensive error handling</FeatureItem>
                                <FeatureItem data-testid="frontend-feature-styled" delay={9}><strong>Styled Components:</strong> Dynamic theming, responsive breakpoints, and component-scoped styling</FeatureItem>
                            </FeatureList>

                            <GithubLink
                                href="https://github.com/artsenius/about"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="github-frontend-link"
                                aria-label="View frontend source code on GitHub (opens in new tab)"
                            >
                                View Frontend Code →
                            </GithubLink>
                        </TechItem>

                        <TechItem 
                            data-testid="about-app-backend" 
                            $isDark={isDark} 
                            category="backend"
                            tabIndex={0}
                            role="article"
                            aria-labelledby="backend-title"
                        >
                            <SubSectionTitle id="backend-title" data-testid="backend-title" $isDark={isDark}>
                                <TechIcon icon="🔧" />
                                Backend Server
                                <StatusBadge status="stable" data-testid="backend-component-status">Stable</StatusBadge>
                            </SubSectionTitle>
                            <p data-testid="backend-description">
                                A robust Express.js server with MongoDB integration, providing secure and scalable 
                                RESTful APIs for data management and test result storage.
                            </p>
                            
                            <h4 data-testid="backend-features-title">Technical Features:</h4>
                            <FeatureList data-testid="backend-features-list" role="list" aria-label="Backend server features">
                                <FeatureItem data-testid="backend-feature-express" delay={0}><strong>Express.js Framework:</strong> RESTful API design with middleware for CORS, security, and error handling</FeatureItem>
                                <FeatureItem data-testid="backend-feature-mongodb" delay={1}><strong>MongoDB Integration:</strong> Document-based data storage with Mongoose ODM for schema validation</FeatureItem>
                                <FeatureItem data-testid="backend-feature-azure" delay={2}><strong>Azure Cloud Hosting:</strong> Scalable cloud deployment with automatic scaling and high availability</FeatureItem>
                                <FeatureItem data-testid="backend-feature-api" delay={3}><strong>API Endpoints:</strong> Comprehensive endpoints for test result storage, retrieval, and analytics</FeatureItem>
                                <FeatureItem data-testid="backend-feature-security" delay={4}><strong>Security Features:</strong> Input validation, rate limiting, and secure data handling practices</FeatureItem>
                                <FeatureItem data-testid="backend-feature-deployment" delay={5}><strong>Auto-Deployment:</strong> Continuous deployment pipeline triggered by <code>main</code> branch updates</FeatureItem>
                            </FeatureList>

                            <GithubLink
                                href="https://github.com/artsenius/about-me-backend"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="github-backend-link"
                                aria-label="View backend source code on GitHub (opens in new tab)"
                            >
                                View Backend Code →
                            </GithubLink>
                        </TechItem>

                        <TechItem 
                            data-testid="about-app-automation-framework" 
                            $isDark={isDark} 
                            category="automation"
                            tabIndex={0}
                            role="article"
                            aria-labelledby="automation-title"
                        >
                            <SubSectionTitle id="automation-title" data-testid="automation-title" $isDark={isDark}>
                                <TechIcon icon="🤖" />
                                Test Automation Framework & Live Results
                                <StatusBadge status="active" data-testid="automation-component-status">Active</StatusBadge>
                            </SubSectionTitle>
                            <p data-testid="automation-description">
                                A comprehensive Playwright-based automation framework implementing the Model Context Protocol (MCP) 
                                for AI-driven test creation and execution. The framework provides continuous testing with detailed 
                                reporting and real-time result visualization.
                            </p>
                            
                            <h4 data-testid="automation-features-title">Automation Features:</h4>
                            <FeatureList data-testid="automation-features-list" role="list" aria-label="Test automation features">
                                <FeatureItem data-testid="automation-feature-mcp" delay={0}><strong>Playwright MCP Integration:</strong> AI-powered test generation using Model Context Protocol for intelligent browser automation</FeatureItem>
                                <FeatureItem data-testid="automation-feature-multi-trigger" delay={1}><strong>Multi-Trigger Execution:</strong> Tests run daily via scheduled GitHub Actions and are automatically triggered after frontend deployments</FeatureItem>
                                <FeatureItem data-testid="automation-feature-cross-browser" delay={2}><strong>Cross-Browser Testing:</strong> Comprehensive testing across Chromium, Firefox, and WebKit browsers</FeatureItem>
                                <FeatureItem data-testid="automation-feature-reporting" delay={3}><strong>Comprehensive Reporting:</strong> Detailed HTML reports with screenshots, video recordings, and performance metrics</FeatureItem>
                                <FeatureItem data-testid="automation-feature-publishing" delay={4}><strong>Result Publishing:</strong> Automated upload of test results to the backend server for persistent storage and analysis</FeatureItem>
                                <FeatureItem data-testid="automation-feature-dashboard" delay={5}><strong>Live Dashboard:</strong> Real-time test result visualization with expandable details, error tracking, and historical data</FeatureItem>
                                <FeatureItem data-testid="automation-feature-cicd" delay={6}><strong>CI/CD Integration:</strong> Seamless integration with GitHub Actions for automated testing in the deployment pipeline</FeatureItem>
                                <FeatureItem data-testid="automation-feature-performance" delay={7}><strong>Performance Monitoring:</strong> Test execution time tracking, success rate analytics, and trend analysis</FeatureItem>
                            </FeatureList>

                            <p data-testid="automation-summary">
                                The test automation framework generates comprehensive reports after each run, uploads results to the backend server, 
                                and provides a live dashboard where you can view all recent test executions, detailed results, and historical trends 
                                on the Live Automation page.
                            </p>

                            <div 
                                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1.5rem' }}
                                data-testid="automation-actions-container"
                                role="group"
                                aria-label="Automation actions"
                            >
                                <GithubLink
                                    href="https://github.com/artsenius/about-me-automation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="about-app-automation-link"
                                    aria-label="View automation framework source code on GitHub (opens in new tab)"
                                >
                                    View Automation Code →
                                </GithubLink>
                                
                                <LiveButton
                                    type="button"
                                    onClick={onGoToAutomation}
                                    data-testid="live-automation-link"
                                    aria-label="Navigate to live test results page"
                                >
                                    View Live Test Results
                                </LiveButton>
                            </div>
                        </TechItem>
                    </TechStack>
                </Section>

                <Section 
                    data-testid="about-app-development-tools" 
                    delay={3} 
                    role="region" 
                    aria-labelledby="development-tools-title"
                >
                    <SectionTitle 
                        id="development-tools-title" 
                        data-testid="development-tools-title" 
                        $isDark={isDark}
                    >
                        🧠 Development Tools & AI Integration
                    </SectionTitle>
                    
                    <IntroText data-testid="development-tools-description" delay={4}>
                        This project showcases the power of modern AI-assisted development workflows and demonstrates 
                        how cutting-edge tools can accelerate development while maintaining code quality:
                    </IntroText>
                    
                    <FeatureList 
                        data-testid="development-tools-list" 
                        role="list" 
                        aria-label="Development tools and AI integration features"
                    >
                        <FeatureItem data-testid="development-tool-cursor" delay={0}><strong>Cursor IDE:</strong> AI-powered code editor with intelligent code suggestions and refactoring capabilities</FeatureItem>
                        <FeatureItem data-testid="development-tool-agents" delay={1}><strong>Background Agents:</strong> Automated AI agents integrated with Slack for continuous monitoring and notifications</FeatureItem>
                        <FeatureItem data-testid="development-tool-mcp" delay={2}><strong>Playwright MCP:</strong> Model Context Protocol integration enabling AI to directly interact with browser automation tools</FeatureItem>
                        <FeatureItem data-testid="development-tool-typescript" delay={3}><strong>TypeScript:</strong> Full type safety and enhanced developer experience with IntelliSense</FeatureItem>
                        <FeatureItem data-testid="development-tool-github" delay={4}><strong>GitHub Actions:</strong> Automated CI/CD pipeline with parallel job execution and dependency management</FeatureItem>
                    </FeatureList>
                </Section>
            </Content>
        </AboutAppSection>
    );
};

export default AboutApp;
