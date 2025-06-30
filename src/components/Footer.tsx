import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const FooterContainer = styled.footer<{ $theme: any }>`
    margin-top: auto;
    padding: 1rem;
    background-color: ${props => props.$theme.colors.primary};
    color: white;
    text-align: center;
    transition: background-color 0.3s ease;
`;

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();

    return (
        <FooterContainer data-testid="footer" $theme={theme}>
            <p data-testid="footer-copyright">© {currentYear} Arthur Senko. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;
