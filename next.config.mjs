/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Generate static HTML/CSS/JS
  distDir: 'build',  // Output to 'build' directory
  images: {
    unoptimized: true  // Required for static export
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
