const path =  require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
   module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: 'babel-loader'
         }
       },
        {
         test: /\.scss$/,
         use: [{
             loader: 'style-loader'
           }, {
             loader: 'css-loader'
           }, {
             loader: 'sass-loader'
           }]
       }
     ]
   },
   plugins: [

   ],
   devServer: {
     contentBase: path.join(__dirname),
     historyApiFallback: true,
     publicPath: '/'
   }
}
