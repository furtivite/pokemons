const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@features': path.resolve(__dirname, 'src/features/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@theme': path.resolve(__dirname, 'src/theme/'),
      '@store': path.resolve(__dirname, 'src/store/'),
    }
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      serveIndex: false,
    },
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
