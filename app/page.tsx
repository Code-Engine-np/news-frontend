import TopBar from "@/app/components/layout/TopBar";
import Header from "@/app/components/layout/Header";
import Navigation from "@/app/components/layout/Navigation";
import Footer from "@/app/components/layout/Footer";
import BreakingNewsBanner from "@/app/components/ui/BreakingNewsBanner";
import HeroSection from "@/app/components/ui/HeroSection";
import CategorySection from "@/app/components/ui/CategorySection";
import Sidebar from "@/app/components/ui/Sidebar";
import {
  MOCK_ARTICLES,
  ADVERTISEMENTS,
  CATEGORIES,
} from "@/app/lib/mock/data";

export default function Home() {
  // Filter articles for the hero section (featured articles)
  const featuredArticles = MOCK_ARTICLES.filter(
    (article) => article.isFeatured || article.isBreaking
  ).slice(0, 3);

  // Group articles by category for category sections
  const articlesByCategory = CATEGORIES.map((category) => ({
    category,
    articles: MOCK_ARTICLES.filter(
      (article) => article.category.slug === category.slug
    ),
  })).filter((group) => group.articles.length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <TopBar />

      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Breaking News Banner */}
      <BreakingNewsBanner />

      {/* Hero Section */}
      <HeroSection articles={featuredArticles} />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {articlesByCategory.slice(0, 3).map(({ category, articles }) => (
                <CategorySection
                  key={category.id}
                  title={category.name}
                  slug={category.slug}
                  articles={articles}
                />
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar
                articles={MOCK_ARTICLES}
                advertisements={ADVERTISEMENTS}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
