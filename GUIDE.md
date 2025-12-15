# Guide d'Installation et d'Utilisation - Memory Game React

## 📋 Prérequis

Avant de commencer, vous devez installer Node.js et npm sur votre système.

### Installation de Node.js (Windows)

1. Téléchargez Node.js depuis : https://nodejs.org/
2. Choisissez la version LTS (Long Term Support)
3. Lancez l'installateur et suivez les instructions
4. Vérifiez l'installation en ouvrant PowerShell et en tapant :
   ```powershell
   node --version
   npm --version
   ```

## 🚀 Installation du Projet

Une fois Node.js installé, suivez ces étapes :

1. Ouvrez PowerShell dans le dossier du projet
2. Installez les dépendances :
   ```powershell
   npm install
   ```

## ▶️ Lancer l'Application

Pour démarrer l'application en mode développement :

```powershell
npm start
```

L'application s'ouvrira automatiquement dans votre navigateur à l'adresse : http://localhost:3000

## 🎮 Comment Jouer

1. **Objectif** : Trouver toutes les paires de cartes identiques
2. **Règles** :
   - Cliquez sur une carte pour la retourner
   - Cliquez sur une deuxième carte
   - Si les deux cartes sont identiques, elles restent retournées
   - Si elles sont différentes, elles se retournent automatiquement
   - Le jeu est gagné quand toutes les paires sont trouvées

3. **Informations affichées** :
   - **Coups** : Nombre de tentatives effectuées
   - **Temps** : Durée de la partie
   - **Paires** : Nombre de paires trouvées

4. **Nouvelle Partie** : Cliquez sur le bouton "Nouvelle Partie" pour recommencer

## 📁 Structure du Projet

```
memory-react/
├── public/
│   ├── index.html          # Point d'entrée HTML
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Title/
│   │   │   ├── Title.js    # Composant Titre
│   │   │   └── Title.css
│   │   ├── Button/
│   │   │   ├── Button.js   # Composant Bouton réutilisable
│   │   │   └── Button.css
│   │   └── Card/
│   │       ├── Card.js     # Composant Carte avec animation
│   │       └── Card.css
│   ├── App.js              # Composant principal avec logique du jeu
│   ├── App.css
│   ├── index.js            # Point d'entrée React
│   └── index.css
├── package.json            # Dépendances du projet
└── README.md

```

## 🎨 Fonctionnalités Implémentées

### Obligatoires ✅
- ✅ Composant Title
- ✅ Composant Button générique et réutilisable
- ✅ Composant Card
- ✅ Bouton pour relancer la partie
- ✅ Animation sur le retournement des cartes
- ✅ Message de victoire

### Bonus ⭐
- ⭐ Timer qui démarre au premier clic
- ⭐ Compteur de coups
- ⭐ Compteur de paires trouvées
- ⭐ Design moderne avec gradient et effets
- ⭐ Responsive design (adaptable mobile)
- ⭐ Animations fluides

## 🔧 Technologies Utilisées

- **React 18** : Bibliothèque JavaScript
- **Hooks** : useState, useEffect
- **CSS3** : Animations et transitions
- **HTML5** : Structure

## 📝 Concepts React Appris

1. **Composants** : Création de composants réutilisables
2. **Props** : Passage de données entre composants
3. **State (useState)** : Gestion de l'état de l'application
4. **useEffect** : Gestion des effets de bord (timer)
5. **Événements** : Gestion des clics utilisateur
6. **Rendu conditionnel** : Affichage du message de victoire
7. **Listes et keys** : Affichage dynamique des cartes

## 🎯 Améliorations Possibles

- Système de niveaux (facile, moyen, difficile)
- Tableau des meilleurs scores
- Stockage des scores dans localStorage ou base de données
- Mode multijoueur
- Sons et effets sonores
- Plus de thèmes de cartes
- Statistiques détaillées

## ❓ Dépannage

### Problème : `npm` n'est pas reconnu
**Solution** : Installez Node.js depuis nodejs.org

### Problème : Port 3000 déjà utilisé
**Solution** : L'application vous demandera d'utiliser un autre port, acceptez en tapant `Y`

### Problème : Erreurs lors de `npm install`
**Solution** : 
1. Supprimez le dossier `node_modules`
2. Supprimez le fichier `package-lock.json`
3. Relancez `npm install`

## 📞 Support

Pour toute question, consultez la documentation officielle de React : https://fr.react.dev/

---

**Bon jeu ! 🎮**
