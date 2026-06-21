<?php
/**
 * TRANSACTION SECURISEE DE RECEPTION DU FORMULAIRE DE CONTACT (PHP 8)
 * Traitement sécurisé anti-CSRF, anti-XSS et injection SQL.
 */

require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

// 1. Validation du jeton CSRF
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    echo json_encode(['success' => false, 'message' => 'Échec de la validation de sécurité CSRF.']);
    exit;
}

// 2. Récupération et nettoyage rigoureux des entrées
$name = isset($_POST['name']) ? trim(filter_var($_POST['name'], FILTER_UNSAFE_RAW)) : '';
$email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) : '';
$phone = isset($_POST['phone']) ? trim(filter_var($_POST['phone'], FILTER_UNSAFE_RAW)) : '';
$subject = isset($_POST['subject']) ? trim(filter_var($_POST['subject'], FILTER_UNSAFE_RAW)) : '';
$message = isset($_POST['message']) ? trim(filter_var($_POST['message'], FILTER_UNSAFE_RAW)) : '';

// 3. Validation des champs obligatoires
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires (Nom, Email, Objet, Message).']);
    exit;
}

if ($email === false) {
    echo json_encode(['success' => false, 'message' => 'L\'adresse email saisie est invalide.']);
    exit;
}

try {
    // 4. Insertion préparée anti-injection SQL
    $stmt = $pdo->prepare("INSERT INTO `messages` (`name`, `email`, `phone`, `subject`, `message`, `is_read`, `created_at`) VALUES (?, ?, ?, ?, ?, 0, NOW())");
    $stmt->execute([$name, $email, $phone, $subject, $message]);

    echo json_encode([
        'success' => true,
        'message' => 'Votre message a été transmis avec succès ! Stéphane vous répondra dans les plus brefs délais.'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur technique est survenue lors de l\'enregistrement de votre message.'
    ]);
}
?>
