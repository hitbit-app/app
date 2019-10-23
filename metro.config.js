const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const { resolver: defaultResolver } = await getDefaultConfig();
  const { sourceExts, assetExts } = defaultResolver;

  return {
    transformer: {
      babelTransformerPath: require.resolve('@hitbit/expo-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
