# Agence Prela - Site Vitrine

## Énoncé du Problème Original
Site vitrine pour Agence Prela - Bureau d'études en bâtiment depuis 2009 (agenceprela.fr)
- Design élégant, frais, tons clairs inspiré de bijoux raffinés
- Sections: Hero, Services, Témoignages, Paiement Stripe, Portfolio, Référents, Contact

## Personas Utilisateurs
1. **Promoteurs/Constructeurs** - Besoin d'études réglementaires et permis de construire
2. **Particuliers** - Projets de construction/rénovation
3. **Collectivités** - Accompagnement administratif
4. **Bureaux d'études partenaires** - Collaboration sur projets

## Exigences Principales (Statiques)
- Site one-page responsive avec navigation fluide
- Sections: Hero, Services, Témoignages, Portfolio, Référents, Terroir, FAQ, Contact
- Boutons de paiement Stripe externes (liens fournis)
- Design typographie: Cormorant Garamond (titres) + Outfit (corps)
- Couleurs: tons champagne/crème (#C5A880, #FAFAFA, #F3F2F0)

## Ce Qui a Été Implémenté
- [x] Header avec navigation sticky glassmorphism
- [x] Hero section avec profil Véronique Mazeau et CTAs
- [x] Section Services (4 prestations: Jalon gratuit, Consultation 120€, Aplomb 149€, Mission 100€ acompte)
- [x] Carte Aplomb avec détails dépliables (analyse complète des contraintes)
- [x] Bannière témoignages clients avec marquee animé (8 avis Google)
- [x] Portfolio avec galerie de projets + lightbox + ombres portées
- [x] Section Référents conseillés (5 experts dans 2 catégories)
- [x] Section Terroir (photos Corse & Périgord Pourpre)
- [x] FAQ (5 questions fréquentes)
- [x] Section Contact avec formulaire de demande de devis (backend API)
- [x] Bannière ciel avant le footer (texte blanc étiré)
- [x] Widget accessibilité PMR (taille texte + contraste)
- [x] Footer avec mentions légales
- [x] Animations Framer Motion + Smooth scroll Lenis
- [x] Responsive mobile

## Architecture Technique
- Frontend: React + Tailwind CSS + Framer Motion + Lenis
- Backend: FastAPI + MongoDB (pour formulaire devis uniquement)
- Pas d'authentification requise

## Liens Stripe Configurés
- Jalon (Gratuit): https://fanciful-toffee-243ec4.netlify.app/
- Consultation 1h (120€): https://buy.stripe.com/5kQcN4dkobxWbkZ4Zi4ow02
- Aplomb (149€): https://buy.stripe.com/3cI7sKa8c31q3Sx2Ra4ow05
- Acompte Mission (100€): https://buy.stripe.com/5kQ8wO804eK8exb1N64ow06

## API Endpoints
- POST /api/devis - Créer une demande de devis
- GET /api/devis - Liste des demandes de devis

## Backlog Priorisé
### P1 (Important) - À Faire
- [ ] SEO optimisation (meta tags, Open Graph)
- [ ] Ajouter plus d'images portfolio (user ajoutera)

### P2 (Souhaitable)
- [ ] Blog/Actualités
- [ ] Notification email lors d'une demande de devis
