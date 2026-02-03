'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervals: number[] = [];
    const ctx = gsap.context(() => {
      // Text scramble effect for the main statement
      const scrambleText = (element: Element) => {
        const originalText = element.textContent || '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
        let iteration = 0;

        const interval = window.setInterval(() => {
          element.textContent = originalText
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          if (iteration >= originalText.length) {
            clearInterval(interval);
          }
          iteration += 1 / 2;
        }, 30);
        intervals.push(interval);
      };

      // Trigger scramble on scroll
      ScrollTrigger.create({
        trigger: '.scramble-text',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          document.querySelectorAll('.scramble-text').forEach(scrambleText);
        },
      });

      // Comparison lines slide in
      const compareLines = document.querySelectorAll('.compare-line');

      // Check if already scrolled past - show immediately
      const comparison = document.querySelector('.comparison');
      if (comparison) {
        const rect = comparison.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          // Already in view, show immediately
          gsap.set(compareLines, { x: 0, opacity: 1 });
        } else {
          // Animate in when scrolled to
          gsap.fromTo(
            compareLines,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.comparison',
                start: 'top 85%',
              },
            }
          );
        }
      }

      // Reveal the "I build" section
      gsap.fromTo(
        '.build-reveal',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.build-section',
            start: 'top 85%',
          },
        }
      );

    }, sectionRef);

    return () => {
      intervals.forEach((intervalId) => clearInterval(intervalId));
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#e85d04]/5 rounded-full blur-[180px]" />

      <div className="container relative z-10">
        {/* Opening statement */}
        <div className="mb-20 md:mb-32">
          <p className="text-micro text-accent mb-6">The difference</p>
          <h2 ref={textRef} className="text-display-xl max-w-5xl">
            <span className="scramble-text">Most consultants talk.</span>
            <br />
            <span className="scramble-text text-gradient">I ship.</span>
          </h2>
        </div>

        {/* Comparison */}
        <div className="comparison grid lg:grid-cols-2 gap-16 lg:gap-24" style={{ marginBottom: '8rem' }}>
          <div>
            <p className="text-micro text-text-muted mb-8">What you&apos;ve heard before</p>
            <div className="space-y-6">
              {[
                '"We\'ll deliver a comprehensive strategy framework"',
                '"Our methodology ensures stakeholder alignment"',
                '"The roadmap will guide your transformation journey"',
              ].map((text, i) => (
                <div key={i} className="compare-line flex items-start gap-4">
                  <span className="text-text-muted mt-1">✕</span>
                  <p className="text-body-lg text-text-muted italic line-through">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-micro text-accent mb-8">What I actually do</p>
            <div className="space-y-6">
              {[
                'Align leadership on the right AI call',
                'Build the first system with your team',
                'Transfer capability so it scales',
              ].map((text, i) => (
                <div key={i} className="compare-line flex items-start gap-4">
                  <span className="text-accent mt-1">→</span>
                  <p className="text-body-lg text-text-primary font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Build section */}
        <div className="build-section relative">
          <div className="build-reveal p-8 md:p-16 rounded-2xl" style={{ background: 'linear-gradient(135deg, #e85d04 0%, #f97316 100%)' }}>
            <p className="text-display-lg text-white max-w-3xl">
              Executive strategy with hands-on delivery.
              <br />
              Built to production, not just slides.
              <br />
              <span className="font-bold">No strategy decks collecting dust.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
