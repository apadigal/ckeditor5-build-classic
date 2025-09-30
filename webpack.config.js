'use strict';

const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'ckeditor.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'ckeditor.js',
    library: 'ClassicEditor',
    libraryTarget: 'umd'
  },
  performance: {
  	hints: false
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      // CKEditor 5 SVG icons
      {
        test: /\.svg$/,
        use: ['raw-loader']
      },
      // CKEditor 5 theme CSS
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env')({ stage: 1 })
                ]
              }
            }
          }
        ],
        include: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
      }
    ]
  },
  mode: 'production',
  devtool: 'source-map'
};
