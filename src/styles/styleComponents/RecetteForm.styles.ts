import styled from 'styled-components';

const deep    = '#0d2b18';
const primary = '#166534';
const mid     = '#16a34a';
const surface = '#ffffff';
const bg      = '#f5f7f5';
const border  = '#e2ebe5';
const text    = '#0d1f15';
const muted   = '#52736a';

export const FormWrapper = styled.form`
    max-width: 620px;
    margin: 2.5rem auto;
    padding: 2.5rem;
    background: ${surface};
    border-radius: 20px;
    border: 1px solid ${border};
    box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03);

    @media (max-width: 700px) {
        margin: 1rem;
        padding: 1.5rem;
        border-radius: 16px;
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 1.5rem;
    font-weight: 800;
    color: ${deep};
    margin: 0 0 2rem;
    letter-spacing: -0.025em;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: ${muted};
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.65rem 0.875rem;
    font-size: 0.95rem;
    border: 1.5px solid ${border};
    border-radius: 10px;
    margin-bottom: 1.25rem;
    box-sizing: border-box;
    color: ${text};
    background: ${bg};
    transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;

    &:focus {
        border-color: ${mid};
        outline: none;
        box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
        background: ${surface};
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 0.825rem;
    font-size: 0.95rem;
    font-weight: 700;
    background: ${primary};
    color: #ffffff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: background 0.18s ease, transform 0.12s ease;
    margin-top: 0.5rem;

    &:hover {
        background: ${mid};
        transform: translateY(-1px);
    }

    &:active { transform: translateY(0); }
`;

export const Section = styled.div`
    margin-bottom: 1.5rem;
    padding: 1.25rem;
    background: ${bg};
    border-radius: 12px;
    border: 1px solid ${border};
`;

export const InputRow = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
`;

export const SmallInput = styled.input`
    padding: 0.575rem 0.75rem;
    font-size: 0.875rem;
    border: 1.5px solid ${border};
    border-radius: 10px;
    color: ${text};
    background: ${surface};
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    min-width: 0;

    &:focus {
        border-color: ${mid};
        outline: none;
        box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
    }
`;

export const AddButton = styled.button`
    padding: 0.575rem 1rem;
    background: ${primary};
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.18s ease;

    &:hover { background: ${mid}; }
`;

export const ItemsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
`;

export const ItemRow = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: ${surface};
    border: 1px solid ${border};
    border-radius: 8px;
    font-size: 0.875rem;
    color: ${text};
    list-style: none;
`;

export const StepNumber = styled.span`
    min-width: 20px;
    height: 20px;
    background: ${primary};
    color: #ffffff;
    border-radius: 50%;
    font-size: 0.68rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.6rem;
    flex-shrink: 0;
`;

export const RemoveButton = styled.button`
    background: transparent;
    color: #9ca3af;
    border: none;
    padding: 0.2rem 0.35rem;
    cursor: pointer;
    font-size: 0.85rem;
    border-radius: 4px;
    transition: color 0.15s ease, background 0.15s ease;
    flex-shrink: 0;
    margin-left: 0.5rem;
    line-height: 1;

    &:hover {
        color: #dc2626;
        background: #fef2f2;
    }
`;

export const TagPillList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0;
    margin: 0.5rem 0 0;
    list-style: none;
`;

export const TagPill = styled.li`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.65rem;
    background: #dcfce7;
    color: #14532d;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    list-style: none;
`;

export const TagPillRemove = styled.button`
    background: transparent;
    border: none;
    color: #166634;
    cursor: pointer;
    padding: 0;
    font-size: 0.75rem;
    line-height: 1;
    opacity: 0.55;
    transition: opacity 0.15s;

    &:hover { opacity: 1; }
`;

export const TagGroupLabel = styled.span`
    font-size: 0.7rem;
    font-weight: 700;
    color: ${muted};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.4rem;
    display: block;
`;

export const TagGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 0.875rem;
`;

export const TagToggleButton = styled.button<{ $selected: boolean }>`
    padding: 0.375rem 0.9rem;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1.5px solid ${({ $selected }) => $selected ? primary : border};
    background: ${({ $selected }) => $selected ? primary : surface};
    color: ${({ $selected }) => $selected ? '#ffffff' : muted};

    &:hover {
        border-color: ${primary};
        color: ${({ $selected }) => $selected ? '#ffffff' : primary};
        background: ${({ $selected }) => $selected ? mid : '#f0fdf4'};
    }
`;

export const FieldError = styled.p`
    color: #dc2626;
    font-size: 0.78rem;
    font-weight: 500;
    margin: -0.75rem 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    &::before { content: '⚠'; font-size: 0.7rem; }
`;

export const SectionError = styled.p`
    color: #dc2626;
    font-size: 0.78rem;
    font-weight: 500;
    margin: 0.4rem 0 0;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    &::before { content: '⚠'; font-size: 0.7rem; }
`;

export const InputError = styled(Input)`
    border-color: #fca5a5;
    background: #fff5f5;

    &:focus {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220,38,38,0.1);
    }
`;

export const BackToListButton = styled.button`
    display: block;
    margin: 0 auto 2.5rem;
    background: transparent;
    color: ${muted};
    padding: 0.5rem 1.25rem;
    border: 1.5px solid ${border};
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;

    &:hover {
        border-color: ${primary};
        color: ${primary};
    }
`;
