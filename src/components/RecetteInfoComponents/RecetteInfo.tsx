import React from "react";
import IngredientInfoList from "./ingredients/IngredientInfoList";
import StepInfoList from "./steps/StepInfoList";
import {
    RecetteDetailsWrapper,
    BackButton,
    RecetteTitle,
    RecetteDetails,
    TagList,
    Tag

}from '../../styles/styleComponents/RecetteInfo.styles'

type Recette = {
    id: number;
    name: string;
    rate: number;
    date: Date;
    ingredients:Ingredient[];
    steps: string[];
    tags: string[];

}

type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

type RecetteProps={
    recette: Recette;
    onBack:() => void;
}


function RecetteInfo(recetteProps: RecetteProps) {

    const recetteProp = recetteProps.recette;
    return (
        <RecetteDetailsWrapper>
            <BackButton onClick={recetteProps.onBack}>Retour</BackButton>
            <RecetteTitle>{recetteProp.name}</RecetteTitle>
            <RecetteDetails>⭐ {recetteProp.rate}/5</RecetteDetails>
            <RecetteDetails>Date : {new Date(recetteProp.date).toLocaleDateString()}</RecetteDetails>

            <IngredientInfoList ingredients={recetteProp.ingredients} />
            <StepInfoList steps={recetteProp.steps} />

            <TagList>
                {recetteProp.tags.map((tag: string, idx: number) => (
                    <Tag key={idx}>{tag}</Tag>
                ))}
            </TagList>
        </RecetteDetailsWrapper>
    );


}export default  RecetteInfo