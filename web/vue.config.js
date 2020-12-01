module.exports = {
  pwa: {
    name: 'Kristalian System',
    themeColor: '#364021',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
}
