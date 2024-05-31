const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['node-qpdf2'] = false;
    }
    return config;
  },
};

module.exports = nextConfig;
