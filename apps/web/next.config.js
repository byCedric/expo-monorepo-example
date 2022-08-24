const withTM = require('next-transpile-modules')([
  '@acme/feature-weather',
  'expo-location',
  'expo-modules-core',
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  // Add support for react-native-web
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": 'react-native-web', 
    };
    config.resolve.extensions = [
      ".web.ts",
      ".web.tsx",
      ".web.js",
      ".web.jsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
});
