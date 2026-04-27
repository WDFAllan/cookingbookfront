import styled from 'styled-components';

const deep    = '#0d2b18';
const primary = '#166534';
const mid     = '#16a34a';
const surface = '#ffffff';
const bg      = '#f5f7f5';
const border  = '#e2ebe5';
const text    = '#0d1f15';
const muted   = '#52736a';
const tagBg   = '#dcfce7';
const tagText = '#14532d';

export const RecetteDetailsWrapper = styled.div`
    max-width: 820px;
    margin: 0 auto;
    padding: 2.5rem 2rem 4rem;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;

    @media (max-width: 600px) {
        padding: 1.5rem 1rem 3rem;
    }
`;

export const RecetteHeroImage = styled.img`
    width: 100%;
    aspect-ratio: 16 / 7;
    object-fit: cover;
    border-radius: 16px;
    margin-bottom: 2rem;
`;

export const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: transparent;
    color: ${muted};
    padding: 0 0 1.5rem;
    border: none;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s ease;

    &::before { content: '←'; font-size: 1rem; }

    &:hover { color: ${primary}; }
`;

export const RecetteTitle = styled.h1`
    font-size: 2.25rem;
    font-weight: 800;
    color: ${deep};
    margin: 0 0 0.75rem;
    letter-spacing: -0.03em;
    line-height: 1.15;

    @media (max-width: 600px) {
        font-size: 1.65rem;
    }
`;

export const RecetteDetails = styled.p`
    font-size: 0.95rem;
    color: ${muted};
    margin: 0.2rem 0;
`;

export const MetaBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.875rem 0 1.5rem;
`;

export const MetaChip = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: ${surface};
    border: 1px solid ${border};
    border-radius: 8px;
    padding: 0.35rem 0.8rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: ${text};
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
`;

export const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 1.5rem 0;
`;

export const Tag = styled.span`
    background: ${tagBg};
    color: ${tagText};
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
    text-transform: capitalize;
    letter-spacing: 0.01em;
`;

export const ServingsControl = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: ${surface};
    border: 1px solid ${border};
    border-radius: 12px;
    padding: 0.5rem 0.875rem;
    margin: 0 0 1.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
`;

export const ServingsLabel = styled.span`
    font-size: 0.85rem;
    font-weight: 600;
    color: ${muted};
`;

export const ServingsButton = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid ${border};
    background: ${bg};
    color: ${primary};
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    line-height: 1;

    &:hover:not(:disabled) {
        background: ${primary};
        border-color: ${primary};
        color: #fff;
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

export const ServingsCount = styled.span`
    font-size: 1rem;
    font-weight: 700;
    color: ${deep};
    min-width: 1.75rem;
    text-align: center;
`;

export const TwoColumnLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 0.5rem;

    @media (max-width: 680px) {
        grid-template-columns: 1fr;
    }
`;

export const ListWrapper = styled.div`
    background: ${surface};
    border: 1px solid ${border};
    border-radius: 14px;
    padding: 1.35rem 1.5rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`;

export const ListTitle = styled.h3`
    font-size: 0.7rem;
    font-weight: 700;
    color: ${muted};
    margin: 0 0 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;

export const IngredientList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

export const StepsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

export const ListItem = styled.li`
    font-size: 0.9rem;
    color: ${text};
    padding: 0.55rem 0.8rem;
    background: ${bg};
    border-radius: 8px;
    border: 1px solid ${border};
    list-style: none;
`;

export const StepRow = styled.li`
    display: flex;
    gap: 0.875rem;
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
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${primary};
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(22,101,52,0.3);
`;

export const StepConnector = styled.div`
    width: 1.5px;
    flex: 1;
    min-height: 12px;
    background: ${border};
    margin: 3px 0;
`;

export const StepText = styled.p`
    font-size: 0.9rem;
    color: ${text};
    margin: 0;
    padding: 3px 0 0.875rem;
    line-height: 1.55;
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
    background: ${primary};
    color: #ffffff;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 10px;
    font-size: 0.925rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.12s ease;

    &:hover {
        background: ${mid};
        transform: translateY(-1px);
    }

    &:active { transform: translateY(0); }
`;

export const DeleteButton = styled.button`
    flex: 1;
    background: transparent;
    color: #dc2626;
    padding: 0.75rem 1.25rem;
    border: 1.5px solid #fca5a5;
    border-radius: 10px;
    font-size: 0.925rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;

    &:hover {
        background: #fef2f2;
        border-color: #dc2626;
        transform: translateY(-1px);
    }

    &:active { transform: translateY(0); }
`;
