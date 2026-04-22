import React from "react";
import TagItem from "./TagItem";
import { TagPillList } from '../../../styles/styleComponents/RecetteForm.styles';

type TagListProps = {
    tags: string[];
    onRemoveTag: (index: number) => void;
};

const TagList: React.FC<TagListProps> = ({ tags, onRemoveTag }) => (
    <TagPillList>
        {tags.map((tag, index) => (
            <TagItem key={index} tag={tag} onRemoveTag={() => onRemoveTag(index)} />
        ))}
    </TagPillList>
);

export default TagList;
