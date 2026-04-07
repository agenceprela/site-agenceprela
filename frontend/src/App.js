import { useEffect, useRef } from "react";
import "@/App.css";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import Lenis from "lenis";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  FileText, 
  Building2, 
  Users, 
  CreditCard,
  Youtube,
  Instagram,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Star,
  Info,
  Briefcase,
  Accessibility,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun
} from "lucide-react";
import { useState, useCallback } from "react";

// Assets
const ASSETS = {
  logo: "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/18ge5v5s_logo%20fond%20transparnet.png",
  heroBackground: "https://static.prod-images.emergentagent.com/jobs/9f4d5ced-1252-4d4d-84b4-8f449859b862/images/44470d4692f1ef36d4ecde18df28e14401b93f1e2ee45a814e1a887fb107b401.png",
  profilePhoto: "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/lrorx3rn_Gemini_Generated_Image_awv6kcawv6kcawv6.jpeg",
  portfolio: [
    "https://customer-assets.emergentagent.com/job_9f4d5ced-1252-4d4d-84b4-8f449859b862/artifacts/6pm6fb1q_CHT%20DST.jpg",
    "https://customer-assets.emergentagent.com/job_9f4d5ced-1252-4d4d-84b4-8f449859b862/artifacts/jr0at7lv_permis%20de%20construire.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/fsd73e6f_am%C3%A9nagement%20exterieur.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/mkku4xr2_amenagement%20interieur.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/l2o6oogw_BTK%202.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/sithft8j_EXTENSION.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/xp04tq1m_Gemini_Generated_Image_ppghs3ppghs3ppgh%281%29.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/p8lk95yu_4%20lots.jpg",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/fu6yknga_projet%20de%20construction.jpg",
    "/restanque_portfolio.jpg"
  ],
  decorative: [
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/tan7j60y_466158579_9042680795751135_8232406991835141836_n.jpg",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/jsgnt50u_CORSE%20%2816%29.jpg",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/pqhdfxy0_466069785_9041183802567501_7608671728850779865_n.jpg",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/7pt0xsd0_1724402252704.jpg"
  ],
  skyBanner: "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/zw5fi8pm_466343022_9042654035753811_3421513272952920549_n.jpg"
};

// Jalon URL
const JALON_URL = "https://fanciful-toffee-243ec4.netlify.app/";

// Stripe Payment Links
const STRIPE_LINKS = {
  consultation1h: "https://buy.stripe.com/5kQcN4dkobxWbkZ4Zi4ow02",
  acompteMission: "https://buy.stripe.com/5kQ8wO804eK8exb1N64ow06",
  consultationAplomb: "https://buy.stripe.com/3cI7sKa8c31q3Sx2Ra4ow05"
};

// Contact Info
const CONTACT = {
  name: "Véronique Mazeau",
  locations: "Haute-Corse & Périgord Pourpre",
  phone: "06 82 92 72 76",
  email: "contact.agenceprela@gmail.com",
  youtube: "https://www.youtube.com/@AgencePrela",
  instagram: "https://www.instagram.com/agenceprela/"
};

// Services Data
const SERVICES = [
  {
    id: 1,
    title: "Consultation à distance",
    subtitle: "120 €",
    description: "Échange en visio, mail ou par téléphone pour analyser votre projet, cadrer la stratégie, vérifier les points bloquants et orienter les priorités.",
    note: "La consultation se rémunère via un lien de paiement Stripe envoyé par mail après réservation.",
    icon: Phone
  },
  {
    id: 2,
    title: "Aplomb",
    subtitle: "149 €",
    description: "Vérification de conformité des contraintes (PLU, Surfaces, seuil architecte, taxe aménagement, aides financières locales, départementales, nationales, RE2020, ABF, etc.) dans le cadre d'un rendez‑vous individuel à distance.",
    note: "Prestation réglée par lien Stripe après la séance, avant réception du compte-rendu complet PDF.",
    icon: FileText
  },
  {
    id: 3,
    title: "Jalon",
    subtitle: "Gratuit",
    description: "Outil de clarification de projet. Identifiez vos besoins, comprenez les contraintes et obtenez une synthèse claire de votre situation.",
    note: "Accès libre, sans obligation. Possibilité d'approfondir avec une consultation Aplomb.",
    icon: CheckCircle2,
    link: "https://fanciful-toffee-243ec4.netlify.app/"
  },
  {
    id: 4,
    title: "Mission complète",
    subtitle: "Avant-projet sommaire",
    description: "Accompagnement global incluant visualisation 3D du projet, dossiers administratifs (permis, DP, suivi), coordination avec les intervenants, aide à la décision sur le montage urbain et foncier.",
    note: "Estimatif sommaire selon les prix de référence, prêt au chiffrage précis avec artisans et coordinateur. Le client signe ses propres demandes de permis (limité à 150 m² de SDP).",
    icon: Building2
  }
];

// Referents Data
const REFERENTS = [
  {
    category: "BIO Climatique",
    experts: [
      {
        name: "Yannick Brugne",
        location: "Pyrénées-Atlantiques",
        specialty: "Éco-construction bois et isolation paille",
        availability: "Sur site ou à distance",
        experience: "35 ans d'expérience",
        contact: "yannick.brugne@wanadoo.fr",
        social: "FB : YB Habitat Écologique"
      },
      {
        name: "Pierre Monmaillé",
        location: "Dordogne",
        company: "MNConception",
        specialty: "Conception bioclimatique",
        availability: "Sur site ou à distance",
        experience: "20 ans d'expérience",
        contact: "mnconception@gmail.com"
      },
      {
        name: "Philippe Lefèvre",
        location: "Aveyron",
        specialty: "Ingénierie durable, RE2020",
        website: "philippeservices.net",
        experience: "25 ans d'expérience"
      }
    ]
  },
  {
    category: "AMO, Coordination & Consultant Chantier",
    experts: [
      {
        name: "François-Joseph Antonini",
        location: "Corse",
        company: "Déco Concept · Bastia",
        specialty: "AMO, coordination, études de coûts",
        note: "Interlocuteur local en Corse",
        experience: "40 ans d'expérience",
        contact: "decoconcept1@gmail.com"
      },
      {
        name: "Laurent Faure",
        location: "Périgord Pourpre",
        company: "Maurens",
        specialty: "Maçonnerie · Couverture · Dordogne",
        note: "Référent terrain côté client en Périgord Pourpre",
        experience: "35 ans d'expérience",
        contact: "faurelaurent7177@neuf.fr"
      }
    ]
  }
];

// REAL Google Testimonials
const TESTIMONIALS = [
  {
    quote: "Excellents conseillers à l'écoute de nos projets.",
    author: "Anne-Marie Battini",
    rating: 5
  },
  {
    quote: "Très bonne expérience avec Mme Mazeau, elle travaille avec rigueur et reste à l'écoute, de plus elle est disponible.",
    author: "Ecaldane",
    rating: 5
  },
  {
    quote: "Une agence très efficace et réactive. C'est un vrai plaisir de travailler avec une équipe aussi professionnelle. Leurs compétences en conception architecturale sont de premier ordre, avec un travail précis et méticuleux. Je les recommande sans hésitation.",
    author: "Frédéric Noll",
    rating: 5
  },
  {
    quote: "Véronique est très professionnelle, disponible et investie dans son travail, nous la recommandons sans hésitation ! Merci encore pour tout.",
    author: "Ophélie Ferrière",
    rating: 5
  },
  {
    quote: "Excellente expérience ! Véronique est très professionnelle, à l'écoute et d'une efficacité redoutable. Merci pour l'accompagnement.",
    author: "Anthony Don",
    rating: 5
  },
  {
    quote: "Véronique est très à l'écoute, c'est toujours un plaisir de collaborer avec elle.",
    author: "Flo BWH",
    rating: 5
  },
  {
    quote: "Toujours disponible pour échanger et de bons conseils. Je recommande.",
    author: "Nicolas Rohrbach",
    rating: 5
  },
  {
    quote: "Excellent accompagnement, professionnel et à l'écoute de nos besoins.",
    author: "Victor Ferrière",
    rating: 5
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Animated Section Component
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "À propos", href: "#apropos" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" data-testid="header-logo">
            <img src={ASSETS.logo} alt="Agence Prela" className="h-12 w-auto" />
            <span className="font-heading text-xl font-semibold hidden sm:block">Agence Prela</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm tracking-wide link-hover text-[#595959] hover:text-[#C5A880]"
                data-testid={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''} md:hidden`}>
        <div className="p-6 pt-24">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading text-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Demander un devis
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section 
      className="hero-bg min-h-screen flex items-center pt-20"
      style={{ backgroundImage: `url(${ASSETS.heroBackground})` }}
      data-testid="hero-section"
    >
      <div className="hero-content max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 md:order-1"
          >
            <motion.span 
              variants={fadeInUp}
              className="label-elegant"
            >
              Bureau d'études en bâtiment depuis 2009
            </motion.span>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light mt-4 mb-6 leading-tight"
            >
              Agence Prela
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="separator mb-6" />
            
            <motion.p 
              variants={fadeInUp}
              className="font-body text-base md:text-lg text-[#595959] leading-relaxed mb-8"
            >
              Nous accompagnons promoteurs, particuliers, collectivités et bureaux d'études 
              sur la maîtrise des contraintes réglementaires, des permis de construire et 
              de la valorisation foncière, avec des outils internes dédiés à la fiabilité des décisions.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#contact" 
                className="btn-primary inline-flex items-center justify-center gap-2"
                data-testid="hero-cta-primary"
              >
                Demander un devis
                <ChevronRight size={18} />
              </a>
              <a 
                href="#services" 
                className="btn-secondary inline-flex items-center justify-center gap-2"
                data-testid="hero-cta-secondary"
              >
                Découvrir les missions
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Card - Simplified */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="card-elegant p-6 md:p-8 max-w-sm text-center">
              <img 
                src={ASSETS.profilePhoto} 
                alt={CONTACT.name}
                className="w-24 h-24 rounded-full object-cover profile-image mx-auto mb-4"
              />
              <h3 className="font-heading text-xl font-semibold">{CONTACT.name}</h3>
              <p className="font-body text-sm text-[#8A8A8A] mb-4">{CONTACT.locations}</p>
              <a 
                href="#contact" 
                className="text-sm text-[#C5A880] hover:underline inline-flex items-center gap-1"
              >
                Me contacter <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="apropos" className="section-padding bg-[#FAFAFA]" data-testid="about-section">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center">
          <p className="font-heading text-lg text-[#1C1C1C] italic">
            « Pour ce qui est de l'avenir, il ne s'agit pas de le prévoir mais de le rendre possible. »
            <span className="block text-sm text-[#C5A880] mt-1">— Antoine de Saint-Exupéry</span>
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 text-sm text-[#C5A880] hover:text-[#B3956D] font-body inline-flex items-center gap-1 transition-colors"
            data-testid="about-toggle"
          >
            {isExpanded ? "Masquer" : "En savoir plus sur l'agence"}
            <ChevronRight size={14} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </AnimatedSection>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6"
          >
            <div className="card-elegant p-8 md:p-10">
              <div className="font-body text-sm text-[#595959] leading-relaxed space-y-3">
                <p>
                  Diplômée "dessinatrice en bâtiment option dessin de projet" en 2008, j'ai fondé l'Agence Prela en 2009, portée par l'envie concrète de faire de cette reconversion un accomplissement personnel.
                </p>
                <p>
                  Apprendre chaque jour est un lot passionnant, au contact des artisans, des experts du bâti ancien, des éco‑constructeurs et de celles et ceux qui imaginent les espaces avec justesse.
                </p>
                <p>
                  Ce qui me guide, c'est le plaisir de vous proposer des solutions adaptées, vous permettre d'aboutir avec succès, en tenant compte de chaque paramètre.
                </p>
                <p>
                  Au fil des années, j'ai mis au point des outils et des méthodes pour mieux comprendre vos besoins, les règles à suivre, et anticiper les aides ou taxes liées à chaque projet.
                </p>
                <p>
                  Mes forces sont simples : <strong>l'écoute, la sensibilité et la réactivité</strong>, appuyées par une expérience riche et un usage précis de chaque savoir‑faire.
                </p>
                <p>
                  Je propose des consultations courtes, des missions ciblées ou un accompagnement complet jusqu'aux démarches administratives.
                </p>
                <p>
                  Mon réseau indépendant rassemble référents de chantier, artisans, architectes, ingénieurs et consultants bioclimatiques, recommandés uniquement si votre projet le nécessite, selon vos besoins et vos choix.
                </p>
                <p className="font-semibold text-[#C5A880]">
                  Basée en Corse et en Périgord Pourpre, je vous accompagne ici, là‑bas, et au‑delà.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Services Overview Section (Independent services, not sequential)
const ProcessSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const services = [
    { 
      title: "Jalon", 
      tag: "Gratuit",
      color: "#C5A880",
      desc: "Clarifiez votre projet en 5 minutes. Identifiez vos besoins, contraintes et priorités. Obtenez une synthèse claire pour démarrer sereinement.",
      features: ["5 min", "Sans engagement", "Synthèse PDF"],
      action: "Accéder",
      link: "https://fanciful-toffee-243ec4.netlify.app/",
      external: true
    },
    { 
      title: "Consultation", 
      tag: "120 €",
      color: "#B3956D",
      desc: "Échange personnalisé d'1 heure. Analysez votre projet, cadrez la stratégie et recevez des orientations concrètes adaptées à votre situation.",
      features: ["1h visio/tel", "Conseils personnalisés", "Suivi par mail"],
      action: "Réserver",
      link: STRIPE_LINKS.consultation1h,
      external: true
    },
    { 
      title: "Aplomb", 
      tag: "149 €",
      color: "#A08060",
      desc: "Vérification complète des contraintes réglementaires avec compte-rendu PDF détaillé.",
      details: "Ce qu'on analyse ensemble : Formalité exacte · Démarche administrative · Délais d'instruction · Surface de plancher · Seuil architecte · Taxe d'aménagement · Zone PLU · Réglementation d'urbanisme · Loi Littoral · PADDUC · Risques naturels · Aides financières · MaPrimeRénov' · Photovoltaïque · Fourchette de coût au m²",
      detailsExtra: "Tout type de projet : Construction · Rénovation · Extension · Annexe · Habitat léger · Agricole · Commercial · Changement de destination · Aménagement. Tous les profils : Propriétaire · Futur acquéreur · Mandataire · Héritier · Investisseur. Tout le territoire français.",
      detailsNote: "L'outil structure. Mon analyse oriente. Vous repartez avec un PDF clair et un projet cadré.",
      features: ["Analyse complète", "PDF détaillé", "Tout territoire"],
      action: "Commander",
      link: STRIPE_LINKS.consultationAplomb,
      external: true
    },
    { 
      title: "Mission", 
      tag: "Acompte 100 €",
      color: "#8D6B50",
      desc: "Accompagnement complet jusqu'au permis : visuels 3D, dossiers administratifs, coordination des intervenants, estimatif sommaire des travaux.",
      features: ["Visuels 3D", "Dossier permis", "Coordination"],
      action: "Démarrer",
      link: STRIPE_LINKS.acompteMission,
      external: true
    }
  ];

  return (
    <section id="services" className="section-padding bg-[#FAFAFA] relative overflow-hidden" data-testid="services-section">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">Nos prestations</span>
          <h2 className="font-heading text-2xl md:text-3xl font-light mt-4">Nos prestations, à la carte ou en mission complète</h2>
          <p className="font-body text-sm text-[#595959] mt-4 max-w-xl mx-auto">
            Chaque service est indépendant. Les achats sont déduits en cas de mission complète.
          </p>
        </AnimatedSection>

        {/* Detailed cards with links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 border border-[#E6DED5] hover:border-[#C5A880] transition-all hover:shadow-lg flex flex-col"
              data-testid={`process-card-${index}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading text-lg font-semibold">{service.title}</h4>
                <span 
                  className="text-xs font-body text-white px-2 py-1 rounded"
                  style={{ backgroundColor: service.color }}
                >
                  {service.tag}
                </span>
              </div>
              <p className="font-body text-sm text-[#595959] mb-4 leading-relaxed">{service.desc}</p>
              
              {/* Expandable details for Aplomb */}
              {service.details && (
                <div className="mb-4">
                  <button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="text-xs text-[#C5A880] hover:text-[#B3956D] font-medium flex items-center gap-1 transition-colors"
                    data-testid="aplomb-details-toggle"
                  >
                    {expandedCard === index ? "Masquer les détails" : "Voir tous les détails"}
                    <ChevronRight size={14} className={`transition-transform ${expandedCard === index ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2 border-t border-[#E6DED5] pt-3"
                    >
                      <p className="text-xs text-[#595959] leading-relaxed">{service.details}</p>
                      <p className="text-xs text-[#595959] leading-relaxed">{service.detailsExtra}</p>
                      <p className="text-xs text-[#C5A880] italic leading-relaxed">{service.detailsNote}</p>
                    </motion.div>
                  )}
                </div>
              )}
              
              {/* Features list */}
              <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs bg-[#F3F2F0] text-[#8A8A8A] px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
              
              <a
                href={service.link}
                target={service.external ? "_blank" : undefined}
                rel={service.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white py-2 px-4 rounded transition-all hover:opacity-90"
                style={{ backgroundColor: service.color }}
                data-testid={`process-action-${index}`}
              >
                {service.action}
                <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Marquee Section (Real Google Reviews)
const TestimonialsSection = () => {
  return (
    <section className="py-12 bg-[#2A2A2A]" data-testid="testimonials-section">
      <div className="mb-8 text-center">
        <span className="label-elegant text-[#C5A880]">Avis Google</span>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#C5A880" className="text-[#C5A880]" />
          ))}
          <span className="text-white/60 text-sm ml-2">5/5</span>
        </div>
      </div>
      <Marquee 
        speed={35} 
        gradient={false}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <div key={index} className="mx-12 max-w-sm" data-testid={`testimonial-${index}`}>
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={14} fill="#C5A880" className="text-[#C5A880]" />
              ))}
            </div>
            <p className="font-heading text-lg text-white/90 italic leading-relaxed mb-3">"{testimonial.quote}"</p>
            <p className="font-body text-sm text-[#C5A880]">— {testimonial.author}</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

// Sky Banner Section
const SkyBannerSection = () => {
  return (
    <section className="relative h-64 md:h-80 overflow-hidden" data-testid="sky-banner">
      <img 
        src={ASSETS.skyBanner} 
        alt="Ciel et liberté"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-end justify-center pb-10">
        <p className="font-heading text-sm sm:text-xl md:text-3xl font-light tracking-[0.1em] md:tracking-[0.2em] uppercase px-4 text-center sky-banner-text">
          Vos projets méritent de prendre leur envol
        </p>
      </div>
    </section>
  );
};

// Payment Section
const PaymentSection = () => {
  const paymentOptions = [
    {
      title: "Consultation 1h",
      price: "120 €",
      description: "Échange personnalisé pour analyser votre projet et définir les priorités.",
      link: STRIPE_LINKS.consultation1h,
      testId: "stripe-consultation-1h"
    },
    {
      title: "Consultation Aplomb",
      price: "149 €",
      description: "Vérification complète des contraintes réglementaires avec compte-rendu PDF.",
      link: STRIPE_LINKS.consultationAplomb,
      testId: "stripe-aplomb"
    },
    {
      title: "Acompte Mission Complète",
      price: "100 €",
      description: "Premier versement pour démarrer votre accompagnement global (Avant-projet sommaire).",
      link: STRIPE_LINKS.acompteMission,
      testId: "stripe-acompte"
    }
  ];

  return (
    <section id="paiement" className="section-padding bg-[#FAFAFA]" data-testid="payment-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">Paiement sécurisé</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light mt-4">Modalités de paiement</h2>
          <div className="separator mx-auto mt-6" />
          <p className="font-body text-[#595959] mt-6 max-w-2xl mx-auto">
            Toutes nos prestations payantes se règlent via lien de paiement Stripe sécurisé ou par facturation après devis.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {paymentOptions.map((option, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="payment-card p-8 text-center"
            >
              <div className="mb-6">
                <CreditCard size={32} className="mx-auto text-[#C5A880]" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{option.title}</h3>
              {option.price && (
                <p className="font-heading text-3xl text-[#C5A880] mb-4">{option.price}</p>
              )}
              <p className="font-body text-sm text-[#595959] mb-6">{option.description}</p>
              <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="stripe-btn inline-flex items-center justify-center gap-2 w-full"
                data-testid={option.testId}
              >
                Payer via Stripe
                <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Deduction note */}
        <AnimatedSection className="mt-8 text-center">
          <p className="font-body text-sm text-[#8A8A8A] italic">
            Les paiements effectués (Consultation, Aplomb) sont déduits en cas de commande de Mission complète.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Portfolio Section with Lightbox
const PortfolioSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const navigateLightbox = (direction) => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex + direction;
    if (newIndex >= 0 && newIndex < ASSETS.portfolio.length) {
      setSelectedIndex(newIndex);
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-[#F3F2F0]" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">Réalisations</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light mt-4">Réalisations et projets accompagnés</h2>
          <div className="separator mx-auto mt-6" />
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {ASSETS.portfolio.map((image, index) => {
            const portfolioAlts = [
              "Projet permis de construire maison individuelle",
              "Plan avant-projet extension habitation",
              "Étude de faisabilité rénovation bâtiment ancien",
              "Dossier déclaration préalable de travaux",
              "Visuels 3D projet construction neuve",
              "Accompagnement administratif permis de construire",
              "Aménagement extérieur et paysager",
              "Lotissement 4 lots division parcellaire",
              "Projet de construction neuve accompagnement complet",
              "Projet Restanque transformation terrain en espace bien-être piscine"
            ];
            return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative overflow-hidden bg-white cursor-pointer aspect-[4/3] shadow-md hover:shadow-xl rounded-sm"
              data-testid={`portfolio-item-${index}`}
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={image} 
                alt={portfolioAlts[index] || `Réalisation Agence Prela projet ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal with Navigation */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-white hover:text-[#C5A880] transition-colors z-10"
            onClick={() => setSelectedIndex(null)}
            data-testid="lightbox-close"
          >
            <X size={28} />
          </button>

          {/* Previous button */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A880] transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            >
              <ChevronRight size={32} className="rotate-180" />
            </button>
          )}

          {/* Image container - same aspect ratio */}
          <div 
            className="w-full max-w-5xl mx-4 aspect-[4/3] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={ASSETS.portfolio[selectedIndex]} 
              alt={`Projet ${selectedIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Next button */}
          {selectedIndex < ASSETS.portfolio.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A880] transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {selectedIndex + 1} / {ASSETS.portfolio.length}
          </div>
        </div>
      )}
    </section>
  );
};

// Referents Section
const ReferentsSection = () => {
  return (
    <section id="referents" className="section-padding bg-[#FAFAFA]" data-testid="referents-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">Partenaires</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light mt-4">Nos référents conseillés</h2>
          <div className="separator mx-auto mt-6" />
          <p className="font-body text-[#595959] mt-6 max-w-2xl mx-auto">
            Pour chaque projet, nous vous orientons vers les bons spécialistes, adaptés à votre situation.
          </p>
        </AnimatedSection>

        {/* Important disclaimer */}
        <AnimatedSection className="mb-8">
          <div className="bg-[#E6DED5]/50 border border-[#C5A880]/30 p-4 rounded-sm text-center">
            <p className="font-body text-sm text-[#595959]">
              <strong>Réseau de consultants recommandés</strong> pour leur savoir-faire — jamais mandatés. 
              Chacun contractualise directement avec le client. <strong>Aucun lien commercial avec Prela.</strong>
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#595959]">
            <span className="px-4 py-2 bg-white border border-[#1C1C1C]/10 rounded">Géomètre‑expert</span>
            <span className="px-4 py-2 bg-white border border-[#1C1C1C]/10 rounded">Bureau d'études structure/sol/RE</span>
            <span className="px-4 py-2 bg-white border border-[#1C1C1C]/10 rounded">Architecte DE</span>
          </div>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-12"
        >
          {REFERENTS.map((category, catIndex) => (
            <motion.div key={catIndex} variants={fadeInUp}>
              <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Users size={20} className="text-[#C5A880]" />
                {category.category}
              </h3>
              <div className={`grid gap-6 ${category.experts.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'md:grid-cols-3'}`}>
                {category.experts.map((expert, expIndex) => (
                  <div 
                    key={expIndex} 
                    className="referent-card bg-white p-6 h-full flex flex-col"
                    data-testid={`referent-${catIndex}-${expIndex}`}
                  >
                    <h4 className="font-heading text-lg font-semibold">{expert.name}</h4>
                    {expert.company && <p className="text-sm text-[#C5A880]">{expert.company}</p>}
                    <p className="text-sm text-[#8A8A8A] flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {expert.location}
                    </p>
                    <p className="font-body text-sm text-[#595959] mt-3 flex-grow">{expert.specialty}</p>
                    {expert.availability && (
                      <p className="text-xs text-[#8A8A8A] mt-2">{expert.availability}</p>
                    )}
                    {expert.note && (
                      <p className="text-xs text-[#8A8A8A] mt-1 italic">{expert.note}</p>
                    )}
                    <p className="text-xs text-[#C5A880] mt-2">{expert.experience}</p>
                    {expert.contact && (
                      <a 
                        href={`mailto:${expert.contact}`} 
                        className="text-xs text-[#595959] hover:text-[#C5A880] mt-2 block transition-colors"
                      >
                        {expert.contact}
                      </a>
                    )}
                    {expert.website && (
                      <a 
                        href={`https://${expert.website}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#595959] hover:text-[#C5A880] mt-1 block transition-colors"
                      >
                        {expert.website}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Terroir Section - Decorative images (photos only, no title)
const TerroirSection = () => {
  return (
    <section className="py-8 bg-[#FAFAFA]" data-testid="terroir-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-4 gap-3"
        >
          {ASSETS.decorative.map((image, index) => {
            const terroirAlts = [
              "Lauzes dorées pierre traditionnelle Périgord",
              "Pierre granite Corse matériaux construction",
              "Paysage olivier Corse architecture méditerranéenne",
              "Jasmin fleurs Périgord Pourpre Dordogne"
            ];
            return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="overflow-hidden aspect-square"
            >
              <img 
                src={image} 
                alt={terroirAlts[index] || `Territoire Agence Prela ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "Quelle est la différence entre Consultation et Aplomb ?",
      answer: "La Consultation (120€/1h) est un échange libre pour analyser votre projet. Aplomb (149€) est une vérification complète des contraintes réglementaires (PLU, taxes, aides) avec un compte-rendu PDF détaillé."
    },
    {
      question: "Puis-je signer moi-même mon permis de construire ?",
      answer: "Oui, pour les projets jusqu'à 150 m² de surface de plancher (SDP). Au-delà, le recours à un architecte est obligatoire. Je vous accompagne dans la préparation du dossier."
    },
    {
      question: "Comment fonctionne Jalon ?",
      answer: "Jalon est un outil gratuit de clarification de projet. En quelques minutes, vous identifiez vos besoins et obtenez une synthèse claire. Vous pouvez ensuite approfondir avec une consultation Aplomb."
    },
    {
      question: "Les achats sont-ils déductibles de la mission complète ?",
      answer: "Oui ! Chaque achat effectué en amont (Consultation, Aplomb) est déduit du montant de la Mission complète si vous décidez de poursuivre l'accompagnement global."
    },
    {
      question: "Intervenez-vous partout en France ?",
      answer: "Basée en Corse et en Périgord Pourpre, j'interviens à distance sur toute la France pour les consultations et études. Mon réseau de référents locaux peut prendre le relai sur le terrain."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-[#FAFAFA]" data-testid="faq-section">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">Questions fréquentes</span>
          <h2 className="font-heading text-2xl md:text-3xl font-light mt-4">Questions fréquentes sur nos services</h2>
          <div className="separator mx-auto mt-6" />
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#E6DED5] rounded-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#F3F2F0] transition-colors"
              >
                <span className="font-body font-medium text-[#1C1C1C]">{faq.question}</span>
                <ChevronRight 
                  size={20} 
                  className={`text-[#C5A880] transition-transform ${openIndex === index ? 'rotate-90' : ''}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="font-body text-sm text-[#595959] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Devis Form Component
const DevisForm = () => {
  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '', type_projet: '', description: '', localisation: '', budget: ''
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/devis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ nom: '', email: '', telephone: '', type_projet: '', description: '', localisation: '', budget: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const projectTypes = [
    "Construction neuve",
    "Rénovation",
    "Extension",
    "Permis de construire",
    "Déclaration préalable",
    "Aménagement",
    "Autre"
  ];

  if (status === 'success') {
    return (
      <div className="card-elegant p-8 text-center" data-testid="devis-success">
        <CheckCircle2 size={40} className="text-[#C5A880] mx-auto mb-4" />
        <h4 className="font-heading text-xl font-semibold mb-2">Demande envoyée</h4>
        <p className="font-body text-sm text-[#595959]">
          Merci ! Nous reviendrons vers vous dans les meilleurs délais.
        </p>
        <button 
          onClick={() => setStatus(null)}
          className="btn-secondary mt-4 text-xs"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-elegant p-6 md:p-8" data-testid="devis-form">
      <h4 className="font-heading text-xl font-semibold mb-1">Demande de devis</h4>
      <p className="font-body text-xs text-[#8A8A8A] mb-5">Décrivez votre projet, nous vous recontactons.</p>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom *"
            required
            className="w-full px-3 py-2 text-sm border border-[#E6DED5] bg-[#FAFAFA] focus:border-[#C5A880] focus:outline-none transition-colors font-body"
            data-testid="devis-nom"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email *"
            required
            className="w-full px-3 py-2 text-sm border border-[#E6DED5] bg-[#FAFAFA] focus:border-[#C5A880] focus:outline-none transition-colors font-body"
            data-testid="devis-email"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
            className="w-full px-3 py-2 text-sm border border-[#E6DED5] bg-[#FAFAFA] focus:border-[#C5A880] focus:outline-none transition-colors font-body"
            data-testid="devis-telephone"
          />
          <select
            name="type_projet"
            value={formData.type_projet}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-[#E6DED5] bg-[#FAFAFA] focus:border-[#C5A880] focus:outline-none transition-colors font-body text-[#595959]"
            data-testid="devis-type"
          >
            <option value="">Type de projet *</option>
            {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <input
          name="localisation"
          value={formData.localisation}
          onChange={handleChange}
          placeholder="Localisation du projet"
          className="w-full px-3 py-2 text-sm border border-[#E6DED5] bg-[#FAFAFA] focus:border-[#C5A880] focus:outline-none transition-colors font-body"
          data-testid="devis-localisation"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez votre projet en détail... *"
          required
          rows={4}
          className="w-full px-3 py-2 text-sm border border-[#E6DED5] bg-[#FAFAFA] focus:border-[#C5A880] focus:outline-none transition-colors font-body resize-none"
          data-testid="devis-description"
        />
        <input
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget estimatif (facultatif)"
          className="w-full px-3 py-2 text-sm border border-[#E6DED5] bg-[#FAFAFA] focus:border-[#C5A880] focus:outline-none transition-colors font-body"
          data-testid="devis-budget"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full mt-5 inline-flex items-center justify-center gap-2"
        data-testid="devis-submit"
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
        {status !== 'sending' && <ArrowRight size={16} />}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-2 text-center">Erreur lors de l'envoi. Réessayez ou contactez-nous directement.</p>
      )}
    </form>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="contact-section section-padding" data-testid="contact-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <span className="label-elegant">Contact</span>
            <h2 className="font-heading text-3xl md:text-4xl font-light mt-4 mb-6">Prenons contact</h2>
            <div className="separator mb-8" />
            
            <div className="mb-8">
              <h3 className="font-heading text-2xl font-semibold">{CONTACT.name}</h3>
              <p className="font-body text-[#8A8A8A]">{CONTACT.locations}</p>
            </div>

            <div className="space-y-4">
              <a 
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                className="flex items-center gap-3 text-[#595959] hover:text-[#C5A880] transition-colors text-lg"
                data-testid="contact-phone"
              >
                <Phone size={20} />
                {CONTACT.phone}
              </a>
              <a 
                href={`mailto:${CONTACT.email}`} 
                className="flex items-center gap-3 text-[#595959] hover:text-[#C5A880] transition-colors"
                data-testid="contact-email"
              >
                <Mail size={20} />
                {CONTACT.email}
              </a>
            </div>

            <div className="flex gap-4 mt-8">
              <a 
                href={CONTACT.youtube} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 btn-secondary"
                data-testid="contact-youtube"
              >
                <Youtube size={18} />
                YouTube
              </a>
              <a 
                href={CONTACT.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 btn-secondary"
                data-testid="contact-instagram"
              >
                <Instagram size={18} />
                Instagram
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <DevisForm />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Footer with Legal Mentions
const Footer = () => {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <>
      <footer className="footer py-12 px-6 md:px-12" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={ASSETS.logo} alt="Agence Prela" className="h-10 w-auto brightness-0 invert" />
              <span className="font-heading text-lg">Agence Prela</span>
            </div>
            
            <div className="text-center">
              <p className="font-body text-sm text-[#8A8A8A]">
                © {new Date().getFullYear()} Agence Prela — Bureau d'études en bâtiment depuis 2009
              </p>
              <button 
                onClick={() => setShowLegal(true)}
                className="font-body text-xs text-[#8A8A8A] hover:text-[#C5A880] mt-1 transition-colors"
                data-testid="legal-link"
              >
                Mentions légales & Protection des données
              </button>
            </div>

            <div className="flex gap-4">
              <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-[#C5A880] transition-colors">
                <Youtube size={20} />
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-[#C5A880] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {showLegal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowLegal(false)}
        >
          <div 
            className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-[#595959] hover:text-[#C5A880] transition-colors"
              onClick={() => setShowLegal(false)}
            >
              <X size={24} />
            </button>
            
            <h2 className="font-heading text-2xl font-semibold mb-6">Mentions légales</h2>
            
            <div className="font-body text-sm text-[#595959] space-y-4">
              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-2">Éditeur du site</h3>
                <p>Agence Prela<br/>
                Véronique Mazeau<br/>
                Haute-Corse & Périgord Pourpre<br/>
                Téléphone : 06 82 92 72 76<br/>
                Email : contact.agenceprela@gmail.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-2">Hébergement</h3>
                <p>Domaine : agenceprela.fr</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-2">Propriété intellectuelle</h3>
                <p>L'ensemble du contenu de ce site (textes, images, visuels, logos) est la propriété exclusive de l'Agence Prela, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-2">Protection des données personnelles</h3>
                <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.</p>
                <p className="mt-2">Les données collectées via les formulaires de contact sont utilisées uniquement pour répondre à vos demandes. Elles ne sont jamais transmises à des tiers sans votre consentement.</p>
                <p className="mt-2">Pour exercer vos droits ou pour toute question relative à vos données, contactez-nous : contact.agenceprela@gmail.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-2">Cookies</h3>
                <p>Ce site n'utilise pas de cookies de suivi publicitaire. Seuls des cookies techniques nécessaires au bon fonctionnement du site peuvent être utilisés.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-2">Crédits</h3>
                <p>Conception et réalisation : Agence Prela<br/>
                Photographies : © Agence Prela, sauf mention contraire</p>
              </div>
            </div>

            <button 
              onClick={() => setShowLegal(false)}
              className="btn-primary mt-8"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Accessibility Widget (PMR)
const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = useCallback(() => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  }, [fontSize]);

  const decreaseFontSize = useCallback(() => {
    if (fontSize > 80) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  }, [fontSize]);

  const resetFontSize = useCallback(() => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
  }, []);

  const toggleContrast = useCallback(() => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <div className="fixed bottom-4 left-4 z-40" data-testid="accessibility-widget">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-[#2A2A2A] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#C5A880] transition-colors"
        aria-label="Options d'accessibilité"
        title="Accessibilité"
      >
        <Accessibility size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl p-4 min-w-[200px] border border-[#E6DED5]">
          <p className="font-body text-sm font-semibold text-[#1C1C1C] mb-3">Accessibilité</p>
          
          <div className="space-y-3">
            {/* Font size controls */}
            <div>
              <p className="text-xs text-[#8A8A8A] mb-2">Taille du texte</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  className="w-8 h-8 bg-[#F3F2F0] rounded flex items-center justify-center hover:bg-[#E6DED5] transition-colors"
                  aria-label="Réduire la taille du texte"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs text-[#595959] w-10 text-center">{fontSize}%</span>
                <button
                  onClick={increaseFontSize}
                  className="w-8 h-8 bg-[#F3F2F0] rounded flex items-center justify-center hover:bg-[#E6DED5] transition-colors"
                  aria-label="Augmenter la taille du texte"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={resetFontSize}
                  className="text-xs text-[#C5A880] hover:underline ml-2"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Contrast toggle */}
            <div>
              <p className="text-xs text-[#8A8A8A] mb-2">Contraste</p>
              <button
                onClick={toggleContrast}
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                  highContrast 
                    ? 'bg-[#2A2A2A] text-white' 
                    : 'bg-[#F3F2F0] text-[#595959] hover:bg-[#E6DED5]'
                }`}
              >
                {highContrast ? <Sun size={16} /> : <Moon size={16} />}
                {highContrast ? 'Mode normal' : 'Contraste élevé'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App
function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <TestimonialsSection />
        <PortfolioSection />
        <ReferentsSection />
        <TerroirSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}

export default App;
