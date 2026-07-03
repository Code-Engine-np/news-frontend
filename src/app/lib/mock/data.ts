import {
  NewsArticle,
  Category,
  Author,
  Tag,
  Advertisement,
} from "@/src/app/types";

// TODO: Replace with actual API calls to the NestJS backend

const AUTHORS: Author[] = [
  {
    id: "a1",
    name: "Ravi Sharma",
    avatar: "https://i.pravatar.cc/150?u=a1",
    slug: "ravi-sharma",
  },
  {
    id: "a2",
    name: "Priya Patel",
    avatar: "https://i.pravatar.cc/150?u=a2",
    slug: "priya-patel",
  },
  {
    id: "a3",
    name: "Amit Kumar",
    avatar: "https://i.pravatar.cc/150?u=a3",
    slug: "amit-kumar",
  },
  {
    id: "a4",
    name: "Sneha Gupta",
    avatar: "https://i.pravatar.cc/150?u=a4",
    slug: "sneha-gupta",
  },
];

const CATEGORIES: Category[] = [
  { id: "c1", name: "Politics", slug: "politics", color: "bg-blue-600" },
  { id: "c2", name: "Business", slug: "business", color: "bg-emerald-600" },
  { id: "c3", name: "Sports", slug: "sports", color: "bg-orange-500" },
  {
    id: "c4",
    name: "Entertainment",
    slug: "entertainment",
    color: "bg-pink-600",
  },
  { id: "c5", name: "Technology", slug: "technology", color: "bg-purple-600" },
  { id: "c6", name: "Health", slug: "health", color: "bg-teal-500" },
  { id: "c7", name: "World", slug: "world", color: "bg-red-600" },
  { id: "c8", name: "Local", slug: "local", color: "bg-indigo-600" },
];

const TAGS: Tag[] = [
  { id: "t1", name: "Election", slug: "election" },
  { id: "t2", name: "Budget", slug: "budget" },
  { id: "t3", name: "Cricket", slug: "cricket" },
  { id: "t4", name: "Bollywood", slug: "bollywood" },
  { id: "t5", name: "AI", slug: "ai" },
  { id: "t6", name: "Economy", slug: "economy" },
];

const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: "art1",
    title: "Federal Elections: Key Constituencies and Battlegrounds to Watch",
    slug: "federal-elections-key-constituencies-battlegrounds",
    excerpt:
      "As Nepal prepares for the upcoming polls, we break down the most crucial constituencies across the provinces that could decide the next government.",
    content: "Full content goes here...",
    featuredImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWSSrLHfoyHDfF2IyMUcEvFO4I6ToUveoWaneKwZYEg&s=10",
    category: CATEGORIES[0], // Politics
    author: AUTHORS[0],
    tags: [TAGS[0], TAGS[5]],
    publishedAt: new Date("2024-04-10T10:00:00Z").toISOString(),
    updatedAt: new Date("2024-04-10T10:00:00Z").toISOString(),
    isBreaking: true,
    isFeatured: true,
    viewCount: 12500,
    commentCount: 342,
  },
  {
    id: "art2",
    title: "NEPSE Index Hits Record High Amid New Monetary Policy Reforms",
    slug: "nepse-index-record-high-monetary-policy-reforms",
    excerpt:
      "The Nepal Stock Exchange surged to record levels today as investors cheer the central bank's latest economic relaxations.",
    content: "Full content goes here...",
    featuredImage:
      "https://risingnepaldaily.com/storage/media/58742/60f5292de6b83_nepse_up_trend.jpg",
    category: CATEGORIES[1], // Business
    author: AUTHORS[1],
    tags: [TAGS[5], TAGS[1]],
    publishedAt: new Date("2024-04-09T14:30:00Z").toISOString(),
    updatedAt: new Date("2024-04-09T14:30:00Z").toISOString(),
    isBreaking: false,
    isFeatured: true,
    viewCount: 8900,
    commentCount: 156,
  },
  {
    id: "art3",
    title:
      "T20 International: Nepal vs UAE - A Thrilling Last-Over Finish at TU Ground",
    slug: "t20i-nepal-vs-uae-last-over-finish-tu-ground",
    excerpt:
      "The Rhinos clinched a nail-biting victory against the UAE in a packed Kirtipur stadium that went right down to the final ball.",
    content: "Full content goes here...",
    featuredImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg7AYBtB7u89dZq7XJVxiJVGYgfFiWDLJdX5dNaO6vGQ&s=10",
    category: CATEGORIES[2], // Sports
    author: AUTHORS[2],
    tags: [TAGS[2]],
    publishedAt: new Date("2024-04-10T18:00:00Z").toISOString(),
    updatedAt: new Date("2024-04-10T18:00:00Z").toISOString(),
    isBreaking: true,
    isFeatured: false,
    viewCount: 22400,
    commentCount: 567,
  },
  {
    id: "art4",
    title:
      "New AI Model Developed at TU Promises Breakthrough in Medical Diagnostics",
    slug: "tu-ai-model-medical-diagnostics",
    excerpt:
      "Researchers at Tribhuvan University have developed a new AI model that can detect early signs of heart disease with 95% accuracy in rural clinics.",
    content: "Full content goes here...",
    featuredImage:
      "https://nepalesexpress.com/uploads/user/10/AIxCSfor-Nepal-69b00bb370b40.jpg",
    category: CATEGORIES[4], // Technology
    author: AUTHORS[3],
    tags: [TAGS[4]],
    publishedAt: new Date("2024-04-08T09:15:00Z").toISOString(),
    updatedAt: new Date("2024-04-08T09:15:00Z").toISOString(),
    isBreaking: false,
    isFeatured: true,
    viewCount: 6700,
    commentCount: 89,
  },
  {
    id: "art5",
    title:
      "Monsoon Predictions: Early and Above-Normal Rainfall Expected Across Nepal",
    slug: "monsoon-predictions-above-normal-rainfall-nepal",
    excerpt:
      "The Department of Hydrology and Meteorology predicts a strong monsoon this year, which is expected to boost agricultural output but poses landslide risks.",
    content: "Full content goes here...",
    featuredImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ3HMgWS5phT2cm6Q6oQ67Riwnbmlc_lyN5ymS7d2jfNHkPn0CXMV1RVN8&s=10",
    category: CATEGORIES[7], // Local
    author: AUTHORS[0],
    tags: [],
    publishedAt: new Date("2024-04-10T07:00:00Z").toISOString(),
    updatedAt: new Date("2024-04-10T07:00:00Z").toISOString(),
    isBreaking: false,
    isFeatured: false,
    viewCount: 4500,
    commentCount: 34,
  },
  {
    id: "art6",
    title: "Kollywood Star Visits Pokhara for Mountain Film Festival Premiere",
    slug: "kollywood-star-visits-pokhara-film-festival",
    excerpt:
      "A-list Nepali actor makes a surprise appearance in Pokhara, turning heads at the lakeside premiere event.",
    content: "Full content goes here...",
    featuredImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop",
    category: CATEGORIES[3], // Entertainment
    author: AUTHORS[1],
    tags: [TAGS[3]],
    publishedAt: new Date("2024-04-09T20:00:00Z").toISOString(),
    updatedAt: new Date("2024-04-09T20:00:00Z").toISOString(),
    isBreaking: false,
    isFeatured: false,
    viewCount: 11200,
    commentCount: 210,
  },
  {
    id: "art7",
    title: "Global Climate Summit: Nepal Pledges Net Zero Emissions by 2045",
    slug: "global-climate-summit-nepal-net-zero",
    excerpt:
      "At the Global Climate Summit, Nepal reaffirmed its aggressive commitment to achieving net-zero carbon emissions by 2045, citing Himalayan melting.",
    content: "Full content goes here...",
    featuredImage:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop",
    category: CATEGORIES[6], // World
    author: AUTHORS[2],
    tags: [],
    publishedAt: new Date("2024-04-07T11:00:00Z").toISOString(),
    updatedAt: new Date("2024-04-07T11:00:00Z").toISOString(),
    isBreaking: true,
    isFeatured: false,
    viewCount: 9800,
    commentCount: 178,
  },
  {
    id: "art8",
    title:
      "Expanded National Health Insurance Scheme to Cover 50 Lakh Families",
    slug: "expanded-health-insurance-scheme-nepal",
    excerpt:
      "The government announces a massive push for the Health Insurance Board program aimed at providing universal coverage to families nationwide.",
    content: "Full content goes here...",
    featuredImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8b3058c?w=800&auto=format&fit=crop",
    category: CATEGORIES[5], // Health
    author: AUTHORS[3],
    tags: [],
    publishedAt: new Date("2024-04-06T08:45:00Z").toISOString(),
    updatedAt: new Date("2024-04-06T08:45:00Z").toISOString(),
    isBreaking: false,
    isFeatured: false,
    viewCount: 3200,
    commentCount: 45,
  },
];

const BREAKING_NEWS: string[] = [
  "Lok Sabha Elections 2024: Key Battlegrounds to Watch",
  "IPL 2024: RCB vs CSK - A Thrilling Last-Over Finish",
  "Global Climate Summit: India Pledges Net Zero by 2070",
  "Stock Market Hits All-Time High Amid Economic Reforms",
];

const ADVERTISEMENTS: Advertisement[] = [
  {
    id: "ad1",
    title: "Best Khabar Premium",
    imageUrl: "https://via.placeholder.com/300x250?text=Ad+Space",
    linkUrl: "#",
    position: "sidebar",
    size: "medium",
  },
  {
    id: "ad2",
    title: "Tech Mega Sale",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ3SuvzxwlSfW3CRp8y-F3_hcZSRDMWepS5wYOC01Djw&s=10",
    linkUrl: "#",
    position: "footer",
    size: "full-width",
  },
];

export {
  AUTHORS,
  CATEGORIES,
  TAGS,
  MOCK_ARTICLES,
  BREAKING_NEWS,
  ADVERTISEMENTS,
};
