const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 8080,
          contentBase: './src',
        },
      };

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    index: './src/scripts/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name][ext]',
        },
        use: 'svgo-loader',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new StylelintPlugin({
      configFile: '.stylelintrc.json',
      fix: true,
      files: '**/*.scss',
      syntax: 'scss',
      failOnError: false,
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/index.pug',
      favicon: './src/favicon.ico',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
        },
        {
          from: 'src/manifest.json',
          to: './manifest.json',
          toType: 'file',
        },
        {
          from: 'src/scripts/service-worker.js',
          to: './service-worker.js',
          toType: 'file',
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  ...devServer(development),
});
