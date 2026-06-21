# GUIDE D'INSTALLATION DU PORTFOLIO SUR HOSTINGER PREMIUM
Ce guide vous accompagne pas à pas pour déployer le Portfolio Professionnel Premium de **TRAORÉ JOSEPH KASSIRI STÉPHANE** sur votre hébergement Hostinger Premium avec PHP 8 et MySQL.

---

## ÉTAPE 1 : Configuration de la Base de Données sur Hostinger
1. Connectez-vous à votre panneau de contrôle **hPanel** de Hostinger.
2. Allez dans la section **Bases de données** > **Bases de données SQL**.
3. Créez une nouvelle base de données et un nouvel utilisateur :
   - **Nom de la base de données** : par exemple `u123456789_stephane`
   - **Nom d'utilisateur de la base de données** : par exemple `u123456789_stephane_user`
   - **Mot de passe** : un mot de passe sécurisé (ex: `StePh@ne!Secur2026`)
4. Cliquez sur **Créer**. Notez précieusement ces trois informations.

---

## ÉTAPE 2 : Importation de la Structure SQL (db.sql)
1. Toujours sur votre hPanel, dans la liste de vos bases de données, cliquez sur le bouton **Enter phpMyAdmin** en face de la base créée.
2. Une fois dans phpMyAdmin, cliquez sur l'onglet **Importer** en haut de la page.
3. Cliquez sur **Choisir un fichier** et sélectionnez le fichier `db.sql` disponible dans ce dossier.
4. Laissez les options par défaut et cliquez sur le bouton **Go** (ou Exécuter) en bas de la page.
5. Vos tables de base de données (`settings`, `projects`, `diplomas`, `attestations`, `gallery`, `testimonials`, `messages`) sont maintenant créées et pré-remplies.

---

## ÉTAPE 3 : Configuration du Fichier de Connexion PHP
1. Ouvrez le fichier `config.php` avec un éditeur de texte.
2. À la ligne 8 à 11, remplacez les constantes de connexion par vos vrais identifiants créés à l'Étape 1 :
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'remplir_ici_votre_utilisateur_hostinger');
   define('DB_PASS', 'remplir_ici_votre_mot_de_passe_db');
   define('DB_NAME', 'remplir_ici_votre_nom_de_base_hostinger');
   ```
3. Enregistrez le fichier.

---

## ÉTAPE 4 : Upload des Fichiers sur le Serveur Hostinger
1. Sur votre hPanel, allez dans la section **Fichiers** > **Gestionnaire de Fichiers** (File Manager).
2. Entrez dans le dossier racine de votre site internet : en général le dossier `public_html`.
3. Compressez tous les fichiers de ce dossier sous forme de fichier `.zip` (par exemple `portfolio.zip`).
   - Le ZIP doit contenir directement les fichiers (`index.php`, `admin.php`, `config.php`, `submit_contact.php`, les dossiers d'images etc.) à la racine du ZIP, et non dans un sous-dossier contenant ces fichiers.
4. Dans le gestionnaire de fichiers hPanel, cliquez sur **Importer** (Upload) et sélectionnez votre fichier `.zip`.
5. Une fois le transfert terminé, faites un clic droit sur le fichier `.zip` et sélectionnez **Extract** (Extraire) pour décompresser tous les fichiers au cœur du dossier `public_html`.
6. Vous pouvez supprimer le fichier `.zip` téléchargé pour garder votre dossier propre.

---

## ÉTAPE 5 : Connexion à l'Espace Administrateur
L'interface d'administration est sécurisée et vous permet d'ajouter de nouveaux projets, gérer vos photos de soudure, lire les messages reçus de vos recruteurs et éditer vos textes.

- **Adresse web de l'administration** : `https://votre-site.com/admin.php`
- **Identifiant par défaut** : `admin_stephane`
- **Mot de passe par défaut** : `stephane2026`

*🚨 IMPORTANT : Une fois connecté à l'Administration pour la première fois, rendez-vous dans les paramètres d'administration pour mettre à jour votre mot de passe pour des raisons évidentes de sécurité.*

---

## Fonctionnalités Clés et Optimisations d'Hébergement incluses :
- **Protection CSRF** : Protection intégrée sur le traitement de contacts pour bloquer les robots de spams.
- **Requêtes PDO Préparées** : Protection contre toutes formes d'injection SQL.
- **Entrées Échappées (Anti-XSS)** : Filtrage de sécurité sur l'ensemble des données modifiables et lues.
- **Affichage ultra-rapide** : Styles basés sur Bootstrap 5 léger chargé via CDN haute performance pour un chargement instantané sur mobile.
