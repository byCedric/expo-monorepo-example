const path = require('path');
const { withUnimodules } = require('@expo/webpack-config/addons');

module.exports = async ({ config }) => {
    
  config.resolve.alias = {
    "react-native$": "react-native-web",
    "@storybook/react-native$": "@storybook/react",
  };

  return withUnimodules(config, { projectRoot: path.resolve(__dirname, "../") });

};
