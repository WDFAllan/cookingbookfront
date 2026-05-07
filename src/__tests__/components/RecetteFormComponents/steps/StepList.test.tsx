import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StepList from '../../../../components/RecetteFormComponents/steps/StepList';

const steps = [
    'Préchauffer le four à 180°C',
    'Mélanger la farine et le sucre',
    'Cuire 30 minutes',
];

describe('StepList', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche toutes les étapes', () => {
        const { container } = render(
            <StepList steps={steps} onRemoveStep={jest.fn()} />
        );

        expect(container).toHaveTextContent('Préchauffer le four à 180°C');
        expect(container).toHaveTextContent('Mélanger la farine et le sucre');
        expect(container).toHaveTextContent('Cuire 30 minutes');
    });

    test('affiche les numéros d\'étape dans l\'ordre', () => {
        const { container } = render(
            <StepList steps={steps} onRemoveStep={jest.fn()} />
        );

        expect(container).toHaveTextContent('1');
        expect(container).toHaveTextContent('2');
        expect(container).toHaveTextContent('3');
    });

    test('affiche autant de boutons Supprimer que d\'étapes', () => {
        render(<StepList steps={steps} onRemoveStep={jest.fn()} />);

        expect(screen.getAllByTitle('Supprimer')).toHaveLength(3);
    });

    test('liste vide : aucun bouton Supprimer', () => {
        render(<StepList steps={[]} onRemoveStep={jest.fn()} />);

        expect(screen.queryAllByTitle('Supprimer')).toHaveLength(0);
    });

    // ── Index passé au callback ────────────────────────────────────────────────

    test('supprimer la première étape appelle onRemoveStep(0)', () => {
        const onRemove = jest.fn();
        render(<StepList steps={steps} onRemoveStep={onRemove} />);

        fireEvent.click(screen.getAllByTitle('Supprimer')[0]);

        expect(onRemove).toHaveBeenCalledWith(0);
    });

    test('supprimer la deuxième étape appelle onRemoveStep(1)', () => {
        const onRemove = jest.fn();
        render(<StepList steps={steps} onRemoveStep={onRemove} />);

        fireEvent.click(screen.getAllByTitle('Supprimer')[1]);

        expect(onRemove).toHaveBeenCalledWith(1);
    });

    test('supprimer la dernière étape appelle onRemoveStep(2)', () => {
        const onRemove = jest.fn();
        render(<StepList steps={steps} onRemoveStep={onRemove} />);

        fireEvent.click(screen.getAllByTitle('Supprimer')[2]);

        expect(onRemove).toHaveBeenCalledWith(2);
        expect(onRemove).toHaveBeenCalledTimes(1);
    });
});
