import React from "react";
import StepInfoItem from "./StepInfoItem";
import {
    ListWrapper,
    ListTitle,
    StepsList
}from '../../../styles/styleComponents/RecetteInfo.styles'
type StepListProps = {
    steps: string[];
};

const StepInfoList: React.FC<StepListProps> = ({ steps }) => {
    return (
        <ListWrapper>
            <ListTitle>Étapes</ListTitle>
            <StepsList>
                {steps.map((step, index) => (
                    <StepInfoItem
                        key={index}
                        step={step}
                    />
                ))}
            </StepsList>
        </ListWrapper>
    );
};

export default StepInfoList;
