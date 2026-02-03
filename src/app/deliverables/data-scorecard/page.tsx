'use client';

import Link from 'next/link';
import { MeridianLogo } from '@/components/deliverables/MeridianLogo';

const dimensions = [
  { name: 'Data Availability', score: 75, level: 'Good', assessment: 'Comprehensive customer, transaction, and operational data across core banking, CRM, and wealth management systems.', badge: 'Good', badgeColor: 'bg-green-900/30 text-green-400 border-green-500/30' },
  { name: 'Data Quality', score: 45, level: 'Needs Work', assessment: 'Inconsistent standards, duplicate records in CRM (est. 12%), missing/incomplete fields in 20% of wealth management profiles.', badge: 'Needs Work', badgeColor: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' },
  { name: 'Data Governance', score: 30, level: 'Critical Gap', assessment: 'No data catalog, no metadata management, unclear data ownership, ad hoc quality checks.', badge: 'Critical', badgeColor: 'bg-red-900/50 text-red-300 border-red-500/30' },
  { name: 'Data Security & Privacy', score: 65, level: 'Acceptable', assessment: 'SOC 2 compliant, encryption at rest/transit, role-based access controls, but no AI-specific privacy frameworks.', badge: 'Acceptable', badgeColor: 'bg-green-900/30 text-green-400 border-green-500/30' },
  { name: 'Data Accessibility', score: 50, level: 'Moderate', assessment: 'APIs exist but not well-documented, cross-functional data requests take 2-4 weeks, siloed access permissions.', badge: 'Moderate', badgeColor: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' },
  { name: 'Data Lineage & Observability', score: 40, level: 'Weak', assessment: 'Limited traceability, no automated lineage tracking, manual impact analysis when schema changes.', badge: 'Weak', badgeColor: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' },
];

const blockers = [
  {
    title: '1. No Data Catalog or Metadata Management',
    description: 'Teams don\'t know what data exists, where it lives, or who owns it. Data scientists spend 60% of their time hunting for data instead of building models.',
    impact: 'Delays every AI initiative by 4-6 weeks',
  },
  {
    title: '2. Inconsistent Quality Standards Across Systems',
    description: 'Each department defines "customer" differently. Core Banking uses SSN as key, CRM uses email, Wealth Management uses account ID. No master data management (MDM) strategy.',
    impact: 'AI models trained on bad data = bad predictions',
  },
  {
    title: '3. Siloed Access (Marketing Can\'t See Sales Data)',
    description: 'Rigid access controls prevent cross-functional AI use cases. Marketing team cannot access transaction data needed for personalization AI, citing "privacy concerns" without formal policy.',
    impact: 'Blocks 3 of 4 prioritized AI use cases',
  },
];

const quickWins = [
  { title: 'Deploy Data Catalog (e.g., Alation, Collibra)', description: 'Automated discovery and cataloging of all data assets. Teams can search, understand, and request access to data in self-service mode.', effort: 'Low', impact: 'High' },
  { title: 'Implement Basic Data Quality Rules', description: 'Define and enforce 5-10 critical quality rules (e.g., required fields, format validation, duplicate detection) using existing tools (dbt, Great Expectations).', effort: 'Low', impact: 'Med' },
  { title: 'Create Cross-Functional Data Access Policy', description: 'Legal + Compliance + IT define formal policy for cross-departmental data sharing with PII masking and audit logging.', effort: 'Med', impact: 'High' },
];

export default function DataScorecard() {
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
            Data Readiness <span className="text-gradient">Scorecard</span>
          </h1>
          <p className="text-display-md text-text-secondary mb-4">
            AI Enablement Assessment
          </p>
          <p className="text-body-lg text-text-primary mt-8">Meridian Financial Services</p>
          <p className="text-small text-text-muted mt-2 italic">February 2026 | Confidential</p>

          <Link href="/deliverables" className="inline-block mt-12 text-small text-accent hover:text-accent-hover uppercase tracking-wider font-semibold">
            ← Back to Deliverables
          </Link>
        </div>
      </section>

      {/* Overall Score */}
      <section className="section bg-bg-secondary border-t border-border relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="glass-card p-16">
              <div className="text-[8rem] font-light leading-none text-gradient mb-4">58<span className="text-[5rem] text-text-muted">/100</span></div>
              <div className="text-display-md text-text-secondary mb-6">Moderate Data Readiness</div>
              <p className="text-body-lg text-text-primary italic font-light max-w-xl">
                "You have data, but it's siloed and poorly governed"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Dimensions */}
      <section className="section bg-bg-primary border-t border-border relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-5xl">
            <p className="text-micro text-accent mb-6">01 — Dimension Scores</p>
            <h2 className="text-display-xl mb-20">Data Dimension Scores</h2>

            <div className="space-y-8">
              {dimensions.map((dim, i) => (
                <div key={i} className="glass-card p-8 md:p-12 hover:border-accent/30 transition-colors">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-body-lg font-semibold text-text-primary">{dim.name}</h3>
                    <span className="text-3xl font-light text-text-primary">{dim.score}<span className="text-xl text-text-muted">/100</span></span>
                  </div>

                  <div className="w-full h-4 bg-bg-tertiary rounded-full overflow-hidden mb-6">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        dim.score >= 70 ? 'bg-gradient-to-r from-green-600 to-green-500' :
                        dim.score >= 50 ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' :
                        'bg-gradient-to-r from-red-600 to-red-500'
                      }`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-micro font-semibold uppercase border ${dim.badgeColor}`}>
                      {dim.badge}
                    </span>
                  </div>

                  <p className="text-body-lg text-text-secondary leading-relaxed">{dim.assessment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Blockers */}
      <section className="section bg-bg-secondary border-t border-border relative">
        <div className="container relative z-10">
          <div className="max-w-5xl">
            <p className="text-micro text-accent mb-6">02 — AI Blockers</p>
            <h2 className="text-display-xl mb-20">Top 3 <span className="text-gradient">AI Blockers</span></h2>

            <div className="space-y-8">
              {blockers.map((blocker, i) => (
                <div key={i} className="bg-red-900/10 border-2 border-red-500/30 rounded-xl p-12">
                  <h4 className="text-body-lg font-bold text-red-400 mb-6">{blocker.title}</h4>
                  <p className="text-body-lg text-text-secondary leading-relaxed mb-6">{blocker.description}</p>
                  <p className="text-small text-text-muted">
                    <span className="text-accent font-semibold">Impact:</span> {blocker.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Wins */}
      <section className="section bg-bg-primary border-t border-border relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-5xl">
            <p className="text-micro text-accent mb-6">03 — Quick Wins</p>
            <h2 className="text-display-xl mb-20">Quick Wins <span className="text-text-muted font-light">(30-60 Days)</span></h2>

            <div className="space-y-8">
              {quickWins.map((win, i) => (
                <div key={i} className="glass-card p-12 flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1">
                    <h4 className="text-body-lg font-semibold text-accent mb-5">{win.title}</h4>
                    <p className="text-body-lg text-text-secondary leading-relaxed">{win.description}</p>
                  </div>
                  <div className="flex gap-4 md:flex-col md:items-end flex-shrink-0">
                    <div className="text-center bg-bg-tertiary rounded-lg px-4 py-3 min-w-[100px]">
                      <p className="text-micro text-text-muted mb-1">Effort</p>
                      <p className="text-body-lg font-semibold text-text-primary">{win.effort}</p>
                    </div>
                    <div className="text-center bg-bg-tertiary rounded-lg px-4 py-3 min-w-[100px]">
                      <p className="text-micro text-text-muted mb-1">Impact</p>
                      <p className="text-body-lg font-semibold text-accent">{win.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Truncation Notice */}
      <section className="section bg-bg-secondary border-t border-border relative">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="bg-accent/10 border-2 border-dashed border-accent rounded-2xl p-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <h3 className="text-display-md">Full Scorecard Continues...</h3>
              </div>
              <p className="text-body-lg text-text-secondary mb-12 leading-relaxed italic max-w-2xl mx-auto">
                This sample showcases the first 2-3 pages of the Data Readiness Scorecard.
                The complete deliverable includes 10 additional pages covering:
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-5 text-body-lg text-text-secondary">
                <li className="flex gap-3"><span className="text-accent">→</span> Detailed data architecture diagrams</li>
                <li className="flex gap-3"><span className="text-accent">→</span> System-by-system data quality assessments</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Remediation roadmap with timelines & owners</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Vendor recommendations for data tools</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Cost estimates for data infrastructure upgrades</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Data governance operating model design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
