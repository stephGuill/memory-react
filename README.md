# 🎮 Memory Game - React

Jeu de Memory développé avec React, suivant le tutoriel de formation.

---

## 📦 Installation Rapide

### 1. Installer Node.js
Téléchargez et installez Node.js depuis : https://nodejs.org/

### 2. Installer les dépendances
```powershell
npm install
```

### 3. Lancer le projet
```powershell
npm start
```

Le jeu s'ouvrira automatiquement sur http://localhost:3000

---

## 📖 Documentation

- **GUIDE.md** - Guide complet d'installation et d'utilisation
- **TUTORIEL.md** - Explication détaillée de tous les concepts React
- **README.md** - Ce fichier

---

## ✅ Fonctionnalités Implémentées

### Obligatoires
- ✅ Composant Title
- ✅ Composant Button (générique et réutilisable)
- ✅ Composant Card
- ✅ Animation de retournement des cartes
- ✅ Bouton "Nouvelle Partie"
- ✅ Message de victoire

### Bonus
- ⭐ Timer automatique
- ⭐ Compteur de coups
- ⭐ Compteur de paires
- ⭐ Design moderne avec gradients
- ⭐ Animations fluides
- ⭐ Responsive design

---

## 📁 Structure du Projet

```
memory-react/
│
├── public/
│   ├── index.html              # Point d'entrée HTML
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── Title/
│   │   │   ├── Title.js        # Composant titre
│   │   │   └── Title.css
│   │   ├── Button/
│   │   │   ├── Button.js       # Composant bouton réutilisable
│   │   │   └── Button.css
│   │   └── Card/
│   │       ├── Card.js         # Composant carte avec animation 3D
│   │       └── Card.css
│   │
│   ├── App.js                  # Composant principal + logique du jeu
│   ├── App.css                 # Styles de l'application
│   ├── index.js                # Point d'entrée React
│   └── index.css               # Styles globaux
│
├── .gitignore
├── package.json                # Dépendances et scripts
├── GUIDE.md                    # Guide d'installation
├── TUTORIEL.md                 # Tutoriel pédagogique complet
└── README.md                   # Ce fichier
```

---

## 🎯 Concepts React Appris

### 1. Composants
- Création de composants fonctionnels
- Composants réutilisables
- Organisation du code

### 2. Props
- Passage de données entre composants
- Props obligatoires et optionnelles
- Valeurs par défaut

### 3. Hooks
- **useState** : Gestion de l'état
- **useEffect** : Effets de bord (timer)

### 4. Événements
- Gestion des clics utilisateur
- Callbacks entre composants

### 5. Rendu
- Rendu conditionnel
- Rendu de listes avec .map()
- Keys pour les listes

---

## 🎮 Comment Jouer

1. Cliquez sur une carte pour la retourner
2. Cliquez sur une deuxième carte
3. Si elles sont identiques, elles restent retournées
4. Sinon, elles se retournent automatiquement
5. Trouvez toutes les paires pour gagner !

**Statistiques affichées :**
- Nombre de coups
- Temps écoulé
- Nombre de paires trouvées

---

## 🛠️ Scripts Disponibles

```powershell
# Démarrer en mode développement
npm start

# Créer une version de production
npm run build

# Lancer les tests
npm test
```

---

## 🎨 Personnalisation

### Modifier les Symboles des Cartes

Dans `src/App.js`, ligne 7 :
```javascript
const cardSymbols = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰'];
```

### Modifier les Couleurs

Dans `src/index.css` et `src/App.css`, changez les gradients :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## 🚀 Améliorations Possibles

- [ ] Système de niveaux (facile, moyen, difficile)
- [ ] Sauvegarde des scores dans localStorage
- [ ] Backend avec API REST
- [ ] Base de données pour tableau des scores
- [ ] Mode multijoueur
- [ ] Effets sonores

---

## 📚 Ressources

- [Documentation React](https://fr.react.dev/)
- [Create React App](https://create-react-app.dev/)
- [MDN Web Docs](https://developer.mozilla.org/fr/)

---

**Bon courage et amusez-vous bien ! 🎮🎉**
