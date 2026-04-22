import React from "react";
import {
    StepRow,
    StepNumberCol,
    StepCircle,
    StepConnector,
    StepText,
} from '../../../styles/styleComponents/RecetteInfo.styles';

type StepItemProps = {
    step: string;
    number: number;
    isLast: boolean;
};

const StepInfoItem: React.FC<StepItemProps> = ({ step, number, isLast }) => {
    return (
        <StepRow>
            <StepNumberCol>
                <StepCircle>{number}</StepCircle>
                {!isLast && <StepConnector />}
            </StepNumberCol>
            <StepText>{step}</StepText>
        </StepRow>
    );
};

export default StepInfoItem;
