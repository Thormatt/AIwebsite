'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

const phases = [
  {
    title: 'Workflow Selection',
    duration: 'Week 1–2',
    description:
      'Identify the highest-ROI workflow, map current state, and define success criteria with stakeholders.',
    items: [
      'Use-case scoring + selection',
      'Current-state workflow mapping',
      'Success metrics + acceptance criteria',
    ],
  },
  {
    title: 'Build & Integrate',
    duration: 'Week 3–5',
    description:
      'Build the AI workflow and integrate it with your existing systems, data, and permissions model.',
    items: [
      'AI workflow development',
      'System integration + data pipelines',
      'Permission + access controls',
    ],
  },
  {
    title: 'Evaluate & Harden',
    duration: 'Week 5–6',
    description:
      'Systematic evaluation against success criteria, edge case testing, and production hardening.',
    items: [
      'Evaluation framework setup',
      'Edge case + failure mode testing',
      'Monitoring + alerting configuration',
    ],
  },
  {
    title: 'Launch & Transfer',
    duration: 'Week 7–8',
    description:
      'Production launch with team training, documentation, and full ownership handoff.',
    items: [
      'Production deployment',
      'Team training sessions',
      'Runbook + handoff documentation',
    ],
  },
];

const deliverables = [
  'Production-grade AI workflow',
  'Integration with existing systems',
  'Evaluation framework + monitoring',
  'Team training',
  'Runbook + handoff docs',
];

export function ProductionWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.workflow-title',
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
      '.workflow-phase-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.workflow-phases-grid',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="production" className="section">
      <div className="container" style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8" style={{ marginBottom: '5rem' }}>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <Badge variant="primary">
                6–8 Week Engagement
              </Badge>
            </div>
            <h2 className="workflow-title text-display-md text-text-primary" style={{ marginBottom: '1.5rem' }}>
              Production Workflow <span className="text-accent">Launch</span>
            </h2>
            <p className="text-body-lg text-text-secondary" style={{ maxWidth: '540px' }}>
              Pick one high-value workflow and ship it to production — integrated,
              evaluated, and owned by your team.
            </p>
          </div>
          <Link href="/#contact" className="btn btn-primary">
            Ship a Workflow
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Phases Grid */}
        <div className="workflow-phases-grid grid md:grid-cols-2" style={{ columnGap: '2.5rem', rowGap: '3rem' }}>
          {phases.map((phase, index) => (
            <div
              key={index}
              className="workflow-phase-card bg-bg-secondary border border-border"
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
        <div className="bg-bg-secondary border border-border" style={{ padding: '3rem', marginTop: '5rem' }}>
          <h3 className="text-display-sm text-text-primary text-center" style={{ marginBottom: '3rem' }}>
            What You&apos;ll Receive
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-bg-tertiary border border-border"
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
