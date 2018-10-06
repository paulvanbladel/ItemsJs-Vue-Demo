module.exports = {
  outputDir: 'docs',
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/ItemsJs-Vue-Demo/'
    : '/'

  ,pluginOptions: {
    quasar: {
      theme: 'mat',
      rtlSupport: true,
      importAll: true
    }
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
  ]
}
