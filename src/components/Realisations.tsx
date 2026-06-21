import React, { useState } from "react";
import { Maximize2, Tag, Calendar, Layers, Info, CheckCircle, ExternalLink } from "lucide-react";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface RealisationsProps {
  projects: Project[];
}

export default function Realisations({ projects }: RealisationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("TOUT");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Exact mockup categories
  const categories = ["TOUT", "PORTAILS", "CHARPENTES", "GRILLES", "STRUCTURES", "RÉPARATIONS"];

  const filteredProjects = selectedCategory === "TOUT"
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === selectedCategory);

  return (
    <section id="realisations" className="py-24 border-t border-slate-800 bg-slate-950 relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Title exactly as in the mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-xl mx-auto mb-16 space-y-3"
        >
          <span className="font-mono text-orange-500 text-xs tracking-widest uppercase block">
            GALERIE DE TRAVAUX
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-100 tracking-tight uppercase">
            RÉALISATIONS <span className="text-orange-500">RÉCENTES</span>
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mt-2" />
        </motion.div>

        {/* Categories Filtres tabs matching mockup exactly */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-md border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/25"
                  : "bg-slate-900 text-slate-200 border-slate-800 hover:text-orange-600 hover:border-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid matching mockup styling exactly */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-slate-800 hover:border-orange-500/30 transition-all duration-500 shadow-md cursor-pointer"
              >
                {/* Image */}
                <img 
                  src={proj.imageUrl} 
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-103 group-hover:filter group-hover:contrast-100 transition-all duration-750"
                />

                {/* Dark subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Text content overlaid perfectly on image at the bottom, just like mockup */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                  <h4 className="text-lg md:text-xl font-display font-extrabold text-white leading-tight mb-1 group-hover:text-orange-500 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 font-sans tracking-wide font-light">
                    {proj.date || "Chantier"}
                  </p>
                  
                  {/* Micro tech details that expand on hover */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-24 opacity-0 group-hover:opacity-100 transition-all duration-500 pt-3">
                    <p className="text-[11px] text-slate-300 font-light leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>
                    <span className="inline-block mt-2 text-[9px] font-mono font-semibold uppercase text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                      Cliquer pour détails
                    </span>
                  </div>
                </div>

                {/* Hover action icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Orange Center button exactly as in mockup */}
        <div className="mt-14 text-center">
          <button 
            onClick={() => {
              // Smooth scroll to credentials
              document.getElementById("diplomes")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-display font-bold text-xs uppercase tracking-wider px-8 py-4 rounded shadow-lg shadow-orange-600/15 duration-200"
          >
            VOIR TOUTES LES RÉALISATIONS
          </button>
        </div>

        {/* Rich detailed modal when user clicks on a project card */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative aspect-video">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-orange-600 rounded text-[10px] font-mono text-white uppercase tracking-widest font-bold">
                  {selectedProject.category}
                </span>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/60 hover:bg-orange-600 rounded-full text-white flex items-center justify-center text-xs font-mono font-bold transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Contents */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-extrabold text-slate-100">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-orange-500 font-mono tracking-widest uppercase mt-1">
                    {selectedProject.date}
                  </p>
                </div>

                <p className="text-slate-200 font-sans text-sm font-light leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-mono uppercase text-[9px] tracking-widest block">Procédés & Techniques</span>
                    <p className="text-slate-100 font-sans font-medium">
                      {Array.isArray(selectedProject.techniques) ? selectedProject.techniques.join(", ") : selectedProject.techniques}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-mono uppercase text-[9px] tracking-widest block">Matériaux mis en œuvre</span>
                    <p className="text-slate-100 font-sans font-medium">
                      {Array.isArray(selectedProject.materials) ? selectedProject.materials.join(", ") : selectedProject.materials}
                    </p>
                  </div>
                </div>

                <div className="text-right pt-2">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-orange-500 text-slate-100 rounded font-mono text-xs uppercase transition-colors"
                  >
                    Fermer les détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
