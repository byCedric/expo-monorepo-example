// Learn more https://docs.expo.io/guides/customizing-metro
const { withMonorepo } = require("expo-monorepo");
const { getDefaultConfig } = require("expo/metro-config");

module.exports = withMonorepo(getDefaultConfig(__dirname));
