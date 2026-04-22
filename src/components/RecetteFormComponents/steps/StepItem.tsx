import React from "react";
import { ItemRow, StepNumber, RemoveButton } from '../../../styles/styleComponents/RecetteForm.styles';

type StepItemProps = {
    step: string;
    index: number;
    onRemoveStep: () => void;
};

const StepItem: React.FC<StepItemProps> = ({ step, index, onRemoveStep }) => (
    <ItemRow>
        <span style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <StepNumber>{index + 1}</StepNumber>
            {step}
        </span>
        <RemoveButton type="button" onClick={onRemoveStep} title="Supprimer">✕</RemoveButton>
    </ItemRow>
);

export default StepItem;
