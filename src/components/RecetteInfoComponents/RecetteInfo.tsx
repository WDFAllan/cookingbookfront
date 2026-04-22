import React, { useState } from "react";
import StarRating from "../StarRating";
import IngredientInfoList from "./ingredients/IngredientInfoList";
import StepInfoList from "./steps/StepInfoList";
import {
    RecetteDetailsWrapper,
    RecetteHeroImage,
    BackButton,
    RecetteTitle,
    MetaBar,
    MetaChip,
    TagList,
    Tag,
    TwoColumnLayout,
    ServingsControl,
    ServingsLabel,
    ServingsButton,
    ServingsCount,
    ActionButtons,
    EditButton,
    DeleteButton,
} from '../../styles/styleComponents/RecetteInfo.styles'

type Recette = {
    id: number;
    name: string;
    rate: number;
    date: Date;
    ingredients: Ingredient[];
    steps: string[];
    tags: string[];
    imageUrl?: string;
    prepTime?: number;
    servings?: number;
}

type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

type RecetteProps = {
    recette: Recette;
    onBack: () => void;
    onEdit: () => void;
    onDelete: () => void;
}


const formatQuantity = (q: number): string => {
    const rounded = Math.round(q * 10) / 10;
    return rounded % 1 === 0 ? String(Math.round(rounded)) : rounded.toFixed(1);
};

function RecetteInfo({ recette, onBack, onEdit, onDelete }: RecetteProps) {
    const baseServings = recette.servings ?? null;
    const [currentServings, setCurrentServings] = useState<number>(baseServings ?? 1);

    const scaledIngredients = recette.ingredients.map(ing => ({
        ...ing,
        quantity: baseServings
            ? parseFloat(formatQuantity((ing.quantity * currentServings) / baseServings))
            : ing.quantity,
    }));

    return (
        <RecetteDetailsWrapper>
            <BackButton onClick={onBack}>Retour</BackButton>
            {recette.imageUrl && (
                <RecetteHeroImage src={recette.imageUrl} alt={recette.name} />
            )}
            <RecetteTitle>{recette.name}</RecetteTitle>
            <MetaBar>
                <MetaChip><StarRating rate={recette.rate} /></MetaChip>
                {recette.prepTime && <MetaChip>⏱ {recette.prepTime} min</MetaChip>}
                <MetaChip>📅 {new Date(recette.date).toLocaleDateString()}</MetaChip>
            </MetaBar>

            {baseServings && (
                <ServingsControl>
                    <ServingsLabel>Portions :</ServingsLabel>
                    <ServingsButton
                        onClick={() => setCurrentServings(s => Math.max(1, s - 1))}
                        disabled={currentServings <= 1}
                    >−</ServingsButton>
                    <ServingsCount>{currentServings}</ServingsCount>
                    <ServingsButton onClick={() => setCurrentServings(s => s + 1)}>+</ServingsButton>
                </ServingsControl>
            )}

            <TwoColumnLayout>
                <IngredientInfoList ingredients={scaledIngredients} />
                <StepInfoList steps={recette.steps} />
            </TwoColumnLayout>

            <TagList>
                {recette.tags.map((tag: string, idx: number) => (
                    <Tag key={idx}>{tag}</Tag>
                ))}
            </TagList>

            <ActionButtons>
                <EditButton onClick={onEdit}>Modifier</EditButton>
                <DeleteButton onClick={onDelete}>Supprimer</DeleteButton>
            </ActionButtons>
        </RecetteDetailsWrapper>
    );
}

export default RecetteInfo;