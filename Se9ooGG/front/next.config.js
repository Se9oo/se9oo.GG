const dotEnv = require('dotenv-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  comperss: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    config.plugins.push(new dotEnv({ silent: true }));

    const plugins = [...config.plugins];
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});
