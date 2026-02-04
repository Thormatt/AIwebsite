'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

const articles = [
  {
    slug: 'multi-model-consensus',
    title: 'Why Multi-Model Consensus Catches Hallucinations That Single Models Miss',
    excerpt:
      'How applying the Delphi method to AI caught a hallucination that a single model confidently missed.',
    category: 'Technical',
    date: '2026-01-15',
    readingTime: '12 min',
    image: '/images/articles/multi-model-consensus-pop.png',
    featured: true,
  },
  {
    slug: 'what-to-tell-your-board',
    title: 'What to Tell Your Board About AI',
    excerpt:
      'Board members are asking about AI. Most executives are giving the wrong answers. Here\'s what to say instead.',
    category: 'Leadership',
    date: '2025-07-01',
    readingTime: '7 min',
    image: '/images/articles/leadership.svg',
  },
  {
    slug: 'build-vs-buy',
    title: 'Build vs Buy: The Question You\'re Asking Wrong',
    excerpt:
      'The build-vs-buy debate in AI is a false binary. Here\'s the framework that actually works.',
    category: 'AI Strategy',
    date: '2025-04-01',
    readingTime: '8 min',
    image: '/images/articles/governance.svg',
  },
  {
    slug: 'silicon-ceiling',
    title: 'Breaking Through the Silicon Ceiling: Why AI Adoption Stalls After the C-Suite',
    excerpt:
      'Executives buy the vision. Middle managers kill the execution. How to bridge the gap.',
    category: 'Leadership',
    date: '2024-12-15',
    readingTime: '8 min',
    image: '/images/articles/leadership.svg',
  },
  {
    slug: 'ai-pilot-to-production',
    title: 'From Pilot to Production: The 90-Day AI Value Framework',
    excerpt:
      'Why 87% of AI pilots never make it to production — and the framework that changes that.',
    category: 'Implementation',
    date: '2024-12-01',
    readingTime: '10 min',
    image: '/images/articles/pilot.svg',
  },
  {
    slug: 'billion-dollar-mistake',
    title: 'The $1 Billion AI Mistake CEOs Are Making Right Now',
    excerpt:
      'The biggest AI failure isn\'t technical. It\'s organizational. Here\'s the pattern destroying value at scale.',
    category: 'AI Strategy',
    date: '2024-12-01',
    readingTime: '6 min',
    image: '/images/articles/implementation.svg',
  },
  {
    slug: 'ai-implementation-traps',
    title: 'The 5 Traps That Kill AI Implementations',
    excerpt:
      'Why 74% of enterprise AI projects fail to deliver business value — and the patterns that separate the 26% that succeed.',
    category: 'Implementation',
    date: '2024-11-15',
    readingTime: '7 min',
    image: '/images/articles/ai-implementation-traps-pop.png',
  },
  {
    slug: 'why-ai-projects-fail',
    title: 'Why Most AI Projects Fail (And How to Avoid It)',
    excerpt:
      'The uncomfortable truth about AI project failure and the patterns that predict success.',
    category: 'Implementation',
    date: '2024-11-01',
    readingTime: '7 min',
    image: '/images/articles/implementation.svg',
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

const categories = ['All', 'AI Strategy', 'Implementation', 'Leadership', 'Technical'];

export function ArticlesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.article-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.articles-grid',
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section pt-0">
      <div className="container max-w-6xl">
        {/* Category Filter - could be made functional with state */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-all ${category === 'All'
                ? 'bg-accent-from/20 text-accent-from border border-accent-from/30'
                : 'bg-bg-tertiary text-text-secondary border border-border-primary hover:border-border-secondary'
                }`}
            >
              {category}
            </button>
          ))}
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
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-from/20 to-accent-to/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="primary">{article.category}</Badge>
                    {article.featured && (
                      <Badge variant="warning">Featured</Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent-from transition-colors">
                    {article.title}
                  </h2>
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
