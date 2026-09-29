import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].about;

  return (
    <div id="a-propos">
      {/* 01 — À Propos : Introduction Institutionnelle */}
      <section className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-24 md:py-32">
        <div className="max-w-[1680px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
              {t.tag}
            </span>
            <h2 className="font-display-lg text-[#000000] tracking-tight text-balance">
              {t.title}
            </h2>
          </div>

          <div className="lg:col-span-7 font-body-lg text-body-lg text-[#444748] leading-relaxed pt-2">
            <p>{t.desc}</p>
          </div>
        </div>
      </section>

      {/* 02 — Vision & Mission : Grand Espace Négatif */}
      <section className="bg-[#f4f3f1] border-b border-[#c4c7c7]/30 py-24 md:py-32">
        <div className="max-w-[1680px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Vision */}
          <div className="space-y-4">
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
              VISION
            </span>
            <h3 className="font-display-lg text-2xl md:text-3xl text-[#000000] tracking-tight">
              « {t.visionTitle} »
            </h3>
            <p className="font-body-md text-[#444748] leading-relaxed pt-2">
              {t.visionDesc}
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
              MISSION
            </span>
            <h3 className="font-display-lg text-2xl md:text-3xl text-[#000000] tracking-tight">
              « {t.missionTitle} »
            </h3>
            <p className="font-body-md text-[#444748] leading-relaxed pt-2">
              {t.missionDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 03 — Direction Générale : Portrait Éditorial Épuré */}
      <section className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-24 md:py-32">
        <div className="max-w-[1680px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Portrait Photo */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] bg-[#efeeeb] overflow-hidden border border-[#c4c7c7]/40 shadow-xs">
                <img
                  alt="Zoé JAMES CISKA Directrice Générale MHA"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-W1gkBnew7fdMwH9YTZusSjgmFAbExqm4FGrjPrJTRIF4cP_QXNu7xy2oB_WvJXeYBpzjl_-HTJvPVQrf4mSJjb5DgMKUWjCg_Ve7j6tKhq-u9o65EIq5cjBUFFhVVwCKOUDtg0GecwJDEspH63oK2QLS05YDU_IIrz_JGMsKADtMAD_dYt4f_8_8Ok2FerIFcNPD0u9JSvYjZcfCI3MSgnZ3KiVcoF1OSFFpytCxArZSJCC_VIUm_g"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Editorial Bio */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
                {t.dirTitle}
              </span>
              <div className="space-y-2">
                <h3 className="font-display-lg text-3xl md:text-4xl text-[#000000] tracking-tight">
                  {t.dirName}
                </h3>
                <p className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878]">
                  {t.dirRole}
                </p>
              </div>
              <p className="font-body-lg text-body-lg text-[#444748] font-normal leading-relaxed pt-2 max-w-2xl">
                {t.dirBio}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

