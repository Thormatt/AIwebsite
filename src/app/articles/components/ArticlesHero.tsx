'use client';

import { useRef } from 'react';
import { GradientText } from '@/components/ui/GradientText';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

export function ArticlesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.articles-hero-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        '.articles-hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(
        '.articles-hero-desc',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="container max-w-4xl relative z-10 text-center">
        <p className="articles-hero-eyebrow text-text-accent text-sm md:text-base font-medium tracking-wide uppercase mb-4">
          Articles
        </p>

        <h1 className="articles-hero-title text-display-lg text-text-primary mb-6">
          Latest <GradientText>Thinking</GradientText>
        </h1>

        <p className="articles-hero-desc text-body-lg text-text-secondary max-w-2xl mx-auto">
          Insights on AI strategy, implementation, and executive decision-making.
          No fluff, just practical perspectives from the field.
        </p>
      </div>
    </section>
  );
}
