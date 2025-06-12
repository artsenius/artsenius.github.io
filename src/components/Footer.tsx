import styled from 'styled-components';

const FooterContainer = styled.footer`
    margin-top: auto;
    padding: 1rem;
    background-color: #2c3e50;
    color: white;
    text-align: center;
`;

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer>
            <p>© {currentYear} Arthur Senko. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;
