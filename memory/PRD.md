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

## Backlog priorisé
- P0 : (aucun bloquant)
- P1 : notification email au libraire à chaque commande (Resend) ; page admin des commandes
- P2 : multi-auteurs (routing /[slug], structure prête) ; versions HD des visuels (fournies par l'utilisateur ou régénérées) ; audio des extraits ; version arabe/anglaise
