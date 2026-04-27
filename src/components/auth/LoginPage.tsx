import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    AuthWrapper, AuthCard, AuthTitle, AuthSubtitle,
    AuthForm, AuthLabel, AuthInput, AuthButton,
    AuthFooter, AuthLink, AuthError,
} from '../../styles/styleComponents/Auth.styles';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/listeRecette');
        } catch (err: any) {
            const detail = err.response?.data?.detail;
            setError(detail ?? 'Identifiants incorrects');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthWrapper>
            <AuthCard>
                <AuthTitle>Connexion</AuthTitle>
                <AuthSubtitle>Accédez à votre livre de recettes</AuthSubtitle>
                <AuthForm onSubmit={handleSubmit}>
                    <AuthLabel htmlFor="email">Adresse email</AuthLabel>
                    <AuthInput
                        id="email" type="email" placeholder="vous@exemple.fr"
                        value={email} onChange={e => setEmail(e.target.value)} required
                    />
                    <AuthLabel htmlFor="password">Mot de passe</AuthLabel>
                    <AuthInput
                        id="password" type="password" placeholder="••••••"
                        value={password} onChange={e => setPassword(e.target.value)} required
                    />
                    {error && <AuthError>{error}</AuthError>}
                    <AuthButton type="submit" disabled={loading}>
                        {loading ? 'Connexion…' : 'Se connecter'}
                    </AuthButton>
                </AuthForm>
                <AuthFooter>
                    Pas encore de compte ?{' '}
                    <AuthLink as={Link} to="/register">Créer un compte</AuthLink>
                </AuthFooter>
            </AuthCard>
        </AuthWrapper>
    );
};

export default LoginPage;
