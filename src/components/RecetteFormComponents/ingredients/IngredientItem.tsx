import React from "react";

type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
};

type IngredientItemProps = {
    ingredient: Ingredient;
    onRemoveIngredient: () => void;
};

const IngredientItem: React.FC<IngredientItemProps> = ({
                                                           ingredient,
                                                           onRemoveIngredient,
                                                       }) => {
    return (
        <li>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
            <button
                type="button"
                onClick={onRemoveIngredient}
                style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginLeft: "10px",
                }}
            >
                ✖
            </button>
        </li>
    );
};

export default IngredientItem;
