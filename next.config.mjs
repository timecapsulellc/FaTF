/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'build',
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  optimizeFonts: true,
  images: {
    domains: ['ipfs.thirdwebstorage.com'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  experimental: {
    outputFileTracingRoot: undefined
  },
  // Add assetPrefix for static files
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : ''
};

export default nextConfig;
