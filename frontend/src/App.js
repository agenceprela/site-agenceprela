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
  Briefcase
} from "lucide-react";
import { useState } from "react";

// Assets
const ASSETS = {
  logo: "https://customer-assets.emergentagent.com/job_9f4d5ced-1252-4d4d-84b4-8f449859b862/artifacts/xvphhiqe_LOGO.png",
  heroBackground: "https://static.prod-images.emergentagent.com/jobs/9f4d5ced-1252-4d4d-84b4-8f449859b862/images/44470d4692f1ef36d4ecde18df28e14401b93f1e2ee45a814e1a887fb107b401.png",
  profilePhoto: "https://customer-assets.emergentagent.com/job_9f4d5ced-1252-4d4d-84b4-8f449859b862/artifacts/z16q6siu_P_20191016_104333.jpg",
  portfolio: [
    "https://customer-assets.emergentagent.com/job_9f4d5ced-1252-4d4d-84b4-8f449859b862/artifacts/6pm6fb1q_CHT%20DST.jpg",
    "https://customer-assets.emergentagent.com/job_9f4d5ced-1252-4d4d-84b4-8f449859b862/artifacts/jr0at7lv_permis%20de%20construire.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/fsd73e6f_am%C3%A9nagement%20exterieur.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/mkku4xr2_amenagement%20interieur.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/l2o6oogw_BTK%202.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/sithft8j_EXTENSION.png",
    "https://customer-assets.emergentagent.com/job_aplomb-preview/artifacts/xp04tq1m_Gemini_Generated_Image_ppghs3ppghs3ppgh%281%29.png"
  ]
};

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
    description: "Outil de suivi de projet accessible gratuitement pour structurer les étapes clés, les décisions et l'avancement de vos dossiers.",
    note: "Utilisable en auto‑gérance après création de compte, sans obligation de paiement.",
    icon: CheckCircle2
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
    category: "AMO & Coordination",
    experts: [
      {
        name: "François-Joseph Antonini",
        location: "Corse",
        company: "Déco Concept · Bastia",
        specialty: "AMO, coordination, études de coûts",
        note: "Interlocuteur local en Corse",
        experience: "40 ans d'expérience",
        contact: "decoconcept1@gmail.com"
      }
    ]
  },
  {
    category: "Consultant Chantier",
    experts: [
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
    { label: "Paiement", href: "#paiement" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Référents", href: "#referents" },
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

          {/* CTA Button */}
          <a
            href="#paiement"
            className="hidden md:block btn-primary"
            data-testid="header-cta"
          >
            Réserver
          </a>

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
              href="#paiement"
              className="btn-primary text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Réserver
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
                href="#paiement" 
                className="btn-primary inline-flex items-center justify-center gap-2"
                data-testid="hero-cta-primary"
              >
                Réserver une consultation
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

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="card-elegant p-6 md:p-8 max-w-sm">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={ASSETS.profilePhoto} 
                  alt={CONTACT.name}
                  className="w-20 h-20 rounded-full object-cover profile-image"
                />
                <div>
                  <h3 className="font-heading text-xl font-semibold">{CONTACT.name}</h3>
                  <p className="font-body text-sm text-[#8A8A8A]">{CONTACT.locations}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[#595959] hover:text-[#C5A880] transition-colors">
                  <Phone size={16} />
                  {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-[#595959] hover:text-[#C5A880] transition-colors">
                  <Mail size={16} />
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex gap-4 mt-4 pt-4 border-t border-[#1C1C1C]/10">
                <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="text-[#595959] hover:text-[#C5A880] transition-colors" data-testid="social-youtube">
                  <Youtube size={20} />
                </a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-[#595959] hover:text-[#C5A880] transition-colors" data-testid="social-instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="apropos" className="section-padding bg-[#FAFAFA]" data-testid="about-section">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">À propos</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light mt-4">Une fenêtre sur le champ des possibles</h2>
          <div className="separator mx-auto mt-6" />
        </AnimatedSection>

        <AnimatedSection>
          <div className="card-elegant p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img 
                src={ASSETS.profilePhoto} 
                alt={CONTACT.name}
                className="w-32 h-32 rounded-full object-cover profile-image mx-auto md:mx-0 flex-shrink-0"
              />
              <div className="font-body text-[#595959] leading-relaxed space-y-4">
                <p className="font-heading text-xl text-[#1C1C1C] italic">
                  « Voici une fenêtre sur le champ des possibles qu'explore l'Agence Prela, selon vos besoins, vos contraintes, vos rythmes. »
                </p>
                <p>
                  Diplômée "dessinatrice en bâtiment option dessin de projet" en 2008, j'ai fondé l'Agence Prela en 2009, portée par l'envie concrète de faire de cette reconversion un accomplissement personnel.
                </p>
                <p>
                  Apprendre chaque jour auprès d'experts du bâti ancien, des éco‑constructeurs et de ceux qui pensent l'espace avec justesse, est un chemin fascinant, mais semé de conditions multiples, qu'on finit par anticiper, avec l'expérience.
                </p>
                <p>
                  Ce qui me guide, c'est le plaisir de vous proposer des solutions adaptées en considérant tous les paramètres.
                </p>
                <p>
                  Au fil des années, j'ai créé des outils & méthodes afin de clarifier vos besoins, comprendre les règles, anticiper aides et taxes.
                </p>
                <p>
                  Mes forces restent simples : <strong>l'écoute, la sensibilité, la réactivité</strong>, soutenues par des applications multiples et un usage précis de l'IA.
                </p>
                <p>
                  Je propose des consultations courtes, des missions ciblées ou un accompagnement complet jusqu'aux démarches administratives.
                </p>
                <p>
                  Mon réseau indépendant rassemble référents de chantier, artisans, architectes, ingénieurs et consultants bioclimatiques, qui prennent le relai selon les besoins et vos choix.
                </p>
                <p className="font-semibold text-[#C5A880]">
                  Basée en Corse et en Périgord Pourpre, je vous accompagne ici, là‑bas, et au‑delà.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-[#F3F2F0]" data-testid="services-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">Prestations</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light mt-4">Nos services</h2>
          <div className="separator mx-auto mt-6" />
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              className="card-elegant service-card p-8"
              data-testid={`service-card-${service.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F3F2F0] rounded">
                  <service.icon size={24} className="text-[#C5A880]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-heading text-xl font-semibold">{service.title}</h3>
                    <span className="text-xs font-body bg-[#E6DED5] px-2 py-1 rounded">{service.subtitle}</span>
                  </div>
                  <p className="font-body text-[#595959] mb-4 leading-relaxed">{service.description}</p>
                  <p className="font-body text-sm text-[#8A8A8A] italic">{service.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Important Note */}
        <AnimatedSection className="mt-8">
          <div className="bg-[#E6DED5]/50 border border-[#C5A880]/30 p-6 rounded-sm">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-[#C5A880] flex-shrink-0 mt-1" />
              <div className="font-body text-sm text-[#595959]">
                <p className="font-semibold text-[#1C1C1C] mb-2">Information importante :</p>
                <p>Chaque achat effectué en amont (Consultation 1h, Aplomb) sera <strong>déduit</strong> s'il y a commande de Mission complète d'Avant-projet sommaire.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Professional subscription */}
        <AnimatedSection className="mt-6">
          <div className="card-elegant p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Briefcase size={20} className="text-[#C5A880]" />
              <h4 className="font-heading text-lg font-semibold">Offre Professionnels</h4>
            </div>
            <p className="font-body text-sm text-[#595959]">
              Abonnement disponible pour les professionnels du bâtiment et de l'immobilier. 
              <a href={`mailto:${CONTACT.email}?subject=Demande abonnement professionnel`} className="text-[#C5A880] hover:underline ml-1">
                Contactez-nous pour en savoir plus.
              </a>
            </p>
          </div>
        </AnimatedSection>
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

// Portfolio Section - Simple and fluid
const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding bg-[#F3F2F0]" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="label-elegant">Réalisations</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light mt-4">Portfolio</h2>
          <div className="separator mx-auto mt-6" />
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ASSETS.portfolio.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="image-hover relative overflow-hidden bg-white"
              data-testid={`portfolio-item-${index}`}
            >
              <img 
                src={image} 
                alt={`Projet ${index + 1}`}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.experts.map((expert, expIndex) => (
                  <div 
                    key={expIndex} 
                    className="referent-card bg-white p-6"
                    data-testid={`referent-${catIndex}-${expIndex}`}
                  >
                    <h4 className="font-heading text-lg font-semibold">{expert.name}</h4>
                    {expert.company && <p className="text-sm text-[#C5A880]">{expert.company}</p>}
                    <p className="text-sm text-[#8A8A8A] flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {expert.location}
                    </p>
                    <p className="font-body text-sm text-[#595959] mt-3">{expert.specialty}</p>
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

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="contact-section section-padding" data-testid="contact-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <span className="label-elegant">Contact</span>
            <h2 className="font-heading text-3xl md:text-4xl font-light mt-4 mb-6">Prenons contact</h2>
            <div className="separator mb-8" />
            
            <div className="flex items-center gap-6 mb-8">
              <img 
                src={ASSETS.profilePhoto} 
                alt={CONTACT.name}
                className="w-24 h-24 rounded-full object-cover profile-image"
              />
              <div>
                <h3 className="font-heading text-2xl font-semibold">{CONTACT.name}</h3>
                <p className="font-body text-[#8A8A8A]">{CONTACT.locations}</p>
              </div>
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

          <AnimatedSection className="hidden md:block">
            <div className="card-elegant p-8">
              <h4 className="font-heading text-xl font-semibold mb-4">Prêt à démarrer votre projet ?</h4>
              <p className="font-body text-[#595959] mb-6">
                Contactez-nous directement par téléphone ou email pour discuter de votre projet. 
                Nous vous répondrons dans les meilleurs délais.
              </p>
              <a 
                href="#paiement" 
                className="btn-primary inline-flex items-center gap-2"
                data-testid="contact-cta"
              >
                Réserver une consultation
                <ArrowRight size={18} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer py-12 px-6 md:px-12" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={ASSETS.logo} alt="Agence Prela" className="h-10 w-auto brightness-0 invert" />
            <span className="font-heading text-lg">Agence Prela</span>
          </div>
          
          <p className="font-body text-sm text-[#8A8A8A] text-center">
            © {new Date().getFullYear()} Agence Prela — Bureau d'études en bâtiment depuis 2009
          </p>

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
        <ServicesSection />
        <TestimonialsSection />
        <PaymentSection />
        <PortfolioSection />
        <ReferentsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
