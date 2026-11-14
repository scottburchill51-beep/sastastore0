export type Course = {
  slug: string;
  title: string;
  category: string;
  description: string;
  accent: string;
  imageUrl: string;
};

export const courseSourceUrl = "https://paktools.store/courses";

export const courses: Course[] = [
  {
    slug: "chatgpt-advanced-prompt-engineering",
    title: "ChatGPT 6 & Advanced Prompt Engineering — Complete Masterclass (2026 Updated Edition)",
    category: "AI & Automation",
    description: "Full step-by-step video training in Urdu/Hindi and English, with downloadable project files.",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-1.jpg",
  },
  {
    slug: "faceless-youtube-automation",
    title: "Faceless YouTube Automation Cash Cow Channels — Complete Masterclass (2026 Updated Edition)",
    category: "YouTube Automation",
    description: "Learn faceless channel concepts, content planning and YouTube production workflows.",
    accent: "from-red-500/20 via-orange-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-12.jpg",
  },
  {
    slug: "tiktok-shop-dropshipping-affiliate",
    title: "TikTok Shop UK & USA Dropshipping & Affiliate — Complete Masterclass (2026 Updated Edition)",
    category: "Shopify, Amazon & TikTok Shop",
    description: "Explore TikTok Shop, product promotion and affiliate business workflows.",
    accent: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-23.jpg",
  },
  {
    slug: "fiverr-gig-ranking-seo",
    title: "Fiverr Gig Ranking, SEO & Top-Rated Seller Blueprint — Complete Masterclass (2026 Updated Edition)",
    category: "Fiverr & Upwork Freelancing",
    description: "Explore freelance profile positioning, gig presentation and marketplace search basics.",
    accent: "from-green-500/20 via-lime-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-34.jpg",
  },
  {
    slug: "meta-ads-pixel-roas-scaling",
    title: "Meta Ads (Facebook & Instagram) Pixel & ROAS Scaling — Complete Masterclass (2026 Updated Edition)",
    category: "Meta, TikTok & Google Ads",
    description: "Learn social advertising fundamentals, campaign planning and performance measurement.",
    accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-45.jpg",
  },
  {
    slug: "semrush-ahrefs-keyword-research",
    title: "SEMrush & Ahrefs Low-Competition Keyword Research — Complete Masterclass (2026 Updated Edition)",
    category: "SEO & Blogging",
    description: "Explore keyword research, search intent and content planning for search engines.",
    accent: "from-orange-500/20 via-amber-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-56.jpg",
  },
  {
    slug: "capcut-viral-reels-shorts-editing",
    title: "CapCut PC & Mobile Pro Viral Reels & Shorts Editing — Complete Masterclass (2026 Updated Edition)",
    category: "Video Editing & VFX",
    description: "Discover short-form video editing concepts for Reels, Shorts and social content.",
    accent: "from-violet-500/20 via-purple-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-67.jpg",
  },
  {
    slug: "canva-brand-kit-social-media",
    title: "Canva Pro Brand Kit, Social Media & Presentation Mastery — Complete Masterclass (2026 Updated Edition)",
    category: "Graphic Design & UI/UX",
    description: "Explore brand kits, social media layouts and presentation design using Canva.",
    accent: "from-cyan-500/20 via-sky-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-78.jpg",
  },
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development (HTML, CSS, JavaScript, Node) — Complete Masterclass (2026 Updated Edition)",
    category: "Web Dev, Python & Coding",
    description: "A broad introduction to front-end foundations and server-side web development concepts.",
    accent: "from-sky-500/20 via-blue-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-89.jpg",
  },
  {
    slug: "excel-advanced-formulas-pivot-vba",
    title: "Microsoft Excel Advanced Formulas, Pivot Tables & VBA — Complete Masterclass (2026 Updated Edition)",
    category: "Excel, Data & IELTS",
    description: "Explore spreadsheet formulas, pivot tables and productivity-focused Excel features.",
    accent: "from-emerald-500/20 via-green-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-122.jpg",
  },
  {
    slug: "google-veo-ai-video-filmmaking",
    title: "Google VEO 3 Ultra AI Video Filmmaking — Complete Masterclass (2026 Updated Edition)",
    category: "AI & Automation",
    description: "Explore AI-assisted video ideas, prompt-led creative workflows and video production concepts.",
    accent: "from-indigo-500/20 via-violet-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-2.jpg",
  },
  {
    slug: "youtube-high-cpm-niche-selection",
    title: "High-CPM USA & UK YouTube Niche Selection — Complete Masterclass (2026 Updated Edition)",
    category: "YouTube Automation",
    description: "Learn about audience research, niche evaluation and planning a YouTube content strategy.",
    accent: "from-rose-500/20 via-red-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-13.jpg",
  },
  {
    slug: "shopify-local-dropshipping-pakistan",
    title: "Shopify Local Dropshipping Pakistan (COD Mastery) — Complete Masterclass (2026 Updated Edition)",
    category: "Shopify, Amazon & TikTok Shop",
    description: "Explore the basics of setting up an online store and planning a local e-commerce workflow.",
    accent: "from-lime-500/20 via-emerald-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-24.jpg",
  },
  {
    slug: "upwork-winning-proposals-client-closing",
    title: "Upwork Winning Proposals & High-Ticket Client Closing — Complete Masterclass (2026 Updated Edition)",
    category: "Fiverr & Upwork Freelancing",
    description: "Explore proposal writing, client communication and presenting freelance services professionally.",
    accent: "from-teal-500/20 via-cyan-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-35.jpg",
  },
  {
    slug: "tiktok-ads-manager-ugc-creatives",
    title: "TikTok Ads Manager & Viral UGC Ad Creatives — Complete Masterclass (2026 Updated Edition)",
    category: "Meta, TikTok & Google Ads",
    description: "Explore TikTok campaign basics, creative planning and user-generated-content ad formats.",
    accent: "from-pink-500/20 via-fuchsia-500/10 to-transparent",
    imageUrl: "https://paktools.store/topic-46.jpg",
  },
];

export const courseCategories = [
  "All Courses",
  ...Array.from(new Set(courses.map((course) => course.category))),
];
