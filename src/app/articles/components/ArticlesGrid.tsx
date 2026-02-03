'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';

// Article data - in a real app, this would come from a CMS or file system
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
    featured: true,
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
  {
    slug: 'ai-governance-framework',
    title: 'Building an AI Governance Framework That Works',
    excerpt:
      'Practical guardrails for responsible AI deployment without killing innovation.',
    category: 'Governance',
    date: '2023-12-20',
    readingTime: '7 min',
    image: '/images/articles/governance.svg',
  },
  {
    slug: 'llm-selection-guide',
    title: 'LLM Selection: Beyond the Benchmarks',
    excerpt:
      'What the leaderboards don\'t tell you about choosing the right language model.',
    category: 'Technical',
    date: '2023-12-15',
    readingTime: '10 min',
    image: '/images/articles/llm.svg',
  },
  {
    slug: 'ai-pilot-to-production',
    title: 'From AI Pilot to Production: The Missing Playbook',
    excerpt:
      'Why 95% of AI pilots never scale — and the specific steps that change that.',
    category: 'Implementation',
    date: '2023-12-10',
    readingTime: '9 min',
    image: '/images/articles/pilot.svg',
  },
];

const categories = ['All', 'AI Strategy', 'Implementation', 'Leadership', 'Technical', 'Governance'];

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
