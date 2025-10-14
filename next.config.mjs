/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },   // ✅ skip ESLint at build time
  // typescript: { ignoreBuildErrors: true }, // (optional) if TS ever blocks builds
};
export default nextConfig;
