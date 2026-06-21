<?php
/**
 * PORTFOLIO PRO EXCEPTIONNEL (PHP 8 + BOOTSTRAP 5 + TAILWIND COMBINE)
 * Dédié à : TRAORÉ JOSEPH KASSIRI STÉPHANE - Soudeur Qualifié en Construction Métallique
 * Design : Style industriel premium, Orange sécurité, Noir profond, Gris acier, transitions lisses.
 */

require_once 'config.php';

// Fonction de récupération sécurisée avec valeur par défaut si échec ou db vide
function get_setting($key, $default) {
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT `value` FROM `settings` WHERE `key` = ?");
        $stmt->execute([$key]);
        $res = $stmt->fetchColumn();
        return $res !== false ? $res : $default;
    } catch (Exception $e) {
        return $default;
    }
}

// Récupération des données dynamiques
try {
    $projects_stmt = $pdo->query("SELECT * FROM `projects` ORDER BY `id` DESC");
    $projects = $projects_stmt->fetchAll();
} catch (Exception $e) {
    $projects = [];
}

try {
    $diplomas_stmt = $pdo->query("SELECT * FROM `diplomas` ORDER BY `year_value` DESC");
    $diplomas = $diplomas_stmt->fetchAll();
} catch (Exception $e) {
    $diplomas = [];
}

try {
    $attestations_stmt = $pdo->query("SELECT * FROM `attestations` ORDER BY `year_value` DESC");
    $attestations = $attestations_stmt->fetchAll();
} catch (Exception $e) {
    $attestations = [];
}

try {
    $gallery_stmt = $pdo->query("SELECT * FROM `gallery` ORDER BY `id` DESC");
    $gallery = $gallery_stmt->fetchAll();
} catch (Exception $e) {
    $gallery = [];
}

try {
    $testimonials_stmt = $pdo->query("SELECT * FROM `testimonials` WHERE `approved` = 1 ORDER BY `id` DESC");
    $testimonials = $testimonials_stmt->fetchAll();
} catch (Exception $e) {
    $testimonials = [];
}

// Variables personnalisées avec repli statique si base non initialisée
$name = get_setting('name', 'TRAORÉ JOSEPH KASSIRI STÉPHANE');
$title = get_setting('title', 'Soudeur Qualifié & Spécialiste en Construction Métallique');
$email = get_setting('email', 'traorejosephinbox@gmail.com');
$phone = get_setting('phone', '+225 07 48 89 23 45');
$whatsapp = get_setting('whatsapp', '2250748892345');
$address = get_setting('address', 'Abidjan, Côte d\'Ivoire');
$cv_url = get_setting('cv_url', '#');
$avatar_url = get_setting('avatar_url', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400');
$about_me = get_setting('about_me', 'Soudeur Qualifié et professionnel dévoué de la construction métallique, je cumule plusieurs années d\'expérience pratique en atelier et sur de grands chantiers d\'infrastructure. Ma spécialité est le soudage haute précision... ');
$objectives = get_setting('objectives', 'Participer à des projets d\'envergure internationale en génie civil...');
$exp_years = get_setting('exp_years', '8');
$completed_projects = get_setting('completed_projects', '45');
$certifications_count = get_setting('certifications_count', '6');
$satisfaction_rate = get_setting('satisfaction_rate', '100');

// Décodage des valeurs de Stéphane
$values_json = get_setting('values', '[]');
$values = json_decode($values_json, true);
if (empty($values)) {
    $values = [
        "Précision et Excellence : Des soudures irréprochables validées par ressuage.",
        "Sécurité Intransigeante : Zéro accident grâce au respect rigoureux des consignes.",
        "Fiabilité & Ponctualité : Engagement total et respect des délais d'exécution chantiers.",
        "Esprit d'équipe : Entente fluide et active avec les monteurs de structures."
    ];
}

// Fallbacks de démonstration si la db est vierge
if (empty($projects)) {
    $projects = [
        [
            'title' => 'Structure Métallique de Hangar Industriel',
            'description' => 'Fabrication et assemblage d\'une charpente d\'un hangar de 1200m². Soudage à l\'électrode enrobée (SMAW).',
            'category' => 'Charpente Métallique',
            'techniques' => 'Soudage SMAW (E7018), Lecture de plans, Contrôle visuel',
            'materials' => 'Acier de construction S235',
            'image_url' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
            'date_year' => '2025'
        ]
    ];
}
if (empty($diplomas)) {
    $diplomas = [
        [
            'title' => 'Certificat de Qualification de Soudeur (ISO 9606-1)',
            'issuer' => 'Bureau Veritas',
            'year_value' => '2025',
            'image_url' => 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800',
            'standard' => 'Soudage SMAW (111) PE / PC'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo clean($name); ?> | Portfolio Soudeur Élite</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <!-- Bootstrap 5 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Lucide Icons (Script) -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --color-orange: #ff5e00;         /* Orange sécurité */
            --color-orange-glow: rgba(255, 94, 0, 0.25);
            --color-dark-deep: #0a0c10;     /* Noir acier trempé */
            --color-dark-card: #12161f;     /* Gris acier sombre */
            --color-steel: #7d8c99;         /* Gris acier */
            --font-display: 'Space Grotesk', sans-serif;
            --font-sans: 'Inter', sans-serif;
            --font-mono: 'Fira Code', monospace;
        }

        body {
            background-color: var(--color-dark-deep);
            color: #f1f5f9;
            font-family: var(--font-sans);
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        h1, h2, h3, h4, .font-display {
            font-family: var(--font-display);
            font-weight: 700;
            letter-spacing: -0.025em;
        }

        .mono {
            font-family: var(--font-mono);
            font-size: 0.85em;
        }

        /* Effet orange de sélection */
        ::selection {
            background: var(--color-orange);
            color: #fff;
        }

        /* Barre de navigation stylée */
        .custom-navbar {
            background-color: rgba(10, 12, 16, 0.85);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
        }

        .nav-link {
            color: #94a3b8 !important;
            font-family: var(--font-display);
            font-weight: 500;
            transition: color 0.2s;
        }

        .nav-link:hover, .nav-link.active {
            color: var(--color-orange) !important;
        }

        /* Section Hero spectaculaire */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding-top: 100px;
            background: radial-gradient(circle at 80% 20%, rgba(255, 94, 0, 0.08) 0%, transparent 60%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: radial-gradient(rgba(255,255,255,0.015) 1px, transparent 0);
            background-size: 24px 24px;
            pointer-events: none;
        }

        /* Boutons Premium */
        .btn-premium {
            background-color: var(--color-orange);
            color: #fff;
            border: none;
            font-family: var(--font-display);
            font-weight: 600;
            padding: 12px 28px;
            border-radius: 4px;
            box-shadow: 0 4px 14px var(--color-orange-glow);
            transition: all 0.3s ease;
        }

        .btn-premium:hover {
            background-color: #e05300;
            box-shadow: 0 6px 20px rgba(255, 94, 0, 0.4);
            transform: translateY(-2px);
            color: #fff;
        }

        .btn-outline-premium {
            background-color: transparent;
            color: #fff;
            border: 2px solid rgba(255, 255, 255, 0.1);
            font-family: var(--font-display);
            font-weight: 600;
            padding: 10px 26px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .btn-outline-premium:hover {
            border-color: var(--color-orange);
            color: var(--color-orange);
            transform: translateY(-2px);
        }

        /* Cartes industrielles haut de gamme (Glassmorphic) */
        .industrial-card {
            background: linear-gradient(145deg, #131822, #0d1016);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
        }

        .industrial-card::after {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 4px; height: 100%;
            background-color: transparent;
            transition: background-color 0.2s;
        }

        .industrial-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 94, 0, 0.2);
            box-shadow: 0 15px 40px rgba(255, 94, 0, 0.05);
        }

        .industrial-card:hover::after {
            background-color: var(--color-orange);
        }

        /* Compteurs et statistiques animés */
        .stat-number {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--color-orange);
            line-height: 1;
            margin-bottom: 5px;
            font-family: var(--font-display);
            text-shadow: 0 4px 10px var(--color-orange-glow);
        }

        /* Masque métallique sur images */
        .weld-cover {
            position: relative;
            overflow: hidden;
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.08);
        }

        .weld-cover img {
            transition: transform 0.5s ease;
        }

        .weld-cover:hover img {
            transform: scale(1.05);
        }

        /* Point d'impact / de fusion */
        .spark-node {
            width: 10px;
            height: 10px;
            background-color: var(--color-orange);
            box-shadow: 0 0 12px 4px var(--color-orange);
            border-radius: 50%;
            display: inline-block;
        }

        /* Timeline interactive */
        .timeline-container {
            position: relative;
            padding-left: 30px;
            border-left: 2px solid rgba(255, 255, 255, 0.05);
        }

        .timeline-item {
            position: relative;
            margin-bottom: 40px;
        }

        .timeline-badge {
            position: absolute;
            left: -41px;
            top: 4px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: var(--color-dark-deep);
            border: 4px solid var(--color-orange);
            box-shadow: 0 0 10px var(--color-orange);
        }

        /* Lightbox CSS */
        .lightbox-modal {
            background-color: rgba(10, 12, 16, 0.95);
        }

        /* Bouton Retour en haut */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--color-orange);
            color: #fff;
            width: 44px;
            height: 44px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px var(--color-orange-glow);
            transition: all 0.2s;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            transform: translateY(-3px);
            background: #e05300;
        }
    </style>
</head>
<body>

    <!-- BARRE DE NAVIGATION -->
    <nav class="navbar navbar-expand-lg custom-navbar fixed-top py-3">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center text-white" href="#">
                <span class="spark-node me-2"></span>
                <span class="font-display fw-bold tracking-tight">TRAORÉ S.</span>
            </a>
            <button class="navbar-toggler border-0 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                <i data-lucide="menu"></i>
            </button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
                    <li class="nav-item"><a class="nav-link" href="#accueil">Accueil</a></li>
                    <li class="nav-item"><a class="nav-link" href="#a-propos">À Propos</a></li>
                    <li class="nav-item"><a class="nav-link" href="#competences">Compétences</a></li>
                    <li class="nav-item"><a class="nav-link" href="#realisations">Réalisations</a></li>
                    <li class="nav-item"><a class="nav-link" href="#diplomes">Certifications</a></li>
                    <li class="nav-item"><a class="nav-link" href="#galerie">Galerie</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
                <div class="ms-lg-3">
                    <a href="#contact" class="btn btn-premium btn-sm">Embaucher</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- ACCUEIL / HERO SECTION -->
    <section id="accueil" class="hero">
        <div class="container h-100">
            <div class="row align-items-center gy-5">
                <div class="col-lg-7">
                    <span class="mono text-uppercase tracking-wider text-muted d-block mb-3">
                        <span class="text-warning">●</span> SOUDEUR QUALIFIÉ SÉCURITÉ INDUSTRIELLE
                    </span>
                    <h1 class="display-3 text-white mb-3">
                        <?php echo clean($name); ?>
                    </h1>
                    <p class="lead text-secondary mb-4 col-xl-10">
                        <?php echo clean($title); ?>. Spécialité structures métalliques lourdes, tuyauterie haute pression et assemblage d'élite sous normes ISO & Bureau Veritas.
                    </p>
                    <div class="d-flex flex-wrap gap-3">
                        <a href="https://wa.me/<?php echo clean($whatsapp); ?>" target="_blank" class="btn btn-premium d-inline-flex align-items-center gap-2">
                            <i data-lucide="phone"></i> WhatsApp
                        </a>
                        <a href="#contact" class="btn btn-outline-premium d-inline-flex align-items-center gap-2">
                            <i data-lucide="send"></i> Me Contacter
                        </a>
                        <?php if($cv_url !== '#'): ?>
                        <a href="<?php echo clean($cv_url); ?>" download class="btn btn-outline-secondary d-none d-sm-inline-flex align-items-center gap-2 border-0 text-slate-300">
                            <i data-lucide="download"></i> Télécharger CV
                        </a>
                        <?php endif; ?>
                    </div>

                    <!-- Statistiques rapides -->
                    <div class="row mt-5 pt-4 border-top border-secondary border-opacity-10 gy-4">
                        <div class="col-6 col-sm-3">
                            <div class="stat-number"><?php echo clean($exp_years); ?>+</div>
                            <div class="text-uppercase tracking-wider text-secondary small text-xs font-semibold">Ans d'Expérience</div>
                        </div>
                        <div class="col-6 col-sm-3">
                            <div class="stat-number"><?php echo clean($completed_projects); ?>+</div>
                            <div class="text-uppercase tracking-wider text-secondary small text-xs">Chantiers Finis</div>
                        </div>
                        <div class="col-6 col-sm-3">
                            <div class="stat-number"><?php echo clean($certifications_count); ?></div>
                            <div class="text-uppercase tracking-wider text-secondary small text-xs">Brevets ISO</div>
                        </div>
                        <div class="col-6 col-sm-3">
                            <div class="stat-number"><?php echo clean($satisfaction_rate); ?>%</div>
                            <div class="text-uppercase tracking-wider text-secondary small text-xs">CQ Visuel</div>
                        </div>
                    </div>
                </div>

                <!-- Photo avec structure industrielle d'accompagnement -->
                <div class="col-lg-5 text-center">
                    <div class="position-relative d-inline-block">
                        <!-- Effet de grille en arrière plan -->
                        <div class="position-absolute translate-middle-x top-50 start-50 w-100 h-100 bg-orange opacity-10 blur-3xl rounded-full" style="z-index: -1;"></div>
                        <div class="weld-cover border-4 border-slate-700" style="max-width: 380px;">
                            <img src="<?php echo clean($avatar_url); ?>" alt="<?php echo clean($name); ?>" class="img-fluid bg-zinc-900 filter grayscale contrast-125">
                        </div>
                        <div class="position-absolute bottom-0 start-0 bg-dark p-3 rounded shadow-lg border border-secondary text-start m-3 max-w-xs d-none d-sm-block">
                            <p class="small text-muted mb-1 line-height-sm">Dernière vérification d'excellence :</p>
                            <span class="badge bg-success text-xs"><i class="align-middle" data-lucide="shield-check"></i> Agrée Bureau Veritas 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION À PROPOS -->
    <section id="a-propos" class="py-5 border-top border-secondary border-opacity-10">
        <div class="container py-5">
            <div class="row align-items-center gy-5">
                <div class="col-lg-6">
                    <span class="mono text-warning tracking-widest text-uppercase d-block mb-2">ENGAGEMENT & VISION</span>
                    <h2 class="text-white mb-4">La Signature Thermique de la Qualité Industrielle</h2>
                    <p class="text-secondary mb-4" style="line-height: 1.8;">
                        <?php echo nl2br(clean($about_me)); ?>
                    </p>
                    <h4 class="text-white mb-3">Mes Objectifs de Carrière :</h4>
                    <p class="text-secondary font-sans mb-0">
                        <?php echo clean($objectives); ?>
                    </p>
                </div>
                <div class="col-lg-6">
                    <div class="industrial-card">
                        <h4 class="text-white mb-4">Valeurs Professionnelles :</h4>
                        <div class="d-flex flex-column gap-3">
                            <?php foreach($values as $val): ?>
                            <div class="d-flex align-items-start gap-3">
                                <div class="bg-warning text-dark p-1 rounded-circle mt-1">
                                    <i data-lucide="check" style="width: 14px; height: 14px;"></i>
                                </div>
                                <p class="text-secondary mb-0"><?php echo clean($val); ?></p>
                            </div>
                            <?php endindex; ?>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION COMPÉTENCES -->
    <section id="competences" class="py-5 bg-black bg-opacity-25 border-top border-bottom border-secondary border-opacity-10">
        <div class="container py-5">
            <div class="text-center mb-5 max-w-xl mx-auto">
                <span class="mono text-warning uppercase">SAVOIR-FAIRE</span>
                <h2 class="text-white">Ingénierie Thermique & Métallurgique</h2>
            </div>
            <div class="row g-4">
                <!-- Competence 1 -->
                <div class="col-md-4">
                    <div class="industrial-card text-start h-100">
                        <div class="text-warning mb-3"><i data-lucide="flame" style="width: 36px; height: 36px;"></i></div>
                        <h4 class="text-white mb-2">Soudage SMAW (Haut Niveau)</h4>
                        <p class="text-secondary small">Maîtrise absolue du soudage sous arc à l'électrode enrobée (E7018, E6010) toutes positions sur aciers au carbone lourd pour structures portantes primaires.</p>
                    </div>
                </div>
                <!-- Competence 2 -->
                <div class="col-md-4">
                    <div class="industrial-card text-start h-100">
                        <div class="text-warning mb-3"><i data-lucide="shield" style="width: 36px; height: 36px;"></i></div>
                        <h4 class="text-white mb-2">Sécurité Industrielle Lourde</h4>
                        <p class="text-secondary small">Vigilance renforcée, repérage précoce des contraintes physiques chantiers, mise au point d'écrans de protection de soudage, respect intransigeant du permis de feu.</p>
                    </div>
                </div>
                <!-- Competence 3 -->
                <div class="col-md-4">
                    <div class="industrial-card text-start h-100">
                        <div class="text-warning mb-3"><i data-lucide="file-text" style="width: 36px; height: 36px;"></i></div>
                        <h4 class="text-white mb-2">Lecture & Traçage de Plans</h4>
                        <p class="text-secondary small">Traduction précise des schémas isométriques de tuyauterie 3D et des plans de charpentes complexes. Découpe, débit et traçage direct des solides acier.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- RÉALISATIONS -->
    <section id="realisations" class="py-5">
        <div class="container py-5">
            <div class="text-center mb-5">
                <span class="mono text-warning uppercase">PORTFOLIO</span>
                <h2 class="text-white">Projets & Chantiers de Référence</h2>
            </div>
            <div class="row g-4">
                <?php foreach($projects as $p): ?>
                <div class="col-md-6 col-lg-4">
                    <div class="industrial-card p-0 h-100 flex flex-column">
                        <div class="weld-cover">
                            <img src="<?php echo clean($p['image_url']); ?>" alt="<?php echo clean($p['title']); ?>" class="img-fluid w-100" style="height: 220px; object-fit: cover;">
                            <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 mono"><?php echo clean($p['category']); ?></span>
                        </div>
                        <div class="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                            <div>
                                <h4 class="text-white mb-2"><?php echo clean($p['title']); ?></h4>
                                <p class="text-secondary small mb-3"><?php echo clean($p['description']); ?></p>
                            </div>
                            <div>
                                <div class="mb-2"><strong class="small text-white uppercase tracking-wider">Techniques :</strong> <span class="text-warning small d-block"><?php echo clean($p['techniques']); ?></span></div>
                                <div><strong class="small text-white uppercase tracking-wider">Matériaux :</strong> <span class="text-secondary small d-block"><?php echo clean($p['materials']); ?></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- CERTIFICATIONS -->
    <section id="diplomes" class="py-5 bg-black bg-opacity-20 border-top border-secondary border-opacity-10">
        <div class="container py-5">
            <div class="text-center mb-5">
                <span class="mono text-warning uppercase">CONFORMITÉ</span>
                <h2 class="text-white">Diplômes & Qualifications Techniques</h2>
            </div>
            <div class="row g-4 justify-content-center">
                <?php foreach($diplomas as $d): ?>
                <div class="col-md-6 col-lg-4">
                    <div class="industrial-card text-center h-100 flex flex-column justify-content-between">
                        <div>
                            <span class="badge bg-secondary mb-3 mono"><?php echo clean($d['year_value']); ?></span>
                            <h4 class="text-white mb-2"><?php echo clean($d['title']); ?></h4>
                            <p class="text-warning small font-display mb-1"><?php echo clean($d['issuer']); ?></p>
                            <?php if(!empty($d['standard'])): ?>
                            <p class="text-secondary small mono mb-4"><?php echo clean($d['standard']); ?></p>
                            <?php endif; ?>
                        </div>
                        <div class="weld-cover mb-3" style="max-height: 150px; overflow: hidden; cursor: zoom-in;" onclick="openZoom('<?php echo clean($d['image_url']); ?>')">
                            <img src="<?php echo clean($d['image_url']); ?>" alt="Diplome" class="img-fluid rounded">
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- FORMULAIRE DE CONTACT -->
    <section id="contact" class="py-5 border-top border-secondary border-opacity-10">
        <div class="container py-5">
            <div class="row g-5 align-items-center">
                <div class="col-lg-5">
                    <span class="mono text-warning uppercase">CONTACT</span>
                    <h2 class="text-white mb-4">Lançons Votre Chantier Métallique</h2>
                    <p class="text-secondary mb-4">Je suis mobile pour toute opportunité nationale et internationale. Pour vos structures acier carbone ou alliage d'exception, transmettez vos DMOS et plans de charges.</p>
                    
                    <div class="d-flex flex-column gap-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="bg-secondary bg-opacity-20 p-3 rounded"><i class="text-warning" data-lucide="phone"></i></div>
                            <div>
                                <small class="text-muted d-block uppercase tracking-wider">Téléphone / WhatsApp</small>
                                <a href="tel:<?php echo clean($phone); ?>" class="text-white text-decoration-none fw-semibold"><?php echo clean($phone); ?></a>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <div class="bg-secondary bg-opacity-20 p-3 rounded"><i class="text-warning" data-lucide="mail"></i></div>
                            <div>
                                <small class="text-muted d-block uppercase tracking-wider">Adresse E-mail</small>
                                <a href="mailto:<?php echo clean($email); ?>" class="text-white text-decoration-none fw-semibold"><?php echo clean($email); ?></a>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <div class="bg-secondary bg-opacity-20 p-3 rounded"><i class="text-warning" data-lucide="map-pin"></i></div>
                            <div>
                                <small class="text-muted d-block uppercase tracking-wider">Localisation Principale</small>
                                <span class="text-white fw-semibold"><?php echo clean($address); ?></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-7">
                    <div class="industrial-card">
                        <h4 class="text-white mb-4">Formulaire de Contact Sécurisé</h4>
                        <div id="contactAlert" class="alert d-none"></div>
                        <form id="phpContactForm" action="submit_contact.php" method="POST">
                            <?php echo csrf_field(); ?>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label small text-uppercase tracking-wider text-muted">Nom Complet *</label>
                                    <input type="text" name="name" class="form-control bg-dark border-secondary text-white py-2" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label small text-uppercase tracking-wider text-muted">Adresse E-mail *</label>
                                    <input type="email" name="email" class="form-control bg-dark border-secondary text-white py-2" required>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label small text-uppercase tracking-wider text-muted">Numéro de Téléphone / WhatsApp</label>
                                    <input type="text" name="phone" class="form-control bg-dark border-secondary text-white py-2">
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label small text-uppercase tracking-wider text-muted">Objet du Message *</label>
                                    <input type="text" name="subject" class="form-control bg-dark border-secondary text-white py-2" required>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label small text-uppercase tracking-wider text-muted">Votre Message *</label>
                                    <textarea name="message" rows="5" class="form-control bg-dark border-secondary text-white py-2" required></textarea>
                                </div>
                                <div class="col-12 mt-4 text-end">
                                    <button type="submit" class="btn btn-premium d-inline-flex align-items-center gap-2">
                                        <i data-lucide="send"></i> Envoyer le Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-5 bg-black bg-opacity-40 border-top border-secondary border-opacity-10">
        <div class="container text-center text-sm-start d-sm-flex justify-content-between align-items-center gap-3">
            <span class="text-secondary small">© <?php echo date('Y'); ?> TRAORÉ JOSEPH KASSIRI STÉPHANE - Tous droits réservés.</span>
            <div class="d-flex text-center justify-content-center gap-3 mt-3 mt-sm-0">
                <a href="admin.php" class="mono text-muted small text-decoration-none hover-text-warning"><i class="align-middle" data-lucide="lock" style="width: 14px; height: 14px;"></i> Accéder à l'Administration</a>
            </div>
        </div>
    </footer>

    <!-- LIGHTBOX MODALE -->
    <div class="modal fade" id="imageZoomModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 bg-transparent text-center">
                <div class="modal-body p-0 position-relative">
                    <img id="modalZoomImg" src="" alt="Diplome Zoom" class="img-fluid rounded border border-secondary">
                    <button type="button" class="btn btn-dark btn-sm position-absolute top-0 end-0 m-3 text-white rounded-circle" data-bs-dismiss="modal">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- BOUTON RETOUR EN HAUT -->
    <div id="btnBackToTop" class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        <i data-lucide="arrow-up"></i>
    </div>

    <!-- Bootstrap 5 JavaScript Bundle CND -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Initialiser les icônes Lucide
        lucide.createIcons();

        // Gestionnaire de Lightbox Zoom
        const zoomModal = new bootstrap.Modal(document.getElementById('imageZoomModal'));
        const zoomImgEl = document.getElementById('modalZoomImg');
        function openZoom(url) {
            zoomImgEl.src = url;
            zoomModal.show();
        }

        // Affichage dynamique du bouton de retour en haut au défilement
        const backToTopBtn = document.getElementById('btnBackToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Envoi sécurisé asynchrone du formulaire de contact via AJAX
        const form = document.getElementById('phpContactForm');
        const alertBox = document.getElementById('contactAlert');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alertBox.className = 'alert alert-info';
            alertBox.innerHTML = 'Transmission en cours...';
            alertBox.classList.remove('d-none');

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alertBox.className = 'alert alert-success';
                    alertBox.innerHTML = data.message;
                    form.reset();
                } else {
                    alertBox.className = 'alert alert-danger';
                    alertBox.innerHTML = data.message;
                }
            })
            .catch(err => {
                alertBox.className = 'alert alert-danger';
                alertBox.innerHTML = 'Erreur réseau. Impossible de contacter le serveur de traitement.';
            });
        });
    </script>
</body>
</html>
