import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    PageHeader,
    HeaderTitle,
    AddRecetteButton,
} from '../styles/styleComponents/RecetteList.styles';
import styled from 'styled-components';

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
`;

const LoginLink = styled(Link)`
    color: rgba(255,255,255,0.85);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    padding: 0.35rem 0.8rem;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 7px;
    transition: all 0.15s ease;

    &:hover {
        color: #fff;
        border-color: rgba(255,255,255,0.7);
        background: rgba(255,255,255,0.08);
    }
`;

const AvatarButton = styled.button`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(255,255,255,0.18);
    border: 1.5px solid rgba(255,255,255,0.45);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.02em;
    transition: background 0.15s ease, border-color 0.15s ease;
    flex-shrink: 0;

    &:hover {
        background: rgba(255,255,255,0.28);
        border-color: rgba(255,255,255,0.7);
    }
`;

const Dropdown = styled.div<{ $open: boolean }>`
    position: absolute;
    top: calc(100% + 0.6rem);
    right: 0;
    width: 210px;
    background: #fff;
    border: 1px solid #e2ebe5;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    z-index: 1000;
    overflow: hidden;
    opacity: ${p => p.$open ? 1 : 0};
    transform: ${p => p.$open ? 'translateY(0)' : 'translateY(-6px)'};
    pointer-events: ${p => p.$open ? 'auto' : 'none'};
    transition: opacity 0.15s ease, transform 0.15s ease;
`;

const DropdownEmail = styled.div`
    padding: 0.75rem 1rem 0.6rem;
    font-size: 0.78rem;
    color: #52736a;
    font-weight: 500;
    border-bottom: 1px solid #e2ebe5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const DropdownItem = styled.button`
    display: block;
    width: 100%;
    padding: 0.65rem 1rem;
    background: none;
    border: none;
    text-align: left;
    font-size: 0.85rem;
    font-weight: 500;
    color: #0d2b18;
    cursor: pointer;
    transition: background 0.1s ease;

    &:hover { background: #f0f7f3; }
`;

const DropdownDivider = styled.hr`
    margin: 0;
    border: none;
    border-top: 1px solid #e2ebe5;
`;

const DropdownLogout = styled(DropdownItem)`
    color: #b91c1c;
    &:hover { background: #fef2f2; }
`;

type AppLayoutProps = { children: React.ReactNode };

function AppLayout({ children }: AppLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();
    const isLanding = location.pathname === '/';
    const isListPage = location.pathname === '/listeRecette';

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const initials = (user?.username || user?.email || '?').slice(0, 2).toUpperCase();

    const handleLogout = () => {
        setOpen(false);
        logout();
        navigate('/listeRecette');
    };

    const goToProfil = () => {
        setOpen(false);
        navigate('/profil');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <PageHeader style={isLanding ? {
                background: 'transparent',
                boxShadow: 'none',
                position: 'absolute',
                width: '100%',
                top: 0,
                zIndex: 200,
            } : undefined}>
                <HeaderTitle onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    Mon Livre de Recettes
                </HeaderTitle>
                <HeaderRight ref={dropdownRef}>
                    {isAuthenticated ? (
                        <>
                            {isListPage && (
                                <AddRecetteButton onClick={() => navigate('/recetteForm')}>
                                    + Ajouter
                                </AddRecetteButton>
                            )}
                            <AvatarButton onClick={() => setOpen(o => !o)} aria-label="Menu profil">
                                {initials}
                            </AvatarButton>
                            <Dropdown $open={open}>
                                <DropdownEmail>{user?.email}</DropdownEmail>
                                <DropdownItem onClick={goToProfil}>Mon profil</DropdownItem>
                                <DropdownDivider />
                                <DropdownLogout onClick={handleLogout}>Déconnexion</DropdownLogout>
                            </Dropdown>
                        </>
                    ) : (
                        <LoginLink to="/login">Se connecter</LoginLink>
                    )}
                </HeaderRight>
            </PageHeader>
            <div style={{ flex: 1 }}>
                {children}
            </div>
        </div>
    );
}

export default AppLayout;
