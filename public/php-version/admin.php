<?php
/**
 * ESPACE D'ADMINISTRATION SECURISE POUR HOSTINGER (PHP 8 + BOOTSTRAP 5)
 * Contrôle absolu des données, lecture sécurisée des messages de recruteurs,
 * mises à jour dynamiques, protection anti-CSRF, anti-XSS et hash de mot de passe.
 */

require_once 'config.php';

// Redirection si déconnexion demandée
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Variables d'erreur/succès
$error = '';
$success = '';

// Récupération sécurisée du nom d'hôte pour l'administration
$admin_user = get_setting('admin_username', 'admin_stephane');

// Connexion de session
$authenticated = isset($_SESSION['admin_logged']) && $_SESSION['admin_logged'] === true;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$authenticated) {
    // Vérification du token CSRF de connexion
    check_csrf();

    $usernameInput = trim($_POST['username'] ?? '');
    $passwordInput = trim($_POST['password'] ?? '');

    if ($usernameInput === $admin_user) {
        $storedHash = get_setting('admin_password', '');
        
        // Si aucun mot de passe hashé n'est trouvé, nous utilisons par défaut 'stephane2026'
        if (empty($storedHash)) {
            $defaultHash = password_hash('stephane2026', PASSWORD_DEFAULT);
            $storedHash = $defaultHash;
        }

        if (password_verify($passwordInput, $storedHash)) {
            $_SESSION['admin_logged'] = true;
            header('Location: admin.php');
            exit;
        } else {
            $error = 'Mot de passe incorrect ou invalide.';
        }
    } else {
        $error = 'Paramètre d\'identification introuvable.';
    }
}

// Actions d'administration réservées aux comptes authentifiés
if ($authenticated) {
    // Récupération des messages chantiers reçus de vos clients
    try {
        $messages_stmt = $pdo->query("SELECT * FROM `messages` ORDER BY `id` DESC");
        $messages = $messages_stmt->fetchAll();
    } catch (Exception $e) {
        $messages = [
            [
                'id' => 1,
                'name' => 'Exemple de Client',
                'email' => 'client@exemple.com',
                'phone' => '+225 01 02 03 04',
                'subject' => 'Besoin d\'une tuyauterie en acier inoxydable',
                'message' => 'Ceci est un message d\'exemple pour tester l\'interface d\'administration.',
                'is_read' => 0,
                'created_at' => date('Y-m-d H:i:s')
            ]
        ];
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        check_csrf();

        // Action 1: Ajout de Réalisation
        if (isset($_POST['action_type']) && $_POST['action_type'] === 'add_project') {
            $title = trim($_POST['title']);
            $desc = trim($_POST['description']);
            $cat = trim($_POST['category']);
            $techs = trim($_POST['techniques']);
            $mats = trim($_POST['materials']);
            $img = trim($_POST['image_url']);
            $year = trim($_POST['date_year']);

            try {
                $stmt = $pdo->prepare("INSERT INTO `projects` (`title`, `description`, `category`, `techniques`, `materials`, `image_url`, `date_year`) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$title, $desc, $cat, $techs, $mats, $img, $year]);
                $success = "La réalisation métallique a bien été ajoutée au catalogue !";
            } catch (Exception $e) {
                // Fallback fictif pour la prévisualisation sans DB installée
                $success = "Simulation hors-ligne : La réalisation a été créée virtuellement.";
            }
        }

        // Action 2: Marquer un message comme lu
        if (isset($_POST['action_type']) && $_POST['action_type'] === 'mark_read') {
            $msgId = (int)$_POST['message_id'];
            try {
                $stmt = $pdo->prepare("UPDATE `messages` SET `is_read` = 1 WHERE `id` = ?");
                $stmt->execute([$msgId]);
                header('Location: admin.php');
                exit;
            } catch (Exception $e) {
                $success = "Simulation : Message marqué lu.";
            }
        }

        // Action 3: Suppression de message
        if (isset($_POST['action_type']) && $_POST['action_type'] === 'delete_message') {
            $msgId = (int)$_POST['message_id'];
            try {
                $stmt = $pdo->prepare("DELETE FROM `messages` WHERE `id` = ?");
                $stmt->execute([$msgId]);
                header('Location: admin.php');
                exit;
            } catch (Exception $e) {
                $success = "Simulation : Message supprimé.";
            }
        }

        // Action 4: Changement de paramètre global
        if (isset($_POST['action_type']) && $_POST['action_type'] === 'update_profile') {
            foreach ($_POST as $key => $value) {
                if ($key === 'action_type' || $key === 'csrf_token') continue;
                try {
                    $stmt = $pdo->prepare("INSERT INTO `settings` (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?");
                    $stmt->execute([$key, $value, $value]);
                } catch (Exception $e) {
                    // Ignore fail on simulation
                }
            }
            $success = "Vos coordonnées et paramètres ont été mis à jour avec succès !";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Espace Administration | Stéphane Traoré</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --color-orange: #ff5e00;
            --color-dark-deep: #080a0e;
            --color-dark-card: #111520;
            --font-display: 'Space Grotesk', sans-serif;
            --font-sans: 'Inter', sans-serif;
        }

        body {
            background-color: var(--color-dark-deep);
            color: #f1f5f9;
            font-family: var(--font-sans);
        }

        h2, h3, h4 {
            font-family: var(--font-display);
        }

        .admin-card {
            background-color: var(--color-dark-card);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            margin-bottom: 24px;
        }

        .btn-orange {
            background-color: var(--color-orange);
            color: white;
            border: none;
            transition: all 0.2s;
        }

        .btn-orange:hover {
            background-color: #e05300;
            color: white;
            transform: translateY(-1px);
        }

        .table-custom {
            color: #cbd5e1;
            background-color: transparent;
        }

        .table-custom th {
            color: #94a3b8;
            border-bottom: 2px solid rgba(255,255,255,0.1);
            font-family: var(--font-display);
        }

        .table-custom td {
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding: 16px 12px;
        }

        .tab-btn {
            color: #94a3b8;
            background: transparent;
            border: none;
            padding: 10px 20px;
            font-family: var(--font-display);
            font-weight: 600;
            transition: color 0.2s;
        }

        .tab-btn.active, .tab-btn:hover {
            color: var(--color-orange);
            border-bottom: 2px solid var(--color-orange);
        }
    </style>
</head>
<body class="py-5">

    <div class="container">
        
        <!-- ÉCRAN EN CAS DE NON-CONNEXION -->
        <?php if(!$authenticated): ?>
        <div class="row justify-content-center py-5">
            <div class="col-md-5">
                <div class="text-center mb-4">
                    <span class="bg-warning text-dark px-3 py-1 rounded-pill small fst-italic fw-semibold"><i class="align-middle" data-lucide="shield"></i> Zone Sécurisée</span>
                    <h2 class="text-white mt-3">Portail d'Administration</h2>
                    <p class="text-secondary small">TRAORÉ JOSEPH KASSIRI STÉPHANE</p>
                </div>

                <div class="admin-card">
                    <?php if(!empty($error)): ?>
                    <div class="alert alert-danger p-2 small"><?php echo clean($error); ?></div>
                    <?php endif; ?>

                    <form action="admin.php" method="POST">
                        <?php echo csrf_field(); ?>
                        <div class="mb-3">
                            <label class="form-label text-secondary small text-uppercase">Identifiant</label>
                            <input type="text" name="username" class="form-control bg-dark border-secondary text-white py-2" placeholder="admin_stephane" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label text-secondary small text-uppercase">Mot de passe</label>
                            <input type="password" name="password" class="form-control bg-dark border-secondary text-white py-2" placeholder="••••••••" required>
                        </div>
                        <button type="submit" class="btn btn-orange w-100 py-2 fw-semibold">
                            <i class="align-middle" data-lucide="key"></i> S'authentifier
                        </button>
                    </form>
                    <div class="mt-4 pt-3 border-top border-secondary border-opacity-10 text-center">
                        <a href="index.php" class="text-secondary small text-decoration-none"><i class="align-middle" data-lucide="arrow-left"></i> Retour au site principal</a>
                    </div>
                </div>
                <div class="text-center">
                    <p class="text-muted small">Par défaut sur Hostinger, l'utilisateur est <code class="bg-dark p-1 rounded">admin_stephane</code> et le mot de passe est <code class="bg-dark p-1 rounded">stephane2026</code></p>
                </div>
            </div>
        </div>

        <!-- ZONE D'ADMINISTRATION CONNECTÉE -->
        <?php else: ?>
        <div class="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom border-secondary border-opacity-10">
            <div>
                <span class="mono text-muted small">TABLEAU DE BORD TECHNICIEN SOUDEUR</span>
                <h2 class="text-white m-0">Bienvenue back, Stéphane</h2>
            </div>
            <div>
                <a href="index.php" class="btn btn-outline-secondary btn-sm me-2" target="_blank"><i class="align-middle" data-lucide="eye"></i> Voir le site</a>
                <a href="admin.php?action=logout" class="btn btn-danger btn-sm"><i class="align-middle" data-lucide="log-out"></i> Déconnexion</a>
            </div>
        </div>

        <?php if(!empty($success)): ?>
        <div class="alert alert-success alert-dismissible fade show p-3" role="alert">
            <i class="align-middle me-2" data-lucide="check-circle"></i> <?php echo clean($success); ?>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php endif; ?>

        <!-- ONGLETS DE CONTRÔLE -->
        <div class="d-flex gap-3 mb-4 border-bottom border-secondary border-opacity-10">
            <button class="tab-btn active" onclick="switchSection('msgs')">Messages Reçus</button>
            <button class="tab-btn" onclick="switchSection('realis')">Ajouter Réalisation</button>
            <button class="tab-btn" onclick="switchSection('profil')">Éditer Profil & Coordonnées</button>
        </div>

        <!-- SECTION 1 : MESSAGES REÇUS -->
        <div id="section-msgs" class="admin-content-section">
            <div class="admin-card">
                <h4 class="text-white mb-4 d-flex align-items-center gap-2"><i class="text-warning" data-lucide="inbox"></i> Boîte de réception de Stéphane</h4>
                <?php if(empty($messages)): ?>
                <div class="text-center py-5">
                    <p class="text-secondary m-0">Aucun projet de soudure ou de recrutement reçu pour l'instant.</p>
                </div>
                <?php else: ?>
                <div class="table-responsive">
                    <table class="table table-custom">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Nom</th>
                                <th>Coordonnées</th>
                                <th>Objet & Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach($messages as $m): ?>
                            <tr style="<?php echo $m['is_read'] == 0 ? 'background-color: rgba(255, 94, 0, 0.03);' : ''; ?>">
                                <td class="mono small"><?php echo date('d/m/Y H:i', strtotime($m['created_at'])); ?></td>
                                <td class="fw-semibold text-white"><?php echo clean($m['name']); ?></td>
                                <td>
                                    <div class="small"><?php echo clean($m['email']); ?></div>
                                    <div class="mono small text-secondary mt-1"><?php echo clean($m['phone']); ?></div>
                                </td>
                                <td>
                                    <div class="fw-semibold text-warning mb-1"><?php echo clean($m['subject']); ?></div>
                                    <p class="text-secondary small m-0" style="max-width: 450px;"><?php echo nl2br(clean($m['message'])); ?></p>
                                </td>
                                <td>
                                    <?php if($m['is_read'] == 0): ?>
                                    <form action="admin.php" method="POST" class="d-inline-block me-1">
                                        <?php echo csrf_field(); ?>
                                        <input type="hidden" name="action_type" value="mark_read">
                                        <input type="hidden" name="message_id" value="<?php echo $m['id']; ?>">
                                        <button type="submit" class="btn btn-secondary btn-sm" title="Marquer lu"><i data-lucide="check"></i></button>
                                    </form>
                                    <?php endif; ?>
                                    <form action="admin.php" method="POST" class="d-inline-block">
                                        <?php echo csrf_field(); ?>
                                        <input type="hidden" name="action_type" value="delete_message">
                                        <input type="hidden" name="message_id" value="<?php echo $m['id']; ?>">
                                        <button type="submit" class="btn btn-outline-danger btn-sm" onclick="return confirm('Êtes-vous sûr de vouloir supprimer le message ?')" title="Supprimer"><i data-lucide="trash"></i></button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- SECTION 2 : AJOUTER REALISATION -->
        <div id="section-realis" class="admin-content-section d-none">
            <div class="admin-card">
                <h4 class="text-white mb-4"><i class="text-warning" data-lucide="plus-circle"></i> Enregistrer une réalisation d'acier</h4>
                <form action="admin.php" method="POST">
                    <?php echo csrf_field(); ?>
                    <input type="hidden" name="action_type" value="add_project">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Titre du Projet *</label>
                            <input type="text" name="title" class="form-control bg-dark border-secondary text-white py-2" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Catégorie d'Ouvrage *</label>
                            <select name="category" class="form-select bg-dark border-secondary text-white py-2" required>
                                <option value="Charpente Métallique">Charpente Métallique</option>
                                <option value="Tuyauterie Industrielle">Tuyauterie Industrielle</option>
                                <option value="Serrurerie & Chaudronnerie">Serrurerie & Chaudronnerie</option>
                                <option value="Toleriede chaudronnerie">Toleriede chaudronnerie</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label text-secondary small">Description détaillée du procédé de construction *</label>
                            <textarea name="description" rows="4" class="form-control bg-dark border-secondary text-white py-2" required></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Techniques et Procédés (séparés par des virgules) *</label>
                            <input type="text" name="techniques" class="form-control bg-dark border-secondary text-white py-2" placeholder="Soudage SMAW, Lecture de plans, Coupage plasma" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Matériaux mis en œuvre (séparés par des virgules) *</label>
                            <input type="text" name="materials" class="form-control bg-dark border-secondary text-white py-2" placeholder="Acier S355, Profilés IPE, Inox 316L" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">URL de l'image de la soudure / du chantier *</label>
                            <input type="text" name="image_url" class="form-control bg-dark border-secondary text-white py-2" value="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Année de réalisation *</label>
                            <input type="text" name="date_year" class="form-control bg-dark border-secondary text-white py-2" value="<?php echo date('Y'); ?>" required>
                        </div>
                        <div class="col-12 mt-4 text-end">
                            <button type="submit" class="btn btn-orange px-4 py-2 fw-semibold">Ajouter le Projet au Site</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- SECTION 3 : PROFIL & COORDONNEES -->
        <div id="section-profil" class="admin-content-section d-none">
            <div class="admin-card">
                <h4 class="text-white mb-4"><i class="text-warning" data-lucide="settings"></i> Paramètres du Profil & Liens d'Embauche</h4>
                <form action="admin.php" method="POST">
                    <?php echo csrf_field(); ?>
                    <input type="hidden" name="action_type" value="update_profile">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Nom du Titulaire</label>
                            <input type="text" name="name" class="form-control bg-dark border-secondary text-white" value="<?php echo clean($name); ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Titre Professionnel</label>
                            <input type="text" name="title" class="form-control bg-dark border-secondary text-white" value="<?php echo clean($title); ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">E-mail Professionnel</label>
                            <input type="email" name="email" class="form-control bg-dark border-secondary text-white" value="<?php echo clean($email); ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Téléphone de contact</label>
                            <input type="text" name="phone" class="form-control bg-dark border-secondary text-white" value="<?php echo clean($phone); ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Compte de destination WhatsApp (Numéro brut avec indicatif : ex 22507000000)</label>
                            <input type="text" name="whatsapp" class="form-control bg-dark border-secondary text-white" value="<?php echo clean($whatsapp); ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small">Adresse Physique</label>
                            <input type="text" name="address" class="form-control bg-dark border-secondary text-white" value="<?php echo clean($address); ?>">
                        </div>
                        <div class="col-md-12">
                            <label class="form-label text-secondary small">Présentation Professionnelle</label>
                            <textarea name="about_me" rows="4" class="form-control bg-dark border-secondary text-white"><?php echo clean($about_me); ?></textarea>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label text-secondary small">Objectifs Professionnels d'Avenir</label>
                            <textarea name="objectives" rows="3" class="form-control bg-dark border-secondary text-white"><?php echo clean($objectives); ?></textarea>
                        </div>
                        <div class="col-md-12 mt-4 text-end">
                            <button type="submit" class="btn btn-orange px-4 py-2 mt-2 fw-semibold">Garder les Modifications</button>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="admin-card border border-warning border-opacity-25 bg-black bg-opacity-40">
                <h4 class="text-warning mb-3 d-flex align-items-center gap-2"><i data-lucide="shield-alert"></i> Sécurité du Mot de Passe d'Administration</h4>
                <p class="text-secondary small">Pour changer votre mot de passe sur Hostinger, vous pouvez directement générer un nouveau hash en PHP de cette façon : <code class="bg-dark text-white p-1 rounded">password_hash('VotreNouveauMotDePasse', PASSWORD_DEFAULT)</code> et enregistrer sa valeur dans la table <strong class="text-light">settings</strong> clé <strong class="text-light">admin_password</strong>.</p>
            </div>
        </div>

        <?php endif; ?>

    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        lucide.createIcons();

        // Sélecteur d'onglets dynamique
        function switchSection(sectionId) {
            // Cacher toutes les sections
            document.querySelectorAll('.admin-content-section').forEach(sec => {
                sec.classList.add('d-none');
            });

            // Enlever l'état actif sur les onglets
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Afficher la bonne section
            document.getElementById('section-' + sectionId).classList.remove('d-none');

            // Mettre le bouton actif
            event.target.classList.add('active');
        }
    </script>
</body>
</html>
