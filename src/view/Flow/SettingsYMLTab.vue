<template>
  <v-card class="full-size pa-0" flat>
    <v-card-text class="editor pa-0">
      <div id="yml-editor" class="full-height"></div>
    </v-card-text>

    <v-card-actions class="px-0">
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
      flow: {
        required: true,
        type: Object
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
        yml: state => state.flows.selected.yml
      }),

      name () {
        return this.flow.name
      }
    },
    watch: {
      yml (after) {
        this.editor.setValue(after)
      },

      flow () {
        this.reload()
      }
    },
    methods: {
      reload () {
        this.$store.dispatch(actions.flows.yml.load, this.flow.name).then()
      },

      onCodeChange (e) {
        this.isCodeChange = true
      },

      onResetClick () {
        this.editor.setValue(this.yml)
        this.isCodeChange = false
      },

      onSaveClick () {
        const payload = {name: this.name, yml: this.editor.getValue()}
        this.$store.dispatch(actions.flows.yml.save, payload).then(() => {
          this.isCodeChange = false

          // reload current flow since vars may changed
          this.$store.dispatch(actions.flows.select, this.name).then()
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
