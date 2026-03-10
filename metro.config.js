const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Alias reanimated and gesture handler for web to avoid native-only imports
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    if (
      moduleName === 'react-native-reanimated' ||
      moduleName.startsWith('react-native-reanimated/')
    ) {
      return { type: 'empty' };
    }
    if (
      moduleName === 'react-native-gesture-handler' ||
      moduleName.startsWith('react-native-gesture-handler/')
    ) {
      return { type: 'empty' };
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
