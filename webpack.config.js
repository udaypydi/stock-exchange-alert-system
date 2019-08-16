const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
      index: [
          "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
          "./src/client/index.js"
      ]
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].bundle.js',
        publicPath: '/',
        hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: '.hot/[hash].hot-update.json'
    },

    devServer: {
      port: 3000,
      open: true,
      proxy: {
        '/': 'http://localhost:8080'
      }
    },
    // loaders for loading different file extension

    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          },
          {
            test:/\.css$/,
            use:['style-loader','css-loader']
          },
          {
            test: /\.(gif|png|jpe?g|svg|ttf|woff|woff2|eot)$/i,
            use: [
              'file-loader',
              'image-webpack-loader'
            ],
          },
          {
            test: /\.html$/,
            exclude: [/node_modules/],
            use: {
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]'
                },
            },
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
        ]
    },

    resolve: {
      alias: {
        commons: path.resolve(__dirname, 'src/client/components/commons'),
        components: path.resolve(__dirname, 'src/client/components'),
        reduxconfigs: path.resolve(__dirname, 'src/client/reduxconfigs'),
        src: path.resolve(__dirname, 'src/client/')
      }
    },

    // plugins
    plugins: [
      new CleanWebpackPlugin(['public']),
      new HtmlWebpackPlugin({
        template: './template.ejs',
        title: 'Signalant',
      }),
      new HtmlWebpackRootPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new UglifyJsPlugin()
    ],
}
