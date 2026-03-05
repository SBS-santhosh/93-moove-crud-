# 93Moove

93Moove est une application web dédiée à la gestion et à la promotion d'activités sportives, manuelles et culturelles pour l'association 93Moove à Saint-Ouen.

## Fonctionnalités (CRUD)

- **Gestion des Sessions** : Créer, consulter et s'inscrire à des activités.
- **Espace Instructeur** : Consulter les missions, s'y engager ou répondre aux invitations de l'admin.
- **Validation de Compte** : Les nouveaux instructeurs doivent être approuvés par un administrateur.
- **Système d'Invitations** : L'admin peut inviter un instructeur spécifique à une session.

## Guide de vérification (QA) ✅

Voici comment tester les nouvelles fonctionnalités étape par étape :

### 1. Inscription & Validation
1. Naviguez vers [/inscription](/inscription).
2. Créez un compte avec le rôle **Instructeur**.
3. Tentez de vous connecter sur [/connexion](/connexion). **Résultat attendu** : Échec (le compte n'est pas encore validé).
4. Connectez-vous avec le compte **Administrateur**.
5. Allez dans le [Panneau Admin](/modifsession). Vous verrez une section "🛡️ Approbation des nouveaux comptes".
6. Cliquez sur **Approuver**.
7. Déconnectez-vous et reconnectez-vous avec le compte Instructeur. **Résultat attendu** : Succès, redirection vers [/instructeurpanel](/instructeurpanel).

### 2. Invitations aux Sessions
1. Connectez-vous comme **Administrateur**.
2. Dans la liste des sessions, repérez une session sans instructeur.
3. Sélectionnez un instructeur validé dans le menu déroulant et cliquez sur **Inviter**.
4. Déconnectez-vous et connectez-vous avec le compte **Instructeur** invité.
5. Une section "📨 Invitations reçues" apparaît en haut de la page.
6. Cliquez sur **Accepter**.
7. Vérifiez que la session affiche désormais votre nom comme instructeur référent (✅).

## Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Base de données** : SQLite avec Prisma ORM
- **Styling** : Tailwind CSS

## Installation et Lancement

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Générer le client Prisma & Mettre à jour la DB** :
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Identifiants de Connexion

| Rôle | Nom | Email | Mot de Passe |
| :--- | :--- | :--- | :--- |
| **Administrateur** | `Admin` | `admin@93moove.com` | `password123` |
| **Utilisateur** | `User` | `user@93moove.com` | `password123` |

## Accès Rapide

- **Accueil** : `/`
- **Toutes les Sessions** : `/sessions`
- **Espace Instructeur** : `/instructeurpanel`
- **Admin Panel** : `/modifsession`
