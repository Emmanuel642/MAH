/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS_DATA } from './data/projectsData';
import { Language } from './types';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { ExpertisePillars } from './components/ExpertisePillars';
import { KeyMetricsSection } from './components/KeyMetricsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { ProjectModal } from './components/ProjectModal';
import { ServicesSection } from './components/ServicesSection';
import { ApproachSection } from './components/ApproachSection';
import { AboutSection } from './components/AboutSection';
import { EditorialBanner } from './components/EditorialBanner';
import { FinalCtaSection } from './components/FinalCtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectEstimatorModal } from './components/ProjectEstimatorModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('FR');
  const [activeCity, setActiveCity] = useState<'Kinshasa' | 'Lubumbashi'>('Lubumbashi');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [initialEstimatorProgram, setInitialEstimatorProgram] = useState('');

  const selectedProject = selectedProjectId
    ? PROJECTS_DATA.find((p) => p.id === selectedProjectId) || null
    : null;

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleCloseProject = () => {
    setSelectedProjectId(null);
  };

  const handleOpenEstimatorWithProgram = (program: string) => {
    setInitialEstimatorProgram(program);
    setEstimatorOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    handleOpenEstimatorWithProgram(serviceName);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] antialiased flex flex-col font-body-md text-body-md selection:bg-[#000000] selection:text-[#faf9f6]">
      {/* 01 — Navigation Bar : Calme, lisible, avec FR/EN discret */}
      <HeaderNav
        language={language}
        onLanguageChange={setLanguage}
        onOpenEstimator={() => handleOpenEstimatorWithProgram('Étude globale')}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Flow : Rythme & Grands Espaces */}
      <main className="flex-grow">
        {/* 02 — Hero : Épuré, respirant, centré sur la photographie */}
        <HeroSection
          language={language}
          onOpenEstimator={() => handleOpenEstimatorWithProgram('Résidence de maître')}
          onNavigateSection={handleNavigateSection}
        />

        {/* 03 — Expertises : 4 pôles clairs avec flèche */}
        <ExpertisePillars
          language={language}
          onSelectPole={(idx) => {
            const poles = ['Architecture', 'Ingénierie', 'Construction', 'Conseil'];
            handleOpenEstimatorWithProgram(poles[idx]);
          }}
        />

        {/* 04 — Chiffres Clés : Éléments visuels directs sans blocs de texte superflus */}
        <KeyMetricsSection language={language} />

        {/* 05 — Vidéo Chantier & Visite Immersive : mise en avant pour le storytelling du projet */}
        <VideoShowcaseSection
          language={language}
          onOpenEstimator={() => handleOpenEstimatorWithProgram('Suivi de chantier & Réalisation')}
        />

        {/* 06 — Réalisations : Cœur immersif, mode monographique, uniquement l'essentiel */}
        <ProjectsSection
          projects={PROJECTS_DATA}
          language={language}
          onSelectProject={handleOpenProject}
          onNavigateSection={handleNavigateSection}
        />

        {/* 06 — Services : 4 textes courts éditoriaux */}
        <ServicesSection
          language={language}
          onSelectService={handleSelectService}
        />

        {/* 07 — Méthodologie : Ligne éditoriale légère (5 étapes) */}
        <ApproachSection language={language} />

        {/* 08 — À Propos, Vision & Mission (espace négatif), et Direction Générale (Zoé JAMES CISKA) */}
        <AboutSection language={language} />

        {/* 09 — Section Éditoriale Panoramique */}
        <EditorialBanner language={language} />

        {/* 10 — Vous avez un projet ? Cadrage & Inception */}
        <FinalCtaSection
          language={language}
          onOpenEstimator={() => handleOpenEstimatorWithProgram('Nouveau projet')}
          onNavigateSection={handleNavigateSection}
        />

        {/* 11 — Contact : Bureaux Kinshasa / Lubumbashi & Formulaire court */}
        <ContactSection
          language={language}
          selectedCity={activeCity}
          onCityChange={setActiveCity}
        />
      </main>

      {/* 12 — Footer Simplifié */}
      <Footer
        language={language}
        onNavigateSection={handleNavigateSection}
        onSelectService={handleSelectService}
      />

      {/* Modal Fiche Projet : Progressive Disclosure (Niveau 1, 2, puis détails dépliables) */}
      <ProjectModal
        project={selectedProject}
        language={language}
        onClose={handleCloseProject}
        onRequestSimilar={(title, type) => {
          handleOpenEstimatorWithProgram(`${type} (${title})`);
        }}
      />

      {/* Outil de Cadrage de Projet : Dédié et non intrusif */}
      <ProjectEstimatorModal
        isOpen={estimatorOpen}
        language={language}
        initialProgram={initialEstimatorProgram}
        onClose={() => setEstimatorOpen(false)}
        onSubmitEstimate={(data) => {
          console.log('Projet cadré:', data);
        }}
      />
    </div>
  );
}
