'use strict';

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'ckeditor.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'ckeditor.js',
    library: 'ClassicEditor',
    libraryTarget: 'umd',
    clean: true
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
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: { 'data-cke': true }
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import'),
                  require('postcss-mixins'),
                  require('postcss-nesting'),
                  require('postcss-custom-properties'),
                  require('postcss-color-function'),
                  require('postcss-discard-comments'),
                  require('postcss-preset-env')({
                    stage: 0,
                    features: {
                      'is-pseudo-class': false   // 👈 disable :is() transform
                    }
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  devtool: 'source-map'
};
