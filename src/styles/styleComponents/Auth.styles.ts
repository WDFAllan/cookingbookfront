import styled from 'styled-components';

const primary = '#166534';
const mid     = '#16a34a';
const bg      = '#f5f7f5';
const surface = '#ffffff';
const border  = '#e2ebe5';
const text    = '#0d1f15';
const muted   = '#52736a';

export const AuthWrapper = styled.div`
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: ${bg};
`;

export const AuthCard = styled.div`
    width: 100%;
    max-width: 420px;
    background: ${surface};
    border: 1px solid ${border};
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);

    @media (max-width: 480px) {
        padding: 1.75rem 1.25rem;
    }
`;

export const AuthTitle = styled.h1`
    font-size: 1.6rem;
    font-weight: 800;
    color: #0d2b18;
    margin: 0 0 0.25rem;
    letter-spacing: -0.025em;
    text-align: center;
`;

export const AuthSubtitle = styled.p`
    font-size: 0.875rem;
    color: ${muted};
    text-align: center;
    margin: 0 0 1.75rem;
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const AuthLabel = styled.label`
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${muted};
    margin-bottom: 5px;
`;

export const AuthInput = styled.input`
    padding: 0.65rem 0.875rem;
    font-size: 0.95rem;
    border: 1.5px solid ${border};
    border-radius: 10px;
    margin-bottom: 1rem;
    background: ${bg};
    color: ${text};
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;

    &:focus {
        border-color: ${mid};
        box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
        background: ${surface};
    }
`;

export const AuthButton = styled.button`
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.5rem;
    background: ${primary};
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.18s, transform 0.12s;
    letter-spacing: 0.01em;

    &:hover:not(:disabled) {
        background: ${mid};
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const AuthError = styled.p`
    font-size: 0.85rem;
    color: #dc2626;
    background: #fef2f2;
    border: 1px solid #fca5a5;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.75rem;
`;

export const AuthFooter = styled.p`
    text-align: center;
    font-size: 0.875rem;
    color: ${muted};
    margin: 1.5rem 0 0;
`;

export const AuthLink = styled.a`
    color: ${primary};
    font-weight: 600;
    text-decoration: none;

    &:hover { text-decoration: underline; }
`;
