import React from 'react';
import styled from 'styled-components';

const ProjectsSection = styled.section`
    padding: 2rem 0;
`;

const Title = styled.h1`
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 2rem;
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
`;

const ProjectCard = styled.article`
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ProjectImage = styled.div`
    height: 200px;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #6c757d;
`;

const ProjectContent = styled.div`
    padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
    color: #2c3e50;
    margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
    color: #6c757d;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
`;

const ProjectLink = styled.a`
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
        text-decoration: underline;
    }
`;

const Projects: React.FC = () => {
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
            <Title>Projects</Title>
            <ProjectGrid>
                {projectList.map((project, index) => (
                    <ProjectCard key={index}>
                        <ProjectImage>
                            {project.title[0]}
                        </ProjectImage>
                        <ProjectContent>
                            <ProjectTitle>{project.title}</ProjectTitle>
                            <ProjectDescription>{project.description}</ProjectDescription>
                            <ProjectLink
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
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