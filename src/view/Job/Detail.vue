<template>
  <v-card class="full-size">
    <v-card-title>
      <Nav
          :items="[flow, buildNumberText]"
          :links="['jobs', 'jobs/' + number]"
      ></Nav>
    </v-card-title>

    <v-card-text>
      <v-tabs fixed-tabs>
        <v-tab href="#info" class="ml-0">
          {{ $t('job.tab.info') }}
        </v-tab>
        <v-tab href="#logs">
          {{ $t('job.tab.logs') }}
        </v-tab>

        <v-tab-item value="info">
          <job-info :wrapper="wrapper"></job-info>
        </v-tab-item>
        <v-tab-item value="logs">
          <job-logs :steps="steps" ref="stepLogs"></job-logs>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
  import actions from '@/store/actions'
  import { subscribeTopic, unsubscribeTopic } from '@/store/subscribe'

  import { isJobFinished, JobWrapper } from '@/util/jobs'
  import { isStepFinished } from '@/util/steps'
  import { mapState } from 'vuex'

  import Nav from '@/components/Common/Nav'
  import JobInfo from '@/components/Jobs/Info'
  import JobLogs from '@/components/Jobs/Logs'

  export default {
    name: 'JobDetail',
    data () {
      return {}
    },
    components: {
      Nav,
      JobInfo,
      JobLogs
    },
    mounted () {
      this.$store.dispatch(actions.jobs.select, {flow: this.flow, buildNumber: this.number}).then()
      this.$store.dispatch(actions.jobs.steps.get, {flow: this.flow, buildNumber: this.number}).then()
    },
    computed: {
      ...mapState({
        job: state => state.jobs.selected,
        steps: state => state.steps.items,
        stepChange: state => state.steps.change
      }),

      flow () {
        return this.$route.params.id
      },

      number () {
        return this.$route.params.num
      },

      buildNumberText () {
        return 'build #' + this.$route.params.num
      },

      wrapper () {
        return new JobWrapper(this.job)
      }
    },
    methods: {
      onBackClick () {
        this.$router.push({path: `/flows/${this.flow}/jobs`})

        unsubscribeTopic.steps(this.job.id)

        for (let i = 0; i < this.steps.length; i++) {
          unsubscribeTopic.logs(this.steps[ i ].id)
        }
      }
    },
    watch: {
      flow () {
        this.$store.dispatch(actions.jobs.select, {flow: this.flow, buildNumber: this.number}).then()
        this.$store.dispatch(actions.jobs.steps.get, {flow: this.flow, buildNumber: this.number}).then()
      },

      number () {
        this.$store.dispatch(actions.jobs.select, {flow: this.flow, buildNumber: this.number}).then()
        this.$store.dispatch(actions.jobs.steps.get, {flow: this.flow, buildNumber: this.number}).then()
      },

      // subscribe steps change when job been loaded
      job (newJob, oldJob) {
        if (isJobFinished(newJob)) {
          return
        }

        subscribeTopic.steps(newJob.id, this.$store)
      },

      // subscribe logs when steps been loaded
      steps (after, before) {
        for (let i = 0; i < after.length; i++) {
          const step = after[ i ]

          if (isStepFinished(step)) {
            return
          }

          subscribeTopic.logs(step.id, (wrapper) => {
            this.$refs.stepLogs.addLog(wrapper)
          })
        }
      },

      // update step when it has been changed
      stepChange (after, before) {
        this.$refs.stepLogs.updateStep(after)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
