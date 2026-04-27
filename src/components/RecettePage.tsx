import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import RecetteInfo from './RecetteInfoComponents/RecetteInfo';

type Ingredient = { id: number; name: string; quantity: number; unit: string; };
type Recette = { id: number; name: string; rate: number; date: Date; ingredients: Ingredient[]; steps: string[]; tags: string[]; imageUrl?: string; prepTime?: number; servings?: number; };

const RecettePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const apibaseurl = process.env.REACT_APP_API_URL;

    const [recette, setRecette] = useState<Recette | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get(`${apibaseurl}/recette/${id}`)
            .then(res => { setRecette(res.data); setLoading(false); })
            .catch(err => { console.error('Erreur chargement recette :', err); setLoading(false); });
    }, [id]);

    const handleDelete = async () => {
        if (!recette) return;
        if (!window.confirm(`Supprimer « ${recette.name} » ?`)) return;
        try {
            await axiosInstance.delete(`${apibaseurl}/recette/${id}`);
            navigate('/listeRecette');
        } catch (err) {
            console.error('Erreur lors de la suppression :', err);
        }
    };

    if (loading) return <p style={{ padding: '2.5rem', color: '#52736a', fontSize: '0.95rem' }}>Chargement…</p>;
    if (!recette) return <p style={{ padding: '2.5rem', color: '#52736a', fontSize: '0.95rem' }}>Recette introuvable.</p>;

    return (
        <RecetteInfo
            recette={recette}
            onBack={() => navigate('/listeRecette')}
            onEdit={() => navigate(`/recetteForm/${id}`)}
            onDelete={handleDelete}
        />
    );
};

export default RecettePage;
