// ============================================================================
// COMPOSANT BUTTON - Bouton réutilisable et générique
// ============================================================================
// Ce composant peut être utilisé partout dans l'application avec différents
// textes et actions (onClick)
// ============================================================================

// Import de React
import React from 'react';

// Import du fichier CSS pour styliser le bouton
import './Button.css';

// ============================================================================
// FONCTION DU COMPOSANT
// ============================================================================

// Composant Button avec 3 props :
// - text : le texte affiché sur le bouton
// - onClick : la fonction à exécuter quand on clique
// - className : classes CSS supplémentaires (valeur par défaut = chaîne vide)
function Button({ text, onClick, className = '' }) {
  // -------------------------
  // PROPS EXPLIQUÉES
  // -------------------------
  
  // text : chaîne de caractères (ex: "Nouvelle Partie")
  // onClick : fonction de callback (ex: initializeGame)
  // className = '' : valeur par défaut si la prop n'est pas fournie
  //                  Le = '' est la syntaxe pour une valeur par défaut
  
  // -------------------------
  // RENDU JSX
  // -------------------------
  
  return (
    // <button> : élément HTML de bouton cliquable
    
    // className : combinaison de classes CSS
    // Template literal (backticks) permet d'insérer des variables dans une chaîne
    // `btn ${className}` : classe "btn" + classes supplémentaires
    // Exemple : si className="primary", résultat = "btn primary"
    // Exemple : si className="", résultat = "btn "
    
    // onClick : gestionnaire d'événement React
    // Quand l'utilisateur clique sur le bouton, la fonction onClick est exécutée
    // C'est la fonction passée en prop depuis le composant parent
    <button className={`btn ${className}`} onClick={onClick}>
      {/* {text} : affiche le texte passé en prop */}
      {text}
    </button>
  );
}

// ============================================================================
// EXPORT
// ============================================================================

// Export du composant pour pouvoir l'utiliser ailleurs
export default Button;

// ============================================================================
// EXEMPLES D'UTILISATION
// ============================================================================
// <Button text="Cliquez ici" onClick={maFonction} />
// => Bouton qui affiche "Cliquez ici" et exécute maFonction au clic
//
// <Button text="Valider" onClick={() => alert('OK')} className="big" />
// => Bouton avec classe CSS supplémentaire "big"
// ============================================================================
