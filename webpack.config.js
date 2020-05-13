const path = require('path');
const autoprefixer = require('autoprefixer');
const sass = require('sass');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'main.js'),
    path.resolve(__dirname, 'src', 'scss', 'main.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'assets'),
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
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: sass,

              // See https://github.com/webpack-contrib/sass-loader/issues/804
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
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
