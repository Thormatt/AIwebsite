'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

const services = [
  {
    title: 'Exec Steering',
    description:
      'Weekly cadence with decision logs, priority reviews, and exec prep so leadership stays aligned.',
  },
  {
    title: 'Portfolio Prioritization',
    description:
      'Use-case intake, scoring, and sequencing to focus resources on highest-ROI AI initiatives.',
  },
  {
    title: 'Vendor Rationalization',
    description:
      'Independent evaluation of AI tools, platforms, and service providers — no referral fees, no bias.',
  },
  {
    title: 'Governance Gates',
    description:
      'Evaluation standards, approval workflows, and compliance checkpoints for every AI initiative.',
  },
  {
    title: 'Delivery Oversight',
    description:
      'Hands-on guidance during build and integration phases to keep projects on track and on spec.',
  },
  {
    title: 'Capability Transfer',
    description:
      'Structured enablement so your team owns the AI practice after I step out.',
  },
];

export function FractionalAdvisor() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.advisor-title',
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
      '.service-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.services-list',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="advisory" className="section">
      <div className="container" style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8" style={{ marginBottom: '5rem' }}>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <Badge variant="primary">
                Ongoing Engagement
              </Badge>
            </div>
            <h2 className="advisor-title text-display-md text-text-primary" style={{ marginBottom: '1.5rem' }}>
              Fractional Head of AI <span className="text-accent">Delivery</span>
            </h2>
            <p className="text-body-lg text-text-secondary" style={{ maxWidth: '540px' }}>
              Executive AI leadership with hands-on delivery. I stay in the room
              for exec prep, vendor diligence, and roadmap decisions.
            </p>
          </div>
          <Link href="/#contact" className="btn btn-primary">
            Discuss Leadership
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="services-list grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item bg-bg-secondary border border-border"
              style={{ padding: '2rem' }}
            >
              <h3 className="text-body-lg font-semibold text-text-primary" style={{ marginBottom: '0.75rem' }}>
                {service.title}
              </h3>
              <p className="text-text-secondary text-small">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ideal For Section */}
        <div className="bg-bg-tertiary border-l-4 border-accent" style={{ padding: '3rem', marginTop: '5rem' }}>
          <h3 className="text-display-sm text-text-primary" style={{ marginBottom: '2rem' }}>
            Ideal For
          </h3>
          <div className="grid md:grid-cols-3" style={{ gap: '2rem' }}>
            <div>
              <h4 className="font-semibold text-text-primary" style={{ marginBottom: '0.5rem' }}>
                Scaling Companies
              </h4>
              <p className="text-text-secondary text-small">
                Growth-stage companies building their first AI capabilities
                without a full-time AI executive.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary" style={{ marginBottom: '0.5rem' }}>
                Enterprise Teams
              </h4>
              <p className="text-text-secondary text-small">
                Established organizations needing independent AI strategy
                validation and implementation guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary" style={{ marginBottom: '0.5rem' }}>
                Exec-Level Oversight
              </h4>
              <p className="text-text-secondary text-small">
                Executives who need a trusted AI advisor for high-stakes
                decisions and stakeholder communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
