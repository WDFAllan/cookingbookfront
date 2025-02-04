import React from "react";

type TagInputProps = {
    tagInput: string;
    onTagChange: (value: string) => void;
    onAddTag: () => void;
};

const TagInput: React.FC<TagInputProps> = ({ tagInput, onTagChange, onAddTag }) => {
    return (
        <div>
            <h3>Ajouter un Tag</h3>
            <input
                type="text"
                placeholder="Tag"
                value={tagInput}
                onChange={(e) => onTagChange(e.target.value)}
            />
            <button type="button" onClick={onAddTag}>
                Ajouter le tag
            </button>
        </div>
    );
}
export default TagInput;
