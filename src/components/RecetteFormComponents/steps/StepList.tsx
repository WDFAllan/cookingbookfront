import React from "react";
import StepItem from "./StepItem";

type StepListProps = {
  steps: string[];
  onRemoveStep: (index: number) => void;
};

const StepList: React.FC<StepListProps> = ({ steps, onRemoveStep }) => {
  return (
    <div>
      <h3>Liste des Étapes ajoutées</h3>
      <ul>
        {steps.map((step, index) => (
          <StepItem
            key={index}
            step={step}
            onRemoveStep={() => onRemoveStep(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default StepList;
