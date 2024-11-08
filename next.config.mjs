/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  },
  images: {
    domains: ['ipfs.thirdwebstorage.com'],
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  onError: async (err, req, res) => {
    console.error('App Error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*'
      }
    ]
  }
};

export default nextConfig;
