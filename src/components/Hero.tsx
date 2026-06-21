import React, { useState, useEffect } from "react";
import { Phone, Mail, Award, Download, Flame, ShieldAlert, Sparkles, Clock, Briefcase, Settings, Trophy, User, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { SiteSettings } from "../types";

const BACKGROUND_SLIDES = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=80&w=1600&auto=format&fit=crop"
];

interface HeroProps {
  settings: SiteSettings;
  onContactClick: () => void;
}

export default function Hero({ settings, onContactClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="accueil" className="relative min-h-screen flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-slate-950">
      {/* Dynamic atmospheric cross-fade slideshow backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {BACKGROUND_SLIDES.map((slide, index) => (
          <div
            key={slide}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2500ms] ease-in-out"
            style={{
              backgroundImage: `url(${slide})`,
              opacity: index === currentSlide ? 0.38 : 0,
            }}
          />
        ))}
        {/* Soft, rich cinematic gradient overlays supporting our premium espresso theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950 z-[1]" />
        <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply z-[1]" />
      </div>

      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 left-1/10 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none z-[1]" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-[2]" 
        style={{ maskImage: "radial-gradient(ellipse at center, black, transparent)" }}
      />

      {/* Floating Vertical Socials on the Right aspect ratio of Mockup */}
      <div className="hidden md:flex flex-col items-center gap-5 absolute right-8 top-1/2 -translate-y-1/2 z-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-slate-800" />
        <a 
          href="#" 
          className="w-10 h-10 rounded-full border border-slate-800 bg-slate-950/80 backdrop-blur-md text-slate-400 hover:text-white hover:border-orange-500 hover:scale-110 flex items-center justify-center transition-all duration-300 font-sans"
          title="Facebook"
        >
          <span className="font-bold text-xs">f</span>
        </a>
        <a 
          href="#" 
          className="w-10 h-10 rounded-full border border-slate-800 bg-slate-950/80 backdrop-blur-md text-slate-400 hover:text-white hover:border-orange-500 hover:scale-110 flex items-center justify-center transition-all duration-300 font-sans"
          title="LinkedIn"
        >
          <span className="font-bold text-xs">in</span>
        </a>
        <a 
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-slate-800 bg-slate-950/80 backdrop-blur-md text-slate-400 hover:text-white hover:border-orange-500 hover:scale-110 flex items-center justify-center transition-all duration-300 font-sans"
          title="WhatsApp"
        >
          <span className="font-bold text-xs">wa</span>
        </a>
        <div className="w-[1px] h-20 bg-slate-800" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
          
          {/* Main Info Columns - Stacked Name Typography */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-5">
              <div className="flex flex-col">
                <motion.span 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white font-display font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-none mb-1"
                >
                  TRAORÉ
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-orange-500 font-display font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none mb-2"
                >
                  JOSEPH KASSIRI
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white font-display font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none"
                >
                  STÉPHANE
                </motion.span>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-lg md:text-xl font-display font-bold text-slate-100 flex items-center gap-3 border-l-2 border-orange-500 pl-4 py-1"
              >
                Soudeur Qualifié | Construction Métallique
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-slate-400 font-sans leading-relaxed text-sm md:text-base font-light max-w-xl"
              >
                Spécialisé en soudage à l'arc électrode enrobée (SMAW), fabrication et réparation de structures métalliques avec plus de <span className="text-orange-500 font-semibold font-mono">1 800</span> heures de formation et d'expérience terrain.
              </motion.p>
            </div>

            {/* CTA buttons exactly like mock-up style */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              {settings.cvUrl && (
                <a 
                  href={settings.cvUrl} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/20 active:translate-y-0.5 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Télécharger CV
                </a>
              )}
              <button 
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-slate-900 text-white border border-white hover:border-orange-500 rounded font-display font-bold text-xs uppercase tracking-wider active:translate-y-0.5 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                Me contacter
              </button>
              <a 
                href={`https://wa.me/${settings.whatsapp}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:translate-y-0.5 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Right Profile Column with Industrial Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group shrink-0"
            >
              {/* Outer Industrial Glowing border */}
              <div className="absolute inset-x-0 -bottom-2 -top-2 bg-gradient-to-t from-orange-600 to-transparent opacity-20 filter blur-xl rounded-lg group-hover:opacity-35 transition-opacity" />
              
              <div className="relative border-4 border-slate-900 bg-slate-950 overflow-hidden rounded-md w-full max-w-[320px] md:max-w-[360px] aspect-[4/5] object-cover shadow-2xl">
                <img 
                  src={settings.avatarUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop"} 
                  alt={settings.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-103 transition-all duration-700"
                />
                
                {/* Floating validation nodes */}
                <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300">
                  <span className="w-1.5 h-1.5 inline-block rounded-full bg-orange-500 animate-ping mr-2" />
                  Soudage de Sécurité
                </div>
                
                <div className="absolute bottom-4 right-4 max-w-[200px] bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded p-3 text-left">
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-400 text-xs font-mono font-medium">
                    <Award className="w-3.5 h-3.5" />
                    BUREAU VERITAS
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans leading-tight">
                    Techniques qualifiées ISO 9606-1 SMAW / TIG toutes nuances.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Central visual indicator (Mouse Wheel scrolling animation) */}
        <div className="flex justify-center pb-8 pt-4">
          <div className="w-6 h-10 rounded-full border-2 border-slate-800 flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 rounded-full bg-orange-500"
            />
          </div>
        </div>

        {/* Premium floating stats strip deck placed exactly at the bottom border of Hero section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full max-w-5xl mx-auto bg-[#0d0f14]/95 border border-slate-905 rounded-xl p-5 md:p-6 shadow-2xl relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-900 text-left"
        >
          {/* Stat 1 */}
          <div className="flex items-center gap-4 py-3 sm:py-0 first:pt-0 sm:first:pt-0 pl-1">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                1 800+
              </div>
              <div className="text-[11px] text-slate-400 font-sans font-light whitespace-nowrap">
                Heures de formation
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 py-3 sm:py-0 sm:pl-6">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                {settings.stats.experienceYears}+
              </div>
              <div className="text-[11px] text-slate-400 font-sans font-light whitespace-nowrap">
                Années d'expérience
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 py-3 sm:py-0 sm:pl-6">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                50+
              </div>
              <div className="text-[11px] text-slate-400 font-sans font-light whitespace-nowrap">
                Projets réalisés
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-4 py-3 sm:py-0 sm:pl-6">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                {settings.stats.certificationsCount}+
              </div>
              <div className="text-[11px] text-slate-400 font-sans font-light whitespace-nowrap">
                Certifications
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
