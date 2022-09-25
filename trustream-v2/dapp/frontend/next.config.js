const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({ test: /\.woff2$/, use: 'url-loader' });
    return config;
  },
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId } ) {
    return {
      '/'         : { page: '/'         },
      '/setting'  : { page: '/setting'  },
      '/miners'   : { page: '/miners'   },
      '/nft'      : { page: '/nft'      },
      '/login'    : { page: '/login'    },
      '/viewdata' : { page: '/viewdata' },
      '/admin'    : { page: '/admin'    },
      '/staking'  : { page: '/staking'  },
    }
  },
};

module.exports = nextConfig;
