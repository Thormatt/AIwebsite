'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MeridianLogo } from '@/components/deliverables/MeridianLogo';
import { Chart, ScatterController, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(ScatterController, LinearScale, PointElement, Tooltip, Legend);

const shortlist = [
  { useCase: 'Loan Application Pre-Screening', description: 'AI triages loan apps, auto-approves low-risk, flags high-risk for manual review', value: '$1.2M', valueType: 'Cost reduction', effort: '3-4', risk: 'Low', owner: 'Lending Operations', color: 'border-green-500/50' },
  { useCase: 'Customer Service FAQ Automation', description: 'LLM-powered chatbot handles 70% of tier-1 inquiries, escalates complex issues', value: '$800K', valueType: 'Cost reduction', effort: '2-3', risk: 'Low', owner: 'Customer Support', color: 'border-green-500/40' },
  { useCase: 'Credit Risk Modeling Enhancement', description: 'Improve default prediction accuracy by 15% using gradient boosting models', value: '$3.5M', valueType: 'Risk mitigation', effort: '8-10', risk: 'Medium', owner: 'Risk Management', color: 'border-blue-500/50' },
  { useCase: 'Personalized Wealth Advisor (Robo-Advisory)', description: 'AI-driven portfolio recommendations for clients under $500K AUM', value: '$2.7M', valueType: 'Revenue growth', effort: '9-12', risk: 'Medium', owner: 'Wealth Management', color: 'border-blue-500/40' },
];

export default function OpportunityMatrix() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const quickWins = [
      { x: 3.5, y: 1.2, label: '1. Loan Pre-Screening' },
      { x: 2.5, y: 0.8, label: '2. FAQ Automation' },
    ];

    const strategic = [
      { x: 9, y: 3.5, label: '3. Credit Risk Model' },
      { x: 10.5, y: 2.7, label: '4. Robo-Advisory' },
    ];

    const deferred = [
      { x: 6, y: 0.5, label: 'Fraud Detection Upgrade' },
      { x: 7, y: 0.7, label: 'Document Processing' },
      { x: 8, y: 1.0, label: 'Churn Prediction' },
      { x: 5, y: 0.4, label: 'Email Prioritization' },
      { x: 11, y: 1.8, label: 'Branch Optimization' },
      { x: 12, y: 2.0, label: 'Trading Algorithm' },
      { x: 9, y: 0.9, label: 'Compliance Monitoring' },
      { x: 7, y: 0.6, label: 'Lead Scoring' },
    ];

    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Quick Wins',
            data: quickWins,
            backgroundColor: '#22c55e',
            borderColor: '#fff',
            borderWidth: 2,
            pointRadius: 12,
            pointHoverRadius: 15,
          },
          {
            label: 'Strategic Investments',
            data: strategic,
            backgroundColor: '#3b82f6',
            borderColor: '#fff',
            borderWidth: 2,
            pointRadius: 12,
            pointHoverRadius: 15,
          },
          {
            label: 'Deferred',
            data: deferred,
            backgroundColor: '#64748b',
            borderColor: '#fff',
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        scales: {
          x: {
            title: { display: true, text: 'Implementation Effort (Months) →', color: '#94a3b8', font: { size: 14, weight: 600 } },
            min: 0,
            max: 13,
            ticks: { stepSize: 2, color: '#94a3b8' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
          },
          y: {
            title: { display: true, text: 'Annual Business Value ($M) →', color: '#94a3b8', font: { size: 14, weight: 600 } },
            min: 0,
            max: 4,
            ticks: { stepSize: 0.5, color: '#94a3b8' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, color: '#94a3b8', font: { size: 13 } },
          },
          tooltip: {
            backgroundColor: '#141829',
            titleColor: '#f8fafc',
            bodyColor: '#94a3b8',
            borderColor: '#e85d04',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function(context: any) {
                const point = context.raw;
                return point.label + ': $' + point.y + 'M value, ' + point.x + ' months';
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

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
            Prioritized <span className="text-gradient">Opportunity Matrix</span>
          </h1>
          <p className="text-display-md text-text-secondary mb-4">
            AI Use Case Analysis & Pilot Recommendations
          </p>
          <p className="text-body-lg text-text-primary mt-8">Meridian Financial Services</p>
          <p className="text-small text-text-muted mt-2 italic">February 2026 | Confidential</p>

          <Link href="/deliverables" className="inline-block mt-12 text-small text-accent hover:text-accent-hover uppercase tracking-wider font-semibold">
            ← Back to Deliverables
          </Link>
        </div>
      </section>

      {/* Matrix Overview */}
      <section className="bg-bg-secondary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="bg-accent/10 border border-accent rounded-2xl p-12 md:p-16">
              <h3 className="text-display-md mb-8" style={{ textAlign: 'center' }}>Assessment Overview</h3>
              <p className="text-body-lg text-text-secondary leading-relaxed mb-12">
                Evaluated 12 potential AI use cases across all business units. Prioritized based on business value,
                implementation effort, data readiness, and strategic alignment.{' '}
                <span className="text-accent font-semibold">4 use cases shortlisted for pilot phase.</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-bg-elevated rounded-lg p-8 text-center">
                  <div className="text-5xl font-light text-text-primary mb-2">12</div>
                  <div className="text-small text-text-muted uppercase tracking-wide">Use Cases Evaluated</div>
                </div>
                <div className="bg-bg-elevated rounded-lg p-6 text-center">
                  <div className="text-5xl font-light text-accent mb-2">4</div>
                  <div className="text-small text-text-muted uppercase tracking-wide">Shortlisted for Pilots</div>
                </div>
                <div className="bg-bg-elevated rounded-lg p-6 text-center">
                  <div className="text-5xl font-light text-gradient mb-2">$8.2M</div>
                  <div className="text-small text-text-muted uppercase tracking-wide">Combined Annual Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matrix Visualization */}
      <section className="bg-bg-primary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Value vs. <span className="text-gradient">Effort Matrix</span></h2>

            <div className="bg-bg-elevated border border-border rounded-2xl p-12 md:p-16">
              <canvas ref={chartRef}></canvas>
            </div>

            <p className="mt-6 text-small text-text-muted italic text-center">
              <span className="text-green-400 font-semibold">Green</span> = Quick Wins (prioritize first) |{' '}
              <span className="text-blue-400 font-semibold">Blue</span> = Strategic Investments (plan for scale) |{' '}
              <span className="text-text-muted font-semibold">Gray</span> = Deferred (not prioritized)
            </p>
          </div>
        </div>
      </section>

      {/* Shortlist Table */}
      <section className="bg-bg-secondary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Pilot Shortlist Details</h2>

            <div className="space-y-8">
              {shortlist.map((item, i) => (
                <div key={i} className={`bg-bg-elevated border-2 ${item.color} rounded-xl p-12`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    <div className="flex-1">
                      <h3 className="text-body-lg font-bold text-accent mb-4">{item.useCase}</h3>
                      <p className="text-body-lg text-text-secondary leading-relaxed mb-6">{item.description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-shrink-0">
                      <div className="bg-bg-tertiary rounded-lg p-4">
                        <p className="text-micro text-text-muted mb-1">Annual Value</p>
                        <p className="text-body-lg font-semibold text-accent">{item.value}</p>
                        <p className="text-micro text-text-muted">{item.valueType}</p>
                      </div>
                      <div className="bg-bg-tertiary rounded-lg p-4">
                        <p className="text-micro text-text-muted mb-1">Effort</p>
                        <p className="text-body-lg font-semibold text-text-primary">{item.effort}</p>
                        <p className="text-micro text-text-muted">Months</p>
                      </div>
                      <div className="bg-bg-tertiary rounded-lg p-4">
                        <p className="text-micro text-text-muted mb-1">Risk</p>
                        <p className={`text-body-lg font-semibold ${item.risk === 'Low' ? 'text-green-400' : 'text-yellow-400'}`}>{item.risk}</p>
                      </div>
                      <div className="bg-bg-tertiary rounded-lg p-4 col-span-2 md:col-span-1">
                        <p className="text-micro text-text-muted mb-1">Owner</p>
                        <p className="text-small text-text-primary font-medium">{item.owner}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-bg-primary" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-bg-elevated border border-border rounded-xl p-12 md:p-16">
              <h2 className="text-display-md mb-12" style={{ textAlign: 'center' }}>Recommended Next Steps</h2>

              <ol className="space-y-8 text-body-lg text-text-secondary leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">1.</span>
                  <span><span className="text-text-primary font-semibold">Begin pilot charters for top 2 Quick Wins</span> (Loan Pre-Screening + FAQ Automation) - target pilot kickoff within 30 days</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">2.</span>
                  <span><span className="text-text-primary font-semibold">Conduct detailed business case analysis</span> for Strategic Investments (#3 and #4) - validate ROI assumptions with Finance</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">3.</span>
                  <span><span className="text-text-primary font-semibold">Defer remaining 8 use cases</span> to Phase 2 (post-pilot learnings) - reassess in Q3 2026</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">4.</span>
                  <span><span className="text-text-primary font-semibold">Establish pilot success criteria</span> - define metrics, timelines, and go/no-go decision gates</span>
                </li>
              </ol>
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
                <h3 className="text-display-md" style={{ textAlign: 'center' }}>Full Matrix Continues...</h3>
              </div>
              <p className="text-body-lg text-text-secondary mb-12 leading-relaxed italic">
                This sample showcases the first 2-3 pages of the Opportunity Matrix.
                The complete deliverable includes 15 additional pages covering:
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-5 text-body-lg text-text-secondary">
                <li className="flex gap-3"><span className="text-accent">→</span> Detailed business cases with ROI calculations</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Technical requirements and architecture diagrams</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Risk analysis and mitigation strategies</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Resource requirements (team, budget, timeline)</li>
                <li className="flex gap-3"><span className="text-accent">→</span> All 12 use cases with full scoring methodology</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Competitive benchmarking (peer financial institutions)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
