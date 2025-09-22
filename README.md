# EPISE – SAE401

Projet d’épicerie solidaire pour étudiants UNC  
**Backend : PHP MVC**  
**Frontend : Angular**

---

## Liens GitHub

- **Backend (MVC PHP)** : [https://github.com/ton-utilisateur/SAE401](https://github.com/ton-utilisateur/SAE401)
- **Frontend (Angular)** : [https://github.com/ton-utilisateur/SAE401-frontend](https://github.com/ton-utilisateur/SAE401-frontend)

---

## Installation et déploiement

### 1. Backend (MVC PHP)

#### Prérequis

- PHP >= 7.4
- Serveur Apache ou Nginx
- MySQL/MariaDB
- [WAMP](https://www.wampserver.com/) ou [XAMPP](https://www.apachefriends.org/) recommandé pour Windows

#### Installation

1. **Cloner le dépôt**
   ```sh
   git clone https://github.com/ton-utilisateur/SAE401.git
   ```

2. **Placer le dossier dans le répertoire web**
   - Exemple : `C:\wamp64\www\SAE401` ou `/var/www/html/SAE401`

3. **Créer la base de données**
   - Importer le fichier SQL fourni (`database.sql`) dans phpMyAdmin ou via la ligne de commande.

4. **Configurer la connexion MySQL**
   - Modifier `app/Database.php` avec vos identifiants MySQL.

5. **Lancer le serveur**
   - Démarrer Apache et MySQL via WAMP/XAMPP.
   - Accéder à [http://localhost/SAE401](http://localhost/SAE401)

---

### 2. Frontend (Angular)

#### Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Angular CLI](https://angular.io/cli) :  
  ```sh
  npm install -g @angular/cli
  ```

#### Installation

1. **Cloner le dépôt**
   ```sh
   git clone https://github.com/ton-utilisateur/SAE401-frontend.git
   cd SAE401-frontend
   ```

2. **Installer les dépendances**
   ```sh
   npm install
   ```

3. **Configurer l’API**
   - Vérifier le fichier `src/environments/environment.ts` pour l’URL du backend.

4. **Lancer le serveur Angular**
   ```sh
   ng serve
   ```
   - Accéder à [http://localhost:4200](http://localhost:4200)

---

## Déploiement en production

- **Backend** : Déployer le dossier sur un hébergement PHP/MySQL (OVH, IONOS, etc.)
- **Frontend** :  
  ```sh
  ng build --configuration production
  ```
  - Déployer le contenu du dossier `dist/` sur un hébergement web (Netlify, Vercel, OVH, etc.)

---

## Accès Backoffice

- Accéder à `/backoffice` sur le backend pour l’administration.

---

## Contact

Pour toute question, contactez [camhdyo@gmail.com](mailto:camhdyo@gmail.com).

---

## Fonctionnalités principales

### Frontend (Angular)

- **Catalogue produits** : consultation des produits disponibles, filtrage par catégorie.
- **Inscription et connexion** : création de compte étudiant ou particulier, authentification sécurisée.
- **Réservation de panier** : sélection et réservation de produits pour les adhérents UNC.
- **Paiement de l’adhésion** : paiement en ligne de l’adhésion annuelle (200 F XFP) pour accéder aux paniers.
- **Gestion du compte** : modification des informations personnelles, suivi des réservations et de l’adhésion.
- **Dons** : formulaire pour proposer des dons (produits, vêtements, etc.).
- **Bénévolat** : formulaire pour devenir bénévole et participer à l’organisation.
- **Actualités** : affichage des articles et informations de l’épicerie.
- **Mentions légales, RGPD, CGV, gestion des cookies** : pages informatives accessibles en pied de page.
- **Internationalisation (I18N)** : site disponible en français et anglais, bouton de changement de langue.
- **Responsive design** : interface adaptée à tous les écrans (mobile, tablette, desktop).

### Backend (MVC PHP)

- **API REST** : endpoints sécurisés pour toutes les opérations (produits, panier, utilisateurs, dons, etc.).
- **Gestion des utilisateurs** : création, modification, suppression, gestion des rôles (étudiant, particulier, administrateur).
- **Gestion des produits et catégories** : ajout, modification, suppression via le backoffice.
- **Gestion des réservations** : suivi des paniers et réservations des adhérents.
- **Gestion des dons et bénévoles** : validation et suivi des propositions reçues.
- **Backoffice administrateur** : interface dédiée pour la gestion des contenus, des utilisateurs et des stocks.
- **Sécurité** : vérification des tokens, gestion des sessions, protection des routes sensibles.
- **Logs et debug** : outils pour le suivi des erreurs et des opérations.

---

**N’oubliez pas d’adapter les liens GitHub et les paramètres selon votre configuration réelle.**
