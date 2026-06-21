-- BASE DE DONNÉES MYSQL POUR SEED DU PORTFOLIO TRAORÉ JOSEPH KASSIRI STÉPHANE
-- Compatible avec Hostinger Premium (MySQL 5.7+ / 8.0+)
-- Interclassement recommandé : utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS `stephane_portfolio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `stephane_portfolio`;

-- 1. Table des paramètres du site
CREATE TABLE IF NOT EXISTS `settings` (
  `key` VARCHAR(50) NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `settings` (`key`, `value`) VALUES
('name', 'TRAORÉ JOSEPH KASSIRI STÉPHANE'),
('title', 'Soudeur Qualifié & Spécialiste en Construction Métallique'),
('email', 'traorejosephinbox@gmail.com'),
('phone', '+225 07 48 89 23 45'),
('whatsapp', '2250748892345'),
('address', 'Abidjan, Côte d''Ivoire'),
('cv_url', 'cv_stephane_traore.pdf'),
('avatar_url', 'images/avatar_stephane.jpg'),
('about_me', 'Soudeur Qualifié et professionnel dévoué de la construction métallique, je cumule plusieurs années d''expérience pratique en atelier et sur de grands chantiers d''infrastructure. Ma spécialité est le soudage haute précision de structures porteuses lourdes et d''éléments de tuyauterie industrielle complexe. Certifié ISO 9606-1, je maîtrise les techniques SMAW, TIG, et MIG-MAG. Mon engagement est guidé par la précision absolue du trait, la pureté mécanique du dépôt métallique et le respect intransigeant des consignes de sécurité industrielle.'),
('values', '["Précision et Excellence : Des soudures irréprochables validées par ressuage et radio.","Sécurité Intransigeante : Zéro accident grâce au respect rigoureux des normes et EPI.","Fiabilité & Ponctualité : Respect des délais de livraison et engagement total sur chantier.","Esprit d''équipe : Collaboration constructive avec les monteurs, dessinateurs et chefs d’équipe."]'),
('objectives', 'Participer à des projets d''envergure internationale en génie civil et structures métalliques d''infrastructures lourdes, tout en apportant mon expertise technique de haut niveau pour assurer la conformité de chaque soudure aux exigences de sécurité les plus strictes.'),
('exp_years', '8'),
('completed_projects', '45'),
('certifications_count', '6'),
('satisfaction_rate', '100'),
('admin_username', 'admin_stephane'),
('admin_password', '$2y$10$Wb2pDeB.uI8f8b8SSTX61upk8o8e2.pZ7k3gL27rV099YjG93iAeu'); -- Par défaut 'stephane2026'

-- 2. Table des réalisations (projets)
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `techniques` TEXT NOT NULL, -- Format JSON ou séparé par virgule
  `materials` TEXT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `date_year` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `projects` (`title`, `description`, `category`, `techniques`, `materials`, `image_url`, `date_year`) VALUES
('Structure Métallique de Hangar Industriel', 'Fabrication et assemblage d''une charpente d''un hangar industriel de 1200m². Assemblage par boulonnage et soudage à l''arc à l''électrode enrobée (SMAW) de forte épaisseur.', 'Charpente Métallique', 'Soudage SMAW (E7018), Lecture de plans, Coupage plasma, Montage sur chantier', 'Acier de construction S235, Acier S355, Profilés IPE / HEA', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', '2025'),
('Tuyauterie et Collecteur de Vapeur', 'Prise de côtes, débit, traçage et soudage de tubes de pression pour réseau haute pression de vapeur en usine agroalimentaire.', 'Tuyauterie Industrielle', 'Soudage TIG (GTAW), Soudage SMAW de pénétration, Pointage, Contrôle visuel et ressuage', 'Acier Carbone DN150, Inox 316L', 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?q=80&w=800', '2024'),
('Passerelle Technique et Garde-corps', 'Création sur mesure d''une passerelle technique suspendue avec plancher en caillebotis métallique et garde-corps de sécurité selon les normes industrielles.', 'Serrurerie & Chaudronnerie', 'Soudage semi-automatique MIG-MAG, Cintrage, Traçage de développés', 'Tubes carrés acier, Tôle larmée, Platines de fixation', 'https://images.unsplash.com/photo-1513828741510-3813ec1ab403?q=80&w=800', '2025');

-- 3. Table des diplômes et certifications
CREATE TABLE IF NOT EXISTS `diplomas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `issuer` VARCHAR(255) NOT NULL,
  `year_value` VARCHAR(10) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `standard` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `diplomas` (`title`, `issuer`, `year_value`, `image_url`, `standard`) VALUES
('Certificat de Qualification de Soudeur (ISO 9606-1)', 'Bureau Veritas', '2025', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800', 'Soudage SMAW (111) PE / PC acier carbone'),
('CAP Construction Métallique', 'Lycée Professionnel des Métiers du Métal', '2022', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800', 'Fabrication, traçage et montage métallique'),
('Habilitation Travail en Hauteur & Échafaudage', 'Organisme National de Sécurité', '2024', 'https://images.unsplash.com/photo-1513828741510-3813ec1ab403?q=80&w=800', 'R.408 montage/utilisation échafaudage');

-- 4. Table des attestations
CREATE TABLE IF NOT EXISTS `attestations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `company` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `year_value` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `attestations` (`title`, `company`, `description`, `year_value`) VALUES
('Attestation de Réussite de Soudeur Multi-procédés', 'Eiffage Métal', 'Validation interne de compétences d''excellence sur les procédés TIG acier/inox et MAG en positions complexes (plafond, corniche). Respect rigoureux des DMOS et démarches sécurité.', '2024'),
('Attestation d''Excellence Sécurité Chantier', 'Bouygues Construction', 'Félicitations du coordonnateur SPS pour le respect scrupuleux des consignes de sécurité, le port systématique des EPI et l''évaluation correcte des risques liés au soudage en espace confiné.', '2023');

-- 5. Table de la galerie photo / vidéo
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `type_media` ENUM('photo', 'video') NOT NULL DEFAULT 'photo',
  `url` VARCHAR(255) NOT NULL,
  `video_platform` VARCHAR(50) DEFAULT 'mp4',
  `category` VARCHAR(100) DEFAULT 'Général',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `gallery` (`title`, `type_media`, `url`, `video_platform`, `category`) VALUES
('Réalisation d''une charpente d''entrepôt', 'photo', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', NULL, 'Chantiers'),
('Maîtrise du geste en soudage TIG Inox', 'photo', 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=800', NULL, 'Atelier'),
('Lumière intense contre l''acier brut', 'photo', 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800', NULL, 'Atelier'),
('Présentation des techniques de soudure de précision', 'video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'mp4', 'Atelier');

-- 6. Table des témoignages
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `content` TEXT NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `approved` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`name`, `company`, `role`, `content`, `rating`, `approved`) VALUES
('Jean-Marc L.', 'CFAO Technologies', 'Directeur de Chantier', 'Stéphane est un soudeur d''une rigueur exceptionnelle. Ses soudures en pénétration ont passé tous les contrôles radiographiques sans aucun défaut. Très ponctuel et respectueux des normes de sécurité.', 5, 1),
('Ibrahima Diallo', 'SOMACO', 'Superviseur Métallurgie', 'Excellent travail de repérage et de lecture de plans sur la fabrication de nos structures de pont roulant. Capable de travailler en autonomie complète tout en maintenant un standard de qualité élevé.', 5, 1);

-- 7. Table des messages de contact reçus
CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
