import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Fragment } from 'react';
import { articles } from '@/lib/articles';

function renderInlineText(text: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Links: [text](url)
    const linkMatch = remaining.match(/^([\s\S]*?)\[([^\]]+)\]\(([^)]+)\)([\s\S]*)/);
    if (linkMatch) {
      if (linkMatch[1]) {
        parts.push(...renderInlineFormatting(linkMatch[1], key));
        key += 10;
      }
      parts.push(
        <a key={key++} href={linkMatch[3]} target={linkMatch[3].startsWith('http') ? '_blank' : undefined} rel={linkMatch[3].startsWith('http') ? 'noopener noreferrer' : undefined}>
          {linkMatch[2]}
        </a>
      );
      remaining = linkMatch[4];
      continue;
    }

    parts.push(...renderInlineFormatting(remaining, key));
    break;
  }

  return parts;
}

function renderInlineFormatting(text: string, startKey: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Split on bold (**), italic (*), and inline code (`)
  const regex = /(\*\*.*?\*\*|\*[^*]+?\*|`[^`]+?`)/g;
  let lastIndex = 0;
  let match;
  let key = startKey;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }

    const token = match[1];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return parts;
}

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Horizontal rule
    if (trimmed === '---') {
      elements.push(<hr key={key++} />);
      i++;
      continue;
    }

    // Fenced code block
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre key={key++}><code>{codeLines.join('\n')}</code></pre>
      );
      continue;
    }

    // Highlight callout box ::: highlight ... :::
    if (trimmed.startsWith('::: highlight') || trimmed.startsWith('::: warning')) {
      const variant = trimmed.includes('warning') ? 'warning' : 'highlight';
      const boxLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') {
        boxLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::
      const boxContent = boxLines.join('\n');
      elements.push(
        <div key={key++} className={`article-${variant}`}>
          {renderMarkdown(boxContent)}
        </div>
      );
      continue;
    }

    // H2 heading
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.slice(3);
      const idMatch = headingText.match(/^(.+?)(?:\s*\{#(.+?)\})?$/);
      const id = idMatch?.[2] || headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      elements.push(
        <h2 key={key++} id={id}>{idMatch?.[1] || headingText}</h2>
      );
      i++;
      continue;
    }

    // H3 heading
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key++}>{trimmed.slice(4)}</h3>
      );
      i++;
      continue;
    }

    // Table (GFM)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableRows: string[][] = [];
      let hasHeader = false;

      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const row = lines[i].trim();
        // Check if separator row
        if (row.match(/^\|[\s-:|]+\|$/)) {
          hasHeader = true;
          i++;
          continue;
        }
        const cells = row.split('|').slice(1, -1).map(c => c.trim());
        tableRows.push(cells);
        i++;
      }

      if (tableRows.length > 0) {
        const headerRow = hasHeader ? tableRows[0] : null;
        const bodyRows = hasHeader ? tableRows.slice(1) : tableRows;

        elements.push(
          <div key={key++} className="table-wrapper">
            <table>
              {headerRow && (
                <thead>
                  <tr>
                    {headerRow.map((cell, ci) => (
                      <th key={ci}>{renderInlineText(cell)}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci}>{renderInlineText(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++}>
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{renderInlineText(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (trimmed.startsWith('- ')) {
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
    if (/^\d+\.\s/.test(trimmed)) {
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
    if (trimmed.startsWith('**The Fix:**')) {
      elements.push(
        <div key={key++} className="article-callout">
          {renderInlineText(trimmed)}
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++}>{renderInlineText(trimmed)}</p>
    );
    i++;
  }

  return elements;
}

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
            <span>&bull;</span>
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
