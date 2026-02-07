'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap, isTouchDevice } from '@/lib/gsap';

const services = [
  {
    id: 'discovery',
    number: '01',
    title: 'AI Value + Risk Brief',
    duration: '10 business days',
    price: '$15k–$25k',
    description: 'Align leadership on priorities, risks, and what to build first.',
    outcomes: [
      'Executive alignment + priority use cases',
      'Data and capability gap analysis',
      'Exec-ready decision brief',
      '90-day delivery plan with owners',
    ],
    cta: 'Start assessment',
  },
  {
    id: 'production',
    number: '02',
    title: 'Production Workflow Launch',
    duration: '6–8 weeks',
    price: "Let\u2019s talk",
    description: 'Pick one high-value workflow and ship it to production — integrated, evaluated, and owned by your team.',
    outcomes: [
      'Production-grade AI workflow',
      'Integration with existing systems',
      'Evaluation framework + monitoring',
      'Team training + runbook handoff',
    ],
    cta: 'Ship a workflow',
    featured: true,
  },
  {
    id: 'advisory',
    number: '03',
    title: 'Fractional Head of AI Delivery',
    duration: 'Ongoing',
    price: '$10k–$15k/mo',
    description: 'Executive AI leadership with hands-on delivery. I guide decisions and build the first system with your team.',
    outcomes: [
      'Exec steering cadence + decision log',
      'Portfolio prioritization + intake',
      'Vendor/tooling rationalization',
      'Governance gates + evaluation standards',
      'Delivery oversight + capability transfer',
    ],
    cta: 'Get leadership',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;
    const ctx = gsap.context(() => {
      // Cards reveal with stagger
      gsap.fromTo(
        '.service-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-border relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '12rem' }}>
            <p className="text-micro text-accent mb-8">Three ways to work together</p>
            <h2 className="text-display-xl" style={{ marginBottom: '3rem' }}>
              Pick your
              <br />
              <span className="text-gradient">starting point.</span>
            </h2>
            <p className="text-body-lg text-text-secondary" style={{ maxWidth: '36rem' }}>
              Three paths to working systems — faster than any traditional consulting engagement.
            </p>
          </div>

          <div className="services-grid grid lg:grid-cols-3 gap-10 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-card relative rounded-2xl transition-all duration-300 h-full ${
                  service.featured
                    ? 'glass-card-accent'
                    : 'glass-card'
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-px left-8 right-8 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #e85d04 0%, #f97316 100%)' }} />
                )}

                <div className="p-8 md:p-10 lg:p-12 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-display-md text-text-muted">{service.number}</span>
                      <p className="text-micro text-text-muted">{service.duration}</p>
                    </div>

                    <h3 className="text-display-md mb-5">{service.title}</h3>
                    <p className="text-body text-text-secondary mb-8">{service.description}</p>

                    <div className="space-y-4 mb-10">
                      {service.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-accent mt-0.5">→</span>
                          <span className="text-small text-text-secondary">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services#${service.id}`}
                    className={`btn w-full justify-center mt-auto ${service.featured ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {service.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
