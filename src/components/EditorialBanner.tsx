import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface EditorialBannerProps {
  language: Language;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ language }) => {
  const t = TRANSLATIONS[language].editorial;

  return (
    <section className="relative w-full h-[60vh] min-h-[420px] bg-[#000000] overflow-hidden border-b border-[#c4c7c7]/30 flex items-center justify-center">
      <img
        alt="Architecture MHA Congo"
        className="absolute inset-0 w-full h-full object-cover opacity-35 filter grayscale"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjRF62Fz2rhlPI_NvsgtLOzZQ4n22EtkpI6SpQBLFCyj-TvLfljy0eoljFshO8zVAhkF53Z4v725-FxkX0rp-uPCFVMxKbxY_ZvybW2VLaBXObWXMTutMIHiQg9wVUrLm92bcInYi9dT4AVf9PTCW4pob0weP18JCa1h18-IaIau7wj899Bs6p3IJTEhmmizeLdpld_oExIPOPhyzaKHcEWjmsuUlcqUZVgH_BppS7docSb_e7SwuC_A"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-10 max-w-[1680px] mx-auto px-6 md:px-16 text-center text-white space-y-4">
        <div className="space-y-2">
          <p className="font-display-lg uppercase tracking-tight font-medium text-2xl md:text-4xl">
            {t.line1}
          </p>
          <p className="font-display-lg uppercase tracking-tight font-medium text-[#cbc6bd] text-2xl md:text-4xl">
            {t.line2}
          </p>
          <p className="font-display-lg uppercase tracking-tight font-medium text-2xl md:text-4xl">
            {t.line3}
          </p>
        </div>
        <div className="pt-4 font-label-technical text-xs text-[#cbc6bd] tracking-widest uppercase">
          {t.location}
        </div>
      </div>
    </section>
  );
};

