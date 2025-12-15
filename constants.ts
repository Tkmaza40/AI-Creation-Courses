export const WHATSAPP_NUMBER = "2349130587083";
export const DEFAULT_MESSAGE = "Hello, I want to order from your store.";

// Helper to generate the link
export const getWhatsAppLink = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const PRODUCTS = [
  {
    id: 'ai-bundle',
    name: 'AI Creation Masterclass',
    price: '₦15,000',
    image: 'https://picsum.photos/id/3/600/400',
    description: 'The complete step-by-step guide to creating, automating, and selling with AI. Includes Video + PDF.',
    badge: 'Best Seller'
  },
  {
    id: 'prompt-guide',
    name: 'Prompt Engineering Bible',
    price: '₦5,000',
    image: 'https://picsum.photos/id/20/600/400',
    description: 'Master ChatGPT & Midjourney with 1000+ copy-paste prompts for marketing and coding.',
    badge: null
  },
  {
    id: 'video-mastery',
    name: 'AI Video Production',
    price: '₦8,500',
    image: 'https://picsum.photos/id/26/600/400',
    description: 'Learn to create viral faceless YouTube videos using tools like HeyGen and RunwayML.',
    badge: 'Trending'
  },
  {
    id: 'mentorship',
    name: '1-on-1 Mentorship',
    price: '₦25,000',
    image: 'https://picsum.photos/id/60/600/400',
    description: 'A 60-minute private strategy call to help you launch your own digital product business.',
    badge: 'Limited Slots'
  }
];

export const CONTENT = {
  hero: {
    title: "Premium AI Digital Store",
    subtitle: "Upgrade your skills today.",
    description: "Browse our collection of high-impact AI courses, tools, and resources designed for the Nigerian market.",
    cta: "Shop All Products"
  },
  features: [
    "Step-by-step Video Tutorials",
    "Downloadable PDF Resources",
    "Verified Prompts for ChatGPT",
    "Lifetime Content Updates",
    "Private Community Access",
    "Mobile-Friendly Format"
  ],
  overview: {
    title: "Unlock the Power of AI",
    description: "Our digital products are designed to take you from beginner to pro in the fastest time possible. We cut out the fluff and focus on actionable strategies that work.",
    problem: "Finding quality, structured AI education is hard. Most content is scattered or outdated.",
    solution: "We provide comprehensive, up-to-date courses and tools verified by experts."
  },
  whyBuy: {
    title: "Why Shop With Us?",
    points: [
      {
        title: "Instant Delivery",
        desc: "Get your download link via WhatsApp immediately after payment."
      },
      {
        title: "Verified Quality",
        desc: "Courses tested and proven by 500+ students in Nigeria."
      },
      {
        title: "Support Community",
        desc: "Get access to our private student group with every purchase."
      }
    ]
  },
  footer: {
    copyright: "© 2024 AI Creation Courses. All rights reserved.",
    note: "Secure payments via Bank Transfer. Orders processed on WhatsApp."
  }
};