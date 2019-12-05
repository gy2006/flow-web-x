<template>
  <iframe :src="reportUrl" class="html-report"></iframe>
</template>

<script>
  import actions from '@/store/actions'
  import {mapState} from 'vuex'

  export default {
    name: 'DetailHtmlReport',
    props: {
      flow: {
        type: String,
        required: true
      },
      buildNumber: {
        type: String,
        required: true
      },
      report: {
        type: Object,
        required: true
      }
    },
    mounted() {
      let payload = {flow: this.flow, buildNumber: this.buildNumber, reportId: this.report.id}
      this.$store.dispatch(actions.jobs.reports.fetch, payload).then()
    },
    computed: {
      ...mapState({
        urlPath: state => state.jobs.reportUrlPath,
        staticBaseUrl: state => state.g.staticBaseUrl
      }),

      reportUrl() {
        return `${this.staticBaseUrl}/${this.urlPath}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .html-report {
    width: 100%;
    height: 110%;
    border-width: 0;
  }
</style>
