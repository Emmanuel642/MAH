import React, { useState, useEffect } from 'react';
import { Project, Language, ProjectCategory } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { REALIZATIONS_VIDEOS, getRealizationVideoUrl } from '../data/realizationsVideos';
import {
  ArrowRight,
  Play,
  X,
  Film,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Grid,
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
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
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

  // Handle body scroll lock and keyboard shortcuts for modal
  useEffect(() => {
    if (!isGalleryModalOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeVideoIndex !== null) {
          // If viewing a single video, back to video gallery grid
          setActiveVideoIndex(null);
        } else {
          // If on gallery grid, close modal
          setIsGalleryModalOpen(false);
        }
      } else if (activeVideoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setActiveVideoIndex((prev) =>
            prev !== null ? (prev > 0 ? prev - 1 : REALIZATIONS_VIDEOS.length - 1) : 0
          );
        } else if (e.key === 'ArrowRight') {
          setActiveVideoIndex((prev) =>
            prev !== null ? (prev < REALIZATIONS_VIDEOS.length - 1 ? prev + 1 : 0) : 0
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGalleryModalOpen, activeVideoIndex]);

  const handleCloseModal = () => {
    setIsGalleryModalOpen(false);
    setActiveVideoIndex(null);
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

          {/* Category Filters + Bouton discret & élégant d'accès à la galerie vidéo */}
          <div className="flex flex-wrap items-center gap-2 pt-2 max-w-full">
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

            {/* Bouton d'accès à la galerie vidéo dédiée */}
            <button
              onClick={() => {
                setIsGalleryModalOpen(true);
                setActiveVideoIndex(null);
              }}
              className="px-4 py-2 font-label-technical text-[10px] uppercase tracking-widest transition-all cursor-pointer border border-[#765935] bg-[#faf9f6] text-[#765935] hover:bg-[#765935] hover:text-white flex items-center gap-2 shrink-0 group shadow-xs"
              aria-label={t.videoGallery.galleryBtn}
            >
              <Film className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>{t.videoGallery.galleryBtn}</span>
              <span className="text-[9px] bg-[#765935]/15 group-hover:bg-white/20 text-[#765935] group-hover:text-white px-1.5 py-0.5 font-bold transition-colors">
                {REALIZATIONS_VIDEOS.length}
              </span>
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
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#000000] text-white text-[10px] font-label-technical tracking-widest uppercase px-3 py-1">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex justify-between items-baseline pt-2">
                <div className="space-y-1">
                  <h3 className="font-headline-lg text-[#000000] group-hover:text-[#765935] transition-colors">
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
      </div>

      {/* ========================================================================= */}
      {/* MODAL DÉDIÉ : GALERIE VIDÉO DES CHANTIERS DE RÉALISATIONS                  */}
      {/* ========================================================================= */}
      {isGalleryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-gallery-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#000000]/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="bg-[#faf9f6] border border-[#000000] w-full max-w-5xl my-auto max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Header Sticky du Modal */}
            <div className="bg-[#f4f3f1] border-b border-[#c4c7c7]/40 px-5 sm:px-7 py-4 flex items-center justify-between z-20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#765935]/15 text-[#765935] flex items-center justify-center shrink-0">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-label-technical text-[10px] uppercase tracking-widest text-[#765935] font-bold block">
                    {t.videoGallery.tag} · {REALIZATIONS_VIDEOS.length} {language === 'FR' ? 'VIDÉOS' : 'VIDEOS'}
                  </span>
                  <h3
                    id="video-gallery-modal-title"
                    className="font-headline-md text-base sm:text-lg text-[#000000] font-medium leading-tight"
                  >
                    {t.videoGallery.galleryModalTitle}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 text-[#000000] hover:text-[#765935] hover:bg-[#000000]/5 transition-colors cursor-pointer border border-[#c4c7c7]/40"
                aria-label={t.videoGallery.closeBtn}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps Déroulant du Modal */}
            <div className="overflow-y-auto flex-grow p-5 sm:p-7 md:p-8 space-y-6">
              {/* CAS 1 : VISIONNAGE D'UNE VIDÉO SPÉCIFIQUE */}
              {activeVideo && activeVideoIndex !== null ? (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Barre d'action supérieure du lecteur */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#c4c7c7]/30">
                    <button
                      onClick={() => setActiveVideoIndex(null)}
                      className="inline-flex items-center gap-1.5 font-label-technical text-[11px] uppercase tracking-wider text-[#000000] hover:text-[#765935] transition-colors cursor-pointer"
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>{t.videoGallery.backToGallery}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="font-label-technical text-[11px] uppercase tracking-wider text-[#747878]">
                        {language === 'FR'
                          ? `Vidéo ${activeVideoIndex + 1} sur ${REALIZATIONS_VIDEOS.length}`
                          : `Video ${activeVideoIndex + 1} of ${REALIZATIONS_VIDEOS.length}`}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            setActiveVideoIndex((prev) =>
                              prev !== null ? (prev > 0 ? prev - 1 : REALIZATIONS_VIDEOS.length - 1) : 0
                            )
                          }
                          className="p-1.5 text-[#000000] hover:text-white hover:bg-[#765935] border border-[#c4c7c7]/40 transition-colors cursor-pointer"
                          aria-label={language === 'FR' ? 'Vidéo précédente' : 'Previous video'}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setActiveVideoIndex((prev) =>
                              prev !== null ? (prev < REALIZATIONS_VIDEOS.length - 1 ? prev + 1 : 0) : 0
                            )
                          }
                          className="p-1.5 text-[#000000] hover:text-white hover:bg-[#765935] border border-[#c4c7c7]/40 transition-colors cursor-pointer"
                          aria-label={language === 'FR' ? 'Vidéo suivante' : 'Next video'}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lecteur Vidéo Natif */}
                  <div className="relative aspect-[16/9] max-h-[58vh] bg-black border border-[#c4c7c7]/40 shadow-inner overflow-hidden flex items-center justify-center">
                    <video
                      key={activeVideo.id}
                      src={getRealizationVideoUrl(activeVideo.videoFileName)}
                      poster={activeVideo.poster}
                      controls
                      autoPlay
                      playsInline
                      preload="auto"
                      className="w-full h-full object-contain"
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

                  {/* Détails de la vidéo en cours */}
                  <div className="bg-[#f4f3f1] border border-[#c4c7c7]/40 p-5 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-label-technical text-[9px] uppercase tracking-wider text-white bg-[#000000] px-2.5 py-1">
                        {language === 'FR' ? activeVideo.categoryFR : activeVideo.categoryEN}
                      </span>
                      <span className="font-label-technical text-[10px] text-[#765935] uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{language === 'FR' ? activeVideo.locationFR : activeVideo.locationEN}</span>
                      </span>
                      {activeVideo.duration && (
                        <span className="font-label-technical text-[10px] text-[#747878] uppercase tracking-wider flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{activeVideo.duration}</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-headline-md text-lg sm:text-xl text-[#000000] font-medium pt-1">
                      {language === 'FR' ? activeVideo.titleFR : activeVideo.titleEN}
                    </h4>

                    <p className="font-body-md text-sm text-[#444748] leading-relaxed">
                      {language === 'FR' ? activeVideo.descriptionFR : activeVideo.descriptionEN}
                    </p>
                  </div>

                  {/* Sélecteur rapide de la playlist sous le lecteur */}
                  <div className="space-y-3 pt-2">
                    <span className="font-label-technical text-[10px] uppercase tracking-wider text-[#747878] block">
                      {language === 'FR' ? 'Toutes les vidéos de chantiers :' : 'All on-site videos:'}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {REALIZATIONS_VIDEOS.map((vid, idx) => (
                        <button
                          key={vid.id}
                          onClick={() => setActiveVideoIndex(idx)}
                          className={`p-2 text-left transition-all cursor-pointer border flex flex-col justify-between ${
                            activeVideoIndex === idx
                              ? 'bg-[#000000] text-white border-[#000000] shadow-xs'
                              : 'bg-[#faf9f6] text-[#444748] border-[#c4c7c7]/40 hover:border-[#000000]'
                          }`}
                        >
                          <span className="font-label-technical text-[9px] uppercase tracking-wider block font-bold text-[#c7a97b]">
                            0{idx + 1}
                          </span>
                          <span className="font-label-technical text-[10px] line-clamp-1 block pt-1">
                            {language === 'FR' ? vid.titleFR.split('—')[0].trim() : vid.titleEN.split('—')[0].trim()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* CAS 2 : GRILLE COMPLÈTE DES 6 VIDÉOS */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#c4c7c7]/30">
                    <p className="font-body-md text-sm text-[#444748]">
                      {t.videoGallery.galleryModalSubtitle}
                    </p>
                    <span className="font-label-technical text-[10px] text-[#765935] uppercase tracking-widest shrink-0">
                      {language === 'FR' ? 'Cliquez pour visionner' : 'Click to stream'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Badges catégorie & durée */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                            <span className="font-label-technical text-[9px] uppercase tracking-wider text-white bg-black/80 px-2 py-0.5 border border-white/10">
                              {language === 'FR' ? video.categoryFR : video.categoryEN}
                            </span>
                            {video.duration && (
                              <span className="font-label-technical text-[9px] uppercase tracking-wider text-white bg-black/80 px-1.5 py-0.5 border border-white/10 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 text-[#c7a97b]" />
                                <span>{video.duration}</span>
                              </span>
                            )}
                          </div>

                          {/* Bouton Play Central Stylisé */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-black/80 group-hover:bg-[#765935] text-white border border-white/25 group-hover:border-[#765935] flex items-center justify-center shadow-xl transition-all duration-200 group-hover:scale-110">
                              <Play className="w-5 h-5 ml-0.5 fill-current" />
                            </div>
                          </div>

                          {/* Indication localisation en bas de vignette */}
                          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white/90 text-[11px] font-label-technical tracking-wider uppercase">
                            <MapPin className="w-3 h-3 text-[#c7a97b]" />
                            <span>{language === 'FR' ? video.locationFR : video.locationEN}</span>
                          </div>
                        </div>

                        {/* Corps de la Carte Vidéo */}
                        <div className="p-4 sm:p-5 space-y-2.5 flex-grow flex flex-col justify-between bg-[#faf9f6]">
                          <div className="space-y-1.5">
                            <h4 className="font-headline-md text-base text-[#000000] group-hover:text-[#765935] transition-colors tracking-tight leading-snug">
                              {language === 'FR' ? video.titleFR : video.titleEN}
                            </h4>
                            <p className="font-body-sm text-xs text-[#444748] leading-relaxed line-clamp-2">
                              {language === 'FR' ? video.descriptionFR : video.descriptionEN}
                            </p>
                          </div>

                          {/* Lien textuel d'action */}
                          <div className="pt-2.5 border-t border-[#c4c7c7]/30 flex items-center justify-between text-[10px] font-label-technical uppercase tracking-wider text-[#000000] group-hover:text-[#765935] transition-colors">
                            <span className="font-bold">{t.videoGallery.playBtn}</span>
                            <Play className="w-3 h-3 fill-current ml-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pied de page du Modal */}
            <div className="bg-[#f4f3f1] border-t border-[#c4c7c7]/40 px-5 sm:px-7 py-3 flex items-center justify-between text-[11px] font-label-technical uppercase tracking-wider text-[#747878] shrink-0">
              <span>MHA · Modern Home Architecture</span>
              <button
                onClick={handleCloseModal}
                className="hover:text-[#000000] transition-colors cursor-pointer underline underline-offset-2"
              >
                {t.videoGallery.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
