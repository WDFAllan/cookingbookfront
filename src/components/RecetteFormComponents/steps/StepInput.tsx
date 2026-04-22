import React from "react";
import { InputRow, SmallInput, AddButton } from '../../../styles/styleComponents/RecetteForm.styles';

type StepInputProps = {
    stepInput: string;
    onStepChange: (value: string) => void;
    onAddStep: () => void;
};

const StepInput: React.FC<StepInputProps> = ({ stepInput, onStepChange, onAddStep }) => (
    <InputRow>
        <SmallInput
            type="text"
            placeholder="Décrivez l'étape…"
            value={stepInput}
            style={{ flex: 1 }}
            onChange={(e) => onStepChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAddStep(); } }}
        />
        <AddButton type="button" onClick={onAddStep}>+ Ajouter</AddButton>
    </InputRow>
);

export default StepInput;
