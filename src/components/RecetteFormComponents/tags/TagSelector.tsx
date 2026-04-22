import React from "react";
import { TagGroup, TagGroupLabel, TagToggleButton } from '../../../styles/styleComponents/RecetteForm.styles';

const PRICE_TAGS = ['pas cher', 'prix moyen', 'cher'] as const;
const DIFFICULTY_TAGS = ['facile', 'moyen', 'difficile'] as const;

type TagSelectorProps = {
    tags: string[];
    onChange: (tags: string[]) => void;
};

const TagSelector: React.FC<TagSelectorProps> = ({ tags, onChange }) => {
    const toggle = (tag: string, group: readonly string[]) => {
        const withoutGroup = tags.filter(t => !group.includes(t as any));
        if (tags.includes(tag)) {
            onChange(withoutGroup);
        } else {
            onChange([...withoutGroup, tag]);
        }
    };

    return (
        <div>
            <TagGroupLabel>Prix</TagGroupLabel>
            <TagGroup>
                {PRICE_TAGS.map(tag => (
                    <TagToggleButton
                        key={tag}
                        type="button"
                        $selected={tags.includes(tag)}
                        onClick={() => toggle(tag, PRICE_TAGS)}
                    >
                        {tag}
                    </TagToggleButton>
                ))}
            </TagGroup>

            <TagGroupLabel>Difficulté</TagGroupLabel>
            <TagGroup>
                {DIFFICULTY_TAGS.map(tag => (
                    <TagToggleButton
                        key={tag}
                        type="button"
                        $selected={tags.includes(tag)}
                        onClick={() => toggle(tag, DIFFICULTY_TAGS)}
                    >
                        {tag}
                    </TagToggleButton>
                ))}
            </TagGroup>
        </div>
    );
};

export default TagSelector;
