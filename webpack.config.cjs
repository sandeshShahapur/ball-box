const path = require('path');

module.exports = {
  entry: './src/index.ts', // Your TypeScript entry point
  devtool: 'source-map', // Generate source maps for easier debugging
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true, // Clean the output directory before build
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
  mode: 'production', // Set mode to 'production' for optimized builds
};
