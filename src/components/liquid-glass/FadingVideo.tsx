import React, { useRef, useEffect, useState, useCallback } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
  seamlessLoop?: boolean;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({ src, className, style, seamlessLoop = false }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isArray = Array.isArray(src);
  const currentSrc = isArray ? src[currentIndex] : src;

  const isFadingRef = useRef(false);

  // Fade helper using requestAnimationFrame
  const fade = useCallback((targetOpacity: number, durationMs: number, onComplete?: () => void) => {
    const video = videoRef.current;
    if (!video) return;

    isFadingRef.current = true;
    const startOpacity = parseFloat(video.style.opacity || '0');
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const current = startOpacity + (targetOpacity - startOpacity) * progress;
      if (video) video.style.opacity = current.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isFadingRef.current = false;
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(step);
  }, []);

  const handleLoadedData = () => {
    fade(1, 500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || isFadingRef.current) return;

    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.55 && video.duration > 0.6) {
      fade(0, 550);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isArray && src.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % src.length);
    } else {
      video.currentTime = 0;
      video.play().catch(() => {});
      fade(1, 500);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.style.opacity = '0';
      video.load();
      video.play().catch(() => {});
    }
  }, [currentSrc]);

  return (
    <video
      ref={videoRef}
      src={currentSrc}
      className={className}
      style={{
        opacity: 0,
        ...style,
      }}
      autoPlay
      loop={seamlessLoop}
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={seamlessLoop ? undefined : handleTimeUpdate}
      onEnded={seamlessLoop ? undefined : handleEnded}
    />
  );
};
