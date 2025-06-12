import React from 'react';
import styled from 'styled-components';
import profilePhoto from '../media/art.jpg';
import resumePDF from '../media/A_Senko_QA_Leader_SDET_AI_Enthusiast.pdf';
import coverLetterPDF from '../media/A_Senko_Cover_Letter.pdf';

const AboutSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h1`
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ProfileSection = styled.div`
    text-align: center;
`;

const ProfileImage = styled.img`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DocumentLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const DocumentLink = styled.a`
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #2c3e50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #34495e;
    }
`;

const Bio = styled.div`
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const About: React.FC = () => {
    return (
        <AboutSection>
            <Title>About Me</Title>
            <Content>
                <ProfileSection>
                    <ProfileImage src={profilePhoto} alt="Arthur Senko" />
                    <DocumentLinks>
                        <DocumentLink href={resumePDF} target="_blank" rel="noopener noreferrer">
                            View Resume
                        </DocumentLink>
                        <DocumentLink href={coverLetterPDF} target="_blank" rel="noopener noreferrer">
                            View Cover Letter
                        </DocumentLink>
                    </DocumentLinks>
                </ProfileSection>
                <div>
                    <Bio>
                        I am a Quality Assurance Leader and SDET with a passion for AI and automation.
                        With extensive experience in software testing and team leadership, I specialize
                        in implementing efficient QA processes and developing innovative automation solutions.
                    </Bio>
                    <Skills>
                        <SkillsTitle>Skills</SkillsTitle>
                        <SkillsList>
                            <SkillItem>Test Automation</SkillItem>
                            <SkillItem>QA Leadership</SkillItem>
                            <SkillItem>AI/ML Testing</SkillItem>
                            <SkillItem>CI/CD</SkillItem>
                            <SkillItem>Python</SkillItem>
                            <SkillItem>JavaScript/TypeScript</SkillItem>
                            <SkillItem>React</SkillItem>
                            <SkillItem>Test Strategy</SkillItem>
                        </SkillsList>
                    </Skills>
                </div>
            </Content>
        </AboutSection>
    );
};

export default About;