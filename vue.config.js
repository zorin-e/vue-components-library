const path = require("path");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: isProd ? process.env.VUE_APP_BASE_URL : "/",
  lintOnSave: false,
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@tests": path.resolve(__dirname, "tests")
      }
    }
  },
  css: {
    loaderOptions: {
      css: {
        modules: {
          localIdentName: !isProd
            ? "[name]_[local]_[hash:base64:4]"
            : "cm_[hash:base64:8]"
        }
      }
    },
    requireModuleExtension: true
  }
};
