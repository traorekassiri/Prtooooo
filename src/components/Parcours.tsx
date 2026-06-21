import React from "react";
import { Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface TimelineEvent {
  year: string;
  type: 'work' | 'education' | 'certification';
  title: string;
  subtitle: string;
  description: string;
  badges: string[];
}

export default function Parcours() {
  const events: TimelineEvent[] = [
    {
      year: "2025 - Présent",
      type: "certification",
      title: "Qualification Soudeur ISO 9606-1 (Renouvellement)",
      subtitle: "Bureau Veritas - Abidjan, Côte-d'Ivoire",
      description: "Validation d'excellence sur éprouvettes d'acier en positions montantes complexes sous contrôle ressuage et d'examens macrographiques rigoureux. Autorisation de soudage d'équipements sous pression (PED).",
      badges: ["ISO 9606-1", "Bureau Veritas", "Procédé 111 & 141"]
    },
    {
      year: "2023 - 2025",
      type: "work",
      title: "Chef d'Équipe Soudeur Structurel",
      subtitle: "Eiffage Métal (Sous-traitance Grands Ouvrages)",
      description: "Encadrement technique de monteurs et soudeurs sur le projet de construction d'un complexe industriel. Suivi rigoureux de l'application des DMOS, vérification des gorges et respect scrupuleux des normes de sécurité.",
      badges: ["Eiffage Métal", "Charpente Lourde", "Sécurité DMOS"]
    },
    {
      year: "2022 - 2023",
      type: "work",
      title: "Soudeur Qualifié Multi-procédés",
      subtitle: "SOMACO (Société Métallurgique et Africaine de Construction)",
      description: "Travaux d'assemblage rapides et précis sur acier carbone de forte épaisseur pour réservoirs de stockage industriels complexes et pièces de serrurerie lourde (passes de fond TIG, remplissage à l'électrode basique).",
      badges: ["SMAW (111)", "MAG (135)", "Acier S355"]
    },
    {
      year: "2020 - 2022",
      type: "work",
      title: "Technicien Soudeur Tuyauteur",
      subtitle: "Serrurerie Moderne d'Abidjan (SMA-CI)",
      description: "Traçage et pré-fabrication d'isométriques de tuyauterie en atelier. Installation et soudure sur site d'équipements sous pression en acier et inox DN100 à DN250 sous argon.",
      badges: ["Soudage TIG (141)", "Isométrique 3D", "Inox 316L"]
    },
    {
      year: "2018 - 2020",
      type: "education",
      title: "CAP Construction Métallique & Chaudronnerie",
      subtitle: "Lycée Professionnel des Métiers du Métal",
      description: "Formation de référence sur l'élaboration de structures métalliques complexes, coupe thermique, traçage mécanique, chaudronnerie de tôlerie et maîtrise des procédés initiaux de soudure.",
      badges: ["Diplôme d'État", "Lycée Métal", "Chaudronnerie"]
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-5 h-5 text-orange-500" />;
      case "education":
        return <GraduationCap className="w-5 h-5 text-orange-500" />;
      case "certification":
        return <Award className="w-5 h-5 text-orange-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <section id="parcours" className="py-24 border-t border-slate-800 bg-slate-950/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange-600/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-center max-w-xl mx-auto mb-16 space-y-2"
        >
          <span className="font-mono text-orange-500 text-xs tracking-widest uppercase block">CHRONOLOGIE DE CARRIÈRE</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-100 tracking-tight">Timeline & Expériences</h2>
          <p className="text-sm font-sans text-slate-200 font-light">
            Une ascension progressive alliant rigueur théorique en métallurgie et réalisations techniques de terrain.
          </p>
        </motion.div>

        {/* Timeline Structural Frame */}
        <div className="max-w-3xl mx-auto relative pl-8 md:pl-12 border-l-2 border-slate-800 space-y-12 text-left">
          {events.map((ev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.15 }}
              className="relative group pr-4"
            >
              {/* Badge dot positioning in line */}
              <div className="absolute -left-[53px] md:-left-[61px] top-1.5 w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md group-hover:border-orange-500 transition-colors duration-300">
                {getEventIcon(ev.type)}
              </div>

              {/* Event card details */}
              <div className="space-y-3">
                <span className="inline-block font-mono text-xs font-semibold text-orange-500 tracking-wider">
                  {ev.year}
                </span>
                
                <div className="space-y-1">
                  <h4 className="text-lg font-display font-bold text-slate-100 group-hover:text-orange-600 transition-colors duration-200">
                    {ev.title}
                  </h4>
                  <p className="text-xs font-sans text-slate-300 font-medium italic">
                    {ev.subtitle}
                  </p>
                </div>

                <p className="text-slate-200 text-sm font-sans leading-relaxed font-light">
                  {ev.description}
                </p>

                {/* Tags lists */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {ev.badges.map((bg, b_idx) => (
                    <span 
                      key={b_idx} 
                      className="px-2.5 py-0.5 bg-slate-850 border border-slate-800 rounded text-[10px] font-mono text-slate-300 uppercase tracking-widest"
                    >
                      {bg}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
