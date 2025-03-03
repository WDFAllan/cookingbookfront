import React from "react";
import {
    ListItem
}from '../../../styles/styleComponents/RecetteInfo.styles'

type StepItemProps = {
    step: string;
};

const StepInfoItem: React.FC<StepItemProps> = ({step}) => {
    return (
        <ListItem>
            {step}
        </ListItem>
    );
};

export default StepInfoItem;
