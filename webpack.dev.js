const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    hot: false,
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "assets/img/[name].[hash][ext]",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
});
