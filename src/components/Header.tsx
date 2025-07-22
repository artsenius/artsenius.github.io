import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const Nav = styled.nav<{ $theme: any, $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2c3e50' : props.$theme.colors.primary};
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    left: 0;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const NavContainer = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        padding: 0 1rem;
    }
`;

const MobileTitle = styled.h1`
    display: none;
    color: white;
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
    flex: 1;
    padding: 0 3rem; // Space for menu button

    @media (max-width: 768px) {
        display: block;
    }
`;

const NavList = styled.ul<{ $isOpen: boolean }>`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
        display: ${props => props.$isOpen ? 'flex' : 'none'};
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #2c3e50;
        padding: 1rem;
        gap: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

interface NavButtonProps {
    $isActive: boolean;
}

const NavButton = styled.button<NavButtonProps>`
    background: none;
    border: none;
    color: ${props => props.$isActive ? '#3498db' : 'white'};
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
    font-weight: ${props => props.$isActive ? '600' : '400'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        color: #3498db;
    }

    @media (max-width: 768px) {
        padding: 0.5rem 0;
        width: 100%;
    }
`;

const LiveDot = styled.span`
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }

    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #e74c3c;
    border-radius: 50%;
    animation: pulse 2s infinite;
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:focus {
        outline: none;
    }
`;

const SearchButton = styled.button`
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    margin-left: 1rem;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const SearchKeyHint = styled.span`
    font-size: 0.75rem;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
`;

const SearchModal = styled.div<{ $isOpen: boolean; $isDark: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    align-items: flex-start;
    justify-content: center;
    z-index: 2000;
    padding-top: 10vh;
`;

const SearchContainer = styled.div<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#2c3e50' : '#ffffff'};
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    overflow: hidden;
`;

const SearchInput = styled.input<{ $isDark: boolean }>`
    width: 100%;
    padding: 1rem 1.5rem;
    border: none;
    font-size: 1rem;
    background-color: transparent;
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    outline: none;

    &::placeholder {
        color: ${props => props.$isDark ? '#7f8c8d' : '#95a5a6'};
    }
`;

const SearchResults = styled.div`
    max-height: 300px;
    overflow-y: auto;
`;

const SearchResult = styled.div<{ $isDark: boolean }>`
    padding: 1rem 1.5rem;
    border-top: 1px solid ${props => props.$isDark ? '#34495e' : '#e0e0e0'};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.$isDark ? '#34495e' : '#f8f9fa'};
    }
`;

const ResultTitle = styled.div<{ $isDark: boolean }>`
    font-weight: 600;
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    margin-bottom: 0.3rem;
`;

const ResultDescription = styled.div<{ $isDark: boolean }>`
    font-size: 0.9rem;
    color: ${props => props.$isDark ? '#bdc3c7' : '#7f8c8d'};
`;

const ThemeToggle = styled.button<{ $theme: any }>`
    background: none;
    border: none;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
    margin-left: 1rem;
    transition: color 0.3s;
    &:hover {
        color: ${props => props.$theme.colors.secondary};
    }
`;

interface HeaderProps {
    currentPage: 'about' | 'about-app' | 'automation' | 'contact';
    setCurrentPage: (page: 'about' | 'about-app' | 'automation' | 'contact') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const navRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const getPageTitle = () => {
        switch (currentPage) {
            case 'about':
                return 'About Me';
            case 'about-app':
                return 'About This App';
            case 'automation':
                return 'Live Automation';
            case 'contact':
                return 'Contact';
            default:
                return '';
        }
    };

    const toggleMenu = () => {
        setIsOpen(prev => {
            if (!prev) {
                // Opening menu - focus first nav item after DOM update
                setTimeout(() => {
                    const firstNavItem = navRef.current?.querySelector('button');
                    firstNavItem?.focus();
                }, 10);
            }
            return !prev;
        });
    };

    // Handle keyboard navigation in mobile menu
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                menuButtonRef.current?.focus();
            }

            if (e.key === 'Tab') {
                const navItems = navRef.current?.querySelectorAll('button');
                if (!navItems) return;

                const firstItem = navItems[0];
                const lastItem = navItems[navItems.length - 1];

                if (e.shiftKey && document.activeElement === firstItem) {
                    e.preventDefault();
                    lastItem.focus();
                } else if (!e.shiftKey && document.activeElement === lastItem) {
                    e.preventDefault();
                    firstItem.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Handle global keyboard shortcuts for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleSearchNavigate = (page: string) => {
        const validPages = ['about', 'about-app', 'automation', 'contact'] as const;
        if (validPages.includes(page as any)) {
            setCurrentPage(page as any);
        }
        handleSearchClose();
    };

    // Focus search input when modal opens
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Search data
    const searchData = [
        { title: 'TypeScript', description: 'Modern JavaScript with static typing', page: 'about' },
        { title: 'React', description: 'JavaScript library for building user interfaces', page: 'about' },
        { title: 'Test Automation', description: 'Playwright and Selenium automation', page: 'about' },
        { title: 'Node.js', description: 'JavaScript runtime environment', page: 'about' },
        { title: 'Azure Cloud', description: 'Microsoft cloud computing platform', page: 'about' },
        { title: 'Live Automation', description: 'Real-time test automation dashboard', page: 'automation' },
        { title: 'About This App', description: 'Full-stack React portfolio application', page: 'about-app' },
        { title: 'Contact', description: 'Get in touch for opportunities', page: 'contact' },
        { title: 'Dark Mode', description: 'Toggle between light and dark themes', page: 'about' },
        { title: 'Accessibility', description: 'WCAG 2.1 AA compliant features', page: 'about-app' },
    ];

    const filteredResults = searchQuery.trim() 
        ? searchData.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          ).slice(0, 6)
        : [];

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleSearchClose();
        }
    };

    const handleNavItemClick = (page: 'about' | 'about-app' | 'automation' | 'contact') => {
        setCurrentPage(page);
        setIsOpen(false);
        // Announce page change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = `Navigated to ${getPageTitle()} page`;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    };

    return (
        <Nav 
            data-testid="header-nav" 
            $theme={theme} 
            $isDark={isDarkMode}
            id="navigation"
            role="banner"
            aria-label="Main navigation"
        >
            <NavContainer data-testid="nav-container">
                <MenuButton
                    ref={menuButtonRef}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                    aria-controls="main-navigation"
                    data-testid="nav-menu-button"
                >
                    {isOpen ? '✕' : '☰'}
                </MenuButton>
                <MobileTitle data-testid="mobile-page-title">
                    {getPageTitle()}
                </MobileTitle>
                <NavList 
                    ref={navRef}
                    data-testid="nav-list" 
                    $isOpen={isOpen}
                    id="main-navigation"
                    role="menu"
                    aria-label="Main navigation menu"
                >
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-about" 
                            $isActive={currentPage === 'about'} 
                            onClick={() => handleNavItemClick('about')}
                            role="menuitem"
                            aria-current={currentPage === 'about' ? 'page' : undefined}
                        >
                            About Me
                        </NavButton>
                    </li>
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-about-app" 
                            $isActive={currentPage === 'about-app'} 
                            onClick={() => handleNavItemClick('about-app')}
                            role="menuitem"
                            aria-current={currentPage === 'about-app' ? 'page' : undefined}
                        >
                            About This App
                        </NavButton>
                    </li>
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-automation" 
                            $isActive={currentPage === 'automation'} 
                            onClick={() => handleNavItemClick('automation')}
                            role="menuitem"
                            aria-current={currentPage === 'automation' ? 'page' : undefined}
                        >
                            Live Automation
                            <LiveDot aria-hidden="true" />
                        </NavButton>
                    </li>
                    <li role="none">
                        <NavButton 
                            data-testid="nav-link-contact" 
                            $isActive={currentPage === 'contact'} 
                            onClick={() => handleNavItemClick('contact')}
                            role="menuitem"
                            aria-current={currentPage === 'contact' ? 'page' : undefined}
                        >
                            Contact
                        </NavButton>
                    </li>
                </NavList>
                <SearchButton 
                    onClick={handleSearchClick}
                    aria-label="Search portfolio content"
                    data-testid="search-button"
                >
                    🔍 Search
                    <SearchKeyHint>⌘K</SearchKeyHint>
                </SearchButton>
                <ThemeToggle
                    onClick={toggleTheme}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    data-testid="theme-toggle"
                    $theme={theme}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </ThemeToggle>
            </NavContainer>
        </Nav>
        
        <SearchModal 
            $isOpen={isSearchOpen} 
            $isDark={isDarkMode} 
            onClick={handleSearchClose}
        >
            <SearchContainer 
                $isDark={isDarkMode} 
                onClick={(e) => e.stopPropagation()}
            >
                <SearchInput
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search portfolio content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    $isDark={isDarkMode}
                />
                <SearchResults>
                    {filteredResults.map((result, index) => (
                        <SearchResult
                            key={index}
                            $isDark={isDarkMode}
                            onClick={() => handleSearchNavigate(result.page)}
                        >
                            <ResultTitle $isDark={isDarkMode}>{result.title}</ResultTitle>
                            <ResultDescription $isDark={isDarkMode}>
                                {result.description}
                            </ResultDescription>
                        </SearchResult>
                    ))}
                    {searchQuery.trim() && filteredResults.length === 0 && (
                        <SearchResult $isDark={isDarkMode}>
                            <ResultDescription $isDark={isDarkMode}>
                                No results found for "{searchQuery}"
                            </ResultDescription>
                        </SearchResult>
                    )}
                </SearchResults>
            </SearchContainer>
        </SearchModal>
    );
};

export default Header;