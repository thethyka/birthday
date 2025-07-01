/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Consider setting to false for stricter production builds
  },
  typescript: {
    ignoreBuildErrors: false, // Set to false to ensure type safety in production
  },
  images: {
    unoptimized: false, // Set to false for production optimization
  },
}

export default nextConfig
