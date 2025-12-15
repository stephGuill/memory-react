// ============================================================================
// IMPORTS - Importation des modules et composants nécessaires
// ============================================================================

// Import de React et des hooks (useState pour gérer l'état, useEffect pour les effets de bord)
import React, { useState, useEffect } from 'react';

// Import du fichier CSS pour styliser ce composant
import './App.css';

// Import des composants enfants que nous avons créés
import Title from './components/Title/Title';   // Composant pour afficher le titre
import Button from './components/Button/Button'; // Composant bouton réutilisable
import Card from './components/Card/Card';       // Composant carte du jeu

// ============================================================================
// CONSTANTES GLOBALES
// ============================================================================

// Tableau contenant les 8 symboles uniques qui seront utilisés pour les cartes
// Chaque symbole sera dupliqué pour créer les paires (16 cartes au total)
const cardSymbols = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰'];

// ============================================================================
// COMPOSANT PRINCIPAL APP
// ============================================================================

function App() {
  // ==========================================================================
  // STATES - Variables d'état qui déclenchent un re-rendu quand elles changent
  // ==========================================================================
  
  // cards : Tableau contenant toutes les cartes du jeu (16 cartes)
  // Chaque carte est un objet avec { id: nombre, value: emoji }
  // setCards : Fonction pour modifier le state cards
  const [cards, setCards] = useState([]);
  
  // flippedCards : Tableau des cartes actuellement retournées (maximum 2)
  // Contient les objets carte que le joueur a cliqué
  // setFlippedCards : Fonction pour modifier le state flippedCards
  const [flippedCards, setFlippedCards] = useState([]);
  
  // matchedPairs : Tableau contenant les symboles des paires déjà trouvées
  // Exemple : ['🎮', '🎯'] signifie que ces 2 paires ont été trouvées
  // setMatchedPairs : Fonction pour modifier le state matchedPairs
  const [matchedPairs, setMatchedPairs] = useState([]);
  
  // moves : Nombre de coups joués par le joueur (nombre de tentatives)
  // Incrémenté chaque fois que 2 cartes sont retournées
  // setMoves : Fonction pour modifier le state moves
  const [moves, setMoves] = useState(0);
  
  // gameWon : Booléen indiquant si le jeu est gagné (true) ou non (false)
  // Passe à true quand toutes les paires sont trouvées
  // setGameWon : Fonction pour modifier le state gameWon
  const [gameWon, setGameWon] = useState(false);
  
  // timer : Nombre de secondes écoulées depuis le début de la partie
  // S'incrémente de 1 chaque seconde
  // setTimer : Fonction pour modifier le state timer
  const [timer, setTimer] = useState(0);
  
  // isTimerRunning : Booléen indiquant si le chronomètre est actif
  // true = le timer compte, false = le timer est arrêté
  // setIsTimerRunning : Fonction pour modifier le state isTimerRunning
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // ==========================================================================
  // EFFET 1 - Initialisation du jeu au chargement du composant
  // ==========================================================================
  
  // useEffect est un hook qui exécute du code après le rendu du composant
  // Le tableau vide [] signifie : exécuter seulement une fois au montage du composant
  useEffect(() => {
    // Appeler la fonction initializeGame() pour préparer le jeu
    initializeGame();
  }, []); // [] = dépendances vides = ne s'exécute qu'une seule fois

  // ==========================================================================
  // EFFET 2 - Gestion du chronomètre
  // ==========================================================================
  
  // Ce useEffect gère le timer qui s'incrémente chaque seconde
  // Il s'exécute chaque fois que isTimerRunning change
  useEffect(() => {
    // Déclaration d'une variable pour stocker l'identifiant de l'intervalle
    let interval = null;
    
    // Si le timer doit être actif
    if (isTimerRunning) {
      // setInterval exécute une fonction toutes les X millisecondes (ici 1000ms = 1 seconde)
      interval = setInterval(() => {
        // Mettre à jour le timer en ajoutant 1 seconde
        // prevTimer est la valeur précédente du timer (garantit la bonne valeur)
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000); // 1000 millisecondes = 1 seconde
    } else {
      // Si le timer n'est pas actif, arrêter l'intervalle
      clearInterval(interval);
    }
    
    // Fonction de nettoyage : exécutée quand le composant est détruit
    // ou quand isTimerRunning change (avant le prochain useEffect)
    // Important pour éviter les fuites mémoire
    return () => clearInterval(interval);
  }, [isTimerRunning]); // Ce useEffect se ré-exécute quand isTimerRunning change

  // ==========================================================================
  // FONCTION - Initialiser ou réinitialiser le jeu
  // ==========================================================================
  
  // Cette fonction crée un nouveau jeu et remet tous les states à zéro
  // Elle est appelée au démarrage et quand on clique sur "Nouvelle Partie"
  const initializeGame = () => {
    // -------------------------
    // Création des cartes
    // -------------------------
    
    // Étape 1 : [...cardSymbols, ...cardSymbols]
    // Le spread operator (...) duplique le tableau cardSymbols
    // Résultat : ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰', '🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰']
    // On a maintenant 16 éléments (8 paires)
    
    // Étape 2 : .sort(() => Math.random() - 0.5)
    // Mélange aléatoirement le tableau
    // Math.random() retourne un nombre entre 0 et 1
    // Si résultat < 0.5 : ordre négatif (a avant b)
    // Si résultat > 0.5 : ordre positif (b avant a)
    // Cela crée un mélange aléatoire des cartes
    
    // Étape 3 : .map((value, index) => ({ id: index, value: value }))
    // Transforme chaque emoji en objet carte
    // value : l'emoji actuel (ex: '🎮')
    // index : la position dans le tableau (0, 1, 2, ...)
    // Retourne un objet : { id: 0, value: '🎮' }
    const shuffledCards = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,        // Identifiant unique pour chaque carte
        value: value,     // Le symbole de la carte (emoji)
      }));

    // -------------------------
    // Réinitialisation des states
    // -------------------------
    
    setCards(shuffledCards);        // Mettre à jour le tableau de cartes
    setFlippedCards([]);            // Aucune carte retournée
    setMatchedPairs([]);            // Aucune paire trouvée
    setMoves(0);                    // Remettre le compteur de coups à 0
    setGameWon(false);              // Le jeu n'est pas gagné
    setTimer(0);                    // Remettre le timer à 0
    setIsTimerRunning(false);       // Arrêter le timer
  };

  // ==========================================================================
  // FONCTION - Gérer le clic sur une carte
  // ==========================================================================
  
  // Cette fonction est appelée quand le joueur clique sur une carte
  // Paramètre : card (objet contenant { id: nombre, value: emoji })
  const handleCardClick = (card) => {
    // -------------------------
    // Vérification 1 : Démarrer le timer au premier clic
    // -------------------------
    
    // Si c'est le premier coup (moves === 0) ET que le timer n'est pas déjà lancé
    if (moves === 0 && !isTimerRunning) {
      setIsTimerRunning(true); // Démarrer le chronomètre
    }

    // -------------------------
    // Vérification 2 : Bloquer si 2 cartes sont déjà retournées
    // -------------------------
    
    // Si deux cartes sont déjà retournées, ne rien faire
    // (on attend qu'elles se retournent ou qu'elles restent visibles si c'est une paire)
    if (flippedCards.length === 2) {
      return; // Sortir de la fonction immédiatement
    }

    // -------------------------
    // Vérification 3 : Empêcher de cliquer deux fois sur la même carte
    // -------------------------
    
    // .find() cherche un élément dans le tableau flippedCards
    // Retourne l'élément si trouvé, sinon undefined
    // Si la carte cliquée est déjà dans flippedCards, ne rien faire
    if (flippedCards.find((c) => c.id === card.id)) {
      return; // Sortir de la fonction
    }

    // -------------------------
    // Ajouter la carte aux cartes retournées
    // -------------------------
    
    // Créer un nouveau tableau avec les cartes déjà retournées + la nouvelle carte
    // [...flippedCards] : copie du tableau existant
    // , card : ajout de la nouvelle carte
    const newFlippedCards = [...flippedCards, card];
    
    // Mettre à jour le state avec le nouveau tableau
    setFlippedCards(newFlippedCards);

    // -------------------------
    // Si deux cartes sont maintenant retournées
    // -------------------------
    
    if (newFlippedCards.length === 2) {
      // Incrémenter le compteur de coups (moves + 1)
      setMoves(moves + 1);

      // -------------------------
      // Vérifier si les deux cartes ont le même symbole
      // -------------------------
      
      // newFlippedCards[0] : première carte retournée
      // newFlippedCards[1] : deuxième carte retournée
      // .value : le symbole (emoji) de la carte
      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        // ✅ PAIRE TROUVÉE !
        
        // Ajouter le symbole de la paire trouvée au tableau matchedPairs
        const newMatchedPairs = [...matchedPairs, newFlippedCards[0].value];
        setMatchedPairs(newMatchedPairs);
        
        // Vider le tableau des cartes retournées (elles restent visibles car matched)
        setFlippedCards([]);

        // -------------------------
        // Vérifier si toutes les paires sont trouvées (victoire)
        // -------------------------
        
        // Si le nombre de paires trouvées === nombre de symboles uniques
        // Alors le joueur a gagné !
        if (newMatchedPairs.length === cardSymbols.length) {
          setGameWon(true);           // Marquer le jeu comme gagné
          setIsTimerRunning(false);   // Arrêter le chronomètre
        }
      } else {
        // ❌ PAS DE CORRESPONDANCE
        
        // setTimeout exécute une fonction après un délai (en millisecondes)
        // Ici : attendre 1000ms (1 seconde) avant de retourner les cartes
        // Cela donne le temps au joueur de voir les deux cartes
        setTimeout(() => {
          setFlippedCards([]); // Vider le tableau = retourner les cartes
        }, 1000); // 1000 millisecondes = 1 seconde
      }
    }
  };

  // ==========================================================================
  // FONCTION - Formater le temps en format MM:SS
  // ==========================================================================
  
  // Cette fonction convertit un nombre de secondes en format "minutes:secondes"
  // Paramètre : seconds (nombre de secondes, ex: 125)
  // Retourne : une chaîne formatée (ex: "02:05")
  const formatTime = (seconds) => {
    // Calculer les minutes : diviser les secondes par 60 et arrondir vers le bas
    // Math.floor() arrondit vers le bas (ex: 2.9 devient 2)
    // Exemple : 125 secondes / 60 = 2.08... => Math.floor = 2 minutes
    const mins = Math.floor(seconds / 60);
    
    // Calculer les secondes restantes : modulo (%) donne le reste de la division
    // Exemple : 125 % 60 = 5 secondes
    const secs = seconds % 60;
    
    // Créer la chaîne formatée avec template literals (backticks `)
    // .toString() : convertir le nombre en chaîne
    // .padStart(2, '0') : ajouter un 0 devant si le nombre a moins de 2 chiffres
    // Exemple : 2 => "02", 5 => "05"
    // Résultat final : "02:05"
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==========================================================================
  // RENDU JSX - Ce que le composant affiche à l'écran
  // ==========================================================================
  
  // return contient le JSX (HTML dans JavaScript) à afficher
  return (
    // Div principale avec la classe CSS "App"
    <div className="App">
      
      {/* ===================================================================
          COMPOSANT TITLE - Affiche le titre du jeu
          =================================================================== */}
      {/* Utilisation du composant Title avec la prop text */}
      {/* La prop text est passée au composant Title pour afficher "Memory Game" */}
      <Title text="Memory Game" />
      
      {/* ===================================================================
          SECTION INFO - Affiche les statistiques du jeu
          =================================================================== */}
      <div className="game-info">
        {/* --- Compteur de coups --- */}
        <div className="info-item">
          <span className="info-label">Coups:</span>
          {/* {moves} : affiche la valeur du state moves (interpolation) */}
          <span className="info-value">{moves}</span>
        </div>
        
        {/* --- Chronomètre --- */}
        <div className="info-item">
          <span className="info-label">Temps:</span>
          {/* Appelle formatTime(timer) pour afficher le temps au format MM:SS */}
          <span className="info-value">{formatTime(timer)}</span>
        </div>
        
        {/* --- Compteur de paires --- */}
        <div className="info-item">
          <span className="info-label">Paires:</span>
          {/* Affiche : nombre de paires trouvées / nombre total de paires */}
          {/* matchedPairs.length : nombre d'éléments dans le tableau */}
          {/* cardSymbols.length : 8 (nombre total de paires possibles) */}
          <span className="info-value">{matchedPairs.length}/{cardSymbols.length}</span>
        </div>
      </div>

      {/* ===================================================================
          GRILLE DE CARTES - Affiche toutes les cartes du jeu
          =================================================================== */}
      <div className="cards-grid">
        {/* .map() parcourt le tableau cards et crée un composant Card pour chaque carte */}
        {/* card : l'élément actuel du tableau (objet { id: X, value: emoji }) */}
        {cards.map((card) => (
          // key : identifiant unique requis par React pour les listes
          // Permet à React de savoir quelle carte a changé
          // card : passe l'objet carte complet au composant Card
          // handleCardClick : passe la fonction de clic au composant Card
          // isFlipped : vérifie si la carte est dans le tableau flippedCards
          //   .some() retourne true si au moins un élément correspond
          //   (c) => c.id === card.id : fonction qui compare les IDs
          // isMatched : vérifie si le symbole de la carte est dans matchedPairs
          //   .includes() retourne true si l'élément est dans le tableau
          <Card
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
            isFlipped={flippedCards.some((c) => c.id === card.id)}
            isMatched={matchedPairs.includes(card.value)}
          />
        ))}
      </div>

      {/* ===================================================================
          MESSAGE DE VICTOIRE - Affiché seulement si le jeu est gagné
          =================================================================== */}
      {/* Rendu conditionnel : affiche le contenu seulement si gameWon est true */}
      {/* Syntaxe : {condition && <element>} */}
      {gameWon && (
        <div className="victory-message">
          <h2>🎉 Félicitations ! 🎉</h2>
          {/* Affiche les statistiques finales : nombre de coups et temps total */}
          <p>Vous avez gagné en {moves} coups et {formatTime(timer)} !</p>
        </div>
      )}

      {/* ===================================================================
          BOUTON NOUVELLE PARTIE
          =================================================================== */}
      <div className="button-container">
        {/* Composant Button avec deux props : */}
        {/* text : le texte affiché sur le bouton */}
        {/* onClick : la fonction à exécuter quand on clique (initializeGame) */}
        <Button text="Nouvelle Partie" onClick={initializeGame} />
      </div>
    </div>
  );
}

// ============================================================================
// EXPORT - Rendre le composant accessible aux autres fichiers
// ============================================================================

// export default permet d'importer ce composant avec : import App from './App'
export default App;
