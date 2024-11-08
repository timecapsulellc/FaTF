/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  reactStrictMode: true,
  basePath: '',
  images: {
    domains: ['ipfs.thirdwebstorage.com'],
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/_next/:path*',
        },
      ],
    }
  }
};

export default nextConfig;
