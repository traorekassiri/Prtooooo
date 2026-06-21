<?php
/**
 * FICHIER DE CONFIGURATION DU PORTFOLIO (HOSTINGER)
 * Code d'or : Connexion sécurisée PDO, gestion des sessions, protections globales.
 */

// Configuration de la Base de Données
define('DB_HOST', 'localhost');
define('DB_USER', 'u123456789_stephane'); // À modifier avec les identifiants Hostinger MySQL d'origine
define('DB_PASS', 'MonMotDePasseSecurise2026!'); // À modifier
define('DB_NAME', 'u123456789_stephane_db'); // À modifier

// Activation de l'affichage des erreurs en développement (désactiver en production en remplaçant par ini_set('display_errors', 0))
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Démarrage sécurisé de la session
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_lifetime' => 86400,
        'cookie_secure' => isset($_SERVER['HTTPS']), // Force le cookie sécurisé si HTTPS
        'cookie_httponly' => true, // Empêche l'accès via Javascript (Anti-XSS)
        'cookie_samesite' => 'Lax'
    ]);
}

// Génération du token CSRF si absent
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    // Message sobre sans divulgation technique de mot de passe en cas de panne
    die("Désolé, une erreur de liaison au serveur technique est survenue. Veuillez vérifier la configuration de connexion.");
}

/**
 * Fonction de protection Anti-XSS globale
 */
function clean($data) {
    if (is_array($data)) {
        return array_map('clean', $data);
    }
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Fonction d'affichage sécurisé du token CSRF pour formulaire
 */
function csrf_field() {
    return '<input type="hidden" name="csrf_token" value="' . $_SESSION['csrf_token'] . '">';
}

/**
 * Fonction de vérification du token CSRF
 */
function check_csrf() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
            http_response_code(403);
            die("Erreur de validation de sécurité (CSRF détecté). Requête refusée.");
        }
    }
}
?>
