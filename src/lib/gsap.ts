'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Premium easing functions
const customEases = {
  // Dramatic entrance
  dramatic: 'power4.out',
  // Smooth elastic
  elastic: 'elastic.out(1, 0.5)',
  // Snappy
  snap: 'back.out(1.7)',
  // Buttery smooth
  smooth: 'power2.inOut',
  // Expo for reveals
  reveal: 'expo.out',
};

// Smooth defaults for premium feel
gsap.defaults({
  ease: customEases.dramatic,
  duration: 1,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  start: 'top 80%',
  end: 'bottom 20%',
});

// Utility: Split text into spans for character animation
export function splitTextIntoChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  element.setAttribute('aria-label', text);

  const chars: HTMLSpanElement[] = [];

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.setAttribute('aria-hidden', 'true');
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}

// Utility: Split text into words
export function splitTextIntoWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  element.setAttribute('aria-label', text);

  const words: HTMLSpanElement[] = [];

  text.split(' ').forEach((word, i, arr) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.setAttribute('aria-hidden', 'true');
    element.appendChild(span);
    words.push(span);

    // Add space between words
    if (i < arr.length - 1) {
      const space = document.createElement('span');
      space.innerHTML = '&nbsp;';
      space.style.display = 'inline-block';
      element.appendChild(space);
    }
  });

  return words;
}

// Preset animations
export const animations = {
  // Fade up with slight scale
  fadeUp: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, delay, ease: customEases.dramatic }
    );
  },

  // Clip path reveal from left
  revealFromLeft: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.5, delay, ease: customEases.reveal }
    );
  },

  // Clip path reveal from bottom
  revealFromBottom: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, delay, ease: customEases.dramatic }
    );
  },

  // Character stagger reveal
  charReveal: (chars: HTMLSpanElement[], delay = 0) => {
    gsap.set(chars, { opacity: 0, y: 100, rotateX: -90 });
    return gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.02,
      delay,
      ease: customEases.dramatic,
    });
  },

  // Word stagger reveal
  wordReveal: (words: HTMLSpanElement[], delay = 0) => {
    gsap.set(words, { opacity: 0, y: 40 });
    return gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      delay,
      ease: customEases.dramatic,
    });
  },

  // Counter animation
  countUp: (element: HTMLElement, target: number, duration = 2) => {
    const obj = { value: 0 };
    return gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toString();
      },
    });
  },

  // Magnetic effect for elements
  magnetic: (element: HTMLElement, strength = 0.3) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return {
      move: (mouseX: number, mouseY: number) => {
        const deltaX = (mouseX - centerX) * strength;
        const deltaY = (mouseY - centerY) * strength;
        gsap.to(element, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
      reset: () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: customEases.elastic,
        });
      },
    };
  },

  // Parallax on scroll
  parallax: (element: gsap.TweenTarget, speed = 0.5) => {
    return gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  },

  // Scale on scroll
  scaleOnScroll: (element: gsap.TweenTarget, from = 0.8, to = 1) => {
    return gsap.fromTo(
      element,
      { scale: from },
      {
        scale: to,
        ease: 'none',
        scrollTrigger: {
          trigger: element as gsap.DOMTarget,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      }
    );
  },
};

export { gsap, ScrollTrigger, customEases };
