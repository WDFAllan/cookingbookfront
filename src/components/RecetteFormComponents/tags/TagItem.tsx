import React from "react";
import { TagPill, TagPillRemove } from '../../../styles/styleComponents/RecetteForm.styles';

type TagItemProps = {
    tag: string;
    onRemoveTag: () => void;
};

const TagItem: React.FC<TagItemProps> = ({ tag, onRemoveTag }) => (
    <TagPill>
        {tag}
        <TagPillRemove type="button" onClick={onRemoveTag} title="Supprimer">✕</TagPillRemove>
    </TagPill>
);

export default TagItem;
