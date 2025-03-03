import React from "react";
import TagItem from "./TagItem";

type TagListProps = {
    tags: string[];
    onRemoveTag: (index: number) => void;
};

const TagList: React.FC<TagListProps> = ({ tags, onRemoveTag }) => {
    return (
        <div>
            <ul>
                {tags.map((tag, index) => (
                    <TagItem
                        key={index}
                        tag={tag}
                        onRemoveTag={() => onRemoveTag(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TagList;
