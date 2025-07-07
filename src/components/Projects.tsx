import React from 'react';
import styled from 'styled-components';

interface ProjectsProps {
    isDark?: boolean;
}

const ProjectsSection = styled.section`
    padding: 2rem 0;
`;

const Title = styled.h1<{ $isDark?: boolean }>`
    color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};
    font-size: 2.5rem;
    margin-bottom: 2rem;
    transition: color 0.3s ease;
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
`;

const ProjectCard = styled.article<{ $isDark?: boolean }>`
    background-color: ${props => props.$isDark ? '#34495e' : 'white'};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, ${props => props.$isDark ? '0.3' : '0.1'});
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, ${props => props.$isDark ? '0.4' : '0.2'});
    }
`;

const ProjectImage = styled.div<{ $isDark?: boolean }>`
    height: 200px;
    background-color: ${props => props.$isDark ? '#2c3e50' : '#f8f9fa'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: ${props => props.$isDark ? '#bdc3c7' : '#6c757d'};
    transition: background-color 0.3s ease, color 0.3s ease;
`;

const ProjectContent = styled.div`
    padding: 1.5rem;
`;

const ProjectTitle = styled.h3<{ $isDark?: boolean }>`
    color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
`;

const ProjectDescription = styled.p<{ $isDark?: boolean }>`
    color: ${props => props.$isDark ? '#bdc3c7' : '#6c757d'};
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    transition: color 0.3s ease;
`;

const ProjectLink = styled.a<{ $isDark?: boolean }>`
    color: ${props => props.$isDark ? '#5dade2' : '#3498db'};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
        text-decoration: underline;
        color: ${props => props.$isDark ? '#85c1e9' : '#2980b9'};
    }
`;

const Projects: React.FC<ProjectsProps> = ({ isDark = false }) => {
    const projectList = [
        {
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce platform built with React and Node.js',
            link: 'https://github.com/user/e-commerce'
        },
        {
            title: 'Task Management App',
            description: 'A responsive task management application with real-time updates',
            link: 'https://github.com/user/task-manager'
        },
        {
            title: 'Portfolio Website',
            description: 'A personal portfolio website showcasing projects and skills',
            link: 'https://github.com/user/portfolio'
        }
    ];

    return (
        <ProjectsSection>
            <Title $isDark={isDark}>Projects</Title>
            <ProjectGrid>
                {projectList.map((project, index) => (
                    <ProjectCard key={index} $isDark={isDark}>
                        <ProjectImage $isDark={isDark}>
                            {project.title[0]}
                        </ProjectImage>
                        <ProjectContent>
                            <ProjectTitle $isDark={isDark}>{project.title}</ProjectTitle>
                            <ProjectDescription $isDark={isDark}>{project.description}</ProjectDescription>
                            <ProjectLink
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                $isDark={isDark}
                            >
                                View Project
                            </ProjectLink>
                        </ProjectContent>
                    </ProjectCard>
                ))}
            </ProjectGrid>
        </ProjectsSection>
    );
};

export default Projects;