/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add CDN allow-list here when needed (e.g. whif.io image hosts)
    ],
  },
  // Static-only project; no API routes, no middleware
};

export default nextConfig;
