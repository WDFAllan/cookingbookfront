import React from "react";
import IngredientInfoItem from "./IngredientInfoItem";
import {
    ListWrapper,
    ListTitle,
    IngredientList
}from '../../../styles/styleComponents/RecetteInfo.styles'


type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
};

type IngredientListProps = {
    ingredients: Ingredient[];
};

const IngredientInfoList: React.FC<IngredientListProps> = ({ingredients}) => {
    return (
        <ListWrapper>
            <ListTitle>Ingrédients</ListTitle>
            <IngredientList>
                {ingredients.map((ingredient, index) => (
                    <IngredientInfoItem
                        key={index}
                        ingredient={ingredient}
                    />
                ))}
            </IngredientList>
        </ListWrapper>
    );
};export default IngredientInfoList

