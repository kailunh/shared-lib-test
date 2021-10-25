const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  devtool: false,
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 443,
    contentBase: path.join(__dirname, "dist"),
  },
  output: {
    publicPath: "https://shared-react-lib2.scm.azurewebsites.net/wwwroot/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./SharedButton": "./src/SharedButton",
      },
      remotes: {
        app1: "app1@https://shared-react-lib.scm.azurewebsites.net/wwwroot/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
