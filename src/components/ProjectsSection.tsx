import React, { useState, useEffect } from 'react';
import { Project, Language, ProjectCategory } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { REALIZATIONS_VIDEOS, RealizationVideoItem, getRealizationVideoUrl } from '../data/realizationsVideos';
import { ArrowRight, Play, X, Film, MapPin, Clock } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  language: Language;
  onSelectProject: (projectId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  language,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Tous');
  const [activeVideo, setActiveVideo] = useState<RealizationVideoItem | null>(null);

  const t = TRANSLATIONS[language].projects;

  const categories: ProjectCategory[] = ['Tous', 'Résidentiel', 'Tertiaire', 'Génie civil'];

  const categoryLabels: Record<string, string> = {
    Tous: t.categories.all,
    Résidentiel: t.categories.residential,
    Tertiaire: t.categories.commercial,
    'Génie civil': t.categories.civil,
  };

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'Tous') return true;
    return project.category.includes(selectedCategory);
  });

  // Handle Escape key to close the video modal without conflict
  useEffect(() => {
    if (!activeVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  return (
    <section className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-24 md:py-32" id="projets">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header: Pure & Airy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
              {t.tag}
            </span>
            <h2 className="font-display-lg text-[#000000] tracking-tight text-balance">
              {t.title}
            </h2>
            <p className="font-body-lg text-[#444748] pt-1">
              {t.desc}
            </p>
          </div>

          {/* Quiet Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-label-technical text-[10px] uppercase tracking-widest transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#000000] text-white border-[#000000]'
                    : 'bg-[#faf9f6] text-[#444748] border-[#c4c7c7]/40 hover:border-[#000000]'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Monograph Project Cards Grid: Pure Photography & Quiet Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              tabIndex={0}
              role="button"
              aria-label={`${t.viewProjectAria} ${project.title}`}
              onClick={() => onSelectProject(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project.id);
                }
              }}
              className="group cursor-pointer flex flex-col space-y-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#000000] p-1"
            >
              {/* Full-Bleed Photograph */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#efeeeb] border border-[#c4c7c7]/30">
                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  src={project.image}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Minimal Meta: Name, Typology · City, and Arrow */}
              <div className="flex justify-between items-end pt-1">
                <div className="space-y-1">
                  <h3 className="font-headline-lg text-2xl md:text-3xl text-[#000000] tracking-tight group-hover:text-[#765935] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-sm text-[#747878]">
                    {(language === 'EN' && project.typeEN ? project.typeEN : project.type).split('·')[0].trim()} · {project.city}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 font-label-technical text-label-technical uppercase tracking-widest text-[#000000] group-hover:text-[#765935] transition-colors pb-1">
                  <span>{t.discoverBtn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SOUS-SECTION : GALERIE VIDÉOS DE CHANTIERS & VISITES DU TERRAIN           */}
        {/* ========================================================================= */}
        <div className="pt-20 md:pt-28 mt-20 md:mt-28 border-t border-[#c4c7c7]/30">
          {/* En-tête de la Galerie Vidéo */}
          <div className="max-w-2xl mb-12 space-y-2">
            <div className="flex items-center gap-2 text-[#765935]">
              <Film className="w-4 h-4" />
              <span className="font-label-technical text-label-technical tracking-widest uppercase font-bold">
                {t.videoGallery.tag}
              </span>
            </div>
            <h3 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[#000000] tracking-tight text-balance">
              {t.videoGallery.title}
            </h3>
            <p className="font-body-md text-sm md:text-base text-[#444748] leading-relaxed">
              {t.videoGallery.desc}
            </p>
          </div>

          {/* Grille des Vidéos de Chantiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REALIZATIONS_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                tabIndex={0}
                role="button"
                aria-label={`${t.videoGallery.playBtn} : ${language === 'FR' ? video.titleFR : video.titleEN}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveVideo(video);
                  }
                }}
                className="group cursor-pointer bg-[#faf9f6] border border-[#c4c7c7]/40 hover:border-[#000000] transition-all duration-200 flex flex-col justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000]"
              >
                {/* Vignette Affiche avec Bouton Play Central */}
                <div className="relative aspect-[16/10] bg-[#1a1c1a] overflow-hidden">
                  <img
                    src={video.poster}
                    alt={language === 'FR' ? video.altFR : video.altEN}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />

                  {/* Gradient sombre pour lisibilité */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Badges catégorie & durée */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-label-technical text-[9px] uppercase tracking-wider text-white bg-black/80 backdrop-blur-xs px-2.5 py-1 border border-white/10">
                      {language === 'FR' ? video.categoryFR : video.categoryEN}
                    </span>
                    {video.duration && (
                      <span className="font-label-technical text-[10px] uppercase tracking-wider text-white bg-black/80 backdrop-blur-xs px-2 py-0.5 border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#c7a97b]" />
                        <span>{video.duration}</span>
                      </span>
                    )}
                  </div>

                  {/* Bouton Play Central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/80 group-hover:bg-[#765935] text-white border border-white/20 group-hover:border-[#765935] flex items-center justify-center shadow-xl transition-all duration-200 group-hover:scale-110">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Indication localisation en bas de vignette */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-xs font-label-technical tracking-wider uppercase">
                    <MapPin className="w-3.5 h-3.5 text-[#c7a97b]" />
                    <span>{language === 'FR' ? video.locationFR : video.locationEN}</span>
                  </div>
                </div>

                {/* Corps de la Carte Vidéo */}
                <div className="p-5 md:p-6 space-y-3 flex-grow flex flex-col justify-between bg-[#faf9f6]">
                  <div className="space-y-2">
                    <h4 className="font-headline-md text-base sm:text-lg text-[#000000] group-hover:text-[#765935] transition-colors tracking-tight leading-snug">
                      {language === 'FR' ? video.titleFR : video.titleEN}
                    </h4>
                    <p className="font-body-sm text-xs text-[#444748] leading-relaxed line-clamp-3">
                      {language === 'FR' ? video.descriptionFR : video.descriptionEN}
                    </p>
                  </div>

                  {/* Lien textuel d'action */}
                  <div className="pt-3 border-t border-[#c4c7c7]/30 flex items-center justify-between text-[11px] font-label-technical uppercase tracking-wider text-[#000000] group-hover:text-[#765935] transition-colors">
                    <span className="font-bold">{t.videoGallery.playBtn}</span>
                    <Play className="w-3.5 h-3.5 fill-current ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL LECTEUR VIDÉO NATIF EN GRAND FORMAT                                 */}
      {/* ========================================================================= */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'FR' ? activeVideo.titleFR : activeVideo.titleEN}
          className="fixed inset-0 z-50 bg-[#000000]/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideo(null);
          }}
        >
          {/* Header du Modal Vidéo */}
          <div className="flex items-center justify-between text-white z-10 w-full max-w-5xl mx-auto pb-4">
            <div className="flex items-center gap-3">
              <span className="font-label-technical text-[11px] uppercase tracking-widest text-[#c7a97b] font-bold">
                {language === 'FR' ? activeVideo.categoryFR : activeVideo.categoryEN}
              </span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <span className="font-label-technical text-[11px] uppercase tracking-widest text-white/80 hidden sm:inline">
                {language === 'FR' ? activeVideo.locationFR : activeVideo.locationEN}
              </span>
            </div>

            <button
              onClick={() => setActiveVideo(null)}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
              aria-label={t.videoGallery.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lecteur Vidéo Natif (Aucun téléchargement préalable sans clic) */}
          <div className="relative flex-grow flex items-center justify-center max-w-5xl mx-auto w-full py-2">
            <div className="relative w-full max-h-[72vh] flex items-center justify-center bg-black border border-white/15 shadow-2xl overflow-hidden">
              <video
                key={activeVideo.id}
                src={getRealizationVideoUrl(activeVideo.videoFileName)}
                poster={activeVideo.poster}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full max-h-[70vh] object-contain"
              >
                <source
                  src={getRealizationVideoUrl(activeVideo.videoFileName)}
                  type="video/mp4"
                />
                {language === 'FR'
                  ? 'Votre navigateur ne supporte pas la lecture de vidéos.'
                  : 'Your browser does not support HTML5 video.'}
              </video>
            </div>
          </div>

          {/* Pied de Page du Lecteur Vidéo */}
          <div className="w-full max-w-5xl mx-auto pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
            <div className="space-y-1 max-w-3xl">
              <h4 className="font-headline-md text-base sm:text-lg text-white font-medium">
                {language === 'FR' ? activeVideo.titleFR : activeVideo.titleEN}
              </h4>
              <p className="font-body-sm text-xs text-white/70 leading-relaxed">
                {language === 'FR' ? activeVideo.descriptionFR : activeVideo.descriptionEN}
              </p>
            </div>

            <button
              onClick={() => setActiveVideo(null)}
              className="inline-flex items-center gap-2 bg-white text-black font-label-technical text-[10px] uppercase tracking-widest px-5 py-2.5 hover:bg-[#c7a97b] hover:text-white transition-colors cursor-pointer font-bold shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.videoGallery.closeBtn}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
