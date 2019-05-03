<template>
  <div style="height: 100%; width: 100%; background: #1e1e1e;">
    <div class="text-xs-center loading" v-if="!editor">
      <v-progress-circular
          indeterminate
          color="purple"
      ></v-progress-circular>
    </div>
    <div id="editor">
    </div>
  </div>
</template>

<script>
  // import * as monaco from 'monaco-editor'

  export default {
    name: 'Yml',
    data () {
      return {
        options: {
          // 选项
          selectOnLineNumbers: false,
          roundedSelection: false,
          // 只读
          readOnly: false,
          // 光标样式
          cursorStyle: 'line',
          // 自动布局
          automaticLayout: true,
          // 字形边缘
          glyphMargin: true,
          useTabStops: false,
          // 字体大小
          fontSize: 14
        },
        newCode: ''
      }
    },
    props: {
      editor: {
        type: String,
        default: ''
      }
    },
    // mounted: function() {
    //   monaco.editor.create(document.getElementById('editor'), {
    //     value: 'console.log("Hello, world")',
    //     language: 'javascript'
    //   });
    // },
    methods: {
      // 代码发生变化时触发
      onCodeChange (editor) {
        this.$emit('onCodeChange', editor.getValue())
      }
    }
  }
</script>

<style scoped>
  #language_options {
    padding: 16px;
  }

  #language_options select {
    height: 33px;
    width: 20%;
  }

  .loading {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
