import React from "react";
import { Flame, Wrench, FileText, Ruler, Layers, ShieldCheck, Search, HelpCircle, HardHat, Compass } from "lucide-react";
import { motion } from "motion/react";

interface KeySkill {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function Skills() {
  const keySkillsList: KeySkill[] = [
    {
      title: "Soudage à l'arc SMAW",
      desc: "Maîtrise complète de l'électrode enrobée toutes positions (1G, 2G, 3G, 4G, 6G) pour liaisons haute résistance.",
      icon: <Flame className="w-6 h-6" />
    },
    {
      title: "Fabrication métallique",
      desc: "Découpe, usinage et formage d'éléments de structures lourdes à partir d'acier brut et d'inox de nuances.",
      icon: <Wrench className="w-6 h-6" />
    },
    {
      title: "Lecture de plans",
      desc: "Interprétation de plans d'ensemble complexes, schémas de fabrication métallique et guides de DMOS.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Traçage & débit",
      desc: "Cisaillement, traçages géométriques précis de tôles et cotes exactes de sections de profilés.",
      icon: <Ruler className="w-6 h-6" />
    },
    {
      title: "Assemblage & pointage",
      desc: "Mise en place de gabarits rigides et techniques de pointage pour figer l'alignement avant le cordon terminal.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: "Meulage & ébavurage",
      desc: "Préparation chanfreins, meulage soigné de reprises de racines et finitions esthétiques professionnelles.",
      icon: <Compass className="w-6 h-6" />
    },
    {
      title: "Contrôle qualité",
      desc: "Autocontrôle dimensionnel millimétrique et ressuage pour garantir zéro défaut de soufflures/caniveaux.",
      icon: <Search className="w-6 h-6" />
    },
    {
      title: "Sécurité industrielle",
      desc: "Discipline de sécurité sans compromis, gestion des permis de feu, ventilation active et habilitations de travail.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  return (
    <section id="competences" className="py-24 border-t border-slate-800 bg-slate-950 relative overflow-hidden">
      {/* Background shadow glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-600/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Title style matching mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-xl mx-auto mb-16 space-y-3"
        >
          <span className="font-mono text-orange-500 text-xs tracking-widest uppercase block">
            NOTRE SAVOIR FAIRE
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-100 tracking-tight uppercase">
            COMPÉTENCES <span className="text-orange-500">CLÉS</span>
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mt-2" />
          <p className="text-xs md:text-sm font-sans text-slate-200 font-light pt-2">
            Des compétences techniques d'excellence certifiées et éprouvées au cœur des projets de construction métallique à haute contrainte.
          </p>
        </motion.div>

        {/* 8 Bento-Style Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {keySkillsList.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-slate-900 border border-slate-800 hover:border-orange-500/30 rounded-lg p-6 text-left group hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Custom circular soft glowing icon container */}
                <div className="w-12 h-12 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {skill.icon}
                </div>

                <h3 className="text-sm md:text-base font-display font-bold text-slate-100 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                  {skill.title}
                </h3>

                <p className="text-xs text-slate-200 font-sans leading-relaxed font-light">
                  {skill.desc}
                </p>
              </div>

              {/* Progress visual accent */}
              <div className="w-full h-[2px] bg-slate-800 mt-6 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-gradient-to-r from-orange-600 to-orange-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
