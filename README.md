# Best Khabar - News Portal

A modern, responsive news portal built with Next.js 16.2.9, TypeScript, and Tailwind CSS.

## Overview

Best Khabar is a production-quality news portal featuring a clean, modern UI designed for delivering the latest news and headlines to users. The application includes a hero section, multiple category sections, a sidebar with trending news and advertisements, and a newsletter signup form.

### Tech Stack

- **Next.js 16.2.9** (App Router)
- **React 19.2.4**
- **TypeScript 5.x**
- **Tailwind CSS v4**
- **ESLint 9**
- **Lucide React** (icons)
- **Geist** (font family)

## Project Structure

```
├── app/
│   ├── types/
│   │   └── index.ts              # Core domain types (NewsArticle, Category, Author, etc.)
│   ├── lib/
│   │   └── mock/
│   │       └── data.ts           # Mock data for development
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx        # Date, social links, utility links
│   │   │   ├── Header.tsx        # Logo, search, mobile menu toggle
│   │   │   ├── Navigation.tsx    # Desktop category navigation
│   │   │   ├── MobileMenu.tsx    # Mobile drawer menu
│   │   │   └── Footer.tsx        # Site footer with links
│   │   ├── ui/
│   │   │   ├── BreakingNewsBanner.tsx  # Scrolling breaking news ticker
│   │   │   ├── HeroSection.tsx   # Featured article + side articles
│   │   │   ├── CategorySection.tsx # Category news grid
│   │   │   ├── TrendingList.tsx  # Trending articles ranking
│   │   │   ├── NewsletterForm.tsx # Email subscription form
│   │   │   ├── AdvertisementBanner.tsx # Ad banner component
│   │   │   └── Sidebar.tsx       # Sidebar container
│   │   └── cards/
│   │       └── ArticleCard.tsx   # Multi-variant article card
│   ├── page.tsx                  # Main page composition
│   ├── layout.tsx                # Root layout with metadata
│   └── globals.css               # Tailwind config and custom styles
├── next.config.ts                # Next.js configuration (image domains)
├── public/
│   └── best-khabar-green1.png    # Site logo
└── package.json
```

## Completed Tasks

- [x] Create TypeScript types and interfaces (`app/types/index.ts`)
- [x] Set up mock data (`app/lib/mock/data.ts`)
- [x] Update `globals.css` with color palette and Tailwind config
- [x] Update `layout.tsx` with proper metadata and fonts
- [x] Implement `TopBar` component (date, social links, login)
- [x] Implement `Header` component (logo, search, subscribe CTA)
- [x] Implement `Navigation` component (desktop category nav)
- [x] Implement `MobileMenu` component (off-canvas drawer)
- [x] Implement `BreakingNewsBanner` component (scrolling ticker)
- [x] Implement `HeroSection` component (featured + side articles)
- [x] Implement `ArticleCard` component (default, compact, horizontal, featured variants)
- [x] Implement `CategorySection` component (category news grid)
- [x] Implement `Sidebar` components (trending, ads, newsletter, latest)
- [x] Update `Footer` component (multi-column with links)
- [x] Assemble `page.tsx` main page layout
- [x] Verify TypeScript, ESLint, and responsive layout
- [x] Configure `next.config.ts` for external image domains (Unsplash, etc.)

## Pending Tasks

### High Priority

- [ ] **Backend Integration** - Replace mock data with NestJS REST API calls (marked with `TODO` in `app/lib/mock/data.ts`)
- [ ] **Figma Design Alignment** - Refine visual design once Figma access is available
- [ ] **Article Detail Pages** - Create `/article/[slug]` dynamic routes
- [ ] **Category Pages** - Create `/category/[slug]` dynamic routes

### Medium Priority

- [ ] **Authentication** - Implement login/signup and subscription pages
- [ ] **Accessibility Improvements** - ARIA live regions, skip navigation, enhanced focus management
- [ ] **Performance** - Implement ISR (Incremental Static Regeneration) for dynamic content
- [ ] **Image Optimization** - Complete Next.js Image remote patterns configuration (partially done)
- [ ] **Search** - Implement full-text search with API integration
- [ ] **CMS Integration** - Connect to headless CMS or NestJS backend

### Low Priority

- [ ] **Testing** - Add Jest and React Testing Library unit tests
- [ ] **Storybook** - Component documentation and visual testing
- [ ] **Internationalization (i18n)** - English/Hindi language support
- [ ] **Comments** - Article comment system

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint
```

### Development

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Create a `.env.local` file with necessary environment variables
4. Run `pnpm dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000)

## Design System

### Color Palette

- **Primary (Brand)**: `#10B981` (Emerald 500)
- **Background**: `#FFFFFF` (White)
- **Background Alt**: `#F3F4F6` (Gray 100)\n### Typography

- **Font Family**: Geist, sans-serif
- **Base Size**: 16px
- **Scale**: Responsive, using Tailwind's default scale

## Quality Checks

Before committing code, ensure:

- `pnpm build` passes without errors
- `npx tsc --noEmit` has 0 TypeScript errors
- `npx eslint .` has 0 lint errors
- Layout is responsive on mobile, tablet, and desktop
- Components use semantic HTML and accessibility best practices
