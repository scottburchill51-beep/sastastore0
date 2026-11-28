import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    category: "ai-tools",
    shortDescription: "Premium ElevenLabs credit packages.",
    description:
      "Choose between 100k and 130k ElevenLabs credit packages according to your requirements.",
    aboutThisProduct: "ElevenLabs voice AI access with credit packages and a 3-month Creator option.",
    whatsIncluded: ["100k and 130k existing credit options","Creator: 131,000 credits per month","Advanced voice synthesis and custom voice cloning","Creator plan: 3 months and 48-hour warranty"],
    howItWorks: ["Receive the ready-account login details","Sign in and start using the available voice AI features"],
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
      {
        id: "creator-3-months",
        name: "Creator - 3 Months",
        duration: "3 Months",
        price: 2700,
        warranty: "48 hours",
        details: ["131,000 monthly credits", "Advanced voice synthesis", "Custom voice cloning", "Ready account delivery"],
      }
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
        warranty: "7 days",
      },
      {
        id: "monthly",
        name: "Monthly",
        duration: "1 Month",
        price: 750,
        warranty: "25 days",
        details: ["Individual plan", "650 credits"],
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
    aboutThisProduct: "Canva Pro access provided through an invite.",
    whatsIncluded: ["1 month, 6 months, or 1 year access","Invite-based activation"],
    howItWorks: ["Receive the Canva invite","Accept the invite and access Canva Pro"],
    logo: "/products/canva-pro/logo.webp",
    coverImage: "/products/canva-pro/cover.webp",
    plans: [
      {
        id: "1-month-invite",
        name: "1 Month Invite",
        duration: "1 Month",
        price: 150,
      },
      {
        id: "6-months-invite",
        name: "6 Months Invite",
        duration: "6 Months",
        price: 350,
      },
      {
        id: "yearly-invite",
        name: "1 Year Invite",
        duration: "1 Year",
        price: 700,
      }
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
    aboutThisProduct: "Canva Business 6-month slot delivered through an invite.",
    whatsIncluded: ["6-month Canva Business slot","Unlimited stock as described by the seller","No warranty","Coupon or invite-link delivery"],
    howItWorks: ["Receive the invite or coupon link","Follow the supplied activation instructions"],
    logo: "/products/canva-business/logo.webp",
    coverImage: "/products/canva-business/cover.webp",
    plans: [
      {
        id: "6-month-slot",
        name: "6 Month Slot",
        duration: "6 Months",
        price: 500,
      }
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
  aboutThisProduct: "Choose shared one-device access or a private ChatGPT Plus account.",
    whatsIncluded: ["Shared: sign in with your email and request the access code","Private: email, password and 2FA key provided","20-day warranty on both plans"],
    howItWorks: ["For shared access, sign in with your email and request the code","For private access, use the supplied credentials and 2FA details"],
    logo: "/products/chatgpt-plus/logo.png",
  coverImage: "/products/chatgpt-plus/cover.webp",
    plans: [
      {
        id: "shared-1-device",
        name: "Shared - 1 Device",
        duration: "Monthly",
        price: 999,
        warranty: "20 days",
        details: ["Sign in with your email", "Request the seller-provided access code"],
      },
      {
        id: "private",
        name: "Private Account",
        duration: "Monthly",
        price: 3200,
        warranty: "20 days",
        details: ["Email and password provided", "2FA key provided"],
      }
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
      {
        id: "claude-api-100-credit",
        name: "Claude API - $100 Credit",
        duration: "30 Days",
        price: 1500,
        warranty: "48 hours",
        details: ["Redeem balance using the supplied instructions", "Create an API key for compatible clients"],
      },
      {
        id: "claude-api-500-credit",
        name: "Claude API - $500 Credit",
        duration: "30 Days",
        price: 2000,
        warranty: "48 hours",
        details: ["Redeem balance using the supplied instructions", "Create an API key for compatible clients"],
      },
    ],
    aboutThisProduct: "Claude Pro access and Claude API credit options for supported API tools and integrations.",
    whatsIncluded: ["Claude Pro premium access","API credit options: $100 or $500","30-day validity for API credit plans","API plans include a 48-hour warranty","Compatible with supported API clients such as 9Router, Claude Code, Cursor and custom API integrations"],
    howItWorks: ["For Claude Pro, receive the account access details","For API credit plans, redeem the supplied balance using the provided instructions","Create and use your own API key in a supported client"],
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
    aboutThisProduct: "Grok and Cursor premium access options, including short-term and extended subscription offers.",
    whatsIncluded: ["3-day Grok + Cursor offer with 2-day warranty","12-month combined offer covering X, Grok, Cursor, Grok Build and Grok Bot","2-month offer with 2-month warranty and manual delivery within 24 hours"],
    howItWorks: ["For coupon offers, open the supplied redemption link","Check the offer and renewal terms before confirming activation","For manual delivery, allow up to 24 hours"],
    logo: "/products/grok/logo.webp",
    coverImage: "/products/grok/cover.webp",
    plans: [
      {
        id: "grok-cursor-3-days",
        name: "Grok + Cursor Premium - 3 Days",
        duration: "3 Days",
        price: 1600,
        warranty: "2 days",
        details: ["Use your own account", "Cursor cloud agents, automations, code hosting and AI code reviews"],
      },
      {
        id: "grok-premium-12-month-fw",
        name: "Grok Premium - 12 Months FW",
        duration: "12 Months",
        price: 49000,
        warranty: "12 months",
        details: ["Official coupon for eligible accounts", "Combined X, Grok, Cursor, Grok Build and Grok Bot benefits", "Review activation and renewal terms"],
      },
      {
        id: "grok-premium-2-month-fw",
        name: "Grok Premium - 2 Months FW",
        duration: "2 Months",
        price: 15000,
        warranty: "2 months",
        details: ["Manual delivery within 24 hours"],
      }
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
    aboutThisProduct: "Gemini premium access options with 6-month and 12-month plans, alongside the existing 18-month plan.",
    whatsIncluded: ["6-month option: redemption link, no card required, 400 GB storage as described","12-month option: 400 GB storage, family sharing up to 5, and 250 Flow credits monthly","12-month activation requires a payment method and India-region activation"],
    howItWorks: ["For 6 months, open the redemption link, sign in and accept the offer","For 12 months, follow the supplied region and payment setup instructions"],
    logo: "/products/gemini-pro/logo.webp",
    coverImage: "/products/gemini-pro/cover.webp",
    plans: [
      {
        id: "18-months",
        name: "18 Months",
        duration: "18 Months",
        price: 650,
      },
      {
        id: "gemini-plus-6-months",
        name: "Gemini Plus - 6 Months",
        duration: "6 Months",
        price: 700,
        details: ["Direct Google redemption link", "No payment card required", "400 GB storage as described in the offer"],
      },
      {
        id: "gemini-plus-12-months",
        name: "Gemini Plus - 12 Months",
        duration: "12 Months",
        price: 900,
        details: ["400 GB storage", "Family sharing for up to 5", "250 Flow credits monthly", "Activation requires payment method and India-region setup"],
      }
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
    aboutThisProduct: "Ready-made Muse AI account with a token package for AI content generation.",
    whatsIncluded: ["1 Billion or 5 Billion token option","Email and password provided","Mailbox access included","No card required","Instant access"],
    howItWorks: ["Receive login credentials","Sign in using a supported US or Canada IP address","Access mailbox if needed"],
    logo: "/products/muse-ai/logo.webp",
    coverImage: "/products/muse-ai/cover.webp",
    plans: [
      {
        id: "1-billion-tokens",
        name: "1 Billion Tokens",
        price: 1100,
      },
      {
        id: "5-billion-tokens",
        name: "5 Billion Tokens",
        price: 750,
        details: ["Ready-made account", "Email and password provided", "Mailbox access included", "No card required", "US or Canada IP required"],
      }
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
    name: "Lovable Pro",
    slug: "lovable-lite",
    category: "productivity-business",
    shortDescription: "Lovable Pro with monthly 50-credit and 100-credit options.",
    description:
      "Choose a 50-credit or 100-credit monthly Lovable Pro plan for building apps and websites.",
    aboutThisProduct: "Lovable Pro monthly credit plans for building apps and websites.",
    whatsIncluded: ["50 or 100 monthly credits depending on the selected plan", "5 bonus daily credits", "Custom domains", "100-credit plan removes the Lovable badge"],
    howItWorks: ["Receive the account details", "Change the supplied email and password within 30 minutes"],
    logo: "/products/lovable-lite/logo.webp",
    coverImage: "/products/lovable-lite/cover.webp",
    plans: [
      {
        id: "50-credits",
        name: "50 Credits",
        duration: "1 Month",
        price: 1200,
        details: ["50 monthly credits", "5 bonus daily credits", "Custom domains", "Build apps and websites", "Change the supplied email and password within 30 minutes"],
      },
      {
        id: "100-credits",
        name: "100 Credits",
        duration: "1 Month",
        price: 1700,
        details: ["100 monthly credits", "5 bonus daily credits", "Custom domains", "No Lovable badge", "Change the supplied email and password within 30 minutes"],
      },
    ],
    features: [
      "Monthly credit options",
      "Custom domains",
      "Digital delivery",
    ],
    availability: "available",
    deliveryInfo: "Change the supplied email and password within 30 minutes of delivery.",
    whatsappMessage:
      "Hello, I want to order Lovable Pro from SastaStore. Please confirm availability and plan details.",
    seo: {
      title: "Lovable Pro Credits | SastaStore",
      description:
        "Buy Lovable Pro monthly credit plans from SastaStore.",
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
        details: ["Ad-free learning", "Unlimited hearts", "Premium stories and offline learning", "Keep the account signed in while redeeming the offer"],
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
        details: ["12-month organization premium access", "Private access", "No warranty"],
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
        warranty: "48 hours",
        details: ["Word, Excel, PowerPoint, OneNote and Forms", "Up to 5 Windows PCs"],
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
        warranty: "20 days",
        details: ["Private ready-made account", "OTP support"],
        warranty: "20 days",
        details: ["Ad-free YouTube and YouTube Music", "Up to 1 device"],
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
    aboutThisProduct: "Netflix streaming access with shared and private account options.",
    whatsIncluded: ["Shared: seller provides an email; request a viewing code when needed","Private: ready-made account with access for up to 5 screens","25-day warranty on both plans"],
    howItWorks: ["For shared access, request the sign-in code when prompted","For private access, use the supplied account details"],
    logo: "/products/netflix/logo.webp",
    coverImage: "/products/netflix/cover.webp",
    plans: [
      {
        id: "shared",
        name: "Shared Account",
        duration: "1 Month",
        price: 350,
        warranty: "25 days",
        details: ["Seller-provided email", "Request a sign-in code when prompted"],
      },
      {
        id: "private-5-screens",
        name: "Private Account - 5 Screens",
        duration: "1 Month",
        price: 1200,
        warranty: "25 days",
        details: ["Ready-made private account", "Access for up to 5 screens"],
      }
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
        warranty: "10 days",
        details: ["Ready-made account", "Ad-free listening", "Offline playback and high sound quality"],
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
        warranty: "20 days",
        details: ["Global server access", "Compatible with major devices"],
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
        warranty: "48 hours",
        details: ["Coupon activation", "Up to 10 devices", "Global servers"],
      },
      {
        id: "2-month-private",
        name: "2 Months - Private Account",
        duration: "2 Months",
        price: 1200,
        warranty: "48 hours",
        details: ["Ready account", "Up to 10 devices", "Global servers"],
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
        details: ["UK or USA account created on demand", "Customer supplies their own email", "Estimated delivery: 10-15 minutes"],
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
    name: "Outlook Mail Account",
    slug: "outlook-hotmail-pva",
    category: "accounts-services",
    shortDescription: "Ready-made Outlook mail account with mail-reader access.",
    description:
      "Ready-made Outlook mail account with email credentials and mail-reader access. No warranty is included.",
    aboutThisProduct: "Ready-made Outlook mail account with mail-reader access.",
    whatsIncluded: ["Email credentials","Refresh token and client ID","Mail reader access","No warranty"],
    howItWorks: ["Use the supplied details with the seller-provided mail reader instructions"],
    logo: "/products/outlook-hotmail-pva/logo.webp",
    coverImage: "/products/outlook-hotmail-pva/cover.webp",
    plans: [
      {
        id: "pva-account",
        name: "Outlook Mail Account",
        price: 100,
        details: ["Email credentials", "Refresh token and client ID", "Mail reader access", "No warranty"],
      }
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
    aboutThisProduct: "Non-active UK SIM intended for streaming use, shipped to the supplied address.",
    whatsIncluded: ["Streaming-only non-active SIM","Delivery charges included in the price","Estimated delivery: 3-5 days"],
    howItWorks: ["Provide the delivery address when ordering","Receive the SIM by delivery"],
    logo: "/products/tiktok-uk-sim/logo.webp",
    coverImage: "/products/tiktok-uk-sim/cover.webp",
    plans: [
      {
        id: "live-streaming-only",
        name: "UK SIM - Streaming Only",
        duration: "Delivery in 3-5 Days",
        price: 4000,
      }
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