import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
    padding: 2rem 0;
`;

const Title = styled.h1`
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 2rem;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Bio = styled.div`
    font-size: 1.1rem;
    line-height: 1.6;
`;

const Skills = styled.div`
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
`;

const SkillsTitle = styled.h2`
    color: #2c3e50;
    margin-bottom: 1rem;
`;

const SkillsList = styled.ul`
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const SkillItem = styled.li`
    background-color: white;
    padding: 0.75rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const About: React.FC = () => {
    return (
        <AboutSection>
            <Title>About Me</Title>
            <Content>
                <Bio>
                    <p>Hi, I'm a passionate web developer with expertise in modern web technologies.
                        I love creating beautiful and functional web applications that solve real-world problems.</p>
                    <p>With several years of experience in web development, I've worked on various projects
                        ranging from small business websites to complex enterprise applications.</p>
                </Bio>
                <Skills>
                    <SkillsTitle>Skills</SkillsTitle>
                    <SkillsList>
                        <SkillItem>React</SkillItem>
                        <SkillItem>TypeScript</SkillItem>
                        <SkillItem>Node.js</SkillItem>
                        <SkillItem>HTML5 & CSS3</SkillItem>
                        <SkillItem>Git</SkillItem>
                        <SkillItem>REST APIs</SkillItem>
                    </SkillsList>
                </Skills>
            </Content>
        </AboutSection>
    );
};

export default About;