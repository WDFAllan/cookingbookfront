import React, { useState } from "react";
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

const StarRating: React.FC<{ rate: number }> = ({ rate }) => (
    <span style={{ display: 'inline-flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map(star => {
            const filled = rate >= star;
            const half = !filled && rate >= star - 0.5;
            return (
                <span key={star} style={{ position: 'relative', display: 'inline-block', fontSize: '1rem', lineHeight: 1 }}>
                    <span style={{ color: '#D1D5DB' }}>★</span>
                    {(filled || half) && (
                        <span style={{
                            position: 'absolute', left: 0, top: 0,
                            overflow: 'hidden',
                            width: filled ? '100%' : '50%',
                            color: '#F59E0B',
                        }}>★</span>
                    )}
                </span>
            );
        })}
    </span>
);

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