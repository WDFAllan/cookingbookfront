import React from "react";
import StepInfoItem from "./StepInfoItem";
import {
    ListWrapper,
    ListTitle,
    StepsList,
} from '../../../styles/styleComponents/RecetteInfo.styles';

type StepListProps = {
    steps: string[];
};

const StepInfoList: React.FC<StepListProps> = ({ steps }) => {
    return (
        <ListWrapper>
            <ListTitle>Étapes ({steps.length})</ListTitle>
            <StepsList>
                {steps.map((step, index) => (
                    <StepInfoItem
                        key={index}
                        step={step}
                        number={index + 1}
                        isLast={index === steps.length - 1}
                    />
                ))}
            </StepsList>
        </ListWrapper>
    );
};

export default StepInfoList;
