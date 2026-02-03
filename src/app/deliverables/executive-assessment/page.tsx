'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MeridianLogo } from '@/components/deliverables/MeridianLogo';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ExecutiveAssessment() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Strategy', 'Data', 'People', 'Technology', 'Governance', 'Operations', 'Culture', 'Value'],
        datasets: [
          {
            label: 'Meridian Current State',
            data: [2.0, 3.5, 2.5, 3.0, 1.5, 2.0, 2.5, 2.0],
            fill: true,
            backgroundColor: 'rgba(232, 93, 4, 0.15)',
            borderColor: '#e85d04',
            pointBackgroundColor: '#e85d04',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#e85d04',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Industry Benchmark',
            data: [2.8, 3.2, 2.9, 3.1, 2.6, 2.7, 2.8, 2.5],
            fill: true,
            backgroundColor: 'rgba(148, 163, 184, 0.1)',
            borderColor: '#94a3b8',
            borderDash: [5, 5],
            pointBackgroundColor: '#94a3b8',
            pointBorderColor: '#fff',
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            angleLines: { display: true, color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
              color: '#94a3b8',
              backdropColor: 'transparent',
              font: { size: 11 },
            },
            pointLabels: {
              color: '#f8fafc',
              font: { size: 13, weight: 600 },
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              color: '#94a3b8',
              font: { size: 13 },
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
            Executive AI <span className="text-gradient">Assessment</span>
          </h1>
          <p className="text-display-md text-text-secondary mb-4">
            Organizational Readiness & Strategic Roadmap
          </p>
          <p className="text-body-lg text-text-primary mt-8">Meridian Financial Services</p>
          <p className="text-small text-text-muted mt-2 italic">February 2026 | Confidential</p>

          <Link href="/deliverables" className="inline-block mt-12 text-small text-accent hover:text-accent-hover uppercase tracking-wider font-semibold">
            ← Back to Deliverables
          </Link>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="section bg-bg-secondary border-t border-border relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-5xl">
            <p className="text-micro text-accent mb-6">01 — Summary</p>
            <h2 className="text-display-xl mb-20">Executive Summary</h2>

            {/* Overall Score */}
            <div className="glass-card p-16 mb-20">
              <div className="text-[8rem] font-light leading-none text-gradient mb-6">2.4<span className="text-[5rem] text-text-muted">/5.0</span></div>
              <div className="text-display-md text-text-secondary mb-10">Overall AI Readiness - Emerging Stage</div>

              <p className="text-body-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Meridian Financial Services demonstrates <span className="text-accent font-semibold">solid technical foundations</span> but faces significant gaps in governance, strategy, and organizational alignment. The assessment reveals a
                "Frustration Zone" pattern: high technical literacy paired with low strategic maturity, resulting in
                underutilized AI capabilities and fragmented initiatives.
              </p>
            </div>

            {/* Key Findings */}
            <div className="glass-card p-12 md:p-16">
              <p className="text-micro text-accent mb-6">Critical Insights</p>

              <div className="space-y-8">
                {[
                  'Strong technical capability (3.5/5) is hampered by weak governance (1.5/5), creating compliance risk and duplicated efforts across departments',
                  'No formal AI strategy - existing use cases (chatbot, fraud detection) were implemented opportunistically without business case validation',
                  'Data infrastructure is acceptable (3.0/5) but siloed - Marketing cannot access Sales data, limiting AI personalization potential',
                  'Cultural readiness is moderate (2.5/5) - leadership support exists but employee awareness and training are insufficient'
                ].map((finding, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-accent text-3xl flex-shrink-0">→</span>
                    <p className="text-body-lg text-text-secondary leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-12 border-t border-border">
                <p className="text-micro text-accent mb-6">Investment Recommendation</p>
                <p className="text-body-lg text-text-secondary leading-relaxed max-w-3xl">
                  <span className="text-accent font-bold text-2xl">$2.8M over 18 months</span> to address governance gaps,
                  pilot 4 high-value use cases, and build scalable AI operating model. Projected <span className="text-accent font-bold">3.2x ROI</span> based on
                  operational efficiency gains and revenue growth in wealth management personalization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maturity Heatmap */}
      <section className="section bg-bg-primary border-t border-border relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-5xl">
            <p className="text-micro text-accent mb-6">02 — Maturity Analysis</p>
            <h2 className="text-display-xl mb-16">AI Maturity Heatmap</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-bg-elevated border border-border rounded-xl overflow-hidden">
                <thead>
                  <tr className="border-b border-border bg-bg-tertiary">
                    <th className="text-left p-6 text-micro text-accent uppercase">Dimension</th>
                    <th className="text-center p-6 text-micro text-accent uppercase">Score</th>
                    <th className="text-center p-6 text-micro text-accent uppercase">Level</th>
                    <th className="text-center p-6 text-micro text-accent uppercase">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: 'Strategy & Vision', score: 2.0, level: 'Opportunistic', gap: 'High', color: 'bg-red-900/30 text-red-400' },
                    { dim: 'Data & Infrastructure', score: 3.5, level: 'Structured', gap: 'Medium', color: 'bg-yellow-900/30 text-yellow-400' },
                    { dim: 'People & Skills', score: 2.5, level: 'Developing', gap: 'High', color: 'bg-red-900/30 text-red-400' },
                    { dim: 'Technology & Tools', score: 3.0, level: 'Capable', gap: 'Medium', color: 'bg-yellow-900/30 text-yellow-400' },
                    { dim: 'Governance & Ethics', score: 1.5, level: 'Ad Hoc', gap: 'Critical', color: 'bg-red-900/50 text-red-300' },
                    { dim: 'Operations & Process', score: 2.0, level: 'Experimental', gap: 'High', color: 'bg-red-900/30 text-red-400' },
                    { dim: 'Culture & Change', score: 2.5, level: 'Aware', gap: 'Medium', color: 'bg-yellow-900/30 text-yellow-400' },
                    { dim: 'Value & Impact', score: 2.0, level: 'Anecdotal', gap: 'High', color: 'bg-red-900/30 text-red-400' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                      <td className="p-6 text-body text-text-primary font-semibold">{row.dim}</td>
                      <td className={`p-6 text-center text-xl font-light ${row.color}`}>{row.score}</td>
                      <td className="p-6 text-center text-body text-text-secondary">{row.level}</td>
                      <td className="p-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-micro font-semibold uppercase ${
                          row.gap === 'Critical' ? 'bg-red-900/50 text-red-300 border border-red-500/30' :
                          row.gap === 'High' ? 'bg-red-900/30 text-red-400 border border-red-500/20' :
                          'bg-yellow-900/30 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {row.gap}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-small text-text-muted italic text-center">
              Note: Scores range from 1 (nascent) to 5 (optimized). Industry benchmark for mid-market financial services: 2.8/5.
            </p>
          </div>
        </div>
      </section>

      {/* Radar Chart */}
      <section className="section bg-bg-secondary border-t border-border relative">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-micro text-accent mb-6">Maturity Profile</p>
            <h3 className="text-display-lg mb-16">8-Dimension Maturity Profile</h3>
            <div className="glass-card p-8 md:p-12">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Quadrant Matrix */}
      <section className="section bg-bg-primary border-t border-border relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#e85d04]/5 rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-5xl">
            <p className="text-micro text-accent mb-6">03 — Strategic Position</p>
            <h2 className="text-display-xl mb-16">Strategic Position: <span className="text-gradient">Frustration Zone</span></h2>

            <div className="relative aspect-square max-w-2xl mx-auto border-2 border-border rounded-xl overflow-hidden">
              {/* Q1 - Top Right */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-900/20 border-l border-b border-border p-8 flex flex-col items-center justify-center text-center">
                <p className="text-micro text-green-400 mb-2">Q1</p>
                <p className="text-body-lg font-semibold text-text-primary mb-1">Transformation</p>
                <p className="text-small text-text-muted italic">High literacy, high maturity</p>
              </div>

              {/* Q2 - Top Left */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-yellow-900/20 border-r border-b border-border p-8 flex flex-col items-center justify-center text-center">
                <p className="text-micro text-yellow-400 mb-2">Q2</p>
                <p className="text-body-lg font-semibold text-text-primary mb-1">Awareness</p>
                <p className="text-small text-text-muted italic">Low literacy, high maturity</p>
              </div>

              {/* Q3 - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-900/20 border-r border-t border-border p-8 flex flex-col items-center justify-center text-center">
                <p className="text-micro text-red-400 mb-2">Q3</p>
                <p className="text-body-lg font-semibold text-text-primary mb-1">Novice</p>
                <p className="text-small text-text-muted italic">Low literacy, low maturity</p>
              </div>

              {/* Q4 - Bottom Right (Meridian) */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/10 border-l border-t border-accent border-4 p-8 flex flex-col items-center justify-center text-center">
                <p className="text-micro text-accent mb-2">Q4 - MERIDIAN</p>
                <p className="text-body-lg font-semibold text-accent mb-1">Frustration</p>
                <p className="text-small text-text-secondary italic">High literacy, low maturity</p>
                <p className="text-micro text-accent font-bold mt-2">"Good ideas, poor execution"</p>
              </div>

              {/* Axis Labels */}
              <div className="absolute -bottom-8 right-0 text-micro text-text-muted">AI Literacy (High →)</div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-micro text-text-muted">AI Maturity (High →)</div>
            </div>

            <div className="mt-20 max-w-3xl glass-card p-10">
              <p className="text-body-lg text-text-secondary leading-relaxed">
                <span className="text-accent font-semibold">Implication:</span> Your team understands AI's potential
                (literacy = high) but lacks the governance, processes, and structure to execute systematically
                (maturity = low). This creates frustration, duplicated work, and risk exposure.{' '}
                <span className="text-accent font-semibold">
                  Priority: Build operating model before scaling use cases.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Truncation Notice */}
      <section className="section bg-bg-secondary border-t border-border relative">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="bg-accent/10 border-2 border-dashed border-accent rounded-2xl p-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <h3 className="text-display-md" style={{ textAlign: 'center' }}>Full Report Continues...</h3>
              </div>
              <p className="text-body-lg text-text-secondary mb-12 leading-relaxed italic">
                This sample showcases the first 3 pages of the Executive Assessment Report.
                The complete deliverable includes 15 additional pages covering:
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-5 text-body text-text-secondary">
                <li className="flex gap-3"><span className="text-accent">→</span> Detailed dimension-by-dimension analysis with evidence</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Interview synthesis (10 stakeholders across departments)</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Risk assessment & compliance gap analysis</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Competitive benchmarking (peer financial institutions)</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Quick wins vs. strategic initiatives roadmap</li>
                <li className="flex gap-3"><span className="text-accent">→</span> Organizational change management recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
