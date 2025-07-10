import React from 'react';
import styled from 'styled-components';

interface StyledProps {
    $isDark: boolean;
}

const ProjectsSection = styled.section<StyledProps>`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: ${(props: StyledProps) => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    transition: color 0.3s ease;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1<StyledProps>`
    color: ${(props: StyledProps) => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p<StyledProps>`
    color: ${(props: StyledProps) => props.$isDark ? '#bdc3c7' : '#6c757d'};
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 2rem;
    }
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const ProjectCard = styled.article<StyledProps>`
    background-color: ${(props: StyledProps) => props.$isDark ? '#2d2d2d' : '#ffffff'};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: ${(props: StyledProps) => props.$isDark 
        ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
        : '0 8px 25px rgba(0, 0, 0, 0.1)'};
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    border: ${(props: StyledProps) => props.$isDark ? '1px solid #404040' : '1px solid #e9ecef'};

    &:hover {
        transform: translateY(-8px);
        box-shadow: ${(props: StyledProps) => props.$isDark 
            ? '0 12px 35px rgba(0, 0, 0, 0.4)' 
            : '0 12px 35px rgba(0, 0, 0, 0.15)'};
    }
`;

const ProjectHeader = styled.div<StyledProps>`
    height: 120px;
    background: ${(props: StyledProps) => props.$isDark 
        ? 'linear-gradient(135deg, #3498db, #2c3e50)' 
        : 'linear-gradient(135deg, #3498db, #2980b9)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
    font-weight: bold;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
        );
        animation: move 20s linear infinite;
    }

    @keyframes move {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

const ProjectContent = styled.div`
    padding: 1.5rem;
`;

const ProjectTitle = styled.h3<StyledProps>`
    color: ${(props: StyledProps) => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    transition: color 0.3s ease;
`;

const ProjectDescription = styled.p<StyledProps>`
    color: ${(props: StyledProps) => props.$isDark ? '#bdc3c7' : '#6c757d'};
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.2rem;
    transition: color 0.3s ease;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
`;

const TechTag = styled.span<StyledProps>`
    background-color: ${(props: StyledProps) => props.$isDark ? '#3498db' : '#e3f2fd'};
    color: ${(props: StyledProps) => props.$isDark ? '#ffffff' : '#1976d2'};
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    transition: background-color 0.3s ease, color 0.3s ease;
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 1rem;
`;

const ProjectLink = styled.a<StyledProps>`
    color: ${(props: StyledProps) => props.$isDark ? '#3498db' : '#2980b9'};
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border: 2px solid ${(props: StyledProps) => props.$isDark ? '#3498db' : '#2980b9'};
    border-radius: 6px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
        background-color: ${(props: StyledProps) => props.$isDark ? '#3498db' : '#2980b9'};
        color: white;
        transform: translateY(-2px);
    }
`;

interface ProjectsProps {
    isDark: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDark }) => {
    const projectList = [
        {
            title: 'AI-Powered Test Automation Suite',
            description: 'Comprehensive test automation framework using Playwright with Model Context Protocol integration for AI-driven test generation and execution across multiple browsers and devices.',
            technologies: ['Playwright', 'TypeScript', 'AI/MCP', 'GitHub Actions', 'Docker'],
            githubLink: 'https://github.com/artsenius/about',
            liveLink: null,
            icon: '🤖'
        },
        {
            title: 'Cross-Platform Mobile Test Framework',
            description: 'End-to-end mobile testing solution supporting both iOS and Android platforms with cloud device integration, visual regression testing, and comprehensive reporting.',
            technologies: ['Appium', 'WebdriverIO', 'BrowserStack', 'Jest', 'Allure'],
            githubLink: 'https://github.com/artsenius/mobile-automation',
            liveLink: null,
            icon: '📱'
        },
        {
            title: 'Performance Testing Platform',
            description: 'Scalable performance testing solution with real-time monitoring, load generation, and detailed analytics for enterprise applications with Artillery Pro integration.',
            technologies: ['Artillery Pro', 'Node.js', 'Grafana', 'InfluxDB', 'AWS'],
            githubLink: 'https://github.com/artsenius/perf-testing',
            liveLink: null,
            icon: '⚡'
        },
        {
            title: 'API Testing & Validation Suite',
            description: 'Comprehensive REST API testing framework with automated contract validation, mock services, and integration testing capabilities for microservices architecture.',
            technologies: ['Postman', 'Newman', 'Swagger', 'MongoDB', 'Express.js'],
            githubLink: 'https://github.com/artsenius/api-testing',
            liveLink: null,
            icon: '🔌'
        },
        {
            title: 'Visual Regression Testing System',
            description: 'Automated visual testing platform using SmartUI for pixel-perfect UI validation across different browsers, devices, and screen resolutions with baseline management.',
            technologies: ['SmartUI', 'Selenium', 'OpenCV', 'Python', 'LambdaTest'],
            githubLink: 'https://github.com/artsenius/visual-testing',
            liveLink: null,
            icon: '👁️'
        },
        {
            title: 'QA Metrics & Analytics Dashboard',
            description: 'Real-time quality metrics dashboard providing insights into test execution trends, defect patterns, and team productivity with automated reporting and alerting.',
            technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Azure'],
            githubLink: 'https://github.com/artsenius/qa-dashboard',
            liveLink: 'https://qa-metrics-demo.vercel.app',
            icon: '📊'
        }
    ];

    return (
        <ProjectsSection $isDark={isDark} data-testid="projects-section">
            <Title $isDark={isDark}>QA & Test Automation Projects</Title>
            <Subtitle $isDark={isDark}>
                A showcase of comprehensive testing solutions and automation frameworks 
                designed to ensure quality and accelerate delivery
            </Subtitle>
            <ProjectGrid>
                {projectList.map((project, index) => (
                    <ProjectCard key={index} $isDark={isDark} data-testid={`project-card-${index}`}>
                        <ProjectHeader $isDark={isDark}>
                            <span style={{ position: 'relative', zIndex: 1 }}>{project.icon}</span>
                        </ProjectHeader>
                        <ProjectContent>
                            <ProjectTitle $isDark={isDark}>{project.title}</ProjectTitle>
                            <ProjectDescription $isDark={isDark}>
                                {project.description}
                            </ProjectDescription>
                            <TechStack>
                                {project.technologies.map((tech, techIndex) => (
                                    <TechTag key={techIndex} $isDark={isDark}>
                                        {tech}
                                    </TechTag>
                                ))}
                            </TechStack>
                            <ProjectLinks>
                                <ProjectLink
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    $isDark={isDark}
                                    data-testid={`github-link-${index}`}
                                >
                                    <span>📄</span> View Code
                                </ProjectLink>
                                {project.liveLink && (
                                    <ProjectLink
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        $isDark={isDark}
                                        data-testid={`live-link-${index}`}
                                    >
                                        <span>🚀</span> Live Demo
                                    </ProjectLink>
                                )}
                            </ProjectLinks>
                        </ProjectContent>
                    </ProjectCard>
                ))}
            </ProjectGrid>
        </ProjectsSection>
    );
};

export default Projects;