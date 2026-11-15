import React, { useRef, useEffect, useState } from 'react';

interface ScrollScrubVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Whether to enable interactive scroll scrubbing (play forward on scroll down, reverse on scroll up) */
  enableScrollScrub?: boolean;
}

export const ScrollScrubVideo: React.FC<ScrollScrubVideoProps> = ({
  src,
  className,
  style,
  enableScrollScrub = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const targetTimeRef = useRef<number>(0);
  const isScrubbingRef = useRef<boolean>(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const handleLoadedData = () => {
      setIsReady(true);
      // Start ambient forward playback at the very top
      if (window.scrollY < 20) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);

    const onScroll = () => {
      if (!enableScrollScrub || !video || !video.duration) return;

      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.1;

      // If user is within hero viewing range
      if (currentScrollY <= heroHeight * 1.2) {
        isScrubbingRef.current = true;
        if (!video.paused) {
          video.pause();
        }

        const progress = Math.min(Math.max(currentScrollY / heroHeight, 0), 1);
        targetTimeRef.current = progress * (video.duration - 0.1);

        // Reset idle timer: if user stops scrolling at the top, resume ambient play
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          isScrubbingRef.current = false;
          if (window.scrollY < 20 && video) {
            video.play().catch(() => {});
          }
        }, 1200);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Smooth seek loop using requestAnimationFrame with lerp interpolation
    const updateScrub = () => {
      if (isScrubbingRef.current && video && video.duration && !video.seeking) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.03) {
          // Responsive lerp step
          video.currentTime += diff * 0.28;
        }
      }
      rafId = requestAnimationFrame(updateScrub);
    };

    rafId = requestAnimationFrame(updateScrub);

    // Loop handler when ambient playing
    const handleEnded = () => {
      if (!isScrubbingRef.current && video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafId);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [enableScrollScrub, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      muted
      playsInline
      preload="auto"
    />
  );
};
