# Agence Prela - Site Vitrine

## Énoncé du Problème Original
Site vitrine pour Agence Prela - Bureau d'études en bâtiment depuis 2009 (agenceprela.fr)
- Design élégant, frais, tons clairs inspiré de bijoux raffinés
- Sections: Hero, Services, Témoignages, Portfolio, Référents, Terroir, FAQ, Contact

## Personas Utilisateurs
1. **Promoteurs/Constructeurs** - Besoin d'études réglementaires et permis de construire
2. **Particuliers** - Projets de construction/rénovation
3. **Collectivités** - Accompagnement administratif
4. **Bureaux d'études partenaires** - Collaboration sur projets

## Exigences Principales
- Site one-page responsive avec navigation fluide
- Boutons de paiement Stripe externes (liens fournis)
- Formulaire de demande de devis (backend FastAPI + MongoDB)
- Design typographie: Cormorant Garamond (titres) + Outfit (corps)
- Couleurs: tons champagne/crème (#C5A880, #FAFAFA, #F3F2F0)

## Ce Qui a Été Implémenté
- [x] Header avec navigation sticky glassmorphism + bouton unique "Demander un devis"
- [x] Hero section avec profil Véronique Mazeau et CTA devis
- [x] Section À propos avec citation Saint-Exupéry
- [x] Section Services — 4 cartes directes (Jalon, Consultation, Aplomb, Mission)
- [x] Carte Aplomb avec détails dépliables
- [x] Bannière témoignages clients marquee (8 avis Google)
- [x] Portfolio avec galerie + lightbox + ombres portées
- [x] Section Référents (5 experts, 2 catégories)
- [x] Section Terroir (4 photos: Lauzes, Granite Corse, Olivier/église, Jasmin)
- [x] FAQ (5 questions)
- [x] Section Contact avec formulaire de devis complet (POST /api/devis)
- [x] Bannière ciel avant footer (texte blanc, espacement lisible)
- [x] Widget accessibilité PMR
- [x] Footer avec mentions légales
- [x] Responsive mobile vérifié
- [x] Animations Framer Motion + Smooth scroll Lenis

## Architecture
- Frontend: React + Tailwind CSS + Framer Motion + Lenis
- Backend: FastAPI + MongoDB (formulaire devis)
- Paiements: Liens Stripe externes

## Liens Stripe
- Jalon (Gratuit): https://fanciful-toffee-243ec4.netlify.app/
- Consultation (120€): https://buy.stripe.com/5kQcN4dkobxWbkZ4Zi4ow02
- Aplomb (149€): https://buy.stripe.com/3cI7sKa8c31q3Sx2Ra4ow05
- Mission acompte (100€): https://buy.stripe.com/5kQ8wO804eK8exb1N64ow06

## API Endpoints
- POST /api/devis - Créer une demande de devis
- GET /api/devis - Liste des demandes

## Backlog
### P1
- [ ] SEO optimisation (meta tags, Open Graph)
- [ ] Notification email lors d'une demande de devis

### P2
- [ ] Blog/Actualités
- [ ] Ajout d'images portfolio supplémentaires
