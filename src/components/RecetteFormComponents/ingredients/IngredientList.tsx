import React from "react";
import IngredientItem from "./IngredientItem";

type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
};

type IngredientListProps = {
    ingredients: Ingredient[];
    onRemoveIngredient: (index: number) => void;
};

const IngredientList: React.FC<IngredientListProps> = ({
                                                           ingredients,
                                                           onRemoveIngredient,
                                                       }) => {
    return (
        <div>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <IngredientItem
                        key={index}
                        ingredient={ingredient}
                        onRemoveIngredient={() => onRemoveIngredient(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default IngredientList;
