import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'warm';
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export function GradientText({
  children,
  variant = 'default',
  className,
  as: Component = 'span',
}: GradientTextProps) {
  const gradientStyles = {
    default: 'gradient-text',
    warm: 'gradient-text-warm',
  };

  return (
    <Component className={cn(gradientStyles[variant], className)}>
      {children}
    </Component>
  );
}
