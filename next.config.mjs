/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'build',
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    domains: ['ipfs.thirdwebstorage.com'],
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals = [...(config.externals || []), 'pino-pretty', 'lokijs', 'encoding'];
    return config;
  },
  experimental: {
    outputFileTracingRoot: undefined,
    outputStandalone: true
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
