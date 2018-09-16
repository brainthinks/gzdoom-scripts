'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = () => [
  {
    mode: 'development',
    devtool: 'source-map',
    name: 'doom',
    entry: {
      // @see - https://github.com/webpack-contrib/webpack-serve/issues/27
      doom: [path.resolve(__dirname, 'src', 'js', 'index.js')],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
            ],
            presets: [['env', { modules: false }]],
          },
        },
        {
          // Loader for the style fonts
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'url-loader',
        },
        {
          test: /\.scss$/,
          use: extractSass.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'sass-loader' },
            ],
          }),
        },
      ],
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src', 'js'),
        '~styles': path.resolve(__dirname, 'src', 'styles'),
        '~root': __dirname,
      },
    },
    plugins: [
      extractSass,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        inject: 'head',
      }),
      new WriteFilePlugin(),
    ],
  },
];