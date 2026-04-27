import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    AuthWrapper, AuthCard, AuthTitle, AuthSubtitle,
    AuthForm, AuthLabel, AuthInput, AuthButton,
    AuthFooter, AuthLink, AuthError,
} from '../../styles/styleComponents/Auth.styles';

const RegisterPage: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username.trim()) { setError('Le nom d\'utilisateur est obligatoire'); return; }
        if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return; }
        if (password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères'); return; }
        setLoading(true);
        try {
            await register(username.trim(), email, password);
            navigate('/listeRecette');
        } catch (err: any) {
            const detail = err.response?.data?.detail;
            setError(detail ?? 'Erreur lors de la création du compte');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthWrapper>
            <AuthCard>
                <AuthTitle>Créer un compte</AuthTitle>
                <AuthSubtitle>Rejoignez votre livre de recettes</AuthSubtitle>
                <AuthForm onSubmit={handleSubmit}>
                    <AuthLabel htmlFor="username">Nom d'utilisateur</AuthLabel>
                    <AuthInput
                        id="username" type="text" placeholder="Votre nom affiché"
                        value={username} onChange={e => setUsername(e.target.value)} required
                    />
                    <AuthLabel htmlFor="email">Adresse email</AuthLabel>
                    <AuthInput
                        id="email" type="email" placeholder="vous@exemple.fr"
                        value={email} onChange={e => setEmail(e.target.value)} required
                    />
                    <AuthLabel htmlFor="password">Mot de passe</AuthLabel>
                    <AuthInput
                        id="password" type="password" placeholder="Min. 6 caractères"
                        value={password} onChange={e => setPassword(e.target.value)} required
                    />
                    <AuthLabel htmlFor="confirm">Confirmer le mot de passe</AuthLabel>
                    <AuthInput
                        id="confirm" type="password" placeholder="••••••"
                        value={confirm} onChange={e => setConfirm(e.target.value)} required
                    />
                    {error && <AuthError>{error}</AuthError>}
                    <AuthButton type="submit" disabled={loading}>
                        {loading ? 'Création…' : 'Créer mon compte'}
                    </AuthButton>
                </AuthForm>
                <AuthFooter>
                    Déjà un compte ?{' '}
                    <AuthLink as={Link} to="/login">Se connecter</AuthLink>
                </AuthFooter>
            </AuthCard>
        </AuthWrapper>
    );
};

export default RegisterPage;
