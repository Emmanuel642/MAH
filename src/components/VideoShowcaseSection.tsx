import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import videoPosterChantier from '../assets/images/video_poster_chantier_1790686955515.jpg';

interface VideoShowcaseSectionProps {
  language: Language;
  onOpenEstimator?: () => void;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].video;
  const videoSrc = `${import.meta.env.BASE_URL}videos/chantier_villa_lubumbashi.mp4`;

  return (
    <section
      id="video-chantier"
      className="bg-[#0d0e0d] text-[#faf9f6] py-16 md:py-24 border-b border-[#232423] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* En-tête Éditorial */}
        <div className="max-w-3xl space-y-3 mb-8 md:mb-12">
          <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#c7a97b] font-bold block">
            {t.tag}
          </span>
          <h2 className="font-display-lg text-[26px] sm:text-[34px] md:text-[40px] text-white tracking-tight leading-[1.15] text-balance">
            {t.title}
          </h2>
          <p className="font-body-md text-[#9ea0a0] leading-relaxed max-w-2xl font-normal">
            {language === 'FR'
              ? 'La visite brute du chantier : de la volumétrie architecturale aux finitions en cours d’exécution sur le terrain à Lubumbashi.'
              : 'Raw on-site walkthrough: from architectural massing to turnkey execution details on site in Lubumbashi.'}
          </p>
        </div>

        {/* Lecteur Vidéo Brut au Format Vertical 9:16 Smartphone */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[9/16] bg-[#050505] border border-[#2a2b2a] shadow-2xl overflow-hidden group">
            <video
              src={videoSrc}
              poster={videoPosterChantier}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              aria-label={t.title}
            >
              <source src={videoSrc} type="video/mp4" />
              {language === 'FR'
                ? 'Votre navigateur ne supporte pas la lecture de vidéos.'
                : 'Your browser does not support the video tag.'}
            </video>
          </div>

          {/* Légende Architecturale Inférieure */}
          <div className="w-full max-w-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-6 mt-4 text-[10px] sm:text-[11px] font-label-technical tracking-wider text-[#747878] uppercase border-t border-[#232423]">
            <span>{t.captionProject}</span>
            <span className="text-[#c7a97b]">{t.captionMha}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
