import { src, des } from './paths';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

export default {
  entry: {
    app: src + 'index.jsx'
  },
  output: {
    path: des,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader',
              {
                loader: 'css-loader',
                options: { minimize: false, sourceMap: false }
              }
            ],

            scss: ['vue-style-loader',
              {
                loader: 'css-loader',
                options: { minimize: false, sourceMap: false }
              },
              {
                loader: 'sass-loader',
                options: { minimize: false, sourceMap: false }
              }
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: './assets/img/[name].[ext]'
        }
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        options: {
          name: './assets/data/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: src + 'layout.html'
    })
  ]
}
