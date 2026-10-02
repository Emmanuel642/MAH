import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight } from 'lucide-react';

interface FinalCtaSectionProps {
  language: Language;
  onOpenEstimator: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  language,
  onOpenEstimator,
  onNavigateSection,
}) => {
  const t = TRANSLATIONS[language].finalCta;

  return (
    <section className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-24 md:py-36">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-display-lg text-[#000000] tracking-tight">
            {t.title}
          </h2>
          <p className="font-body-lg text-[#444748] leading-relaxed">
            {t.desc}
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-label-technical tracking-widest uppercase px-8 py-4 hover:bg-[#765935] transition-colors cursor-pointer rounded-none"
            >
              <span>{t.startBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateSection('contact')}
              className="inline-flex items-center gap-2 border border-[#000000] bg-transparent text-[#000000] font-label-technical text-label-technical tracking-widest uppercase px-8 py-4 hover:bg-[#efeeeb] transition-colors cursor-pointer rounded-none"
            >
              <span>{t.contactBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

