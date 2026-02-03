'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type GSAPCallback = (context: gsap.Context) => void;

/**
 * Custom hook for GSAP animations with proper cleanup
 */
export function useGSAP(
  callback: GSAPCallback,
  deps: React.DependencyList = []
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Create GSAP context for proper cleanup
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    // Cleanup on unmount
    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return contextRef;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollTrigger(
  callback: (trigger: typeof ScrollTrigger) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    callback(ScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Hook for animating elements when they enter the viewport
 */
export function useInViewAnimation<T extends HTMLElement>(
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    scale?: number;
    duration?: number;
    delay?: number;
    start?: string;
    once?: boolean;
  } = {}
) {
  const ref = useRef<T>(null);

  const {
    y = 40,
    x = 0,
    opacity = 0,
    scale = 1,
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
    once = true,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.set(element, { y, x, opacity, scale });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once,
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [y, x, opacity, scale, duration, delay, start, once]);

  return ref;
}

/**
 * Hook for counter animations
 */
export function useCounter(
  endValue: number,
  duration: number = 2,
  suffix: string = ''
) {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (!ref.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value) + suffix;
        }
      },
    });
  }, [endValue, duration, suffix]);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: animate,
    });

    return () => {
      trigger.kill();
    };
  }, [animate]);

  return ref;
}

/**
 * Hook for parallax effects
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [speed]);

  return ref;
}
