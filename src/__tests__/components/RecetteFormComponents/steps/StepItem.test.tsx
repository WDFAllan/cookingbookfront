import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StepItem from '../../../../components/RecetteFormComponents/steps/StepItem';

describe('StepItem', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche le texte de l\'étape', () => {
        const { container } = render(
            <StepItem step="Mélanger la farine et le sucre" index={0} onRemoveStep={jest.fn()} />
        );

        // toHaveTextContent vérifie que le conteneur contient ce texte quelque part
        expect(container).toHaveTextContent('Mélanger la farine et le sucre');
    });

    test('affiche le numéro d\'étape à partir de 1 (index + 1)', () => {
        const { container } = render(
            <StepItem step="Cuire au four" index={2} onRemoveStep={jest.fn()} />
        );

        // index=2 → numéro affiché = 3
        expect(container).toHaveTextContent('3');
    });

    test('index 0 affiche le numéro 1', () => {
        const { container } = render(
            <StepItem step="Préchauffer le four" index={0} onRemoveStep={jest.fn()} />
        );

        expect(container).toHaveTextContent('1');
    });

    test('affiche un bouton de suppression', () => {
        render(<StepItem step="Étape test" index={0} onRemoveStep={jest.fn()} />);

        expect(screen.getByTitle('Supprimer')).toBeInTheDocument();
    });

    // ── Interactions ───────────────────────────────────────────────────────────

    test('appelle onRemoveStep au clic sur le bouton', () => {
        const onRemove = jest.fn();
        render(<StepItem step="Étape test" index={0} onRemoveStep={onRemove} />);

        fireEvent.click(screen.getByTitle('Supprimer'));

        expect(onRemove).toHaveBeenCalledTimes(1);
    });

    test('n\'appelle pas onRemoveStep sans clic', () => {
        const onRemove = jest.fn();
        render(<StepItem step="Étape test" index={0} onRemoveStep={onRemove} />);

        expect(onRemove).not.toHaveBeenCalled();
    });
});
