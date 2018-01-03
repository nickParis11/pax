const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR = path.resolve(__dirname, 'client/src');


module.exports = function(env ={}) {
  const dev = env.NODE_ENV === 'local';
  console.log('env in helper ',dev);

  const config = {
    //devtool: 'source-map',
    entry: `${APP_DIR}/Index.jsx`,
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          include: APP_DIR,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015'],
            plugins: ['transform-decorators-legacy', 'transform-object-rest-spread'],
          },
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192',
        },
      ],
    },
    plugins : [ 
      new UglifyJsPlugin({
        sourceMap: dev ? true : false, 
        parallel: true,
        uglifyOptions: {
         compress: false // takes 250% more memory without this for 1% gain in size, not worth the risk to fail building. 
        },
      })
    ],
  };
  if ( dev ) {
    config.devtool = 'source-map';
    devPlugins = [
      new webpack.HotModuleReplacementPlugin(),
      new WebpackBuildNotifierPlugin({
        title: 'My Project Webpack Build',
        logo: path.resolve('./img/favicon.png'),
        suppressSuccess: false,
        suppressWarning: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ]
    config.plugins = config.plugins.concat(devPlugins); 
  }
  return config;
}


