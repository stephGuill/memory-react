// ============================================================================
// FICHIER INDEX.JS - Point d'entrée de l'application React
// ============================================================================
// Ce fichier est le premier à être exécuté. Il monte l'application React
// dans le DOM HTML (dans la div avec id="root" du fichier public/index.html)
// ============================================================================

// Import de la bibliothèque React (nécessaire pour utiliser JSX)
import React from 'react';

// Import de ReactDOM : permet de manipuler le DOM avec React
// 'client' : version pour le rendu côté client (navigateur)
import ReactDOM from 'react-dom/client';

// Import du fichier CSS global qui s'applique à toute l'application
import './index.css';

// Import du composant principal App (notre application)
import App from './App';

// ============================================================================
// CRÉATION DE LA RACINE REACT
// ============================================================================

// ReactDOM.createRoot() crée un point d'ancrage React dans le DOM
// document.getElementById('root') : récupère la div avec id="root" du HTML
// Cette div se trouve dans public/index.html : <div id="root"></div>
// root : variable qui contient la racine de notre application React
const root = ReactDOM.createRoot(document.getElementById('root'));

// ============================================================================
// RENDU DE L'APPLICATION
// ============================================================================

// root.render() affiche notre application React dans la div root
root.render(
  // <React.StrictMode> : composant React qui active des vérifications supplémentaires
  // en mode développement (détecte les bugs potentiels, code obsolète, etc.)
  // Ne fait rien en production
  <React.StrictMode>
    {/* <App /> : notre composant principal qui contient tout le jeu */}
    <App />
  </React.StrictMode>
);

// ============================================================================
// RÉSUMÉ DU FLUX
// ============================================================================
// 1. Le navigateur charge public/index.html
// 2. index.html contient <div id="root"></div>
// 3. Ce fichier (index.js) est exécuté
// 4. On crée une racine React sur la div root
// 5. On affiche le composant App dans cette racine
// 6. App affiche tous les autres composants (Title, Button, Card, etc.)
// ============================================================================
