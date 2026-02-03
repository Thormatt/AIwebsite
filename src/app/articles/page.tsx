import type { Metadata } from 'next';
import { ArticlesHero } from './components/ArticlesHero';
import { ArticlesGrid } from './components/ArticlesGrid';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Insights on AI strategy, implementation, and executive decision-making from Thor Matthiasson.',
};

export default function ArticlesPage() {
  return (
    <>
      <ArticlesHero />
      <ArticlesGrid />
    </>
  );
}
