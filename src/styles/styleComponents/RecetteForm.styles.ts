import styled from 'styled-components';

export const FormWrapper = styled.form`
    max-width: 600px;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 32.5%;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    display: block;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #028a66;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #00ac7b;
    }
`;

export const Section = styled.div`
    margin-bottom: 20px;
`;

export const BackToListButton = styled.button`
    background-color: #00d69a;
    color: #000000;
    height: 5%;
    margin-left: 5%;
    margin-top: 40px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #02b381;
    }
`;
