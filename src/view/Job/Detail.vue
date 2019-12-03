<template>
  <div class="job-detail">
    <v-row align="center" justify="start" class="grey lighten-5">
      <v-col cols="2">
        <v-icon small
                v-bind:class="[wrapper.status.class]"
        >{{ wrapper.status.icon }}
        </v-icon>
        <span v-bind:class="[wrapper.status.class, 'ml-2']">{{ wrapper.status.text }}</span>
      </v-col>

      <v-col cols="2" class="caption">
        <div>{{ wrapper.finishedAt }} / {{ wrapper.duration }} (s)</div>
        <div>{{ wrapper.finishedAtInStr }}</div>
      </v-col>

      <v-col cols="2">
        <v-icon small>{{ agentIcons[wrapper.agentInfo.os] }}</v-icon>
        <span class="ml-2">{{ wrapper.agentInfo.name }}</span>
      </v-col>

      <v-col class="caption" cols="3">
        <div>CPU: {{ wrapper.agentInfo.cpu }} core</div>
        <div>Memory: {{ wrapper.agentInfo.freeMemory }} MB (free)/ {{ wrapper.agentInfo.totalMemory }} MB (total)
        </div>
        <div>Disk: {{ wrapper.agentInfo.freeDisk }} MB (free)/ {{ wrapper.agentInfo.totalDisk }} MB (total)</div>
      </v-col>

      <v-col class="caption" cols="2">
        <div>{{ $t('job.triggerBy') }}</div>
        <div>
          <span>{{ wrapper.triggerBy }}</span>
          <v-icon small class="ml-2">{{ wrapper.triggerIcon }}</v-icon>
        </div>
      </v-col>

      <v-col cols="1">
        <v-btn text
               color="error"
               @click="onStopClick"
               v-if="!finished"
        >
          <v-icon>mdi-stop</v-icon>
          {{ $t('cancel') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pa-0">
        <v-divider></v-divider>
        <div class="error-message" v-if="wrapper.errorMsg">
          <span class="px-5 py-1">{{ wrapper.errorMsg }}</span>
        </div>
      </v-col>
    </v-row>

    <v-row class="tab-wrapper">
      <v-col class="pa-0">
        <v-tabs fixed-tabs class="mt-2 full-size">
          <v-tab href="#summary" class="ml-0 elevation-1">
            {{ $t('job.tab.summary') }}
          </v-tab>
          <v-tab href="#context" class="elevation-1">
            {{ $t('job.tab.context') }}
          </v-tab>
          <v-tab href="#yml" class="elevation-1">
            {{ $t('job.tab.yml') }}
          </v-tab>

          <v-tab-item value="summary">
            <detail-tab-summary class="ma-2" :steps="steps" ref="stepLogs"></detail-tab-summary>
          </v-tab-item>
          <v-tab-item value="context">
            <detail-tab-context class="ma-2" :wrapper="wrapper"></detail-tab-context>
          </v-tab-item>
          <v-tab-item value="yml">
            <detail-tab-yml :flow="flow" :buildNumber="number" class="ma-2"></detail-tab-yml>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import actions from '@/store/actions'
  import { subscribeTopic, unsubscribeTopic } from '@/store/subscribe'

  import { isJobFinished, JobWrapper } from '@/util/jobs'
  import { icons } from '@/util/agents'
  import { isStepFinished } from '@/util/steps'
  import { mapState } from 'vuex'

  import DetailTabSummary from '@/view/Job/DetailTabSummary'
  import DetailTabContext from '@/view/Job/DetailTabContext'
  import DetailTabYml from '@/view/Job/DetailTabYml'

  export default {
    name: 'JobDetail',
    data () {
      return {
        agentIcons: icons
      }
    },
    components: {
      DetailTabContext,
      DetailTabSummary,
      DetailTabYml
    },
    mounted () {
      this.load()
    },
    computed: {
      ...mapState({
        job: state => state.jobs.selected,
        reports: state => state.jobs.reports,
        steps: state => state.steps.items,
        stepChange: state => state.steps.change,
      }),

      flow () {
        return this.$route.params.id
      },

      number () {
        return this.$route.params.num
      },

      wrapper () {
        return new JobWrapper(this.job)
      },

      finished () {
        return isJobFinished(this.job)
      }
    },
    destroyed () {
      unsubscribeTopic.steps(this.job.id)

      for (let i = 0; i < this.steps.length; i++) {
        unsubscribeTopic.logs(this.steps[ i ].id)
      }
    },
    watch: {
      flow () {
        this.load()
      },

      number () {
        this.load()
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
        for (let step of after) {
          if (isStepFinished(step)) {
            continue
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
    },
    methods: {
      load () {
        let payload = {flow: this.flow, buildNumber: this.number}
        this.$store.dispatch(actions.jobs.steps.get, payload).then()
        this.$store.dispatch(actions.jobs.reports.list, payload).then()
      },

      onStopClick () {
        let payload = {flow: this.flow, buildNumber: this.number}
        this.$store.dispatch(actions.jobs.cancel, payload).then()
      }
    }
  }
</script>

<style lang="scss">
  .job-detail {
    .tab-wrapper {
      height: 80%;
    }

    .tab-wrapper .v-window,
    .tab-wrapper .v-window__container,
    .tab-wrapper .v-window-item {
      height: 95%;
    }
  }
</style>
