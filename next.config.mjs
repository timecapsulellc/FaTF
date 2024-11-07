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
  }
};

export default nextConfig;
