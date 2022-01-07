const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path')

const config = {
     mode: "production",
     entry: "/public/index.js",
     output: {
          path: __dirname + "/public/dist",
          filename: "bundle.js"
     },
     plugins: [
          new WebpackPwaManifest({
               fingerprints: false,
               inject: false,
               name: "PennyPinch || A precise helper bot for the save-savvy",
               short_name: "PennyPinch",
               description: "PennyPinch is a minimal, easy-to-use progressive web app for those who wish to track their spending using attractive visualizations",
               background_color: "#01579b",
               theme_color: "#000000",
               start_url: "/",
               icons: [
                    {
                         src: path.join(__dirname + "/public/icons/dollar-coin.png"),
                         sizes: "192x192",
                         type: "image/png",
                         purpose: "any maskable",
                         destination: path.join("assets", "icons")
                    },
                    {
                         src: path.join(__dirname + "/public/icons/dollar-coin-512.png"),
                         sizes: "512x512",
                         type: "image/png",
                         destination: path.join("assets", "icons")
                    }
               ]
          })
     ]
};

module.exports = config;