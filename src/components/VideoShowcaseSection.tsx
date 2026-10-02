import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, MapPin, Eye, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import videoPosterChantier from '../assets/images/video_poster_chantier_1790686955515.jpg';
import droneVillaKatanga from '../assets/images/drone_villa_katanga_1790686546337.jpg';
import chantierVillaReel from '../assets/images/chantier_villa_reel_1790686529029.jpg';
import parkingReelChantier from '../assets/images/parking_reel_chantier_1790686512603.jpg';

interface VideoShowcaseSectionProps {
  language: Language;
  onOpenEstimator?: () => void;
}

interface Chapter {
  id: string;
  timeSeconds: number;
  timeDisplay: string;
  titleFR: string;
  titleEN: string;
  descFR: string;
  descEN: string;
  poster: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'facade',
    timeSeconds: 0,
    timeDisplay: '00:00',
    titleFR: 'Porche & Façade Principale',
    titleEN: 'Entrance Porch & Main Facade',
    descFR: 'Marches monumentales suspendues, colonnes jumelées et enduit minéral blanc cassé',
    descEN: 'Monumental suspended steps, twin columns, and mineral stucco facade',
    poster: videoPosterChantier,
  },
  {
    id: 'toiture',
    timeSeconds: 10,
    timeDisplay: '00:10',
    titleFR: 'Toiture & Spots Encastrés',
    titleEN: 'Hipped Roof & Recessed Spots',
    descFR: 'Charpente haute pente en tuiles métalliques noires thermo-laquées et éclairage sous-face',
    descEN: 'High-pitch dark metal tile roof with integrated soffit downlights',
    poster: droneVillaKatanga,
  },
  {
    id: 'cloture',
    timeSeconds: 22,
    timeDisplay: '00:22',
    titleFR: 'Allée & Clôture Électrifiée',
    titleEN: 'Side Alley & Security Fence',
    descFR: 'Mur d’enceinte chaîné, appliques murales LED et dispositif d’électrification périmétrique',
    descEN: 'Reinforced boundary wall with LED sconces and perimeter electric fence',
    poster: chantierVillaReel,
  },
  {
    id: 'portail',
    timeSeconds: 32,
    timeDisplay: '00:32',
    titleFR: 'Portail Motorisé & Concession',
    titleEN: 'Motorized Gate & Compound',
    descFR: 'Portique d’entrée grande largeur avec portail coulissant en acier noir et cour en viabilisation',
    descEN: 'Wide entry portal with heavy black steel sliding gate and serviced compound',
    poster: parkingReelChantier,
  },
];

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({
  language,
  onOpenEstimator,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulated video playback timer if video fails or when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= duration) {
            setIsPlaying(false);
            return 0;
          }
          // Update active chapter based on time
          const chapterIdx = CHAPTERS.findIndex((c, i) => {
            const nextTime = CHAPTERS[i + 1]?.timeSeconds ?? duration;
            return next >= c.timeSeconds && next < nextTime;
          });
          if (chapterIdx !== -1) {
            setActiveChapterIndex(chapterIdx);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {
          // If browser policy blocks auto-play with sound
        });
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleSelectChapter = (index: number) => {
    setActiveChapterIndex(index);
    const targetSeconds = CHAPTERS[index].timeSeconds;
    setCurrentTime(targetSeconds);
    if (videoRef.current) {
      videoRef.current.currentTime = targetSeconds;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
    const chapterIdx = CHAPTERS.findIndex((c, i) => {
      const nextTime = CHAPTERS[i + 1]?.timeSeconds ?? duration;
      return val >= c.timeSeconds && val < nextTime;
    });
    if (chapterIdx !== -1) {
      setActiveChapterIndex(chapterIdx);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section
      id="video-chantier"
      className="bg-[#111211] text-[#faf9f6] py-24 md:py-32 border-b border-[#2d2e2d] relative overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12 border-b border-[#2d2e2d]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#232423] border border-[#383a38] text-[#c7a97b] font-label-technical text-[10px] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#c7a97b] animate-pulse" />
              {language === 'FR' ? 'VIDÉO CHANTIER & VISITE IMMERSIVE' : 'ON-SITE VIDEO & IMMERSIVE TOUR'}
            </div>
            <h2 className="font-display-lg text-[32px] md:text-[46px] text-white tracking-tight leading-tight">
              {language === 'FR'
                ? 'La réalité de nos chantiers en vidéo.'
                : 'The reality of our construction sites on video.'}
            </h2>
            <p className="font-body-lg text-[#a6a8a8] max-w-2xl leading-relaxed">
              {language === 'FR'
                ? 'Visite filmée sur le terrain d’une villa de prestige en cours de finition à Lubumbashi : de l’élévation à la toiture multi-pans, en passant par le portail motorisé et la clôture sécurisée.'
                : 'On-site walkthrough video of a prestigious villa nearing completion in Lubumbashi: from structural elevations to the high-pitch hipped roof, motorized gate, and perimeter security.'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-label-technical tracking-wider text-[#a6a8a8]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c7a97b]" />
              <span>LUBUMBASHI, RDC</span>
            </div>
            <span className="text-[#383a38]">|</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c7a97b]" />
              <span>SUPERVISION MHA</span>
            </div>
          </div>
        </div>

        {/* Video Player & Chapters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
          {/* Main Cinema Video Frame (Cols 8) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div
              ref={containerRef}
              className="relative w-full aspect-video bg-[#000000] border border-[#2d2e2d] overflow-hidden group shadow-2xl"
            >
              {/* Fallback image / video poster based on active chapter or video */}
              <img
                src={activeChapter.poster}
                alt="Vidéo de suivi de chantier MHA à Lubumbashi"
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  isPlaying ? 'opacity-90 scale-[1.02]' : 'opacity-85'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Video Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

              {/* Status Pill on Top Left */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 font-label-technical text-[10px] tracking-widest uppercase text-white">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/40'}`} />
                <span>{isPlaying ? 'LECTURE EN COURS' : 'PAUSE · SURVOL DU CHANTIER'}</span>
              </div>

              {/* Location Tag Top Right */}
              <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 font-label-technical text-[10px] tracking-widest text-white/80">
                <span>4K ULTRA HD · SONORE STEREO</span>
              </div>

              {/* Big Center Play Button when paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/95 text-black hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-2xl z-20 cursor-pointer"
                  aria-label="Lancer la vidéo"
                >
                  <Play className="w-8 h-8 fill-black ml-1" />
                </button>
              )}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 bg-gradient-to-t from-black/95 to-transparent">
                {/* Active Chapter Label */}
                <div className="flex items-center justify-between text-xs text-white/80 pb-2 font-label-technical tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c7a97b] font-bold">
                      {language === 'FR' ? activeChapter.titleFR : activeChapter.titleEN}
                    </span>
                    <span className="text-white/40 hidden sm:inline">—</span>
                    <span className="text-white/60 hidden sm:inline text-[11px]">
                      {language === 'FR' ? activeChapter.descFR : activeChapter.descEN}
                    </span>
                  </div>
                  <div className="tabular-nums font-mono text-[11px] text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Progress / Seek Slider */}
                <div className="relative py-2">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/20 rounded-none appearance-none cursor-pointer accent-[#c7a97b] focus:outline-none"
                  />
                  {/* Chapter tick marks on the progress bar */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-1">
                    {CHAPTERS.map((c) => (
                      <span
                        key={c.id}
                        className="w-1.5 h-1.5 bg-white/50 rounded-full"
                        style={{ left: `${(c.timeSeconds / duration) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions: Play/Pause, Mute, Fullscreen */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-[#c7a97b] transition-colors p-1"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-[#c7a97b] transition-colors p-1"
                      aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5 text-white/60" /> : <Volume2 className="w-5 h-5" />}
                    </button>

                    <span className="font-label-technical text-[10px] tracking-widest uppercase text-white/50 hidden sm:inline">
                      {isMuted ? 'Audio désactivé' : 'Audio actif'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-[#c7a97b] transition-colors p-1"
                      aria-label="Plein écran"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Meta Info Footer */}
            <div className="p-4 bg-[#181918] border border-[#2d2e2d] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-label-technical uppercase tracking-widest text-[#c7a97b] font-bold">
                  {language === 'FR' ? 'CHANTIER PILOTE :' : 'PILOT SITE :'}
                </span>
                <span className="text-[#e2e4e4]">
                  {language === 'FR'
                    ? 'Villa Contemporaine & Enceinte Sécurisée (Commune Annexe, Lubumbashi)'
                    : 'Contemporary Villa & Secure Compound (Commune Annexe, Lubumbashi)'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#a6a8a8] font-label-technical text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c7a97b]" />
                <span>{language === 'FR' ? 'Vidéo hebdomadaire transmise au client' : 'Weekly site videos sent to clients'}</span>
              </div>
            </div>
          </div>

          {/* Chapter Selector & Technical Details (Cols 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#2d2e2d]">
                <span className="font-label-technical text-[11px] uppercase tracking-widest text-[#c7a97b] font-bold">
                  {language === 'FR' ? 'SÉQUENCES DE LA VISITE' : 'TOUR SEQUENCES'}
                </span>
                <span className="font-label-technical text-[10px] text-white/50">
                  {CHAPTERS.length} {language === 'FR' ? 'CHAPITRES' : 'CHAPTERS'}
                </span>
              </div>

              {/* Chapters List */}
              <div className="space-y-2">
                {CHAPTERS.map((chap, idx) => {
                  const isCurrent = activeChapterIndex === idx;
                  return (
                    <button
                      key={chap.id}
                      onClick={() => handleSelectChapter(idx)}
                      className={`w-full text-left p-3.5 border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                        isCurrent
                          ? 'bg-[#232423] border-[#c7a97b] text-white'
                          : 'bg-[#181918] border-[#2d2e2d] text-white/70 hover:border-white/30 hover:bg-[#1e1f1e]'
                      }`}
                    >
                      <div className="relative w-16 h-12 flex-shrink-0 bg-black overflow-hidden border border-white/10">
                        <img
                          src={chap.poster}
                          alt={chap.titleFR}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/80 px-1 py-0.2 text-[9px] font-mono text-white/90">
                          {chap.timeDisplay}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-headline-sm text-[13px] font-medium text-white truncate">
                            {language === 'FR' ? chap.titleFR : chap.titleEN}
                          </h4>
                          {isCurrent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c7a97b]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#a6a8a8] line-clamp-2 leading-relaxed font-body-sm">
                          {language === 'FR' ? chap.descFR : chap.descEN}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Client Transparency Card */}
            <div className="p-5 bg-[#181918] border border-[#2d2e2d] space-y-3">
              <div className="flex items-center gap-2 text-[#c7a97b]">
                <Eye className="w-4 h-4" />
                <h5 className="font-label-technical text-[11px] uppercase tracking-widest font-bold">
                  {language === 'FR' ? 'TRANSPARENCE TOTALE DU CHANTIER' : 'FULL SITE TRANSPARENCY'}
                </h5>
              </div>
              <p className="font-body-sm text-[12px] text-[#a6a8a8] leading-relaxed">
                {language === 'FR'
                  ? 'Que vous résidiez à Lubumbashi, Kinshasa, en province ou dans la diaspora, nos ingénieurs produisent des reportages vidéo réguliers pour vous permettre de vivre l’avancée de votre bâtisse pas à pas.'
                  : 'Whether you live in Lubumbashi, Kinshasa, or abroad in the diaspora, our engineers provide regular drone and walkthrough videos so you can track your project progress seamlessly.'}
              </p>
              {onOpenEstimator && (
                <button
                  onClick={onOpenEstimator}
                  className="w-full mt-2 py-3 px-4 bg-white text-black font-label-technical text-[10px] uppercase tracking-widest font-bold hover:bg-[#c7a97b] hover:text-white transition-colors cursor-pointer text-center"
                >
                  {language === 'FR' ? 'Lancer une étude de projet' : 'Start a project study'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
