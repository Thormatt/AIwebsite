'use client';

import { useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

const credentials = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    stat: 'Award Winner',
    label: 'European Search Awards',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    stat: 'Hands-on',
    label: 'Strategy + delivery',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    stat: 'Executive',
    label: 'Board-ready alignment',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    stat: 'Vendor-Agnostic',
    label: 'Independent recommendations',
  },
];

const expertise = [
  'AI Strategy',
  'LLM Implementation',
  'Data Architecture',
  'ML Operations',
  'Enterprise Integration',
  'Executive Advisory',
];

export function Credibility() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.credibility-title',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.credential-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.credentials-grid',
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.expertise-badge',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.expertise-section',
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section bg-bg-secondary">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="credibility-title text-display-md text-text-primary mb-4">
            Experience that <GradientText>ships</GradientText>
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto text-center">
            Executive strategy paired with hands-on delivery, built alongside your team.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="credentials-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {credentials.map((cred, index) => (
            <div
              key={index}
              className="credential-card glass-card p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center text-accent" style={{ background: 'linear-gradient(to bottom right, rgba(232,93,4,0.2), rgba(249,115,22,0.2))' }}>
                {cred.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
                {cred.stat}
              </div>
              <div className="text-text-secondary text-sm">{cred.label}</div>
            </div>
          ))}
        </div>

        {/* Expertise Tags */}
        <div className="expertise-section text-center">
          <p className="text-text-muted text-sm uppercase tracking-wider mb-4">
            Areas of Expertise
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((item, index) => (
              <Badge
                key={index}
                variant="primary"
                size="md"
                className="expertise-badge"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Speaking & Accomplishments */}
        <div className="mt-20 pt-12 border-t border-border">
          <p className="text-micro text-accent mb-6">Speaking & advisory</p>
          <h3 className="text-display-md mb-12 max-w-2xl">
            From panels to boardrooms.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden group">
              <img
                src="/images/speaking-national-security-panel.jpg"
                alt="Thor speaking at national security panel"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden group">
              <img
                src="/images/speaking-google-event.jpg"
                alt="Thor speaking at Google event"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden group">
              <img
                src="/images/speaking-workshop.jpg"
                alt="Thor leading AI workshop"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
