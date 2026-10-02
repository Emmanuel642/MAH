import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoMha from '../assets/images/logo-mha.png';

interface HeaderNavProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEstimator: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  language,
  onLanguageChange,
  onOpenEstimator,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="bg-[#faf9f6]/95 backdrop-blur-sm top-0 z-40 sticky border-b border-[#c4c7c7]/30 transition-colors">
      <div className="flex justify-between items-center w-full px-5 md:px-8 lg:px-12 max-w-[1440px] mx-auto h-20">
        {/* Zone 1: Logo & Brand Identity */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          className="flex items-center gap-3 group cursor-pointer focus-visible:ring-1 focus-visible:ring-[#000000] p-1 shrink-0"
        >
          <img
            alt="Logo MHA Modern Home Architecture"
            className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            src={logoMha}
          />
          <div className="hidden sm:flex flex-col border-l border-[#c4c7c7]/40 pl-3">
            <span className="font-headline-md text-[15px] md:text-[16px] tracking-tight uppercase font-medium text-[#000000] leading-tight">
              MHA
            </span>
            <span className="font-label-technical text-[9px] tracking-widest uppercase text-[#747878] leading-none">
              Modern Home Architecture
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Épurée : Projets, Services, À propos, Contact) */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
          <a
            href="#projets"
            onClick={(e) => handleLinkClick(e, 'projets')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1"
          >
            {t.projects}
          </a>
          <a
            href="#services"
            onClick={(e) => handleLinkClick(e, 'services')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1"
          >
            {t.services}
          </a>
          <a
            href="#a-propos"
            onClick={(e) => handleLinkClick(e, 'a-propos')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1"
          >
            {t.about}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1"
          >
            {t.contact}
          </a>
        </nav>

        {/* Zone 3: Hiérarchie MHA -> Nav -> Langue -> CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Sélecteur discret FR / EN */}
          <div className="flex items-center space-x-1 font-label-technical text-[10px] uppercase tracking-wider text-[#747878] pr-1 sm:pr-2">
            <button
              onClick={() => onLanguageChange('FR')}
              className={`transition-colors cursor-pointer py-1 px-1.5 ${
                language === 'FR' ? 'text-[#000000] font-bold' : 'hover:text-[#000000]'
              }`}
              aria-label="Français"
            >
              FR
            </button>
            <span className="text-[#c4c7c7]">/</span>
            <button
              onClick={() => onLanguageChange('EN')}
              className={`transition-colors cursor-pointer py-1 px-1.5 ${
                language === 'EN' ? 'text-[#000000] font-bold' : 'hover:text-[#000000]'
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          {/* Bouton CTA Principal */}
          <button
            onClick={onOpenEstimator}
            className="hidden sm:inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-label-technical tracking-widest uppercase px-4 lg:px-5 py-2.5 lg:py-3 hover:bg-[#765935] transition-all duration-200 cursor-pointer rounded-none whitespace-nowrap"
          >
            <span>{t.startProject}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Bouton Menu Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#000000] hover:bg-[#f4f3f1] border border-[#c4c7c7]/50 rounded-none cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile élégant et facilement refermable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf9f6] border-b border-[#c4c7c7]/40 px-5 md:px-8 py-6 space-y-6 animate-fadeIn">
          <nav className="flex flex-col space-y-2 font-label-technical text-label-technical tracking-widest uppercase">
            <a
              href="#projets"
              onClick={(e) => handleLinkClick(e, 'projets')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2.5 border-b border-[#c4c7c7]/20 transition-colors"
            >
              {t.projects}
            </a>
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, 'services')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2.5 border-b border-[#c4c7c7]/20 transition-colors"
            >
              {t.services}
            </a>
            <a
              href="#a-propos"
              onClick={(e) => handleLinkClick(e, 'a-propos')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2.5 border-b border-[#c4c7c7]/20 transition-colors"
            >
              {t.about}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2.5 transition-colors"
            >
              {t.contact}
            </a>
          </nav>

          {/* CTA présent dans le tiroir mobile */}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#000000] text-white font-label-technical text-label-technical tracking-widest uppercase px-5 py-3.5 hover:bg-[#765935] transition-colors cursor-pointer"
            >
              <span>{t.startProject}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


