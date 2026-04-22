import React from "react";
import { Input, InputRow, SmallInput, AddButton } from '../../../styles/styleComponents/RecetteForm.styles';

type Ingredient = { name: string; quantity: number; unit: string; };

type IngredientInputProps = {
    ingredientInput: Ingredient;
    onIngredientChange: (field: keyof Ingredient, value: any) => void;
    onAddIngredient: () => void;
};

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredientInput, onIngredientChange, onAddIngredient }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') { e.preventDefault(); onAddIngredient(); }
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Nom de l'ingrédient"
                value={ingredientInput.name}
                onChange={(e) => onIngredientChange("name", e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <InputRow>
                <SmallInput
                    type="number"
                    placeholder="Quantité"
                    value={ingredientInput.quantity || ''}
                    min={0}
                    style={{ width: '110px' }}
                    onChange={(e) => onIngredientChange("quantity", parseFloat(e.target.value))}
                    onKeyDown={handleKeyDown}
                />
                <SmallInput
                    type="text"
                    placeholder="Unité (g, ml, …)"
                    value={ingredientInput.unit}
                    style={{ flex: 1 }}
                    onChange={(e) => onIngredientChange("unit", e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <AddButton type="button" onClick={onAddIngredient}>+ Ajouter</AddButton>
            </InputRow>
        </div>
    );
};

export default IngredientInput;
