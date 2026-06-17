// @ts-nocheck
import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    // Admin-uploaded images live in Supabase Storage; next/image needs the
    // remote host whitelisted. Covers any Supabase project (public buckets).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/customers", destination: "/case-studies", permanent: true },
      { source: "/customers/:slug*", destination: "/case-studies/:slug*", permanent: true },
      { source: "/careers", destination: "/cgap", permanent: true },
      { source: "/careers/:path*", destination: "/cgap", permanent: true },
    ];
  },
};

export default nextConfig;
