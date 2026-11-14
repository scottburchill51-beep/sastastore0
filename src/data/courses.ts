export type Course = {
  slug: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  lessons: number;
  originalPrice: string;
  rating: string;
};

export const courseSourceUrl = "https://paktools.store/courses";

export const courses: Course[] = [
  { slug: "chatgpt-prompt-engineering", title: "ChatGPT 6 & Advanced Prompt Engineering — Complete Masterclass (2026 Updated Edition)", category: "AI & Automation", description: "Practical ChatGPT workflows, advanced prompt writing and ways to use AI tools effectively.", duration: "21 hours", lessons: 45, originalPrice: "Rs. 10,000", rating: "4.9" },
  { slug: "faceless-youtube-automation", title: "Faceless YouTube Automation Cash Cow Channels — Complete Masterclass (2026 Updated Edition)", category: "YouTube Automation", description: "Plan faceless channels, research content ideas and understand repeatable video production workflows.", duration: "28 hours", lessons: 58, originalPrice: "Rs. 12,500", rating: "4.9" },
  { slug: "tiktok-shop-dropshipping", title: "TikTok Shop UK & USA Dropshipping & Affiliate — Complete Masterclass (2026 Updated Edition)", category: "E-commerce", description: "An introduction to TikTok Shop, product promotion, dropshipping and affiliate workflows.", duration: "35 hours", lessons: 71, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "meta-ads-scaling", title: "Meta Ads (Facebook & Instagram) Pixel & ROAS Scaling — Complete Masterclass (2026 Updated Edition)", category: "Digital Marketing", description: "Understand Meta advertising, campaign setup, measurement, pixels and performance analysis.", duration: "49 hours", lessons: 97, originalPrice: "Rs. 12,500", rating: "4.9" },
  { slug: "semrush-ahrefs-keyword-research", title: "SEMrush & Ahrefs Low-Competition Keyword Research — Complete Masterclass (2026 Updated Edition)", category: "SEO & Blogging", description: "Explore keyword research, search intent, competitor analysis and content planning.", duration: "18 hours", lessons: 110, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "capcut-reels-shorts-editing", title: "CapCut PC & Mobile Pro Viral Reels & Shorts Editing — Complete Masterclass (2026 Updated Edition)", category: "Video Editing", description: "Learn short-form video editing concepts for Reels, Shorts and social media content.", duration: "25 hours", lessons: 38, originalPrice: "Rs. 10,000", rating: "4.9" },
  { slug: "canva-brand-kit-design", title: "Canva Pro Brand Kit, Social Media & Presentation Mastery — Complete Masterclass (2026 Updated Edition)", category: "Graphic Design", description: "Explore brand kits, social media layouts and presentation design using Canva.", duration: "32 hours", lessons: 51, originalPrice: "Rs. 12,500", rating: "4.9" },
  { slug: "full-stack-web-development", title: "Full-Stack Web Development (HTML, CSS, JavaScript, Node) — Complete Masterclass (2026 Updated Edition)", category: "Web Development", description: "A broad introduction to front-end foundations and server-side web development concepts.", duration: "39 hours", lessons: 64, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "excel-advanced-formulas", title: "Microsoft Excel Advanced Formulas, Pivot Tables & VBA — Complete Masterclass (2026 Updated Edition)", category: "Excel & Productivity", description: "Explore spreadsheet formulas, pivot tables, VBA and productivity-focused Excel features.", duration: "22 hours", lessons: 103, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "google-veo-ai-filmmaking", title: "Google VEO 3 Ultra AI Video Filmmaking — Complete Masterclass (2026 Updated Edition)", category: "AI & Automation", description: "Explore AI-assisted video ideas, prompt-led creative workflows and video production concepts.", duration: "29 hours", lessons: 116, originalPrice: "Rs. 15,000", rating: "4.9" },
  { slug: "youtube-niche-selection", title: "High-CPM USA & UK YouTube Niche Selection — Complete Masterclass (2026 Updated Edition)", category: "YouTube Automation", description: "Learn audience research, niche evaluation and planning a YouTube content strategy.", duration: "36 hours", lessons: 44, originalPrice: "Rs. 10,000", rating: "4.9" },
  { slug: "shopify-local-dropshipping", title: "Shopify Local Dropshipping Pakistan (COD Mastery) — Complete Masterclass (2026 Updated Edition)", category: "E-commerce", description: "Explore the basics of setting up an online store and planning a local e-commerce workflow.", duration: "43 hours", lessons: 57, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "upwork-proposals-client-communication", title: "Upwork Winning Proposals & High-Ticket Client Closing — Complete Masterclass (2026 Updated Edition)", category: "Freelancing", description: "Explore proposal writing, client communication and presenting freelance services professionally.", duration: "50 hours", lessons: 70, originalPrice: "Rs. 15,000", rating: "4.9" },
  { slug: "tiktok-ads-ugc-creatives", title: "TikTok Ads Manager & Viral UGC Ad Creatives — Complete Masterclass (2026 Updated Edition)", category: "Digital Marketing", description: "Explore TikTok campaign basics, creative planning and user-generated-content ad formats.", duration: "19 hours", lessons: 83, originalPrice: "Rs. 10,000", rating: "4.9" },
  { slug: "google-adsense-blogging", title: "Google AdSense Approval & High-CPC Niche Blogging — Complete Masterclass (2026 Updated Edition)", category: "SEO & Blogging", description: "Learn blogging fundamentals, content planning and website monetization concepts.", duration: "26 hours", lessons: 96, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "adobe-premiere-commercial-editing", title: "Adobe Premiere Pro CC Complete Commercial Editing — Complete Masterclass (2026 Updated Edition)", category: "Video Editing", description: "Explore professional video editing workflows, timelines, transitions and commercial content production.", duration: "33 hours", lessons: 109, originalPrice: "Rs. 15,000", rating: "4.9" },
  { slug: "figma-ui-ux-design", title: "Figma Complete UI/UX Web & Mobile App Design — Complete Masterclass (2026 Updated Edition)", category: "Graphic Design", description: "Learn interface design concepts for websites and mobile apps using Figma.", duration: "40 hours", lessons: 37, originalPrice: "Rs. 10,000", rating: "4.9" },
  { slug: "python-automation-scripting", title: "Python Complete Zero-to-Hero & Automation Scripting — Complete Masterclass (2026 Updated Edition)", category: "Web Development", description: "Explore Python programming foundations and beginner-friendly automation scripting.", duration: "47 hours", lessons: 50, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "power-bi-business-dashboards", title: "Microsoft Power BI Interactive Business Dashboards — Complete Masterclass (2026 Updated Edition)", category: "Excel & Productivity", description: "Learn data visualization concepts and how to organize information into interactive business dashboards.", duration: "30 hours", lessons: 89, originalPrice: "Rs. 15,000", rating: "4.8" },
  { slug: "fiverr-freelancing-basics", title: "Fiverr Gig Ranking, SEO & Top-Rated Seller Blueprint — Complete Masterclass (2026 Updated Edition)", category: "Freelancing", description: "Explore freelance profile positioning, gig presentation and marketplace search basics.", duration: "Course details to confirm", lessons: 0, originalPrice: "Free", rating: "—" },
];

export const courseCategories = [
  "All Courses",
  ...Array.from(new Set(courses.map((course) => course.category))),
];
