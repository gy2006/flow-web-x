<template>
  <v-card class="full-size" flat>
    <v-card-text class="editor">
      <div id="yml-editor" class="full-height"></div>
    </v-card-text>

    <v-card-actions>
      <div class="ml-2 mr-2">
        <v-btn color="secondary" blod @click="onResetClick" :disabled="!isCodeChange">
          <b>{{ $t('reset') }}</b>
        </v-btn>
      </div>

      <div class="ml-2 mr-2">
        <v-btn color="primary" blod @click="onSaveClick" :disabled="!isCodeChange">
          <b>{{ $t('save') }}</b>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
  import * as monaco from 'monaco-editor'
  import { mapState } from 'vuex'
  import actions from '@/store/actions'

  export default {
    name: 'SettingsYMLTab',
    props: {
      name: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        editor: {},
        isCodeChange: false
      }
    },
    mounted () {
      this.editor = monaco.editor.create(document.getElementById('yml-editor'), {
        value: this.yml,
        language: 'yaml',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
        theme: 'vs-dark'
      })

      this.editor.onDidChangeModelContent(this.onCodeChange)

      this.reload()
    },
    computed: {
      ...mapState({
        yml: state => state.flows.selected.yml,
        errors: state => state.errors.items
      })
    },
    watch: {
      yml (after) {
        console.log('yml changed')
        this.editor.setValue(after)
      },

      name () {
        this.reload()
      },

      errors (after) {
        this.editor.setValue(`# ${after}`)
      }
    },
    methods: {
      reload () {
        this.$store.dispatch(actions.flows.yml.load, this.name).then()
      },

      onCodeChange (e) {
        this.isCodeChange = true
      },

      onResetClick () {
        this.editor.setValue(this.yml)
      },

      onSaveClick () {
        const payload = {name: this.name, yml: this.editor.getValue()}
        this.$store.dispatch(actions.flows.yml.save, payload).then(() => {
          this.isCodeChange = false
        })
      }
    }
  }
</script>

<style scoped>
  .editor {
    height: 90%;
  }
</style>
