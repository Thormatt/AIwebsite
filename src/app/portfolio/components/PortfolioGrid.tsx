'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/lib/portfolio';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

export function PortfolioGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section style={{ paddingTop: '2rem', paddingBottom: '8rem' }}>
      <div
        ref={gridRef}
        className="container grid grid-cols-1 md:grid-cols-2"
        style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}
      >
        {projects.map((project) => (
          <Card
            key={project.id}
            variant="glass"
            hover
            className="portfolio-card group overflow-hidden"
          >
            <CardContent style={{ padding: '2rem' }}>
              {/* Screenshot */}
              <div
                className="relative overflow-hidden rounded-lg"
                style={{
                  aspectRatio: project.isMobile ? '9 / 16' : '16 / 10',
                  maxHeight: project.isMobile ? '400px' : 'none',
                  maxWidth: project.isMobile ? '220px' : 'none',
                  margin: project.isMobile ? '0 auto 1.5rem' : undefined,
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(232, 93, 4, 0.15)',
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay for dark harmonization */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(10, 10, 12, 0) 50%, rgba(10, 10, 12, 0.6) 100%)',
                  }}
                />
              </div>

              {/* Industry badge */}
              <div style={{ marginBottom: '1rem' }}>
                <Badge variant="primary" size="sm">
                  {project.industry}
                </Badge>
              </div>

              {/* Title */}
              <h3
                className="text-display-xs text-text-primary"
                style={{ marginBottom: '0.75rem' }}
              >
                {project.title}
              </h3>

              {/* Problem */}
              <p
                className="text-body-sm text-text-secondary"
                style={{ marginBottom: '1.25rem', lineHeight: 1.7 }}
              >
                {project.problem}
              </p>

              {/* Impact pills */}
              <div
                className="flex flex-wrap"
                style={{ gap: '0.5rem', marginBottom: '1.25rem' }}
              >
                {project.impact.map((metric) => (
                  <span
                    key={metric}
                    className="text-xs font-medium rounded-full border"
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(232, 93, 4, 0.08)',
                      color: 'var(--color-accent)',
                      borderColor: 'rgba(232, 93, 4, 0.2)',
                    }}
                  >
                    {metric}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul
                className="text-body-sm text-text-secondary"
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  marginBottom: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start"
                    style={{ gap: '0.5rem' }}
                  >
                    <span
                      className="text-accent flex-shrink-0"
                      style={{ marginTop: '0.15rem' }}
                    >
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Solution line */}
              <div
                className="border-t border-border-primary"
                style={{ paddingTop: '1rem' }}
              >
                <p className="text-xs uppercase tracking-wider text-text-muted font-semibold" style={{ marginBottom: '0.375rem' }}>
                  Solution
                </p>
                <p className="text-body-sm text-text-secondary">
                  {project.solution}
                </p>
              </div>

              {/* Demo link */}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-accent hover:text-text-primary transition-colors"
                  style={{ marginTop: '1rem', gap: '0.375rem' }}
                >
                  Try Demo
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
