// All of the site's words live in this file.
// Edit text here, save, and the page updates. You never need to touch the layout files to change content.

export const profile = {
  name: 'You Wu',
  firstName: 'Mia',
  initials: 'YW',
  status: 'Open to analyst roles from January 2027',
  headline: "Hi, I'm Mia. I turn messy data into decisions, and ideas into working AI tools.",
  intro:
    'Business Analytics graduate student at the University of Illinois, with a finance background and a habit of building the tools I wish existed.',
  // Put your photo in /public (for example /public/photo.jpg) and set photo: 'photo.jpg'.
  // Leave it empty to show your initials instead.
  photo: 'photo.jpg',
  glance: [
    { label: 'Major, University of Illinois', value: 'M.S. Business Analytics', wide: true },
    { label: 'GPA', value: '3.95/4.0' },
    { label: 'Available from', value: 'Jan 2027' },
    { label: 'Based in', value: 'Chicago, open to relocation', wide: true },
  ],
};

export const links = {
  // Put your resume PDF in /public with this exact name.
  resume: 'You_Wu_Resume.pdf',
  linkedin: 'https://www.linkedin.com/in/you-wu-uiuc',
  github: 'https://github.com/kiwi9t',
  email: 'youwu66@outlook.com',
  // Paste your Formspree form URL here (for example https://formspree.io/f/abcdwxyz).
  // While it is empty, "Send message" opens the visitor's email app instead.
  formEndpoint: 'https://formspree.io/f/mvkaldwy',
};

export const about = [
  'I like working where AI meets business: finding what really moves the numbers, then building small AI agents that put the answer to work.',
  'What I enjoy most is taking a product from 0 to 1 and watching a user reach their "aha" moment. I\'m looking for Business, Data, Product, or Program Analyst roles.',
];

export const education = [
  {
    school: 'University of Illinois Urbana-Champaign',
    degree: 'M.S. Business Analytics (STEM), Gies College of Business',
    meta: 'Expected Dec 2026, GPA 3.95/4.0',
    note: 'Professional Development Scholarship',
  },
  {
    school: 'Zhongnan University of Economics and Law',
    degree: 'B.Econ. Finance, Wuhan, China',
    meta: 'Jun 2025, GPA 3.86/4.0',
    note: '2nd Prize University Scholarship',
  },
];

export type Item = {
  id: string;
  title: string;
  org?: string;
  kind?: string;
  dates?: string;
  summary: string;
  tags: string[];
  bullets: string[];
  cats?: string[];
  link?: string;
  // Optional screenshot in /public, for example 'projects/quiet-reader.png'.
  image?: string;
};

// A role whose dates contain "Present" gets a green dot; past roles get a grey dot.
export const experience: Item[] = [
  {
    id: 'ta',
    title: 'Teaching Assistant, BADM 372 IS/OM Practicum',
    org: 'University of Illinois Urbana-Champaign',
    dates: 'Sep 2026 – Present',
    summary: 'Project manager for 2 student software teams; led a hosting migration study from Render to Vercel and Supabase.',
    tags: ['Project Management'],
    bullets: [
      'Act as project manager for student teams on 2 semester-long software projects, tracking milestones in GitHub Issues and keeping teams on schedule for demos.',
      'Led a hosting migration study at the instructor’s request, testing a move from Render to Vercel and Supabase to cut slow startup times, then reported trade-offs and recommendations.',
      'Hold office hours on development and deployment issues and write step-by-step troubleshooting guides for beginner students.',
    ],
  },
  {
    id: 'lead',
    title: 'AI Solution Consultant',
    org: 'Chicago LEAD, student consulting program at UIUC',
    dates: 'Feb 2026 – Present',
    summary: 'Co-built a prototype AI tool that drafts blog posts in a client’s brand voice, trialed by the client team.',
    tags: ['LLM Agents', 'Client Communication'],
    bullets: [
      'Co-built a prototype AI tool that generates first-draft blog content from a topic and brand-voice guidelines, trialed by the client team.',
      'Owned client-facing delivery: meetings, agendas, decision logs, and deliverable tracking to keep a non-technical client aligned.',
    ],
  },
  {
    id: 'torras',
    title: 'Marketing Analyst Intern',
    org: 'TORRAS, Shenzhen',
    dates: 'Apr 2025 – Jul 2025',
    summary: 'Scaled creator collaborations from 6 to 15+ per month and lifted Meta Ads CTR 10% through A/B tests.',
    tags: ['A/B Testing', 'Excel'],
    bullets: [
      'Sourced 200+ U.S. creators per month across YouTube, Instagram, and TikTok with an Excel scoring workflow, collaborating with 30+ each month.',
      'Ran A/B tests on Meta Ads video creatives and shifted budget toward the winners, lifting CTR by 10%.',
      'Standardized creator selection criteria, scaling monthly collaborations from 6 to 15+.',
    ],
  },
  {
    id: 'qianhai',
    title: 'Industry Analyst Assistant',
    org: 'Qianhai Weigang Capital Fund, Shenzhen',
    dates: 'Jan 2024 – Feb 2024',
    summary: 'Analyzed 50+ annual reports for a 17-page autonomous-driving sector report.',
    tags: ['Research'],
    bullets: [
      'Analyzed 50+ company annual reports to map the autonomous-driving value chain, market size, and competitive risks.',
      'Supported a 17-page industry report and presentation for senior investment staff.',
    ],
  },
];

// The filter buttons above the projects. "All" is added automatically.
export const projectCategories = ['Data', 'AI', 'Product', 'Marketing', 'Finance'];

// The first project that matches the current filter is shown large.
export const projects: Item[] = [
  {
    id: 'qr',
    title: 'Quiet Reader',
    kind: 'Personal project, 2026',
    cats: ['AI', 'Product'],
    link: 'https://github.com/kiwi9t/Quite-Reader',
    summary:
      'An AI reading companion that gives second-language readers spoiler-safe vocabulary previews before each chapter. Live in the browser, no install needed.',
    tags: ['LLM Agents', 'TypeScript'],
    bullets: [
      'Designed a 3-agent LLM workflow (profiler, chapter parser, spoiler-safe context generator), processing 47 chapters across 4 books.',
      'Added guardrails (schema validation, automatic retries, spoiler checks) so every model output stays structured and usable.',
      'Released it open source, then deployed the frontend on Vercel and the backend on Railway so anyone can try it.',
    ],
  },
  {
    id: 'awg',
    title: 'Retail Program Impact',
    kind: 'Business practicum, 2025',
    cats: ['Data', 'Marketing'],
    summary: 'Do retail programs actually lift new-product sales? A store-level analysis for a grocery wholesaler.',
    tags: ['SQL', 'Python', 'Regression'],
    bullets: [
      'Joined store, product, program, and sales tables in SQL into one validated store-level dataset.',
      'Used regression with interaction terms in Python to see how program effects differed by brand, division, and category.',
      'Recommended selective, category-specific deployment with a pilot, and presented it to the client.',
    ],
  },
  {
    id: 'pjm',
    title: 'Dynamic Electricity Pricing',
    kind: 'Research paper, first author, 2026',
    cats: ['Data', 'Finance'],
    summary: 'A day-ahead load forecast (MAPE 2.73%) and a bounded pricing rule that cut simulated peak demand 12.5%.',
    tags: ['Python', 'XGBoost', 'Research'],
    bullets: [
      'Cleaned and merged 25,990 hourly records of grid load, weather, and day-ahead prices.',
      'Built a 24-hour-ahead XGBoost forecast with a strict time-based train/test split.',
      'Simulated a three-tier pricing rule: peak demand down 12.5% vs. flat rate, bills down 11.7% vs. time-of-use. Presented at SIEDS.',
    ],
  },
  {
    id: 'usdt',
    title: 'USDT Systemic Risk Monitor',
    kind: 'Course project, 2025',
    cats: ['Data', 'Finance'],
    summary: 'A Dune dashboard over millions of Ethereum logs, finding whale trades often exceed 80% of daily volume.',
    tags: ['SQL', 'Dashboard'],
    bullets: [
      'Defined 4 risk KPIs for Tether, including pool imbalance and trade slippage in basis points.',
      'Built the dashboard in SQL with CTEs and window functions.',
      'Segmented volume by trade size, challenging the assumption that flows are retail-driven.',
    ],
  },
];

// A skill that also appears in an Experience or Project "tags" list becomes a clickable filter.
export const skillGroups = [
  { name: 'Data & analytics', skills: ['Python', 'SQL', 'R', 'Stata', 'Excel', 'Regression', 'A/B Testing', 'XGBoost'] },
  { name: 'AI & building', skills: ['LLM Agents', 'Prompt Engineering', 'TypeScript', 'React', 'Node.js'] },
  { name: 'Product & business', skills: ['Project Management', 'Client Communication', 'Research', 'Dashboard', 'MVP Scoping'] },
  { name: 'Tools & languages', skills: ['Notion', 'Figma', 'Dune', 'English', 'Mandarin'] },
];

export const certifications = ['AI Agents Fundamentals, Hugging Face (2026)'];

// icon: 'film' | 'code' | 'plus'
export const interests = [
  { icon: 'film', title: 'Horror films', text: 'A genuine fan, and curious about how they’re made.' },
  { icon: 'code', title: 'Weekend AI builds', text: 'Vibe-coding small agents just to see what works.' },
];

export const contact = {
  heading: "Let's talk",
  text: 'Hiring for an analyst role, or working on something interesting? Send a note or grab my resume.',
};

export const lastUpdated = 'November 2026';
