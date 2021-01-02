const { merge } = require("webpack-merge");
const path = require("path");
const base = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  devtool: false,
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});