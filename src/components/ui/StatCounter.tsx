'use client';

import { useCounter } from '@/hooks/useGSAP';
import { cn } from '@/lib/utils';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  source?: string;
  sourceUrl?: string;
  highlight?: boolean;
  className?: string;
}

export function StatCounter({
  value,
  suffix = '',
  label,
  source,
  sourceUrl,
  highlight = false,
  className,
}: StatCounterProps) {
  const counterRef = useCounter(value, 2, suffix);

  return (
    <div
      className={cn(
        'glass-card p-6 text-center',
        highlight && 'border-border-glow shadow-glow-sm',
        className
      )}
    >
      <div className="flex items-baseline justify-center gap-1">
        <span
          ref={counterRef as React.RefObject<HTMLSpanElement>}
          className={cn(
            'text-4xl md:text-5xl font-bold',
            highlight ? 'gradient-text' : 'text-text-primary'
          )}
        >
          0
        </span>
        {suffix && (
          <span
            className={cn(
              'text-2xl md:text-3xl font-semibold',
              highlight ? 'text-accent-from' : 'text-text-secondary'
            )}
          >
            {suffix}
          </span>
        )}
      </div>
      <p className="text-text-secondary text-sm mt-2">{label}</p>
      {source && (
        <p className="text-text-muted text-xs mt-2">
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              Source: {source}
            </a>
          ) : (
            `Source: ${source}`
          )}
        </p>
      )}
    </div>
  );
}
