<template>
  <v-container fluid class="elevation-1 pa-2 full-height">
    <!-- header -->
    <v-layout row class="pa-1">
      <v-flex xs6 class="header">
        <h2 class="pr-4">
          <v-icon>layers</v-icon>
          {{ name }}
        </h2>
      </v-flex>
    </v-layout>

    <v-layout row fill-height class="mt-2">
      <v-flex xs12>
        <v-card height="90%">
          <v-card-title class="pb-0">
            <h4>{{ $t('flow.config_yml') }}</h4>
            <v-spacer/>
            <v-btn small color="warning" @click="onBackClick">
              <v-icon small class="mr-1">arrow_back</v-icon>
              <span>{{ $t('back') }}</span>
            </v-btn>
          </v-card-title>

          <v-card-text class="editor pb-0">
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as monaco from 'monaco-editor'
  import { mapState } from 'vuex'
  import actions from '@/store/actions'

  export default {
    name: 'FlowSettings',
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
      }),

      name () {
        return this.$route.params.id
      }
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

      onBackClick () {
        this.$router.push({path: `/flows/${this.name}/jobs`})
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

<style lang="scss" scoped>
  .editor {
    height: 75%;
  }
</style>
