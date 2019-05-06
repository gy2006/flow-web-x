const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

function addStyleResource (rule) {
  rule.use('scss-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/styles/*.scss'),
        ],
      })
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html']
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias
        .set('monaco-editor', 'monaco-editor/esm/vs/editor/editor.api.js');

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
}
