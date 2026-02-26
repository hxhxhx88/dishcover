import type { ConfigContext, ExpoConfig } from 'expo/config'
import { APP_NAME, APP_PACKAGE_NAME, APP_SLUG } from '@repo/metadata'

export default function config({ config: defineConfig }: ConfigContext): ExpoConfig {
  const expoConfig: ExpoConfig = {
    ...defineConfig,
    name: APP_NAME,
    slug: APP_SLUG,
    scheme: APP_SLUG,
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    platforms: ['ios', 'android'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: APP_PACKAGE_NAME,
      infoPlist: {
        // avoid manual configuration in App Store Connect before the app can be tested
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: APP_PACKAGE_NAME,
    },
    plugins: [
      [
        'expo-localization',
        { supportedLocales: ['en', 'zh'] },
      ],
      'expo-secure-store',
      ['expo-router'],
    ],
    extra: {
      eas: {
        // `EAS_BUILD_PROJECT_ID` is a build-in environment variable of EAS.
        // - https://docs.expo.dev/eas/environment-variables/usage/#built-in-environment-variables
        projectId: process.env.EAS_BUILD_PROJECT_ID,
      },
    },
  }

  return expoConfig
}
