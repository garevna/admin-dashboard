// const path = require('path')

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      'crypto-browserify': require.resolve('crypto-browserify')
    }
  },
  context: require('path').resolve(__dirname),
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: require('path').resolve(__dirname, '../public'),
    filename: 'admin.worker.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
