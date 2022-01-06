const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
     entry: {
          app: './server.js'
     },
     mode: 'development',
     module: {
          rules: [{
               exclude: /node_modules/,
               use: {
                    loader: 'babel-loader',
                    options: {
                         presets: ['@babel/preset-env'],
                    }
               }
          }]
     },
     output: {
          path: path.resolve(__dirname, 'dist')
     },
     plugins: [
          new WebpackPwaManifest({
               fingerprints: false,
               name: 'PennyPinch | A precise helper bot for the save-savvy',
               background_color: '#ffffff',
               theme_color: '#ffffff',
               start_url: '/',
               icons: [{
                    src: path.resolve('public/icons/dollar-coin.png'),
                    sizes: [192],
                    destination: path.join('public', 'icons'),
               }]
          })
     ]
}

module.exports = config;