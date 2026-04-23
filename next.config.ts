// @ts-nocheck
import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
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
