import type { Metadata } from 'next';
import { ServicesHero } from './components/ServicesHero';
import { DiscoveryAssessment } from './components/DiscoveryAssessment';
import { FractionalAdvisor } from './components/FractionalAdvisor';
import { FAQ } from './components/FAQ';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI strategy and implementation services. Executive AI Assessment and Fractional AI Lead offerings for executives.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <DiscoveryAssessment />
      <FractionalAdvisor />
      <FAQ />
      <CTA />
    </>
  );
}
