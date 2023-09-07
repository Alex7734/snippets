import type { ConfigContext, ExpoConfig } from '@expo/config';
import { ClientEnv, Env } from './env'

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: "expo-starter-kit",
  slug: "expo-starter-kit",
  scheme: "expo-starter-kit",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#F75469',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-localization',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.7.22', // this is for softinput package
        },
      },
    ],
    "expo-router"
  ],
  experiments:  {
    "tsconfigPaths": true
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
})