'use client';

import Link from 'next/link';
import { MeridianLogo } from '@/components/deliverables/MeridianLogo';

const stack = [
  { layer: 'Foundation', tech: 'Azure OpenAI Service', rationale: 'Existing Microsoft EA, SOC 2 compliant, regional data residency' },
  { layer: 'Orchestration', tech: 'LangChain + Semantic Kernel', rationale: 'Open-source flexibility, large community, Microsoft integration' },
  { layer: 'Vector Database', tech: 'Pinecone', rationale: 'Managed service, scales to millions of vectors, 99.9% SLA' },
  { layer: 'Observability', tech: 'LangSmith + Azure Monitor', rationale: 'LLM-specific tracing + existing monitoring infrastructure' },
  { layer: 'Data Platform', tech: 'Snowflake (existing)', rationale: 'Already in use, no migration needed, good AI integrations' },
  { layer: 'ML Platform', tech: 'Dataiku or H2O.ai', rationale: 'Low-code for citizen data scientists, enterprise governance' },
];

const buildVsBuy = [
  { category: 'LLM Foundation', build: 'Cost: High | Time: 18+ months | Risk: Very High', buy: 'Cost: Moderate | Time: Weeks | Risk: Low', rec: 'Buy', tech: 'Azure OpenAI' },
  { category: 'ML Platform', build: 'Cost: High | Time: 12+ months | Risk: High', buy: 'Cost: Moderate | Time: 1-2 months | Risk: Low', rec: 'Buy', tech: 'Dataiku/H2O.ai' },
  { category: 'Use Case Apps', build: 'Cost: Moderate | Time: 3-6 months | Risk: Medium', buy: 'Cost: High | Time: Varies | Risk: Medium', rec: 'Build', tech: 'Custom apps' },
  { category: 'Data Pipeline', build: 'Cost: Low | Time: 1-2 months | Risk: Low', buy: 'Cost: Moderate | Time: 1 month | Risk: Low', rec: 'Hybrid', tech: 'Extend existing ETL' },
  { category: 'Governance Tools', build: 'Cost: High | Time: 6+ months | Risk: High', buy: 'Cost: Moderate | Time: 2-3 months | Risk: Low', rec: 'Buy', tech: 'Alation/Collibra' },
];

const vendorCategories = [
  {
    category: 'ML/AI Platform',
    vendors: [
      { name: 'Dataiku', strength: 'Best-in-class UI, citizen data scientist focus', cost: '$150K-$250K/year', fit: '9/10', topPick: true },
      { name: 'H2O.ai', strength: 'AutoML, open-source roots', cost: '$100K-$180K/year', fit: '8/10', topPick: false },
      { name: 'AWS SageMaker', strength: 'Deep AWS integration', cost: 'Pay-as-you-go', fit: '6/10', topPick: false },
    ],
  },
  {
    category: 'Data Catalog & Governance',
    vendors: [
      { name: 'Alation', strength: 'Best search UX, Snowflake integration', cost: '$80K-$120K/year', fit: '9/10', topPick: true },
      { name: 'Collibra', strength: 'Enterprise governance, compliance focus', cost: '$100K-$150K/year', fit: '8/10', topPick: false },
      { name: 'Azure Purview', strength: 'Native Azure integration', cost: '$30K-$60K/year', fit: '7/10', topPick: false },
    ],
  },
  {
    category: 'LLM Observability',
    vendors: [
      { name: 'LangSmith', strength: 'Built by LangChain team, deep tracing', cost: '$2K-$5K/month', fit: '10/10', topPick: true },
      { name: 'Arize AI', strength: 'ML monitoring focus, drift detection', cost: '$3K-$8K/month', fit: '8/10', topPick: false },
      { name: 'Datadog', strength: 'Unified monitoring (already in use)', cost: 'Incremental add-on', fit: '7/10', topPick: false },
    ],
  },
];

export default function TechRecommendations() {
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
            Technology <span className="text-gradient">Recommendations</span>
          </h1>
          <p className="text-display-md text-text-secondary mb-4">
            AI Platform & Vendor Selection Guide
          </p>
          <p className="text-body-lg text-text-primary mt-8">Meridian Financial Services</p>
          <p className="text-small text-text-muted mt-2 italic">February 2026 | Confidential</p>

          <Link href="/deliverables" className="inline-block mt-12 text-small text-accent hover:text-accent-hover uppercase tracking-wider font-semibold">
            ← Back to Deliverables
          </Link>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-bg-secondary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-display-lg mb-12" style={{ textAlign: 'center' }}>Recommended Technology Stack</h2>
            <p className="text-body-lg text-text-secondary mb-16 leading-relaxed text-center">
              Designed to leverage existing Microsoft relationship while adding best-of-breed AI components.
            </p>

            <div className="space-y-6">
              {stack.map((layer, i) => (
                <div key={i} className="bg-bg-elevated border border-border rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-48 flex-shrink-0">
                      <span className="text-micro text-accent uppercase tracking-wider font-semibold">{layer.layer}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-body-lg text-text-primary font-semibold mb-2">{layer.tech}</p>
                      <p className="text-body text-text-secondary italic">{layer.rationale}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Build vs Buy */}
      <section className="bg-bg-primary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Build vs. <span className="text-gradient">Buy Analysis</span></h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-bg-elevated border border-border rounded-xl overflow-hidden">
                <thead>
                  <tr className="border-b border-border bg-bg-tertiary">
                    <th className="text-left p-8 text-micro text-accent uppercase">Category</th>
                    <th className="p-8 text-micro text-accent uppercase">Build</th>
                    <th className="p-8 text-micro text-accent uppercase">Buy</th>
                    <th className="p-8 text-micro text-accent uppercase">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {buildVsBuy.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                      <td className="p-8 text-body text-text-primary font-semibold">{row.category}</td>
                      <td className="p-8 text-body text-text-secondary">{row.build}</td>
                      <td className="p-8 text-body text-text-secondary">{row.buy}</td>
                      <td className="p-8 text-center">
                        <div className="inline-block px-3 py-1 rounded-full bg-accent text-bg-primary text-micro font-bold uppercase mb-2">
                          {row.rec}
                        </div>
                        <p className="text-small text-text-secondary">{row.tech}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-10 text-body-lg text-text-muted italic text-center">
              <span className="text-accent font-semibold">Overall Recommendation:</span> Hybrid approach - buy platform & infrastructure, build use cases
            </p>
          </div>
        </div>
      </section>

      {/* Vendor Shortlist */}
      <section className="bg-bg-secondary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Vendor Shortlist by Category</h2>

            <div className="space-y-16">
              {vendorCategories.map((cat, i) => (
                <div key={i}>
                  <h3 className="text-display-md mb-8" style={{ textAlign: 'center' }}>{cat.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cat.vendors.map((vendor, j) => (
                      <div
                        key={j}
                        className={`bg-bg-elevated rounded-xl p-8 ${
                          vendor.topPick ? 'border-2 border-accent' : 'border border-border'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-body-lg font-bold text-text-primary">{vendor.name}</h4>
                          <span className={`inline-block px-2 py-1 rounded text-micro font-bold ${
                            vendor.topPick ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-muted'
                          }`}>
                            {vendor.fit}
                          </span>
                        </div>
                        <p className="text-body text-text-secondary mb-3"><span className="text-text-primary font-semibold">Strength:</span> {vendor.strength}</p>
                        <p className="text-small text-text-muted italic">{vendor.cost}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Architecture */}
      <section className="bg-bg-primary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Integration <span className="text-gradient">Architecture</span></h2>

            <div className="bg-bg-elevated border border-border rounded-2xl p-16">
              <h3 className="text-body-lg mb-16 text-text-secondary" style={{ textAlign: 'center' }}>How New AI Components Connect to Existing Systems</h3>

              {/* Simplified architecture diagram using divs */}
              <div className="space-y-12">
                {/* Row 1: Existing Systems */}
                <div>
                  <p className="text-micro text-text-muted uppercase tracking-wide mb-4">Existing Systems</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {['Core Banking', 'CRM (Salesforce)', 'Wealth Mgmt'].map((sys, i) => (
                      <div key={i} className="bg-bg-tertiary border border-dashed border-border rounded-lg px-6 py-4">
                        <p className="text-body text-text-primary font-medium">{sys}</p>
                        <p className="text-micro text-text-muted">(Existing)</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-4xl text-accent">↓</span>
                </div>

                {/* Row 2: Data Layer */}
                <div>
                  <p className="text-micro text-text-muted uppercase tracking-wide mb-4">Data Warehouse</p>
                  <div className="flex justify-center">
                    <div className="bg-bg-tertiary border border-dashed border-border rounded-lg px-8 py-4">
                      <p className="text-body-lg text-text-primary font-semibold">Snowflake</p>
                      <p className="text-micro text-text-muted">(Existing)</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-4xl text-accent">↓</span>
                </div>

                {/* Row 3: AI Layer */}
                <div>
                  <p className="text-micro text-accent uppercase tracking-wide mb-4">New AI Platform</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {[
                      { name: 'Dataiku/H2O.ai', desc: 'ML Platform' },
                      { name: 'Azure OpenAI', desc: 'LLM Service' },
                      { name: 'Pinecone', desc: 'Vector DB' },
                    ].map((comp, i) => (
                      <div key={i} className="bg-accent/10 border border-accent rounded-lg px-6 py-4">
                        <p className="text-body text-text-primary font-semibold">{comp.name}</p>
                        <p className="text-micro text-accent">{comp.desc} (New)</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-4xl text-accent">↓</span>
                </div>

                {/* Row 4: Use Cases */}
                <div>
                  <p className="text-micro text-accent uppercase tracking-wide mb-4">Use Case Applications</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {['Loan Pre-Screening', 'FAQ Bot'].map((app, i) => (
                      <div key={i} className="bg-accent/10 border border-accent rounded-lg px-6 py-4">
                        <p className="text-body text-text-primary font-semibold">{app}</p>
                        <p className="text-micro text-text-muted">Custom App</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-16 text-body text-text-muted italic text-center">
                <span className="text-accent font-semibold">Integration Points:</span> REST APIs, Azure Event Hub for real-time data, Snowflake as central data hub
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Truncation Notice */}
      <section className="bg-bg-secondary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
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
                <h3 className="text-display-md" style={{ textAlign: 'center' }}>Full Recommendations Continue...</h3>
              </div>
              <p className="text-body-lg text-text-secondary mb-12 leading-relaxed italic">
                This sample showcases the first 2-3 pages of the Technology Recommendations.
                The complete deliverable includes 12 additional pages covering:
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-5 text-body-lg text-text-secondary">
                <li className="flex gap-3"><span className="text-accent">→</span> Vendor RFP templates with evaluation criteria</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Detailed cost models (3-year TCO analysis)</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Implementation timelines with dependencies</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Team skill gap analysis & hiring/training plans</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Security & compliance requirements mapping</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Proof-of-concept (POC) playbooks for vendor evaluation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
