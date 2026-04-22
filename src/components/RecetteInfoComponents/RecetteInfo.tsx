import React from "react";
import IngredientInfoList from "./ingredients/IngredientInfoList";
import StepInfoList from "./steps/StepInfoList";
import {
    RecetteDetailsWrapper,
    BackButton,
    RecetteTitle,
    RecetteDetails,
    TagList,
    Tag,
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

function RecetteInfo({ recette, onBack, onEdit, onDelete }: RecetteProps) {
    return (
        <RecetteDetailsWrapper>
            <BackButton onClick={onBack}>Retour</BackButton>
            <RecetteTitle>{recette.name}</RecetteTitle>
            <RecetteDetails>⭐ {recette.rate}/5</RecetteDetails>
            <RecetteDetails>Date : {new Date(recette.date).toLocaleDateString()}</RecetteDetails>

            <IngredientInfoList ingredients={recette.ingredients} />
            <StepInfoList steps={recette.steps} />

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