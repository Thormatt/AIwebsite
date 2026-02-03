import { Hero } from '@/components/sections/Hero';
import { ProblemStatement } from '@/components/sections/ProblemStatement';
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
      <ProblemStatement />
      <Solution />
      <Services />
      <Process />
      <Credibility />
      <Articles />
      <CTA />
    </>
  );
}
