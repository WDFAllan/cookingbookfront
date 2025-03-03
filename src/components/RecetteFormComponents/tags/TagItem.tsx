import React from "react";

type TagItemProps = {
    tag: string;
    onRemoveTag: () => void;
};

const TagItem: React.FC<TagItemProps> = ({ tag, onRemoveTag }) => {
    return (
        <li>
            {tag}
            <button
                type="button"
                onClick={onRemoveTag}
                style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginLeft: "10px",
                }}
            >
                ✖
            </button>
        </li>
    );
};

export default TagItem;
