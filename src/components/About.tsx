import React from "react";
import { Check, Compass, ShieldAlert, Zap, Layers, Hammer, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { SiteSettings } from "../types";

interface AboutProps {
  settings: SiteSettings;
}

export default function About({ settings }: AboutProps) {
  const highlights = [
    "Travail de qualité",
    "Respect des délais",
    "Sécurité avant tout",
    "Matériaux de qualité",
    "Finition professionnelle",
    "Satisfaction garantie"
  ];

  return (
    <section id="a-propos" className="py-24 border-t border-slate-800 bg-slate-950/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Title animated with standard fade-in-up */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left mb-16"
        >
          <span className="font-mono text-orange-500 text-xs tracking-widest uppercase block mb-2">
            MÉTIER & PASSION
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-100 tracking-tight uppercase">
            À PROPOS <span className="text-orange-500">DE MOI</span>
          </h2>
          <div className="w-16 h-1 bg-orange-500 mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Industrial Image (staggered delay 0.1s) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4 h-full"
          >
            <div className="relative group rounded-xl overflow-hidden border border-slate-805 bg-slate-900 h-full min-h-[320px]">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop" 
                alt="Welding Precision"
                className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-102 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
              {/* Spark effect decoration */}
              <div className="absolute bottom-4 left-4 bg-orange-600/10 border border-orange-500/20 rounded-md p-3 backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-orange-500 block font-semibold leading-none">TRAVAIL DE HAUTE FIABILITÉ</span>
                <span className="text-xs text-white mt-1 block">Norme NF EN ISO 9606-1</span>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Text & Structured Dual Grid Checklist (staggered delay 0.2s) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left"
          >
            <div className="space-y-4">
              <p className="text-slate-200 font-sans leading-relaxed text-sm md:text-base font-light">
                Soudeur qualifié avec une solide expérience dans la fabrication, l'assemblage et la réparation de structures métalliques. Formé selon les normes de sécurité industrielle, je m'engage à fournir un travail de qualité, rigoureux et durable. Autonome, discipliné et passionné par mon métier.
              </p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs md:text-sm font-light">
                À chaque étape de votre commande ou chantier, de la lecture géométrique des plans jusqu'aux passes finales de pénétration à l'arc, je garantis un alignement millimétrique et une étanchéité absolue de l'ouvrage métallique.
              </p>
            </div>

            {/* Checklist arranged in 2 columns like image */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-4 border-t border-slate-800/80">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="bg-orange-500/15 border border-orange-500/30 text-orange-500 p-1 rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-slate-200 font-medium font-sans">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: "SPÉCIALITÉS" Card like mockup with orange accent (staggered delay 0.3s) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-base font-display font-extrabold text-slate-100 uppercase tracking-wider mb-6 pb-2 border-b border-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-orange-500 rounded-full inline-block" />
                  SPÉCIALITÉS
                </h3>

                <ul className="space-y-4 text-left font-sans text-xs md:text-sm">
                  {[
                    "Soudage SMAW (1G, 2G, 3G)",
                    "Fabrication métallique",
                    "Lecture de plans",
                    "Assemblage & Montage",
                    "Maintenance industrielle",
                    "Contrôle qualité & sécurité"
                  ].map((spec, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-200 group">
                      <div className="w-6 h-6 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                        <Hammer className="w-3 h-3 text-current" />
                      </div>
                      <span className="text-slate-200 font-light group-hover:text-orange-500 transition-colors">
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center gap-2.5 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                CONFORMITE TECHNIQUE ET DE SÉCURITÉ
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
