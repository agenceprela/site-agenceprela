# Agence Prela - Site Vitrine

## Énoncé du Problème Original
Site vitrine pour Agence Prela - Bureau d'études en bâtiment depuis 2009 (agenceprela.fr)

## Ce Qui a Été Implémenté (complet)
- [x] Header navigation sticky glassmorphism
- [x] Hero section avec photo profil + CTAs
- [x] Section À propos dépliable (citation + texte complet)
- [x] Section Services — 4 cartes (Jalon, Consultation, Aplomb dépliable, Mission)
- [x] Bannière témoignages marquee (8 avis Google)
- [x] Portfolio avec galerie + lightbox + ombres portées
- [x] Section Référents (recommandés si besoin)
- [x] Section Terroir (4 photos sans titre)
- [x] FAQ
- [x] Section Contact avec formulaire de devis (POST /api/devis)
- [x] Widget accessibilité PMR
- [x] Footer avec mentions légales
- [x] SEO complet : meta enrichies, Schema.org LocalBusiness, alt descriptifs, H2 sémantiques, Open Graph, Twitter cards
- [x] Responsive mobile

## Architecture
- Frontend: React + Tailwind CSS + Framer Motion + Lenis
- Backend: FastAPI + MongoDB (formulaire devis)
- Paiements: Liens Stripe externes

## Backlog futur
- [ ] Notification email devis (Resend)
- [ ] Ajout images portfolio
- [ ] Blog/Actualités
