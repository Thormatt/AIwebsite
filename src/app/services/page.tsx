import type { Metadata } from 'next';
import { ServicesHero } from './components/ServicesHero';
import { DiscoveryAssessment } from './components/DiscoveryAssessment';
import { ProductionWorkflow } from './components/ProductionWorkflow';
import { FractionalAdvisor } from './components/FractionalAdvisor';
import { FAQ } from './components/FAQ';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI strategy and implementation services. AI Value + Risk Brief, Production Workflow Launch, and Fractional Head of AI Delivery for executives.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <DiscoveryAssessment />
      <ProductionWorkflow />
      <FractionalAdvisor />
      <FAQ />
      <CTA />
    </>
  );
}
