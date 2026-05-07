import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecetteForm from '../../../components/RecetteFormComponents/RecetteForm';
import axiosInstance from '../../../api/axiosInstance';
// moduleNameMapper redirige cet import vers src/__mocks__/react-router-dom.js
// Le composant reçoit les mêmes jest.fn() — on peut les configurer ici
import { useNavigate, useParams } from 'react-router-dom';

// ── Mocks ─────────────────────────────────────────────────────────────────────

// axiosInstance : remplacé par des jest.fn() pour intercepter les appels API
jest.mock('../../../api/axiosInstance', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
    },
}));

const mockAxios = axiosInstance as unknown as { get: jest.Mock; post: jest.Mock; put: jest.Mock };

// useNavigate/useParams : fournis par src/__mocks__/react-router-dom.js via moduleNameMapper
const mockNavigate = jest.fn();
const mockUseNavigate = useNavigate as jest.Mock;
const mockUseParams = useParams as jest.Mock;

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
    jest.clearAllMocks();
    // useNavigate() doit retourner la fonction navigate (pas undefined)
    mockUseNavigate.mockReturnValue(mockNavigate);
    // Mode création par défaut : pas d'id dans l'URL
    mockUseParams.mockReturnValue({});
});

// ── Helper ────────────────────────────────────────────────────────────────────

/**
 * Remplit le formulaire avec des données minimales valides :
 * un nom, un ingrédient, une étape.
 */
const fillValidForm = () => {
    fireEvent.change(screen.getByLabelText('Nom de la recette'), {
        target: { value: 'Tarte aux pommes' },
    });

    fireEvent.change(screen.getByPlaceholderText("Nom de l'ingrédient"), { target: { value: 'Farine' } });
    fireEvent.change(screen.getByPlaceholderText('Quantité'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Unité (g, ml, …)'), { target: { value: 'g' } });
    fireEvent.click(screen.getAllByText('+ Ajouter')[0]); // bouton ingrédient

    fireEvent.change(screen.getByPlaceholderText("Décrivez l'étape…"), { target: { value: 'Mélanger' } });
    fireEvent.click(screen.getAllByText('+ Ajouter')[1]); // bouton étape
};

// ─────────────────────────────────────────────────────────────────────────────
// MODE CRÉATION
// ─────────────────────────────────────────────────────────────────────────────

describe('RecetteForm — mode création', () => {

    // ── Affichage initial ─────────────────────────────────────────────────────

    test('affiche le titre "Nouvelle recette" et le bouton Soumettre', () => {
        render(<RecetteForm />);

        expect(screen.getByText('Nouvelle recette')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Soumettre' })).toBeInTheDocument();
    });

    test('affiche tous les champs du formulaire', () => {
        render(<RecetteForm />);

        expect(screen.getByLabelText('Nom de la recette')).toBeInTheDocument();
        expect(screen.getByLabelText('Temps de préparation (minutes)')).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre de portions')).toBeInTheDocument();
        expect(screen.getByText('Ingrédients')).toBeInTheDocument();
        expect(screen.getByText('Étapes')).toBeInTheDocument();
        expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    test('ne fait pas d\'appel GET en mode création', () => {
        render(<RecetteForm />);

        expect(mockAxios.get).not.toHaveBeenCalled();
    });

    // ── Validation ────────────────────────────────────────────────────────────

    test('validation — nom vide affiche le message d\'erreur', () => {
        render(<RecetteForm />);

        fireEvent.click(screen.getByRole('button', { name: 'Soumettre' }));

        expect(screen.getByText('Le nom de la recette est obligatoire.')).toBeInTheDocument();
    });

    test('validation — aucun ingrédient affiche le message d\'erreur', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByLabelText('Nom de la recette'), { target: { value: 'Tarte' } });
        fireEvent.click(screen.getByRole('button', { name: 'Soumettre' }));

        expect(screen.getByText('Ajoutez au moins un ingrédient.')).toBeInTheDocument();
    });

    test('validation — aucune étape affiche le message d\'erreur', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByLabelText('Nom de la recette'), { target: { value: 'Tarte' } });
        fireEvent.change(screen.getByPlaceholderText("Nom de l'ingrédient"), { target: { value: 'Farine' } });
        fireEvent.change(screen.getByPlaceholderText('Quantité'), { target: { value: '200' } });
        fireEvent.change(screen.getByPlaceholderText('Unité (g, ml, …)'), { target: { value: 'g' } });
        fireEvent.click(screen.getAllByText('+ Ajouter')[0]);
        fireEvent.click(screen.getByRole('button', { name: 'Soumettre' }));

        expect(screen.getByText('Ajoutez au moins une étape.')).toBeInTheDocument();
    });

    test('formulaire invalide n\'appelle pas POST', () => {
        render(<RecetteForm />);

        fireEvent.click(screen.getByRole('button', { name: 'Soumettre' }));

        expect(mockAxios.post).not.toHaveBeenCalled();
    });

    // ── Gestion des ingrédients ───────────────────────────────────────────────

    test('ajouter un ingrédient valide l\'affiche dans la liste', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByPlaceholderText("Nom de l'ingrédient"), { target: { value: 'Farine' } });
        fireEvent.change(screen.getByPlaceholderText('Quantité'), { target: { value: '200' } });
        fireEvent.change(screen.getByPlaceholderText('Unité (g, ml, …)'), { target: { value: 'g' } });
        fireEvent.click(screen.getAllByText('+ Ajouter')[0]);

        expect(screen.getByText('Farine')).toBeInTheDocument();
        expect(screen.getByText(/200 g/)).toBeInTheDocument();
    });

    test('ingrédient sans nom ne s\'ajoute pas', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByPlaceholderText('Quantité'), { target: { value: '200' } });
        fireEvent.change(screen.getByPlaceholderText('Unité (g, ml, …)'), { target: { value: 'g' } });
        fireEvent.click(screen.getAllByText('+ Ajouter')[0]);

        expect(screen.queryAllByTitle('Supprimer')).toHaveLength(0);
    });

    test('ingrédient avec quantité 0 ne s\'ajoute pas', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByPlaceholderText("Nom de l'ingrédient"), { target: { value: 'Sel' } });
        fireEvent.change(screen.getByPlaceholderText('Unité (g, ml, …)'), { target: { value: 'g' } });
        fireEvent.click(screen.getAllByText('+ Ajouter')[0]);

        expect(screen.queryByText('Sel')).not.toBeInTheDocument();
    });

    test('supprimer un ingrédient le retire de la liste', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByPlaceholderText("Nom de l'ingrédient"), { target: { value: 'Farine' } });
        fireEvent.change(screen.getByPlaceholderText('Quantité'), { target: { value: '200' } });
        fireEvent.change(screen.getByPlaceholderText('Unité (g, ml, …)'), { target: { value: 'g' } });
        fireEvent.click(screen.getAllByText('+ Ajouter')[0]);
        fireEvent.click(screen.getByTitle('Supprimer'));

        expect(screen.queryByText('Farine')).not.toBeInTheDocument();
    });

    test('les champs ingrédient se vident après un ajout réussi', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByPlaceholderText("Nom de l'ingrédient"), { target: { value: 'Farine' } });
        fireEvent.change(screen.getByPlaceholderText('Quantité'), { target: { value: '200' } });
        fireEvent.change(screen.getByPlaceholderText('Unité (g, ml, …)'), { target: { value: 'g' } });
        fireEvent.click(screen.getAllByText('+ Ajouter')[0]);

        const nameInput = screen.getByPlaceholderText("Nom de l'ingrédient") as HTMLInputElement;
        const unitInput = screen.getByPlaceholderText('Unité (g, ml, …)') as HTMLInputElement;
        expect(nameInput.value).toBe('');
        expect(unitInput.value).toBe('');
    });

    // ── Gestion des étapes ────────────────────────────────────────────────────

    test('ajouter une étape valide l\'affiche dans la liste', () => {
        const { container } = render(<RecetteForm />);

        fireEvent.change(screen.getByPlaceholderText("Décrivez l'étape…"), {
            target: { value: 'Préchauffer le four à 180°C' },
        });
        fireEvent.click(screen.getAllByText('+ Ajouter')[1]);

        expect(container).toHaveTextContent('Préchauffer le four à 180°C');
    });

    test('étape vide ne s\'ajoute pas', () => {
        render(<RecetteForm />);

        fireEvent.click(screen.getAllByText('+ Ajouter')[1]);

        expect(screen.queryAllByTitle('Supprimer')).toHaveLength(0);
    });

    test('le champ étape se vide après un ajout réussi', () => {
        render(<RecetteForm />);

        fireEvent.change(screen.getByPlaceholderText("Décrivez l'étape…"), { target: { value: 'Mélanger' } });
        fireEvent.click(screen.getAllByText('+ Ajouter')[1]);

        const stepInput = screen.getByPlaceholderText("Décrivez l'étape…") as HTMLInputElement;
        expect(stepInput.value).toBe('');
    });

    // ── Soumission ────────────────────────────────────────────────────────────

    test('soumission valide appelle POST et affiche le toast succès', async () => {
        mockAxios.post.mockResolvedValue({ data: {} });
        render(<RecetteForm />);

        fillValidForm();
        fireEvent.click(screen.getByRole('button', { name: 'Soumettre' }));

        // waitFor attend que React re-rende après la promesse résolue
        await waitFor(() => {
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
            expect(screen.getByText('Recette créée avec succès !')).toBeInTheDocument();
        });
    });

    test('soumission valide n\'appelle pas PUT', async () => {
        mockAxios.post.mockResolvedValue({ data: {} });
        render(<RecetteForm />);

        fillValidForm();
        fireEvent.click(screen.getByRole('button', { name: 'Soumettre' }));

        await waitFor(() => expect(mockAxios.post).toHaveBeenCalledTimes(1));
        expect(mockAxios.put).not.toHaveBeenCalled();
    });

    test('erreur API affiche le toast d\'erreur générique', async () => {
        mockAxios.post.mockRejectedValue(new Error('Network error'));
        render(<RecetteForm />);

        fillValidForm();
        fireEvent.click(screen.getByRole('button', { name: 'Soumettre' }));

        await waitFor(() => {
            expect(screen.getByText("Erreur lors de l'envoi de la recette.")).toBeInTheDocument();
        });
    });

    // ── Navigation ────────────────────────────────────────────────────────────

    test('bouton "Retour à la liste" navigue vers /listeRecette', () => {
        render(<RecetteForm />);

        fireEvent.click(screen.getByText('Retour à la liste'));

        expect(mockNavigate).toHaveBeenCalledWith('/listeRecette');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// MODE ÉDITION
// ─────────────────────────────────────────────────────────────────────────────

describe('RecetteForm — mode édition', () => {

    const recetteExistante = {
        name: 'Tarte aux pommes',
        ingredients: [{ name: 'Farine', quantity: 200, unit: 'g' }],
        steps: ['Mélanger'],
        tags: ['dessert'],
        imageUrl: '',
        prepTime: 30,
        servings: 4,
    };

    beforeEach(() => {
        mockUseParams.mockReturnValue({ id: '1' });
        mockAxios.get.mockResolvedValue({ data: recetteExistante });
    });

    test('affiche "Modifier la recette" et "Enregistrer les modifications"', async () => {
        render(<RecetteForm />);

        await waitFor(() => {
            expect(screen.getByText('Modifier la recette')).toBeInTheDocument();
            expect(
                screen.getByRole('button', { name: 'Enregistrer les modifications' })
            ).toBeInTheDocument();
        });
    });

    test('charge et pré-remplit le nom de la recette', async () => {
        render(<RecetteForm />);

        // getByDisplayValue trouve un input par sa valeur courante
        await waitFor(() => {
            expect(screen.getByDisplayValue('Tarte aux pommes')).toBeInTheDocument();
        });
    });

    test('charge et affiche les ingrédients existants', async () => {
        render(<RecetteForm />);

        await waitFor(() => {
            expect(screen.getByText('Farine')).toBeInTheDocument();
        });
    });

    test('charge et affiche les étapes existantes', async () => {
        const { container } = render(<RecetteForm />);

        await waitFor(() => {
            expect(container).toHaveTextContent('Mélanger');
        });
    });

    test('appelle GET avec l\'id correct au montage', async () => {
        render(<RecetteForm />);

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('/recette/1'));
        });
    });

    test('soumission appelle PUT et non POST', async () => {
        mockAxios.put.mockResolvedValue({ data: {} });
        render(<RecetteForm />);

        await waitFor(() => screen.getByDisplayValue('Tarte aux pommes'));
        fireEvent.click(screen.getByRole('button', { name: 'Enregistrer les modifications' }));

        await waitFor(() => {
            expect(mockAxios.put).toHaveBeenCalledTimes(1);
            expect(mockAxios.post).not.toHaveBeenCalled();
        });
    });

    test('soumission en mode édition affiche le toast de modification', async () => {
        mockAxios.put.mockResolvedValue({ data: {} });
        render(<RecetteForm />);

        await waitFor(() => screen.getByDisplayValue('Tarte aux pommes'));
        fireEvent.click(screen.getByRole('button', { name: 'Enregistrer les modifications' }));

        await waitFor(() => {
            expect(screen.getByText('Recette modifiée avec succès !')).toBeInTheDocument();
        });
    });

    test('erreur de chargement affiche le toast d\'erreur', async () => {
        mockAxios.get.mockRejectedValue(new Error('Not found'));
        render(<RecetteForm />);

        await waitFor(() => {
            expect(screen.getByText('Impossible de charger la recette.')).toBeInTheDocument();
        });
    });
});
