'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

const services = [
  {
    title: 'Weekly Strategy Sessions',
    description:
      'Regular check-ins to review progress, address challenges, and adjust course as needed.',
  },
  {
    title: 'Board-Ready Materials',
    description:
      'Presentations, reports, and documentation that communicate AI initiatives to leadership.',
  },
  {
    title: 'Vendor Due Diligence',
    description:
      'Independent evaluation of AI tools, platforms, and service providers.',
  },
  {
    title: 'Implementation Oversight',
    description:
      'Hands-on guidance during critical phases of AI project execution.',
  },
  {
    title: 'Team Enablement',
    description:
      'Building internal AI capabilities through coaching and knowledge transfer.',
  },
  {
    title: 'Roadmap Reviews',
    description:
      'Quarterly strategic reviews to ensure alignment with business objectives.',
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
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-20">
          <div>
            <Badge variant="primary" className="mb-4">
              Ongoing Engagement
            </Badge>
            <h2 className="advisor-title text-display-md text-text-primary mb-6">
              Fractional AI <span className="text-accent">Lead</span>
            </h2>
            <p className="text-body-lg text-text-secondary" style={{ maxWidth: '540px' }}>
              Executive AI leadership with hands-on delivery. I stay in the room
              for board prep, vendor diligence, and roadmap decisions.
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
        <div className="services-list grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item bg-bg-secondary border border-border p-6"
            >
              <h3 className="text-body-lg font-semibold text-text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary text-small">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ideal For Section */}
        <div className="p-8 md:p-12 bg-bg-tertiary border-l-4 border-accent mt-20">
          <h3 className="text-display-sm text-text-primary mb-8">
            Ideal For
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">
                Scaling Companies
              </h4>
              <p className="text-text-secondary text-small">
                Growth-stage companies building their first AI capabilities
                without a full-time AI executive.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">
                Enterprise Teams
              </h4>
              <p className="text-text-secondary text-small">
                Established organizations needing independent AI strategy
                validation and implementation guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">
                Board-Level Oversight
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
