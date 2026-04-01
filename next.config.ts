import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/car-image/**',
      },
      {
        pathname: '/api/car-image',
      }
    ],
  },
};

export default nextConfig;
