const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "&features": path.resolve(__dirname, "src/features"),
      "&styled": path.resolve(__dirname, "src/styled"),
      "&config": path.resolve(__dirname, "src/config"),
      "&assets": path.resolve(__dirname, "src/assets"),
      "&store": path.resolve(__dirname, "src/store"),
      "&route": path.resolve(__dirname, "src/route"),
      "&locales": path.resolve(__dirname, "src/locales"),
      "&utils": path.resolve(__dirname, "src/utils"),
    },
  };
  return config;
};
