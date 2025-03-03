import React from "react";
import{
    Button,
    Input
}from '../../../styles/styleComponents/RecetteForm.styles'


type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
};

type IngredientInputProps = {
    ingredientInput: Ingredient;
    onIngredientChange: (field: keyof Ingredient, value: any) => void;
    onAddIngredient: () => void;
};

const IngredientInput: React.FC<IngredientInputProps> = ({
                                                             ingredientInput,
                                                             onIngredientChange,
                                                             onAddIngredient,
                                                         }) => {
    return (
        <div>
            <Input
                type="text"
                placeholder="Nom"
                value={ingredientInput.name}
                onChange={(e) => onIngredientChange("name", e.target.value)}
            />
            <Input
                type="number"
                placeholder="Quantité"
                value={ingredientInput.quantity}
                onChange={(e) =>
                    onIngredientChange("quantity", parseFloat(e.target.value))
                }
            />
            <Input
                type="text"
                placeholder="Unité"
                value={ingredientInput.unit}
                onChange={(e) => onIngredientChange("unit", e.target.value)}
            />
            <Button type="button" onClick={onAddIngredient}>
                Ajouter l'ingrédient
            </Button>
        </div>
    );
};

export default IngredientInput;
