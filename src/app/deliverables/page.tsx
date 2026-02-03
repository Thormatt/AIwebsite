'use client';

import Link from 'next/link';
import { MeridianLogo } from '@/components/deliverables/MeridianLogo';

const deliverables = [
  {
    number: '01',
    title: 'Executive AI Assessment Report',
    description: 'Comprehensive analysis of organizational AI maturity across 8 dimensions, including readiness scoring, capability gaps, and strategic investment recommendations.',
    pages: '18-25 pages',
    href: '/deliverables/executive-assessment',
  },
  {
    number: '02',
    title: 'Data Readiness Scorecard',
    description: 'Detailed evaluation of data infrastructure, quality, governance, and accessibility. Identifies critical blockers and quick wins for AI enablement.',
    pages: '12-15 pages',
    href: '/deliverables/data-scorecard',
  },
  {
    number: '03',
    title: 'Prioritized Opportunity Matrix',
    description: 'Value-vs-effort analysis of AI use cases with business case details, technical requirements, and recommended pilot sequencing for maximum ROI.',
    pages: '15-20 pages',
    href: '/deliverables/opportunity-matrix',
  },
  {
    number: '04',
    title: '90-Day Action Plan',
    description: 'Week-by-week tactical roadmap for foundation building, pilot execution, and scaling. Includes RACI matrix, success metrics, and milestone tracking.',
    pages: '10-12 pages',
    href: '/deliverables/action-plan',
  },
  {
    number: '05',
    title: 'Board Presentation Deck',
    description: 'Executive-ready slide deck distilling the assessment into strategic narrative, investment case, risk analysis, and decision recommendations for board approval.',
    pages: '20-25 slides',
    href: '/deliverables/board-deck',
  },
  {
    number: '06',
    title: 'Technology Recommendations',
    description: 'Build-vs-buy analysis, vendor shortlists, integration architecture, and technology stack recommendations tailored to existing infrastructure and capabilities.',
    pages: '14-18 pages',
    href: '/deliverables/tech-recommendations',
  },
];

export default function DeliverablesHub() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden border-t border-border" style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
        {/* Background */}
        <div className="absolute inset-0 bg-bg-primary">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#e85d04]/8 rounded-full blur-[150px]" />
        </div>

        <div className="container relative z-10">
          <p className="text-micro text-accent mb-8">Client deliverables showcase</p>
          <h1 className="text-display-hero max-w-5xl mb-12">
            What you'll <span className="text-gradient">receive.</span>
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl mb-6">
            Live samples of the deliverables our clients receive after an AI readiness assessment engagement.
          </p>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Each showcases the structure, insights, and actionable recommendations you can expect.
          </p>
        </div>
      </section>

      {/* Company Context */}
      <section className="section bg-bg-secondary border-t border-border relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-5xl">
            <p className="text-micro text-accent mb-8">Fictional client example</p>

            <div className="glass-card p-10 md:p-12">
              <div className="flex items-center gap-6 mb-10">
                <MeridianLogo className="h-16" />
              </div>

              <h2 className="text-display-lg mb-8">Meridian Financial Services</h2>

              <p className="text-body-lg text-text-secondary mb-10 leading-relaxed max-w-3xl">
                These deliverables showcase a fictional engagement with a mid-market regional financial institution
                navigating their AI transformation journey.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                <div>
                  <dt className="text-micro text-accent mb-2">Industry</dt>
                  <dd className="text-body text-text-primary">Regional Financial Services</dd>
                </div>
                <div>
                  <dt className="text-micro text-accent mb-2">Size</dt>
                  <dd className="text-body text-text-primary">850 employees, $120M revenue</dd>
                </div>
                <div>
                  <dt className="text-micro text-accent mb-2">Markets</dt>
                  <dd className="text-body text-text-primary">Retail banking, wealth management, lending</dd>
                </div>
                <div>
                  <dt className="text-micro text-accent mb-2">Current State</dt>
                  <dd className="text-body text-text-primary">Basic AI usage, no strategy</dd>
                </div>
                <div>
                  <dt className="text-micro text-accent mb-2">Key Challenge</dt>
                  <dd className="text-body text-text-primary">Rising CAC, operational inefficiency</dd>
                </div>
                <div>
                  <dt className="text-micro text-accent mb-2">Engagement Trigger</dt>
                  <dd className="text-body text-text-primary">CTO building AI roadmap for board</dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="section bg-bg-primary border-t border-border">
        <div className="container">
          <div className="mb-16">
            <p className="text-micro text-accent mb-6">Six strategic deliverables</p>
            <h2 className="text-display-lg max-w-3xl">
              The complete <span className="text-gradient">decision package.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
            {deliverables.map((deliverable) => (
              <Link
                key={deliverable.number}
                href={deliverable.href}
                className="group glass-card p-10 lg:p-12 hover:glass-card-accent transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-display-md text-text-muted">{deliverable.number}</span>
                  <span className="text-micro text-text-muted">{deliverable.pages}</span>
                </div>

                <h3 className="text-display-md mb-6 group-hover:text-gradient transition-all">
                  {deliverable.title}
                </h3>

                <p className="text-body text-text-secondary leading-relaxed mb-8">
                  {deliverable.description}
                </p>

                <div className="flex items-center gap-2 text-accent group-hover:text-accent-hover font-semibold text-small uppercase tracking-wider">
                  View sample
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="bg-bg-secondary border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl">
            <p className="text-body text-text-muted italic leading-relaxed">
              These are abbreviated 2-3 page samples designed to showcase deliverable structure and quality.
              Full client deliverables are comprehensive, customized documents with detailed analysis,
              proprietary frameworks, and actionable recommendations tailored to your organization's specific context and goals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
