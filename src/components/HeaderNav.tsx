import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
    <header className="bg-[#faf9f6]/95 backdrop-blur-sm top-0 z-40 sticky border-b border-[#c4c7c7]/30">
      <div className="flex justify-between items-center w-full px-6 md:px-16 max-w-[1680px] mx-auto h-20">
        {/* Zone 1: Logo & Brand Identity */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          className="flex items-center gap-3.5 group cursor-pointer focus-visible:ring-1 focus-visible:ring-[#000000] p-1"
        >
          <img
            alt="Logo MHA Modern Home Architecture"
            className="h-16 md:h-20 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            src="/src/assets/images/logo-mha.png"
          />
          <div className="hidden sm:flex flex-col border-l border-[#c4c7c7]/40 pl-3">
            <span className="font-headline-md text-[16px] tracking-tight uppercase font-medium text-[#000000] leading-tight">
              MHA
            </span>
            <span className="font-label-technical text-[9px] tracking-widest uppercase text-[#747878] leading-none">
              Modern Home Architecture
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Calm, simple text) */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <a
            href="#projets"
            onClick={(e) => handleLinkClick(e, 'projets')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1"
          >
            {t.projects}
          </a>
          <a
            href="#video-chantier"
            onClick={(e) => handleLinkClick(e, 'video-chantier')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {t.video}
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
            href="#approche"
            onClick={(e) => handleLinkClick(e, 'approche')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1"
          >
            {t.approach}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="font-label-technical text-label-technical tracking-widest uppercase text-[#444748] hover:text-[#000000] transition-colors duration-150 py-1"
          >
            {t.contact}
          </a>
        </nav>

        {/* Zone 3: Subtle FR/EN + Primary Action */}
        <div className="flex items-center space-x-4">
          {/* Discreet FR / EN Switcher */}
          <div className="flex items-center space-x-1 font-label-technical text-[10px] uppercase tracking-wider text-[#747878] pr-2">
            <button
              onClick={() => onLanguageChange('FR')}
              className={`transition-colors cursor-pointer py-1 px-1.5 ${
                language === 'FR' ? 'text-[#000000] font-bold' : 'hover:text-[#000000]'
              }`}
            >
              FR
            </button>
            <span className="text-[#c4c7c7]">/</span>
            <button
              onClick={() => onLanguageChange('EN')}
              className={`transition-colors cursor-pointer py-1 px-1.5 ${
                language === 'EN' ? 'text-[#000000] font-bold' : 'hover:text-[#000000]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={onOpenEstimator}
            className="inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-label-technical tracking-widest uppercase px-5 py-3 hover:bg-[#765935] transition-all duration-200 cursor-pointer rounded-none whitespace-nowrap"
          >
            <span>{t.startProject}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#000000] hover:bg-[#f4f3f1] border border-[#c4c7c7]/50 rounded-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f6] border-b border-[#c4c7c7]/40 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-label-technical text-label-technical tracking-widest uppercase">
            <a
              href="#projets"
              onClick={(e) => handleLinkClick(e, 'projets')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2 border-b border-[#c4c7c7]/20"
            >
              {t.projects}
            </a>
            <a
              href="#video-chantier"
              onClick={(e) => handleLinkClick(e, 'video-chantier')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2 border-b border-[#c4c7c7]/20 flex items-center justify-between"
            >
              <span>{t.video}</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, 'services')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2 border-b border-[#c4c7c7]/20"
            >
              {t.services}
            </a>
            <a
              href="#a-propos"
              onClick={(e) => handleLinkClick(e, 'a-propos')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2 border-b border-[#c4c7c7]/20"
            >
              {t.about}
            </a>
            <a
              href="#approche"
              onClick={(e) => handleLinkClick(e, 'approche')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2 border-b border-[#c4c7c7]/20"
            >
              {t.approach}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="text-[#1a1c1a] hover:text-[#765935] py-2"
            >
              {t.contact}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


