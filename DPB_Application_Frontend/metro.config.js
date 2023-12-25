const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: {sourceExts, assetExts},
} = defaultConfig;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // transformer: {
  //     babelTransformerPath: require.resolve("<transformer-package-name> like react-native-svg-transformer"),
  //   },
  resolver: {
    assetExts: assetExts.filter(ext => ['ttf', 'png'].indexOf(ext) !== -1),
    sourceExts: [...sourceExts, 'png'],
    // resolverMainFields: ["react-native", "browser", "main"],
  },
  watchFolders: [path.resolve(__dirname, '../')],
};

module.exports = mergeConfig(defaultConfig, config);
