const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/view', 'index.tsx'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist/view'),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        }, 
      ],
    }, {
      test: /\.(t|j)sx?$/,
      options: {
        "presets": [
          "@babel/env",
          "@babel/react",
          "@babel/preset-typescript"
        ]
      },
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  }
};