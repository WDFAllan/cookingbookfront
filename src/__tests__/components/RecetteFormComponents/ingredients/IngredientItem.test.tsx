import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IngredientItem from '../../../../components/RecetteFormComponents/ingredients/IngredientItem';

// Un "mock" en frontend = une fonction factice dont on peut vérifier les appels.
// On en a besoin ici car le composant attend une fonction onRemoveIngredient.
// jest.fn() crée cette fonction vide qui enregistre si/quand elle a été appelée.

const ingredient = { name: 'Farine', quantity: 200, unit: 'g' };

describe('IngredientItem', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche le nom, la quantité et l\'unité de l\'ingrédient', () => {
        render(<IngredientItem ingredient={ingredient} onRemoveIngredient={jest.fn()} />);

        // getByText cherche un élément qui contient exactement ce texte
        expect(screen.getByText('Farine')).toBeInTheDocument();

        // { exact: false } permet de chercher un texte partiel dans le DOM
        expect(screen.getByText(/200 g/)).toBeInTheDocument();
    });

    test('affiche un bouton de suppression', () => {
        render(<IngredientItem ingredient={ingredient} onRemoveIngredient={jest.fn()} />);

        // getByTitle cherche par l'attribut title="" du bouton
        expect(screen.getByTitle('Supprimer')).toBeInTheDocument();
    });

    // ── Interactions ───────────────────────────────────────────────────────────

    test('appelle onRemoveIngredient quand on clique sur ✕', () => {
        const onRemove = jest.fn(); // Crée une fonction factice

        render(<IngredientItem ingredient={ingredient} onRemoveIngredient={onRemove} />);

        // Simule un clic sur le bouton
        fireEvent.click(screen.getByTitle('Supprimer'));

        // Vérifie que la fonction a bien été appelée une fois
        expect(onRemove).toHaveBeenCalledTimes(1);
    });

    test('n\'appelle pas onRemoveIngredient si on ne clique pas', () => {
        const onRemove = jest.fn();

        render(<IngredientItem ingredient={ingredient} onRemoveIngredient={onRemove} />);

        // Pas de clic → pas d'appel
        expect(onRemove).not.toHaveBeenCalled();
    });
});
