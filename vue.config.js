const proxy = {};
proxy[process.env.VUE_APP_API_URL] = {
  target: 'http://localhost:8089',
}
proxy['/profile/api/'] = {
  target: 'http://localhost:8089',
  pathRewrite: {'^/profile' : ''}
}

module.exports = {
  baseUrl: process.env.VUE_APP_BASE_URL,
  assetsDir: process.env.VUE_APP_ASSETS_URL,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    proxy,
  },
}
