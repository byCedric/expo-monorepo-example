// Learn more https://docs.expo.dev/guides/monorepos
const { FileStore } = require('@expo/metro/metro-cache');
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

// Create the default Expo config for Metro
const config = getDefaultConfig(__dirname);

// Use turborepo to restore the cache when possible
config.cacheStores = [
  new FileStore({ root: path.join(__dirname, 'node_modules', '.cache', 'metro') }),
];

module.exports = config;
