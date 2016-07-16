var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var config = {
  entry: {
    index: [
      'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack/hot/dev-server',
      './pages/index/index.js'
    ],
    index2: [
      'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack/hot/dev-server',
      './pages/index2/index.js'
    ]
  },
  output: {
    path: path.join(__dirname,'build'),
    filename: 'js/[name].js',
    publicPath: '/build/'
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new HtmlwebpackPlugin({
      title: '铜板街',
      filename: '../index.html',  // 相对于path的 把html文件生成项目的根目录下
      template: 'html/index.html',
      inject: true,
      hash: true,
      chunks: ['index']
      //favicon: 'images/favicon.ico'
    }),
    new HtmlwebpackPlugin({
      title: '铜板街',
      filename: '../index2.html', // 相对于path的 把html文件生成项目的根目录下
      template: 'html/index.html',
      inject: true,
      hash: true,
      chunks: ['index2']
      //favicon: 'images/favicon.ico'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx','.styl']
  },
  devtool: '#source-map',
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        include: path.join(__dirname, 'pages')
      },
      { test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!' +
            'stylus?sourceMap' + 
            'style?sourceMap'
        )
      },
      {
        test: /.(png|jpg)$/, 
        loader: 'url?limit=8192&name=img/[hash:8].[name].[ext]'
      }
    ]
  },
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback:true
  }
}
module.exports = config
