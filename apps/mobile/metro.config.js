// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');
const path = require('path');

// Generate the default Metro config for this project
const config = getDefaultConfig(__dirname);

// Use turborepo to restore the cache when possible, using the community standard `node_modules/.cache` folder
// Moving this folder within the project allows for simple cache management in CI, and is easy to reset
config.cacheStores = [
  new FileStore({ root: path.join(__dirname, 'node_modules', '.cache', 'metro') }),
];

module.exports = config;
