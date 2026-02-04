'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How do I know which service is right for me?',
    answer:
      'Start with the AI Value + Risk Brief if you need clarity on where you stand and what to do next. If you have a specific workflow ready to ship, the Production Workflow Launch gets it live in 6–8 weeks. The Fractional Head of AI Delivery is ideal if you need ongoing strategic guidance, governance, and implementation oversight.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'I work across industries with a focus on mid-market and enterprise companies. My experience spans financial services, healthcare, manufacturing, and technology sectors. The principles of AI strategy and implementation are broadly applicable — what matters most is your commitment to execution.',
  },
  {
    question: 'Can you help with specific AI tools or vendors?',
    answer:
      'Yes. I provide vendor-agnostic guidance on AI platforms, tools, and service providers. This includes technical evaluation, contract review support, and implementation planning. I don\'t take referral fees or have vendor partnerships — my recommendations are based solely on what\'s right for your situation.',
  },
  {
    question: 'What does the AI Value + Risk Brief include?',
    answer:
      'The 10-business-day AI Value + Risk Brief includes stakeholder interviews, data readiness evaluation, capability gap analysis, reference architecture, ROI modeling, governance mapping, and a prioritized roadmap. You receive nine exec-ready deliverables including an executive summary, detailed findings report, and 90-day action plan.',
  },
  {
    question: 'How much hands-on work is involved?',
    answer:
      'It depends on what you need. I can be as hands-on as joining technical reviews and writing requirements, or as strategic as reviewing decisions and preparing leadership presentations. Most Fractional Head of AI Delivery engagements involve 8-12 hours per week, scaled to your needs.',
  },
  {
    question: 'What kind of workflow do you typically ship first?',
    answer:
      'It depends on where the highest ROI sits. Common first workflows include document processing pipelines, customer support triage, internal knowledge search, and agentic reporting workflows. During the Workflow Selection phase, we score candidates on business impact, data readiness, and integration complexity to pick the right one.',
  },
  {
    question: 'What makes your approach different?',
    answer:
      'I stay through delivery. Strategy only matters if it ships, so I help executive teams align and then build the first system with them.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.faq-title',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.faq-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section bg-bg-secondary">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="faq-title text-display-md text-text-primary mb-4">
            Common <span className="text-accent">Questions</span>
          </h2>
          <p className="text-body-lg text-text-secondary">
            Answers to the questions I hear most often.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                'faq-item border border-border overflow-hidden transition-colors',
                openIndex === index ? 'bg-bg-tertiary border-accent' : 'bg-bg-primary'
              )}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-tertiary transition-colors"
              >
                <span className="text-body-lg font-medium text-text-primary pr-4">
                  {faq.question}
                </span>
                <svg
                  className={cn(
                    'w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300',
                    openIndex === index && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300',
                  openIndex === index
                    ? 'grid-rows-[1fr]'
                    : 'grid-rows-[0fr]'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    <p className="text-body text-text-primary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
