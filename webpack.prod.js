const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "assets/img/[name].[hash][ext]",
  },
  // by default when mode is set to production optimization minimizer is set to minify all javascript files but when we override it we need to specify each minimizer ourserlves
  // optimize-css-assets-webpack-plugin also minifies our css file so there is no need for optimization. This is only here for reference
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HTMLWebpackPlugin({
        template: "./src/template.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhiteSpace: true,
          removeComments: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin(),
  ],
});
