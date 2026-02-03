'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

// Sample articles - will be replaced with actual data fetching
const articles = [
  {
    slug: 'multi-model-consensus',
    title: 'Why Multi-Model Consensus Beats Single-Model Thinking',
    excerpt:
      'The surprising accuracy gains from combining multiple AI perspectives on complex problems.',
    category: 'AI Strategy',
    date: '2024-01-15',
    readingTime: '8 min',
    image: '/images/articles/multi-model-consensus-pop.png',
  },
  {
    slug: 'ai-implementation-traps',
    title: 'The 5 Traps That Kill AI Implementations',
    excerpt:
      'Why 74% of AI projects fail to deliver value — and how to avoid their fate.',
    category: 'Implementation',
    date: '2024-01-08',
    readingTime: '6 min',
    image: '/images/articles/ai-implementation-traps-pop.png',
  },
  {
    slug: 'executive-ai-literacy',
    title: 'Executive AI Literacy: What You Actually Need to Know',
    excerpt:
      'The minimum viable AI knowledge for making informed strategic decisions.',
    category: 'Leadership',
    date: '2024-01-01',
    readingTime: '5 min',
    image: '/images/articles/executive-ai-literacy-pop.png',
  },
];

export function Articles() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.articles-title',
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
      '.article-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.articles-grid',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="articles-title text-display-md text-text-primary mb-4">
              Latest <GradientText>Thinking</GradientText>
            </h2>
            <p className="text-body-lg text-text-secondary max-w-xl">
              Insights on AI strategy, implementation, and executive decision-making.
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium whitespace-nowrap"
          >
            View all articles
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
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="articles-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <Link key={index} href={`/articles/${article.slug}`}>
              <Card
                variant="glass"
                className="article-card h-full overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-bg-tertiary">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(232,93,4,0.2), rgba(249,115,22,0.2))' }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
                  <Badge
                    variant="primary"
                    className="absolute top-4 left-4"
                  >
                    {article.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-text-muted text-xs">
                    <span>{article.readingTime} read</span>
                    <span>•</span>
                    <span>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
