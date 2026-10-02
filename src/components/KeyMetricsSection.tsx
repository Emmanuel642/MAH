import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface KeyMetricsSectionProps {
  language: Language;
}

export const KeyMetricsSection: React.FC<KeyMetricsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].metrics;

  return (
    <section className="bg-[#f4f3f1] border-b border-[#c4c7c7]/30 py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Item 1: 09+ */}
          <div className="p-8 md:p-10 border border-[#c4c7c7]/40 bg-[#faf9f6] flex flex-col justify-between min-h-[160px]">
            <div className="font-display-xl text-[#000000] font-bold tracking-tighter tabular-nums leading-none">
              {t.yearsNum}
            </div>
            <div className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold pt-4">
              {t.yearsLabel}
            </div>
          </div>

          {/* Item 2: ARCHITECTURE & GÉNIE CIVIL */}
          <div className="p-8 md:p-10 border border-[#c4c7c7]/40 bg-[#faf9f6] flex flex-col justify-between min-h-[160px]">
            <div className="font-display-lg text-2xl sm:text-3xl md:text-4xl text-[#000000] font-bold tracking-tight leading-none uppercase">
              {t.synergyTitle}
            </div>
            <div className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold pt-4">
              {t.synergySub}
            </div>
          </div>

          {/* Item 3: RDC EXPERTISE LOCALE */}
          <div className="p-8 md:p-10 border border-[#c4c7c7]/40 bg-[#faf9f6] flex flex-col justify-between min-h-[160px]">
            <div className="font-display-xl text-[#000000] font-bold tracking-tighter leading-none">
              {t.localTitle}
            </div>
            <div className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold pt-4">
              {t.localLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

