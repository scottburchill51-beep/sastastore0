import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    category: "ai-tools",
    shortDescription: "Premium ElevenLabs credit packages.",
    description:
      "Choose between 100k and 130k ElevenLabs credit packages according to your requirements.",
    logo: "/products/elevenlabs/logo.webp",
    coverImage: "/products/elevenlabs/cover.webp",
    plans: [
      {
        id: "100k-credits",
        name: "100k Credits",
        price: 2349,
      },
      {
        id: "130k-credits",
        name: "130k Credits",
        price: 2549,
      },
    ],
    features: [
      "Multiple credit options",
      "Digital delivery",
      "WhatsApp order support",
    ],
    availability: "available",
    featured: true,
    popular: true,
    badge: "Popular",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order ElevenLabs from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "ElevenLabs Credits in Pakistan | SastaStore",
      description:
        "Buy ElevenLabs premium credit packages at affordable prices from SastaStore.",
    },
  },

  {
    name: "CapCut Pro",
    slug: "capcut-pro",
    category: "design-creative",
    shortDescription: "CapCut Pro with weekly, monthly and 6-month options.",
    description:
      "Get CapCut Pro premium access with flexible weekly, monthly and 6-month plans.",
    logo: "/products/capcut-pro/logo.webp",
    coverImage: "/products/capcut-pro/cover.webp",
    plans: [
      {
        id: "weekly",
        name: "Weekly",
        duration: "1 Week",
        price: 190,
      },
      {
        id: "monthly",
        name: "Monthly",
        duration: "1 Month",
        price: 750,
      },
      {
        id: "6-months",
        name: "6 Months",
        duration: "6 Months",
        price: 3300,
      },
    ],
    features: [
      "Premium video editing access",
      "Multiple plan options",
      "Digital delivery",
    ],
    availability: "available",
    featured: true,
    popular: true,
    badge: "Popular",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order CapCut Pro from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "CapCut Pro Subscription in Pakistan | SastaStore",
      description:
        "Buy CapCut Pro weekly, monthly and 6-month plans from SastaStore.",
    },
  },

  {
    name: "Canva Pro",
    slug: "canva-pro",
    category: "design-creative",
    shortDescription: "Canva Pro yearly access through invite.",
    description:
      "Get Canva Pro access through invite with a yearly plan.",
    logo: "/products/canva-pro/logo.webp",
    coverImage: "/products/canva-pro/cover.webp",
    plans: [
      {
        id: "yearly-invite",
        name: "Yearly Invite",
        duration: "1 Year",
        price: 350,
      },
    ],
    features: [
      "Yearly access",
      "Invite-based activation",
      "Digital delivery",
    ],
    availability: "available",
    featured: true,
    popular: true,
    badge: "Best Seller",
    deliveryInfo: "Access is provided through invite.",
    whatsappMessage:
      "Hello, I want to order Canva Pro from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Canva Pro Yearly in Pakistan | SastaStore",
      description:
        "Buy Canva Pro yearly invite access at an affordable price from SastaStore.",
    },
  },

  {
    name: "Canva Business",
    slug: "canva-business",
    category: "design-creative",
    shortDescription: "Canva Business monthly premium access.",
    description:
      "Get Canva Business premium access with a monthly plan.",
    logo: "/products/canva-business/logo.webp",
    coverImage: "/products/canva-business/cover.webp",
    plans: [
      {
        id: "monthly",
        name: "Monthly",
        duration: "1 Month",
        price: 650,
      },
    ],
    features: [
      "Business plan",
      "Monthly access",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Canva Business from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Canva Business Subscription Pakistan | SastaStore",
      description:
        "Get Canva Business monthly access at an affordable price from SastaStore.",
    },
  },

  {
    name: "Canva Admin Panel",
    slug: "canva-admin-panel",
    category: "design-creative",
    shortDescription: "Canva Admin Panel with extended validity.",
    description:
      "Canva Admin Panel with 1-year validity and 6-month warranty.",
    logo: "/products/canva-admin-panel/logo.webp",
    coverImage: "/products/canva-admin-panel/cover.webp",
    plans: [
      {
        id: "1-year",
        name: "1 Year",
        duration: "1 Year",
        price: 2499,
      },
    ],
    features: [
      "1-year validity",
      "6-month warranty",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Includes 1-year validity and 6-month warranty.",
    whatsappMessage:
      "Hello, I want to order Canva Admin Panel from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Canva Admin Panel | SastaStore",
      description:
        "Get Canva Admin Panel with 1-year validity and 6-month warranty from SastaStore.",
    },
  },

  {
    name: "HeyGen",
    slug: "heygen",
    category: "ai-tools",
    shortDescription: "HeyGen premium package with 600 credits.",
    description:
      "Get HeyGen access with 600 credits and 25 days warranty.",
    logo: "/products/heygen/logo.webp",
    coverImage: "/products/heygen/cover.webp",
    plans: [
      {
        id: "600-credits",
        name: "600 Credits",
        price: 6500,
      },
    ],
    features: [
      "600 credits",
      "25 days warranty",
      "Digital delivery",
    ],
    availability: "available",
    featured: true,
    deliveryInfo: "Includes 25 days warranty.",
    whatsappMessage:
      "Hello, I want to order HeyGen 600 Credits from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "HeyGen 600 Credits Pakistan | SastaStore",
      description:
        "Buy HeyGen 600 credits with warranty from SastaStore.",
    },
  },

 
    {
  name: "ChatGPT Plus",
  slug: "chatgpt-plus",
  category: "ai-tools",
  shortDescription: "ChatGPT Plus private and shared access options.",
  description:
    "Choose between private monthly ChatGPT Plus access or an affordable shared option.",
  logo: "/products/chatgpt-plus/logo.png",
  coverImage: "/products/chatgpt-plus/cover.webp",
    plans: [
      {
        id: "private-monthly",
        name: "Private Monthly",
        duration: "1 Month",
        price: 4000,
      },
      {
        id: "shared",
        name: "Shared",
        price: 1000,
      },
    ],
    features: [
      "Private and shared options",
      "Premium AI access",
      "WhatsApp support",
    ],
    availability: "available",
    featured: true,
    popular: true,
    badge: "Popular",
    deliveryInfo: "Plan details will be confirmed before delivery.",
    whatsappMessage:
      "Hello, I want to order ChatGPT Plus from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "ChatGPT Plus in Pakistan | SastaStore",
      description:
        "Buy ChatGPT Plus private or shared access from SastaStore.",
    },
  },

  {
    name: "Claude Pro",
    slug: "claude-pro",
    category: "ai-tools",
    shortDescription: "Claude Pro premium AI access.",
    description:
      "Get Claude Pro premium access for advanced AI-assisted work.",
    logo: "/products/claude-pro/logo.webp",
    coverImage: "/products/claude-pro/cover.webp",
    plans: [
      {
        id: "pro",
        name: "Claude Pro",
        price: 5500,
      },
    ],
    features: [
      "Premium Claude access",
      "Digital delivery",
      "WhatsApp order support",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Claude Pro from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Claude Pro Pakistan | SastaStore",
      description:
        "Buy Claude Pro premium AI access from SastaStore.",
    },
  },

  {
    name: "Grok",
    slug: "grok",
    category: "ai-tools",
    shortDescription: "Grok paid account with monthly access.",
    description:
      "Get Grok paid account access with a monthly plan.",
    logo: "/products/grok/logo.webp",
    coverImage: "/products/grok/cover.webp",
    plans: [
      {
        id: "monthly",
        name: "Monthly",
        duration: "1 Month",
        price: 6000,
      },
    ],
    features: [
      "Monthly access",
      "Premium account",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Grok from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Grok Paid Account Pakistan | SastaStore",
      description:
        "Buy Grok paid monthly account access from SastaStore.",
    },
  },

  {
    name: "Gemini Pro",
    slug: "gemini-pro",
    category: "ai-tools",
    shortDescription: "Gemini Pro extended 18-month access.",
    description:
      "Get Gemini Pro access with an extended 18-month plan.",
    logo: "/products/gemini-pro/logo.webp",
    coverImage: "/products/gemini-pro/cover.webp",
    plans: [
      {
        id: "18-months",
        name: "18 Months",
        duration: "18 Months",
        price: 650,
      },
    ],
    features: [
      "18-month access",
      "Premium AI tools",
      "Digital delivery",
    ],
    availability: "available",
    popular: true,
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Gemini Pro from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Gemini Pro 18 Months Pakistan | SastaStore",
      description:
        "Buy Gemini Pro 18-month access at an affordable price from SastaStore.",
    },
  },

  {
    name: "Muse AI",
    slug: "muse-ai",
    category: "ai-tools",
    shortDescription: "Muse AI package with 1 billion tokens.",
    description:
      "Get Muse AI access with a 1 billion token package.",
    logo: "/products/muse-ai/logo.webp",
    coverImage: "/products/muse-ai/cover.webp",
    plans: [
      {
        id: "1-billion-tokens",
        name: "1 Billion Tokens",
        price: 1100,
      },
    ],
    features: [
      "1 billion tokens",
      "AI-powered access",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Muse AI 1 Billion Tokens from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Muse AI 1 Billion Tokens | SastaStore",
      description:
        "Buy Muse AI with 1 billion tokens from SastaStore.",
    },
  },

  {
    name: "Lovable Lite",
    slug: "lovable-lite",
    category: "productivity-business",
    shortDescription: "Lovable Lite with 12-month access.",
    description:
      "Get Lovable Lite with a full 12-month subscription.",
    logo: "/products/lovable-lite/logo.webp",
    coverImage: "/products/lovable-lite/cover.webp",
    plans: [
      {
        id: "12-months",
        name: "12 Months",
        duration: "12 Months",
        price: 3000,
      },
    ],
    features: [
      "12-month access",
      "Digital delivery",
      "WhatsApp support",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Lovable Lite from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Lovable Lite 12 Months | SastaStore",
      description:
        "Buy Lovable Lite 12-month access from SastaStore.",
    },
  },

  {
    name: "Notion",
    slug: "notion",
    category: "productivity-business",
    shortDescription: "Notion premium plans for productivity and work.",
    description:
      "Choose between Notion Business for 3 months or a 1-year Notion plan.",
    logo: "/products/notion/logo.webp",
    coverImage: "/products/notion/cover.webp",
    plans: [
      {
        id: "business-3-months",
        name: "Business - 3 Months",
        duration: "3 Months",
        price: 500,
      },
      {
        id: "1-year",
        name: "1 Year",
        duration: "1 Year",
        price: 1100,
      },
    ],
    features: [
      "Multiple plan options",
      "Productivity platform",
      "Digital delivery",
    ],
    availability: "available",
    featured: true,
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Notion from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Notion Premium Plans Pakistan | SastaStore",
      description:
        "Buy Notion Business and yearly premium plans from SastaStore.",
    },
  },

  {
    name: "Envato Core",
    slug: "envato-core",
    category: "design-creative",
    shortDescription: "Envato Core Individual premium plan.",
    description:
      "Get access to the Envato Core Individual plan.",
    logo: "/products/envato-core/logo.webp",
    coverImage: "/products/envato-core/cover.webp",
    plans: [
      {
        id: "individual",
        name: "Individual Plan",
        price: 2500,
      },
    ],
    features: [
      "Individual plan",
      "Creative resources",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Envato Core Individual Plan from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Envato Core Individual Plan | SastaStore",
      description:
        "Buy Envato Core Individual Plan from SastaStore.",
    },
  },

  {
    name: "Figma Pro Edu",
    slug: "figma-pro-edu",
    category: "design-creative",
    shortDescription: "Figma Pro Education access for 2 years.",
    description:
      "Get Figma Pro Education access with a 2-year duration.",
    logo: "/products/figma-pro-edu/logo.webp",
    coverImage: "/products/figma-pro-edu/cover.webp",
    plans: [
      {
        id: "2-years",
        name: "2 Years",
        duration: "2 Years",
        price: 2500,
      },
    ],
    features: [
      "2-year access",
      "Professional design tools",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Figma Pro Edu from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Figma Pro Edu 2 Years | SastaStore",
      description:
        "Buy Figma Pro Education access for 2 years from SastaStore.",
    },
  },

  {
    name: "Adobe Express Premium",
    slug: "adobe-express-premium",
    category: "design-creative",
    shortDescription: "Adobe Express Premium for 12 months.",
    description:
      "Get Adobe Express Premium access with a 12-month plan.",
    logo: "/products/adobe-express-premium/logo.webp",
    coverImage: "/products/adobe-express-premium/cover.webp",
    plans: [
      {
        id: "12-months",
        name: "12 Months",
        duration: "12 Months",
        price: 700,
      },
    ],
    features: [
      "12-month access",
      "Premium creative tools",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Adobe Express Premium from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Adobe Express Premium Pakistan | SastaStore",
      description:
        "Buy Adobe Express Premium 12-month access from SastaStore.",
    },
  },

  {
    name: "Grammarly Pro",
    slug: "grammarly-pro",
    category: "productivity-business",
    shortDescription: "Grammarly Pro premium writing assistance.",
    description:
      "Get Grammarly Pro for premium writing, grammar and productivity features.",
    logo: "/products/grammarly-pro/logo.webp",
    coverImage: "/products/grammarly-pro/cover.webp",
    plans: [
      {
        id: "pro",
        name: "Pro",
        price: 1300,
      },
    ],
    features: [
      "Premium writing tools",
      "Digital delivery",
      "WhatsApp support",
    ],
    availability: "available",
    popular: true,
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Grammarly Pro from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Grammarly Pro Pakistan | SastaStore",
      description:
        "Buy Grammarly Pro premium access from SastaStore.",
    },
  },

  {
    name: "Duolingo Super",
    slug: "duolingo-super",
    category: "education",
    shortDescription: "Duolingo Super with 12-month access.",
    description:
      "Get Duolingo Super premium learning access for 12 months.",
    logo: "/products/duolingo-super/logo.webp",
    coverImage: "/products/duolingo-super/cover.webp",
    plans: [
      {
        id: "12-months",
        name: "12 Months",
        duration: "12 Months",
        price: 650,
      },
    ],
    features: [
      "12-month access",
      "Premium language learning",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Duolingo Super from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Duolingo Super 12 Months Pakistan | SastaStore",
      description:
        "Buy Duolingo Super 12-month premium access from SastaStore.",
    },
  },

  {
    name: "LinkedIn Career",
    slug: "linkedin-career",
    category: "productivity-business",
    shortDescription: "LinkedIn Career premium access for 3 months.",
    description:
      "Get LinkedIn Career premium access with a 3-month plan.",
    logo: "/products/linkedin-career/logo.webp",
    coverImage: "/products/linkedin-career/cover.webp",
    plans: [
      {
        id: "3-months",
        name: "3 Months",
        duration: "3 Months",
        price: 800,
      },
    ],
    features: [
      "3-month access",
      "Career-focused premium features",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order LinkedIn Career from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "LinkedIn Career Premium Pakistan | SastaStore",
      description:
        "Buy LinkedIn Career premium 3-month access from SastaStore.",
    },
  },

  {
    name: "Coursera Premium",
    slug: "coursera-premium",
    category: "education",
    shortDescription: "Coursera Premium learning access for 1 year.",
    description:
      "Get Coursera Premium access for a full year of online learning.",
    logo: "/products/coursera-premium/logo.webp",
    coverImage: "/products/coursera-premium/cover.webp",
    plans: [
      {
        id: "1-year",
        name: "1 Year",
        duration: "1 Year",
        price: 1500,
      },
    ],
    features: [
      "1-year access",
      "Premium learning platform",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Coursera Premium from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Coursera Premium 1 Year Pakistan | SastaStore",
      description:
        "Buy Coursera Premium 1-year access from SastaStore.",
    },
  },

  {
    name: "Microsoft Office 365",
    slug: "microsoft-office-365",
    category: "productivity-business",
    shortDescription: "Microsoft Office 365 access for 1 year.",
    description:
      "Get Microsoft Office 365 with a 1-year plan.",
    logo: "/products/microsoft-office-365/logo.webp",
    coverImage: "/products/microsoft-office-365/cover.webp",
    plans: [
      {
        id: "1-year",
        name: "1 Year",
        duration: "1 Year",
        price: 500,
      },
    ],
    features: [
      "1-year access",
      "Microsoft productivity tools",
      "Digital delivery",
    ],
    availability: "available",
    popular: true,
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Microsoft Office 365 from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Microsoft Office 365 1 Year | SastaStore",
      description:
        "Buy Microsoft Office 365 1-year access from SastaStore.",
    },
  },

  {
    name: "YouTube Premium",
    slug: "youtube-premium",
    category: "entertainment",
    shortDescription: "YouTube Premium monthly subscription.",
    description:
      "Get YouTube Premium access with a 1-month plan.",
    logo: "/products/youtube-premium/logo.webp",
    coverImage: "/products/youtube-premium/cover.webp",
    plans: [
      {
        id: "1-month",
        name: "1 Month",
        duration: "1 Month",
        price: 350,
      },
    ],
    features: [
      "1-month access",
      "Premium YouTube experience",
      "Digital delivery",
    ],
    availability: "available",
    popular: true,
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order YouTube Premium from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "YouTube Premium Pakistan | SastaStore",
      description:
        "Buy YouTube Premium 1-month access from SastaStore.",
    },
  },

  {
    name: "Netflix",
    slug: "netflix",
    category: "entertainment",
    shortDescription: "Netflix 4K streaming options.",
    description:
      "Choose between a monthly single-screen option or a full 5-screen Netflix account with 4K quality.",
    logo: "/products/netflix/logo.webp",
    coverImage: "/products/netflix/cover.webp",
    plans: [
      {
        id: "single-screen-monthly",
        name: "Single Screen Monthly",
        duration: "1 Month",
        price: 350,
      },
      {
        id: "full-account-5-screens",
        name: "Full Account - 5 Screens",
        price: 1200,
      },
    ],
    features: [
      "4K quality",
      "Single-screen and full-account options",
      "Digital delivery",
    ],
    availability: "available",
    featured: true,
    popular: true,
    badge: "Popular",
    deliveryInfo: "Netflix plan details will be confirmed before delivery.",
    whatsappMessage:
      "Hello, I want to order Netflix from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Netflix 4K Subscription Pakistan | SastaStore",
      description:
        "Buy Netflix 4K single-screen or full-account options from SastaStore.",
    },
  },

  {
    name: "Amazon Prime Video",
    slug: "amazon-prime-video",
    category: "entertainment",
    shortDescription: "Amazon Prime Video monthly access.",
    description:
      "Get Amazon Prime Video streaming access with a 1-month plan.",
    logo: "/products/amazon-prime-video/logo.webp",
    coverImage: "/products/amazon-prime-video/cover.webp",
    plans: [
      {
        id: "1-month",
        name: "1 Month",
        duration: "1 Month",
        price: 350,
      },
    ],
    features: [
      "1-month access",
      "Premium streaming",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Amazon Prime Video from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Amazon Prime Video Pakistan | SastaStore",
      description:
        "Buy Amazon Prime Video 1-month access from SastaStore.",
    },
  },

  {
    name: "Spotify Premium",
    slug: "spotify-premium",
    category: "entertainment",
    shortDescription: "Spotify Premium for 3 months.",
    description:
      "Get Spotify Premium access with a 3-month subscription.",
    logo: "/products/spotify-premium/logo.webp",
    coverImage: "/products/spotify-premium/cover.webp",
    plans: [
      {
        id: "3-months",
        name: "3 Months",
        duration: "3 Months",
        price: 900,
      },
    ],
    features: [
      "3-month access",
      "Premium music streaming",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Spotify Premium from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Spotify Premium 3 Months Pakistan | SastaStore",
      description:
        "Buy Spotify Premium 3-month access from SastaStore.",
    },
  },

  {
    name: "Eleven Reader Ultra",
    slug: "eleven-reader-ultra",
    category: "ai-tools",
    shortDescription: "Eleven Reader Ultra Plan for 12 months.",
    description:
      "Get Eleven Reader Ultra premium access for a full year.",
    logo: "/products/eleven-reader-ultra/logo.webp",
    coverImage: "/products/eleven-reader-ultra/cover.webp",
    plans: [
      {
        id: "12-months",
        name: "12 Months",
        duration: "12 Months",
        price: 900,
      },
    ],
    features: [
      "12-month access",
      "Ultra plan",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Eleven Reader Ultra from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Eleven Reader Ultra 12 Months | SastaStore",
      description:
        "Buy Eleven Reader Ultra 12-month access from SastaStore.",
    },
  },

  {
    name: "NordVPN",
    slug: "nordvpn",
    category: "vpn-cloud",
    shortDescription: "NordVPN premium access for 3 months.",
    description:
      "Get NordVPN premium access with a 3-month plan.",
    logo: "/products/nordvpn/logo.webp",
    coverImage: "/products/nordvpn/cover.webp",
    plans: [
      {
        id: "3-months",
        name: "3 Months",
        duration: "3 Months",
        price: 1500,
      },
    ],
    features: [
      "3-month access",
      "VPN service",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order NordVPN from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "NordVPN 3 Months Pakistan | SastaStore",
      description:
        "Buy NordVPN 3-month premium access from SastaStore.",
    },
  },

  {
    name: "Surfshark VPN",
    slug: "surfshark-vpn",
    category: "vpn-cloud",
    shortDescription: "Surfshark VPN 2-month access options.",
    description:
      "Choose between a 2-month coupon option or a private Surfshark VPN account.",
    logo: "/products/surfshark-vpn/logo.webp",
    coverImage: "/products/surfshark-vpn/cover.webp",
    plans: [
      {
        id: "2-month-coupon",
        name: "2 Months - Coupon",
        duration: "2 Months",
        price: 900,
      },
      {
        id: "2-month-private",
        name: "2 Months - Private Account",
        duration: "2 Months",
        price: 1200,
      },
    ],
    features: [
      "Coupon and private account options",
      "2-month access",
      "VPN service",
    ],
    availability: "available",
    deliveryInfo: "Plan details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order Surfshark VPN from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Surfshark VPN Pakistan | SastaStore",
      description:
        "Buy Surfshark VPN 2-month coupon or private account options from SastaStore.",
    },
  },

  {
    name: "iCloud 2TB Slot",
    slug: "icloud-2tb-slot",
    category: "vpn-cloud",
    shortDescription: "iCloud 2TB storage slot with monthly access.",
    description:
      "Get an iCloud 2TB storage slot with a monthly plan.",
    logo: "/products/icloud-2tb-slot/logo.webp",
    coverImage: "/products/icloud-2tb-slot/cover.webp",
    plans: [
      {
        id: "monthly",
        name: "Monthly",
        duration: "1 Month",
        price: 2600,
      },
    ],
    features: [
      "2TB storage slot",
      "Monthly access",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order iCloud 2TB Slot from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "iCloud 2TB Slot Pakistan | SastaStore",
      description:
        "Buy monthly iCloud 2TB storage slot access from SastaStore.",
    },
  },

  {
    name: "TikTok UK / USA Account",
    slug: "tiktok-uk-usa-account",
    category: "accounts-services",
    shortDescription: "Fresh TikTok UK or USA account.",
    description:
      "Fresh TikTok account options for UK or USA regions.",
    logo: "/products/tiktok-account/logo.webp",
    coverImage: "/products/tiktok-account/cover.webp",
    plans: [
      {
        id: "fresh-account",
        name: "Fresh Account",
        price: 1000,
      },
    ],
    features: [
      "UK / USA options",
      "Fresh account",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Region and availability will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order a TikTok UK / USA Account from SastaStore. Please confirm availability and details.",
    seo: {
      title: "TikTok UK USA Accounts | SastaStore",
      description:
        "Order fresh TikTok UK or USA account options from SastaStore.",
    },
  },

  {
    name: "Telegram Account PVA",
    slug: "telegram-account-pva",
    category: "accounts-services",
    shortDescription: "Telegram PVA account.",
    description:
      "Telegram PVA digital account available through SastaStore.",
    logo: "/products/telegram-pva/logo.webp",
    coverImage: "/products/telegram-pva/cover.webp",
    plans: [
      {
        id: "pva",
        name: "PVA Account",
        price: 400,
      },
    ],
    features: [
      "PVA account",
      "Digital delivery",
      "WhatsApp support",
    ],
    availability: "available",
    deliveryInfo: "Account details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order a Telegram PVA Account from SastaStore. Please confirm availability and details.",
    seo: {
      title: "Telegram PVA Account | SastaStore",
      description:
        "Order Telegram PVA account access from SastaStore.",
    },
  },

  {
    name: "Outlook / Hotmail PVA",
    slug: "outlook-hotmail-pva",
    category: "accounts-services",
    shortDescription: "Outlook or Hotmail PVA account.",
    description:
      "Outlook / Hotmail PVA digital account available through SastaStore.",
    logo: "/products/outlook-hotmail-pva/logo.webp",
    coverImage: "/products/outlook-hotmail-pva/cover.webp",
    plans: [
      {
        id: "pva",
        name: "PVA Account",
        price: 99,
      },
    ],
    features: [
      "Outlook / Hotmail",
      "PVA account",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Account details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order an Outlook / Hotmail PVA Account from SastaStore. Please confirm availability and details.",
    seo: {
      title: "Outlook Hotmail PVA Account | SastaStore",
      description:
        "Order Outlook or Hotmail PVA account access from SastaStore.",
    },
  },

  {
    name: "Windows 10 Pro",
    slug: "windows-10-pro",
    category: "software-keys",
    shortDescription: "Windows 10 Pro retail activation key.",
    description:
      "Get a Windows 10 Pro retail activation key.",
    logo: "/products/windows-10-pro/logo.webp",
    coverImage: "/products/windows-10-pro/cover.webp",
    plans: [
      {
        id: "retail-key",
        name: "Retail Key",
        price: 749,
      },
    ],
    features: [
      "Windows 10 Pro",
      "Retail key",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Activation key delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order a Windows 10 Pro Retail Key from SastaStore. Please confirm availability and details.",
    seo: {
      title: "Windows 10 Pro Retail Key | SastaStore",
      description:
        "Buy Windows 10 Pro retail activation key from SastaStore.",
    },
  },

  {
    name: "Windows 11 Pro",
    slug: "windows-11-pro",
    category: "software-keys",
    shortDescription: "Windows 11 Pro lifetime activation key.",
    description:
      "Get a Windows 11 Pro lifetime activation key.",
    logo: "/products/windows-11-pro/logo.webp",
    coverImage: "/products/windows-11-pro/cover.webp",
    plans: [
      {
        id: "lifetime-key",
        name: "Lifetime Key",
        price: 1000,
      },
    ],
    features: [
      "Windows 11 Pro",
      "Lifetime key",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Activation key delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order a Windows 11 Pro Lifetime Key from SastaStore. Please confirm availability and details.",
    seo: {
      title: "Windows 11 Pro Lifetime Key | SastaStore",
      description:
        "Buy Windows 11 Pro lifetime activation key from SastaStore.",
    },
  },

  {
    name: "TikTok UK SIM",
    slug: "tiktok-uk-sim",
    category: "accounts-services",
    shortDescription: "TikTok UK SIM for live streaming use.",
    description:
      "TikTok UK SIM intended for live-streaming use.",
    logo: "/products/tiktok-uk-sim/logo.webp",
    coverImage: "/products/tiktok-uk-sim/cover.webp",
    plans: [
      {
        id: "live-streaming",
        name: "Live Streaming Only",
        price: 3000,
      },
    ],
    features: [
      "UK SIM",
      "Live-streaming use",
      "Order support through WhatsApp",
    ],
    availability: "available",
    deliveryInfo: "Availability and delivery details will be confirmed on WhatsApp.",
    whatsappMessage:
      "Hello, I want to order a TikTok UK SIM from SastaStore. Please confirm availability and details.",
    seo: {
      title: "TikTok UK SIM | SastaStore",
      description:
        "Order TikTok UK SIM for live-streaming use from SastaStore.",
    },
  },
];