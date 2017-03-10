const webpack = require('webpack')
const path = require('path')

const config = {
  entry: {
    'content-scripts.js': path.resolve(__dirname, 'src', 'content-scripts', 'index.js'),
    'hooks.js': path.resolve(__dirname, 'src', 'hooks', 'index.js')
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ }
    ]
  },

  devtool: 'inline-source-map'
}

module.exports = config
