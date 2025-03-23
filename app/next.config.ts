import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.r2cthemes.com',
        port: '',
        pathname: '/linglongv2/i/tires/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.r2cthemes.com',
        port: '',
        pathname: '/linglong/i/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.r2cthemes.com',
        port: '',
        pathname: '/Linglong/i/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.giti.com',
        port: '',
        pathname: '/Portals/0/ProductsV2/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
