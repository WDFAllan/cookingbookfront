import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// react-scripts 5 (CRA) embarque Jest 27 qui ne supporte pas les "package exports"
// de react-router-dom v7. On mock le module Routes pour isoler App de ce problème.
//
// jest.mock(chemin) remplace entièrement un module par la valeur retournée.
// Ici, DefineRoutes devient un composant vide → App peut se monter sans le router.
//
// Concept clé : on teste App (AuthProvider + GlobalStyle), pas les pages.

jest.mock('../routes/Routes', () => () => <div data-testid="routes-mock" />);

test('l\'application se monte sans erreur et affiche les routes', () => {
    const { getByTestId } = render(<App />);

    // Le composant Routes a été rendu (le mock est là)
    expect(getByTestId('routes-mock')).toBeInTheDocument();
});
