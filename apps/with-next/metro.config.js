// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("@expo/metro-config");
const { withMonorepo } = require("expo-monorepo");

module.exports = withMonorepo(getDefaultConfig(__dirname));
