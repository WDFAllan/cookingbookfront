import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import SelectFilterTags from '../../../components/FilterByTagsComponents/SelectFilterTags';

// SelectFilterTags utilise le composant MUI Select.
// Contrairement à un <select> HTML natif, MUI rend un div[role="combobox"]
// qui ouvre un ul[role="listbox"] avec des li[role="option"] au clic.
// On interagit avec lui via fireEvent.mouseDown pour ouvrir la liste.

const tags = ['dessert', 'plat principal', 'entrée'];

describe('SelectFilterTags', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche le select labellisé "Tags"', () => {
        render(<SelectFilterTags filterTagsList={tags} onSelectTags={jest.fn()} />);

        // getByLabelText trouve le contrôle de formulaire associé au label "Tags"
        // (plus précis que getByText qui trouve aussi le span dans le fieldset MUI)
        expect(screen.getByLabelText('Tags')).toBeInTheDocument();
    });

    test('le composant se monte sans erreur avec une liste vide', () => {
        expect(() =>
            render(<SelectFilterTags filterTagsList={[]} onSelectTags={jest.fn()} />)
        ).not.toThrow();
    });

    // ── Ouverture de la liste ──────────────────────────────────────────────────

    test('les options apparaissent après avoir cliqué pour ouvrir', () => {
        render(<SelectFilterTags filterTagsList={tags} onSelectTags={jest.fn()} />);

        // MUI Select s'ouvre sur mouseDown du div[role="combobox"]
        fireEvent.mouseDown(screen.getByRole('combobox'));

        // Les options sont maintenant dans le DOM (portail dans document.body)
        const listbox = screen.getByRole('listbox');
        expect(within(listbox).getByText('dessert')).toBeInTheDocument();
        expect(within(listbox).getByText('plat principal')).toBeInTheDocument();
        expect(within(listbox).getByText('entrée')).toBeInTheDocument();
    });

    // ── Sélection ─────────────────────────────────────────────────────────────

    test('sélectionner un tag appelle onSelectTags avec ce tag', () => {
        const onSelectTags = jest.fn();
        render(<SelectFilterTags filterTagsList={tags} onSelectTags={onSelectTags} />);

        fireEvent.mouseDown(screen.getByRole('combobox'));
        fireEvent.click(screen.getByRole('option', { name: 'dessert' }));

        expect(onSelectTags).toHaveBeenCalledWith(['dessert']);
    });

    test('sélectionner deux tags appelle onSelectTags avec les deux', () => {
        const onSelectTags = jest.fn();
        render(<SelectFilterTags filterTagsList={tags} onSelectTags={onSelectTags} />);

        // MUI multi-select garde le dropdown ouvert après chaque sélection
        fireEvent.mouseDown(screen.getByRole('combobox'));
        fireEvent.click(screen.getByRole('option', { name: 'dessert' }));
        // Le dropdown est encore ouvert : on clique directement la 2e option
        fireEvent.click(screen.getByRole('option', { name: 'entrée' }));

        expect(onSelectTags).toHaveBeenLastCalledWith(['dessert', 'entrée']);
    });

    test('désélectionner un tag le retire de la liste', () => {
        const onSelectTags = jest.fn();
        render(<SelectFilterTags filterTagsList={tags} onSelectTags={onSelectTags} />);

        // MUI multi-select garde le dropdown ouvert : sélection puis désélection
        // dans la même session d'ouverture
        fireEvent.mouseDown(screen.getByRole('combobox'));
        fireEvent.click(screen.getByRole('option', { name: 'dessert' })); // sélection
        fireEvent.click(screen.getByRole('option', { name: 'dessert' })); // désélection

        expect(onSelectTags).toHaveBeenLastCalledWith([]);
    });
});
