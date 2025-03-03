import React from "react";
import{
    Button,
    Input
}from '../../../styles/styleComponents/RecetteForm.styles'


type TagInputProps = {
    tagInput: string;
    onTagChange: (value: string) => void;
    onAddTag: () => void;
};

const TagInput: React.FC<TagInputProps> = ({ tagInput, onTagChange, onAddTag }) => {
    return (
        <div>
            <Input
                type="text"
                placeholder="Tag"
                value={tagInput}
                onChange={(e) => onTagChange(e.target.value)}
            />
            <Button type="button" onClick={onAddTag}>
                Ajouter le tag
            </Button>
        </div>
    );
}
export default TagInput;
