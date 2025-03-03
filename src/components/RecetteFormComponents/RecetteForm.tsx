import React, { useState } from "react";
import IngredientInput from "./ingredients/IngredientInput";
import IngredientList from "./ingredients/IngredientList";
import TagInput from "./tags/TagInput";
import TagList from "./tags/TagList";
import StepInput from "./steps/StepInput";
import StepList from "./steps/StepList";
import "../../styles/css/RecetteForm.css";

import axios from "axios";
import {
    FormWrapper,
    Title,
    Label,
    Input,
    Button,
    Section, BackToListButton

} from '../../styles/styleComponents/RecetteForm.styles'
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();

    const [tagInput, setTagInput] = useState<string>("");
    const [stepInput, setStepInput] = useState<string>("");

    const goToList = ()=> {
        navigate("/listeRecette");
    }

    // const handleInputChange = (field: keyof Recette, value: any) => {
    //     setRecette({ ...recette, [field]: value });
    // };

    const handleIngredientChange = (field: keyof typeof ingredientInput, value: any) => {
        setIngredientInput({ ...ingredientInput, [field]: value });
    };

    const handleIngredientAdd = () => {
        if (ingredientInput.name && ingredientInput.quantity > 0 && ingredientInput.unit) {
            setRecette({
                ...recette,
                ingredients: [...recette.ingredients, ingredientInput],
            });
            setIngredientInput({ name: '', quantity: 0, unit: '' });
        }
    };

    const handleIngredientRemove = (index: number) => {
        const updatedIngredients = recette.ingredients.filter((_, i) => i !== index);
        setRecette({ ...recette, ingredients: updatedIngredients });
    };

    const handleStepAdd = () => {
        if (stepInput.trim() !== '') {
            setRecette({ ...recette, steps: [...recette.steps, stepInput.trim()] });
            setStepInput('');
        }
    };

    const handleStepRemove = (index: number) => {
        const updatedSteps = recette.steps.filter((_, i) => i !== index);
        setRecette({ ...recette, steps: updatedSteps });
    };

    // Handlers for Tags
    const handleTagAdd = () => {
        if (tagInput.trim() !== '') {
            setRecette({ ...recette, tags: [...recette.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const handleTagRemove = (index: number) => {
        const updatedTags = recette.tags.filter((_, i) => i !== index);
        setRecette({ ...recette, tags: updatedTags });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if(recette.name!=""){
                const response = await axios.post("http://localhost:8080/api/v1/recette", recette);
                console.log("Recette envoyée avec succès : ", response.data);
                alert("Recette soumise avec succès !");
                setRecette({
                    name: "",
                    rate: 0,
                    ingredients: [],
                    steps: [],
                    tags: [],
                });
            }else{
                alert("pas de nom");
            }

        } catch (error) {
            console.error("Erreur lors de l'envoi de la recette : ", error);
            alert("Erreur lors de l'envoi de la recette, veuillez réessayer.");
        }

        console.log("Recette soumise :", recette);
    };

    return (
        <div className="forms">
            <FormWrapper onSubmit={handleSubmit}>
                <Title>Formulaire de Recette</Title>

                <Label htmlFor="name">Nom de la recette</Label>
                <Input
                    type="text"
                    id="name"
                    value={recette.name}
                    onChange={(e) => setRecette({ ...recette, name: e.target.value })}
                />

                <Label htmlFor="rate">Note</Label>
                <Input
                    type="number"
                    id="rate"
                    value={recette.rate}
                    onChange={(e) => setRecette({ ...recette, rate: parseInt(e.target.value) })}
                />

                {/* Ingredients Section */}
                <Section>
                    <Label>Ingrédients</Label>
                    <IngredientInput
                        ingredientInput={ingredientInput}
                        onIngredientChange={handleIngredientChange}
                        onAddIngredient={handleIngredientAdd}
                    />

                    <IngredientList
                        ingredients={recette.ingredients}
                        onRemoveIngredient={handleIngredientRemove}
                    />

                </Section>

                {/* Steps Section */}
                <Section>
                    <Label>Étapes</Label>
                    <StepInput stepInput={stepInput} onStepChange={setStepInput} onAddStep={handleStepAdd} />
                    <StepList steps={recette.steps} onRemoveStep={handleStepRemove} />
                </Section>

                {/* Tags Section */}
                <Section>
                    <Label>Tags</Label>
                    <TagInput tagInput={tagInput} onTagChange={setTagInput} onAddTag={handleTagAdd} />
                    <TagList tags={recette.tags} onRemoveTag={handleTagRemove} />
                </Section>

                <Button type="submit">Soumettre</Button>
            </FormWrapper>
            <BackToListButton onClick={goToList}>Retour à la liste</BackToListButton>
        </div>

    );
};

export default RecetteForm;
