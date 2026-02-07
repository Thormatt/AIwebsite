'use client';

import { useRef } from 'react';
import { GradientText } from '@/components/ui/GradientText';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap, ScrollTrigger, isTouchDevice } from '@/lib/gsap';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      '90-minute deep dive to understand what you\'re actually trying to solve, what\'s been tried, and what success looks like.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Assessment & Architecture',
    description:
      'Structured analysis of your current AI capabilities, data readiness, and a vendor-agnostic reference architecture.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Roadmap & Governance',
    description:
      'Prioritized action plan with governance mapping, ROI modeling, and clear milestones with owners.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Build & Ship',
    description:
      'Hands-on delivery that takes your highest-value workflow from prototype to production.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate title
    gsap.fromTo(
      '.process-title',
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

    // Animate timeline line
    gsap.fromTo(
      '.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
        },
      }
    );

    // Animate each step
    gsap.fromTo(
      '.process-step',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '5rem' }}>
          <h2 className="process-title text-display-md text-text-primary text-center" style={{ marginBottom: '1.5rem' }}>
            A Proven <GradientText>Process</GradientText>
          </h2>
          <p className="text-body-lg text-text-secondary text-center" style={{ maxWidth: '672px', margin: '0 auto' }}>
            From first conversation to working system — a structured approach
            that delivers results.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 z-0">
            <div className="timeline-line h-full origin-top" style={{ background: 'linear-gradient(to bottom, #e85d04, #ea580c, #f97316)' }} />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-step relative flex items-start gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Connector Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-accent border-4 border-bg-primary z-10" />

                {/* Content */}
                <div
                  className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 1 ? 'md:pr-16' : 'md:pl-16'
                  } md:w-1/2`}
                >
                  <div className="glass-card p-6 md:p-8 relative z-10 bg-bg-secondary">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-accent" style={{ background: 'linear-gradient(to bottom right, rgba(232,93,4,0.2), rgba(249,115,22,0.2))' }}>
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-accent text-sm font-medium">
                          Step {step.number}
                        </span>
                        <h3 className="text-xl font-semibold text-text-primary">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
