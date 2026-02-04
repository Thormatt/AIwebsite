import { Hero } from '@/components/sections/Hero';
import { ValueBrief } from '@/components/sections/ValueBrief';
import { Solution } from '@/components/sections/Solution';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Credibility } from '@/components/sections/Credibility';
import { Articles } from '@/components/sections/Articles';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueBrief />
      <Solution />
      <Services />
      <Process />
      <Credibility />
      <Articles />
      <CTA />
    </>
  );
}
