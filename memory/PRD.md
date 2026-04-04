# Agence Prela - Site Vitrine

## Énoncé du Problème Original
Site vitrine pour Agence Prela - Bureau d'études en bâtiment depuis 2009 (agenceprela.fr)
- Design élégant, frais, tons clairs inspiré de bijoux raffinés
- Sections: Hero, Services, Témoignages, Portfolio, Référents, Terroir, FAQ, Contact

## Ce Qui a Été Implémenté (complet)
- [x] Header navigation sticky glassmorphism (sans bouton CTA)
- [x] Hero section avec photo profil nature + CTA "Demander un devis"
- [x] Section À propos avec citation Saint-Exupéry
- [x] Section Services — 4 cartes directes (Jalon, Consultation, Aplomb dépliable, Mission)
- [x] Bannière témoignages marquee (8 avis Google)
- [x] Portfolio avec galerie + lightbox + ombres portées
- [x] Section Référents (5 experts, 2 catégories)
- [x] Section Terroir (Lauzes, Granite Corse, Olivier/église, Jasmin)
- [x] FAQ (5 questions)
- [x] Section Contact avec formulaire de devis (POST /api/devis)
- [x] Bannière ciel — texte doré scintillant avec ombre blanche
- [x] Widget accessibilité PMR
- [x] Footer avec mentions légales
- [x] SEO complet (meta, Open Graph, Twitter cards, canonical)
- [x] Responsive mobile
- [x] Animations Framer Motion + Smooth scroll Lenis

## Architecture
- Frontend: React + Tailwind CSS + Framer Motion + Lenis
- Backend: FastAPI + MongoDB (formulaire devis)
- Paiements: Liens Stripe externes

## Backlog futur
- [ ] Notification email devis (Resend — quand clé API disponible)
- [ ] Ajout images portfolio
- [ ] Blog/Actualités
