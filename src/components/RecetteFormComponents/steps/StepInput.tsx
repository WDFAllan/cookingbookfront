import React from "react";
import{
    Button,
    Input
}from '../../../styles/styleComponents/RecetteForm.styles'

type StepInputProps = {
    stepInput: string;
    onStepChange: (value: string) => void;
    onAddStep: () => void;
};

const StepInput: React.FC<StepInputProps> = ({ stepInput, onStepChange, onAddStep }) => {
    return (
        <div>
            <Input
                type="text"
                placeholder="Étape"
                value={stepInput}
                onChange={(e) => onStepChange(e.target.value)}
            />
            <Button type="button" onClick={onAddStep}>
                Ajouter l'étape
            </Button>
        </div>
    );
};

export default StepInput;
