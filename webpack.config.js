const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = () => {
  return ({
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css/,
          use: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader' ]
          }))
        },
        {
          test: /\.styl/,
          use: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          }))
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        },
        {
          test: /\.svg/,
          use: [ 'url-loader?limit=26000&mimetype=image/svg+xml' ]
        },
        {
          test: /\.(woff|woff2|ttf|eot)/,
          use: [ 'url-loader?limit=1' ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      port: '3000',
      open: true,
      inline: true,
      hot: true,
      overlay: true,
      headers: { 'Access-Control-Allow-Origin': 'http://zhatk.loc' },
      stats: {
        version: false,
        modules: false,
        assets: false,
        hash: false
      }
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
