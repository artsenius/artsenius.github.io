import React, { useState } from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
    padding: 2rem 0;
`;

const Title = styled.h1`
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    color: #6c757d;
    font-size: 1.1rem;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    max-width: 600px;
    margin: 0 auto;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const Label = styled.label`
    display: block;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e9ecef;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #3498db;
        outline: none;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e9ecef;
    border-radius: 4px;
    font-size: 1rem;
    min-height: 150px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #3498db;
        outline: none;
    }
`;

const Button = styled.button`
    background-color: #3498db;
    color: white;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2980b9;
    }

    &:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
    }
`;

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <ContactSection>
            <Title>Contact Me</Title>
            <Description>
                If you would like to get in touch, feel free to reach out via email or through the contact form below.
            </Description>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="message">Message</Label>
                    <TextArea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <Button type="submit">Send Message</Button>
            </Form>
        </ContactSection>
    );
};

export default Contact;