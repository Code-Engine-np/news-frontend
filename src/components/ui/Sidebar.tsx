"use client";

import TrendingList from "./TrendingList";
import NewsletterForm from "./NewsletterForm";
import { NewsArticle } from "@/src/types";

interface SidebarProps {
  articles: NewsArticle[];
}

const Sidebar = ({ articles }: SidebarProps) => {
  return (
    <aside className="space-y-6" aria-label="Sidebar">
      <TrendingList articles={articles} />
      <NewsletterForm />
    </aside>
  );
};

export default Sidebar;
