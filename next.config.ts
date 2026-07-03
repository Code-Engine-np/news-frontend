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
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "risingnepaldaily.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nepalesexpress.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nepalnews.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
