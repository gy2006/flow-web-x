<template>
    <MonacoEditor
      :language='language'
      :code='editor'
      :options='options'
      :highlighted='highlightLines'
      :changeThrottle='500'
      theme='vs-dark'
      @mounted='onMounted'
      @codeChange='onCodeChange'
      ref='vscode'>
    </MonacoEditor>
</template>

<script>
  import MonacoEditor from 'vue-monaco-editor'
  import Actions from '@/api/actions'
  import { mapState } from 'vuex'
  export default {
    name: 'Yml',
    components: {
      MonacoEditor
    },
    data () {
      return {
        // code: '',
        // 语言
        language: 'yaml',
        // 高亮
        highlightLines: [{number: 0, class: 'red'}],
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
          fontSize: 18
        },
        newCode: ''
      }
    },
    methods: {
      // 编辑器挂载时触发
      onMounted (editor) {
        this.$store.dispatch(Actions.Flows.Editor, editor.getValue())
      },
      // 代码发生变化时触发
      onCodeChange (editor) {
        this.$store.dispatch(Actions.Flows.Editor, editor.getValue())
      },
      // 重载编辑框
      reload () {
        let time
        clearTimeout(time)
        time = setTimeout(() => {
          this.$refs.vscode.destroyMonaco() // 销毁
          this.$refs.vscode.createMonaco() // 创建
        }, 0)
      }
    },
    computed: {
      ...mapState({
        editor: state => state.flows.editor
      })
    },
    watch: {
      editor () {
        this.reload()
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
</style>
