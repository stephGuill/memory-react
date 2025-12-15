# 📚 Tutoriel Pédagogique - Memory Game React

Ce document explique les concepts React utilisés dans ce projet, étape par étape.

---

## 🎯 Job 00 - Installation

### Objectif
Installer React et créer la structure de base du projet.

### Méthode
```bash
npx create-react-app memory-react
cd memory-react
npm start
```

### Ce qui se passe
- `create-react-app` crée automatiquement tous les fichiers nécessaires
- Un serveur de développement démarre sur http://localhost:3000
- Les modifications sont rechargées automatiquement (Hot Reload)

---

## 🎯 Job 01 - Conception

### Objectif
Planifier avant de coder pour éviter les erreurs.

### Wireframe du Jeu
```
┌─────────────────────────────────────┐
│         MEMORY GAME                 │
├─────────────────────────────────────┤
│  Coups: 0  | Temps: 00:00 | Paires: 0/8  │
├─────────────────────────────────────┤
│   [?] [?] [?] [?]                   │
│   [?] [?] [?] [?]                   │
│   [?] [?] [?] [?]                   │
│   [?] [?] [?] [?]                   │
├─────────────────────────────────────┤
│      [Nouvelle Partie]              │
└─────────────────────────────────────┘
```

### Charte Graphique
- **Couleurs** : Gradient violet/rose (#667eea → #764ba2)
- **Police** : System fonts (lisible et moderne)
- **Style** : Glassmorphism (effets de transparence)

---

## 🎯 Job 02 - Architecture

### Structure des Dossiers
```
src/
├── components/          # Tous les composants React
│   ├── Title/          # Composant titre
│   ├── Button/         # Composant bouton
│   └── Card/           # Composant carte
├── App.js              # Composant principal
├── App.css
├── index.js            # Point d'entrée
└── index.css
```

### Fichiers Supprimés (non nécessaires)
- ❌ `reportWebVitals.js`
- ❌ `setupTests.js`
- ❌ `App.test.js`

### Organisation Choisie
**Regroupement par fonctionnalité** : Chaque composant a son propre dossier avec son fichier JS et CSS.

---

## 🎯 Job 03 - Composants

### 1️⃣ Composant Title

**Fichier** : `src/components/Title/Title.js`

```javascript
import React from 'react';
import './Title.css';

function Title({ text }) {
  return (
    <h1 className="title">{text}</h1>
  );
}

export default Title;
```

**Explication** :
- `function Title({ text })` : Le composant est une fonction JavaScript
- `{ text }` : C'est une **prop** (propriété) qu'on peut passer au composant
- `return (...)` : Le composant retourne du JSX (HTML dans JavaScript)
- `export default Title` : Rend le composant accessible partout

**Utilisation dans App.js** :
```javascript
import Title from './components/Title/Title';

<Title text="Memory Game" />
```

---

### 2️⃣ Composant Button

**Fichier** : `src/components/Button/Button.js`

```javascript
import React from 'react';
import './Button.css';

function Button({ text, onClick, className = '' }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
```

**Props Utilisées** :
- `text` : Le texte du bouton
- `onClick` : La fonction à exécuter au clic
- `className` : Classes CSS supplémentaires (valeur par défaut: '')

**Exemple d'utilisation** :
```javascript
<Button 
  text="Nouvelle Partie" 
  onClick={initializeGame} 
/>
```

---

### 3️⃣ Composant Card

**Fichier** : `src/components/Card/Card.js`

```javascript
function Card({ card, handleCardClick, isFlipped, isMatched }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      handleCardClick(card);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={`card-inner ${isFlipped || isMatched ? 'flipped' : ''}`}>
        <div className="card-front">
          <span className="card-icon">?</span>
        </div>
        <div className="card-back">
          <span className="card-value">{card.value}</span>
        </div>
      </div>
    </div>
  );
}
```

**Animation CSS** (Card.css) :
```css
.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card-inner.flipped {
  transform: rotateY(180deg);  /* Rotation 3D */
}
```

**Explication de l'animation** :
- `preserve-3d` : Active les transformations 3D
- `rotateY(180deg)` : Fait pivoter la carte sur l'axe Y
- `backface-visibility: hidden` : Cache la face arrière pendant la rotation

---

## 🎯 Job 04 - Les States (useState)

### Qu'est-ce qu'un State ?

Un **state** est une variable spéciale qui :
1. Stocke des données
2. Déclenche un re-rendu du composant quand elle change
3. Persiste entre les rendus

### Exemple Simple

```javascript
import { useState } from 'react';

function Compteur() {
  const [score, setScore] = useState(0);

  return (
    <div>
      <p>Score: {score}</p>
      <button onClick={() => setScore(score + 1)}>
        +1 Point
      </button>
    </div>
  );
}
```

**Explication** :
- `useState(0)` : Initialise le state à 0
- `score` : Variable qui contient la valeur actuelle
- `setScore` : Fonction pour modifier le state
- Cliquer sur le bouton → `setScore(score + 1)` → Le composant se re-rend avec la nouvelle valeur

---

### States Utilisés dans le Jeu Memory

```javascript
const [cards, setCards] = useState([]);
const [flippedCards, setFlippedCards] = useState([]);
const [matchedPairs, setMatchedPairs] = useState([]);
const [moves, setMoves] = useState(0);
const [gameWon, setGameWon] = useState(false);
const [timer, setTimer] = useState(0);
const [isTimerRunning, setIsTimerRunning] = useState(false);
```

**Description de chaque state** :

| State | Type | Description |
|-------|------|-------------|
| `cards` | Array | Liste de toutes les cartes du jeu |
| `flippedCards` | Array | Cartes actuellement retournées (max 2) |
| `matchedPairs` | Array | Symboles des paires déjà trouvées |
| `moves` | Number | Nombre de coups joués |
| `gameWon` | Boolean | true si le jeu est gagné |
| `timer` | Number | Temps écoulé en secondes |
| `isTimerRunning` | Boolean | true si le timer est actif |

---

## 🎯 Job 05 - Logique du Jeu

### 1️⃣ Initialisation du Jeu

```javascript
const initializeGame = () => {
  // Créer les paires de cartes
  const shuffledCards = [...cardSymbols, ...cardSymbols]
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({
      id: index,
      value: value,
    }));

  setCards(shuffledCards);
  setFlippedCards([]);
  setMatchedPairs([]);
  setMoves(0);
  setGameWon(false);
  setTimer(0);
  setIsTimerRunning(false);
};
```

**Explication ligne par ligne** :
1. `[...cardSymbols, ...cardSymbols]` : Duplique le tableau (crée les paires)
2. `.sort(() => Math.random() - 0.5)` : Mélange aléatoirement
3. `.map(...)` : Transforme chaque symbole en objet avec `id` et `value`
4. `setCards(...)` : Met à jour le state avec les cartes

---

### 2️⃣ Gestion du Clic sur une Carte

```javascript
const handleCardClick = (card) => {
  // Démarrer le timer au premier clic
  if (moves === 0 && !isTimerRunning) {
    setIsTimerRunning(true);
  }

  // Ne rien faire si deux cartes sont déjà retournées
  if (flippedCards.length === 2) {
    return;
  }

  // Ne rien faire si la carte est déjà retournée
  if (flippedCards.find((c) => c.id === card.id)) {
    return;
  }

  const newFlippedCards = [...flippedCards, card];
  setFlippedCards(newFlippedCards);

  // Si deux cartes sont retournées
  if (newFlippedCards.length === 2) {
    setMoves(moves + 1);

    // Vérifier si les cartes correspondent
    if (newFlippedCards[0].value === newFlippedCards[1].value) {
      // Paire trouvée !
      const newMatchedPairs = [...matchedPairs, newFlippedCards[0].value];
      setMatchedPairs(newMatchedPairs);
      setFlippedCards([]);

      // Vérifier victoire
      if (newMatchedPairs.length === cardSymbols.length) {
        setGameWon(true);
        setIsTimerRunning(false);
      }
    } else {
      // Pas de correspondance, retourner après 1 seconde
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }
};
```

**Diagramme du flux** :
```
Clic sur carte
    ↓
Démarrer timer (si premier clic)
    ↓
Vérifications (déjà 2 cartes ? déjà retournée ?)
    ↓
Ajouter carte à flippedCards
    ↓
2 cartes retournées ?
    ↓
┌─────────────────┐
│  OUI            │  NON → Attendre le prochain clic
└─────────────────┘
    ↓
Incrémenter moves
    ↓
Cartes identiques ?
    ↓
┌──────────────┬──────────────┐
│  OUI         │  NON         │
└──────────────┴──────────────┘
    ↓               ↓
Ajouter à        Retourner
matchedPairs     après 1s
    ↓
Toutes paires trouvées ?
    ↓
┌──────────────┐
│  OUI → WIN!  │
└──────────────┘
```

---

### 3️⃣ Hook useEffect pour le Timer

```javascript
useEffect(() => {
  let interval = null;
  if (isTimerRunning) {
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  } else {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isTimerRunning]);
```

**Explication** :
- `useEffect` : Exécute du code après le rendu
- `setInterval` : Exécute une fonction toutes les 1000ms (1 seconde)
- `setTimer((prevTimer) => prevTimer + 1)` : Incrémente le timer
- `return () => clearInterval(interval)` : Nettoyage quand le composant est détruit

---

## 🎨 Concepts Avancés Utilisés

### 1. Rendu Conditionnel

```javascript
{gameWon && (
  <div className="victory-message">
    <h2>🎉 Félicitations ! 🎉</h2>
  </div>
)}
```
→ Affiche le message seulement si `gameWon` est true

### 2. Rendu de Listes

```javascript
{cards.map((card) => (
  <Card
    key={card.id}
    card={card}
    ...
  />
))}
```
→ Crée un composant Card pour chaque carte du tableau

### 3. Props et Callbacks

```javascript
<Card
  handleCardClick={handleCardClick}
/>
```
→ Passe une fonction comme prop pour communiquer du composant enfant vers le parent

---

## 🚀 Pour Aller Plus Loin

### Fonctionnalités à Ajouter

1. **Niveaux de Difficulté**
```javascript
const difficulties = {
  easy: 6,    // 6 paires
  medium: 8,  // 8 paires
  hard: 12    // 12 paires
};
```

2. **LocalStorage pour les Scores**
```javascript
localStorage.setItem('bestScore', JSON.stringify(score));
const savedScore = JSON.parse(localStorage.getItem('bestScore'));
```

3. **Animations avec Framer Motion**
```bash
npm install framer-motion
```

4. **Backend avec Express + MongoDB**
```javascript
// Sauvegarder les scores dans une base de données
fetch('/api/scores', {
  method: 'POST',
  body: JSON.stringify({ name, score, time })
});
```

---

## 📚 Ressources Utiles

- **Documentation React** : https://fr.react.dev/
- **MDN Web Docs** : https://developer.mozilla.org/fr/
- **CSS Tricks** : https://css-tricks.com/
- **React Hooks** : https://fr.react.dev/reference/react

---

**Félicitations ! Vous maîtrisez maintenant les bases de React ! 🎉**
