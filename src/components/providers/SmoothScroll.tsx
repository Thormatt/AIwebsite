'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Skip Lenis on touch-only devices (iOS Safari pauses rAF during
    // momentum scroll, which freezes the Lenis → ScrollTrigger chain)
    const isTouchOnly = window.matchMedia(
      '(hover: none) and (pointer: coarse)'
    ).matches;

    if (isTouchOnly) {
      // Native scroll works perfectly with ScrollTrigger on mobile
      const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 500);
      return () => clearTimeout(refreshTimeout);
    }

    // Initialize Lenis smooth scroll (desktop only)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);

    // Disable GSAP's default lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Recalculate ScrollTrigger positions after layout settles
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 500);

    // Cleanup
    return () => {
      clearTimeout(refreshTimeout);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(onTick);
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}

// Hook for scrolling to elements
export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      lock?: boolean;
      force?: boolean;
    }
  ) => {
    if (!lenis) {
      // Fallback to native scroll if Lenis isn't available
      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      return;
    }

    lenis.scrollTo(target, options);
  };

  return scrollTo;
}
