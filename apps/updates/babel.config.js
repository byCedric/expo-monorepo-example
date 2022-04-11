module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['@acme/babel-preset-expo'],
  };
};
