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
    border: 3px solid transparent;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 15px rgba(52, 73, 94, 0.2);
        filter: brightness(1.05);
    }

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 8px 15px rgba(52, 152, 219, 0.3);
    }

    &:focus:not(:focus-visible) {
        border-color: transparent;
    }
`;

const Name = styled.h1`
    color: #2c3e50;
    font-size: 1.8rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

const Position = styled.p`
    color: #34495e;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    font-weight: 500;

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
    transition: all 0.3s;
    margin-bottom: 1rem;
    width: 200px;
    font-weight: 500;
    border: 2px solid transparent;

    &:hover {
        background-color: #34495e;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
    }

    &:focus:not(:focus-visible) {
        border-color: transparent;
        box-shadow: none;
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

const Section = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
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
    cursor: default;
    position: relative;
    
    // Make focusable for keyboard users
    &:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
        border-color: #3498db;
        background-color: white;
        box-shadow: 0 4px 8px rgba(52, 152, 219, 0.15);
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }

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

const CompanyName = styled.h3`
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
    transition: all 0.3s ease;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    border: 1px solid transparent;

    &:hover {
        color: #2980b9;
        text-decoration: underline;
        background-color: rgba(52, 152, 219, 0.1);
    }

    &:focus {
        outline: none;
        border-color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
        text-decoration: underline;
    }

    &:focus:not(:focus-visible) {
        border-color: transparent;
        background-color: transparent;
        text-decoration: none;
    }
`;

const AchievementsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.5rem;
        line-height: 1.5;
        
        &::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #27ae60;
            font-weight: bold;
        }
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

    const allSkills = Object.values(skills).flat();

    return (
        <AboutSection data-testid="about-section" aria-labelledby="about-heading">
            <Content data-testid="about-content">
                <ProfileSection data-testid="profile-section">
                    <ProfileImage 
                        data-testid="profile-image" 
                        src={profilePhoto} 
                        alt="Arthur Senko - Professional headshot showing a friendly QA Leader and AI enthusiast"
                        tabIndex={0}
                        role="img"
                    />
                    <Name data-testid="profile-name" id="about-heading">
                        Arthur Senko
                    </Name>
                    <Position data-testid="profile-position">
                        QA Leader & AI Enthusiast
                    </Position>
                    <DocumentLink
                        data-testid="resume-link"
                        href={resumePDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download Arthur Senko's resume (opens PDF in new tab)"
                    >
                        Download Resume
                        <span aria-hidden="true"> ↗</span>
                    </DocumentLink>
                </ProfileSection>
                
                <div data-testid="about-details">
                    <Bio data-testid="about-bio" role="text">
                        A results-driven QA Leader with expertise in AI testing and modern automation.
                        Proven track record of building and leading high-performing QA teams, implementing
                        efficient testing processes, and driving quality improvements across organizations.
                        Proficient in leading projects of any complexity and creating comprehensive E2E solutions,
                        from initial concept to production deployment.
                    </Bio>

                    <Section data-testid="current-role-section" aria-labelledby="current-role-heading">
                        <SectionTitle data-testid="current-role-title" id="current-role-heading">
                            Current Role
                        </SectionTitle>
                        <ExperienceItem data-testid="experience-item">
                            <CompanyName data-testid="company-name">
                                Senior QA Leader @ <CompanyLink 
                                    href="https://www.allerganaesthetics.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label="Allergan Aesthetics website (opens in new tab)"
                                >
                                    Allergan Aesthetics
                                </CompanyLink>, an <CompanyLink 
                                    href="https://www.abbvie.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label="AbbVie Company website (opens in new tab)"
                                >
                                    AbbVie Company
                                </CompanyLink>
                            </CompanyName>
                            <Duration data-testid="role-duration">
                                <time dateTime="2022-06">June 2022</time> – Present | Remote
                            </Duration>
                            <AchievementsList data-testid="role-achievements" aria-label="Key achievements in current role">
                                <li>Managing QA efforts on projects responsible for ~90% of company revenue</li>
                                <li>Introduced AI-driven automation, reducing test development time by 80%</li>
                                <li>Led QA initiatives for the Alle mobile app, achieving 3x reduction in production bugs</li>
                            </AchievementsList>
                        </ExperienceItem>
                    </Section>

                    <Section data-testid="skills-section" aria-labelledby="skills-heading">
                        <SectionTitle data-testid="skills-title" id="skills-heading">
                            Technical Skills
                        </SectionTitle>
                        <SkillsGrid 
                            data-testid="skills-grid" 
                            role="group" 
                            aria-labelledby="skills-heading"
                            aria-describedby="skills-description"
                        >
                            {allSkills.map((skill, index) => (
                                <SkillItem 
                                    data-testid={`skill-item-${index}`} 
                                    key={index}
                                    tabIndex={0}
                                    role="listitem"
                                    aria-label={`Skill: ${skill}`}
                                >
                                    {skill}
                                </SkillItem>
                            ))}
                        </SkillsGrid>
                        <div 
                            id="skills-description" 
                            className="sr-only"
                            aria-hidden="true"
                        >
                            Interactive grid of technical skills. Use Tab key to navigate through skills.
                        </div>
                    </Section>

                    <Section data-testid="achievements-section" aria-labelledby="achievements-heading">
                        <SectionTitle data-testid="achievements-title" id="achievements-heading">
                            Notable Achievements
                        </SectionTitle>
                        <AchievementsList data-testid="achievements-list" aria-labelledby="achievements-heading">
                            <li data-testid="achievement-1">Co-founded TechStart.dev, an educational startup for developers and testers</li>
                            <li data-testid="achievement-2">Achieved 95% employment rate for training program graduates</li>
                            <li data-testid="achievement-3">Pioneered AI-driven testing strategies reducing test creation time by 60%</li>
                            <li data-testid="achievement-4">Built and led multiple QA teams from ground up in startup and enterprise settings</li>
                        </AchievementsList>
                    </Section>
                </div>
            </Content>
        </AboutSection>
    );
};

export default About;