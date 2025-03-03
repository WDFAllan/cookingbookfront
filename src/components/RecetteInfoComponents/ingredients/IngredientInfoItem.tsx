import React from "react";
import {
    ListItem
}from '../../../styles/styleComponents/RecetteInfo.styles'

type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
};

type IngredientItemProps = {
    ingredient: Ingredient;
};

const IngredientInfoItem: React.FC<IngredientItemProps> = ({ingredient}) => {
    return (
        <ListItem>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
        </ListItem>
    );
};
export default IngredientInfoItem;
