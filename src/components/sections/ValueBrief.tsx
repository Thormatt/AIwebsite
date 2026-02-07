'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, isTouchDevice } from '@/lib/gsap';

const deliverables = [
  'Current-state workflow + systems map',
  'Reference architecture (vendor-agnostic)',
  'ROI model + assumptions',
  'Governance & compliance mapping',
  'Prioritized use case matrix',
  'Exec-ready decision brief',
  '90-day action plan with owners + milestones',
];

export function ValueBrief() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;
    const ctx = gsap.context(() => {
      // Animate headline
      gsap.fromTo(
        '.brief-headline',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.brief-intro',
            start: 'top 80%',
          },
        }
      );

      // Stagger deliverable cards
      gsap.fromTo(
        '.deliverable-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.deliverables-grid',
            start: 'top 80%',
          },
        }
      );

      // Result card
      gsap.fromTo(
        '.result-card',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.result-card',
            start: 'top 85%',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-secondary relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

      {/* Intro */}
      <div className="brief-intro section border-t border-border relative z-10">
        <div className="container">
          <p className="text-micro text-accent" style={{ marginBottom: '2rem' }}>What you get</p>
          <h2 className="brief-headline text-display-xl max-w-4xl">
            Complete clarity.
            <br />
            <span className="text-gradient">10 business days.</span>
          </h2>
        </div>
      </div>

      {/* Deliverable cards */}
      <div className="relative z-10" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="deliverables-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="deliverable-card glass-card p-8 flex items-start gap-4 min-h-[120px]"
              >
                <span className="text-accent text-lg mt-0.5 flex-shrink-0">→</span>
                <div>
                  <span className="text-micro text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-body-lg font-medium text-text-primary mt-2">
                    {item}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Result card */}
          <div className="result-card rounded-2xl" style={{ marginTop: '6rem', padding: '3.5rem', background: 'linear-gradient(135deg, #e85d04 0%, #f97316 100%)' }}>
            <p className="text-micro text-white/70" style={{ marginBottom: '1.5rem' }}>The result</p>
            <p className="text-display-lg text-white max-w-2xl">
              Everything your leadership team needs to make the AI call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
