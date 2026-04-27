import React from 'react';

import MainPage from '../components/MainPage.tsx';
import RecetteForm from "../components/RecetteFormComponents/RecetteForm";
import RecettePage from "../components/RecettePage";
import AppLayout from "../components/AppLayout";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import ProfilPage from "../components/auth/ProfilPage";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function DefineRoutes() {
    return (
        <Router>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/listeRecette" element={<MainPage />} />
                    <Route path="/recette/:id" element={<RecettePage />} />
                    <Route path="/recetteForm" element={
                        <ProtectedRoute><RecetteForm /></ProtectedRoute>
                    } />
                    <Route path="/recetteForm/:id" element={
                        <ProtectedRoute><RecetteForm /></ProtectedRoute>
                    } />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profil" element={
                        <ProtectedRoute><ProfilPage /></ProtectedRoute>
                    } />
                </Routes>
            </AppLayout>
        </Router>
    );
}
