import React from 'react';
import styled from 'styled-components';
import profilePhoto from '../media/art.jpg';
import resumePDF from '../media/A_Senko_QA_Leader_SDET_AI_Enthusiast.pdf';

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
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 15px rgba(52, 73, 94, 0.2);
        filter: brightness(1.05);
    }
`;

const Name = styled.h2`
    color: #2c3e50;
    font-size: 1.8rem;
    margin-bottom: 1rem;
`;

const Position = styled.h3`
    color: #34495e;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
`;

const DocumentLink = styled.a`
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #2c3e50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    margin-bottom: 1rem;
    width: 200px;

    &:hover {
        background-color: #34495e;
    }
`;

const Bio = styled.div`
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.4rem;
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

const SkillItem = styled.div`
    background-color: #f8f9fa;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;
    border: 1px solid transparent;

    &:hover {
        transform: translateY(-2px);
        background-color: white;
        border-color: #3498db;
        box-shadow: 0 4px 8px rgba(52, 152, 219, 0.15);
    }
`;

const ExperienceItem = styled.div`
    margin-bottom: 1.5rem;
`;

const CompanyName = styled.h4`
    color: #2c3e50;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const Duration = styled.p`
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

const About: React.FC = () => {
    const skills = {
        automation: ['WebdriverIO', 'Cypress', 'Playwright', 'Selenium', 'Appium'],
        technologies: ['JavaScript/TypeScript', 'HTML5', 'CSS3', 'React', 'React Native', 'Express.js', 'MongoDB'],
        cloud: ['BrowserStack', 'LambdaTest', 'SauceLabs', 'AWS'],
        tools: ['Azure DevOps', 'GitHub Actions', 'Jira', 'Artillery.io', 'Loadster']
    };

    return (
        <AboutSection>
            <Title>About Me</Title>
            <Content>
                <ProfileSection>
                    <ProfileImage src={profilePhoto} alt="Arthur Senko" />
                    <Name>Arthur Senko</Name>
                    <Position>Senior QA Leader</Position>
                    <DocumentLink href={resumePDF} target="_blank" rel="noopener noreferrer">
                        Download Resume
                    </DocumentLink>
                </ProfileSection>
                <div>
                    <Bio>
                        A results-driven QA Leader with expertise in AI testing and modern automation. 
                        Proven track record of building and leading high-performing QA teams, implementing 
                        efficient testing processes, and driving quality improvements across organizations.
                    </Bio>

                    <Section>
                        <SectionTitle>Current Role</SectionTitle>
                        <ExperienceItem>
                            <CompanyName>Senior QA Leader @ Allergan Aesthetics, an AbbVie Company</CompanyName>
                            <Duration>June 2022 – Present | Remote</Duration>
                            <ul>
                                <li>Managing QA efforts on projects responsible for ~90% of company revenue</li>
                                <li>Introduced AI-driven automation, reducing test development time by 80%</li>
                                <li>Led QA initiatives for the Alle mobile app, achieving 3x reduction in production bugs</li>
                            </ul>
                        </ExperienceItem>
                    </Section>

                    <Section>
                        <SectionTitle>Technical Skills</SectionTitle>
                        <SkillsGrid>
                            {Object.values(skills).flat().map((skill, index) => (
                                <SkillItem key={index}>{skill}</SkillItem>
                            ))}
                        </SkillsGrid>
                    </Section>

                    <Section>
                        <SectionTitle>Notable Achievements</SectionTitle>
                        <ul>
                            <li>Co-founded TechStart.dev, an educational startup for developers and testers</li>
                            <li>Achieved 95% employment rate for training program graduates</li>
                            <li>Pioneered AI-driven testing strategies reducing test creation time by 60%</li>
                            <li>Built and led multiple QA teams from ground up in startup and enterprise settings</li>
                        </ul>
                    </Section>
                </div>
            </Content>
        </AboutSection>
    );
};

export default About;