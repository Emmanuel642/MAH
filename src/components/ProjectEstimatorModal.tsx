import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  language: Language;
  initialProgram?: string;
  onClose: () => void;
  onSubmitEstimate: (data: {
    programType: string;
    city: string;
    surface: number;
    phases: string[];
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  }) => void;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  language,
  initialProgram = '',
  onClose,
  onSubmitEstimate,
}) => {
  const t = TRANSLATIONS[language].estimator;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [programType, setProgramType] = useState(initialProgram || t.programs[0].title);
  const [city, setCity] = useState('Kinshasa');
  const [surface, setSurface] = useState(850);
  const [phases, setPhases] = useState<string[]>([
    t.missions[0],
    t.missions[1],
    t.missions[2],
  ]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync initial program if changed
  useEffect(() => {
    if (initialProgram) {
      setProgramType(initialProgram);
    }
  }, [initialProgram]);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const togglePhase = (p: string) => {
    if (phases.includes(p)) {
      setPhases(phases.filter((x) => x !== p));
    } else {
      setPhases([...phases, p]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmitEstimate({
      programType,
      city,
      surface,
      phases,
      clientName,
      clientEmail,
      clientPhone,
    });
  };

  const programOptions = t.programs;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-estimator-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#000000]/70 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#faf9f6] border border-[#000000] w-full max-w-4xl my-auto max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#f4f3f1] border-b border-[#c4c7c7]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <span className="font-label-technical text-label-technical uppercase tracking-widest text-[#765935] font-bold">
              {t.tag}
            </span>
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#747878] hidden sm:inline">
              · {step === 1 ? t.step1 : step === 2 ? t.step2 : t.step3}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#e9e8e5] text-[#000000] transition-colors cursor-pointer border border-[#c4c7c7]/50"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-10">
          {submitted ? (
            <div className="space-y-6 py-8 text-center">
              <div className="w-12 h-12 bg-stone-100 text-[#765935] border border-[#765935]/40 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 id="modal-estimator-title" className="font-display-lg text-2xl md:text-3xl text-[#000000]">
                {t.successTitle}
              </h3>
              <p className="font-body-md text-[#444748] max-w-xl mx-auto">
                {t.successSub} ({city} — {programType}, ~{surface} {t.surfaceUnit}).
              </p>

              {/* Summary Card */}
              <div className="bg-[#f4f3f1] border border-[#c4c7c7]/50 p-6 max-w-lg mx-auto text-left font-body-sm text-[#444748] space-y-2.5">
                <div className="flex justify-between font-label-technical text-label-technical text-[#000000] uppercase border-b border-[#c4c7c7]/40 pb-2">
                  <span>{t.summary.program}</span>
                  <span className="font-bold">{programType}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.summary.location}</span>
                  <span className="font-medium text-[#000000]">{city}, RDC</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.summary.surface}</span>
                  <span className="font-medium text-[#000000]">{surface} {t.surfaceUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.summary.contact}</span>
                  <span className="font-medium text-[#000000]">{clientName}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="bg-[#000000] text-white px-8 py-3.5 font-label-technical text-label-technical uppercase tracking-widest hover:bg-[#765935] transition-colors cursor-pointer"
                >
                  {t.returnBtn}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Stepper Progress Bar */}
              <div className="grid grid-cols-3 border border-[#c4c7c7]/60 mb-8 font-label-technical text-label-technical uppercase tracking-wider text-center">
                <div
                  className={`py-2.5 px-2 transition-colors ${
                    step === 1 ? 'bg-[#000000] text-white' : 'bg-[#f4f3f1] text-[#444748]'
                  }`}
                >
                  {t.step1}
                </div>
                <div
                  className={`py-2.5 px-2 transition-colors border-l border-r border-[#c4c7c7]/60 ${
                    step === 2 ? 'bg-[#000000] text-white' : 'bg-[#f4f3f1] text-[#444748]'
                  }`}
                >
                  {t.step2}
                </div>
                <div
                  className={`py-2.5 px-2 transition-colors ${
                    step === 3 ? 'bg-[#000000] text-white' : 'bg-[#f4f3f1] text-[#444748]'
                  }`}
                >
                  {t.step3}
                </div>
              </div>

              {/* STEP 1: Programme & Ville */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 id="modal-estimator-title" className="font-headline-lg text-2xl text-[#000000]">
                      {t.programHeading}
                    </h3>
                    <p className="font-body-md text-[#444748] mt-1">
                      {t.programSub}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {programOptions.map((prog) => (
                      <div
                        key={prog.title}
                        onClick={() => setProgramType(prog.title)}
                        className={`p-5 border cursor-pointer transition-all ${
                          programType === prog.title
                            ? 'border-[#000000] bg-[#faf9f6] ring-1 ring-[#000000]'
                            : 'border-[#c4c7c7]/50 bg-[#f4f3f1]/30 hover:border-[#000000]'
                        }`}
                      >
                        <div className="font-headline-md text-base text-[#000000] font-medium">
                          {prog.title}
                        </div>
                        <div className="font-body-sm text-[#747878] mt-1">{prog.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#c4c7c7]/40 space-y-2">
                    <label className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block">
                      {t.locationLabel}
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#faf9f6] border border-[#000000] px-4 py-3 font-body-md text-[#000000] focus:ring-0 focus:border-[#765935]"
                    >
                      {t.cities.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-[#000000] text-white px-8 py-3.5 font-label-technical text-label-technical tracking-widest hover:bg-[#765935] transition-colors cursor-pointer"
                    >
                      <span>{t.nextStep}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Superficie & Missions */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-headline-lg text-2xl text-[#000000]">
                      {t.scopeHeading}
                    </h3>
                    <p className="font-body-md text-[#444748] mt-1">
                      {t.scopeSub}
                    </p>
                  </div>

                  {/* Surface Slider */}
                  <div className="p-6 bg-[#f4f3f1] border border-[#c4c7c7]/60 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878]">
                        {t.surfaceLabel}
                      </span>
                      <span className="font-display-lg text-2xl text-[#000000] tabular-nums font-bold">
                        {surface} {t.surfaceUnit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={150}
                      max={8000}
                      step={50}
                      value={surface}
                      onChange={(e) => setSurface(Number(e.target.value))}
                      className="w-full accent-[#000000] cursor-pointer"
                    />
                    <div className="flex justify-between font-label-technical text-[10px] text-[#747878] uppercase">
                      <span>150 {t.surfaceUnit}</span>
                      <span>2 000 {t.surfaceUnit}</span>
                      <span>8 000 {t.surfaceUnit}</span>
                    </div>
                  </div>

                  {/* Missions selector */}
                  <div className="space-y-3">
                    <span className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block">
                      {t.missionsLabel}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {t.missions.map((item) => {
                        const active = phases.includes(item);
                        return (
                          <div
                            key={item}
                            onClick={() => togglePhase(item)}
                            className={`p-3.5 border flex items-center gap-3 cursor-pointer transition-colors ${
                              active
                                ? 'bg-[#faf9f6] border-[#000000]'
                                : 'bg-[#f4f3f1]/30 border-[#c4c7c7]/50 hover:border-[#747878]'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 border flex items-center justify-center ${
                                active ? 'border-[#000000] bg-[#000000] text-white' : 'border-[#747878]'
                              }`}
                            >
                              {active && <Check className="w-3 h-3" />}
                            </div>
                            <span className="font-body-sm text-[#000000]">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-[#000000] px-6 py-3 font-label-technical text-label-technical uppercase tracking-widest hover:bg-[#efeeeb] transition-colors"
                    >
                      {t.prevStep}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 bg-[#000000] text-white px-8 py-3.5 font-label-technical text-label-technical uppercase tracking-widest hover:bg-[#765935] transition-colors cursor-pointer"
                    >
                      <span>{t.finishStep}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Coordonnées & Envoi */}
              {step === 3 && (
                <form onSubmit={handleFinish} className="space-y-6">
                  <div>
                    <h3 className="font-headline-lg text-2xl text-[#000000]">
                      {t.contactHeading}
                    </h3>
                    <p className="font-body-md text-[#444748] mt-1">
                      {t.contactSub}
                    </p>
                  </div>

                  {/* Summary preview */}
                  <div className="p-4 bg-[#f4f3f1] border border-[#c4c7c7]/60 flex flex-wrap justify-between items-center gap-2 font-label-technical text-label-technical uppercase">
                    <span>{programType}</span>
                    <span className="text-[#765935]">{city}</span>
                    <span>{surface} {t.surfaceUnit}</span>
                    <span className="text-[#747878]">{phases.length} {t.summary.phasesCount}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block mb-1">
                        {t.fields.nameLabel}
                      </label>
                      <input
                        required
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={t.fields.namePlaceholder}
                        className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] py-2 px-0 focus:ring-0 focus:border-[#765935] font-body-md"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block mb-1">
                          {t.fields.emailLabel}
                        </label>
                        <input
                          required
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder={t.fields.emailPlaceholder}
                          className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] py-2 px-0 focus:ring-0 focus:border-[#765935] font-body-md"
                        />
                      </div>
                      <div>
                        <label className="font-label-technical text-label-technical uppercase tracking-widest text-[#747878] block mb-1">
                          {t.fields.phoneLabel}
                        </label>
                        <input
                          required
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder={t.fields.phonePlaceholder}
                          className="w-full bg-[#faf9f6] border-0 border-b border-[#000000] py-2 px-0 focus:ring-0 focus:border-[#765935] font-body-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#faf9f6] border border-[#c4c7c7]/40 flex items-center gap-3 text-[#444748] font-body-sm">
                    <ShieldCheck className="w-5 h-5 text-[#765935] shrink-0" />
                    <span>{t.confidentialNote}</span>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="border border-[#000000] px-6 py-3 font-label-technical text-label-technical uppercase tracking-widest hover:bg-[#efeeeb] transition-colors"
                    >
                      {t.prevStep}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#000000] text-white px-8 py-3.5 font-label-technical text-label-technical uppercase tracking-widest hover:bg-[#765935] transition-colors cursor-pointer"
                    >
                      <span>{t.submitBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
