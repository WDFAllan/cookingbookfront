import React from 'react';

import MainPage from '../components/MainPage.tsx';
import RecetteForm from "../components/RecetteFormComponents/RecetteForm";
import RecettePage from "../components/RecettePage";
import AppLayout from "../components/AppLayout";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function DefineRoutes(){
    return (
        <Router>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/listeRecette" element={<MainPage/>}></Route>
                    <Route path="/recette/:id" element={<RecettePage/>}></Route>
                    <Route path="/recetteForm" element={<RecetteForm/>}></Route>
                    <Route path="/recetteForm/:id" element={<RecetteForm/>}></Route>
                </Routes>
            </AppLayout>
        </Router>
    )
}