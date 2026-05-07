import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from '../../components/StarRating';

// StarRating est un composant "pur" : pas d'interaction, pas d'appel API.
// On teste uniquement la logique de rendu (étoiles colorées / vides).
//
// On utilise des attributs data-testid ajoutés dans le composant.
// C'est la façon standard de rendre un composant testable sans dépendre
// du rendu CSS (les couleurs ne sont pas fiables dans le DOM virtuel de Jest).
//
// data-testid="star-base"    → l'étoile grise de fond (toujours présente)
// data-testid="star-colored" → l'étoile colorée par-dessus (seulement si active)

describe('StarRating', () => {

    // ── Cas limites ────────────────────────────────────────────────────────────

    test('affiche toujours 5 étoiles de base', () => {
        render(<StarRating rate={3} />);

        // getAllByTestId retourne tous les éléments avec cet attribut
        expect(screen.getAllByTestId('star-base')).toHaveLength(5);
    });

    test('rate 5 : toutes les 5 étoiles sont colorées', () => {
        render(<StarRating rate={5} />);

        expect(screen.getAllByTestId('star-colored')).toHaveLength(5);
    });

    test('rate 0 : aucune étoile n\'est colorée', () => {
        render(<StarRating rate={0} />);

        // queryAllByTestId (pas getAll) : ne lève pas d'erreur si aucun résultat
        expect(screen.queryAllByTestId('star-colored')).toHaveLength(0);
    });

    // ── Demi-étoiles ──────────────────────────────────────────────────────────

    test('rate 2.5 : 3 spans colorés (2 pleins + 1 demi)', () => {
        // La demi-étoile est aussi un span data-testid="star-colored"
        // (même rendu que les pleines, seul width diffère : 50%)
        render(<StarRating rate={2.5} />);

        expect(screen.getAllByTestId('star-colored')).toHaveLength(3);
    });

    test('rate 4.5 : 5 spans colorés (4 pleins + 1 demi)', () => {
        render(<StarRating rate={4.5} />);

        expect(screen.getAllByTestId('star-colored')).toHaveLength(5);
    });

    test('rate 3.0 : exactement 3 étoiles colorées', () => {
        render(<StarRating rate={3} />);

        expect(screen.getAllByTestId('star-colored')).toHaveLength(3);
    });
});
