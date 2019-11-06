/* 
    ./webpack.config.js
*/
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const assetsPath = path.resolve('assets');
const includePaths = [
  assetsPath
];


//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ProductionModePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});
const HotModuleReplacement = new webpack.HotModuleReplacementPlugin();

module.exports = {
  mode: 'production',
  entry: {
    //vendor: ['react', 'lodash/core'],
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'babel-polyfill',
      './src/index.js'
    ],
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'sass-loader' // compiles SCSS to CSS
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.(jpg|png|svg|ico)$/,
        include: includePaths,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), 
    ProductionModePlugin, 
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /lodash\/core$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /babel-polyfill$/),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    HtmlWebpackPluginConfig, 
    HotModuleReplacement
  ]
};
