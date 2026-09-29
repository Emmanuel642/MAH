import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowUpRight } from 'lucide-react';

interface ExpertisePillarsProps {
  language: Language;
  onSelectPole?: (poleIndex: number) => void;
}

export const ExpertisePillars: React.FC<ExpertisePillarsProps> = ({
  language,
  onSelectPole,
}) => {
  const t = TRANSLATIONS[language].expertise;

  return (
    <section className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-20 md:py-24">
      <div className="max-w-[1680px] mx-auto px-6 md:px-16">
        <div className="max-w-2xl mb-12">
          <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block mb-2">
            {t.tag}
          </span>
          <h2 className="font-headline-lg text-[#000000] tracking-tight">
            {t.headline}
          </h2>
        </div>

        {/* 4 Pillars Grid with 1px Hairlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#c4c7c7]/40">
          {t.pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => onSelectPole && onSelectPole(idx)}
              className="border-r border-b border-[#c4c7c7]/40 p-8 md:p-10 bg-[#faf9f6] hover:bg-[#f4f3f1] transition-colors duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="font-label-technical text-label-technical text-[#765935] font-bold block mb-4">
                  {pillar.num}
                </span>
                <h3 className="font-headline-md text-xl text-[#000000] tracking-tight mb-3">
                  {pillar.title}
                </h3>
                <p className="font-body-md text-sm text-[#444748] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 flex justify-end">
                <span className="text-[#000000] group-hover:text-[#765935] transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

