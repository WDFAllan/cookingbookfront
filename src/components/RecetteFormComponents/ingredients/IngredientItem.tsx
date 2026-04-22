import React from "react";
import { ItemRow, RemoveButton } from '../../../styles/styleComponents/RecetteForm.styles';

type Ingredient = { name: string; quantity: number; unit: string; };

type IngredientItemProps = {
    ingredient: Ingredient;
    onRemoveIngredient: () => void;
};

const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient, onRemoveIngredient }) => (
    <ItemRow>
        <span><strong>{ingredient.name}</strong> · {ingredient.quantity} {ingredient.unit}</span>
        <RemoveButton type="button" onClick={onRemoveIngredient} title="Supprimer">✕</RemoveButton>
    </ItemRow>
);

export default IngredientItem;
