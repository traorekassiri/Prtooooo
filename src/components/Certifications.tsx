import React, { useState } from "react";
import { Award, ShieldAlert, Maximize2, ExternalLink, ShieldCheck, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Diploma, Attestation } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CertificationsProps {
  diplomas: Diploma[];
  attestations: Attestation[];
}

export default function Certifications({ diplomas, attestations }: CertificationsProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [videoActive, setVideoActive] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Exact mockup testimonial data
  const testimonials = [
    {
      text: "Joseph est un professionnel sérieux, compétent et rigoureux. Son travail est toujours impeccable.",
      author: "Commandant Z.",
      role: "Génie Militaire"
    },
    {
      text: "Excellente technique de soudage en espace confiné. Aucun défaut détecté au contrôle ressuage.",
      author: "Superviseur Métal",
      role: "SOMACO"
    },
    {
      text: "Très haute réactivité sur la réparation des poutrelles IPE endommagées du hangar de stockage.",
      author: "Directeur Technique",
      role: "CFAO"
    }
  ];

  return (
    <section id="diplomes" className="py-20 border-t border-slate-800 bg-slate-950 relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Large 3-Column Bento/Grid Layout exactly like the Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Diplômes & Certifications */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm md:text-base font-display font-extrabold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-orange-500 rounded-full inline-block" />
                DIPLÔMES & CERTIFICATIONS
              </h3>
              <button 
                onClick={() => {
                  if (diplomas[0]) {
                    setZoomedImage(diplomas[0].imageUrl);
                  }
                }}
                className="text-[10px] font-mono text-orange-500 hover:text-orange-600 uppercase transition-colors"
              >
                Voir tout
              </button>
            </div>

            {/* Grid of 4 certificates from the mockup */}
            <div className="grid grid-cols-2 gap-4">
              {diplomas.slice(0, 4).map((dip) => (
                <div 
                   key={dip.id}
                   onClick={() => setZoomedImage(dip.imageUrl)}
                   className="bg-slate-900 border border-slate-800 hover:border-orange-500/25 rounded-lg p-3 space-y-3 cursor-pointer group transition-all duration-300"
                >
                  {/* Subtle grey ticket frame */}
                  <div className="relative aspect-[4/3] rounded overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-1">
                    <img 
                      src={dip.imageUrl} 
                      alt={dip.title}
                      className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-101 group-hover:filter group-hover:contrast-100 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                  
                  {/* Subtitle */}
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-display font-bold text-slate-100 group-hover:text-orange-500 transition-colors leading-tight">
                      {dip.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-sans leading-none">
                      {dip.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Vidéos */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6 text-left h-full flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-805 pb-3 mb-6">
                <h3 className="text-sm md:text-base font-display font-extrabold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-orange-500 rounded-full inline-block" />
                  VIDÉOS
                </h3>
                <button 
                  onClick={() => setVideoActive(true)}
                  className="text-[10px] font-mono text-orange-500 hover:text-orange-600 uppercase transition-colors"
                >
                  Voir tout
                </button>
              </div>

              {/* Video Player Card matching Mockup exact layout */}
              <div 
                onClick={() => setVideoActive(true)}
                className="relative aspect-video rounded-lg overflow-hidden border border-slate-800 cursor-pointer group shadow-md bg-slate-900"
              >
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop" 
                  alt="Soudage SMAW video thumbnail"
                  className="w-full h-full object-cover filter brightness-75 group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Translucent overlay matching play look from image */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/60 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs group-hover:scale-110 active:scale-95 transition-all duration-300">
                    <Play className="w-5 h-5 text-current fill-current translate-x-0.5" />
                  </div>
                </div>
                
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/80 rounded border border-slate-800 text-[9px] font-mono text-orange-400">
                  LIVESTREAM
                </div>
              </div>
            </div>

            {/* Video Meta Info below, matching the mockup text */}
            <div className="pt-4 text-left">
              <h4 className="text-xs md:text-sm font-display font-bold text-slate-100">
                Soudage SMAW - Assemblage structure métallique
              </h4>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Durée : 02:45
              </p>
            </div>
          </motion.div>

          {/* Column 3: Témoignages */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-3 space-y-6 text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm md:text-base font-display font-extrabold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-orange-500 rounded-full inline-block" />
                TÉMOIGNAGES
              </h3>
              <span className="text-[10px] font-mono text-orange-500 uppercase">
                Voir tout
              </span>
            </div>

            {/* Testimonials Quote Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md relative min-h-[190px] flex flex-col justify-between">
              
              {/* Huge stylistic orange quote marks exactly like image */}
              <div className="text-orange-500 text-4xl font-serif leading-none absolute top-4 left-4 inline-block select-none scale-150">
                “
              </div>

              <div className="pt-4 pl-4 text-left">
                <p className="text-slate-200 font-sans text-xs md:text-sm font-light leading-relaxed mb-6 italic">
                  {testimonials[testimonialIndex].text}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-bold text-orange-500 border border-slate-705 uppercase shrink-0 font-display">
                    {testimonials[testimonialIndex].author.slice(0, 2)}
                  </div>
                  <div className="text-left font-sans">
                    <h5 className="text-[11px] font-display font-bold text-slate-100 leading-tight">
                      {testimonials[testimonialIndex].author}
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator Pagination dots exactly matching bottom dots layout from image */}
              <div className="flex justify-center gap-2 pt-4">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === testimonialIndex 
                        ? "bg-orange-500" 
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                    title={`Testimonial ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>

        {/* Video Player Modal */}
        {videoActive && (
          <div 
            className="fixed inset-0 bg-slate-950/98 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setVideoActive(false)}
          >
            <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-3xl w-full p-4 relative" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                <h4 className="text-slate-100 font-display font-extrabold text-sm uppercase">SOUDEUR QUALIFIÉ EN ACTION</h4>
                <button 
                  onClick={() => setVideoActive(false)}
                  className="text-slate-300 hover:text-white font-mono text-xs"
                >
                  ✕ FERMER
                </button>
              </div>
              <div className="aspect-video rounded bg-black overflow-hidden relative border border-slate-800">
                <iframe 
                  src="https://www.youtube.com/embed/508B_Iu0O90?autoplay=1" 
                  title="Welding in Action" 
                  className="w-full h-full"
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                />
              </div>
              <p className="text-slate-300 text-xs font-sans mt-3 font-light text-left leading-relaxed">
                Vidéo en direct depuis l'atelier d'assemblage : exécution d'un cordon de soudure SMAW multi-passes d'angle sur profilé IPE de forte contraintes.
              </p>
            </div>
          </div>
        )}

        {/* Lightbox Zoom for Credentials */}
        {zoomedImage && (
          <div 
            className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <div className="relative max-w-3xl w-full text-right" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setZoomedImage(null)}
                className="mb-2 px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded font-mono text-xs"
              >
                ✕ FERMER
              </button>
              <img 
                src={zoomedImage} 
                className="w-full max-h-[85vh] object-contain rounded border-4 border-slate-900 shadow-2xl" 
                alt="Zoomed Credential"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
