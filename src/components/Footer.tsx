import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const FooterContainer = styled.footer`
    margin-top: auto;
    padding: 1rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
    text-align: center;
    transition: all 0.3s ease;
`;

const Footer = () => {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer data-testid="footer" theme={theme}>
            <p data-testid="footer-copyright">© {currentYear} Arthur Senko. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;
