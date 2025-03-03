import React from 'react';

import MainPage from '../components/MainPage.tsx';
import RecetteList from '../components/RecetteList.tsx';
import RecetteForm from "../components/RecetteFormComponents/RecetteForm";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function DefineRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/listeRecette" element={<RecetteList/>}></Route>
                <Route path="/recetteForm" element={<RecetteForm/>}></Route>
            </Routes>
        </Router>
    )
}