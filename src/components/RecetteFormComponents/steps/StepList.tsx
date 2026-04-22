import React from "react";
import StepItem from "./StepItem";
import { ItemsList } from '../../../styles/styleComponents/RecetteForm.styles';

type StepListProps = {
    steps: string[];
    onRemoveStep: (index: number) => void;
};

const StepList: React.FC<StepListProps> = ({ steps, onRemoveStep }) => (
    <ItemsList>
        {steps.map((step, index) => (
            <StepItem
                key={index}
                step={step}
                index={index}
                onRemoveStep={() => onRemoveStep(index)}
            />
        ))}
    </ItemsList>
);

export default StepList;
