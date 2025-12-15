// ============================================================================
// COMPOSANT TITLE - Affiche le titre du jeu
// ============================================================================
// Composant simple et réutilisable pour afficher un titre stylisé
// ============================================================================

// Import de React (nécessaire pour utiliser JSX)
import React from 'react';

// Import du fichier CSS spécifique à ce composant
import './Title.css';

// ============================================================================
// FONCTION DU COMPOSANT
// ============================================================================

// Déclaration d'une fonction Title (composant fonctionnel React)
// { text } : déstructuration des props (équivalent à props.text)
// Les props sont les données passées au composant depuis le parent
function Title({ text }) {
  // -------------------------
  // RENDU JSX
  // -------------------------
  
  // return : ce que le composant affiche
  return (
    // <h1> : balise HTML de titre de niveau 1
    // className="title" : classe CSS pour styliser le titre (voir Title.css)
    // {text} : affiche la valeur de la prop text (interpolation JavaScript)
    // Exemple : si text="Memory Game", affiche "Memory Game"
    <h1 className="title">{text}</h1>
  );
}

// ============================================================================
// EXPORT
// ============================================================================

// export default : permet d'importer ce composant ailleurs
// Utilisation : import Title from './components/Title/Title'
export default Title;

// ============================================================================
// EXEMPLE D'UTILISATION
// ============================================================================
// <Title text="Memory Game" />  => Affiche : Memory Game
// <Title text="Bienvenue" />    => Affiche : Bienvenue
// ============================================================================
