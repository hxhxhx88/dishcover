const path = require('node:path')
const { getDefaultConfig } = require('expo/metro-config')
const { withNativewind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)
const { transformer, resolver } = config

// Keep TS path aliases in tsconfig.json to pin mobile to local React types
// (avoids monorepo @types/react version conflicts), then force Metro to
// resolve runtime modules from node_modules/react instead of @types/react.
const reactRuntimeAliases = {
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
  'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime'),
}

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('@lingui/metro-transformer/expo'),
}
config.resolver = {
  ...resolver,
  sourceExts: [...resolver.sourceExts, 'po', 'pot'],
  resolveRequest(context, moduleName, platform) {
    if (moduleName in reactRuntimeAliases) {
      return context.resolveRequest(context, reactRuntimeAliases[moduleName], platform)
    }
    return context.resolveRequest(context, moduleName, platform)
  },
}

module.exports = withNativewind(config)
