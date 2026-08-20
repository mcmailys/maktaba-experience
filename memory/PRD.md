# PRD — Mīrāth · Archives vivantes (librairie islamique storytelling)

## Problème initial (verbatim)
« jveux révolutionner les librairies islamiques en ligne. On va apporter un angle story telling. Theme sombre. On voit l'auteur avec des animations et apparition au scroll. J'aime bcp le site mounis.app. tu peux t'inspirer du thème. Style archives, historique. On voit l'auteur apparaitre genre Ibn al-Qayyim al-Jawziyya. ensuite on scroll ya une animation avec une carte du monde qui apparait et un point là ou le livre a été écrit. uen limeline qui apparait au scroll avec la période ou il a vecu Période de vie : 1292–1350. Et son lieu sur la carte un point animé à Damas en Syrie. au scroll le livre apparait est bouge. On peut consulter quelques pages »

## Itération 2 (19/08/2026) — mockups mobiles fournis par l'utilisateur
L'utilisateur a rejeté la V1 et fourni 5 mockups mobiles. Direction adoptée : clair-obscur type peinture à l'huile, colonne centrée éditoriale, visuels issus des mockups (portrait de profil, carte antique avec lignes lumineuses et loupe sur Damas, livre debout, skyline de Damas, pages de manuscrit calligraphié).

## Choix utilisateur
- Page immersive unique dédiée à Ibn al-Qayyim et « Les Méditations »
- Extraits en français (traduction libre) — feuilletage 5 pages
- Bouton « Commander » → formulaire de commande (sans paiement en ligne)
- Structure de données multi-auteurs (src/data/content.js : tableau `authors`)

## Architecture
- Frontend : React 19 + Tailwind + framer-motion + lenis (momentum scroll)
- Backend : FastAPI + MongoDB (motor) — POST/GET /api/orders
- Assets : visuels extraits des mockups utilisateur (public/assets/) + crops d'un manuscrit ancien (pages d'extrait)
- Design : dark #0B0C10, or #D4AF37, crème #F2EBE5 ; Cormorant Garamond / Amiri / Manrope / IBM Plex Mono ; grain overlay

## Implémenté
- V2 (19/08/2026) — refonte complète selon mockups :
  - Hero : portrait huile de profil, titre « IBN AL-QAYYIM » révélé ligne par ligne, nom complet, 1292—1350, texte vertical latéral, bouton circulaire « Scrollez pour explorer »
  - 01 Son Histoire : timeline verticale dorée à points lumineux (1292 → 1350, textes des mockups), skyline de Damas en bas de section
  - 02 Son Lieu : « Damas, au cœur des terres du Shâm », carte antique avec routes lumineuses et loupe circulaire sur Damas (visuel du mockup), reveal au scroll
  - 03 Son Œuvre : livre debout flottant (parallax), « MEDITATIONS », méta Langue/Édition/Pages (Arabe, Dar At-Tawbah, ~600), CTA « Découvrir l'extrait »
  - 04 Lire un extrait : « Feuilletez quelques pages », pages de manuscrit calligraphié avec flèches latérales, indicateur x/5, citation française par page, note « Accès limité à l'extrait — Débloquez le livre complet »
  - 05 Recevoir l'ouvrage : récapitulatif + formulaire de commande → POST /api/orders → reçu Nº + toast
- V1 (19/08/2026) : première version (remplacée par V2)

## Vérifié
- Screenshots e2e V2 : hero, timeline + skyline, carte, livre, extrait (page 2/5 tournée), formulaire de commande
- Backend : POST/GET /api/orders OK (3 commandes de test en base)
- V3 (19/08/2026) : zoom carte vérifié en 4 phases (départ → Syrie → Damas → anneau+label+légende), anneau ancré exactement sur la lueur de Damas (60.3%, 67.4% de l'image) ; défilement automatique de la timeline confirmé (transform en mouvement mesuré)

## Itération 3 (19/08/2026) — animations demandées par l'utilisateur
- Carte : section sticky (340vh) avec zoom scroll-driven monde → Syrie → Damas (scale 1→2.9 ancré sur Damas), titre qui s'efface, anneau pulsant + label « DAMAS — SYRIE 33.51°N, 36.27°E » puis légende finale qui apparaissent au scroll
- Timeline : devenue horizontale à défilement automatique infini (CSS, pause au survol), points dorés lumineux, skyline de Damas conservée

## Itération 4 (19/08/2026) — carte vectorielle digitale (refonte carte)
L'utilisateur a rejeté le zoom d'image statique. Nouvelle implémentation : carte du monde VECTORIELLE (react-simple-maps + topojson local /public/world-110m.json), section sticky 340vh :
- Zoom scroll-driven smooth (springs framer-motion) : ×1 monde → ×8.5 centré sur Damas (36.27°E, 33.51°N)
- La Syrie s'illumine progressivement en or (fill + stroke + drop-shadow interpolés par le scroll)
- Marqueur Damas : point sombre cerclé de crème, anneaux pulsants, label « DAMAS / SYRIE — 33.51°N, 36.27°E » avec contour sombre (lisible sur l'or)
- Readout digital en bas à gauche : « ZOOM ×n — lat° N, lon° E » mis à jour en direct
- Routes dorées animées (ajout 19/08/2026) : arcs courbes Damas → Istanbul, Le Caire, Bagdad qui se dessinent (stroke-dashoffset) en cascade pendant le zoom (~×5-7), points lumineux + labels des villes en fondu différé ; rejoués à chaque passage
- Retrait routes + plein écran (19/08/2026, demande utilisateur) : routes/villes voisines supprimées ; la carte n'est plus encadrée — elle occupe toute la largeur de l'écran (preserveAspectRatio slice) avec fondu doux en haut et en bas (mask-image), titre et légende en surimpression
- Retouches (19/08/2026, demande utilisateur) : section carte raccourcie (340vh → 220vh, zoom plus rapide) ; label DAMAS agrandi (17/zoom) en texte sombre sans contour noir ; skyline de Damas déplacée en arrière-plan de la timeline (opacité 30% + voile) ; nom « ابن قيم الجوزية » en calligraphie arabe dorée au centre du header ; mention « Scrollez pour explorer » supprimée du hero (bouton chevron conservé)
- Retouches 2 (19/08/2026, demande utilisateur) : skyline de la timeline plus visible (opacité 55%, voile allégé) et débordant de 10rem sous la section (overflow visible) ; flèche de scroll du hero supprimée ; hero allongé à 135vh (portrait 72% de hauteur, contenu en bas, pb-24)

## Itération 5 (19/08/2026) — vidéo du livre au scroll + retouches
- Vidéo utilisateur (rotation du livre, 7s, ProRes alpha) convertie en MP4 H.264 + WebM VP9 (fallback), fond recomposé sur #0B0C10 ; section « Son Œuvre » : zone sticky 240vh, lecture scrubée par le scroll (spring), figée sur la dernière frame (4ᵉ de couverture) ; poster = première frame
- Prix aligné sur la 4ᵉ de couverture : 15 € ; méta corrigée : Langue Français, Édition Tawbah
- Label DAMAS en blanc (demande utilisateur) ; hero revenu à 100vh ; titre en révélation masquée douce au chargement (refresh), nom/dates en fondu whileInView ; NB : whileInView ne se déclenche pas sur le span masqué du titre (framer-motion v11 + StrictMode) — animate au montage utilisé à la place
- Vérifié : currentTime 0.33 → 4.13 → 6.98s (= duration − 0.08) aux 3 profondeurs ; label blanc lisible ; titre opacity 1 au chargement
- Correctif mobile (19/08/2026) : amorçage play/pause au chargement des métadonnées (autoplay muet + playsInline) pour que le scrub fonctionne sur mobile (iOS n'exécute pas currentTime sur une vidéo jamais lue) ; halo doré derrière la vidéo supprimé (faisait ressortir le cadre) ; vérifié en viewport mobile 390×844 : currentTime 0.28 → 3.49 → 6.94s, pas de halo visible
- Vidéo finale finish.mov (19/08/2026) : remplace la première ; encodage full-range (coin = 11,13,16 ≈ fond #0B0C10) ; effet de brume animé (5 couches CSS blur 70px, dérives 22-32s alternées) placé DEVANT la vidéo (z-20) pour fondre le cadre dans la brume ; mesures pixel : intérieur vidéo = fond page (18,17,23), fusion parfaite
- Fluidité mobile (19/08/2026) : le scrub par currentTime saccadait sur mobile (seeks coûteux). Stratégie split : pointer coarse → lecture native fluide déclenchée par IntersectionObserver quand la vidéo est visible (pause hors vue, fin = dernière frame) ; pointer fine (desktop) → scrub au scroll conservé. Vérifié desktop (0.33 → 4.13 → 6.977s) ; chemin mobile à confirmer sur appareil réel (non émulable dans l'outil de test)
- SOLUTION FINALE (19/08/2026, bugs iPhone : cadre noir + autoplay + frame noire finale) : vidéo remplacée par une SÉQUENCE D'IMAGES — 101 frames WebP avec alpha (15fps, -t 6.7s pour couper le fondu au noir final), 2,9 Mo, dessinées dans un <canvas> 720×1000 piloté par le scroll (drawImage — fluide partout, iOS compris). Plus de cadre noir (transparence réelle sur tous navigateurs), lecture strictement liée au scroll sur mobile et desktop, fin = 4ᵉ de couverture. Anciens fichiers vidéo supprimés. Vérifié desktop + mobile 390×844 (pixels canvas dessinés, rotation visible sur fond bibliothèque)
- Retouches 3 (19/08/2026, demande utilisateur) : label DAMAS + coordonnées agrandis (24/zoom et 10.5/zoom) et décollés du point ; écart « Son Œuvre » → vidéo réduit (pt-20, -mb-10) ; timeline horizontale ne démarre qu'à l'affichage (IntersectionObserver ajoute .timeline-running, animation-play-state paused par défaut) — vérifié paused → running ; titre livre « Les Méditations » + date d'écriture « Écrit à Damas — XIVᵉ siècle » sous le titre ; hero renommé « Ibn Qayyim Al-Jawziyyah » avec grande calligraphie ابن قيم الجوزية en overlay pleine largeur (opacité 0.09, fade-in différé). NB : demande « dans decouvrir l'extrait » tronquée — en attente de la suite
- Retouches 4 (19/08/2026) : hero raccourci (85vh, contenu remonté pb-20) ; calligraphie arabe déplacée en haut du hero au-dessus du portrait (top 9%, opacité 0.16) ; nouvelle vidéo (réupload 23_29_08_1.mov) re-extraite en 101 frames WebP alpha (fin coupée à 6.7s avant fondu noir) — remplace la séquence précédente, même pipeline canvas
- Retouches 5 (19/08/2026) : FIX timeline immobile sur mobile — le seuil IntersectionObserver 0.15 n'était jamais atteint car la piste fait ~3400px de large (ratio visible max ~0.13 sur mobile) → threshold 0.02, vérifié paused→running→mouvement en 390px ; fond bibliothèque renforcé (opacité 45%, voile allégé) ; espace avant « Lire un extrait » réduit (pt-16) ; CTA « Découvrir l'extrait » remplacé par une fiche produit : stepper quantité (−/+ 1-5) + bouton or « Ajouter au panier — 15 € » → toast + scroll vers #commande + quantité préremplie via CustomEvent « mirath:cart » (vérifié : 3 clics → select = 3 exemplaires) ; lien discret « Feuilleter l'extrait » conservé dessous
- Retouches 6 (19/08/2026) : nouvelle vidéo du livre (3ᵉ upload) re-extraite en 101 frames WebP alpha (même pipeline, -t 6.7s) ; EXTRAIT : vraie animation de page qui se tourne en 3D CSS (perspective 1800px, feuillet rotateY 0→−180 autour de la tranche gauche, verso parchemin, ombrage animé 0→0.55→0, backface-visibility hidden) — pièges corrigés : course mount/AnimationControls (double rAF avant start) et aplatissement 3D (perspective déplacée sur le parent direct, overflow-hidden retiré) ; vérifié par matrice matrix3d à −30° puis −178° + captures du feuillet en vol
- Retouches 7 (19/08/2026) : calligraphie hero ابن قيم الجوزية repositionnée PAR-DESSUS le titre (centrée sur le h1, z au-dessus, opacité 0.16) au lieu d'être au-dessus de l'image — vérifié desktop + mobile ; puis remontée (translateY −50% → −68%) car un peu trop basse sur mobile
- Extrait vraies pages (19/08/2026) : 4 pages réelles fournies par l'utilisateur (Bismillah calligraphié, Transcription, Biographie p.7, Table des matières p.167) intègrées SANS rognage (object-contain sur fond ivoire #F4EFE4) — feuillet-1..4.jpg ; citations remplacées par des légendes descriptives par page ; verso du feuillet 3D passé en ton ivoire ; vérifié : indicateur 1/4→2/4, légendes correctes, rotation 3D capturée en vol
- Section « 05 — Autres Livres » (20/08/2026) : après le feuilletage, section sticky (5×90vh) — les 5 couvertures PNG transparentes fournies par l'utilisateur (Péchés et Guérison, L'Esprit de l'Âme, Les Intrigues du Diable, Ainsi était Muhammad, Nos Pieux Prédécesseurs) changent au scroll (entrée montée+rotation, sortie vers le haut), titre révélé en masque à chaque livre, points de progression + compteur 01/05 ; OrderSection renumérotée 06 ; NB : book-4 garde un petit reflet résiduel sous le livre (alpha source). Vérifié : titres défilés 1→2→4→5 en captures
- Vidéo alpha + fond (19/08/2026, demande utilisateur) : le canal alpha de finish.mov est un vrai détourage (63% transparent) → encodage WebM VP9 avec transparence (book-alpha.webm) ; image de fond bibliothèque (library-bg.jpg, opacité 30% + voile) derrière le livre — plus aucun cadre visible. Initialement cachée sur Safari (pas de VP9 alpha), puis activée pour TOUS (demande utilisateur qui ne la voyait pas sur mobile) : sur Safari la vidéo MP4 à fond uni se superpose à l'image assombrie, cadre quasi invisible (mesures pixel quasi identiques). autoPlay rétabli pour l'affichage immédiat de la première frame sur iOS. Espacements resserrés : zone sticky 240vh → 160vh, pt-32 → pt-24, pb-32 → pb-24
- Vérifié en captures à 3 profondeurs (monde, Syrie illuminée ×7.4, Damas ×8.5) + captures routes (dessin ×7.6 et final ×8.5) + captures plein écran (monde, Syrie ×6.8, Damas ×8.5)

## Backlog priorisé
- P0 : (aucun bloquant)
- P1 : notification email au libraire à chaque commande (Resend) ; page admin des commandes
- P2 : multi-auteurs (routing /[slug], structure prête) ; versions HD des visuels (fournies par l'utilisateur ou régénérées) ; audio des extraits ; version arabe/anglaise
