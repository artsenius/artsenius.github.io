import React from 'react';
import styled from 'styled-components';
import profilePhoto from '../media/art.jpg';
import resumePDF from '../media/A_Senko_QA_Leader_SDET_AI_Enthusiast.pdf';

const AboutSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1`
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
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

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

const Position = styled.h3`
    color: #34495e;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
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

    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.5;
    }
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.4rem;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
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

    @media (max-width: 768px) {
        font-size: 0.85rem;
        padding: 0.6rem;
    }

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

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const Duration = styled.p`
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
`;

const CompanyLink = styled.a`
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: #2980b9;
        text-decoration: underline;
    }
`;

const About: React.FC = () => {
    const skills = {
        automation: ['WebdriverIO', 'Cypress', 'Playwright', 'Selenium', 'Appium', 'Model Context Protocol'],
        technologies: ['JavaScript/TypeScript', 'HTML5', 'CSS3', 'React', 'React Native', 'Express.js', 'MongoDB'],
        cloud: ['BrowserStack', 'LambdaTest', 'SauceLabs', 'AWS'],
        tools: ['Azure DevOps', 'GitHub Actions', 'Jira', 'Artillery.io'],
        ai: ['GitHub Copilot', 'OpenAI Codex', 'AI-Driven Testing']
    };

    return (
        <AboutSection data-testid="about-section">
            <Title data-testid="about-title">About Me</Title>
            <Content data-testid="about-content">
                <ProfileSection data-testid="profile-section">
                    <ProfileImage data-testid="profile-image" src={profilePhoto} alt="Arthur Senko" />
                    <Name data-testid="profile-name">Arthur Senko</Name>
                    <Position data-testid="profile-position">QA Leader<br />AI Enthusiast</Position>
                    <DocumentLink
                        data-testid="resume-link"
                        href={resumePDF}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Resume
                    </DocumentLink>
                </ProfileSection>
                <div data-testid="about-details">
                    <Bio data-testid="about-bio">
                        A results-driven QA Leader with expertise in AI testing and modern automation.
                        Proven track record of building and leading high-performing QA teams, implementing
                        efficient testing processes, and driving quality improvements across organizations.
                        Proficient in leading projects of any complexity and creating comprehensive E2E solutions,
                        from initial concept to production deployment.
                    </Bio>

                    <Section data-testid="current-role-section">
                        <SectionTitle data-testid="current-role-title">Current Role</SectionTitle>
                        <ExperienceItem data-testid="experience-item">
                            <CompanyName data-testid="company-name">
                                Senior QA Leader @ <CompanyLink href="https://www.allerganaesthetics.com/" target="_blank" rel="noopener noreferrer">Allergan Aesthetics</CompanyLink>, an <CompanyLink href="https://www.abbvie.com/" target="_blank" rel="noopener noreferrer">AbbVie Company</CompanyLink>
                            </CompanyName>
                            <Duration data-testid="role-duration">June 2022 – Present | Remote</Duration>
                            <ul data-testid="role-achievements">
                                <li>Managing QA efforts on projects responsible for ~90% of company revenue</li>
                                <li>Introduced AI-driven automation, reducing test development time by 80%</li>
                                <li>Led QA initiatives for the Alle mobile app, achieving 3x reduction in production bugs</li>
                            </ul>
                        </ExperienceItem>
                    </Section>

                    <Section data-testid="skills-section">
                        <SectionTitle data-testid="skills-title">Technical Skills</SectionTitle>
                        <SkillsGrid data-testid="skills-grid">
                            {Object.values(skills).flat().map((skill, index) => (
                                <SkillItem data-testid={`skill-item-${index}`} key={index}>{skill}</SkillItem>
                            ))}
                        </SkillsGrid>
                    </Section>

                    <Section data-testid="achievements-section">
                        <SectionTitle data-testid="achievements-title">Notable Achievements</SectionTitle>
                        <ul data-testid="achievements-list">
                            <li data-testid="achievement-1">Co-founded TechStart.dev, an educational startup for developers and testers</li>
                            <li data-testid="achievement-2">Achieved 95% employment rate for training program graduates</li>
                            <li data-testid="achievement-3">Pioneered AI-driven testing strategies reducing test creation time by 60%</li>
                            <li data-testid="achievement-4">Built and led multiple QA teams from ground up in startup and enterprise settings</li>
                        </ul>
                    </Section>
                </div>
            </Content>
        </AboutSection>
    );
};

export default About;