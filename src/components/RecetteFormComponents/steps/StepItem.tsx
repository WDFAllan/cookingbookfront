import React from "react";

type StepItemProps = {
    step: string;
    onRemoveStep: () => void;
};

const StepItem: React.FC<StepItemProps> = ({ step, onRemoveStep }) => {
    return (
        <li>
            {step}
            <button
                type="button"
                onClick={onRemoveStep}
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

export default StepItem;
