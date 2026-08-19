# PRD — Mīrāth · Archives vivantes (librairie islamique storytelling)

## Problème initial (verbatim)
« jveux révolutionner les librairies islamiques en ligne. On va apporter un angle story telling. Theme sombre. On voit l'auteur avec des animations et apparition au scroll. J'aime bcp le site mounis.app. tu peux t'inspirer du thème. Style archives, historique. On voit l'auteur apparaitre genre Ibn al-Qayyim al-Jawziyya (photo détourée). Ensuite on scroll : animation avec une carte du monde qui apparait et un point là où le livre a été écrit. Une timeline qui apparait au scroll avec la période où il a vécu : 1292–1350. Et son lieu sur la carte : un point animé à Damas en Syrie. Au scroll le livre apparait et bouge. On peut consulter quelques pages. »

## Choix utilisateur
- Page immersive unique dédiée à Ibn al-Qayyim et « Les Méditations » (Al-Fawā'id, éditions Tawbah)
- Extraits réels en français (traduction libre) — quelques feuillets consultables
- Bouton « Commander » → formulaire de commande (sans paiement en ligne)
- Uniquement Ibn al-Qayyim, mais structure de données multi-auteurs (src/data/content.js : tableau `authors`)

## Architecture
- Frontend : React 19 + Tailwind + framer-motion (scroll reveals, parallax, page-turn) + lenis (momentum scroll) + react-simple-maps (carte du monde, topojson local /public/world-110m.json)
- Backend : FastAPI + MongoDB (motor) — POST/GET /api/orders
- Design : dark #0B0C10, or #D4AF37, crème #F2EBE5 ; Cormorant Garamond / Amiri / Manrope / IBM Plex Mono ; grain overlay ; guidelines dans /app/design_guidelines.json

## Personas
- Amateur de patrimoine islamique francophone cherchant une expérience d'achat émotionnelle
- Libraire/éditeur voulant valoriser chaque ouvrage par son histoire

## Implémenté (19/08/2026)
- Hero cinétique : révélation ligne par ligne masquée, portrait détouré en parallax, calligraphie d'arrière-plan, spotlight or
- Marquee éditorial lent (75s)
- Chapitre 01 L'Homme : portrait encadré, bio, stats (58 ans / +60 ouvrages / 16 ans avec Ibn Taymiyya)
- Chapitre 02 Le Lieu : carte du monde Mercator, point or pulsant sur Damas (33.51°N, 36.27°E), cartouche d'archive
- Chapitre 03 Chronologie : timeline verticale dessinée au scroll, 5 événements 1292→1350 (dates H + JC)
- Chapitre 04 Le Livre : livre flottant piloté au scroll (rotation/translation), prix 24,90 €, lecteur d'extraits (5 feuillets, page-turn animé, navigation points/flèches, fermeture Échap)
- Chapitre 05 Commande : formulaire (nom, email, quantité, note) → POST /api/orders → reçu Nº + toast
- Commandes persistées en MongoDB (collection `orders`)

## Vérifié
- curl POST/GET /api/orders OK (commande e2e « Moussa Diallo » persistée)
- Screenshots e2e : hero, chapitres 01–04, lecteur (ouverture, page suivante), commande soumise avec succès

## Backlog priorisé
- P0 : (aucun bloquant)
- P1 : notification email au libraire à chaque commande (Resend) ; page admin listant les commandes
- P2 : multi-auteurs (routing /auteurs/[slug], la structure data est prête) ; audio des extraits (TTS) ; version arabe/anglaise ; vraies photos des pages du livre
