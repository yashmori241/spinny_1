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
  },
  turbopack: {
    root: 'C:/Users/yashm/OneDrive/Desktop/MY AI PROJECT/prototype A/spinny',
  },
} as any;

export default nextConfig;
