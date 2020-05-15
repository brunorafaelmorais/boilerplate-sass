const path = require('path');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const util = require('postcss-utilities');
const flexBugs = require('postcss-flexbugs-fixes');
const mqpacker = require('css-mqpacker');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'main.js'),
    path.resolve(__dirname, 'src', 'scss', 'main.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/main.bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                flexBugs(),
                util(),
                autoprefixer(),
                mqpacker(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,

              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules'],
                outputStyle: process.env.NODE_ENV === 'development'
                  ? 'expanded'
                  : 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: (url) => `../static/${url}`,
              outputPath: 'static',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader',
        ],
      },
    ],
  },
};
