const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:8].js',
    // 关于chunk： https://blog.csdn.net/weixin_40851188/article/details/89888822
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      })
    ]
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      //'process.env': { 
      // NODE_ENV: JSON.stringify('production')
      //}
      //不好，会overwrite整个process.env对象，破坏进程环境，导致破坏兼容性。

      'process.env.NODE_ENV': JSON.stringify('production')
      // 这样好，不会破坏完整进程
      // https://segmentfault.com/q/1010000016988200
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false, // https://www.hongkiat.com/blog/css-shorthand-longhand-notations/
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist')
      }
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new CleanWebpackPlugin()
  ]
})
