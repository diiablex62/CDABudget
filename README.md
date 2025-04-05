# Cda Budget - Application de Budgétisation Personnelle [ En cours !] 👨‍💻

Vous pouvez visualiser le front end de ce projet en ligne ici : https://budgetcda.netlify.app/

Cda budget est une application web conçue pour aider les individus à gérer leurs finances personnelles de manière simple et efficace. Elle offre une interface intuitive pour suivre vos dépenses, planifier votre budget et obtenir une vue d'ensemble claire de votre santé financière.

## Fonctionnalités clés

- **Suivi facile des dépenses :** 👛 Enregistrez et catégorisez vos dépenses rapidement et facilement.
- **Planification budgétaire flexible :** 🗓️ Définissez des budgets personnalisés pour différentes catégories de dépenses et suivez votre progression.
- **Vue d'ensemble financière :** 🔍 Obtenez une vue claire et concise de votre situation financière, y compris vos revenus, vos dépenses et votre solde.
- **Mode sombre :** 🌙 Activez ou désactivez le mode sombre pour une meilleure expérience visuelle.
- **Connexion sécurisée :** 🔒 Connectez-vous avec votre email/mot de passe ou via Google grâce à l'intégration OAuth2.
- **Gestion des utilisateurs :** 👤 Modifiez vos informations utilisateur, comme votre email ou votre mot de passe.
- **Synchronisation en temps réel :** 🔄 Mettez à jour vos données financières en un clic grâce au bouton de synchronisation.
- **Visualisation des données :** 📊 Analysez vos habitudes de dépenses grâce à des tableaux interactifs.
- **Fonctionnalités récurrentes :** ♻️ Ajoutez des éléments récurrents pour automatiser vos dépenses ou revenus réguliers.

## Technologies utilisées

- **React :** ⚙️ Une bibliothèque JavaScript pour la construction d'interfaces utilisateur dynamiques et réactives. Nous avons choisi React pour sa performance et sa flexibilité.
- **Vite :** ⚡ Un outil de construction rapide et moderne qui améliore l'expérience de développement. Vite nous permet de bénéficier d'un rechargement instantané et d'une configuration simplifiée.
- **MongoDB :** 🗄️ Une base de données NoSQL pour stocker les utilisateurs et les données financières.
- **OAuth2 :** 🔑 Intégration avec Google pour une connexion sécurisée.

## Démarrage rapide

**Prérequis :**

- Node.js (version 16 ou supérieure) et npm (ou yarn/pnpm) installés. 💻
- Git installé. 🌿
- Un compte MongoDB avec une base de données configurée. 🗄️

**Étapes :**

1.  **Cloner le dépôt :** ⬇️
    ```bash
    git clone https://github.com/diiablex62/budget_CDA.git
    ```
2.  **Accéder au répertoire du projet :** 📁
    ```bash
    cd CDA-Budget
    ```
3.  **Installer les dépendances :** 📦
    ```bash
    npm install
    ```
4.  **Configurer les variables d'environnement :** 🛠️
    Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :
    ```properties
    VITE_GOOGLE_CLIENT_ID=Votre_Client_ID_Google
    VITE_BACKEND_URL=http://localhost:3000
    MONGO_URI=Votre_URI_MongoDB
    ```
5.  **Démarrer le serveur backend :** ▶️
    ```bash
    node server.js
    ```
6.  **Démarrer le serveur de développement frontend :** ▶️
    ```bash
    npm run dev
    ```

## Déploiement

1. **Frontend :** Déployez le frontend sur Netlify en connectant votre dépôt GitHub.
2. **Backend :** Configurez les fonctions serverless sur Netlify pour gérer les requêtes backend.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez ouvrir une issue ou soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.
