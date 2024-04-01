// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'common-components.js',
    library: 'CommonComponents',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for JavaScript files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use presets for ES6+ and React
          },
        },
      },
    ],
  },
};
