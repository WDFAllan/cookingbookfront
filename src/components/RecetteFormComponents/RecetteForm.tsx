import React, { useState } from "react";
import IngredientInput from "./IngredientInput";
import IngredientList from "./IngredientList";

type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
};

type Recette = {
    name: string;
    rate: number;
    ingredients: Ingredient[];
    steps: string[];
    tags: string[];
};

const RecetteForm: React.FC = () => {
    const [recette, setRecette] = useState<Recette>({
        name: "",
        rate: 0,
        ingredients: [],
        steps: [],
        tags: [],
    });

    const [ingredientInput, setIngredientInput] = useState<Ingredient>({
        name: "",
        quantity: 0,
        unit: "",
    });

    const handleInputChange = (field: keyof Recette, value: any) => {
        setRecette({ ...recette, [field]: value });
    };

    const handleIngredientInputChange = (
        field: keyof Ingredient,
        value: any
    ) => {
        setIngredientInput({ ...ingredientInput, [field]: value });
    };

    const handleAddIngredient = () => {
        if (ingredientInput.name && ingredientInput.quantity && ingredientInput.unit) {
            setRecette({
                ...recette,
                ingredients: [...recette.ingredients, ingredientInput],
            });
            setIngredientInput({ name: "", quantity: 0, unit: "" });
        } else {
            alert("Veuillez remplir tous les champs de l'ingrédient.");
        }
    };

    const handleRemoveIngredient = (index: number) => {
        const updatedIngredients = [...recette.ingredients];
        updatedIngredients.splice(index, 1);
        setRecette({ ...recette, ingredients: updatedIngredients });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Recette soumise :", recette);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter une Recette</h2>

            <div>
                <label>Nom de la recette :</label>
                <input
                    type="text"
                    value={recette.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                />
            </div>

            <div>
                <label>Note :</label>
                <input
                    type="number"
                    value={recette.rate}
                    onChange={(e) => handleInputChange("rate", parseFloat(e.target.value))}
                />
            </div>

            <IngredientInput
                ingredientInput={ingredientInput}
                onIngredientChange={handleIngredientInputChange}
                onAddIngredient={handleAddIngredient}
            />

            <IngredientList
                ingredients={recette.ingredients}
                onRemoveIngredient={handleRemoveIngredient}
            />

            <button type="submit">Soumettre</button>
        </form>
    );
};

export default RecetteForm;
