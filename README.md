# 93Moove

93Moove est une application web dédiée à la gestion et à la promotion d'activités sportives, manuelles et culturelles pour l'association 93Moove à Saint-Ouen.

## Fonctionnalités (CRUD)

- **Gestion des Sessions** : Créer, consulter et s'inscrire à des activités.
- **Espace Admin** : Tableau de bord pour la gestion des utilisateurs et des activités.
- **Authentification** : Inscription et connexion pour les utilisateurs, instructeurs et administrateurs.

## Stack Technique

- **Framework** : Next.js 15
- **Base de données** : SQLite avec Prisma ORM
- **Styling** : Tailwind CSS

## Installation et Lancement

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Générer le client Prisma** :
   ```bash
   npx prisma generate
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Identifiants de Connexion

Voici les comptes de test créés. **Note** : La page de connexion demande actuellement votre **Nom** (et non votre email).

| Rôle | Nom | Email | Mot de Passe |
| :--- | :--- | :--- | :--- |
| **Administrateur** | `Admin` | `admin@93moove.com` | `password123` |
| **Utilisateur** | `User` | `user@93moove.com` | `password123` |

## Accès Rapide

- **Accueil** : `/`
- **Sessions** : `/sessions`
- **Connexion** : `/connexion`
- **Admin Panel** : `/modifsession` (Accessible pour les administrateurs)
# 93-moove_crud
