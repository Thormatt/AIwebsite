import type { Metadata } from 'next';
import { PortfolioHero } from './components/PortfolioHero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'AI case studies that delivered measurable business outcomes — from research automation to ESG compliance and revenue intelligence.',
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <CTA />
    </>
  );
}
