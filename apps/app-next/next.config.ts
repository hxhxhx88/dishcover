import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.po$/,
      use: { loader: '@lingui/loader' },
    })

    return config
  },
  turbopack: {
    rules: {
      '*.po': { loaders: ['@lingui/loader'], as: '*.js' },
    },
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
}

export default nextConfig
