import React from "react";
import { InputRow, SmallInput, AddButton } from '../../../styles/styleComponents/RecetteForm.styles';

type TagInputProps = {
    tagInput: string;
    onTagChange: (value: string) => void;
    onAddTag: () => void;
};

const TagInput: React.FC<TagInputProps> = ({ tagInput, onTagChange, onAddTag }) => (
    <InputRow>
        <SmallInput
            type="text"
            placeholder="ex: végétarien, rapide…"
            value={tagInput}
            style={{ flex: 1 }}
            onChange={(e) => onTagChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAddTag(); } }}
        />
        <AddButton type="button" onClick={onAddTag}>+ Ajouter</AddButton>
    </InputRow>
);

export default TagInput;
