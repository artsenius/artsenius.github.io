import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

interface ProjectsProps {
  isDark?: boolean;
}

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'automation' | 'frontend' | 'backend' | 'infrastructure';
  status: 'live' | 'development' | 'archived';
  link?: string;
  demoLink?: string;
  features: string[];
}

interface ThemeProps {
  theme: {
    colors: {
      background: string;
      text: string;
      textSecondary: string;
      accent: string;
      cardBackground: string;
      border: string;
    };
  };
}

const ProjectsSection = styled.section<ThemeProps>`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background-color: ${(props: ThemeProps) => props.theme.colors.background};
    color: ${(props: ThemeProps) => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1<ThemeProps>`
    color: ${(props: ThemeProps) => props.theme.colors.text};
    font-size: 2.5rem;
    margin-bottom: 1rem;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p<ThemeProps>`
    color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
    font-size: 1.1rem;
    margin-bottom: 2rem;
    transition: color 0.3s ease;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
        gap: 0.5rem;
    }
`;

const FilterButton = styled.button<{ $isActive: boolean } & ThemeProps>`
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 2px solid ${(props: { $isActive: boolean } & ThemeProps) => props.$isActive ? props.theme.colors.accent : props.theme.colors.textSecondary};
    background-color: ${(props: { $isActive: boolean } & ThemeProps) => props.$isActive ? props.theme.colors.accent : 'transparent'};
    color: ${(props: { $isActive: boolean } & ThemeProps) => props.$isActive ? '#ffffff' : props.theme.colors.textSecondary};
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
        background-color: ${(props: { $isActive: boolean } & ThemeProps) => props.theme.colors.accent};
        color: #ffffff;
        border-color: ${(props: { $isActive: boolean } & ThemeProps) => props.theme.colors.accent};
    }

    @media (max-width: 768px) {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
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

const ProjectCard = styled.article`
    background-color: ${props => props.theme.colors.cardBackground};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(52, 73, 94, 0.15);
    }
`;

const ProjectHeader = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ProjectTitle = styled.h3`
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    transition: color 0.3s ease;
`;

const StatusBadge = styled.span<{ $status: string }>`
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    background-color: ${props => {
        switch (props.$status) {
            case 'live': return '#e8f5e8';
            case 'development': return '#fff3cd';
            case 'archived': return '#f8d7da';
            default: return '#e9ecef';
        }
    }};
    color: ${props => {
        switch (props.$status) {
            case 'live': return '#155724';
            case 'development': return '#856404';
            case 'archived': return '#721c24';
            default: return '#495057';
        }
    }};
`;

const ProjectContent = styled.div`
    padding: 1.5rem;
`;

const ProjectDescription = styled.p`
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    transition: color 0.3s ease;
`;

const TechnologyStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;

const TechBadge = styled.span`
    padding: 0.25rem 0.5rem;
    background-color: ${props => props.theme.colors.accent}20;
    color: ${props => props.theme.colors.accent};
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
`;

const FeaturesList = styled.ul`
    margin: 1rem 0;
    padding-left: 1.25rem;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
    line-height: 1.5;
`;

const FeatureItem = styled.li`
    margin-bottom: 0.25rem;
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const ProjectLink = styled.a`
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.3s ease;
    
    &:hover {
        text-decoration: underline;
        opacity: 0.8;
    }
`;

const Projects: React.FC<ProjectsProps> = ({ isDark }) => {
    const { theme } = useTheme();
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const categories = [
        { key: 'all', label: 'All Projects' },
        { key: 'automation', label: 'Test Automation' },
        { key: 'frontend', label: 'Frontend' },
        { key: 'backend', label: 'Backend' },
        { key: 'infrastructure', label: 'Infrastructure' }
    ];

    const projectList: Project[] = [
        {
            title: 'About Me Portfolio Website',
            description: 'A modern React portfolio with comprehensive testing automation and CI/CD pipeline.',
            longDescription: 'This very website showcasing a complete end-to-end solution architecture.',
            technologies: ['React', 'TypeScript', 'Styled Components', 'Playwright', 'GitHub Actions', 'Azure'],
            category: 'frontend',
            status: 'live',
            demoLink: 'https://artsenius.github.io/about',
            features: [
                'Responsive design with dark mode',
                'Live test automation dashboard',
                'CI/CD pipeline with automated testing',
                'Azure backend integration',
                'Mobile-optimized interface'
            ]
        },
        {
            title: 'E2E Test Automation Framework',
            description: 'Enterprise-grade Playwright framework with AI-powered test generation and comprehensive reporting.',
            longDescription: 'A scalable test automation solution using Playwright with Model Context Protocol integration.',
            technologies: ['Playwright', 'TypeScript', 'MCP', 'Docker', 'GitHub Actions', 'Allure'],
            category: 'automation',
            status: 'live',
            features: [
                'AI-powered test generation with MCP',
                'Cross-browser and mobile testing',
                'Visual regression testing',
                'Comprehensive HTML reporting',
                'Parallel test execution',
                'CI/CD integration'
            ]
        },
        {
            title: 'REST API Testing Suite',
            description: 'Comprehensive API testing framework with advanced validation and performance monitoring.',
            longDescription: 'Advanced API testing solution with data-driven testing and performance benchmarks.',
            technologies: ['Playwright', 'Jest', 'Newman', 'Artillery', 'MongoDB', 'Express.js'],
            category: 'backend',
            status: 'live',
            features: [
                'Schema validation testing',
                'Load and performance testing',
                'Data-driven test scenarios',
                'Contract testing capabilities',
                'Real-time monitoring dashboard'
            ]
        },
        {
            title: 'DevOps Monitoring Dashboard',
            description: 'Real-time dashboard for monitoring test results, deployments, and system health metrics.',
            longDescription: 'A comprehensive monitoring solution for CI/CD pipelines and test automation results.',
            technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Azure', 'GitHub API'],
            category: 'infrastructure',
            status: 'development',
            features: [
                'Real-time test result streaming',
                'Deployment pipeline visualization',
                'Historical trend analysis',
                'Alert system integration',
                'Mobile-responsive interface'
            ]
        },
        {
            title: 'Cross-Platform Mobile Testing',
            description: 'Unified testing framework for iOS and Android applications using Appium and cloud services.',
            longDescription: 'Scalable mobile testing solution leveraging cloud providers for device farms.',
            technologies: ['Appium', 'WebdriverIO', 'BrowserStack', 'SauceLabs', 'Fastlane'],
            category: 'automation',
            status: 'development',
            features: [
                'Cloud device farm integration',
                'Parallel mobile test execution',
                'App performance monitoring',
                'Gesture and touch testing',
                'Cross-platform compatibility'
            ]
        },
        {
            title: 'Legacy System Migration Testing',
            description: 'Comprehensive testing strategy for large-scale legacy system modernization projects.',
            longDescription: 'Enterprise-level testing approach for complex legacy system migrations.',
            technologies: ['Selenium', 'TestNG', 'Maven', 'Jenkins', 'Oracle', 'PostgreSQL'],
            category: 'automation',
            status: 'archived',
            features: [
                'Data migration validation',
                'Performance regression testing',
                'User acceptance test automation',
                'Risk-based testing approach',
                'Comprehensive documentation'
            ]
        }
    ];

    const filteredProjects = projectList.filter(project => 
        activeFilter === 'all' || project.category === activeFilter
    );

    return (
        <ProjectsSection data-testid="projects-section">
            <Title data-testid="projects-title">Professional Projects</Title>
            <Subtitle data-testid="projects-subtitle">
                A showcase of test automation frameworks, development projects, and infrastructure solutions 
                I've architected and delivered.
            </Subtitle>
            
            <FilterContainer data-testid="projects-filters">
                {categories.map(category => (
                    <FilterButton
                        key={category.key}
                        $isActive={activeFilter === category.key}
                        onClick={() => setActiveFilter(category.key)}
                        data-testid={`filter-${category.key}`}
                    >
                        {category.label}
                    </FilterButton>
                ))}
            </FilterContainer>

            <ProjectGrid data-testid="projects-grid">
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={index} data-testid={`project-card-${index}`}>
                        <ProjectHeader>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <StatusBadge $status={project.status}>
                                    {project.status}
                                </StatusBadge>
                            </div>
                            <ProjectDescription>{project.description}</ProjectDescription>
                        </ProjectHeader>
                        
                        <ProjectContent>
                            <TechnologyStack>
                                {project.technologies.map((tech, techIndex) => (
                                    <TechBadge key={techIndex}>{tech}</TechBadge>
                                ))}
                            </TechnologyStack>
                            
                            <FeaturesList>
                                {project.features.slice(0, 4).map((feature, featureIndex) => (
                                    <FeatureItem key={featureIndex}>{feature}</FeatureItem>
                                ))}
                                {project.features.length > 4 && (
                                    <FeatureItem>...and more</FeatureItem>
                                )}
                            </FeaturesList>

                            <ProjectLinks>
                                {project.link && (
                                    <ProjectLink
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Code ↗
                                    </ProjectLink>
                                )}
                                {project.demoLink && (
                                    <ProjectLink
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
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