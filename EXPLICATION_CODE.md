# 📚 EXPLICATION DÉTAILLÉE DU CODE - Memory Game React

Ce document explique tous les concepts, variables, fonctions et constantes utilisés dans le projet.

---

## 📁 STRUCTURE DES FICHIERS

```
src/
├── index.js              # Point d'entrée de l'application
├── App.js                # Composant principal avec la logique du jeu
├── App.css               # Styles de l'application
├── index.css             # Styles globaux
└── components/
    ├── Title/
    │   ├── Title.js      # Composant titre
    │   └── Title.css     # Styles du titre
    ├── Button/
    │   ├── Button.js     # Composant bouton
    │   └── Button.css    # Styles du bouton
    └── Card/
        ├── Card.js       # Composant carte
        └── Card.css      # Styles et animation de la carte
```

---

## 🎯 FICHIER : src/index.js

### Rôle
Point d'entrée de l'application React. C'est le premier fichier JavaScript exécuté.

### Code principal

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
```
- **`ReactDOM.createRoot()`** : Crée une racine React
- **`document.getElementById('root')`** : Trouve la div avec `id="root"` dans `public/index.html`
- **`root`** : Variable qui stocke la racine de l'application

```javascript
root.render(<App />);
```
- **`root.render()`** : Affiche le composant App dans la div root
- **`<App />`** : Syntaxe JSX pour utiliser le composant App

### Flux d'exécution
1. Navigateur charge `public/index.html`
2. `index.html` contient `<div id="root"></div>`
3. `index.js` crée une racine React sur cette div
4. Le composant `App` est affiché dans la racine

---

## 🎮 FICHIER : src/App.js

### Rôle
Composant principal contenant toute la logique du jeu Memory.

---

### 📌 CONSTANTE : cardSymbols

```javascript
const cardSymbols = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰'];
```

**Type :** Tableau (Array)  
**Contenu :** 8 emojis uniques  
**Utilisation :** Symboles pour créer les paires de cartes  
**Note :** Sera dupliqué pour obtenir 16 cartes (8 paires)

---

### 🔄 STATES (Variables d'état)

#### 1. `cards` et `setCards`
```javascript
const [cards, setCards] = useState([]);
```
- **Type :** Array d'objets
- **Contenu :** Toutes les cartes du jeu
- **Structure d'un élément :** `{ id: 0, value: '🎮' }`
- **Exemple :** 
  ```javascript
  [
    { id: 0, value: '🎮' },
    { id: 1, value: '🎯' },
    { id: 2, value: '🎮' },
    // ... 13 autres cartes
  ]
  ```

#### 2. `flippedCards` et `setFlippedCards`
```javascript
const [flippedCards, setFlippedCards] = useState([]);
```
- **Type :** Array d'objets
- **Contenu :** Cartes actuellement retournées (max 2)
- **Exemple :** `[{ id: 3, value: '🎨' }, { id: 7, value: '🎨' }]`
- **Usage :** Stocker temporairement les cartes cliquées pour vérifier si c'est une paire

#### 3. `matchedPairs` et `setMatchedPairs`
```javascript
const [matchedPairs, setMatchedPairs] = useState([]);
```
- **Type :** Array de strings
- **Contenu :** Symboles des paires trouvées
- **Exemple :** `['🎮', '🎯', '🎨']` = 3 paires trouvées
- **Usage :** Savoir quelles cartes doivent rester retournées

#### 4. `moves` et `setMoves`
```javascript
const [moves, setMoves] = useState(0);
```
- **Type :** Number
- **Contenu :** Nombre de tentatives du joueur
- **Incrémenté quand :** 2 cartes sont retournées
- **Usage :** Afficher le score et les statistiques

#### 5. `gameWon` et `setGameWon`
```javascript
const [gameWon, setGameWon] = useState(false);
```
- **Type :** Boolean
- **Valeurs possibles :** `true` (gagné) ou `false` (en cours)
- **Change quand :** Toutes les paires sont trouvées
- **Usage :** Afficher le message de victoire

#### 6. `timer` et `setTimer`
```javascript
const [timer, setTimer] = useState(0);
```
- **Type :** Number
- **Contenu :** Secondes écoulées depuis le début
- **S'incrémente :** Toutes les secondes (1000ms)
- **Usage :** Chronomètre du jeu

#### 7. `isTimerRunning` et `setIsTimerRunning`
```javascript
const [isTimerRunning, setIsTimerRunning] = useState(false);
```
- **Type :** Boolean
- **Valeurs :** `true` (timer actif) ou `false` (timer arrêté)
- **Démarre :** Au premier clic sur une carte
- **S'arrête :** Quand le jeu est gagné
- **Usage :** Contrôler le chronomètre

---

### 🪝 HOOKS useEffect

#### useEffect #1 : Initialisation du jeu
```javascript
useEffect(() => {
  initializeGame();
}, []);
```
- **Quand :** Une seule fois au chargement du composant
- **Dépendances :** `[]` (tableau vide) = exécution unique
- **Action :** Appelle `initializeGame()` pour préparer les cartes

#### useEffect #2 : Gestion du timer
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
- **Quand :** Chaque fois que `isTimerRunning` change
- **Dépendances :** `[isTimerRunning]`
- **Si `isTimerRunning = true` :**
  - Démarre un intervalle qui incrémente `timer` chaque seconde
- **Si `isTimerRunning = false` :**
  - Arrête l'intervalle
- **`return () => clearInterval(interval)` :**
  - Fonction de nettoyage pour éviter les fuites mémoire

---

### 🔧 FONCTIONS

#### 1. `initializeGame()`
```javascript
const initializeGame = () => {
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

**Rôle :** Créer un nouveau jeu ou réinitialiser le jeu actuel

**Étapes détaillées :**

1. **`[...cardSymbols, ...cardSymbols]`**
   - Spread operator `...` duplique le tableau
   - Résultat : 16 éléments (8 symboles × 2)

2. **`.sort(() => Math.random() - 0.5)`**
   - Mélange aléatoirement le tableau
   - `Math.random()` retourne un nombre entre 0 et 1
   - Si < 0.5 : ordre négatif
   - Si > 0.5 : ordre positif

3. **`.map((value, index) => ({ ... }))`**
   - Transforme chaque emoji en objet
   - `value` : l'emoji actuel
   - `index` : position (0, 1, 2, ...)
   - Retourne : `{ id: index, value: emoji }`

4. **Réinitialisation des states**
   - Tous les states reviennent à leur valeur initiale

---

#### 2. `handleCardClick(card)`
```javascript
const handleCardClick = (card) => {
  // Démarrer le timer
  if (moves === 0 && !isTimerRunning) {
    setIsTimerRunning(true);
  }

  // Bloquer si 2 cartes sont déjà retournées
  if (flippedCards.length === 2) {
    return;
  }

  // Bloquer si la carte est déjà retournée
  if (flippedCards.find((c) => c.id === card.id)) {
    return;
  }

  // Ajouter la carte aux cartes retournées
  const newFlippedCards = [...flippedCards, card];
  setFlippedCards(newFlippedCards);

  // Si 2 cartes sont retournées
  if (newFlippedCards.length === 2) {
    setMoves(moves + 1);

    // Vérifier si c'est une paire
    if (newFlippedCards[0].value === newFlippedCards[1].value) {
      // Paire trouvée
      const newMatchedPairs = [...matchedPairs, newFlippedCards[0].value];
      setMatchedPairs(newMatchedPairs);
      setFlippedCards([]);

      // Vérifier victoire
      if (newMatchedPairs.length === cardSymbols.length) {
        setGameWon(true);
        setIsTimerRunning(false);
      }
    } else {
      // Pas de paire : retourner après 1 seconde
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }
};
```

**Paramètre :** `card` - objet `{ id: nombre, value: emoji }`

**Rôle :** Gérer la logique quand on clique sur une carte

**Flux d'exécution :**

1. **Premier clic du jeu :**
   - Si `moves === 0` et timer non démarré
   - Démarre le chronomètre

2. **Vérifications de sécurité :**
   - Si 2 cartes déjà retournées → bloquer
   - Si carte déjà retournée → bloquer

3. **Ajouter la carte :**
   - Créer nouveau tableau avec carte cliquée
   - Mettre à jour `flippedCards`

4. **Si 2 cartes retournées :**
   - Incrémenter `moves`
   - **Si paire trouvée :**
     - Ajouter symbole à `matchedPairs`
     - Vider `flippedCards`
     - Vérifier victoire
   - **Si pas de paire :**
     - Attendre 1 seconde
     - Retourner les cartes (vider `flippedCards`)

**Méthodes utilisées :**

- **`.find()`** : Cherche un élément dans un tableau
  ```javascript
  flippedCards.find((c) => c.id === card.id)
  ```
  Retourne l'élément si trouvé, sinon `undefined`

- **`setTimeout()`** : Exécute une fonction après un délai
  ```javascript
  setTimeout(() => { ... }, 1000)
  ```
  1000 = 1000 millisecondes = 1 seconde

---

#### 3. `formatTime(seconds)`
```javascript
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
```

**Paramètre :** `seconds` - nombre de secondes (ex: 125)

**Rôle :** Convertir les secondes en format "MM:SS"

**Étapes :**

1. **`Math.floor(seconds / 60)`**
   - Divise par 60 pour obtenir les minutes
   - `Math.floor()` arrondit vers le bas
   - Exemple : 125 / 60 = 2.08 → 2 minutes

2. **`seconds % 60`**
   - Modulo : reste de la division
   - Exemple : 125 % 60 = 5 secondes

3. **`.toString().padStart(2, '0')`**
   - Convertit en chaîne
   - Ajoute un 0 devant si < 2 chiffres
   - Exemple : 5 → "05"

4. **Template literal**
   - Backticks `` ` `` permettent l'interpolation
   - `${variable}` : insérer une variable
   - Résultat : "02:05"

---

### 🖼️ RENDU JSX

#### Structure générale
```javascript
return (
  <div className="App">
    <Title />
    <div className="game-info">...</div>
    <div className="cards-grid">...</div>
    {gameWon && <div>...</div>}
    <Button />
  </div>
);
```

#### Rendu conditionnel
```javascript
{gameWon && <div className="victory-message">...</div>}
```
- **Syntaxe :** `{condition && <element>}`
- **Si `gameWon = true` :** affiche le message
- **Si `gameWon = false` :** n'affiche rien

#### Rendu de liste
```javascript
{cards.map((card) => (
  <Card
    key={card.id}
    card={card}
    // ...
  />
))}
```
- **`.map()`** : Parcourt chaque élément du tableau
- **`key`** : Identifiant unique requis par React
- Crée un composant `Card` pour chaque carte

#### Props des composants

**Card :**
```javascript
<Card
  key={card.id}
  card={card}
  handleCardClick={handleCardClick}
  isFlipped={flippedCards.some((c) => c.id === card.id)}
  isMatched={matchedPairs.includes(card.value)}
/>
```

- **`key={card.id}`** : Identifiant unique pour React
- **`card={card}`** : Passe l'objet carte complet
- **`handleCardClick={handleCardClick}`** : Passe la fonction
- **`isFlipped`** : Vérifie si la carte est dans `flippedCards`
  - `.some()` : retourne `true` si au moins un élément correspond
- **`isMatched`** : Vérifie si le symbole est dans `matchedPairs`
  - `.includes()` : retourne `true` si l'élément est présent

---

## 🎨 COMPOSANT : Title.js

### Code
```javascript
function Title({ text }) {
  return <h1 className="title">{text}</h1>;
}
```

### Paramètres
- **`text`** : Chaîne de caractères à afficher

### Utilisation
```javascript
<Title text="Memory Game" />
```
Affiche : **Memory Game** (stylisé avec Title.css)

---

## 🔘 COMPOSANT : Button.js

### Code
```javascript
function Button({ text, onClick, className = '' }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
```

### Paramètres
- **`text`** : Texte du bouton
- **`onClick`** : Fonction à exécuter au clic
- **`className`** : Classes CSS supplémentaires (défaut : `''`)

### Utilisation
```javascript
<Button text="Nouvelle Partie" onClick={initializeGame} />
```

### Valeur par défaut
```javascript
className = ''
```
- Syntaxe ES6 pour paramètre par défaut
- Si `className` n'est pas fourni, sa valeur est `''`

---

## 🃏 COMPOSANT : Card.js

### Code
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

### Paramètres
- **`card`** : Objet `{ id, value }`
- **`handleCardClick`** : Fonction du parent
- **`isFlipped`** : Booléen (carte retournée ?)
- **`isMatched`** : Booléen (paire trouvée ?)

### Fonction interne : `handleClick()`
```javascript
const handleClick = () => {
  if (!isFlipped && !isMatched) {
    handleCardClick(card);
  }
};
```
- Vérifie si la carte peut être cliquée
- Appelle la fonction du parent si OK
- Bloque si carte déjà retournée ou appariée

### Classe dynamique
```javascript
className={`card-inner ${isFlipped || isMatched ? 'flipped' : ''}`}
```
- **Condition ternaire :** `condition ? valeurSiVrai : valeurSiFaux`
- **Si retournée ou appariée :** ajoute classe `flipped`
- **Sinon :** pas de classe supplémentaire
- La classe `flipped` déclenche l'animation CSS

### Structure HTML
- **`.card-front`** : Face cachée (?)
- **`.card-back`** : Face révélée (emoji)
- **`.card-inner`** : Div qui pivote avec l'animation

---

## 📊 CONCEPTS JAVASCRIPT AVANCÉS

### 1. Spread Operator (...)
```javascript
[...cardSymbols, ...cardSymbols]
```
- Duplique/étale un tableau
- Équivalent à : `cardSymbols.concat(cardSymbols)`

### 2. Destructuration
```javascript
const [cards, setCards] = useState([]);
```
- Extrait les valeurs d'un tableau
- `useState()` retourne `[valeur, fonction]`

```javascript
function Title({ text }) { ... }
```
- Extrait `text` des props
- Équivalent à : `function Title(props) { props.text }`

### 3. Arrow Functions (fonctions fléchées)
```javascript
const handleClick = () => { ... }
```
- Syntaxe moderne ES6
- Équivalent à : `function handleClick() { ... }`

### 4. Template Literals
```javascript
`${mins}:${secs}`
```
- Backticks `` ` `` pour créer des chaînes
- `${}` : interpole des variables

### 5. Opérateurs logiques

**|| (OU) :**
```javascript
isFlipped || isMatched
```
- `true` si au moins une condition est vraie

**&& (ET) :**
```javascript
condition && <element>
```
- Si condition vraie : retourne `<element>`
- Si condition fausse : retourne `false` (rien n'est affiché)

**! (NON) :**
```javascript
!isFlipped
```
- Inverse le booléen
- `true` devient `false`, `false` devient `true`

### 6. Méthodes de tableaux

**`.map()`** : Transformer chaque élément
```javascript
array.map((element, index) => { ... })
```

**`.find()`** : Trouver un élément
```javascript
array.find((element) => condition)
```

**`.some()`** : Vérifier si au moins un élément correspond
```javascript
array.some((element) => condition)
```

**`.includes()`** : Vérifier si un élément existe
```javascript
array.includes(valeur)
```

**`.sort()`** : Trier un tableau
```javascript
array.sort((a, b) => a - b)
```

---

## 🎯 FLUX COMPLET DU JEU

### 1. Initialisation
```
App.js se monte
  ↓
useEffect() s'exécute
  ↓
initializeGame() est appelé
  ↓
16 cartes sont créées et mélangées
  ↓
Toutes les cartes sont face cachée
```

### 2. Clic sur une carte
```
Utilisateur clique sur une carte
  ↓
handleClick() du composant Card
  ↓
Vérifie si clic autorisé
  ↓
handleCardClick(card) dans App.js
  ↓
Démarre le timer (si premier clic)
  ↓
Ajoute la carte à flippedCards
  ↓
React re-rend le composant
  ↓
La carte se retourne (classe flipped)
```

### 3. Deux cartes retournées
```
2 cartes dans flippedCards
  ↓
Incrémenter moves
  ↓
Comparer les valeurs
  ↓
┌─────────────┬─────────────┐
│ Paire OK    │ Pas de paire│
└─────────────┴─────────────┘
      ↓              ↓
Ajouter à      Attendre 1s
matchedPairs        ↓
      ↓         Retourner
Vider flippedCards
      ↓
Vérifier victoire
      ↓
Si toutes les paires → gameWon = true
```

---

## 🔍 GLOSSAIRE

| Terme | Définition |
|-------|------------|
| **Composant** | Fonction JavaScript qui retourne du JSX (HTML dans JS) |
| **Props** | Données passées d'un composant parent à un enfant |
| **State** | Variable qui déclenche un re-rendu quand elle change |
| **Hook** | Fonction React qui ajoute des fonctionnalités (useState, useEffect) |
| **JSX** | Syntaxe mélant HTML et JavaScript |
| **Callback** | Fonction passée en paramètre à une autre fonction |
| **Re-rendu** | React recalcule et met à jour l'affichage |
| **Destructuration** | Extraire des valeurs d'un objet ou tableau |
| **Spread operator** | `...` pour étaler/copier un tableau/objet |
| **Template literal** | Chaîne avec backticks permettant l'interpolation |
| **Arrow function** | Fonction fléchée ES6 : `() => {}` |
| **Ternaire** | Opérateur conditionnel : `condition ? vrai : faux` |

---

## 📝 RÉSUMÉ

### Fichiers principaux
- **index.js** : Monte l'application React
- **App.js** : Logique du jeu + tous les states
- **Title.js** : Affiche le titre
- **Button.js** : Bouton réutilisable
- **Card.js** : Carte avec animation flip

### States importants
- **cards** : Toutes les cartes
- **flippedCards** : Cartes retournées (max 2)
- **matchedPairs** : Paires trouvées
- **gameWon** : Jeu terminé ?

### Fonctions clés
- **initializeGame()** : Créer/réinitialiser le jeu
- **handleCardClick(card)** : Logique du clic
- **formatTime(seconds)** : Formater le chronomètre

### Concepts React
- **useState** : Gérer l'état
- **useEffect** : Effets de bord
- **Props** : Passer des données
- **Rendu conditionnel** : `{condition && <element>}`
- **Rendu de liste** : `.map()`

---

**Tous les fichiers du projet ont maintenant des commentaires détaillés ligne par ligne ! 🎉**
