'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap, isTouchDevice } from '@/lib/gsap';

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;
    const ctx = gsap.context(() => {
      // Split and animate headline
      const headline = document.querySelector('.cta-headline');
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Animate the CTA button with a pulse
      gsap.fromTo(
        '.cta-button',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.cta-button',
            start: 'top 90%',
          },
        }
      );

      // Continuous subtle pulse on button
      gsap.to('.cta-button', {
        boxShadow: '0 0 60px rgba(245, 158, 11, 0.4)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />

      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e85d04] to-transparent" />

      <div className="container relative z-10">
        <div className="text-center" style={{ maxWidth: '896px', margin: '0 auto' }}>
          <p className="text-micro text-accent mb-8">Strategy + delivery.</p>

          <h2 className="cta-headline text-display-xl mb-12 text-center mx-auto">
            Make the AI call<br />
            with confidence.
          </h2>

          <p className="text-body-lg text-text-secondary" style={{ maxWidth: '672px', margin: '0 auto 4rem' }}>
            In a short call, we&apos;ll map where you are, what to build first,
            and whether I&apos;m the right partner to deliver it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="https://calendly.com/thor-matthiasson/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button btn btn-primary text-lg px-10 py-5"
            >
              Book your call now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <p className="text-small text-text-muted mt-8">
            Short call. No pitch. Just clarity.
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f97316] to-transparent" />
    </section>
  );
}
