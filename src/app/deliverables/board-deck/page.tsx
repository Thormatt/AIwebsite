'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MeridianLogo } from '@/components/deliverables/MeridianLogo';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler);

const slides = [
  { id: 0, title: 'title' },
  { id: 1, title: 'problem' },
  { id: 2, title: 'assessment' },
  { id: 3, title: 'opportunity' },
  { id: 4, title: 'investment' },
  { id: 5, title: 'risk' },
  { id: 6, title: 'truncation' },
];

export default function BoardDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (currentSlide !== 2 || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Strategy', 'Data', 'People', 'Technology', 'Governance', 'Operations', 'Culture', 'Value'],
        datasets: [{
          label: 'Meridian',
          data: [2.0, 3.5, 2.5, 3.0, 1.5, 2.0, 2.5, 2.0],
          fill: true,
          backgroundColor: 'rgba(232, 93, 4, 0.2)',
          borderColor: '#e85d04',
          pointBackgroundColor: '#e85d04',
          pointBorderColor: '#fff',
          pointRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: { stepSize: 1, color: '#94a3b8', backdropColor: 'transparent' },
            pointLabels: { color: '#f8fafc', font: { size: 14, weight: 600 } },
          },
        },
        plugins: { legend: { display: false } },
      },
    });

    return () => chart.destroy();
  }, [currentSlide]);

  return (
    <>
      <Link href="/deliverables" className="fixed top-6 left-6 z-50 text-small text-accent hover:text-accent-hover uppercase tracking-wider font-semibold">
        ← Exit
      </Link>

      <div className="relative w-screen h-screen overflow-hidden bg-bg-primary">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Slide 0: Title */}
        {currentSlide === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center container">
              <MeridianLogo className="h-16 mx-auto mb-12 opacity-60" />
              <h1 className="text-display-xl mb-8">
                AI Strategy &<br /><span className="text-gradient">Investment Recommendation</span>
              </h1>
              <p className="text-display-md text-text-secondary">Board of Directors</p>
              <p className="text-small text-text-muted mt-8 italic">February 2026 | Confidential</p>
            </div>
          </div>
        )}

        {/* Slide 1: The Problem */}
        {currentSlide === 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container text-center">
              <MeridianLogo className="h-12 mx-auto mb-12 opacity-40" />
              <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>The Problem</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
                <div>
                  <div className="text-[5rem] font-light text-gradient mb-4">+40%</div>
                  <p className="text-body text-text-secondary">Customer acquisition costs (2-year trend)</p>
                </div>
                <div>
                  <div className="text-[5rem] font-light text-gradient mb-4">Flat</div>
                  <p className="text-body text-text-secondary">Operational efficiency (plateauing despite investment)</p>
                </div>
                <div>
                  <div className="text-[5rem] font-light text-gradient mb-4">5+</div>
                  <p className="text-body text-text-secondary">Competitors launching AI-powered products</p>
                </div>
              </div>
              <p className="text-body-lg text-text-muted italic mt-16 max-w-2xl mx-auto">
                "We're falling behind in the AI race while our costs are rising"
              </p>
            </div>
          </div>
        )}

        {/* Slide 2: Current State */}
        {currentSlide === 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container text-center">
              <MeridianLogo className="h-12 mx-auto mb-12 opacity-40" />
              <h2 className="text-display-lg mb-12" style={{ textAlign: 'center' }}>Current State Assessment</h2>
              <div className="text-[6rem] font-light text-gradient mb-6">2.4<span className="text-[4rem] text-text-muted">/5.0</span></div>
              <p className="text-display-md text-text-secondary mb-16">Overall AI Readiness - Emerging Stage</p>
              <div className="max-w-2xl mx-auto bg-bg-elevated border border-border rounded-2xl p-12">
                <canvas ref={chartRef}></canvas>
              </div>
              <p className="text-body-lg text-text-secondary mt-8">
                <span className="text-accent font-semibold">Key Gap:</span> Strong technical capability, weak governance & strategy
              </p>
            </div>
          </div>
        )}

        {/* Slide 3: The Opportunity */}
        {currentSlide === 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container text-center">
              <MeridianLogo className="h-12 mx-auto mb-12 opacity-40" />
              <h2 className="text-display-lg mb-16" style={{ textAlign: 'center' }}>The Opportunity</h2>
              <h3 className="text-display-md text-text-secondary mb-16" style={{ textAlign: 'center' }}>4 High-Value Use Cases Identified</h3>
              <ul className="max-w-3xl mx-auto text-left space-y-8 text-body-lg text-text-secondary mb-20">
                <li className="flex gap-4"><span className="text-accent flex-shrink-0">→</span><span><span className="text-text-primary font-semibold">Loan Pre-Screening:</span> $1.2M annual value, 3-4 months to deploy</span></li>
                <li className="flex gap-4"><span className="text-accent flex-shrink-0">→</span><span><span className="text-text-primary font-semibold">FAQ Automation:</span> $800K annual value, 2-3 months to deploy</span></li>
                <li className="flex gap-4"><span className="text-accent flex-shrink-0">→</span><span><span className="text-text-primary font-semibold">Credit Risk Modeling:</span> $3.5M annual value, 8-10 months to deploy</span></li>
                <li className="flex gap-4"><span className="text-accent flex-shrink-0">→</span><span><span className="text-text-primary font-semibold">Robo-Advisory:</span> $2.7M annual value, 9-12 months to deploy</span></li>
              </ul>
              <div className="text-[7rem] font-light text-gradient mb-4">$8.2M</div>
              <p className="text-body-lg text-text-secondary">Combined annual value potential</p>
            </div>
          </div>
        )}

        {/* Slide 4: Investment */}
        {currentSlide === 4 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container text-center">
              <MeridianLogo className="h-12 mx-auto mb-12 opacity-40" />
              <h2 className="text-display-lg mb-16" style={{ textAlign: 'center' }}>Investment Recommendation</h2>
              <div className="bg-accent/10 border border-accent rounded-2xl p-16 max-w-3xl mx-auto mb-20">
                <div className="text-[7rem] font-light text-gradient mb-6">$2.8M</div>
                <div className="text-display-md text-text-secondary mb-6">Over 18 months</div>
                <div className="text-body-lg text-accent">Projected 3.2x ROI</div>
              </div>
              <h3 className="text-display-md mb-12" style={{ textAlign: 'center' }}>Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                <div className="bg-bg-elevated rounded-xl p-6">
                  <div className="text-3xl font-semibold text-accent mb-2">Q2 2026</div>
                  <p className="text-body text-text-secondary">Foundation & pilot launch</p>
                </div>
                <div className="bg-bg-elevated rounded-xl p-6">
                  <div className="text-3xl font-semibold text-accent mb-2">Q3 2026</div>
                  <p className="text-body text-text-secondary">Pilot validation & scale prep</p>
                </div>
                <div className="bg-bg-elevated rounded-xl p-6">
                  <div className="text-3xl font-semibold text-accent mb-2">Q4 2026</div>
                  <p className="text-body text-text-secondary">Production rollout & next wave</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 5: Risk */}
        {currentSlide === 5 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container">
              <MeridianLogo className="h-12 mx-auto mb-12 opacity-40" />
              <h2 className="text-display-lg mb-20" style={{ textAlign: 'center' }}>Key Risks & <span className="text-gradient">Mitigations</span></h2>
              <div className="max-w-4xl mx-auto space-y-10">
                <div className="bg-bg-elevated border border-accent/30 rounded-xl p-12">
                  <h3 className="text-body-lg font-bold text-accent mb-5">Regulatory Compliance Risk</h3>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    <span className="text-text-primary font-semibold">Mitigation:</span> Built-in model risk management (MRM) aligned with SR 11-7,
                    Legal & Compliance oversight at every stage
                  </p>
                </div>
                <div className="bg-bg-elevated border border-accent/30 rounded-xl p-12">
                  <h3 className="text-body-lg font-bold text-accent mb-5">Talent & Skills Gap</h3>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    <span className="text-text-primary font-semibold">Mitigation:</span> Hybrid approach - upskill existing team + hire 2 ML engineers,
                    leverage 3rd party platform vendors to accelerate
                  </p>
                </div>
                <div className="bg-bg-elevated border border-accent/30 rounded-xl p-12">
                  <h3 className="text-body-lg font-bold text-accent mb-5">Pilot Failure / Poor ROI</h3>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    <span className="text-text-primary font-semibold">Mitigation:</span> Gated approach with clear success criteria and go/no-go decision points,
                    conservative ROI estimates with 30% buffer
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 6: Truncation */}
        {currentSlide === 6 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div className="bg-accent/10 border-2 border-dashed border-accent rounded-2xl p-12 text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <h3 className="text-display-md" style={{ textAlign: 'center' }}>Full Deck Continues...</h3>
                  </div>
                  <p className="text-body-lg text-text-secondary mb-12 leading-relaxed italic">
                    This sample showcases the first 6 slides of the Board Presentation.
                    The complete deck includes 15 additional slides covering:
                  </p>
                  <ul className="text-left max-w-2xl mx-auto space-y-5 text-body-lg text-text-secondary">
                    <li className="flex gap-3"><span className="text-accent">→</span> Detailed financial model & ROI breakdown</li>
                    <li className="flex gap-3"><span className="text-accent">→</span> Competitive analysis (peer banks' AI initiatives)</li>
                    <li className="flex gap-3"><span className="text-accent">→</span> Implementation roadmap with milestones</li>
                    <li className="flex gap-3"><span className="text-accent">→</span> Organizational changes required</li>
                    <li className="flex gap-3"><span className="text-accent">→</span> Success stories from peer institutions</li>
                    <li className="flex gap-3"><span className="text-accent">→</span> Appendix: full assessment results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Dots */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === i ? 'bg-accent scale-125' : 'bg-border hover:bg-accent/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Keyboard Hint */}
        <div className="fixed bottom-8 right-8 text-micro text-text-muted opacity-50">
          Use ← → arrow keys to navigate
        </div>
      </div>
    </>
  );
}
