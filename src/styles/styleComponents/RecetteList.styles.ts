import styled from 'styled-components';

export const RecetteListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; /* Espace entre les cartes */
    justify-content: center; /* Centrer les cartes */
    padding: 1rem;
    //background-color: #096A09;
    //height: 100vh;
`;

export const RecetteCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.8rem; /* Réduit l'espace interne */
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 250px; /* Définit une largeur fixe pour la carte */
    height: 100px; /* Ajuste automatiquement la hauteur en fonction du contenu */
`;

export const RecetteName = styled.h3`
    margin: 0;
    font-size: 1.2rem; /* Taille du texte réduite */
    color: #333;
`;

export const RecetteDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem 0; /* Réduit l'espace entre les éléments */
    font-size: 0.9rem; /* Réduit la taille de la police */
    color: #666;
`;

export const RecetteRate = styled.span`
  color: #ff9800;
  font-weight: bold;
`;

export const RecetteDate = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

export const TagList = styled.div`
    display: flex;
    gap: 0.3rem; /* Réduit l'espace entre les tags */
    flex-wrap: wrap;
    margin-top: 0.5rem;
`;

export const Tag = styled.span`
    background-color: #00d69a;
    color: #174E4F;
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem; /* Réduit la taille des tags */
    border-radius: 16px;
    text-transform: capitalize;
`;

export const AddRecetteButton = styled.button`
    background-color: #00d69a;
    color: #000000;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 20%;
    margin-bottom: 1%;

    &:hover {
        background-color: #02b886;
    }
`;