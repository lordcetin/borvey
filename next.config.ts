import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding','bcryptjs',);
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Maksimum 10MB olarak ayarla
    },
    optimizePackageImports: ['lodash', 'react', 'react-dom'], // Kullanılan kütüphaneleri ekleyin
  },
  swcMinify: true,
  images:{
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com'
      },
      {
        protocol: 'https',
        hostname: 's1.coincarp.com'
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc'
      },
      {
        protocol: 'https',
        hostname: 'wembleypark.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.geckoterminal.com'
      },
      {
        protocol: 'https',
        hostname: 'ton.app'
      },
      {
        protocol: 'https',
        hostname: 'aerodrome.finance'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'cryptoeccetera.com'
      },
      {
        protocol: 'https',
        hostname: 'bscscan.com'
      },
      {
        protocol: 'https',
        hostname: 'arbiscan.io'
      },
      {
        protocol: 'https',
        hostname: 'files.readme.io'
      },
      {
        protocol: 'https',
        hostname: 'tonstarter-cdn.ams3.digitaloceanspaces.com'
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com'
      },
      {
        protocol: 'https',
        hostname: 'img.cryptorank.io'
      },
      {
        protocol: 'https',
        hostname: 'seekvectors.com'
      },
      {
        protocol: 'https',
        hostname: 'dex-bin.bnbstatic.com'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
    ]
  },
  // eslint: {
  //   ignoreDuringBuilds: true, // Build sırasında eslint hatalarını yok sayar
  // },
  // typescript: {
  //   ignoreBuildErrors: true, // Build sırasında TypeScript hatalarını yok sayar
  // },
};

export default nextConfig;
