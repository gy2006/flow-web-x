<template>
  <div>
    <iframe src="http://www.baidu.com"></iframe>
  </div>
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
      }),

      fullUrl () {
        console.log(this.urlPath)
        return this.urlPath
      }
    }
  }
</script>

<style scoped>

</style>
