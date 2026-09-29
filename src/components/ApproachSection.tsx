import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ApproachSectionProps {
  language: Language;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].approach;

  return (
    <section className="bg-[#f4f3f1] border-b border-[#c4c7c7]/30 py-24 md:py-32" id="approche">
      <div className="max-w-[1680px] mx-auto px-6 md:px-16">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
            {t.tag}
          </span>
          <h2 className="font-display-lg text-[#000000] tracking-tight text-balance">
            {t.title}
          </h2>
        </div>

        {/* Elegant Editorial Process Line */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-t border-[#c4c7c7]/40 pt-10 gap-8 md:gap-6">
          {t.steps.map((st, idx) => (
            <div key={idx} className="space-y-3 pr-4">
              <span className="font-label-technical text-label-technical text-[#765935] font-bold block">
                {st.num}
              </span>
              <h3 className="font-headline-md text-lg text-[#000000] tracking-tight">
                {st.title}
              </h3>
              <p className="font-body-md text-sm text-[#444748] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

