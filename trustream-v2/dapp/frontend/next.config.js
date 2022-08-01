const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId } ) {
    return {
      '/': { page: '/' },
      '/setting': { page: '/setting' },
      '/nft': { page: '/nft' },
      '/login': { page: '/login' },
      '/viewdata': { page: '/viewdata' }
    }
  },
};

module.exports = nextConfig;
