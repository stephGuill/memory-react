// ============================================================================
// COMPOSANT CARD - Carte du jeu Memory avec animation de retournement
// ============================================================================
// Chaque carte a deux faces : avant (?) et arrière (emoji)
// Elle peut être retournée (flipped) ou appariée (matched)
// ============================================================================

// Import de React
import React from 'react';

// Import du fichier CSS pour l'animation 3D de retournement
import './Card.css';

// ============================================================================
// FONCTION DU COMPOSANT
// ============================================================================

// Composant Card avec 4 props :
function Card({ card, handleCardClick, isFlipped, isMatched }) {
  // -------------------------
  // PROPS REÇUES
  // -------------------------
  
  // card : objet contenant { id: nombre, value: emoji }
  //        Exemple : { id: 5, value: '🎮' }
  
  // handleCardClick : fonction du parent (App.js) à appeler au clic
  //                   Gère la logique du jeu (vérifier les paires, etc.)
  
  // isFlipped : booléen (true/false)
  //             true = la carte est retournée (on voit l'emoji)
  //             false = la carte est face cachée (on voit le ?)
  
  // isMatched : booléen (true/false)
  //             true = la paire de cette carte a été trouvée
  //             false = la paire n'est pas encore trouvée
  
  // -------------------------
  // FONCTION LOCALE - Gérer le clic sur la carte
  // -------------------------
  
  // Fonction fléchée qui s'exécute quand on clique sur la carte
  const handleClick = () => {
    // Condition : on peut cliquer seulement si :
    // - La carte n'est PAS déjà retournée (!isFlipped)
    // - ET la carte n'est PAS déjà appariée (!isMatched)
    // Opérateur ! : négation (inverse true/false)
    if (!isFlipped && !isMatched) {
      // Appeler la fonction handleCardClick du parent (App.js)
      // En passant l'objet card en paramètre
      handleCardClick(card);
    }
    // Si la carte est déjà retournée ou appariée, ne rien faire
  };

  // -------------------------
  // RENDU JSX
  // -------------------------
  
  return (
    // Div externe de la carte
    // className="card" : classe CSS pour la taille et perspective 3D
    // onClick={handleClick} : appelle handleClick quand on clique dessus
    <div className="card" onClick={handleClick}>
      
      {/* Div interne qui contient les deux faces et gère l'animation */}
      {/*ClassName dynamique avec condition ternaire : */}
      {/* condition ? valeurSiVrai : valeurSiFaux */}
      {/* isFlipped || isMatched : si retournée OU appariée */}
      {/* || : opérateur OU (true si au moins une condition est vraie) */}
      {/* Si true : ajoute la classe "flipped" (rotation CSS) */}
      {/* Si false : ajoute une chaîne vide (pas de rotation) */}
      <div className={`card-inner ${isFlipped || isMatched ? 'flipped' : ''}`}>
        
        {/* ===== FACE AVANT (cachée) ===== */}
        {/* Affiche un point d'interrogation */}
        <div className="card-front">
          <span className="card-icon">?</span>
        </div>
        
        {/* ===== FACE ARRIÈRE (révélée quand retournée) ===== */}
        {/* Affiche l'emoji de la carte */}
        <div className="card-back">
          {/* {card.value} : affiche l'emoji (ex: '🎮') */}
          <span className="card-value">{card.value}</span>
        </div>
        
      </div>
    </div>
  );
}

// ============================================================================
// EXPORT
// ============================================================================

// Export du composant
export default Card;

// ============================================================================
// RÉSUMÉ DU FONCTIONNEMENT
// ============================================================================
// 1. La carte affiche "?" par défaut (face avant visible)
// 2. Quand on clique : handleClick() est appelé
// 3. Si la carte peut être retournée : handleCardClick(card) est appelé
// 4. Le parent (App.js) met à jour isFlipped à true
// 5. La classe "flipped" est ajoutée => animation CSS de rotation
// 6. La face arrière (emoji) devient visible
// 7. Si la paire est trouvée : isMatched devient true => carte reste retournée
// ============================================================================
