// This file exports TypeScript types and interfaces used throughout the application.

export interface AboutProps {
    biography: string;
    skills: string[];
}

export interface ContactProps {
    email: string;
    phone?: string;
}

export interface Project {
    title: string;
    description: string;
    link: string;
}

export interface ProjectsProps {
    projects: Project[];
}