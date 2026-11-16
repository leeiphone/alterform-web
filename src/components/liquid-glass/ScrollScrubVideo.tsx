import React, { useRef, useEffect, useState, useCallback } from 'react';

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

  // Scroll tracking refs
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekRef = useRef<number | null>(null);

  // Frame seek function with hardware queueing
  const seekTo = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    // Clamp between 0 and (duration - 0.05s) to avoid EOF black frames
    const clamped = Math.max(0, Math.min(time, video.duration - 0.05));

    // Avoid redundant micro-seeks smaller than ~1 frame (0.015s)
    if (Math.abs(video.currentTime - clamped) < 0.015) return;

    if (isSeekingRef.current || video.seeking) {
      // Hardware decoder is busy; queue the latest timestamp
      pendingSeekRef.current = clamped;
      return;
    }

    isSeekingRef.current = true;
    try {
      if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
        (video as any).fastSeek(clamped);
      } else {
        video.currentTime = clamped;
      }
    } catch {
      video.currentTime = clamped;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    // When video metadata and first frame are ready
    const handleLoadedData = () => {
      setIsReady(true);
      video.pause();
      onScroll();
    };

    // When browser finishes decoding sought frame, immediately process queued seek
    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingSeekRef.current !== null) {
        const nextTime = pendingSeekRef.current;
        pendingSeekRef.current = null;
        seekTo(nextTime);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);

    // Initial check in case video is already cached/loaded
    if (video.readyState >= 2) {
      setIsReady(true);
      video.pause();
    }

    // Scroll listener: maps scrollY within the Hero view range (1.1x viewport) to [0, 1]
    const onScroll = () => {
      if (!enableScrollScrub || !video) return;

      const currentScrollY = window.scrollY;
      const heroHeight = Math.max(window.innerHeight * 1.15, 750);

      const progress = Math.min(Math.max(currentScrollY / heroHeight, 0), 1);
      targetProgressRef.current = progress;

      // Ensure video is paused so user has 100% manual scrub control
      if (!video.paused) {
        video.pause();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Smooth animation loop: 60fps responsive spring/lerp tracking
    const updateScrub = () => {
      if (enableScrollScrub && video && video.duration) {
        const diff = targetProgressRef.current - currentProgressRef.current;

        // If there is a noticeable difference, smoothly glide towards target
        if (Math.abs(diff) > 0.0008) {
          // Responsive lerp (40% step per frame = reaches ~95% in 80ms)
          currentProgressRef.current += diff * 0.4;
          const targetTime = currentProgressRef.current * (video.duration - 0.05);
          seekTo(targetTime);
        } else if (targetProgressRef.current === 0 && currentProgressRef.current !== 0) {
          currentProgressRef.current = 0;
          seekTo(0);
        }
      }
      rafId = requestAnimationFrame(updateScrub);
    };

    rafId = requestAnimationFrame(updateScrub);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      cancelAnimationFrame(rafId);
    };
  }, [enableScrollScrub, seekTo]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        ...style,
      }}
      muted
      playsInline
      preload="auto"
    />
  );
};
