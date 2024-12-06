/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'i.ytimg.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to import these Node.js modules on the client side
      config.resolve.fallback = {
        fs: false,
        'fs/promises': false,
        child_process: false,
        async_hooks: false,
        net: false,
        tls: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  transpilePackages: ['@prisma/client'],
};

export default nextConfig;
