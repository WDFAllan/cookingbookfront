import React, { useCallback, useEffect, useState } from "react";
import IngredientInput from "./ingredients/IngredientInput";
import ImageCropModal from "./ImageCropModal";
import IngredientList from "./ingredients/IngredientList";
import TagSelector from "./tags/TagSelector";
import StepInput from "./steps/StepInput";
import StepList from "./steps/StepList";

import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
    FormWrapper,
    Title,
    Label,
    Input,
    InputError,
    FieldError,
    SectionError,
    Button,
    Section,
    BackToListButton,
} from '../../styles/styleComponents/RecetteForm.styles';
import { useNavigate, useParams } from "react-router-dom";

type Ingredient = { name: string; quantity: number; unit: string; };
type Recette = { name: string; ingredients: Ingredient[]; steps: string[]; tags: string[]; imageUrl: string; prepTime: number | ""; servings: number | ""; };
type Toast = { open: boolean; message: string; severity: 'success' | 'error' | 'warning' };
type Errors = { name?: string; ingredients?: string; steps?: string; };

const emptyRecette: Recette = { name: "", ingredients: [], steps: [], tags: [], imageUrl: "", prepTime: "", servings: "" };

const RecetteForm: React.FC = () => {

    const apibaseurl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const [recette, setRecette] = useState<Recette>(emptyRecette);
    const [ingredientInput, setIngredientInput] = useState<Ingredient>({ name: "", quantity: 0, unit: "" });
    const [stepInput, setStepInput] = useState<string>("");
    const [toast, setToast] = useState<Toast>({ open: false, message: "", severity: "success" });
    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    const showToast = (message: string, severity: Toast['severity']) =>
        setToast({ open: true, message, severity });

    useEffect(() => {
        if (!id) return;
        axiosInstance.get(`${apibaseurl}/recette/${id}`)
            .then(res => {
                const { name, ingredients, steps, tags, imageUrl, prepTime, servings } = res.data;
                setRecette({ name, ingredients, steps, tags, imageUrl: imageUrl ?? "", prepTime: prepTime ?? "", servings: servings ?? "" });
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
            const res = await axiosInstance.post(`${apibaseurl}/upload`, formData, {
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
            setRecette(r => ({ ...r, ingredients: [...r.ingredients, ingredientInput] }));
            setIngredientInput({ name: '', quantity: 0, unit: '' });
            setErrors(e => ({ ...e, ingredients: undefined }));
        }
    };

    const handleIngredientRemove = (index: number) => {
        setRecette(r => ({ ...r, ingredients: r.ingredients.filter((_, i) => i !== index) }));
    };

    const handleStepAdd = () => {
        if (stepInput.trim()) {
            setRecette(r => ({ ...r, steps: [...r.steps, stepInput.trim()] }));
            setStepInput('');
            setErrors(e => ({ ...e, steps: undefined }));
        }
    };

    const handleStepRemove = (index: number) => {
        setRecette(r => ({ ...r, steps: r.steps.filter((_, i) => i !== index) }));
    };

    const validate = (): Errors => {
        const e: Errors = {};
        if (!recette.name.trim()) e.name = "Le nom de la recette est obligatoire.";
        if (recette.ingredients.length === 0) e.ingredients = "Ajoutez au moins un ingrédient.";
        if (recette.steps.length === 0) e.steps = "Ajoutez au moins une étape.";
        return e;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const e = validate();
        if (Object.keys(e).length > 0) {
            setErrors(e);
            return;
        }
        try {
            if (isEditMode) {
                await axiosInstance.put(`${apibaseurl}/recette/${id}`, recette);
                showToast("Recette modifiée avec succès !", "success");
            } else {
                await axiosInstance.post(`${apibaseurl}/recette`, recette);
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
        <div style={{ minHeight: '100%' }}>
            <FormWrapper onSubmit={handleSubmit}>
                <Title>{isEditMode ? "Modifier la recette" : "Nouvelle recette"}</Title>

                <Label htmlFor="name">Nom de la recette</Label>
                {errors.name
                    ? <InputError
                        type="text"
                        id="name"
                        value={recette.name}
                        onChange={(e) => { setRecette(r => ({ ...r, name: e.target.value })); setErrors(err => ({ ...err, name: undefined })); }}
                    />
                    : <Input
                        type="text"
                        id="name"
                        value={recette.name}
                        onChange={(e) => setRecette(r => ({ ...r, name: e.target.value }))}
                    />
                }
                {errors.name && <FieldError>{errors.name}</FieldError>}

                <Label htmlFor="prepTime">Temps de préparation (minutes)</Label>
                <Input
                    type="number"
                    id="prepTime"
                    value={recette.prepTime}
                    min={0}
                    onChange={(e) => setRecette(r => ({ ...r, prepTime: e.target.value === "" ? "" : parseInt(e.target.value) }))}
                />

                <Label htmlFor="servings">Nombre de portions</Label>
                <Input
                    type="number"
                    id="servings"
                    value={recette.servings}
                    min={1}
                    onChange={(e) => setRecette(r => ({ ...r, servings: e.target.value === "" ? "" : parseInt(e.target.value) }))}
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
                    {errors.ingredients && <SectionError>{errors.ingredients}</SectionError>}
                </Section>

                <Section>
                    <Label>Étapes</Label>
                    <StepInput stepInput={stepInput} onStepChange={setStepInput} onAddStep={handleStepAdd} />
                    <StepList steps={recette.steps} onRemoveStep={handleStepRemove} />
                    {errors.steps && <SectionError>{errors.steps}</SectionError>}
                </Section>

                <Section>
                    <Label>Tags</Label>
                    <TagSelector
                        tags={recette.tags}
                        onChange={(tags) => setRecette(r => ({ ...r, tags }))}
                    />
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
