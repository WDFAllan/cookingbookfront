import styled from 'styled-components';

const deep    = '#0d2b18';
const mid     = '#16a34a';
const surface = '#ffffff';
const bg      = '#f5f7f5';
const border  = '#e2ebe5';
const text    = '#0d1f15';
const muted   = '#52736a';
const tagBg   = '#dcfce7';
const tagText = '#14532d';

export const PageHeader = styled.header`
    position: sticky;
    top: 0;
    z-index: 100;
    background: ${deep};
    padding: 0 2.5rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    box-shadow: 0 1px 0 rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.25);

    @media (max-width: 600px) {
        padding: 0 1.25rem;
    }
`;

export const HeaderTitle = styled.h1`
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '🍃';
        font-size: 1.1rem;
    }
`;

export const FilterBar = styled.div`
    background: ${surface};
    padding: 0.875rem 2.5rem;
    border-bottom: 1px solid ${border};
    display: flex;
    align-items: center;
    gap: 0.875rem;
    flex-wrap: wrap;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);

    @media (max-width: 600px) {
        padding: 0.75rem 1rem;
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    min-width: 180px;
    max-width: 300px;
    padding: 0.55rem 0.875rem 0.55rem 2.25rem;
    border: 1.5px solid ${border};
    border-radius: 10px;
    font-size: 0.875rem;
    background: ${bg} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%2352736a' stroke-width='2' viewBox='0 0 24 24'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E") no-repeat 0.7rem center;
    color: ${text};
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder { color: ${muted}; }

    &:focus {
        border-color: ${mid};
        box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
        background-color: ${surface};
    }

    @media (max-width: 600px) { max-width: 100%; }
`;

export const RecetteListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    align-content: start;
    gap: 1.5rem;
    padding: 2rem 2.5rem;

    @media (max-width: 700px) {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        padding: 1rem;
        gap: 1rem;
    }
`;

export const RecetteCard = styled.div`
    display: flex;
    flex-direction: column;
    background: ${surface};
    border: 1px solid ${border};
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.22s ease,
                border-color 0.22s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 16px 40px rgba(13,43,24,0.13), 0 2px 8px rgba(0,0,0,0.05);
        border-color: ${mid};
    }
`;

export const CardImage = styled.img`
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
`;

export const CardBody = styled.div`
    padding: 1rem 1.1rem 1.15rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
`;

export const RecetteName = styled.h3`
    margin: 0;
    font-size: 0.975rem;
    font-weight: 700;
    color: ${text};
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const RecetteDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.8rem;
`;

export const RecetteRate = styled.span`
    display: flex;
    align-items: center;
`;

export const RecetteDate = styled.span`
    color: ${muted};
    font-weight: 500;
`;

export const TagList = styled.div`
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
    margin-top: auto;
`;

export const Tag = styled.span`
    background: ${tagBg};
    color: ${tagText};
    padding: 0.2rem 0.6rem;
    font-size: 0.72rem;
    font-weight: 600;
    border-radius: 6px;
    text-transform: capitalize;
    letter-spacing: 0.01em;
`;

export const SortSelect = styled.select`
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1.5px solid #e2ebe5;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #0d1f15;
    background-color: #f5f7f5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2352736a' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.6rem center;
    appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    flex-shrink: 0;

    &:focus {
        border-color: #16a34a;
        box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
    }
`;

export const PaginationBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.5rem 2rem 2rem;
    flex-wrap: wrap;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
    min-width: 36px;
    height: 36px;
    padding: 0 0.6rem;
    border-radius: 8px;
    border: 1.5px solid ${({ $active }) => $active ? '#166534' : '#e2ebe5'};
    background: ${({ $active }) => $active ? '#166534' : '#ffffff'};
    color: ${({ $active }) => $active ? '#ffffff' : '#0d2b18'};
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover:not(:disabled) {
        border-color: #166534;
        background: ${({ $active }) => $active ? '#166534' : '#f0fdf4'};
        color: ${({ $active }) => $active ? '#ffffff' : '#166534'};
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
`;

export const PageInfo = styled.span`
    font-size: 0.82rem;
    color: #52736a;
    font-weight: 500;
    padding: 0 0.25rem;
`;

export const EmptyState = styled.div`
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    color: #52736a;
    font-size: 0.95rem;
`;

export const AddRecetteButton = styled.button`
    background: rgba(255,255,255,0.1);
    color: #ffffff;
    padding: 0.5rem 1.1rem;
    border: 1.5px solid rgba(255,255,255,0.35);
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s ease, border-color 0.18s ease;
    white-space: nowrap;
    letter-spacing: 0.01em;

    &:hover {
        background: rgba(255,255,255,0.22);
        border-color: rgba(255,255,255,0.7);
    }
`;
