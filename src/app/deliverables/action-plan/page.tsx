'use client';

import Link from 'next/link';
import { MeridianLogo } from '@/components/deliverables/MeridianLogo';

export default function ActionPlan() {
  return (
    <>
      {/* Cover/Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-bg-primary">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e85d04]/10 rounded-full blur-[180px]" />
        </div>

        <div className="container relative z-10 text-center">
          <MeridianLogo className="h-20 mx-auto mb-12" />
          <h1 className="text-display-xl mb-6">
            90-Day <span className="text-gradient">Action Plan</span>
          </h1>
          <p className="text-display-md text-text-secondary mb-4">
            Foundation → Pilot → Scale
          </p>
          <p className="text-body-lg text-text-primary mt-8">Meridian Financial Services</p>
          <p className="text-small text-text-muted mt-2 italic">Q1-Q2 2026 | Confidential</p>

          <Link href="/deliverables" className="inline-block mt-12 text-small text-accent hover:text-accent-hover uppercase tracking-wider font-semibold">
            ← Back to Deliverables
          </Link>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="bg-bg-secondary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>3-Month Timeline Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Month 1 */}
              <div className="bg-accent/10 border-2 border-accent rounded-xl p-12">
                <div className="text-micro text-accent mb-3 uppercase tracking-wider">Month 1</div>
                <h3 className="text-display-md mb-6">Foundation</h3>
                <p className="text-small text-text-muted italic mb-8">Build governance & select pilots</p>
                <ul className="space-y-5 text-body-lg text-text-secondary">
                  {[
                    'Form AI governance committee',
                    'Draft AI policy & ethics framework',
                    'Select pilot use case',
                    'Define success metrics',
                    'Secure data access agreements'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Month 2 */}
              <div className="bg-bg-elevated border border-border rounded-xl p-12">
                <div className="text-micro text-text-muted mb-3 uppercase tracking-wider">Month 2</div>
                <h3 className="text-display-md mb-6">Pilot</h3>
                <p className="text-small text-text-muted italic mb-8">Execute & iterate</p>
                <ul className="space-y-5 text-body-lg text-text-secondary">
                  {[
                    'Pilot kickoff (Loan Pre-Screening)',
                    'Initial model training',
                    'User acceptance testing',
                    'Refine based on feedback',
                    'Mid-pilot checkpoint review'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-text-muted flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Month 3 */}
              <div className="bg-bg-elevated border border-border rounded-xl p-12">
                <div className="text-micro text-text-muted mb-3 uppercase tracking-wider">Month 3</div>
                <h3 className="text-display-md mb-6">Scale</h3>
                <p className="text-small text-text-muted italic mb-8">Deploy & plan next wave</p>
                <ul className="space-y-5 text-body-lg text-text-secondary">
                  {[
                    'Production deployment (limited rollout)',
                    'Metrics review & validation',
                    'Document lessons learned',
                    'Plan Use Case #2 (FAQ Automation)',
                    'Present results to leadership'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-text-muted flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Month 1 Detailed */}
      <section className="bg-bg-primary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Month 1: <span className="text-gradient">Detailed Breakdown</span></h2>

            <div className="space-y-12">
              {/* Week 1-2 */}
              <div className="bg-bg-elevated border border-border rounded-xl p-12">
                <h3 className="text-body-lg text-accent font-semibold mb-8">Week 1-2: Governance & Policy</h3>
                <ul className="space-y-6 text-body-lg text-text-secondary">
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Form AI Governance Committee: CTO (chair), CFO, Legal, Compliance, Risk, HR <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">CTO</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Draft AI Policy covering: responsible use, data privacy, model approval process, human oversight requirements <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">Legal + Compliance</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Establish ethics framework: bias testing, explainability standards, appeals process for AI decisions <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">Legal + Risk</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Create model risk management (MRM) process aligned with SR 11-7 guidance <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">Risk Management</span></span>
                  </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-body text-text-muted"><span className="text-accent font-semibold">Deliverables:</span> AI Policy (draft), Governance Committee charter, MRM process documentation</p>
                </div>
              </div>

              {/* Week 3-4 */}
              <div className="bg-bg-elevated border border-border rounded-xl p-12">
                <h3 className="text-body-lg text-accent font-semibold mb-8">Week 3-4: Pilot Selection & Planning</h3>
                <ul className="space-y-6 text-body-lg text-text-secondary">
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Finalize pilot use case: Loan Application Pre-Screening (confirmed based on Opportunity Matrix) <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">Lending Operations</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Define success metrics: 40% reduction in manual review time, 95%+ accuracy, 0 fair lending violations <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">Lending + Risk</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Secure data access: Legal approves use of historical loan data for model training <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">Legal + IT</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">→</span>
                    <span>Draft pilot charter: scope, timeline, budget ($180K), team roles, decision gates <span className="inline-block ml-2 px-2 py-1 rounded bg-accent/20 text-accent text-micro uppercase">PMO</span></span>
                  </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-body text-text-muted"><span className="text-accent font-semibold">Deliverables:</span> Pilot charter, Success metrics dashboard (template), Data access agreements signed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="bg-bg-secondary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Pilot Success Metrics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Manual Review Time Reduction', target: '40%', baseline: 'Baseline: 22 min/application' },
                { name: 'Model Accuracy', target: '95%+', baseline: 'Human benchmark: 92%' },
                { name: 'Fair Lending Violations', target: '0', baseline: 'Strict compliance requirement' },
                { name: 'User Satisfaction (Loan Officers)', target: '4.0/5.0', baseline: 'Survey post-UAT' },
              ].map((metric, i) => (
                <div key={i} className="bg-bg-elevated border border-border rounded-xl p-8">
                  <p className="text-micro text-text-muted uppercase tracking-wide mb-2">{metric.name}</p>
                  <p className="text-5xl font-light text-gradient mb-3">{metric.target}</p>
                  <p className="text-small text-text-secondary">{metric.baseline}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-body text-text-muted italic text-center">
              Metrics tracked weekly, reviewed with governance committee bi-weekly
            </p>
          </div>
        </div>
      </section>

      {/* Truncation Notice */}
      <section className="bg-bg-primary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent/10 border-2 border-dashed border-accent rounded-2xl p-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <h3 className="text-display-md" style={{ textAlign: 'center' }}>Full Action Plan Continues...</h3>
              </div>
              <p className="text-body-lg text-text-secondary mb-12 leading-relaxed italic">
                This sample showcases the first 2-3 pages of the 90-Day Action Plan.
                The complete deliverable includes 8 additional pages covering:
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-5 text-body-lg text-text-secondary">
                <li className="flex gap-3"><span className="text-accent">→</span> Detailed task lists with owners and due dates (RACI matrix)</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Budget breakdown by category and month</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Risk mitigation strategies and contingency plans</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Weekly check-in agendas with governance committee</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Communication plan (stakeholder mapping, messaging)</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Resource allocation (team members, technology, budget)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
