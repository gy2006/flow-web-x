<template>
  <div class="full-size">
    <div id="yml-editor" class="full-height"></div>
  </div>
</template>

<script>
  import * as monaco from 'monaco-editor'
  import { mapState } from 'vuex'
  import actions from '@/store/actions'

  export default {
    name: 'DetailTabYml',
    props: {
      flow: {
        type: String,
        required: true
      },
      buildNumber: {
        type: String,
        required: true
      }
    },
    mounted () {
      monaco.editor.create(document.getElementById('yml-editor'), {
        value: this.yml,
        language: 'yaml',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
        theme: 'vs-dark'
      })

      this.$store.dispatch(actions.jobs.getYml, {flow: this.flow, buildNumber: this.buildNumber}).then()
    },

    computed: {
      ...mapState({
        yml: state => state.jobs.yml
      })
    }
  }
</script>

<style scoped>

</style>
