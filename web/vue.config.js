const path = require('path')

module.exports = {
  pwa: {
    name: 'Kristalian System',
    themeColor: '#364021',
    workboxPluginMode: 'GenerateSW',
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
  },
}
