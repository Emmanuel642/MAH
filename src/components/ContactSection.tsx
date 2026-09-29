import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  language: Language;
  selectedCity: 'Kinshasa' | 'Lubumbashi';
  onCityChange: (city: 'Kinshasa' | 'Lubumbashi') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  selectedCity,
  onCityChange,
}) => {
  const t = TRANSLATIONS[language].contact;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    {
      cityKey: 'Lubumbashi' as const,
      name: 'LUBUMBASHI — KATANGA (SIÈGE SOCIAL)',
      address: 'Bloc II, Bâtiment LUANO CITY, Route Aéroport, Commune Annexe, Lubumbashi Ville',
      phones: ['+243 991 999 901', '+243 850 001 001'],
      email: 'contact@mha-rdc.com',
      hours: 'Lundi — Vendredi : 08h30 - 17h00',
      coordinates: "11°40'S 27°29'E",
      cadastreRef: 'CD-HK-LSH-2026/115',
      nrc: '8458',
      capital: 'CD 11 500 000',
    },
    {
      cityKey: 'Kinshasa' as const,
      name: 'KINSHASA — GOMBE (ANTENNE CAPITALE)',
      address: '42 Boulevard du 30 Juin, Gombe, Kinshasa',
      phones: ['+243 991 999 901', '+243 850 001 001'],
      email: 'contact@mha-rdc.com',
      hours: 'Lundi — Vendredi : 08h30 - 17h30',
      coordinates: "04°19'S 15°18'E",
      cadastreRef: 'CD-KIN-GMB-2026/042',
      nrc: '8458',
      capital: 'CD 11 500 000',
    },
  ];

  const currentOffice = offices.find((o) => o.cityKey === selectedCity) || offices[0];

  return (
    <section className="bg-[#f4f3f1] border-b border-[#c4c7c7]/30 py-24 md:py-32" id="contact">
      <div className="max-w-[1680px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Details Column */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-3">
              <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
                {t.tag}
              </span>
              <h2 className="font-display-lg text-[#000000] tracking-tight">
                {t.title}
              </h2>
              <p className="font-body-md text-[#444748]">
                {t.subtitle}
              </p>
            </div>

            {/* Discreet Office Selector */}
            <div className="flex border border-[#c4c7c7]/40 bg-[#faf9f6]">
              {offices.map((off) => (
                <button
                  key={off.cityKey}
                  type="button"
                  onClick={() => onCityChange(off.cityKey)}
                  className={`flex-1 py-3 px-4 font-label-technical text-label-technical uppercase tracking-widest text-center transition-colors cursor-pointer ${
                    selectedCity === off.cityKey
                      ? 'bg-[#000000] text-white font-bold'
                      : 'text-[#444748] hover:text-[#000000]'
                  }`}
                >
                  {off.cityKey.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Office Contact Info */}
            <div className="space-y-6 pt-2 font-body-md text-[#444748]">
              <div>
                <span className="font-label-technical text-[10px] text-[#765935] tracking-widest uppercase font-bold block mb-1">
                  Adresse & Implantation
                </span>
                <p className="text-[#000000] font-medium leading-snug">{currentOffice.address}</p>
                <p className="text-sm text-[#747878] mt-0.5">{currentOffice.name}</p>
              </div>

              <div>
                <span className="font-label-technical text-[10px] text-[#765935] tracking-widest uppercase font-bold block mb-1">
                  Téléphones
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {currentOffice.phones.map((phone, idx) => (
                    <React.Fragment key={idx}>
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                        className="text-[#000000] hover:text-[#765935] font-medium transition-colors"
                      >
                        {phone}
                      </a>
                      {idx < currentOffice.phones.length - 1 && (
                        <span className="text-[#c4c7c7]">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-label-technical text-[10px] text-[#765935] tracking-widest uppercase font-bold block mb-1">
                  E-mail
                </span>
                <a
                  href={`mailto:${currentOffice.email}`}
                  className="text-[#000000] hover:text-[#765935] font-medium transition-colors"
                >
                  {currentOffice.email}
                </a>
              </div>

              <div>
                <span className="font-label-technical text-[10px] text-[#765935] tracking-widest uppercase font-bold block mb-1">
                  Permanence technique
                </span>
                <p className="text-sm">{currentOffice.hours}</p>
              </div>

              <div className="pt-3 border-t border-[#c4c7c7]/30 space-y-1 text-xs font-label-technical text-[#747878] tracking-wider">
                <p>
                  <span className="text-[#000000] font-bold">NRC :</span> {currentOffice.nrc} &nbsp;·&nbsp;
                  <span className="text-[#000000] font-bold">Capital :</span> {currentOffice.capital}
                </p>
                <p>
                  <span className="text-[#765935] font-bold">CADASTRE :</span> {currentOffice.cadastreRef} ({currentOffice.coordinates})
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column: Clean Drafting Lines */}
          <div className="lg:col-span-7 bg-[#faf9f6] p-8 md:p-12 border border-[#c4c7c7]/40 shadow-xs">
            {submitted ? (
              <div className="space-y-6 py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#765935] mx-auto" />
                <h3 className="font-headline-lg text-2xl text-[#000000]">
                  Demande transmise avec succès
                </h3>
                <p className="font-body-md text-[#444748] max-w-md mx-auto">
                  {t.form.success}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      phone: '',
                      project_type: '',
                      message: '',
                    });
                  }}
                  className="inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-label-technical uppercase tracking-widest px-8 py-3.5 hover:bg-[#765935] transition-colors cursor-pointer"
                >
                  <span>Nouvelle demande</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block"
                    htmlFor="name"
                  >
                    {t.form.name}
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] px-0 py-3 text-[#000000] placeholder:text-[#c4c7c7] focus:ring-0 focus:border-[#765935] focus:outline-none transition-colors font-body-md"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label
                      className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block"
                      htmlFor="email"
                    >
                      {t.form.email}
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] px-0 py-3 text-[#000000] placeholder:text-[#c4c7c7] focus:ring-0 focus:border-[#765935] focus:outline-none transition-colors font-body-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block"
                      htmlFor="phone"
                    >
                      {t.form.phone}
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+243 ..."
                      className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] px-0 py-3 text-[#000000] placeholder:text-[#c4c7c7] focus:ring-0 focus:border-[#765935] focus:outline-none transition-colors font-body-md"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label
                    className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block"
                    htmlFor="project_type"
                  >
                    {t.form.type}
                  </label>
                  <select
                    id="project_type"
                    required
                    value={formState.project_type}
                    onChange={(e) => setFormState({ ...formState, project_type: e.target.value })}
                    className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] px-0 py-3 text-[#000000] focus:ring-0 focus:border-[#765935] focus:outline-none transition-colors font-body-md cursor-pointer"
                  >
                    <option value="" disabled>
                      {t.form.typeDefault}
                    </option>
                    <option value="Architecture">Architecture</option>
                    <option value="Construction">Construction</option>
                    <option value="Génie civil">Génie civil</option>
                    <option value="Conseil">Conseil & Maîtrise d'œuvre</option>
                    <option value="Autre">Autre programme</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block"
                    htmlFor="message"
                  >
                    {t.form.message}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Décrivez brièvement votre projet..."
                    className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] px-0 py-3 text-[#000000] placeholder:text-[#c4c7c7] focus:ring-0 focus:border-[#765935] focus:outline-none transition-colors font-body-md resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-label-technical tracking-widest uppercase px-10 py-4 hover:bg-[#765935] transition-colors cursor-pointer"
                  >
                    <span>{t.form.submit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
