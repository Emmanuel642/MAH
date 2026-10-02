import React, { useState } from 'react';
import { Project, Language, ProjectCategory } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  language: Language;
  onSelectProject: (projectId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  language,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Tous');
  const t = TRANSLATIONS[language].projects;

  const categories: ProjectCategory[] = ['Tous', 'Résidentiel', 'Tertiaire', 'Génie civil'];

  const categoryLabels: Record<string, string> = {
    Tous: t.categories.all,
    Résidentiel: t.categories.residential,
    Tertiaire: t.categories.commercial,
    'Génie civil': t.categories.civil,
  };

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'Tous') return true;
    return project.category.includes(selectedCategory);
  });

  return (
    <section className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-24 md:py-32" id="projets">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header: Pure & Airy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
              {t.tag}
            </span>
            <h2 className="font-display-lg text-[#000000] tracking-tight text-balance">
              {t.title}
            </h2>
            <p className="font-body-lg text-[#444748] pt-1">
              {t.desc}
            </p>
          </div>

          {/* Quiet Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-label-technical text-[10px] uppercase tracking-widest transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#000000] text-white border-[#000000]'
                    : 'bg-[#faf9f6] text-[#444748] border-[#c4c7c7]/40 hover:border-[#000000]'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Monograph Project Cards Grid: Pure Photography & Quiet Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              tabIndex={0}
              role="button"
              aria-label={`${t.viewProjectAria} ${project.title}`}
              onClick={() => onSelectProject(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project.id);
                }
              }}
              className="group cursor-pointer flex flex-col space-y-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#000000] p-1"
            >
              {/* Full-Bleed Photograph */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#efeeeb] border border-[#c4c7c7]/30">
                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  src={project.image}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Minimal Meta: Name, Typology · City, and Arrow */}
              <div className="flex justify-between items-end pt-1">
                <div className="space-y-1">
                  <h3 className="font-headline-lg text-2xl md:text-3xl text-[#000000] tracking-tight group-hover:text-[#765935] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-sm text-[#747878]">
                    {(language === 'EN' && project.typeEN ? project.typeEN : project.type).split('·')[0].trim()} · {project.city}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 font-label-technical text-label-technical uppercase tracking-widest text-[#000000] group-hover:text-[#765935] transition-colors pb-1">
                  <span>{t.discoverBtn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

