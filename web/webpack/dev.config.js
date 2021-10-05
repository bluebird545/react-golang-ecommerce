// const common = require('./common.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.resolve(__dirname, '../');

module.exports = () => {
  return {
    // ...common,
    mode: 'development',
    // entry: [`${sourcePath}/index.js`],
    devServer: {
      compress: true,
      // contentBase: path.resolve(__dirname, '..', 'dist'),
      // static: {
      //   directory: path.resolve(__dirname, '..', 'dist'),
      // },
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      port: 3200,
    },
    resolve: {
      alias: {
        '@assets': path.resolve(root, 'src/assets'),
        '@components': path.resolve(root, 'src/components'),
        '@styles': path.resolve(root, 'src/sass'),
        '@util': path.resolve(root, 'src/util')
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  localIdentName: '[local]__[hash:base64:5]',
                  // localIdentName: '[path][name]_[local]__[hash:base64:5]',
                },
                sourceMap: process.env.NODE_ENV !== 'production',
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(root, 'src/sass')],
                  // indentedSyntax: true
                },
                prependData: '@import "global";',
              }
            },
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              // options: {
              //   name: '[name].[ext]',
              //   outputPath: 'images/',
              // },
            },
          ],
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      })
    ]
  }
};