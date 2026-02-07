'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = headlineRef.current;
      if (!headline) return;

      const lines = headline.querySelectorAll('.hero-line');

      // Initial states
      gsap.set(lines, { opacity: 0, y: 80, skewY: 3 });
      gsap.set('.hero-subtitle', { opacity: 0, y: 40 });
      gsap.set('.hero-cta', { opacity: 0, y: 30 });
      gsap.set('.hero-stat', { opacity: 0, y: 50 });

      // Master timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.3,
      });

      // Lines slide up with skew correction
      tl.to(lines, {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      });

      // Subtitle fades in
      tl.to(
        '.hero-subtitle',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.6'
      );

      // CTAs slide in
      tl.to(
        '.hero-cta',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
        },
        '-=0.4'
      );

      // Stats reveal
      tl.to(
        '.hero-stat',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        '-=0.3'
      );

      // === SCROLL PARALLAX ===

      // Content fades and moves up on scroll
      gsap.to('.hero-content', {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '40% top',
          end: '95% top',
          scrub: 1,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-start overflow-hidden"
      style={{ paddingTop: '10rem' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg-primary">
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Orange glow - top left */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#e85d04]/8 rounded-full blur-[150px]" />
        {/* Subtle secondary glow - bottom right */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#f97316]/5 rounded-full blur-[120px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(232, 93, 4, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 93, 4, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="hero-content container relative z-10 pb-16">
        {/* Main headline */}
        <h1 ref={headlineRef} className="overflow-hidden" style={{ marginBottom: '3rem' }}>
          <span className="hero-line block text-display-hero">
            Executive AI
          </span>
          <span className="hero-line block text-display-hero">
            leadership that <span className="text-gradient">ships.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <div className="hero-subtitle max-w-2xl" style={{ marginBottom: '3.5rem' }}>
          <p className="text-body-lg text-text-secondary mb-6">
            AI is on the leadership agenda. The question now: value or risk?
          </p>
          <p className="text-body-lg text-text-secondary">
            I help executive teams assess what matters, ship the first workflow
            to production, and stand up the governance to scale it.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4" style={{ marginBottom: '5rem' }}>
          <Link href="/#contact" className="hero-cta btn btn-primary group">
            Book an executive call
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/services" className="hero-cta btn btn-outline">
            See the approach
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-border" style={{ paddingTop: '3.5rem' }}>
          <div className="hero-stat">
            <p className="text-micro text-accent">Executive alignment</p>
            <p className="text-display-md text-text-primary mt-2 md:whitespace-nowrap">
              Exec-ready direction
            </p>
            <p className="text-small text-text-secondary mt-2">
              Clear priorities, risks, and ROI.
            </p>
          </div>

          <div className="hero-stat">
            <p className="text-micro text-accent">Hands-on delivery</p>
            <p className="text-display-md text-text-primary mt-2 md:whitespace-nowrap">First system shipped</p>
            <p className="text-small text-text-secondary mt-2">
              Built with your team, not above them.
            </p>
          </div>

          <div className="hero-stat">
            <p className="text-micro text-accent">Team enablement</p>
            <p className="text-display-md text-text-primary mt-2 md:whitespace-nowrap">Capability transferred</p>
            <p className="text-small text-text-secondary mt-2">
              So it scales after I step out.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-micro text-text-muted">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-text-muted to-transparent" />
      </div>
    </section>
  );
}
