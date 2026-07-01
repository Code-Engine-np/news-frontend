import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
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

export const metadata: Metadata = {
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
  verification: {
    google: "", // TODO: Add Google Search Console verification code
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
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
