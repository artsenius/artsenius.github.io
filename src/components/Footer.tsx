import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

const FooterContainer = styled.footer<{ $isDarkMode: boolean }>`
    margin-top: auto;
    padding: 1rem;
    background-color: ${props => props.$isDarkMode ? darkTheme.colors.surface : lightTheme.colors.primary};
    color: white;
    text-align: center;
    transition: background-color 0.3s ease;
`;

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { isDarkMode } = useTheme();

    return (
        <FooterContainer data-testid="footer" $isDarkMode={isDarkMode}>
            <p data-testid="footer-copyright">© {currentYear} Arthur Senko. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;
