import React from 'react';
import styled, { css } from 'styled-components';
import profilePhoto from '../media/art.jpg';
import resumePDF from '../media/A_Senko_Lead_SDET.pdf';
import { useTheme } from './ThemeProvider';
import { fadeInUp, slideInLeft, slideInRight, pulse } from '../styles/animations';

const AboutSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const PageTitle = styled.h1`
    color: ${props => props.theme.colors.text};
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    animation: ${fadeInUp} 0.8s ease-out;
    position: relative;
    letter-spacing: -0.02em;

    &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 4rem;
        height: 3px;
        background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accent}66);
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
`;

const ProfileSection = styled.div`
    text-align: center;
    animation: ${slideInLeft} 0.8s ease-out 0.2s both;
    background: ${props => props.theme.colors.surface};
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px ${props => props.theme.colors.shadow};
    border: 1px solid ${props => props.theme.colors.surface};
    backdrop-filter: blur(10px);

    @media (max-width: 768px) {
        animation: ${fadeInUp} 0.8s ease-out 0.1s both;
        padding: 1.5rem;
    }
`;

const ProfileImage = styled.img`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 3px solid transparent;
    background: linear-gradient(${props => props.theme.colors.surface}, ${props => props.theme.colors.surface}) padding-box,
                linear-gradient(45deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accent}80) border-box;

    &:hover {
        transform: scale(1.05) rotate(2deg);
        box-shadow: 0 12px 40px rgba(52, 152, 219, 0.3);
        animation: ${pulse} 2s infinite;
    }

    &:focus {
        outline: 3px solid ${props => props.theme.colors.accent};
        outline-offset: 4px;
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 200px;
    }
`;

const Name = styled.h2`
    color: ${props => props.theme.colors.text};
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
    font-weight: 700;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Position = styled.h3`
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
    font-weight: 500;
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const DocumentLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accent}CC);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 1rem;
    font-weight: 600;
    box-shadow: 0 4px 12px ${props => props.theme.colors.accent}33;

    &:hover {
        background: linear-gradient(135deg, #2980b9, #3498db);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${props => props.theme.colors.accent}40;
    }

    &:focus {
        outline: 3px solid ${props => props.theme.colors.accent}66;
        outline-offset: 2px;
    }

    &:active {
        transform: translateY(0);
    }
`;

const ExpandableInfoBox = styled.div<{ $isDark: boolean }>`
    position: relative;
    background: ${props => props.$isDark ? '#2c3e50' : '#f8f9fa'};
    border: 1px solid ${props => props.$isDark ? '#34495e' : '#e9ecef'};
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: ${props => props.$isDark ? '#ecf0f1' : '#495057'};
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background: ${props => props.$isDark ? '#34495e' : '#e9ecef'};
        border-color: ${props => props.$isDark ? '#3498db' : '#007bff'};
    }
`;

const InfoIcon = styled.span`
    font-size: 1.2rem;
    opacity: 0.9;
`;

const InfoText = styled.span`
    font-weight: 600;
`;

const ExpandedContent = styled.div<{ $isDark: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.$isDark ? '#2c3e50' : '#f8f9fa'};
    border: 1px solid ${props => props.$isDark ? '#34495e' : '#e9ecef'};
    border-top: none;
    border-radius: 8px 8px 8px 8px;
    padding: 1rem;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;

    ${ExpandableInfoBox}:hover & {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
`;

const Bio = styled.div`
    font-size: 1.15rem;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    animation: ${slideInRight} 0.8s ease-out 0.3s both;
    color: ${props => props.theme.colors.text};
    
    p {
        margin-bottom: 1rem;
        
        &:last-child {
            margin-bottom: 0;
        }
    }

    @media (max-width: 768px) {
        font-size: 1.05rem;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
`;

const Section = styled.div<{ $delay?: number }>`
    margin-bottom: 3rem;
    animation: ${slideInRight} 0.8s ease-out ${props => props.$delay || 0.5}s both;

    &:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 768px) {
        margin-bottom: 2rem;
    }
`;

const SectionTitle = styled.h4<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? props.theme.colors.text : '#2c3e50'};
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
    transition: color 0.3s;
    font-weight: 700;
    position: relative;
    letter-spacing: -0.01em;

    &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 3rem;
        height: 3px;
        background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accent}66);
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 0.75rem;
    }
`;

const SkillsFilterContainer = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: ${props => props.theme.colors.surface};
    border-radius: 12px;
    box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid ${props => props.theme.colors.surface};
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    margin-bottom: 1.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.accent};
        box-shadow: 0 0 0 3px ${props => props.theme.colors.accent}33;
    }

    &::placeholder {
        color: ${props => props.theme.colors.textSecondary};
    }
`;

const FilterButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
    padding: 0.625rem 1.25rem;
    border: 2px solid ${props => props.$isActive ? props.theme.colors.accent : props.theme.colors.surface};
    background-color: ${props => props.$isActive ? props.theme.colors.accent : props.theme.colors.surface};
    color: ${props => props.$isActive ? 'white' : props.theme.colors.text};
    border-radius: 24px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        border-color: ${props => props.theme.colors.accent};
        background-color: ${props => props.$isActive ? '#2980b9' : props.theme.colors.hover};
        transform: translateY(-1px);
    }

    &:focus {
        outline: 2px solid ${props => props.theme.colors.accent}66;
        outline-offset: 2px;
    }

    &:active {
        transform: translateY(0);
    }
`;

const SkillItem = styled.div<{ $isVisible: boolean; $index?: number }>`
    background: linear-gradient(135deg, ${props => props.theme.colors.surface}, ${props => props.theme.colors.surface}F0);
    padding: 1rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
    color: ${props => props.theme.colors.text};
    opacity: ${props => props.$isVisible ? 1 : 0};
    transform: ${props => props.$isVisible ? 'scale(1)' : 'scale(0.8)'};
    display: ${props => props.$isVisible ? 'block' : 'none'};
    animation: ${props => props.$isVisible ? css`${fadeInUp} 0.6s ease-out ${(props.$index || 0) * 0.05}s both` : 'none'};
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, ${props => props.theme.colors.accent}20, transparent);
        transition: left 0.6s;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 0.875rem;
    }

    &:hover {
        transform: translateY(-4px) ${props => props.$isVisible ? 'scale(1.02)' : 'scale(0.8)'};
        background: linear-gradient(135deg, ${props => props.theme.colors.hover}, ${props => props.theme.colors.hover}F0);
        border-color: ${props => props.theme.colors.accent};
        box-shadow: 0 8px 24px ${props => props.theme.colors.accent}33;

        &::before {
            left: 100%;
        }
    }
`;

const ResultsCounter = styled.p`
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
    margin-bottom: 0;
    font-weight: 500;
`;

const ExperienceItem = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: ${props => props.theme.colors.surface};
    border-radius: 12px;
    box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px ${props => props.theme.colors.shadow};
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const CompanyName = styled.h5<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? props.theme.colors.text : '#2c3e50'};
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    transition: color 0.3s;
    font-weight: 600;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const Duration = styled.p`
    color: #7f8c8d;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    font-weight: 500;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const CompanyLink = styled.a`
    color: #3498db;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 600;

    &:hover {
        color: #2980b9;
        text-decoration: underline;
    }

    &:focus {
        outline: 2px solid #3498db66;
        outline-offset: 2px;
        border-radius: 2px;
    }
`;

const AchievementsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        position: relative;
        padding-left: 2rem;
        margin-bottom: 1rem;
        line-height: 1.6;
        color: ${props => props.theme.colors.text};

        &::before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 0;
            font-size: 1.1rem;
            color: ${props => props.theme.colors.accent};
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

interface AboutProps {
  isDark: boolean;
  setCurrentPage?: (page: 'about' | 'about-app' | 'automation' | 'contact') => void;
}

const About: React.FC<AboutProps> = ({ isDark, setCurrentPage }) => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [activeFilter, setActiveFilter] = React.useState<string>('all');

    const skills = React.useMemo(() => ({
        automation: ['WebdriverIO', 'Cypress', 'Playwright', 'Selenium', 'Appium', 'Model Context Protocol', 'Artillery', 'KaneAI', 'SmartUI'],
        technologies: ['JavaScript/TypeScript', 'React', 'React Native', 'Express.js', 'MongoDB', 'RESTful APIs', 'GraphQL'],
        cloud: ['BrowserStack', 'LambdaTest', 'SauceLabs', 'AWS'],
        tools: ['Azure DevOps', 'GitHub Actions', 'Docker', 'Jenkins', 'Visual QA', 'Accessibility Testing'],
        ai: ['Cursor Agents', 'Playwright MCP'],
        methodologies: ['DevOps', 'Load Testing']
    }), []);

    const skillCategories = [
        { key: 'all', label: 'All Skills' },
        { key: 'automation', label: 'Test Automation' },
        { key: 'technologies', label: 'Technologies' },
        { key: 'cloud', label: 'Cloud & Testing' },
        { key: 'tools', label: 'DevOps Tools' },
        { key: 'ai', label: 'AI & Innovation' },
        { key: 'methodologies', label: 'Methodologies' }
    ];

    const getAllSkills = () => {
        return Object.entries(skills).flatMap(([category, skillList]) => 
            skillList.map(skill => ({ skill, category }))
        );
    };

    const filteredSkills = React.useMemo(() => {
        const allSkills = Object.entries(skills).flatMap(([category, skillList]) => 
            skillList.map(skill => ({ skill, category }))
        );
        
        return allSkills.filter(({ skill, category }) => {
            const matchesSearch = skill.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, activeFilter, skills]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setActiveFilter('all');
        // Announce filter clear to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = 'Filters cleared. Showing all skills.';
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    };

    return (
        <AboutSection data-testid="about-section" role="main" aria-labelledby="about-heading">
            <PageTitle id="about-heading" data-testid="about-page-title">
                About Me
            </PageTitle>
            
            <Content data-testid="about-content">
                <ProfileSection 
                    data-testid="profile-section" 
                    role="banner"
                    aria-labelledby="profile-name"
                    aria-describedby="profile-position"
                >
                    <ProfileImage 
                        data-testid="profile-image" 
                        src={profilePhoto} 
                        alt="Arthur Senko - Professional headshot" 
                        tabIndex={0}
                        role="img"
                    />
                    <Name data-testid="profile-name" id="profile-name">Arthur Senko</Name>
                    <Position data-testid="profile-position" id="profile-position">
                        Lead QA Engineer, SDET<br />AI Enthusiast
                    </Position>
                    <DocumentLink
                        data-testid="resume-link"
                        href={resumePDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download Arthur Senko's resume (opens in new tab)"
                    >
                        Download Resume ↗
                    </DocumentLink>
                </ProfileSection>
                <div data-testid="about-details" role="complementary">
                    <ExpandableInfoBox 
                        data-testid="app-info-box" 
                        $isDark={isDark}
                        role="button"
                        tabIndex={0}
                        aria-label="App information - hover or focus to expand"
                        aria-expanded="false"
                    >
                        <InfoIcon data-testid="app-info-icon" aria-hidden="true">ℹ️</InfoIcon>
                        <InfoText data-testid="app-info-text">App Info</InfoText>
                        <ExpandedContent data-testid="app-info-expanded-content" $isDark={isDark} role="tooltip">
                            A modern React application built by me from scratch with TypeScript. Features a robust Express.js backend with MongoDB database, comprehensive Playwright E2E testing, and automated CI/CD deployment. See <button
                                data-testid="about-app-link"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage?.('about-app');
                                }}
                                style={{ 
                                    color: theme.colors.accent, 
                                    textDecoration: 'underline', 
                                    cursor: 'pointer', 
                                    background: 'none', 
                                    border: 'none', 
                                    padding: 0, 
                                    font: 'inherit' 
                                }}
                                aria-label="Navigate to About This App page"
                            >
                                About This App
                            </button> page to learn more.
                        </ExpandedContent>
                    </ExpandableInfoBox>

                    <Bio data-testid="about-bio" role="article" aria-labelledby="bio-heading">
                        <h3 id="bio-heading" className="sr-only">Biography</h3>
                        <p>
                            A results-driven Lead QA Engineer, SDET, and Test Automation Architect with expertise in AI testing and modern automation.
                            Proven track record of building and leading high-performing QA teams, implementing
                            efficient testing processes, and driving quality improvements across organizations.
                            Experienced in building comprehensive testing solutions and continuous integration pipelines from the ground up,
                            from initial concept to production deployment. Specialized in architecting scalable automation frameworks
                            that deliver exceptional results for even the most complex enterprise projects.
                        </p>
                    </Bio>

                    <Section data-testid="current-role-section" $delay={0.6} role="region" aria-labelledby="current-role-heading">
                        <SectionTitle data-testid="current-role-title" $isDark={isDark} id="current-role-heading">Current Role</SectionTitle>
                        <ExperienceItem data-testid="experience-item">
                            <CompanyName data-testid="company-name" $isDark={isDark}>
                                <span data-testid="position-title">Lead QA Engineer</span> @ <CompanyLink 
                                    data-testid="allergan-link" 
                                    href="https://www.allerganaesthetics.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label="Allergan Aesthetics website (opens in new tab)"
                                >
                                    Allergan Aesthetics
                                </CompanyLink>, an <CompanyLink 
                                    data-testid="abbvie-link" 
                                    href="https://www.abbvie.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label="AbbVie Company website (opens in new tab)"
                                >
                                    AbbVie Company
                                </CompanyLink>
                            </CompanyName>
                            <Duration data-testid="role-duration">June 2022 – Present | Remote</Duration>
                            <AchievementsList data-testid="role-achievements" role="list" aria-label="Role achievements">
                                <li>Helped to enable $20M+ in single-day gift card sales.</li>
                                <li>Introduced AI tools to improve testing processes and reduce test creation time by 80%.</li>
                                <li>Built automation frameworks from scratch and scaled cross-browser/device testing.</li>
                                <li>Established company-wide load and high availability testing strategy.</li>
                                <li>Launched Slack-integrated Cursor AI agents for to automate many routine tasks.</li>
                            </AchievementsList>
                        </ExperienceItem>
                    </Section>

                    <Section data-testid="skills-section" $delay={0.7} role="region" aria-labelledby="skills-heading">
                        <SectionTitle data-testid="skills-title" $isDark={isDark} id="skills-heading">Technical Skills</SectionTitle>
                        
                        <SkillsFilterContainer data-testid="skills-filter-container" role="search" aria-labelledby="skills-search-heading">
                            <h5 id="skills-search-heading" className="sr-only">Search and filter skills</h5>
                            <SearchInput
                                data-testid="skills-search"
                                data-has-value={searchTerm.length > 0}
                                data-results-count={filteredSkills.length}
                                type="text"
                                placeholder="Search skills... (e.g., React, JavaScript, Cypress)"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                aria-label="Search technical skills"
                                aria-describedby="results-counter"
                            />
                            
                            <FilterButtons data-testid="filter-buttons" role="group" aria-label="Filter skills by category">
                                {skillCategories.map(({ key, label }) => (
                                    <FilterButton
                                        key={key}
                                        data-testid={`filter-${key}-${activeFilter === key ? 'active' : 'inactive'}`}
                                        data-category={key}
                                        data-selected={activeFilter === key}
                                        $isActive={activeFilter === key}
                                        onClick={() => handleFilterChange(key)}
                                        aria-label={`Filter by ${label}`}
                                        aria-pressed={activeFilter === key}
                                    >
                                        {label}
                                    </FilterButton>
                                ))}
                                {(searchTerm || activeFilter !== 'all') && (
                                    <FilterButton
                                        data-testid="clear-filters-button"
                                        $isActive={false}
                                        onClick={clearFilters}
                                        aria-label="Clear all filters and show all skills"
                                        style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}
                                    >
                                        Clear ✕
                                    </FilterButton>
                                )}
                            </FilterButtons>
                            
                            <ResultsCounter 
                                data-testid="results-counter"
                                id="results-counter"
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                Showing {filteredSkills.length} of {getAllSkills().length} skills
                            </ResultsCounter>
                        </SkillsFilterContainer>

                        <SkillsGrid 
                            data-testid="skills-grid"
                            role="list"
                            aria-label={`Technical skills. ${filteredSkills.length} skills displayed.`}
                            aria-describedby="results-counter"
                        >
                            {filteredSkills.map(({ skill, category }, index) => (
                                <SkillItem 
                                    data-testid={`skill-item-${skill.toLowerCase().replace(/[\s/]/g, '-')}`}
                                    data-category={category}
                                    data-skill-name={skill}
                                    data-index={index}
                                    key={`${skill}-${index}`}
                                    $isVisible={true}
                                    $index={index}
                                    role="listitem"
                                    tabIndex={0}
                                    aria-label={`Skill: ${skill} in ${category} category`}
                                >
                                    {skill}
                                </SkillItem>
                            ))}
                        </SkillsGrid>
                        
                        {filteredSkills.length === 0 && (
                            <p 
                                data-testid="no-results" 
                                role="status"
                                aria-live="polite"
                                style={{ 
                                    textAlign: 'center', 
                                    color: theme.colors.textSecondary,
                                    fontStyle: 'italic',
                                    padding: '2rem'
                                }}
                            >
                                No skills found matching your criteria. Try adjusting your search or filters.
                            </p>
                        )}
                    </Section>

                    <Section data-testid="achievements-section" $delay={0.8} role="region" aria-labelledby="achievements-heading">
                        <SectionTitle data-testid="achievements-title" $isDark={isDark} id="achievements-heading">Notable Achievements</SectionTitle>
                        <AchievementsList data-testid="achievements-list" role="list" aria-label="Notable achievements">
                            <li>Built QA teams and processes from the ground up in startup and enterprise environments.</li>
                            <li>Played a key role on every project, demonstrating responsibility and commitment to success.</li>
                            <li>Successfully led QA initiatives directly contributing to millions in company revenue.</li>
                            <li>Pioneered the adoption of advanced automation tools and frameworks, driving innovation.</li>
                            <li>Co-founded a startup, helping people launch careers with a 95% graduate employment rate.</li>
                        </AchievementsList>
                    </Section>
                </div>
            </Content>
        </AboutSection>
    );
};

export default About;