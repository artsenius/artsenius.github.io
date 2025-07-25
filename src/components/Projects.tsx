import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const ProjectsSection = styled.section<{ $isDark: boolean }>`
    padding: 2rem 0;
    background-color: ${props => props.$isDark ? '#1a1a1a' : '#ffffff'};
    transition: background-color 0.3s ease;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
`;

const Title = styled.h1<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
    transition: color 0.3s ease;
`;

const Subtitle = styled.p<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#cccccc' : '#6c757d'};
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.1rem;
    line-height: 1.6;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 3rem;
`;

const FilterButton = styled.button<{ $isActive: boolean; $isDark: boolean }>`
    background-color: ${props => 
        props.$isActive 
            ? (props.$isDark ? '#3498db' : '#3498db')
            : (props.$isDark ? '#2c3e50' : '#f8f9fa')
    };
    color: ${props => 
        props.$isActive 
            ? '#ffffff'
            : (props.$isDark ? '#ffffff' : '#2c3e50')
    };
    border: 2px solid ${props => 
        props.$isActive 
            ? (props.$isDark ? '#3498db' : '#3498db')
            : (props.$isDark ? '#404040' : '#e9ecef')
    };
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: ${props => 
            props.$isActive 
                ? (props.$isDark ? '#2980b9' : '#2980b9')
                : (props.$isDark ? '#404040' : '#e9ecef')
        };
        transform: translateY(-2px);
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

const ProjectCard = styled.article<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2c3e50' : '#ffffff'};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: ${props => 
        props.$isDark 
            ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1)'
    };
    transition: all 0.3s ease;
    border: 1px solid ${props => props.$isDark ? '#404040' : '#e9ecef'};

    &:hover {
        transform: translateY(-8px);
        box-shadow: ${props => 
            props.$isDark 
                ? '0 8px 30px rgba(0, 0, 0, 0.6)' 
                : '0 8px 30px rgba(0, 0, 0, 0.15)'
        };
    }
`;

const ProjectImage = styled.div<{ $color: string; $isDark: boolean }>`
    height: 180px;
    background: linear-gradient(135deg, ${props => props.$color}, ${props => props.$color}dd);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${props => props.$isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)'};
    }
`;

const ProjectContent = styled.div`
    padding: 1.5rem;
`;

const ProjectTitle = styled.h3<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;
`;

const ProjectDescription = styled.p<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#cccccc' : '#6c757d'};
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
`;

const TechTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;

const TechTag = styled.span<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#34495e' : '#f1f3f4'};
    color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid ${props => props.$isDark ? '#404040' : '#e9ecef'};
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 1rem;
`;

const ProjectLink = styled.a<{ $isDark: boolean; $variant?: 'primary' | 'secondary' }>`
    color: ${props => 
        props.$variant === 'primary' 
            ? '#ffffff'
            : (props.$isDark ? '#3498db' : '#3498db')
    };
    background-color: ${props => 
        props.$variant === 'primary' 
            ? '#3498db'
            : 'transparent'
    };
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 2px solid #3498db;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
        background-color: ${props => 
            props.$variant === 'primary' 
                ? '#2980b9'
                : '#3498db'
        };
        color: #ffffff;
        transform: translateY(-2px);
    }
`;

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    githubLink: string;
    liveLink?: string;
    color: string;
    emoji: string;
}

const Projects: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [activeFilter, setActiveFilter] = useState<string>('All');

    const projects: Project[] = [
        {
            id: 1,
            title: 'React Portfolio Website',
            description: 'A modern, responsive portfolio website built with React, TypeScript, and Styled Components. Features dark mode, performance optimizations, and comprehensive test automation.',
            technologies: ['React', 'TypeScript', 'Styled Components', 'Playwright', 'GitHub Actions'],
            githubLink: 'https://github.com/artsenius/about',
            liveLink: 'https://www.arthursenko.com/',
            color: '#61dafb',
            emoji: '🌐'
        },
        {
            id: 2,
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Includes payment processing, inventory management, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
            githubLink: 'https://github.com/example/ecommerce-platform',
            liveLink: 'https://example-store.vercel.app',
            color: '#ff6b35',
            emoji: '🛒'
        },
        {
            id: 3,
            title: 'Task Management App',
            description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features built with modern web technologies.',
            technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
            githubLink: 'https://github.com/example/task-manager',
            liveLink: 'https://task-manager-demo.netlify.app',
            color: '#8e44ad',
            emoji: '📋'
        },
        {
            id: 4,
            title: 'Weather Dashboard',
            description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics. Features responsive design and offline capabilities.',
            technologies: ['Vue.js', 'JavaScript', 'Weather API', 'PWA'],
            githubLink: 'https://github.com/example/weather-dashboard',
            liveLink: 'https://weather-app-demo.surge.sh',
            color: '#3498db',
            emoji: '🌤️'
        },
        {
            id: 5,
            title: 'AI Content Generator',
            description: 'Content generation tool powered by AI APIs. Features text generation, image creation, and content optimization with a clean, intuitive interface.',
            technologies: ['Python', 'FastAPI', 'OpenAI API', 'React'],
            githubLink: 'https://github.com/example/ai-content-generator',
            color: '#2ecc71',
            emoji: '🤖'
        },
        {
            id: 6,
            title: 'Data Visualization Tool',
            description: 'Interactive data visualization platform for business analytics. Supports multiple chart types, real-time data updates, and custom dashboard creation.',
            technologies: ['D3.js', 'JavaScript', 'Node.js', 'PostgreSQL'],
            githubLink: 'https://github.com/example/data-viz-tool',
            liveLink: 'https://data-viz-demo.herokuapp.com',
            color: '#e74c3c',
            emoji: '📊'
        }
    ];

    const allTechnologies = ['All', ...Array.from(new Set(projects.flatMap(project => project.technologies)))];

    const filteredProjects = activeFilter === 'All' 
        ? projects 
        : projects.filter(project => project.technologies.includes(activeFilter));

    return (
        <ProjectsSection $isDark={isDarkMode}>
            <Container>
                <Title $isDark={isDarkMode}>Featured Projects</Title>
                <Subtitle $isDark={isDarkMode}>
                    A collection of projects showcasing modern web development technologies and best practices.
                    Filter by technology to explore specific areas of expertise.
                </Subtitle>
                
                <FilterContainer>
                    {allTechnologies.map((tech) => (
                        <FilterButton
                            key={tech}
                            $isActive={activeFilter === tech}
                            $isDark={isDarkMode}
                            onClick={() => setActiveFilter(tech)}
                        >
                            {tech}
                        </FilterButton>
                    ))}
                </FilterContainer>

                <ProjectGrid>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} $isDark={isDarkMode}>
                            <ProjectImage $color={project.color} $isDark={isDarkMode}>
                                {project.emoji}
                            </ProjectImage>
                            <ProjectContent>
                                <ProjectTitle $isDark={isDarkMode}>{project.title}</ProjectTitle>
                                <ProjectDescription $isDark={isDarkMode}>
                                    {project.description}
                                </ProjectDescription>
                                <TechTags>
                                    {project.technologies.map((tech, index) => (
                                        <TechTag key={index} $isDark={isDarkMode}>
                                            {tech}
                                        </TechTag>
                                    ))}
                                </TechTags>
                                <ProjectLinks>
                                    <ProjectLink
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        $isDark={isDarkMode}
                                        $variant="primary"
                                    >
                                        🔗 GitHub
                                    </ProjectLink>
                                    {project.liveLink && (
                                        <ProjectLink
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            $isDark={isDarkMode}
                                            $variant="secondary"
                                        >
                                            🚀 Live Demo
                                        </ProjectLink>
                                    )}
                                </ProjectLinks>
                            </ProjectContent>
                        </ProjectCard>
                    ))}
                </ProjectGrid>
            </Container>
        </ProjectsSection>
    );
};

export default Projects;