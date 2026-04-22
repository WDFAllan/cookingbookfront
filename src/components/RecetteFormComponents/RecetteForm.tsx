import React, { useCallback, useEffect, useState } from "react";
import IngredientInput from "./ingredients/IngredientInput";
import ImageCropModal from "./ImageCropModal";
import IngredientList from "./ingredients/IngredientList";
import TagInput from "./tags/TagInput";
import TagList from "./tags/TagList";
import StepInput from "./steps/StepInput";
import StepList from "./steps/StepList";
import "../../styles/css/RecetteForm.css";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
    FormWrapper,
    Title,
    Label,
    Input,
    Button,
    Section,
    BackToListButton,
} from '../../styles/styleComponents/RecetteForm.styles';
import { useNavigate, useParams } from "react-router-dom";

type Ingredient = { name: string; quantity: number; unit: string; };
type Recette = { name: string; rate: number; ingredients: Ingredient[]; steps: string[]; tags: string[]; imageUrl: string; prepTime: number | ""; servings: number | ""; };
type Toast = { open: boolean; message: string; severity: 'success' | 'error' | 'warning' };

const emptyRecette: Recette = { name: "", rate: 0, ingredients: [], steps: [], tags: [], imageUrl: "", prepTime: "", servings: "" };

const RecetteForm: React.FC = () => {

    const apibaseurl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const [recette, setRecette] = useState<Recette>(emptyRecette);
    const [ingredientInput, setIngredientInput] = useState<Ingredient>({ name: "", quantity: 0, unit: "" });
    const [tagInput, setTagInput] = useState<string>("");
    const [stepInput, setStepInput] = useState<string>("");
    const [toast, setToast] = useState<Toast>({ open: false, message: "", severity: "success" });
    const [cropSrc, setCropSrc] = useState<string | null>(null);

    const showToast = (message: string, severity: Toast['severity']) =>
        setToast({ open: true, message, severity });

    useEffect(() => {
        if (!id) return;
        axios.get(`${apibaseurl}/recette/${id}`)
            .then(res => {
                const { name, rate, ingredients, steps, tags, imageUrl, prepTime, servings } = res.data;
                setRecette({ name, rate, ingredients, steps, tags, imageUrl: imageUrl ?? "", prepTime: prepTime ?? "", servings: servings ?? "" });
            })
            .catch(() => showToast("Impossible de charger la recette.", "error"));
    }, [id]);

    const goToList = () => navigate("/listeRecette");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setCropSrc(objectUrl);
        e.target.value = "";
    };

    const handleCropConfirm = useCallback(async (blob: Blob) => {
        setCropSrc(null);
        const formData = new FormData();
        formData.append("file", blob, "recette.jpg");
        try {
            const res = await axios.post(`${apibaseurl}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const baseUrl = apibaseurl?.replace('/api/v1', '') ?? '';
            setRecette(r => ({ ...r, imageUrl: baseUrl + res.data.url }));
        } catch {
            showToast("Erreur lors de l'upload de l'image.", "error");
        }
    }, [apibaseurl]);

    const handleIngredientChange = (field: keyof typeof ingredientInput, value: any) => {
        setIngredientInput({ ...ingredientInput, [field]: value });
    };

    const handleIngredientAdd = () => {
        if (ingredientInput.name && ingredientInput.quantity > 0 && ingredientInput.unit) {
            setRecette({ ...recette, ingredients: [...recette.ingredients, ingredientInput] });
            setIngredientInput({ name: '', quantity: 0, unit: '' });
        }
    };

    const handleIngredientRemove = (index: number) => {
        setRecette({ ...recette, ingredients: recette.ingredients.filter((_, i) => i !== index) });
    };

    const handleStepAdd = () => {
        if (stepInput.trim()) {
            setRecette({ ...recette, steps: [...recette.steps, stepInput.trim()] });
            setStepInput('');
        }
    };

    const handleStepRemove = (index: number) => {
        setRecette({ ...recette, steps: recette.steps.filter((_, i) => i !== index) });
    };

    const handleTagAdd = () => {
        if (tagInput.trim()) {
            setRecette({ ...recette, tags: [...recette.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const handleTagRemove = (index: number) => {
        setRecette({ ...recette, tags: recette.tags.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!recette.name.trim()) {
            showToast("Le nom de la recette est obligatoire.", "warning");
            return;
        }
        try {
            if (isEditMode) {
                await axios.put(`${apibaseurl}/recette/${id}`, recette);
                showToast("Recette modifiée avec succès !", "success");
            } else {
                await axios.post(`${apibaseurl}/recette`, recette);
                showToast("Recette créée avec succès !", "success");
                setRecette(emptyRecette);
            }
            setTimeout(() => navigate("/listeRecette"), 1200);
        } catch (error) {
            const detail = axios.isAxiosError(error)
                ? error.response?.data?.detail
                : null;
            showToast(detail ?? "Erreur lors de l'envoi de la recette.", "error");
        }
    };

    return (
        <div className="forms">
            <FormWrapper onSubmit={handleSubmit}>
                <Title>{isEditMode ? "Modifier la recette" : "Nouvelle recette"}</Title>

                <Label htmlFor="name">Nom de la recette</Label>
                <Input
                    type="text"
                    id="name"
                    value={recette.name}
                    onChange={(e) => setRecette({ ...recette, name: e.target.value })}
                />

                <Label htmlFor="rate">Note (0 – 5)</Label>
                <Input
                    type="number"
                    id="rate"
                    value={recette.rate}
                    min={0}
                    max={5}
                    step={0.5}
                    onChange={(e) => setRecette({ ...recette, rate: parseFloat(e.target.value) })}
                />

                <Label htmlFor="prepTime">Temps de préparation (minutes)</Label>
                <Input
                    type="number"
                    id="prepTime"
                    value={recette.prepTime}
                    min={0}
                    onChange={(e) => setRecette({ ...recette, prepTime: e.target.value === "" ? "" : parseInt(e.target.value) })}
                />

                <Label htmlFor="servings">Nombre de portions</Label>
                <Input
                    type="number"
                    id="servings"
                    value={recette.servings}
                    min={1}
                    onChange={(e) => setRecette({ ...recette, servings: e.target.value === "" ? "" : parseInt(e.target.value) })}
                />

                <Label htmlFor="imageFile">Photo de la recette</Label>
                <Input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ padding: '0.4rem' }}
                />
                {recette.imageUrl && (
                    <img
                        src={recette.imageUrl}
                        alt="Aperçu"
                        style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8, marginTop: '0.5rem', marginBottom: '0.5rem' }}
                    />
                )}

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

                <Section>
                    <Label>Étapes</Label>
                    <StepInput stepInput={stepInput} onStepChange={setStepInput} onAddStep={handleStepAdd} />
                    <StepList steps={recette.steps} onRemoveStep={handleStepRemove} />
                </Section>

                <Section>
                    <Label>Tags</Label>
                    <TagInput tagInput={tagInput} onTagChange={setTagInput} onAddTag={handleTagAdd} />
                    <TagList tags={recette.tags} onRemoveTag={handleTagRemove} />
                </Section>

                <Button type="submit">{isEditMode ? "Enregistrer les modifications" : "Soumettre"}</Button>
            </FormWrapper>
            <BackToListButton onClick={goToList}>Retour à la liste</BackToListButton>

            {cropSrc && (
                <ImageCropModal
                    imageSrc={cropSrc}
                    onCancel={() => setCropSrc(null)}
                    onConfirm={handleCropConfirm}
                />
            )}

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast(t => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity={toast.severity}
                    onClose={() => setToast(t => ({ ...t, open: false }))}
                    variant="filled"
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default RecetteForm;
