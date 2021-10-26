const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  devtool: false,
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 3001,
    contentBase: path.join(__dirname, "dist"),
  },
  output: {
    publicPath: "http://localhost:3001/",
  },
  // devServer: {
  //   port: 443,
  //   contentBase: path.join(__dirname, "dist"),
  // },
  // output: {
  //   publicPath: "https://shared-react-lib.scm.azurewebsites.net/wwwroot/",
  // },
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
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
        "./ColorSlides": "./src/ColorSlides",
      },
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js",
        // app2: "app2@https://shared-react-lib2.scm.azurewebsites.net/wwwroot/remoteEntry.js",
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
