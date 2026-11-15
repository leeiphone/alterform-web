import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, Volume2 } from 'lucide-react';

interface LiquidGlassFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiquidGlassFilmModal: React.FC<LiquidGlassFilmModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Auto-play when opened
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {
            // Browsers might require user interaction for audio
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // Pause and reset when closed
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/95 backdrop-blur-3xl select-none"
          onClick={onClose}
        >
          {/* Main Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="relative w-full max-w-5xl rounded-[1.75rem] bg-[#0c0c0e]/95 border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-sky-400">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm sm:text-base text-white tracking-wide">
                      ALTERFORM BRAND FILM : THE ALTERATION
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/15">
                      1080p FHD
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white/50 block">
                    ORIGINAL CUT // 01:18 // STEREO SOUND
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/assets/videos/ALTERFORM_COMBINED_v4.mp4"
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Footer / Caption */}
            <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/70 font-light">
              <p className="max-w-2xl leading-relaxed">
                <span className="font-medium text-white">"THE WORLD WAS NEVER FIXED."</span> — ALTERFORM의 5대 조형 축(Structure, Distortion, Fluid, Growth, Void)과 세라믹 물성 실험의 전이를 담아낸 시네마틱 오리지널 브랜드 필름.
              </p>
              <div className="flex items-center gap-2 text-white/40 font-mono text-[11px] flex-shrink-0">
                <Volume2 className="w-3.5 h-3.5 text-white/60" />
                <span>SOUND ON RECOMMENDED</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
