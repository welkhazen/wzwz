import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.raw.app',
  appName: 'raW',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
  },
};

export default config;
