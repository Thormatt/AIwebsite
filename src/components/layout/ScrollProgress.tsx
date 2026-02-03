'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const container = containerRef.current;
    if (!progress || !container) return;

    // Animate progress bar width based on scroll
    const progressTween = gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Show/hide based on scroll position
    const visibilityTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: '100px top',
      onEnter: () => {
        gsap.to(container, { opacity: 1, duration: 0.3 });
      },
      onLeaveBack: () => {
        gsap.to(container, { opacity: 0, duration: 0.3 });
      },
    });

    return () => {
      visibilityTrigger.kill();
      progressTween.scrollTrigger?.kill();
      progressTween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-50 opacity-0"
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-border" />

      {/* Progress fill */}
      <div
        ref={progressRef}
        className="absolute inset-0 bg-accent origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Glow effect */}
      <div
        className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-accent to-transparent opacity-50"
        style={{ transform: 'translateX(100%)' }}
      />
    </div>
  );
}
