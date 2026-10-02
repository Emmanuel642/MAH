import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { X } from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigateSection: (sectionId: string) => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateSection,
  onSelectService,
}) => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'mentions' | 'confidentialite'>('mentions');

  useEffect(() => {
    if (!legalModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLegalModalOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [legalModalOpen]);

  const isFr = language === 'FR';

  return (
    <>
      <footer className="bg-[#000000] text-white border-t border-[#747878]/20">
        <div className="w-full px-6 md:px-16 py-16 md:py-20 max-w-[1680px] mx-auto flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            {/* Brand */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-display-lg text-2xl tracking-tight uppercase font-medium text-white block">
                MHA
              </span>
              <p className="font-label-technical text-xs tracking-widest uppercase text-[#cbc6bd]">
                Société de Construction, d’Architecture & de Fourniture
              </p>
              <p className="font-body-sm text-[#858383] max-w-sm pt-2 leading-relaxed">
                {isFr
                  ? "Société de Construction, d’Architecture et de Fourniture de Matériaux de Construction en République Démocratique du Congo. Siège social à Lubumbashi (Luano City)."
                  : "Construction, Architecture and Construction Materials Supply Company in the Democratic Republic of Congo. Headquarters in Lubumbashi (Luano City)."}
              </p>
              <div className="pt-2 font-label-technical text-[10px] uppercase text-[#747878] tracking-widest">
                NRC 8458 · Capital social : CD 11 500 000
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#cbc6bd] block font-bold">
                Navigation
              </span>
              <ul className="space-y-2 font-body-sm text-[#858383]">
                <li>
                  <button
                    onClick={() => onNavigateSection('projets')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {isFr ? 'Projets' : 'Projects'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateSection('a-propos')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {isFr ? 'À propos' : 'About'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateSection('approche')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {isFr ? 'Approche' : 'Approach'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateSection('contact')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-3 space-y-3">
              <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#cbc6bd] block font-bold">
                Services
              </span>
              <ul className="space-y-2 font-body-sm text-[#858383]">
                <li>
                  <button
                    onClick={() => onSelectService('Architecture')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Architecture
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectService('Ingénierie')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {isFr ? 'Ingénierie' : 'Engineering'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectService('Construction')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Construction
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectService('Conseil')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {isFr ? 'Conseil & Assistance' : 'Advisory & Oversight'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Réseaux */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#cbc6bd] block font-bold">
                Contact
              </span>
              <div className="font-body-sm text-[#858383] space-y-1.5 leading-relaxed">
                <p className="text-white font-medium">Lubumbashi (Siège) :</p>
                <p className="text-xs">Bâtiment Luano City, Route Aéroport</p>
                <p className="pt-1">
                  <a href="tel:+243991999901" className="hover:text-white transition-colors block">
                    +243 991 999 901
                  </a>
                  <a href="tel:+243850001001" className="hover:text-white transition-colors block">
                    +243 850 001 001
                  </a>
                </p>
                <p className="pt-1">
                  <a href="mailto:contact@mha-rdc.com" className="hover:text-white transition-colors">
                    contact@mha-rdc.com
                  </a>
                </p>
              </div>
              <div className="pt-2 font-label-technical text-xs tracking-wider text-[#858383] space-x-3">
                <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                <span>/</span>
                <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#858383] font-label-technical text-[10px] uppercase tracking-widest">
            <div>
              © 2026 Société de Construction, d’Architecture et de Fourniture de Matériaux de Construction (MHA).
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  setLegalType('mentions');
                  setLegalModalOpen(true);
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isFr ? 'Mentions légales' : 'Legal Notice'}
              </button>
              <span className="text-white/20">·</span>
              <button
                onClick={() => {
                  setLegalType('confidentialite');
                  setLegalModalOpen(true);
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Dialog */}
      {legalModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-xs"
          onClick={() => setLegalModalOpen(false)}
        >
          <div
            className="bg-[#faf9f6] text-[#000000] border border-[#000000] max-w-xl w-full p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-[#c4c7c7] pb-4 mb-4">
              <h3 className="font-headline-md text-lg uppercase tracking-wider">
                {legalType === 'mentions'
                  ? (isFr ? 'Mentions Légales' : 'Legal Notice')
                  : (isFr ? 'Politique de Confidentialité' : 'Privacy Policy')}
              </h3>
              <button
                onClick={() => setLegalModalOpen(false)}
                className="p-1 hover:bg-[#e9e8e5] cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-body-sm text-[#444748] max-h-[60vh] overflow-y-auto pr-2">
              {legalType === 'mentions' ? (
                <>
                  <p>
                    <strong>Dénomination :</strong> Société de Construction, d’Architecture et de Fourniture de Matériaux de Construction (MHA).
                  </p>
                  <p>
                    <strong>Registre du Commerce (NRC) :</strong> 8458
                  </p>
                  <p>
                    <strong>Capital social :</strong> CD 11 500 000
                  </p>
                  <p>
                    <strong>Siège social :</strong> Bloc II, Bâtiment LUANO CITY, Route Aéroport, Commune Annexe, Lubumbashi Ville, Katanga DRC, République Démocratique du Congo.
                  </p>
                  <p>
                    <strong>Antenne Capitale :</strong> 42 Boulevard du 30 Juin, Commune de la Gombe, Kinshasa, RDC.
                  </p>
                  <p>
                    <strong>Téléphones :</strong> +243 991 999 901 &nbsp;|&nbsp; +243 850 001 001
                  </p>
                  <p>
                    <strong>Direction Générale :</strong> Directeur Général, Architecte.
                  </p>
                  <p>
                    <strong>Domaines d’intervention :</strong> Architecture contemporaine, études d’ingénierie structurelle, génie civil, entreprise de construction générale et fourniture de matériaux de construction.
                  </p>
                </>
              ) : (
                <p>
                  {isFr
                    ? "Les données transmises via notre site sont strictement réservées à l'évaluation technique de vos projets par nos équipes. Aucune donnée n'est cédée à des tiers."
                    : "Information submitted via our platform is strictly used for technical assessment of your project by our engineering team. No data is transferred to third parties."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
