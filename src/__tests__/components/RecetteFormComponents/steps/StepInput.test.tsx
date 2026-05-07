import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StepInput from '../../../../components/RecetteFormComponents/steps/StepInput';

describe('StepInput', () => {

    // ── Affichage ──────────────────────────────────────────────────────────────

    test('affiche le champ texte et le bouton Ajouter', () => {
        render(
            <StepInput stepInput="" onStepChange={jest.fn()} onAddStep={jest.fn()} />
        );

        expect(screen.getByPlaceholderText("Décrivez l'étape…")).toBeInTheDocument();
        expect(screen.getByText('+ Ajouter')).toBeInTheDocument();
    });

    test('affiche la valeur courante dans le champ', () => {
        render(
            <StepInput
                stepInput="Préchauffer le four à 180°C"
                onStepChange={jest.fn()}
                onAddStep={jest.fn()}
            />
        );

        const input = screen.getByPlaceholderText("Décrivez l'étape…") as HTMLInputElement;
        expect(input.value).toBe('Préchauffer le four à 180°C');
    });

    // ── Frappe ─────────────────────────────────────────────────────────────────

    test('frappe dans le champ appelle onStepChange avec la valeur', () => {
        const onStepChange = jest.fn();
        render(
            <StepInput stepInput="" onStepChange={onStepChange} onAddStep={jest.fn()} />
        );

        fireEvent.change(
            screen.getByPlaceholderText("Décrivez l'étape…"),
            { target: { value: 'Mélanger les œufs' } }
        );

        expect(onStepChange).toHaveBeenCalledWith('Mélanger les œufs');
    });

    // ── Bouton Ajouter ─────────────────────────────────────────────────────────

    test('clic sur "+ Ajouter" appelle onAddStep', () => {
        const onAddStep = jest.fn();
        render(
            <StepInput stepInput="Étape" onStepChange={jest.fn()} onAddStep={onAddStep} />
        );

        fireEvent.click(screen.getByText('+ Ajouter'));

        expect(onAddStep).toHaveBeenCalledTimes(1);
    });

    // ── Raccourci clavier ──────────────────────────────────────────────────────

    test('Entrée dans le champ appelle onAddStep', () => {
        const onAddStep = jest.fn();
        render(
            <StepInput stepInput="Étape" onStepChange={jest.fn()} onAddStep={onAddStep} />
        );

        fireEvent.keyDown(
            screen.getByPlaceholderText("Décrivez l'étape…"),
            { key: 'Enter', code: 'Enter' }
        );

        expect(onAddStep).toHaveBeenCalledTimes(1);
    });

    test('autre touche que Entrée n\'appelle pas onAddStep', () => {
        const onAddStep = jest.fn();
        render(
            <StepInput stepInput="" onStepChange={jest.fn()} onAddStep={onAddStep} />
        );

        fireEvent.keyDown(
            screen.getByPlaceholderText("Décrivez l'étape…"),
            { key: 'Space', code: 'Space' }
        );

        expect(onAddStep).not.toHaveBeenCalled();
    });
});
