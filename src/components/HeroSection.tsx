import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onOpenEstimator: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenEstimator,
  onNavigateSection,
}) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section className="relative bg-[#faf9f6] border-b border-[#c4c7c7]/30 pt-16 pb-20 md:py-28 overflow-hidden" id="top">
      <div className="max-w-[1680px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Pure Tectonic Statement */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
              {t.tag}
            </span>
            <h1 className="font-display-xl text-[#000000] tracking-tight whitespace-pre-line text-balance">
              {t.title}
            </h1>
          </div>

          <p className="font-body-lg text-body-lg text-[#444748] max-w-xl font-normal leading-relaxed">
            {t.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigateSection('projets')}
              className="inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-label-technical tracking-widest uppercase px-8 py-4 hover:bg-[#765935] transition-colors duration-200 cursor-pointer rounded-none"
            >
              <span>{t.discover}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 border border-[#000000] bg-transparent text-[#000000] font-label-technical text-label-technical tracking-widest uppercase px-8 py-4 hover:bg-[#efeeeb] transition-colors duration-200 cursor-pointer rounded-none"
            >
              <span>{t.start}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Monograph Plate (Clean, majestic, no floating clutter) */}
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/11] bg-[#efeeeb] overflow-hidden border border-[#c4c7c7]/40 shadow-xs">
            <img
              alt="Villa Contemporaine Anthracite — Modern Home Concept / Architecture MHA"
              className="w-full h-full object-cover"
              src="/src/assets/images/villa_charcoal_home_1790686776772.jpg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

