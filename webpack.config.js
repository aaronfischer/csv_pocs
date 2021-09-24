const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: ['*', '.js'],
    fallback: {
      timers: require.resolve('timers-browserify'),
      stream: require.resolve('stream-browserify')
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  }
};