import React, { useState, useEffect } from 'react';
import { Project, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { X, ChevronDown, ChevronUp, ArrowRight, Info } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
  onRequestSimilar: (projectTitle: string, programType: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  language,
  onClose,
  onRequestSimilar,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const t = TRANSLATIONS[language].modal;

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isEn = language === 'EN';
  const activeType = isEn && project.typeEN ? project.typeEN : project.type;
  const activeDesc = isEn && project.descriptionEN ? project.descriptionEN : project.description;
  const activeSpecs = isEn && project.specsEN ? project.specsEN : project.specs;
  const activeLocation = isEn && project.locationEN ? project.locationEN : project.location;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#000000]/70 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#faf9f6] border border-[#000000] w-full max-w-4xl my-auto max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Top Minimal Header */}
        <div className="bg-[#f4f3f1] border-b border-[#c4c7c7]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <span className="font-label-technical text-label-technical uppercase tracking-widest text-[#765935] font-bold">
            {t.header} · {project.year}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#000000] hover:text-[#765935] transition-colors cursor-pointer border border-[#c4c7c7]/40"
            aria-label={t.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Level 1: Photo, Name, Typology, Location */}
        <div className="p-6 md:p-10 space-y-8">
          <div className="relative aspect-[16/10] w-full bg-[#efeeeb] overflow-hidden border border-[#c4c7c7]/30">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-2">
            <div className="font-label-technical text-label-technical uppercase tracking-widest text-[#765935]">
              {activeType} · {activeLocation}
            </div>
            <h2 id="modal-project-title" className="font-display-lg text-3xl md:text-4xl text-[#000000] tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Level 2: Short Narrative */}
          <div className="space-y-4 font-body-lg text-body-lg text-[#444748] leading-relaxed">
            <p>{activeDesc}</p>
          </div>

          {/* Level 3: Progressive Disclosure for Technical Details */}
          <div className="border-t border-[#c4c7c7]/40 pt-6">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full flex items-center justify-between py-3 text-left font-label-technical text-label-technical uppercase tracking-widest text-[#000000] hover:text-[#765935] transition-colors cursor-pointer border-b border-[#c4c7c7]/30"
            >
              <span>{t.techToggle}</span>
              {showTechnicalDetails ? (
                <ChevronUp className="w-4 h-4 text-[#765935]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#765935]" />
              )}
            </button>

            {showTechnicalDetails && (
              <div className="pt-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#f4f3f1] p-6 border border-[#c4c7c7]/40 font-body-sm text-[#444748]">
                  <div>
                    <span className="font-label-technical text-[10px] text-[#747878] uppercase block mb-1">
                      {t.surface}
                    </span>
                    <span className="font-medium text-[#000000]">{activeSpecs.superficie}</span>
                  </div>
                  <div>
                    <span className="font-label-technical text-[10px] text-[#747878] uppercase block mb-1">
                      {t.height}
                    </span>
                    <span className="font-medium text-[#000000]">{activeSpecs.hauteur}</span>
                  </div>
                  <div>
                    <span className="font-label-technical text-[10px] text-[#747878] uppercase block mb-1">
                      {t.program}
                    </span>
                    <span className="font-medium text-[#000000]">{activeSpecs.programme}</span>
                  </div>
                  <div>
                    <span className="font-label-technical text-[10px] text-[#747878] uppercase block mb-1">
                      {t.location}
                    </span>
                    <span className="font-medium text-[#000000]">{activeSpecs.localisation}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <span className="font-label-technical text-[10px] text-[#765935] uppercase font-bold block">
                      {t.materials}
                    </span>
                    <ul className="space-y-1.5 font-body-sm text-[#444748]">
                      {activeSpecs.materiaux.map((m, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#000000]">·</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-label-technical text-[10px] text-[#765935] uppercase font-bold block">
                      {t.missions}
                    </span>
                    <ul className="space-y-1.5 font-body-sm text-[#444748]">
                      {activeSpecs.phases.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#000000]">·</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subtle archive validation notice (Section 11) */}
                <div className="flex items-center gap-2 pt-2 text-[#747878] font-body-sm text-xs">
                  <Info className="w-3.5 h-3.5 shrink-0 text-[#765935]" />
                  <span>{t.disclaimer}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="pt-6 border-t border-[#c4c7c7]/30 flex justify-end">
            <button
              onClick={() => {
                onClose();
                onRequestSimilar(project.title, project.type);
              }}
              className="inline-flex items-center gap-2 bg-[#000000] text-white px-6 py-3 font-label-technical text-label-technical uppercase tracking-widest hover:bg-[#765935] transition-colors cursor-pointer"
            >
              <span>{t.similarBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

