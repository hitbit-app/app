/* eslint-env node */

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const svgRule = {
  test: /\.svg$/,
  exclude: /node_modules/,
  use: [
    'babel-loader',
    '@hitbit/expo-svg-transformer',
  ],
};

module.exports = async (env, argv) => {
  const expoWebpackConfig = await createExpoWebpackConfigAsync(env, argv);

  expoWebpackConfig.module.rules[1].oneOf.unshift(svgRule);

  return expoWebpackConfig;
};
