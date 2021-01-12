/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const { merge } = require('webpack-merge');
require('path');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.config');

module.exports = merge(base, {
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});