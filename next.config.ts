import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SSR build (no 'export' here)
  // You can keep these two lines on to bypass lint/types during prod builds:
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
