<template>
  <v-card height='100%' class="ma-2">
    <v-card-title>
      <div>
        <v-icon small v-bind:class="[wrapper.status.class]">{{ wrapper.status.icon }}</v-icon>
      </div>
      <div class="font-weight-black title ml-3">
        <span>{{ this.flow }}</span>
        <span class="ml-1">#{{ this.number }}</span>
      </div>
      <v-spacer/>
      <v-btn color="orange darken-2" dark @click="onBackClick">
        <v-icon dark left>arrow_back</v-icon>
        {{ $t('back') }}
      </v-btn>
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
  import { subscribeTopic, unsubsribeTopic } from '@/store/subscribe'

  import { JobWrapper, isJobFinished } from '@/util/jobs'
  import { isStepFinished } from '@/util/steps'
  import { mapState } from 'vuex'

  import JobInfo from '@/components/Jobs/Info'
  import JobLogs from '@/components/Jobs/Logs'

  export default {
    name: 'JobDetail',
    data () {
      return {
        flow: null, // flow name
        number: null // job build number
      }
    },
    components: {
      JobInfo,
      JobLogs
    },
    mounted () {
      this.flow = this.$route.params.id
      this.number = this.$route.params.num

      this.$store.dispatch(actions.jobs.select, {flow: this.flow, buildNumber: this.number}).then()
      this.$store.dispatch(actions.jobs.steps.get, {flow: this.flow, buildNumber: this.number}).then()
    },
    computed: {
      ...mapState({
        job: state => state.jobs.selected,
        steps: state => state.steps.items,
        stepChange: state => state.steps.change
      }),
      wrapper () {
        return new JobWrapper(this.job)
      }
    },
    methods: {
      onBackClick () {
        this.$router.push({path: `/flows/${this.flow}/jobs`})

        unsubsribeTopic.steps(this.job.id)

        for (let i = 0; i < this.steps.length; i++) {
          unsubsribeTopic.logs(this.steps[i].id)
        }
      }
    },
    watch: {
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
          const step = after[i]

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
