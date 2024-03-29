const WebpackPwaManifest = require("webpack-pwa-manifest");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// Configures production bundle and manifest.json output
const config = {
  mode: "production",
  entry: "./public/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  plugins: [
    new WebpackPwaManifest({
      name: "PennyPinch || A precise helper bot for the save-savvy",
      short_name: "PennyPinch",
      description:
        "PennyPinch is a minimal, easy-to-use progressive web app for those who wish to track their spending using attractive visualizations",
      background_color: "#01579b",
      theme_color: "#000000",
      start_url: "/",
      icons: [
        {
          src: path.resolve(__dirname, "public/icons/dollar-coin.png"),
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
          destination: path.join("assets", "icons"),
        },
        {
          src: path.resolve(__dirname, "public/icons/dollar-coin-512.png"),
          sizes: "512x512",
          type: "image/png",
          destination: path.join("assets", "icons"),
        },
      ],
    }),
    new HtmlWebpackPlugin({}),
  ],
};

module.exports = config;
