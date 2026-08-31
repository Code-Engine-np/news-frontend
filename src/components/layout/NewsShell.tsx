import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
import PopupNoticeModal from "@/src/components/ui/PopupNoticeModal";
import BackToTop from "@/src/components/ui/BackToTop";

interface NewsShellProps {
  children: ReactNode;
  mainClassName?: string;
}

const NewsShell = ({ children, mainClassName = "" }: NewsShellProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] dark:bg-[#141f1b]">
      <TopBar />
      <Header />
      <Navigation />
      <main className={`flex-1 ${mainClassName}`}>{children}</main>
      <Footer />
      <PopupNoticeModal />
      <BackToTop />
    </div>
  );
};

export default NewsShell;
