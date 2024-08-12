const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dirName = 'target';
const dir = path.resolve(__dirname, 'target');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  entry: {
    index: './js/index.js',
  },
  output: {
    path: dir,
    filename: '[name].[fullhash].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  experiments: {
    asyncWebAssembly: true,
  },
  performance: {
    hints: false,
    maxAssetSize: 512000, // 500 bytes
  },
  devtool: isProd ? 'cheap-source-map' : 'inline-source-map',
  devServer: {
    static: {
      directory: dir,
    },
    port: 8080,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    // ...(isProd ? [new CleanWebpackPlugin()] : []),
    new HtmlWebpackPlugin({
      template: './js/index.html',
      filename: 'index.html',
      minify: { collapseWhitespace: false },
    }),
  ],
};
