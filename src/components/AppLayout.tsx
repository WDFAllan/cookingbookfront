import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    PageHeader,
    HeaderTitle,
    AddRecetteButton,
} from '../styles/styleComponents/RecetteList.styles';

type AppLayoutProps = {
    children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const isListPage = location.pathname === '/' || location.pathname === '/listeRecette';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <PageHeader>
                <HeaderTitle onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    📖 Mon Livre de Recettes
                </HeaderTitle>
                {isListPage && (
                    <AddRecetteButton onClick={() => navigate('/recetteForm')}>
                        + Ajouter une recette
                    </AddRecetteButton>
                )}
            </PageHeader>
            <div style={{ flex: 1 }}>
                {children}
            </div>
        </div>
    );
}

export default AppLayout;
