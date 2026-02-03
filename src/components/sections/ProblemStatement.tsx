'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const problems = [
  { label: 'Pilots stuck in POC', stat: '95%', source: 'McKinsey 2024' },
  { label: 'Projects abandoned', stat: '30%', source: 'Gartner 2024' },
  { label: 'No measurable ROI', stat: '74%', source: 'BCG 2024' },
  { label: 'Leadership misaligned', stat: '67%', source: 'MIT Sloan' },
];

export function ProblemStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline
      gsap.fromTo(
        '.problem-headline',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.problem-intro',
            start: 'top 80%',
          },
        }
      );

      // Stagger problem cards
      gsap.fromTo(
        '.problem-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.problems-grid',
            start: 'top 80%',
          },
        }
      );

      // Animate stat numbers on scroll
      ScrollTrigger.create({
        trigger: '.problems-grid',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          document.querySelectorAll('.problem-stat').forEach((el) => {
            const text = el.textContent || '0';
            const target = parseInt(text.replace('%', ''));
            const suffix = text.includes('%') ? '%' : '';
            const obj = { value: 0 };
            gsap.to(obj, {
              value: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(obj.value) + suffix;
              },
            });
          });
        },
      });

      // Bar chart animation
      gsap.fromTo(
        '.bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: '.value-gap',
            start: 'top 75%',
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
      <div className="problem-intro section border-t border-border relative z-10">
        <div className="container">
          <p className="text-micro text-accent mb-6">The uncomfortable truth</p>
          <h2 className="problem-headline text-display-xl max-w-4xl">
            You&apos;ve invested millions.
            <br />
            <span className="text-text-muted">Your board is asking questions.</span>
            <br />
            <span className="text-gradient">Your team can&apos;t answer them.</span>
          </h2>
        </div>
      </div>

      {/* Problem cards grid */}
      <div className="section pt-0 relative z-10">
        <div className="container">
          <div className="problems-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="problem-card glass-card p-8 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <span className="text-micro text-text-muted">Problem {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-display-sm mt-4">{problem.label}</h3>
                </div>
                <div>
                  <p className="problem-stat text-display-lg text-gradient">{problem.stat}</p>
                  <p className="text-small text-text-muted mt-2">{problem.source}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Result card */}
          <div className="result-card mt-16 p-8 md:p-12 rounded-2xl" style={{ background: 'linear-gradient(135deg, #e85d04 0%, #f97316 100%)' }}>
            <p className="text-micro text-white/70 mb-4">The result</p>
            <p className="text-display-lg text-white max-w-2xl">
              52% gap between AI adoption and value realized.
            </p>
          </div>
        </div>
      </div>

      {/* Value gap visualization */}
      <div className="value-gap section border-t border-border relative z-10">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-body text-text-secondary">Companies using AI</span>
                <span className="text-display-md font-bold">78%</span>
              </div>
              <div className="h-4 bg-bg-tertiary rounded-full relative overflow-hidden">
                <div className="bar-fill absolute inset-y-0 left-0 bg-text-primary rounded-full origin-left" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-body text-text-secondary">Actually seeing value</span>
                <span className="text-display-md font-bold text-gradient">26%</span>
              </div>
              <div className="h-4 bg-bg-tertiary rounded-full relative overflow-hidden">
                <div className="bar-fill absolute inset-y-0 left-0 rounded-full origin-left" style={{ width: '26%', background: 'linear-gradient(90deg, #e85d04 0%, #f97316 100%)' }} />
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-body-lg text-text-secondary">
                That&apos;s not a technology problem.
                <br />
                <span className="text-gradient font-semibold">That&apos;s an execution problem.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
