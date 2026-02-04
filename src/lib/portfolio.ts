export interface PortfolioProject {
  id: string;
  title: string;
  industry: string;
  problem: string;
  impact: string[];
  features: string[];
  solution: string;
  image: string;
  isMobile?: boolean;
  demoUrl?: string;
}

export const projects: PortfolioProject[] = [
  {
    id: 'investment-analysis',
    title: 'Investment Analysis Engine',
    industry: 'Finance / FinTech',
    problem:
      'Institutional-grade equity research requires synthesizing quantitative fundamentals, qualitative intelligence, and macro context \u2014 a process that takes analyst teams days per ticker.',
    impact: [
      'Hybrid quant + qual analysis',
      'Multi-agent orchestration',
      'SEC XBRL + live market data',
    ],
    features: [
      'Deterministic committee scoring (70% weight) ensures reproducible quantitative verdicts',
      'LLM synthesis (30% weight) adds qualitative research from earnings calls, analyst reports, and competitive dynamics',
      'Monte Carlo simulation with macro regime classification for probability-weighted returns',
      'Evidence validation with SHA256 hashes and SEC XBRL cross-checks',
    ],
    solution:
      'A multi-agent system on Microsoft Agent Framework that generates institutional-grade investment reports combining DCF valuation, scenario modeling, options analysis, and AI-powered qualitative research',
    image: '/images/portfolio/investment-analysis.png',
  },
  {
    id: 'olympus-stack',
    title: 'Olympus Stack',
    industry: 'Developer Infrastructure',
    problem:
      'AI-powered development workflows are fragmented across disconnected tools, and connecting many MCP servers creates unsustainable token overhead \u2014 100+ tools consume ~17K tokens before any work begins.',
    impact: [
      '88% token reduction',
      '13 specialized MCPs',
      '200+ tools unified',
    ],
    features: [
      'Gateway pattern routes to 13 MCPs on-demand, cutting token overhead from 17K to 2K',
      'Real infrastructure testing (Colosseum) with Docker-based services \u2014 no mocks',
      'Multi-model consensus (Delphi) reduces hallucination through cross-model validation',
      'Integrated security scanning, code generation, knowledge graphs, and observability',
    ],
    solution:
      'A modular framework of 13 specialized MCP servers orchestrated through a token-efficient gateway \u2014 combining security scanning, multi-model consensus, real integration testing, and AI-powered code generation into one ecosystem',
    image: '/images/portfolio/olympus-stack.png',
  },
  {
    id: 'iceland-signals',
    title: 'Iceland Economic Signals',
    industry: 'Finance / Macroeconomics',
    problem:
      'Iceland\u2019s macroeconomic data is scattered across 235+ Statistics Iceland datasets with no real-time signal layer. Analysts, traders, and policymakers lacked computed indicators tuned to small open economy dynamics.',
    impact: [
      '19 economic signals',
      '87.5% policy accuracy',
      'Real-time MCP delivery',
    ],
    features: [
      '19 professionally-calculated indicators across inflation, labor, trade, housing, and policy',
      '87.5% validated accuracy on Central Bank rate decision predictions (Oct 2024\u2013Oct 2025)',
      'MCP integration gives Claude direct access to real-time Iceland economic conditions',
      'REST API, Streamlit dashboard, and CSV/PDF export for institutional delivery',
    ],
    solution:
      'A signal-based macroeconomic intelligence platform built on FastAPI + FastMCP, transforming raw Statistics Iceland data into actionable indicators with ML-assisted policy probability scoring',
    image: '/images/portfolio/iceland-signals.png',
  },
  {
    id: 'ai-without-the-hype',
    title: 'AI Without the Hype',
    industry: 'Media / Publishing',
    problem:
      'AI coverage is dominated by sensationalism and engagement-driven narratives. Builders and business leaders needed a calm, credible source \u2014 one that could operate autonomously at daily publishing cadence.',
    impact: [
      'Fully autonomous daily publishing',
      'Self-governing editorial board',
      'Hype scoring on every article',
    ],
    features: [
      'Multi-agent editorial board debates coverage and evolves editorial policy',
      'Daily briefings produced end-to-end without manual intervention',
      'Hype scoring system (0\u201310) grades every claim across five dimensions',
      'Transparent attribution: Produced, Orchestrated, or Written',
    ],
    solution:
      'A self-governing AI newsroom with autonomous editorial evolution, RSS monitoring, multi-persona essays, and radical transparency about what\u2019s automated',
    image: '/images/portfolio/aiwithoutthehype.png',
    demoUrl: 'https://aiwithoutthehype.com',
  },
  {
    id: 'esg-compliance',
    title: 'ESG Compliance Automation',
    industry: 'Real Estate / Finance',
    problem:
      'Real estate investment firm facing mandatory CRREM/SECR reporting couldn\u2019t consolidate energy data from 200+ properties. Manual reporting took 6 weeks quarterly and still had errors.',
    impact: [
      '6 wks \u2192 2 days',
      '35M+ data points',
      'Audit-ready compliance',
    ],
    features: [
      'Quarterly reports now take days instead of weeks',
      'Zero manual data entry errors',
      'Investor-ready ESG documentation on demand',
      'Regulatory compliance becomes competitive advantage',
    ],
    solution:
      'Automated data pipeline with multi-source reconciliation and regulatory output formatting',
    image: '/images/portfolio/esg.png',
  },
  {
    id: 'research-intelligence',
    title: 'Research Intelligence',
    industry: 'Professional Services',
    problem:
      'Advisory firm spending 15+ hours per client on market research and competitive analysis, limiting capacity to 3 engagements per month.',
    impact: [
      '85% faster research',
      '5x client capacity',
      '$180K new revenue',
    ],
    features: [
      'Research that took 15 hours now completes in 60 seconds',
      'Cross-source validation eliminates analyst bias',
      'Consistent quality regardless of researcher experience',
      'Freed senior consultants for high-value client work',
    ],
    solution:
      'AI-powered research automation with multi-source synthesis and fact verification',
    image: '/images/portfolio/raven-research.png',
  },
  {
    id: 'survey-platform',
    title: 'Survey Platform',
    industry: 'SaaS / Product Development',
    problem:
      'Needed a full-stack survey platform to demonstrate end-to-end product development \u2014 from database design and real-time analytics to conditional logic engines and multi-channel distribution.',
    impact: [
      '35+ question types',
      'Real-time SSE streaming',
      'AI-powered generation',
    ],
    features: [
      'Conditional logic engine with skip rules, branching, answer piping, and carry-forward',
      'Real-time response streaming via Server-Sent Events with live dashboard updates',
      'AI survey generation from text prompts via OpenRouter integration',
      'Multi-channel distribution: email invitations, embeddable widgets, public links, QR codes',
    ],
    solution:
      'Full-stack Next.js 16 SaaS application with Prisma, PostgreSQL, Clerk auth, and integrations across Resend, Slack, and webhooks \u2014 49K LOC across 96 files',
    image: '/images/portfolio/survey-tool.png',
  },
  {
    id: 'ranking-risk',
    title: 'Ranking Risk Monitor',
    industry: 'E-commerce / Retail',
    problem:
      'E-commerce site lost 40% of traffic overnight due to undetected technical SEO issue. Marketing team had no early warning system and discovered problem only after revenue dropped.',
    impact: [
      '48hr early warning',
      '$200K+ protected revenue',
      '90% less monitoring time',
    ],
    features: [
      'Proactive alerts before revenue impact',
      'AI interprets anomalies in business terms',
      'Marketing team can act without technical support',
      'Weekly exec summaries automate reporting',
    ],
    solution:
      'AI-powered anomaly detection with automated business impact assessment',
    image: '/images/portfolio/seo-1.png',
    demoUrl:
      'https://script.google.com/a/macros/svartigaldur.is/s/AKfycby74-fzJmZIdS5lZrnfIDP-MfurQV74W2rDKy5o_jtVzKxJ5ZI0PfbtD25aC-CAdtY/exec',
  },
  {
    id: 'revenue-intelligence',
    title: 'Revenue Intelligence',
    industry: 'Tourism / Hospitality',
    problem:
      'Hotel group making pricing decisions based on gut feel and lagging indicators. Revenue management was reactive instead of predictive.',
    impact: [
      'Predictive analytics',
      'Data-driven pricing',
      'RevPAR visibility',
    ],
    features: [
      'Booking pace analysis predicts demand shifts',
      'Revenue managers act before problems materialize',
      'YoY comparisons at multiple timeframes',
      'Executive dashboards update in real-time',
    ],
    solution:
      'Predictive analytics platform with momentum scoring and forward booking trends',
    image: '/images/portfolio/booking-analytics.png',
  },
  {
    id: 'carbon-strategy',
    title: 'Carbon Strategy Simulator',
    industry: 'Sustainability Consulting',
    problem:
      'Sustainability consultancy needed a way to generate inbound leads and shorten a 6+ month sales cycle. CFOs wouldn\u2019t take a call until they could see the business case for themselves.',
    impact: [
      '40% shorter sales cycle',
      '300% more inbound leads',
      'Self-qualifying prospects',
    ],
    features: [
      'Prospects model their own carbon reduction scenarios before any sales contact',
      'CFOs see financial ROI in their specific context \u2014 no pitch deck required',
      'Lead qualification happens automatically based on engagement depth',
      'High-intent prospects arrive pre-sold on the business case',
    ],
    solution:
      'An interactive lead-generation tool disguised as an ROI simulator \u2014 prospects sell themselves on the business case, then book the call',
    image: '/images/portfolio/realintelligence.png',
    demoUrl: 'https://realintelligence.app',
  },
  {
    id: 'content-scale',
    title: 'Content Scale Engine',
    industry: 'Tourism / Hospitality',
    problem:
      'Tourism company producing 4 blog posts/month couldn\u2019t compete with larger competitors dominating search results. Content team was bottleneck to growth.',
    impact: [
      '10x content velocity',
      '40% organic traffic lift',
      'Brand voice at scale',
    ],
    features: [
      'Content production no longer blocks marketing goals',
      'Real-time trending topic integration keeps content relevant',
      'Non-technical staff can operate independently',
      'Quality controls prevent off-brand content',
    ],
    solution:
      'AI content generation with brand voice training and editorial workflow integration',
    image: '/images/portfolio/article-generator.png',
    demoUrl:
      'https://script.google.com/a/macros/svartigaldur.is/s/AKfycby0RyhNQG17nJHxCaVSdrbn6JQmgqScfvGuZwl7wBygAnKUEZNhLLapvobM7HbOVJq8OQ/exec',
  },
  {
    id: 'secure-ai',
    title: 'Secure AI Deployment',
    industry: 'Legal / Healthcare / Finance',
    problem:
      'Professional services firm wanted AI productivity gains but couldn\u2019t use cloud AI due to client confidentiality requirements and regulatory constraints.',
    impact: [
      '100% data privacy',
      '30% productivity gain',
      'Full regulatory compliance',
    ],
    features: [
      'AI benefits without compliance risk',
      'Sensitive documents never leave premises',
      'Role-based access controls audit trail',
      'Client confidentiality fully preserved',
    ],
    solution:
      'On-premises AI deployment with enterprise security controls and document analysis capabilities',
    image: '/images/portfolio/local-chat.png',
  },
  {
    id: 'daolight',
    title: 'Daolight',
    industry: 'Consumer Mobile',
    problem:
      'Design and ship an iOS app demonstrating habit-loop psychology and daily engagement mechanics \u2014 concepts applied to enterprise AI adoption strategies.',
    impact: [
      'Daily triggers drive adoption',
      'Low-friction UX boosts retention',
      'Progressive disclosure reduces overwhelm',
    ],
    features: [
      'Push notification timing optimized for engagement',
      'Personalization through preference learning',
      'Habit loop design (cue \u2192 routine \u2192 reward)',
      'Minimalist UX reduces cognitive load',
    ],
    solution:
      'These engagement principles apply directly to enterprise AI tool adoption \u2014 the same psychology drives user adoption of internal AI systems',
    image: '/images/portfolio/daolight.png',
  },
];
