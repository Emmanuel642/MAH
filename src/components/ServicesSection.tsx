import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ServicesSectionProps {
  language: Language;
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onSelectService,
}) => {
  const t = TRANSLATIONS[language].services;

  return (
    <section className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-24 md:py-32" id="services">
      <div className="max-w-[1680px] mx-auto px-6 md:px-16">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
            {t.tag}
          </span>
          <h2 className="font-display-lg text-[#000000] tracking-tight text-balance">
            {t.title}
          </h2>
        </div>

        {/* 4 Clean Editorial Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#c4c7c7]/40">
          {t.items.map((srv, idx) => (
            <div
              key={idx}
              onClick={() => onSelectService(srv.title)}
              className="border-r border-b border-[#c4c7c7]/40 p-8 md:p-10 bg-[#faf9f6] hover:bg-[#f4f3f1] transition-colors duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-label-technical text-label-technical text-[#765935] font-bold block">
                  {srv.num}
                </span>
                <h3 className="font-headline-md text-xl text-[#000000] tracking-tight">
                  {srv.title}
                </h3>
                <p className="font-body-md text-sm text-[#444748] leading-relaxed pt-2">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

