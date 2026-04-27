import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import StarRating from '../StarRating';
import styled from 'styled-components';

const deep    = '#0d2b18';
const primary = '#166534';
const muted   = '#52736a';
const border  = '#e2ebe5';
const bg      = '#f5f7f5';

// ── Layout ────────────────────────────────────────────────────────────────────

const Page = styled.div`
    max-width: 760px;
    margin: 2.5rem auto;
    padding: 0 1rem 3rem;
`;

// ── Profile card ──────────────────────────────────────────────────────────────

const ProfileCard = styled.div`
    background: #fff;
    border: 1px solid ${border};
    border-radius: 14px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 500px) { flex-direction: column; text-align: center; }
`;

const Avatar = styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: ${primary};
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const ProfileInfo = styled.div`
    flex: 1;
`;

const ProfileName = styled.h1`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${deep};
    margin: 0 0 0.2rem;
`;

const ProfileEmail = styled.p`
    font-size: 0.88rem;
    color: ${muted};
    margin: 0;
`;

const LogoutButton = styled.button`
    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid #fca5a5;
    border-radius: 8px;
    color: #b91c1c;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
    flex-shrink: 0;

    &:hover { background: #fef2f2; }
`;

// ── Recipes section ───────────────────────────────────────────────────────────

const SectionTitle = styled.h2`
    font-size: 1rem;
    font-weight: 700;
    color: ${deep};
    margin: 0 0 1rem;
`;

const RecipeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`;

const RecipeCard = styled.div`
    background: #fff;
    border: 1px solid ${border};
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 0.15s ease, transform 0.15s ease;

    &:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }
`;

const CardImg = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
`;

const CardImgPlaceholder = styled.div`
    width: 100%;
    height: 120px;
    background: ${bg};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
`;

const CardBody = styled.div`
    padding: 0.75rem;
`;

const CardName = styled.p`
    font-size: 0.88rem;
    font-weight: 600;
    color: ${deep};
    margin: 0 0 0.35rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const EmptyState = styled.p`
    color: ${muted};
    font-size: 0.9rem;
    font-style: italic;
    padding: 1.5rem 0;
`;

const UsernameSection = styled.div`
    background: #fff;
    border: 1px solid ${border};
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
`;

const UsernameLabel = styled.label`
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: ${muted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
`;

const UsernameRow = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const UsernameInput = styled.input`
    flex: 1;
    padding: 0.55rem 0.85rem;
    border: 1.5px solid ${border};
    border-radius: 8px;
    font-size: 0.9rem;
    color: ${deep};
    outline: none;
    transition: border-color 0.15s ease;

    &:focus { border-color: ${primary}; }
`;

const SaveButton = styled.button`
    padding: 0.55rem 1.1rem;
    background: ${primary};
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover { background: #15803d; }
    &:disabled { opacity: 0.5; cursor: default; }
`;

const SaveFeedback = styled.span<{ $ok: boolean }>`
    font-size: 0.8rem;
    margin-top: 0.4rem;
    display: block;
    color: ${p => p.$ok ? primary : '#b91c1c'};
`;

// ── Types ─────────────────────────────────────────────────────────────────────

type Recette = {
    id: number;
    name: string;
    rate: number;
    imageUrl?: string;
    prepTime?: number;
};

// ── Component ─────────────────────────────────────────────────────────────────

function ProfilPage() {
    const { user, logout, updateUsername } = useAuth();
    const navigate = useNavigate();
    const apibaseurl = process.env.REACT_APP_API_URL;

    const [recettes, setRecettes] = useState<Recette[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [usernameInput, setUsernameInput] = useState(user?.username ?? '');
    const [saving, setSaving] = useState(false);
    const [saveFeedback, setSaveFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

    useEffect(() => {
        axiosInstance.get(`${apibaseurl}/recette/me`)
            .then(res => setRecettes(res.data))
            .catch(err => setError(`Erreur ${err.response?.status ?? ''}: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

    const displayName = user?.username || user?.email || '';
    const initials = displayName.slice(0, 2).toUpperCase();

    const handleLogout = () => { logout(); navigate('/listeRecette'); };

    const handleSaveUsername = async () => {
        if (!usernameInput.trim()) return;
        setSaving(true);
        setSaveFeedback(null);
        try {
            await updateUsername(usernameInput.trim());
            setSaveFeedback({ msg: 'Nom mis à jour !', ok: true });
        } catch {
            setSaveFeedback({ msg: 'Erreur lors de la mise à jour.', ok: false });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Page>
            <ProfileCard>
                <Avatar>{initials}</Avatar>
                <ProfileInfo>
                    <ProfileName>{user?.username || 'Mon profil'}</ProfileName>
                    <ProfileEmail>{user?.email}</ProfileEmail>
                </ProfileInfo>
                <LogoutButton onClick={handleLogout}>Se déconnecter</LogoutButton>
            </ProfileCard>

            <UsernameSection>
                <UsernameLabel htmlFor="username">Nom d'utilisateur</UsernameLabel>
                <UsernameRow>
                    <UsernameInput
                        id="username"
                        type="text"
                        placeholder="Choisissez un nom affiché sur vos recettes"
                        value={usernameInput}
                        onChange={e => setUsernameInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSaveUsername()}
                    />
                    <SaveButton onClick={handleSaveUsername} disabled={saving || !usernameInput.trim()}>
                        {saving ? '…' : 'Enregistrer'}
                    </SaveButton>
                </UsernameRow>
                {saveFeedback && <SaveFeedback $ok={saveFeedback.ok}>{saveFeedback.msg}</SaveFeedback>}
            </UsernameSection>

            <SectionTitle>
                Mes recettes {!loading && `(${recettes.length})`}
            </SectionTitle>

            {loading ? (
                <EmptyState>Chargement…</EmptyState>
            ) : error ? (
                <EmptyState style={{ color: '#b91c1c' }}>{error}</EmptyState>
            ) : recettes.length === 0 ? (
                <EmptyState>Vous n'avez pas encore créé de recette.</EmptyState>
            ) : (
                <RecipeGrid>
                    {recettes.map(r => (
                        <RecipeCard key={r.id} onClick={() => navigate(`/recette/${r.id}`)}>
                            {r.imageUrl
                                ? <CardImg src={r.imageUrl} alt={r.name} />
                                : <CardImgPlaceholder>🍽</CardImgPlaceholder>
                            }
                            <CardBody>
                                <CardName>{r.name}</CardName>
                                <StarRating rate={r.rate} size="0.8rem" />
                            </CardBody>
                        </RecipeCard>
                    ))}
                </RecipeGrid>
            )}
        </Page>
    );
}

export default ProfilPage;
