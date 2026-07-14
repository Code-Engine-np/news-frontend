import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
import { getCategories, mapApiCategoryToCategory } from "@/src/lib/api";

interface NewsShellProps {
  children: ReactNode;
  mainClassName?: string;
}

async function getNavCategories() {
  try {
    const apiCategories = await getCategories();
    return apiCategories?.map(mapApiCategoryToCategory) ?? [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

const NewsShell = async ({ children, mainClassName = "" }: NewsShellProps) => {
  const categories = await getNavCategories();

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9]">
      <TopBar />
      <Header categories={categories} />
      <Navigation />
      <main className={`flex-1 ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default NewsShell;
