// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');
const path = require('path');

// Create the default Expo config for Metro
// This includes the automatic monorepo configuration for workspaces
// See: https://docs.expo.dev/guides/monorepos/#automatic-configuration
const config = getDefaultConfig(__dirname);

// You can configure it manually as well, the most important parts are:
// const projectRoot = __dirname;
// const workspaceRoot = path.join(__dirname, '..', '..');
// #1 - Watch all files within the monorepo
// config.watchFolders = [workspaceRoot];
// #2 - Try resolving with project modules first, then hoisted workspace modules
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(workspaceRoot, 'node_modules'),
// ];

// Use turborepo to restore the cache when possible
config.cacheStores = [
  new FileStore({ root: path.join(__dirname, 'node_modules', '.cache', 'metro') }),
];

module.exports = config;
