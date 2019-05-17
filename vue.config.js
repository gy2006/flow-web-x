module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },

  chainWebpack: config => {
    config.resolve.alias
        .set('monaco-editor', 'monaco-editor/esm/vs/editor/editor.api.js');
  },
}
