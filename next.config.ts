import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Domains array is kept for compatibility, but remotePatterns is preferred
    // TODO: Remove domains once remotePatterns is fully adopted in your Next.js version
    domains: ["images.unsplash.com", "i.pravatar.cc", "via.placeholder.com"],
  },
};

export default nextConfig;
