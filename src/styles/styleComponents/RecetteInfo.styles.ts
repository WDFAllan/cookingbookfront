import styled from 'styled-components';

const primary = '#2D6A4F';
const primaryDark = '#1B4332';
const bgPage = '#F6FAF7';
const border = '#E2EBE4';
const tagBg = '#D8F3DC';
const tagText = '#1B4332';

export const RecetteHeroImage = styled.img`
    width: 100%;
    max-height: 320px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    display: block;
`;

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

export const MetaBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin: 0.75rem 0 1.25rem;
`;

export const MetaChip = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: ${bgPage};
    border: 1px solid ${border};
    border-radius: 20px;
    padding: 0.35rem 0.85rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${primaryDark};
`;

export const TwoColumnLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 1.75rem;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
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

export const StepRow = styled.li`
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    list-style: none;
`;

export const StepNumberCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
`;

export const StepCircle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${primary};
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const StepConnector = styled.div`
    width: 2px;
    flex: 1;
    min-height: 16px;
    background: ${border};
    margin: 4px 0;
`;

export const StepText = styled.p`
    font-size: 0.95rem;
    color: #374151;
    margin: 0;
    padding: 4px 0 1rem;
    line-height: 1.5;
`;

export const ServingsControl = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1.25rem 0;
`;

export const ServingsLabel = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: ${primaryDark};
`;

export const ServingsButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1.5px solid ${primary};
    background: transparent;
    color: ${primary};
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover:not(:disabled) {
        background: ${primary};
        color: #fff;
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
`;

export const ServingsCount = styled.span`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${primaryDark};
    min-width: 2rem;
    text-align: center;
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
