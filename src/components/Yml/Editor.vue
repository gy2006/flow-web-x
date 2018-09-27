<template>
  <div style="height: 100%; width: 100%; background: #1e1e1e;">
    <div class="text-xs-center loading"  v-if="!editor">
      <v-progress-circular
      indeterminate
      color="purple"
      ></v-progress-circular>
    </div>
    <MonacoEditor
      v-if="editor"
      language='yaml'
      :code='editor'
      theme='vs-dark'
      :options='options'
      :changeThrottle='500'
      @mounted='onMounted'
      @codeChange='onCodeChange'
      ref='vscode'>
    </MonacoEditor>
  </div>
</template>

<script>
  import MonacoEditor from 'vue-monaco-editor'
  import { getYml } from '@/api/axios/api'
  import Actions from '@/api/actions'
  export default {
    name: 'Yml',
    components: {
      MonacoEditor
    },
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
        newCode: '',
        editor: ''
      }
    },
    methods: {
      onMounted (editor) {
      },
      // 代码发生变化时触发
      onCodeChange (editor) {
        this.$store.dispatch(Actions.Flows.Editor, editor.getValue())
      }
    },
    created () {
      getYml(this.$route.params.id).then(res => {
        this.editor = res.data
      }).catch(() => {
        this.editor = `envs:
  FLOW_WORKSPACE: "echo hello"
  FLOW_VERSION: "echo version"

steps:
- envs:
    FLOW_WORKSPACE: "echo step"
    FLOW_VERSION: "echo step version"
  allowFailure: true
  script: |
    echo hello

- name: step2
  allowFailure: false
  script: "echo 2"`
      })
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
