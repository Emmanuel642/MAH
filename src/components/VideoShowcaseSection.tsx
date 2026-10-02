import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Upload, CheckCircle2 } from 'lucide-react';
import videoPosterChantier from '../assets/images/video_poster_chantier_1790686955515.jpg';

interface VideoShowcaseSectionProps {
  language: Language;
  onOpenEstimator?: () => void;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].video;
  const [videoSrc, setVideoSrc] = useState<string>('/videos/chantier_villa_lubumbashi.mp4');
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if a custom video blob was previously stored in sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('mha_custom_video_uploaded');
      if (stored) {
        setIsCustomUpload(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Immediately play the selected file locally via object URL
    const localUrl = URL.createObjectURL(file);
    setVideoSrc(localUrl);
    setIsCustomUpload(true);
    setUploadStatus(language === 'FR' ? 'Vidéo chargée avec succès' : 'Video loaded successfully');

    try {
      sessionStorage.setItem('mha_custom_video_uploaded', 'true');
    } catch {
      // Ignore
    }

    // Also attempt background sync to server dev endpoint
    try {
      await fetch('/api/upload-video', {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'video/mp4' },
        body: file,
      });
    } catch {
      // Local preview continues regardless
    }

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }

    setTimeout(() => {
      setUploadStatus(null);
    }, 4000);
  };

  return (
    <section
      id="video-chantier"
      className="bg-[#0d0e0d] text-[#faf9f6] py-16 md:py-24 border-b border-[#232423] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* En-tête Éditorial */}
        <div className="max-w-3xl space-y-3 mb-8 md:mb-12">
          <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#c7a97b] font-bold block">
            {t.tag}
          </span>
          <h2 className="font-display-lg text-[26px] sm:text-[34px] md:text-[40px] text-white tracking-tight leading-[1.15] text-balance">
            {t.title}
          </h2>
          <p className="font-body-md text-[#9ea0a0] leading-relaxed max-w-2xl font-normal">
            {language === 'FR'
              ? 'La visite brute du chantier : de la volumétrie architecturale aux finitions en cours d’exécution sur le terrain à Lubumbashi.'
              : 'Raw on-site walkthrough: from architectural massing to turnkey execution details on site in Lubumbashi.'}
          </p>
        </div>

        {/* Lecteur Vidéo Brut au Format Vertical 9:16 Smartphone */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[9/16] bg-[#050505] border border-[#2a2b2a] shadow-2xl overflow-hidden group">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={videoPosterChantier}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              aria-label={t.title}
            >
              <source src="/videos/chantier_villa_lubumbashi.mp4" type="video/mp4" />
              {language === 'FR'
                ? 'Votre navigateur ne supporte pas la lecture de vidéos.'
                : 'Your browser does not support the video tag.'}
            </video>
          </div>

          {/* Option discrète pour charger le fichier source original direct */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,.mp4,.mov,.webm"
              onChange={handleFileChange}
              className="hidden"
              id="raw-video-input"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-[11px] font-label-technical uppercase tracking-wider text-[#747878] hover:text-[#c7a97b] transition-colors cursor-pointer py-1 px-3 border border-[#232423] hover:border-[#c7a97b]/50 bg-black/40"
            >
              <Upload className="w-3 h-3" />
              <span>
                {language === 'FR'
                  ? 'Charger un autre fichier vidéo (.mp4)'
                  : 'Load another video file (.mp4)'}
              </span>
            </button>

            {uploadStatus && (
              <div className="flex items-center gap-1.5 text-xs text-[#c7a97b] font-label-technical tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{uploadStatus}</span>
              </div>
            )}
          </div>

          {/* Légende Architecturale Inférieure */}
          <div className="w-full max-w-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-6 mt-4 text-[10px] sm:text-[11px] font-label-technical tracking-wider text-[#747878] uppercase border-t border-[#232423]">
            <span>{t.captionProject}</span>
            <span className="text-[#c7a97b]">{t.captionMha}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
