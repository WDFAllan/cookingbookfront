import React from "react";

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
            <h3>Ajouter un ingrédient</h3>
            <input
                type="text"
                placeholder="Nom"
                value={ingredientInput.name}
                onChange={(e) => onIngredientChange("name", e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantité"
                value={ingredientInput.quantity}
                onChange={(e) =>
                    onIngredientChange("quantity", parseFloat(e.target.value))
                }
            />
            <input
                type="text"
                placeholder="Unité"
                value={ingredientInput.unit}
                onChange={(e) => onIngredientChange("unit", e.target.value)}
            />
            <button type="button" onClick={onAddIngredient}>
                Ajouter l'ingrédient
            </button>
        </div>
    );
};

export default IngredientInput;
