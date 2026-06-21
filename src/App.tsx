import React, { useState, useEffect } from "react";
import { 
  Flame, Phone, Mail, Award, MapPin, Send, MessageCircle, AlertCircle, 
  Sparkles, Check, CheckCircle, ChevronUp, Lock, ArrowUpRight, Github, Linkedin, ShieldCheck 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Parcours from "./components/Parcours";
import Realisations from "./components/Realisations";
import Certifications from "./components/Certifications";
import AdvisorChat from "./components/AdvisorChat";
import AdminPanel from "./components/AdminPanel";
import { DB, Project, Diploma, Attestation, Testimonial, MediaItem, Message } from "./types";

export default function App() {
  const [db, setDb] = useState<DB | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState("");
  
  // Contacts states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactNameTouched, setContactNameTouched] = useState(false);
  const [contactEmailTouched, setContactEmailTouched] = useState(false);
  const [contactMessageTouched, setContactMessageTouched] = useState(false);

  // Active theme page navigation state
  const [activeNav, setActiveNav] = useState("accueil");
  const [showAdminTab, setShowAdminTab] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Luxury transition states
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextSection, setNextSection] = useState("");

  const handleNavigation = (id: string, label: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setNextSection(label);
    
    // Smooth segment selection immediately
    setActiveNav(label.toLowerCase());
    setShowAdminTab(false);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      
      // Let the luxury transition resolve nicely after scrolling initiated
      setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
    }, 280);
  };

  // Fetch the dynamic portfolio from full stack Express server
  const fetchDb = async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setDb(data);
        setErrorStatus("");
      } else {
        setErrorStatus("Erreur d'accès au serveur d'administration.");
      }
    } catch (err) {
      setErrorStatus("Connexion serveur d'administration absente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDb();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Scroll Spy to sync active Nav option
      if (showAdminTab || isTransitioning) return;

      const sections = ["accueil", "a-propos", "parcours", "competences", "realisations", "diplomes", "contact"];
      const scrollPosition = window.scrollY + 280; // Offset for focus trigger

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            let label = sect;
            if (sect === "a-propos") label = "à propos";
            if (sect === "competences") label = "compétences";
            if (sect === "realisations") label = "réalisations";
            if (sect === "diplomes") label = "diplômes";

            setActiveNav((prev) => (prev === label ? prev : label));
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAdminTab, isTransitioning]);

  // Update Settings handler
  const handleUpdateSettings = async (settings: any) => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // Projects CRUD handlers
  const handleSaveProject = async (project: any) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
      });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // Certifications/Diplomas CRUD
  const handleSaveDiploma = async (diploma: any) => {
    try {
      const res = await fetch("/api/diplomas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diploma)
      });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteDiploma = async (id: string) => {
    try {
      const res = await fetch(`/api/diplomas/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // Attestations handler
  const handleSaveAttestation = async (att: any) => {
    try {
      const res = await fetch("/api/attestations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(att)
      });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteAttestation = async (id: string) => {
    try {
      const res = await fetch(`/api/attestations/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // Media items managing
  const handleSaveMedia = async (media: any) => {
    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(media)
      });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteMedia = async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // Testimonials managing
  const handleSaveTestimonial = async (test: any) => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(test)
      });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // Messages operations
  const handleReadMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, { method: "PATCH" });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDb();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactStatus("Transmission de la demande au secrétariat de Stéphane...");
    
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          subject: contactSubject,
          message: contactMessage
        })
      });

      if (res.ok) {
        setContactSuccess(true);
        setContactStatus("Votre message a été enregistré avec succès ! Stéphane Traoré prendra contact avec vous dans de brefs délais.");
        setContactName("");
        setContactEmail("");
        setContactPhone("");
        setContactSubject("");
        setContactMessage("");
        setContactNameTouched(false);
        setContactEmailTouched(false);
        setContactMessageTouched(false);
        
        // Refresh db to make sure newly submitted message appears in Admin log
        await fetchDb();
      } else {
        setContactStatus("Une erreur serveur est survenue lors de l'enregistrement de votre message.");
      }
    } catch (err) {
      setContactStatus("Erreur réseau. Veuillez vérifier que votre serveur Express de développement est actif.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 space-y-4">
        <Flame className="w-12 h-12 text-orange-500 animate-bounce" />
        <p className="font-display font-medium text-sm uppercase tracking-widest text-slate-100">
          Initialisation du Portfolio Technique Stéphane Traoré...
        </p>
      </div>
    );
  }

  // Fallbacks in case there is no connection. This guarantees robust runtime!
  const finalSettings = db?.settings || {
    name: "TRAORÉ JOSEPH KASSIRI STÉPHANE",
    title: "Soudeur Qualifié & Spécialiste en Construction Métallique",
    email: "traorejosephinbox@gmail.com",
    phone: "+225 07 48 89 23 45",
    whatsapp: "2250748892345",
    address: "Abidjan, Côte d'Ivoire",
    cvUrl: "#",
    avatarUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
    aboutMe: "Soudeur Qualifié et professionnel dévoué de la construction métallique, je cumule several ans d'expérience active en atelier et grands chantiers. Spécialiste du soudage à haute précision...",
    values: [],
    objectives: "Assumer des responsabilités de contrôle qualité soudure au sein de consortiums de génie civil internationaux.",
    stats: { experienceYears: 8, completedProjects: 45, certificationsCount: 6, satisfactionRate: 100 }
  };

  const finalProjects = db?.projects || [];
  const finalDiplomas = db?.diplomas || [];
  const finalAttestations = db?.attestations || [];

  // Contact Form Real-time Validation Checks
  const isEmailValid = (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  const isNameValid = contactName.trim().length >= 2;
  const isEmailValidated = isEmailValid(contactEmail);
  const isMessageValid = contactMessage.trim().length >= 10;

  const getNameBorderClass = () => {
    if (!contactNameTouched) return "border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20";
    return isNameValid 
      ? "border-emerald-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20" 
      : "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20";
  };

  const getEmailBorderClass = () => {
    if (!contactEmailTouched) return "border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20";
    return isEmailValidated 
      ? "border-emerald-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20" 
      : "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20";
  };

  const getMessageBorderClass = () => {
    if (!contactMessageTouched) return "border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20";
    return isMessageValid 
      ? "border-emerald-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20" 
      : "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20";
  };

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-orange-600 selection:text-white">
      
      {/* Cinematic Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="relative">
                <Flame className="w-12 h-12 text-orange-500 animate-pulse" />
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl scale-150 animate-ping" />
              </div>
              
              <div className="space-y-1">
                <p className="font-mono text-[9px] tracking-widest text-orange-500 font-bold uppercase">
                  CHARPENTE MÉTALLIQUE • ACCÈS
                </p>
                <h3 className="font-display font-extrabold text-white text-lg tracking-wider uppercase">
                  {nextSection}
                </h3>
              </div>
              
              <div className="w-32 h-[1px] bg-slate-900 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFESSIONAL FLOAT NAV HEADER */}
      <header className="fixed top-0 inset-x-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 z-40 transition-all">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          <a href="#accueil" className="flex flex-col items-start leading-none group">
            <span className="font-display font-black text-xl uppercase tracking-tighter text-white group-hover:text-orange-500 transition-colors">TRAORÉ</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-orange-500 font-bold mt-0.5">SOUDEUR QUALIFIÉ</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              { id: "accueil", label: "Accueil" },
              { id: "a-propos", label: "À Propos" },
              { id: "parcours", label: "Parcours" },
              { id: "competences", label: "Compétences" },
              { id: "realisations", label: "Réalisations" },
              { id: "diplomes", label: "Diplômes" },
              { id: "diplomes", label: "Galerie" },
              { id: "diplomes", label: "Témoignages" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }, idx) => {
              const isActive = activeNav === label.toLowerCase() && !showAdminTab;
              return (
                <a 
                  key={`${id}-${idx}`}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(id, label.toLowerCase());
                  }}
                  className={`relative px-3.5 py-2 rounded font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-orange-500"
                      : "text-slate-300 hover:text-orange-400"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavPill"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}
            
            {/* Special toggle to Admin Space */}
            <button
              onClick={() => {
                setShowAdminTab(!showAdminTab);
                setActiveNav("");
                if (!showAdminTab) {
                  document.getElementById("admin")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`px-3 py-2 ml-2 rounded font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors ${
                showAdminTab
                  ? "text-orange-500 bg-orange-500/10 border border-orange-500/20"
                  : "text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              <Lock className="w-3 h-3" />
              ADMIN
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3 rounded shadow shadow-orange-600/10 hover:-translate-y-0.5 transition-all"
            >
              ME CONTACTER
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* CORE DISPLAY ROUTING ELEMENT */}
      {!showAdminTab ? (
        <main className="space-y-0">
          
          {/* Section 1: Hero welcome screen */}
          <Hero 
            settings={finalSettings} 
            onContactClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }} 
          />

          {/* Section 2: Personal Career About */}
          <About settings={finalSettings} />

          {/* Section 3: Technical Skills Gages */}
          <Skills />

          {/* Section 4: Experience Parcours Timeline */}
          <Parcours />

          {/* Section 5: Realisations Projects Gallery */}
          <Realisations projects={finalProjects} />

          {/* Section 6: Certifications bureau veritas and attestations */}
          <Certifications 
            diplomas={finalDiplomas} 
            attestations={finalAttestations} 
          />

          {/* Section 7: Gemini AI Advisor Consulting box */}
          <AdvisorChat />

          {/* Section 8: Combined Contact and Footer exactly like Mockup */}
          <section id="contact" className="bg-[#0b0c10] border-t border-slate-900 pt-20 pb-8 text-left text-slate-400 font-sans text-xs relative">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
                
                {/* Column 1: À propos de moi with Traoré signature and socials */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="lg:col-span-3 space-y-4"
                >
                  <h4 className="text-[13px] font-display font-extrabold text-white uppercase tracking-wider select-none">
                    À PROPOS
                  </h4>
                  <p className="text-slate-400 font-sans font-light leading-relaxed">
                    Soudeur qualifié spécialisé en construction métallique. Passionné par mon métier, j'apporte des solutions solides et durables à vos projets.
                  </p>
                  
                  {/* Digital Signature exact translation from mockup stamp */}
                  <div className="pt-2">
                    <span className="font-serif text-2xl font-bold text-orange-500 italic block cursor-none pointer-events-none select-none tracking-tighter" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Traoré J.K.S.
                    </span>
                  </div>

                  {/* Social round buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    {["facebook", "linkedin", "whatsapp", "youtube"].map((sc, idx) => (
                      <a 
                        key={idx}
                        href="#" 
                        className="w-8 h-8 rounded-full border border-slate-900 hover:border-orange-500 bg-slate-950 flex items-center justify-center text-slate-400 hover:text-white hover:scale-105 transition-all text-[11px] font-bold"
                        title={sc}
                      >
                        {sc.slice(0, 1)}
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Column 2: Liens rapides */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="lg:col-span-2 space-y-4"
                >
                  <h4 className="text-[13px] font-display font-extrabold text-white uppercase tracking-wider select-none">
                    LIENS RAPIDES
                  </h4>
                  <ul className="space-y-3 font-sans">
                    {[
                      { href: "#accueil", label: "Accueil" },
                      { href: "#a-propos", label: "À propos" },
                      { href: "#parcours", label: "Parcours" },
                      { href: "#competences", label: "Compétences" },
                      { href: "#realisations", label: "Réalisations" },
                      { href: "#diplomes", label: "Diplômes" },
                      { href: "#diplomes", label: "Galerie" },
                      { href: "#diplomes", label: "Témoignages" },
                      { href: "#contact", label: "Contact" }
                    ].map((link, idx) => (
                      <li key={idx}>
                        <a 
                          href={link.href} 
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(link.href.replace("#", ""), link.label.toLowerCase());
                          }}
                          className="text-slate-400 hover:text-orange-500 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Column 3: Contact */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="lg:col-span-3 space-y-4"
                >
                  <h4 className="text-[13px] font-display font-extrabold text-white uppercase tracking-wider select-none">
                    CONTACT
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 text-orange-500 mt-0.5 shrink-0 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="font-sans">
                        <a href="tel:+22665331033" className="text-slate-300 hover:text-white font-bold block leading-none select-all">
                          +226 65 33 10 33
                        </a>
                        <span className="text-[10px] text-slate-500 leading-none block mt-1">(WhatsApp)</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 text-orange-500 mt-0.5 shrink-0 flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <a href="mailto:traorekassiri@gmail.com" className="text-slate-300 hover:text-white block select-all">
                        traorekassiri@gmail.com
                      </a>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 text-orange-500 mt-0.5 shrink-0 flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-slate-300">
                        Burkina Faso
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 text-orange-500 mt-0.5 shrink-0 flex items-center justify-center">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <a href="#" className="text-slate-300 hover:text-white leading-tight">
                        linkedin.com/in/kassiri-j-s-traore
                      </a>
                    </li>
                  </ul>
                </motion.div>

                {/* Column 4: Contactez-moi form */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="lg:col-span-4 space-y-4"
                >
                  <h4 className="text-[13px] font-display font-extrabold text-white uppercase tracking-wider select-none">
                    CONTACTEZ-MOI
                  </h4>
                  
                  {contactStatus && (
                    <div 
                      className={`p-3 text-[11px] rounded-md text-left flex items-center gap-2 ${
                        contactSuccess 
                          ? "bg-emerald-600/10 border border-emerald-500/20 text-emerald-400" 
                          : "bg-slate-900 border border-slate-800 text-slate-300"
                      }`}
                    >
                      {contactStatus}
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Input with validation feedback */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-200 uppercase tracking-wider font-mono">Nom complet</label>
                        <input 
                          type="text"
                          value={contactName}
                          onChange={(e) => {
                            setContactName(e.target.value);
                            setContactNameTouched(true);
                          }}
                          onBlur={() => setContactNameTouched(true)}
                          required
                          placeholder="Votre nom"
                          className={`w-full bg-slate-900 border rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none transition-all duration-300 ${getNameBorderClass()}`}
                        />
                        {contactNameTouched && (
                          <p className={`text-[10px] font-mono mt-1 ${isNameValid ? "text-emerald-400" : "text-red-400"}`}>
                            {isNameValid ? "✓ Nom valide" : "✗ Min. 2 caractères"}
                          </p>
                        )}
                      </div>

                      {/* Email Input with validation feedback */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-200 uppercase tracking-wider font-mono">Adresse Email</label>
                        <input 
                          type="email"
                          value={contactEmail}
                          onChange={(e) => {
                            setContactEmail(e.target.value);
                            setContactEmailTouched(true);
                          }}
                          onBlur={() => setContactEmailTouched(true)}
                          required
                          placeholder="Votre email"
                          className={`w-full bg-slate-900 border rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none transition-all duration-300 ${getEmailBorderClass()}`}
                        />
                        {contactEmailTouched && (
                          <p className={`text-[10px] font-mono mt-1 ${isEmailValidated ? "text-emerald-400" : "text-red-400"}`}>
                            {isEmailValidated ? "✓ format email valide" : "✗ email incorrect"}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Message Input with validation feedback */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-200 uppercase tracking-wider font-mono">Votre Message</label>
                      <textarea 
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => {
                          setContactMessage(e.target.value);
                          setContactMessageTouched(true);
                        }}
                        onBlur={() => setContactMessageTouched(true)}
                        required
                        placeholder="Quelles sont les qualifications ou dimensions de soudure requises ?"
                        className={`w-full bg-slate-900 border rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none leading-relaxed font-light transition-all duration-300 ${getMessageBorderClass()}`}
                      />
                      {contactMessageTouched && (
                        <p className={`text-[10px] font-mono mt-1 ${isMessageValid ? "text-emerald-400" : "text-red-400"}`}>
                          {isMessageValid ? "✓ Message complet" : `✗ Saisissez au moins ${10 - contactMessage.trim().length} caractères de plus`}
                        </p>
                      )}
                    </div>

                    <button 
                      type="submit"
                      className={`w-full text-white font-display text-xs font-bold uppercase tracking-wider py-3.5 px-5 rounded shadow flex items-center justify-between transition-all duration-300 ${
                        (isNameValid && isEmailValidated && isMessageValid)
                          ? "bg-orange-600 hover:bg-orange-500 shadow-orange-600/10 cursor-pointer"
                          : "bg-slate-800 text-slate-500 border border-slate-900 cursor-not-allowed"
                      }`}
                    >
                      <span>ENVOYER LE MESSAGE</span>
                      <Send className="w-3.5 h-3.5 text-current" />
                    </button>
                  </form>
                </motion.div>

              </div>

              {/* Lower legal disclaimer row */}
              <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
                <p>
                  &copy; 2026 TRAORÉ JOSEPH KASSIRI STÉPHANE - Tous droits réservés.
                </p>
                <p className="flex items-center gap-1">
                  Conçu avec passion  <span className="text-red-600">❤️</span>
                </p>
              </div>

            </div>
          </section>

        </main>
      ) : (
        /* Section Admin Panel Orchestration */
        <main className="pt-24 min-h-screen">
          {db && (
            <AdminPanel 
              db={db}
              onRefreshDB={fetchDb}
              onUpdateSettings={handleUpdateSettings}
              onSaveProject={handleSaveProject}
              onDeleteProject={handleDeleteProject}
              onSaveDiploma={handleSaveDiploma}
              onDeleteDiploma={handleDeleteDiploma}
              onSaveAttestation={handleSaveAttestation}
              onDeleteAttestation={handleDeleteAttestation}
              onSaveMedia={handleSaveMedia}
              onDeleteMedia={handleDeleteMedia}
              onSaveTestimonial={handleSaveTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
              onReadMessage={handleReadMessage}
              onDeleteMessage={handleDeleteMessage}
            />
          )}
        </main>
      )}

      {/* BACK TO TOP FLOATING CHEVRON */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 p-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded shadow-lg transition-all z-40 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUp className="w-4 h-4" />
      </button>

    </div>
  );
}
