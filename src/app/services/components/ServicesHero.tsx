'use client';

import { useRef } from 'react';
import { GradientText } from '@/components/ui/GradientText';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.services-hero-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        '.services-hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(
        '.services-hero-desc',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ paddingTop: '12rem', paddingBottom: '10rem' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="container relative text-center" style={{ maxWidth: '896px', margin: '0 auto' }}>
        <p className="services-hero-eyebrow text-text-accent text-sm md:text-base font-medium tracking-wide uppercase" style={{ marginBottom: '1.5rem' }}>
          Services
        </p>

        <h1 className="services-hero-title text-display-lg text-text-primary" style={{ marginBottom: '2rem' }}>
          Strategy That <GradientText>Ships</GradientText>
        </h1>

        <p className="services-hero-desc text-body-lg text-text-secondary mx-auto" style={{ maxWidth: '40rem', textAlign: 'center' }}>
          Three ways to work together — each designed to move you from AI
          potential to measurable business outcomes.
        </p>
      </div>
    </section>
  );
}
