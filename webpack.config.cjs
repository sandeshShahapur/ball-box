const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // Your TypeScript entry point
  devtool: 'source-map', // Generate source maps for easier debugging
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname), // Output to the root directory
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Process `.ts` files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Use your existing `index.html`
      inject: 'body', // Inject scripts at the bottom to prevent DOM blocking
    }),
  ],
  mode: 'production', // Set mode to 'production' for optimized builds
};
