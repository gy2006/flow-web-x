const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },

  chainWebpack: config => {
    config.resolve.alias
        .set('monaco-editor', 'monaco-editor/esm/vs/editor/editor.api.js');
  },
}
