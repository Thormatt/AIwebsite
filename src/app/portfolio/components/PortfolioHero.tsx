'use client';

import { useRef } from 'react';
import { GradientText } from '@/components/ui/GradientText';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

export function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.portfolio-hero-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        '.portfolio-hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(
        '.portfolio-hero-desc',
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
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div
        className="container relative text-center"
        style={{ maxWidth: '896px', margin: '0 auto' }}
      >
        <p
          className="portfolio-hero-eyebrow text-text-accent text-sm md:text-base font-medium tracking-wide uppercase"
          style={{ marginBottom: '1.5rem' }}
        >
          Portfolio
        </p>

        <h1
          className="portfolio-hero-title text-display-lg text-text-primary"
          style={{ marginBottom: '2rem' }}
        >
          Work That <GradientText>Delivers</GradientText>
        </h1>

        <p
          className="portfolio-hero-desc text-body-lg text-text-secondary"
          style={{ textAlign: 'center' }}
        >
          AI solutions that produce measurable business outcomes &mdash; not just technology demos.
        </p>
      </div>
    </section>
  );
}
