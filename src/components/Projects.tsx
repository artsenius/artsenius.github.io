import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

interface ProjectsProps {
    isDark: boolean;
}

const ProjectsSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const ProjectCard = styled.article<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2d2d2d' : '#ffffff'};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: ${props => props.$isDark 
        ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
        : '0 4px 6px rgba(0, 0, 0, 0.1)'};
    transition: all 0.3s ease;
    border: ${props => props.$isDark ? '1px solid #404040' : '1px solid #e1e8ed'};

    &:hover {
        transform: translateY(-5px);
        box-shadow: ${props => props.$isDark 
            ? '0 8px 25px rgba(0, 0, 0, 0.4)' 
            : '0 8px 25px rgba(52, 73, 94, 0.15)'};
    }
`;

const ProjectHeader = styled.div<{ $isDark: boolean }>`
    height: 120px;
    background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #3498db, #2980b9)' 
        : 'linear-gradient(135deg, #3498db, #2980b9)'};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${props => props.$isDark 
            ? 'rgba(0, 0, 0, 0.1)' 
            : 'rgba(255, 255, 255, 0.1)'};
    }
`;

const ProjectIcon = styled.div`
    font-size: 3rem;
    color: white;
    z-index: 1;
`;

const ProjectContent = styled.div`
    padding: 1.5rem;
`;

const ProjectTitle = styled.h3<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
    font-weight: 600;
    transition: color 0.3s ease;
`;

const ProjectDescription = styled.p<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#bdc3c7' : '#6c757d'};
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    transition: color 0.3s ease;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;

const TechBadge = styled.span<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#404040' : '#f8f9fa'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#495057'};
    padding: 0.25rem 0.6rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border: ${props => props.$isDark ? '1px solid #555' : '1px solid #dee2e6'};
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const ProjectLink = styled.a<{ $isDark: boolean; $primary?: boolean }>`
    color: ${props => props.$primary 
        ? '#ffffff' 
        : (props.$isDark ? '#3498db' : '#3498db')};
    background-color: ${props => props.$primary 
        ? '#3498db' 
        : 'transparent'};
    text-decoration: none;
    font-weight: 500;
    padding: ${props => props.$primary ? '0.6rem 1.2rem' : '0.6rem 0'};
    border-radius: ${props => props.$primary ? '6px' : '0'};
    transition: all 0.3s ease;
    border: ${props => props.$primary ? 'none' : 'none'};
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;

    &:hover {
        color: ${props => props.$primary 
            ? '#ffffff' 
            : (props.$isDark ? '#5dade2' : '#2980b9')};
        background-color: ${props => props.$primary ? '#2980b9' : 'transparent'};
        text-decoration: ${props => props.$primary ? 'none' : 'underline'};
        transform: ${props => props.$primary ? 'translateY(-2px)' : 'none'};
    }
`;

const Projects: React.FC<ProjectsProps> = ({ isDark }) => {
    const { theme } = useTheme();

    const projectList = [
        {
            title: 'Portfolio Website',
            description: 'A modern React TypeScript portfolio showcasing advanced web development skills with comprehensive features including dark mode, responsive design, performance optimization, and accessibility compliance.',
            icon: '🌐',
            technologies: ['React', 'TypeScript', 'Styled Components', 'GitHub Pages'],
            githubLink: 'https://github.com/artsenius/about',
            liveLink: 'https://www.arthursenko.com/',
            featured: true
        },
        {
            title: 'Backend API Server',
            description: 'A robust Express.js backend with MongoDB integration providing RESTful APIs for data management, test result storage, and real-time analytics with secure authentication and cloud deployment.',
            icon: '⚙️',
            technologies: ['Express.js', 'MongoDB', 'Azure Cloud', 'REST API'],
            githubLink: 'https://github.com/artsenius/about-me-backend',
            liveLink: 'https://about-me-backend-hmfmeac9eqcwd9fq.canadacentral-01.azurewebsites.net/',
            featured: true
        },
        {
            title: 'Test Automation Framework',
            description: 'Comprehensive Playwright-based automation framework with AI-powered test generation using Model Context Protocol (MCP), cross-browser testing, and automated CI/CD integration.',
            icon: '🤖',
            technologies: ['Playwright', 'MCP', 'GitHub Actions', 'CI/CD'],
            githubLink: 'https://github.com/artsenius/about-test-automation',
            featured: true
        },
        {
            title: 'AI Development Workflow',
            description: 'Advanced development setup using Cursor IDE with Background Agents, Slack integration, and AI-powered code generation demonstrating modern software development practices.',
            icon: '🧠',
            technologies: ['Cursor IDE', 'AI Agents', 'Slack API', 'Automation'],
            githubLink: 'https://github.com/artsenius/about',
            featured: false
        }
    ];

    return (
        <ProjectsSection data-testid="projects-section">
            <Title data-testid="projects-title" $isDark={isDark}>Featured Projects</Title>
            <ProjectGrid data-testid="projects-grid">
                {projectList.map((project, index) => (
                    <ProjectCard key={index} data-testid={`project-card-${index}`} $isDark={isDark}>
                        <ProjectHeader $isDark={isDark}>
                            <ProjectIcon>{project.icon}</ProjectIcon>
                        </ProjectHeader>
                        <ProjectContent>
                            <ProjectTitle data-testid={`project-title-${index}`} $isDark={isDark}>
                                {project.title}
                            </ProjectTitle>
                            <ProjectDescription data-testid={`project-description-${index}`} $isDark={isDark}>
                                {project.description}
                            </ProjectDescription>
                            <TechStack data-testid={`tech-stack-${index}`}>
                                {project.technologies.map((tech, techIndex) => (
                                    <TechBadge 
                                        key={techIndex} 
                                        data-testid={`tech-badge-${index}-${techIndex}`} 
                                        $isDark={isDark}
                                    >
                                        {tech}
                                    </TechBadge>
                                ))}
                            </TechStack>
                            <ProjectLinks data-testid={`project-links-${index}`}>
                                <ProjectLink
                                    data-testid={`github-link-${index}`}
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    $isDark={isDark}
                                    $primary={true}
                                >
                                    View Code 📋
                                </ProjectLink>
                                {project.liveLink && (
                                    <ProjectLink
                                        data-testid={`live-link-${index}`}
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        $isDark={isDark}
                                    >
                                        Live Demo ↗
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