import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IngredientInput from '../../../../components/RecetteFormComponents/ingredients/IngredientInput';

// IngredientInput est aussi un composant contrôlé, mais avec des champs de formulaire.
// Nouveaux concepts introduits ici :
// - fireEvent.change() pour simuler la frappe dans un input
// - fireEvent.keyDown() pour simuler une touche clavier
// - getByPlaceholderText() pour trouver les inputs par leur placeholder

const defaultInput = { name: '', quantity: 0, unit: '' };

describe('IngredientInput', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche les 3 champs et le bouton Ajouter', () => {
        render(
            <IngredientInput
                ingredientInput={defaultInput}
                onIngredientChange={jest.fn()}
                onAddIngredient={jest.fn()}
            />
        );

        expect(screen.getByPlaceholderText("Nom de l'ingrédient")).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Quantité')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Unité (g, ml, …)')).toBeInTheDocument();
        expect(screen.getByText('+ Ajouter')).toBeInTheDocument();
    });

    test('affiche la valeur courante dans le champ nom', () => {
        const input = { name: 'Farine', quantity: 200, unit: 'g' };
        render(
            <IngredientInput
                ingredientInput={input}
                onIngredientChange={jest.fn()}
                onAddIngredient={jest.fn()}
            />
        );

        // Pour les inputs, on vérifie la propriété .value
        const nameInput = screen.getByPlaceholderText("Nom de l'ingrédient") as HTMLInputElement;
        expect(nameInput.value).toBe('Farine');
    });

    // ── Frappe dans les champs ─────────────────────────────────────────────────

    test('frappe dans le champ nom appelle onIngredientChange("name", valeur)', () => {
        const onIngredientChange = jest.fn();
        render(
            <IngredientInput
                ingredientInput={defaultInput}
                onIngredientChange={onIngredientChange}
                onAddIngredient={jest.fn()}
            />
        );

        // fireEvent.change simule l'événement onChange d'un input
        // { target: { value: '...' } } reproduit ce que le navigateur envoie
        fireEvent.change(
            screen.getByPlaceholderText("Nom de l'ingrédient"),
            { target: { value: 'Sucre' } }
        );

        expect(onIngredientChange).toHaveBeenCalledWith('name', 'Sucre');
    });

    test('frappe dans le champ unité appelle onIngredientChange("unit", valeur)', () => {
        const onIngredientChange = jest.fn();
        render(
            <IngredientInput
                ingredientInput={defaultInput}
                onIngredientChange={onIngredientChange}
                onAddIngredient={jest.fn()}
            />
        );

        fireEvent.change(
            screen.getByPlaceholderText('Unité (g, ml, …)'),
            { target: { value: 'kg' } }
        );

        expect(onIngredientChange).toHaveBeenCalledWith('unit', 'kg');
    });

    // ── Bouton Ajouter ─────────────────────────────────────────────────────────

    test('clic sur "+ Ajouter" appelle onAddIngredient', () => {
        const onAdd = jest.fn();
        render(
            <IngredientInput
                ingredientInput={defaultInput}
                onIngredientChange={jest.fn()}
                onAddIngredient={onAdd}
            />
        );

        fireEvent.click(screen.getByText('+ Ajouter'));

        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    // ── Raccourci clavier ──────────────────────────────────────────────────────

    test('appuyer sur Entrée dans le champ nom appelle onAddIngredient', () => {
        const onAdd = jest.fn();
        render(
            <IngredientInput
                ingredientInput={defaultInput}
                onIngredientChange={jest.fn()}
                onAddIngredient={onAdd}
            />
        );

        // fireEvent.keyDown simule l'appui sur une touche
        fireEvent.keyDown(
            screen.getByPlaceholderText("Nom de l'ingrédient"),
            { key: 'Enter', code: 'Enter' }
        );

        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    test('appuyer sur Entrée dans le champ unité appelle aussi onAddIngredient', () => {
        const onAdd = jest.fn();
        render(
            <IngredientInput
                ingredientInput={defaultInput}
                onIngredientChange={jest.fn()}
                onAddIngredient={onAdd}
            />
        );

        fireEvent.keyDown(
            screen.getByPlaceholderText('Unité (g, ml, …)'),
            { key: 'Enter', code: 'Enter' }
        );

        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    test('appuyer sur une autre touche n\'appelle pas onAddIngredient', () => {
        const onAdd = jest.fn();
        render(
            <IngredientInput
                ingredientInput={defaultInput}
                onIngredientChange={jest.fn()}
                onAddIngredient={onAdd}
            />
        );

        fireEvent.keyDown(
            screen.getByPlaceholderText("Nom de l'ingrédient"),
            { key: 'Tab', code: 'Tab' }
        );

        expect(onAdd).not.toHaveBeenCalled();
    });
});
