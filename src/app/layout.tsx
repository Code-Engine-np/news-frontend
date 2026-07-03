import type { Metadata } from "next";
import {
  Hanken_Grotesk,
  Inter,
  Noto_Sans,
  Poppins,
  Work_Sans,
} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bestkhabar.com"),
  title: "Best Khabar - Latest News, Breaking News, Top Headlines",
  description:
    "Best Khabar brings you the latest news, breaking news, top headlines from India and around the world on politics, business, sports, entertainment, technology and more.",
  keywords: [
    "news",
    "breaking news",
    "india news",
    "latest news",
    "headlines",
    "politics",
    "business",
    "sports",
    "entertainment",
    "technology",
  ],
  authors: [{ name: "Best Khabar" }],
  openGraph: {
    title: "Best Khabar - Latest News & Headlines",
    description:
      "Best Khabar brings you the latest news, breaking news, top headlines from India and around the world.",
    url: "https://bestkhabar.com",
    siteName: "Best Khabar",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Khabar - Latest News & Headlines",
    description:
      "Best Khabar brings you the latest news, breaking news, top headlines from India and around the world.",
  },
  alternates: {
    canonical: "https://bestkhabar.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ne"
      className={`${poppins.variable} ${inter.variable} ${hankenGrotesk.variable} ${workSans.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
