import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import RecetteInfo from './RecetteInfoComponents/RecetteInfo';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Ingredient = { id: number; name: string; quantity: number; unit: string; };
type Recette = { id: number; name: string; rate: number; date: Date; ingredients: Ingredient[]; steps: string[]; tags: string[]; imageUrl?: string; prepTime?: number; servings?: number; };
type RatingInfo = { averageRate: number; ratingCount: number; userRating: number | null };

const RecettePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const apibaseurl = process.env.REACT_APP_API_URL;

    const [recette, setRecette] = useState<Recette | null>(null);
    const [loading, setLoading] = useState(true);
    const [ratingInfo, setRatingInfo] = useState<RatingInfo | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance.get(`${apibaseurl}/recette/${id}`)
            .then(res => { setRecette(res.data); setLoading(false); })
            .catch(() => setLoading(false));
        axiosInstance.get(`${apibaseurl}/recette/${id}/rating`)
            .then(res => setRatingInfo(res.data))
            .catch(() => {});
    }, [id]);

    const handleDeleteConfirm = async () => {
        if (!recette) return;
        setDeleting(true);
        try {
            await axiosInstance.delete(`${apibaseurl}/recette/${id}`);
            navigate('/listeRecette');
        } catch {
            setDeleting(false);
            setConfirmOpen(false);
            setErrorMsg("Impossible de supprimer la recette.");
        }
    };

    const handleRate = async (rating: number) => {
        try {
            await axiosInstance.post(`${apibaseurl}/recette/${id}/rating`, { rating });
            const res = await axiosInstance.get(`${apibaseurl}/recette/${id}/rating`);
            setRatingInfo(res.data);
        } catch {
            setErrorMsg("Erreur lors de la notation.");
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
            <CircularProgress sx={{ color: '#166534' }} />
        </div>
    );
    if (!recette) return <p style={{ padding: '2.5rem', color: '#52736a', fontSize: '0.95rem' }}>Recette introuvable.</p>;

    return (
        <>
            <RecetteInfo
                recette={recette}
                onBack={() => navigate('/listeRecette')}
                onEdit={() => navigate(`/recetteForm/${id}`)}
                onDelete={() => setConfirmOpen(true)}
                ratingInfo={ratingInfo}
                onRate={handleRate}
            />

            <Dialog open={confirmOpen} onClose={() => !deleting && setConfirmOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, color: '#0d2b18' }}>
                    Supprimer la recette
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer <strong>« {recette.name} »</strong> ? Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                    <Button
                        onClick={() => setConfirmOpen(false)}
                        disabled={deleting}
                        sx={{ color: '#52736a', borderColor: '#e2ebe5' }}
                        variant="outlined"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        disabled={deleting}
                        variant="contained"
                        color="error"
                        startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {deleting ? 'Suppression…' : 'Supprimer'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={Boolean(errorMsg)}
                autoHideDuration={4000}
                onClose={() => setErrorMsg(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setErrorMsg(null)} variant="filled">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default RecettePage;
