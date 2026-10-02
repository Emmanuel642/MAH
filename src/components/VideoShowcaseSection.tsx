import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import videoPosterChantier from '../assets/images/video_poster_chantier_1790686955515.jpg';
import droneVillaKatanga from '../assets/images/drone_villa_katanga_1790686546337.jpg';
import chantierVillaReel from '../assets/images/chantier_villa_reel_1790686529029.jpg';
import parkingReelChantier from '../assets/images/parking_reel_chantier_1790686512603.jpg';

interface VideoShowcaseSectionProps {
  language: Language;
  onOpenEstimator?: () => void;
}

const SEQUENCE_IMAGES = [
  videoPosterChantier,
  droneVillaKatanga,
  chantierVillaReel,
  parkingReelChantier,
];

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].video;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const SEQUENCE_DURATION = 6; // 6 seconds per sequence
  const TOTAL_DURATION = t.sequences.length * SEQUENCE_DURATION; // 24s total loop

  // Cinematic timer loop when playback is active
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.1;
          if (next >= TOTAL_DURATION) {
            return 0;
          }
          const nextIndex = Math.floor(next / SEQUENCE_DURATION);
          if (nextIndex !== activeSequenceIndex && nextIndex < t.sequences.length) {
            setActiveSequenceIndex(nextIndex);
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSequenceIndex, TOTAL_DURATION, t.sequences.length]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleSelectSequence = (index: number) => {
    setActiveSequenceIndex(index);
    setProgress(index * SEQUENCE_DURATION);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const activeSequence = t.sequences[activeSequenceIndex] || t.sequences[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="video-chantier"
      className="bg-[#0d0e0d] text-[#faf9f6] py-16 md:py-24 border-b border-[#232423] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* En-tête Éditorial Harmonisé avec les sections adjacentes */}
        <div className="max-w-3xl space-y-3 mb-8 md:mb-10">
          <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#c7a97b] font-bold block">
            {t.tag}
          </span>
          <h2 className="font-display-lg text-[26px] sm:text-[34px] md:text-[40px] text-white tracking-tight leading-[1.15] text-balance">
            {t.title}
          </h2>
          <p className="font-body-md text-[#9ea0a0] leading-relaxed max-w-2xl font-normal">
            {t.desc}
          </p>
        </div>

        {/* Cadre Cinématographique Panoramique — Hauteur Maîtrisée */}
        <div className="space-y-3">
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/10] lg:aspect-[2.35/1] max-h-[520px] bg-[#050505] border border-[#262726] overflow-hidden group shadow-xl"
          >
            {/* Séquences d'images avec transition fluide */}
            {t.sequences.map((seq, idx) => (
              <div
                key={seq.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeSequenceIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={SEQUENCE_IMAGES[idx] || SEQUENCE_IMAGES[0]}
                  alt={seq.title}
                  className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                    isPlaying && activeSequenceIndex === idx ? 'scale-105' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}

            {/* Voile sombre cinématographique subtil pour le contraste */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/15 to-black/30 pointer-events-none" />

            {/* Bouton de lecture central sobre & mesuré */}
            {!isPlaying && (
              <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full border border-white/40 bg-black/45 backdrop-blur-md text-white hover:border-[#c7a97b] hover:bg-[#c7a97b] hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xl group/play hover:scale-105"
                  aria-label={t.playAria}
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5 transition-transform group-hover/play:scale-110" />
                </button>
              </div>
            )}

            {/* Barre de contrôles inférieure discrète et élégante */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-3 sm:px-6 sm:py-4 flex flex-col justify-end space-y-2.5">
              {/* Titre de la séquence courante & Timecode */}
              <div className="flex items-center justify-between text-xs font-label-technical tracking-wider text-white/90">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[#c7a97b] font-bold">
                    0{activeSequenceIndex + 1} &mdash; 0{t.sequences.length}
                  </span>
                  <span className="text-white/40">&bull;</span>
                  <span className="text-white uppercase font-medium">
                    {activeSequence.title}
                  </span>
                </div>
                <div className="tabular-nums font-mono text-[11px] text-white/70">
                  {formatTime(progress)} / {formatTime(TOTAL_DURATION)}
                </div>
              </div>

              {/* Ligne de progression fine (4 repères architecturaux) */}
              <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                {t.sequences.map((seq, idx) => {
                  const isActive = activeSequenceIndex === idx;
                  const isPast = activeSequenceIndex > idx;
                  return (
                    <button
                      key={seq.id}
                      type="button"
                      onClick={() => handleSelectSequence(idx)}
                      className="group/track relative h-[2px] bg-white/20 hover:bg-white/40 transition-colors cursor-pointer overflow-hidden"
                      aria-label={seq.title}
                    >
                      <span
                        className={`absolute inset-y-0 left-0 bg-[#c7a97b] transition-all duration-200 ${
                          isPast ? 'w-full' : isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Boutons discrets Play/Pause, Mute et Plein écran */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="text-white/80 hover:text-white transition-colors cursor-pointer p-0.5"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-white/80 hover:text-white transition-colors cursor-pointer p-0.5"
                    aria-label={isMuted ? t.unmuteAria : t.muteAria}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/50" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <span className="text-[10px] font-label-technical tracking-widest uppercase text-white/40 hidden sm:inline">
                    {isPlaying ? t.activeStatus : t.pausedStatus}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer p-0.5"
                  aria-label={t.fullscreenAria}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Légende Architecturale Inférieure */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2 text-[10px] sm:text-[11px] font-label-technical tracking-wider text-[#747878] uppercase border-t border-[#232423]">
            <span>
              {t.captionProject}
            </span>
            <span className="text-[#c7a97b]">
              {t.captionMha}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

