import React from "react";
import IngredientItem from "./IngredientItem";
import { ItemsList } from '../../../styles/styleComponents/RecetteForm.styles';

type Ingredient = { name: string; quantity: number; unit: string; };

type IngredientListProps = {
    ingredients: Ingredient[];
    onRemoveIngredient: (index: number) => void;
};

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onRemoveIngredient }) => (
    <ItemsList>
        {ingredients.map((ingredient, index) => (
            <IngredientItem
                key={index}
                ingredient={ingredient}
                onRemoveIngredient={() => onRemoveIngredient(index)}
            />
        ))}
    </ItemsList>
);

export default IngredientList;
