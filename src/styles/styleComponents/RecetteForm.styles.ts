import styled from 'styled-components';

const primary = '#2D6A4F';
const primaryDark = '#1B4332';
const primaryLight = '#40916C';
const bgPage = '#F6FAF7';
const border = '#E2EBE4';

export const FormWrapper = styled.form`
    max-width: 640px;
    margin: 2.5rem auto;
    padding: 2.5rem;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

    @media (max-width: 700px) {
        margin: 1rem;
        padding: 1.5rem;
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${primaryDark};
    margin: 0 0 2rem;
    letter-spacing: -0.02em;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.65rem 0.875rem;
    font-size: 1rem;
    border: 1.5px solid ${border};
    border-radius: 8px;
    margin-bottom: 1.25rem;
    box-sizing: border-box;
    color: #111827;
    background: ${bgPage};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: ${primaryLight};
        outline: none;
        box-shadow: 0 0 0 3px rgba(64, 145, 108, 0.15);
        background: #ffffff;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    background: linear-gradient(135deg, ${primary} 0%, ${primaryLight} 100%);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.1s ease;
    margin-top: 0.5rem;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: scale(0.99);
    }
`;

export const Section = styled.div`
    margin-bottom: 1.5rem;
    padding: 1.25rem;
    background: ${bgPage};
    border-radius: 10px;
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
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
    border: 1.5px solid ${border};
    border-radius: 8px;
    color: #111827;
    background: ${bgPage};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    min-width: 0;

    &:focus {
        border-color: ${primaryLight};
        outline: none;
        box-shadow: 0 0 0 3px rgba(64, 145, 108, 0.15);
        background: #ffffff;
    }
`;

export const AddButton = styled.button`
    padding: 0.6rem 1rem;
    background: ${primary};
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.2s ease;

    &:hover {
        background: ${primaryDark};
    }
`;

export const ItemsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

export const ItemRow = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.55rem 0.75rem;
    background: #ffffff;
    border: 1px solid ${border};
    border-radius: 8px;
    font-size: 0.875rem;
    color: #374151;
    list-style: none;
`;

export const StepNumber = styled.span`
    min-width: 22px;
    height: 22px;
    background: ${primary};
    color: #ffffff;
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.6rem;
    flex-shrink: 0;
`;

export const RemoveButton = styled.button`
    background: transparent;
    color: #9CA3AF;
    border: none;
    padding: 0.2rem 0.35rem;
    cursor: pointer;
    font-size: 0.875rem;
    border-radius: 4px;
    transition: color 0.15s ease, background 0.15s ease;
    flex-shrink: 0;
    margin-left: 0.5rem;
    line-height: 1;

    &:hover {
        color: #dc2626;
        background: #fee2e2;
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
    background: #d8f3dc;
    color: #1b4332;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    list-style: none;
`;

export const TagPillRemove = styled.button`
    background: transparent;
    border: none;
    color: #2d6a4f;
    cursor: pointer;
    padding: 0;
    font-size: 0.75rem;
    line-height: 1;
    opacity: 0.6;
    transition: opacity 0.15s;

    &:hover {
        opacity: 1;
    }
`;

export const TagGroupLabel = styled.span`
    font-size: 0.75rem;
    font-weight: 700;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.4rem;
    display: block;
`;

export const TagGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
`;

export const TagToggleButton = styled.button<{ $selected: boolean }>`
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1.5px solid #2D6A4F;
    background: ${({ $selected }) => $selected ? '#2D6A4F' : 'transparent'};
    color: ${({ $selected }) => $selected ? '#ffffff' : '#2D6A4F'};

    &:hover {
        background: ${({ $selected }) => $selected ? '#1B4332' : '#d8f3dc'};
        border-color: #1B4332;
    }
`;

export const BackToListButton = styled.button`
    display: block;
    margin: 0 auto 2.5rem;
    background: transparent;
    color: ${primary};
    padding: 0.5rem 1.25rem;
    border: 1.5px solid ${primary};
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: ${primary};
        color: #ffffff;
    }
`;
