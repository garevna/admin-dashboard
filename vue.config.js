const fs = require('fs')
const webpack = require('webpack')

const packageJson = fs.readFileSync('./package.json')
const { version, tag } = JSON.parse(packageJson)

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          GIT_TAG: `"${tag}"`,
          DEVELOPMENT_RELEASE_VERSION: `"${version}"`,
          PRODUCTION_RELEASE_VERSION: `"${tag}"`
        }
      })
    ]
  },
  transpileDependencies: [
    'vuetify'
  ]
}
