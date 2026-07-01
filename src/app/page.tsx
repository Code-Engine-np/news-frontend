import TopBar from "@/src/app/components/layout/TopBar";
import Header from "@/src/app/components/layout/Header";
import Navigation from "@/src/app/components/layout/Navigation";
import Footer from "@/src/app/components/layout/Footer";
import BreakingNewsBanner from "@/src/app/components/ui/BreakingNewsBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 pb-10 pt-8 sm:px-6 lg:px-0 lg:pt-10">
          <section className="flex min-h-[128px] items-center justify-center bg-[#05a76f] px-6 py-10 text-center text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:py-12 lg:min-h-[130px] lg:py-14">
            <h1 className="text-[2.5rem] font-bold leading-none tracking-tight sm:text-6xl lg:text-[96px]">
              Advertise Here
            </h1>
          </section>

          <BreakingNewsBanner />

          <div className="min-h-[220px]" aria-hidden="true" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
