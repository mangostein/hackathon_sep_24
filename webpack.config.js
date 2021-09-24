const { difference } = require('lodash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackWriteStatsPlugin = require('webpack-write-stats-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`webpack running in ${NODE_ENV} mode`);

module.exports = {
  cache: true,
  context: path.resolve(__dirname, 'src/'),
  devtool: 'cheap-module-source-map', // React 16's suggestion: https://reactjs.org/docs/cross-origin-errors.html#webpack
  entry: {
    main: path.resolve(__dirname, 'src/application.js'),
    styles: path.resolve(__dirname, 'src/stylesheets/application.scss'),
  },
  output: {
    filename: 'bundle-[name].js',
    chunkFilename: 'bundle-[name].js',
    path: path.resolve(__dirname, `www`),
    // publicPath: `/app/`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(__dirname, 'src/'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src/'),
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src/stylesheets'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new WebpackWriteStatsPlugin(path.resolve(__dirname, 'config/webpack.json'), {
      chunks: false,
      modules: false,
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
  ].filter(i => i),
};
