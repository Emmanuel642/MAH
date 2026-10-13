import React, { useState, useEffect } from 'react';
import { Project, Language, ProjectCategory } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { REALIZATIONS_VIDEOS, RealizationVideoItem, getRealizationVideoUrl } from '../data/realizationsVideos';
import {
  ArrowRight,
  Play,
  X,
  Film,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

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
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

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

  const activeVideo = activeVideoIndex !== null ? REALIZATIONS_VIDEOS[activeVideoIndex] : null;

  // Handle Keyboard navigation for video modal (Escape to close, Arrows for prev/next)
  useEffect(() => {
    if (activeVideoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveVideoIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : REALIZATIONS_VIDEOS.length - 1) : 0
        );
      } else if (e.key === 'ArrowRight') {
        setActiveVideoIndex((prev) =>
          prev !== null ? (prev < REALIZATIONS_VIDEOS.length - 1 ? prev + 1 : 0) : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoIndex]);

  const scrollToVideos = () => {
    const videoSection = document.getElementById('videos-realisations');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

          {/* Category Filters + Bouton d'accès direct aux vidéos de chantier */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-label-technical text-[10px] uppercase tracking-widest transition-colors cursor-pointer border shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#000000] text-white border-[#000000]'
                    : 'bg-[#faf9f6] text-[#444748] border-[#c4c7c7]/40 hover:border-[#000000]'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}

            {/* Accès direct à la galerie vidéo */}
            <button
              onClick={scrollToVideos}
              className="px-4 py-2 font-label-technical text-[10px] uppercase tracking-widest transition-all cursor-pointer border border-[#765935] bg-[#faf9f6] text-[#765935] hover:bg-[#765935] hover:text-white flex items-center gap-1.5 shrink-0 group"
              aria-label={language === 'FR' ? 'Accéder à la galerie vidéo' : 'Access video gallery'}
            >
              <Film className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>{language === 'FR' ? `Vidéos de chantiers (${REALIZATIONS_VIDEOS.length})` : `Site videos (${REALIZATIONS_VIDEOS.length})`}</span>
            </button>
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

              {/* Minimal Meta: Name, Typology · City, and Actions */}
              <div className="flex justify-between items-end pt-1">
                <div className="space-y-1">
                  <h3 className="font-headline-lg text-2xl md:text-3xl text-[#000000] tracking-tight group-hover:text-[#765935] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-sm text-[#747878]">
                    {(language === 'EN' && project.typeEN ? project.typeEN : project.type).split('·')[0].trim()} · {project.city}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 font-label-technical text-label-technical uppercase tracking-widest text-[#000000] group-hover:text-[#765935] transition-colors pb-1">
                    <span>{t.discoverBtn}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SOUS-SECTION : GALERIE VIDÉOS DE CHANTIERS (6 VIDÉOS EN DIRECT)           */}
        {/* ========================================================================= */}
        <div id="videos-realisations" className="pt-20 md:pt-28 mt-20 md:mt-28 border-t border-[#c4c7c7]/30 scroll-mt-24">
          {/* En-tête de la Galerie Vidéo */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-2">
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

            <div className="text-left md:text-right">
              <span className="font-label-technical text-xs tracking-wider uppercase text-[#747878] block">
                {language === 'FR' ? `${REALIZATIONS_VIDEOS.length} captations disponibles` : `${REALIZATIONS_VIDEOS.length} site videos available`}
              </span>
              <span className="font-label-technical text-[10px] text-[#765935] uppercase tracking-widest">
                {language === 'FR' ? 'Cliquez pour visionner' : 'Click to stream'}
              </span>
            </div>
          </div>

          {/* Grille des 6 Vidéos de Chantiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REALIZATIONS_VIDEOS.map((video, idx) => (
              <div
                key={video.id}
                onClick={() => setActiveVideoIndex(idx)}
                tabIndex={0}
                role="button"
                aria-label={`${t.videoGallery.playBtn} : ${language === 'FR' ? video.titleFR : video.titleEN}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveVideoIndex(idx);
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

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

                  {/* Bouton Play Central Stylisé */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/80 group-hover:bg-[#765935] text-white border border-white/25 group-hover:border-[#765935] flex items-center justify-center shadow-xl transition-all duration-200 group-hover:scale-110">
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
      {/* MODAL LECTEUR VIDÉO NATIF EN GRAND FORMAT AVEC NAVIGATION SUIVANT/PRÉCÉDENT*/}
      {/* ========================================================================= */}
      {activeVideo && activeVideoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'FR' ? activeVideo.titleFR : activeVideo.titleEN}
          className="fixed inset-0 z-50 bg-[#000000]/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideoIndex(null);
          }}
        >
          {/* Header du Modal Vidéo */}
          <div className="flex items-center justify-between text-white z-10 w-full max-w-5xl mx-auto pb-4">
            <div className="flex items-center gap-3">
              <span className="font-label-technical text-[11px] uppercase tracking-widest text-[#c7a97b] font-bold">
                {language === 'FR' ? activeVideo.categoryFR : activeVideo.categoryEN}
              </span>
              <span className="text-white/40">|</span>
              <span className="font-label-technical text-[11px] uppercase tracking-widest text-white/80">
                {language === 'FR'
                  ? `Vidéo ${activeVideoIndex + 1} sur ${REALIZATIONS_VIDEOS.length}`
                  : `Video ${activeVideoIndex + 1} of ${REALIZATIONS_VIDEOS.length}`}
              </span>
            </div>

            <button
              onClick={() => setActiveVideoIndex(null)}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
              aria-label={t.videoGallery.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lecteur Vidéo Natif avec Boutons Précédent / Suivant */}
          <div className="relative flex-grow flex items-center justify-center max-w-5xl mx-auto w-full py-2">
            {/* Bouton Vidéo Précédente */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveVideoIndex((prev) =>
                  prev !== null ? (prev > 0 ? prev - 1 : REALIZATIONS_VIDEOS.length - 1) : 0
                );
              }}
              className="absolute left-2 sm:-left-4 z-20 p-3 text-white bg-black/60 hover:bg-[#765935] border border-white/20 rounded-full transition-all cursor-pointer hover:scale-105"
              aria-label={language === 'FR' ? 'Vidéo précédente' : 'Previous video'}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Lecteur Vidéo */}
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

            {/* Bouton Vidéo Suivante */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveVideoIndex((prev) =>
                  prev !== null ? (prev < REALIZATIONS_VIDEOS.length - 1 ? prev + 1 : 0) : 0
                );
              }}
              className="absolute right-2 sm:-right-4 z-20 p-3 text-white bg-black/60 hover:bg-[#765935] border border-white/20 rounded-full transition-all cursor-pointer hover:scale-105"
              aria-label={language === 'FR' ? 'Vidéo suivante' : 'Next video'}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pied de Page du Lecteur : Informations + Playlist Rapide */}
          <div className="w-full max-w-5xl mx-auto pt-4 border-t border-white/15 space-y-4 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="font-label-technical text-[10px] text-[#c7a97b] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{language === 'FR' ? activeVideo.locationFR : activeVideo.locationEN}</span>
                  </span>
                </div>
                <h4 className="font-headline-md text-base sm:text-lg text-white font-medium">
                  {language === 'FR' ? activeVideo.titleFR : activeVideo.titleEN}
                </h4>
                <p className="font-body-sm text-xs text-white/70 leading-relaxed">
                  {language === 'FR' ? activeVideo.descriptionFR : activeVideo.descriptionEN}
                </p>
              </div>

              <button
                onClick={() => setActiveVideoIndex(null)}
                className="inline-flex items-center gap-2 bg-white text-black font-label-technical text-[10px] uppercase tracking-widest px-5 py-2.5 hover:bg-[#c7a97b] hover:text-white transition-colors cursor-pointer font-bold shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.videoGallery.closeBtn}</span>
              </button>
            </div>

            {/* Sélecteur de vidéos / Playlist sous le lecteur */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-white/10">
              <span className="text-[10px] font-label-technical uppercase tracking-wider text-white/50 shrink-0 mr-1">
                {language === 'FR' ? 'Playlist :' : 'Playlist:'}
              </span>
              {REALIZATIONS_VIDEOS.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`px-3 py-1 text-[10px] font-label-technical uppercase tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer border ${
                    activeVideoIndex === idx
                      ? 'bg-[#c7a97b] text-black border-[#c7a97b] font-bold'
                      : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {language === 'FR' ? `0${idx + 1}. ${vid.titleFR.split('—')[0].trim()}` : `0${idx + 1}. ${vid.titleEN.split('—')[0].trim()}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
