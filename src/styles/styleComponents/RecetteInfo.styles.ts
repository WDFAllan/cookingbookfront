import styled from 'styled-components';

const primary = '#2D6A4F';
const primaryDark = '#1B4332';
const bgPage = '#F6FAF7';
const border = '#E2EBE4';
const tagBg = '#D8F3DC';
const tagText = '#1B4332';

export const RecetteDetailsWrapper = styled.div`
    max-width: 780px;
    margin: 2rem auto;
    padding: 0 1.5rem 3rem;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;

    @media (max-width: 600px) {
        margin: 1rem auto;
        padding: 0 1rem 2rem;
    }
`;

export const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    color: ${primary};
    padding: 0.5rem 1rem;
    border: 1.5px solid ${primary};
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 1.5rem;

    &:hover {
        background: ${primary};
        color: #ffffff;
    }
`;

export const RecetteTitle = styled.h1`
    font-size: 2.25rem;
    font-weight: 700;
    color: ${primaryDark};
    margin: 0 0 0.5rem;
    letter-spacing: -0.03em;
    line-height: 1.2;

    @media (max-width: 600px) {
        font-size: 1.75rem;
    }
`;

export const RecetteDetails = styled.p`
    font-size: 1rem;
    color: #6B7280;
    margin: 0.25rem 0;
`;

export const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.25rem 0;
`;

export const Tag = styled.span`
    background-color: ${tagBg};
    color: ${tagText};
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    text-transform: capitalize;
`;

export const ListWrapper = styled.div`
    margin-top: 1.75rem;
    padding: 1.5rem;
    background: ${bgPage};
    border-radius: 12px;
    border: 1px solid ${border};
`;

export const ListTitle = styled.h3`
    font-size: 0.8rem;
    font-weight: 700;
    color: ${primaryDark};
    margin: 0 0 1rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const IngredientList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const StepsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const ListItem = styled.li`
    font-size: 0.95rem;
    color: #374151;
    padding: 0.6rem 0.875rem;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid ${border};
    list-style-type: none;
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 0.75rem;
    margin-top: 2rem;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

export const EditButton = styled.button`
    flex: 1;
    background: #1d6fa8;
    color: #ffffff;
    padding: 0.7rem 1.25rem;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #175d8e;
    }
`;

export const DeleteButton = styled.button`
    flex: 1;
    background: transparent;
    color: #dc2626;
    padding: 0.7rem 1.25rem;
    border: 1.5px solid #dc2626;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #dc2626;
        color: #ffffff;
    }
`;
