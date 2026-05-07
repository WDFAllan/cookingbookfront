import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IngredientList from '../../../../components/RecetteFormComponents/ingredients/IngredientList';

const ingredients = [
    { name: 'Farine', quantity: 200, unit: 'g' },
    { name: 'Sucre', quantity: 100, unit: 'g' },
    { name: 'Beurre', quantity: 50, unit: 'g' },
];

describe('IngredientList', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche tous les ingrédients de la liste', () => {
        render(<IngredientList ingredients={ingredients} onRemoveIngredient={jest.fn()} />);

        expect(screen.getByText('Farine')).toBeInTheDocument();
        expect(screen.getByText('Sucre')).toBeInTheDocument();
        expect(screen.getByText('Beurre')).toBeInTheDocument();
    });

    test('affiche autant de boutons Supprimer que d\'ingrédients', () => {
        render(<IngredientList ingredients={ingredients} onRemoveIngredient={jest.fn()} />);

        expect(screen.getAllByTitle('Supprimer')).toHaveLength(3);
    });

    test('liste vide : aucun bouton Supprimer', () => {
        render(<IngredientList ingredients={[]} onRemoveIngredient={jest.fn()} />);

        expect(screen.queryAllByTitle('Supprimer')).toHaveLength(0);
    });

    // ── Index passé au callback ────────────────────────────────────────────────

    test('supprimer le premier ingrédient appelle onRemoveIngredient(0)', () => {
        const onRemove = jest.fn();
        render(<IngredientList ingredients={ingredients} onRemoveIngredient={onRemove} />);

        // getAllByTitle retourne les boutons dans l'ordre d'affichage
        fireEvent.click(screen.getAllByTitle('Supprimer')[0]);

        expect(onRemove).toHaveBeenCalledWith(0);
    });

    test('supprimer le deuxième ingrédient appelle onRemoveIngredient(1)', () => {
        const onRemove = jest.fn();
        render(<IngredientList ingredients={ingredients} onRemoveIngredient={onRemove} />);

        fireEvent.click(screen.getAllByTitle('Supprimer')[1]);

        expect(onRemove).toHaveBeenCalledWith(1);
    });

    test('supprimer le dernier ingrédient appelle onRemoveIngredient(2)', () => {
        const onRemove = jest.fn();
        render(<IngredientList ingredients={ingredients} onRemoveIngredient={onRemove} />);

        fireEvent.click(screen.getAllByTitle('Supprimer')[2]);

        expect(onRemove).toHaveBeenCalledWith(2);
        expect(onRemove).toHaveBeenCalledTimes(1);
    });
});
