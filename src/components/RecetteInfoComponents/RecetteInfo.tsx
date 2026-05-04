import React, { useState } from "react";
import StarRating from "../StarRating";
import IngredientInfoList from "./ingredients/IngredientInfoList";
import StepInfoList from "./steps/StepInfoList";
import { useAuth } from "../../context/AuthContext";
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
    RatingSection,
    RatingLabel,
    StarButton,
    RatingFeedback,
} from '../../styles/styleComponents/RecetteInfo.styles'

type Recette = {
    id: number;
    userId?: number;
    authorEmail?: string;
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

type RatingInfo = { averageRate: number; ratingCount: number; userRating: number | null };

type RecetteProps = {
    recette: Recette;
    onBack: () => void;
    onEdit: () => void;
    onDelete: () => void;
    ratingInfo?: RatingInfo | null;
    onRate?: (rating: number) => void;
}


const formatQuantity = (q: number): string => {
    const rounded = Math.round(q * 10) / 10;
    return rounded % 1 === 0 ? String(Math.round(rounded)) : rounded.toFixed(1);
};

function RecetteInfo({ recette, onBack, onEdit, onDelete, ratingInfo, onRate }: RecetteProps) {
    const { user } = useAuth();
    const isOwner = user !== null && recette.userId !== undefined && user.id === recette.userId;
    const canRate = user !== null && !isOwner;

    const baseServings = recette.servings ?? null;
    const [currentServings, setCurrentServings] = useState<number>(baseServings ?? 1);
    const [hoverStar, setHoverStar] = useState<number>(0);

    const scaledIngredients = recette.ingredients.map(ing => ({
        ...ing,
        quantity: baseServings
            ? parseFloat(formatQuantity((ing.quantity * currentServings) / baseServings))
            : ing.quantity,
    }));

    const avgRate = ratingInfo?.averageRate ?? recette.rate;
    const ratingCount = ratingInfo?.ratingCount ?? 0;
    const userRating = ratingInfo?.userRating ?? null;

    return (
        <RecetteDetailsWrapper>
            <BackButton onClick={onBack}>Retour</BackButton>
            {recette.imageUrl && (
                <RecetteHeroImage src={recette.imageUrl} alt={recette.name} />
            )}
            <RecetteTitle>{recette.name}</RecetteTitle>
            <MetaBar>
                <MetaChip>
                    <StarRating rate={avgRate} />
                    {ratingCount > 0 && <span style={{ marginLeft: '0.25rem', color: '#52736a' }}>{avgRate.toFixed(1)} ({ratingCount})</span>}
                </MetaChip>
                {recette.prepTime && <MetaChip>⏱ {recette.prepTime} min</MetaChip>}
                <MetaChip>📅 {new Date(recette.date).toLocaleDateString()}</MetaChip>
                {recette.authorEmail && <MetaChip>👤 {recette.authorEmail}</MetaChip>}
            </MetaBar>

            {canRate && (
                <RatingSection>
                    <RatingLabel>{userRating ? 'Votre note :' : 'Noter cette recette :'}</RatingLabel>
                    {[1, 2, 3, 4, 5].map(star => (
                        <StarButton
                            key={star}
                            type="button"
                            $active={star <= (userRating ?? 0)}
                            $hover={star <= hoverStar}
                            onMouseEnter={() => setHoverStar(star)}
                            onMouseLeave={() => setHoverStar(0)}
                            onClick={() => onRate?.(star)}
                            aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                        >★</StarButton>
                    ))}
                    {userRating && <RatingFeedback>Vous avez noté {userRating}/5</RatingFeedback>}
                </RatingSection>
            )}

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

            {isOwner && (
                <ActionButtons>
                    <EditButton onClick={onEdit}>Modifier</EditButton>
                    <DeleteButton onClick={onDelete}>Supprimer</DeleteButton>
                </ActionButtons>
            )}
        </RecetteDetailsWrapper>
    );
}

export default RecetteInfo;