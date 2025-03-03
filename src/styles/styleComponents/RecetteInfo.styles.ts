import styled from "styled-components";

export const RecetteDetailsWrapper = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 3%;
`;

// Le bouton "Retour"
export const BackButton = styled.button`
    background-color: #f8abc2;
    color: black;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #cf93a6;
    }
`;

// Le titre principal
export const RecetteTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-top: 20px;
`;

// Le paragraphe pour les informations de la recette
export const RecetteDetails = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

// La liste des tags
export const TagList = styled.div`
  margin-top: 20px;
`;

export const Tag = styled.span`
    background-color: #f8abc2;
    color: black;
    font-size: 14px;
    padding: 8px 12px;
    margin-right: 5px;
    margin-left: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;


    &:hover {
        background-color: #cf93a6;
    }
`;

// Listes d'ingrédients et d'étapes
export const ListWrapper = styled.div`
  margin-top: 20px;
`;

export const ListTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

export const IngredientList = styled.ul`
    list-style: none !important; /* Cette règle devrait garantir qu'aucune puce n'est affichée */
  padding: 0; /* Enlever les espacements par défaut */
  margin: 0; /* Enlever les marges */
`;

export const StepsList = styled.ul`
    list-style: none !important; /* Cette règle devrait garantir qu'aucune puce n'est affichée */
  padding: 0; /* Enlever les espacements par défaut */
  margin: 0; /* Enlever les marges */
`;

export const ListItem = styled.li`
    font-size: 1rem;
    color: #555;
    margin-bottom: 8px;
    position: relative;
    list-style-type: none;

    
`;