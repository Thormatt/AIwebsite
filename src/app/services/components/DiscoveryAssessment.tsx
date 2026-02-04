'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

const phases = [
  {
    title: 'Discovery Session',
    duration: 'Day 1-2',
    description:
      'Deep dive into your AI initiatives, data landscape, and organizational readiness.',
    items: [
      '90-minute executive interview',
      'Stakeholder mapping',
      'Current state documentation',
    ],
  },
  {
    title: 'Analysis & Assessment',
    duration: 'Day 3-7',
    description:
      'Comprehensive evaluation against proven frameworks and industry benchmarks.',
    items: [
      'Data readiness scoring',
      'Capability gap analysis',
      'Risk assessment',
    ],
  },
  {
    title: 'Roadmap Development',
    duration: 'Day 8-10',
    description:
      'Prioritized recommendations with clear timelines and resource requirements.',
    items: [
      'Quick win identification',
      'Strategic initiative planning',
      'Investment roadmap',
    ],
  },
  {
    title: 'Executive Presentation',
    duration: 'Day 11-14',
    description:
      'Exec-ready deliverables with clear next steps and decision points.',
    items: [
      'Executive summary',
      'Detailed findings report',
      'Implementation playbook',
    ],
  },
];

const deliverables = [
  'Executive AI Assessment Report',
  'Data Readiness Scorecard',
  'Prioritized Opportunity Matrix',
  '90-Day Action Plan',
  'Executive Presentation Deck',
  'Technology Recommendations',
  'Reference Architecture',
  'ROI Model + Assumptions',
  'Governance & Compliance Mapping',
];

export function DiscoveryAssessment() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.discovery-title',
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
      '.phase-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.phases-grid',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="discovery" className="section bg-bg-secondary">
      <div className="container" style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8" style={{ marginBottom: '5rem' }}>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <Badge variant="primary">
                10 Business Days
              </Badge>
            </div>
            <h2 className="discovery-title text-display-md text-text-primary" style={{ marginBottom: '1.5rem' }}>
              AI Value + Risk <span className="text-accent">Brief</span>
            </h2>
            <p className="text-body-lg text-text-secondary" style={{ maxWidth: '540px' }}>
              A focused diagnostic that aligns leadership on priorities,
              risks, and what to build first.
            </p>
          </div>
          <Link href="/#contact" className="btn btn-primary">
            Start Assessment
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Phases Grid */}
        <div className="phases-grid grid md:grid-cols-2" style={{ columnGap: '2.5rem', rowGap: '3rem' }}>
          {phases.map((phase, index) => (
            <div
              key={index}
              className="phase-card bg-bg-tertiary border border-border"
              style={{ padding: '2.5rem' }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
                <h3 className="text-body-lg font-semibold text-text-primary">
                  {phase.title}
                </h3>
                <span className="text-micro text-text-muted">{phase.duration}</span>
              </div>
              <p className="text-text-secondary text-small" style={{ marginBottom: '2rem' }}>
                {phase.description}
              </p>
              <ul className="space-y-4">
                {phase.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-center gap-3 text-small text-text-secondary"
                  >
                    <span className="text-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Deliverables */}
        <div className="bg-bg-tertiary border border-border" style={{ padding: '3rem', marginTop: '5rem' }}>
          <h3 className="text-display-sm text-text-primary text-center" style={{ marginBottom: '3rem' }}>
            What You&apos;ll Receive
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-bg-secondary border border-border"
              >
                <span className="text-accent">📄</span>
                <span className="text-small text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
