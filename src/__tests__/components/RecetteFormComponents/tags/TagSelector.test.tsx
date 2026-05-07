import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TagSelector from '../../../../components/RecetteFormComponents/tags/TagSelector';

// TagSelector est un composant "contrôlé" :
// - il reçoit les tags sélectionnés via la prop `tags`
// - il remonte les changements via la prop `onChange`
// - il ne gère PAS son propre état interne
//
// Ce pattern est très courant en React. Pour tester les interactions,
// on passe une fonction jest.fn() en onChange et on vérifie ce qu'elle reçoit.

describe('TagSelector', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche tous les boutons de prix et de difficulté', () => {
        render(<TagSelector tags={[]} onChange={jest.fn()} />);

        // getAllByRole('button') retourne TOUS les boutons dans le composant
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(6); // 3 prix + 3 difficulté

        expect(screen.getByText('pas cher')).toBeInTheDocument();
        expect(screen.getByText('prix moyen')).toBeInTheDocument();
        expect(screen.getByText('cher')).toBeInTheDocument();
        expect(screen.getByText('facile')).toBeInTheDocument();
        expect(screen.getByText('moyen')).toBeInTheDocument();
        expect(screen.getByText('difficile')).toBeInTheDocument();
    });

    test('affiche les labels de groupe "Prix" et "Difficulté"', () => {
        render(<TagSelector tags={[]} onChange={jest.fn()} />);

        expect(screen.getByText('Prix')).toBeInTheDocument();
        expect(screen.getByText('Difficulté')).toBeInTheDocument();
    });

    // ── Sélection ─────────────────────────────────────────────────────────────

    test('cliquer sur "facile" appelle onChange avec ["facile"]', () => {
        const onChange = jest.fn();
        render(<TagSelector tags={[]} onChange={onChange} />);

        fireEvent.click(screen.getByText('facile'));

        // toHaveBeenCalledWith vérifie LES ARGUMENTS reçus par la fonction
        expect(onChange).toHaveBeenCalledWith(['facile']);
    });

    test('cliquer sur "pas cher" appelle onChange avec ["pas cher"]', () => {
        const onChange = jest.fn();
        render(<TagSelector tags={[]} onChange={onChange} />);

        fireEvent.click(screen.getByText('pas cher'));

        expect(onChange).toHaveBeenCalledWith(['pas cher']);
    });

    // ── Désélection ───────────────────────────────────────────────────────────

    test('recliquer sur un tag déjà sélectionné le désélectionne', () => {
        const onChange = jest.fn();
        // On rend le composant avec "facile" déjà sélectionné
        render(<TagSelector tags={['facile']} onChange={onChange} />);

        fireEvent.click(screen.getByText('facile'));

        // La sélection précédente est retirée : onChange reçoit une liste vide
        expect(onChange).toHaveBeenCalledWith([]);
    });

    // ── Exclusivité dans un groupe ─────────────────────────────────────────────

    test('sélectionner "cher" quand "pas cher" est actif remplace "pas cher"', () => {
        const onChange = jest.fn();
        // "pas cher" est déjà sélectionné
        render(<TagSelector tags={['pas cher']} onChange={onChange} />);

        fireEvent.click(screen.getByText('cher'));

        // "pas cher" disparaît, "cher" prend sa place
        expect(onChange).toHaveBeenCalledWith(['cher']);
    });

    test('sélectionner "difficile" ne retire pas le tag de prix', () => {
        const onChange = jest.fn();
        // Les deux groupes sont indépendants
        render(<TagSelector tags={['pas cher']} onChange={onChange} />);

        fireEvent.click(screen.getByText('difficile'));

        // "pas cher" est conservé, "difficile" s'ajoute
        expect(onChange).toHaveBeenCalledWith(['pas cher', 'difficile']);
    });
});
