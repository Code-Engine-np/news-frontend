import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import TopBar from "./TopBar";

interface NewsShellProps {
  children: ReactNode;
  mainClassName?: string;
}

const NewsShell = ({ children, mainClassName = "" }: NewsShellProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9]">
      <TopBar />
      <Header />
      <Navigation />
      <main className={`flex-1 ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default NewsShell;
