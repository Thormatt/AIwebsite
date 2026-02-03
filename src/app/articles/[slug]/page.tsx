import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Fragment } from 'react';

// Helper to render inline bold text
function renderInlineText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

// Simple markdown renderer
function renderMarkdown(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // H2 heading
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++}>{line.slice(3)}</h2>
      );
      i++;
      continue;
    }

    // H3 heading
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++}>{line.slice(4)}</h3>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++}>
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s*/, ''));
        i++;
      }
      elements.push(
        <ol key={key++}>
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineText(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Special "The Fix:" callout
    if (line.startsWith('**The Fix:**')) {
      elements.push(
        <div key={key++} className="article-callout">
          {renderInlineText(line)}
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++}>{renderInlineText(line)}</p>
    );
    i++;
  }

  return elements;
}

// Article data
const articles: Record<
  string,
  {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readingTime: string;
    content: string;
  }
> = {
  'multi-model-consensus': {
    title: 'Why Multi-Model Consensus Beats Single-Model Thinking',
    excerpt:
      'The surprising accuracy gains from combining multiple AI perspectives on complex problems.',
    category: 'AI Strategy',
    date: '2024-01-15',
    readingTime: '8 min',
    content: `
## The Problem with Single-Model Dependency

Most organizations approach AI implementation with a single-model mindset. They pick a language model, integrate it, and hope for the best. This approach has fundamental limitations that become apparent at scale.

## What is Multi-Model Consensus?

Multi-model consensus is exactly what it sounds like: running the same query through multiple AI models and synthesizing their responses. Think of it as getting multiple expert opinions before making a decision.

## The Accuracy Gains

In our testing across hundreds of complex business queries, multi-model consensus consistently outperformed single-model responses:

- **15-20% improvement** in factual accuracy
- **Significant reduction** in hallucinations
- **Better coverage** of edge cases and nuances

## When to Use This Approach

Multi-model consensus works best for:

1. High-stakes decisions where accuracy matters
2. Complex problems with multiple valid perspectives
3. Situations where confidence levels need to be quantified
4. Quality assurance for AI-generated content

## Implementation Considerations

The trade-offs are real: higher latency, increased costs, and more complex orchestration. But for critical business decisions, the accuracy gains often justify the investment.

## Next Steps

If you're considering multi-model consensus for your AI strategy, start with a pilot. Pick a high-value use case where accuracy matters and measure the improvement. The data will tell you whether the approach makes sense for your specific context.
    `,
  },
  'ai-implementation-traps': {
    title: 'The 5 Traps That Kill AI Implementations',
    excerpt:
      'Why 74% of AI projects fail to deliver value — and how to avoid their fate.',
    category: 'Implementation',
    date: '2024-01-08',
    readingTime: '6 min',
    content: `
## The Uncomfortable Reality

74% of AI projects fail to deliver tangible business value. This isn't a technology problem—it's an execution problem. After working on dozens of AI implementations, I've identified five recurring traps that consistently derail projects.

## Trap #1: Starting with Technology

The most common mistake is leading with "We need to implement AI" instead of "We need to solve this specific problem." Technology-first thinking leads to solutions looking for problems.

**The Fix:** Start with a measurable business outcome. Define success in terms of revenue, cost, or customer impact—not model accuracy.

## Trap #2: Underestimating Data Work

Organizations consistently underestimate the work required to prepare data for AI. The glamorous part is the model; the hard part is everything that comes before.

**The Fix:** Budget 60-70% of your project timeline for data preparation, cleaning, and integration work.

## Trap #3: Pilot Purgatory

Many organizations run successful pilots that never scale. The pilot becomes a permanent state, not a phase.

**The Fix:** Define scaling criteria before starting the pilot. What specific metrics trigger the move to production?

## Trap #4: Ignoring Change Management

AI changes how people work. Technical success means nothing if users don't adopt the system.

**The Fix:** Involve end users from day one. Their feedback shapes both the product and their willingness to use it.

## Trap #5: Measuring the Wrong Things

Model accuracy isn't business value. Many projects celebrate technical metrics while ignoring whether the business outcomes materialized.

**The Fix:** Tie every AI metric back to a business outcome. If you can't draw that line, you're measuring the wrong thing.

## The Path Forward

Avoiding these traps requires discipline more than brilliance. The organizations that succeed with AI aren't necessarily the most technically sophisticated—they're the most strategically focused.
    `,
  },
  'executive-ai-literacy': {
    title: 'Executive AI Literacy: What You Actually Need to Know',
    excerpt:
      'The minimum viable AI knowledge for making informed strategic decisions.',
    category: 'Leadership',
    date: '2024-01-01',
    readingTime: '5 min',
    content: `
## The Executive's Dilemma

You don't need to understand how transformers work to make good AI decisions. But you do need enough literacy to ask the right questions and spot the wrong answers.

## What You Actually Need to Know

### 1. The Difference Between AI Types

Understand the distinction between:
- **Generative AI** (creates content)
- **Predictive AI** (forecasts outcomes)
- **Automation** (follows rules)

Different types solve different problems. Mismatching technology to problem is expensive.

### 2. What AI Can and Cannot Do

AI excels at pattern recognition and content generation at scale. It struggles with novel situations, nuanced judgment, and tasks requiring deep context.

Knowing these boundaries prevents both over-investment and under-investment.

### 3. The Real Costs

AI costs go beyond software licenses:
- Data preparation and integration
- Change management
- Ongoing monitoring and refinement
- Technical debt from rushed implementations

Budget for the full picture.

### 4. The Questions to Ask

When evaluating AI proposals, ask:
- What specific business outcome are we measuring?
- How will we know if this succeeds?
- What happens if it fails?
- Who owns this after implementation?

## The Bottom Line

Executive AI literacy isn't about technical depth—it's about asking better questions and recognizing incomplete answers. That skill is more valuable than any technical certification.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <article className="pb-24" style={{ paddingTop: '12rem' }}>
      <div className="article-container">
        {/* Header */}
        <header className="mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="primary">{article.category}</Badge>
            <span className="text-text-muted text-small">
              {article.readingTime} read
            </span>
          </div>

          <h1 className="text-display-md mb-6">
            {article.title}
          </h1>

          <p className="text-body-lg text-text-secondary mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-text-muted text-small">
            <span>Thor Matthiasson</span>
            <span>•</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* Content */}
        <div className="article-content">
          {renderMarkdown(article.content)}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-text-primary font-semibold mb-1">Thor Matthiasson</p>
              <p className="text-text-muted text-small">
                AI Strategy & Implementation
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/articles" className="btn btn-outline py-2 px-4 text-small">
                More Articles
              </Link>
              <Link href="/#contact" className="btn btn-primary py-2 px-4 text-small">
                Get in Touch
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
