<template>
    <MonacoEditor
      language='yaml'
      :code='editor'
      theme='vs-dark'
      :options='options'
      :changeThrottle='500'
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
    props: ['readonly'],
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
        }, 2000)
      }
    },
    computed: {
      ...mapState({
        editor: state => state.flows.editor
      })
    },
    watch: {
      editor (val) {
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
