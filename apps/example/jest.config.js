const config = require('jest-expo/jest-preset');

/** @type {import('jest').config} */
module.exports = {
  ...config,
  // The transform ignore patterns from `jest-expo` are broken for pnpm store paths.
  // All it needs is an ending `/` to make it work, unclear why though.
  // See: https://github.com/expo/expo/pull/39605
  transformIgnorePatterns: config.transformIgnorePatterns.map((pattern) =>
    pattern.endsWith('/') ? pattern : `${pattern}/`
  ),
};
