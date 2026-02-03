'use client';

import { gsap } from './gsap';

// Animation configurations for reuse across components

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  duration: 0.8,
  ease: 'power3.out',
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  duration: 0.6,
  ease: 'power2.out',
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  duration: 0.6,
  ease: 'power2.out',
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: 'power3.out',
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: 'power3.out',
};

// Stagger configuration for child elements
export const staggerConfig = {
  each: 0.1,
  from: 'start',
  ease: 'power2.out',
};

// Counter animation for stats
export const animateCounter = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2,
  suffix: string = ''
) => {
  const obj = { value: 0 };

  gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + suffix;
    },
  });
};

// Text reveal animation (word by word)
export const textReveal = (element: HTMLElement, delay: number = 0) => {
  const text = element.textContent || '';
  const words = text.split(' ');

  element.innerHTML = words
    .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
    .join(' ');

  const spans = element.querySelectorAll('span > span');

  gsap.fromTo(
    spans,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      delay,
      ease: 'power3.out',
    }
  );
};

// Parallax effect configuration
export const createParallax = (
  element: HTMLElement,
  speed: number = 0.5
) => {
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
};

// Scroll-triggered reveal animation
export const scrollReveal = (
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element>,
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    scale?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    start?: string;
  } = {}
) => {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    scale = 1,
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    start = 'top 80%',
  } = options;

  gsap.fromTo(
    elements,
    { y, x, opacity, scale },
    {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements instanceof NodeList ? elements[0] : elements,
        start,
      },
    }
  );
};

// Line draw animation for SVG paths
export const drawLine = (element: SVGPathElement, duration: number = 1.5) => {
  const length = element.getTotalLength();

  gsap.set(element, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  gsap.to(element, {
    strokeDashoffset: 0,
    duration,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    },
  });
};
