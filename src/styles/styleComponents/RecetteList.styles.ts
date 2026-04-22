import styled from 'styled-components';

const primaryDark = '#1B4332';
const primaryLight = '#40916C';
const bgPage = '#F6FAF7';
const bgCard = '#FFFFFF';
const textPrimary = '#111827';
const textSecondary = '#6B7280';
const border = '#E2EBE4';
const tagBg = '#D8F3DC';
const tagText = '#1B4332';

export const PageHeader = styled.header`
    background: linear-gradient(135deg, ${primaryDark} 0%, ${primaryLight} 100%);
    padding: 2rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem 1rem;
    }
`;

export const HeaderTitle = styled.h1`
    color: #ffffff;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.02em;

    @media (max-width: 600px) {
        font-size: 1.35rem;
    }
`;

export const FilterBar = styled.div`
    background: ${bgPage};
    padding: 0.75rem 2rem;
    border-bottom: 1px solid ${border};
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

export const SearchInput = styled.input`
    flex: 1;
    min-width: 180px;
    max-width: 320px;
    padding: 0.5rem 1rem;
    border: 1px solid ${border};
    border-radius: 8px;
    font-size: 0.9rem;
    background: #fff;
    color: ${textPrimary};
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
        color: ${textSecondary};
    }

    &:focus {
        border-color: ${primaryLight};
        box-shadow: 0 0 0 3px rgba(64, 145, 108, 0.15);
    }

    @media (max-width: 600px) {
        max-width: 100%;
    }
`;

export const RecetteListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    align-content: start;
    align-items: start;
    gap: 1.5rem;
    padding: 2rem 2.5rem;
    background: ${bgPage};

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
`;

export const RecetteCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px solid ${border};
    border-radius: 12px;
    background: ${bgCard};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(45, 106, 79, 0.12);
        border-color: ${primaryLight};
    }
`;

export const RecetteName = styled.h3`
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: ${textPrimary};
    line-height: 1.4;
`;

export const RecetteDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
`;

export const RecetteRate = styled.span`
    color: #F59E0B;
    font-weight: 600;
`;

export const RecetteDate = styled.span`
    color: ${textSecondary};
    font-size: 0.8rem;
`;

export const TagList = styled.div`
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
`;

export const Tag = styled.span`
    background-color: ${tagBg};
    color: ${tagText};
    padding: 0.2rem 0.65rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    text-transform: capitalize;
`;

export const AddRecetteButton = styled.button`
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    padding: 0.55rem 1.25rem;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        background: rgba(255, 255, 255, 0.28);
        border-color: #ffffff;
    }
`;
