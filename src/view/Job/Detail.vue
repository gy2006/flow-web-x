<template>
  <v-card class="full-size">
    <v-card-title class="pb-1">
      <Nav
          :items="[flow, buildNumberText]"
          :links="['jobs', 'jobs/' + number]"
      ></Nav>
    </v-card-title>

    <v-card-text class="pt-1">
      <v-divider></v-divider>

      <v-layout align-center class="pa-4 grey lighten-5">
        <v-flex>
          <span>
            <v-icon small v-bind:class="[wrapper.status.class]">{{ wrapper.status.icon }}</v-icon>
            {{ wrapper.status.text }}
          </span>
        </v-flex>

        <v-flex>
          {{ wrapper.finishedAt }} / {{ wrapper.duration }} (ms)
        </v-flex>

        <v-flex>
          <div>
            <v-icon small>{{ agentIcons[wrapper.agentInfo.os] }}</v-icon>
            <span class="ml-2">{{ wrapper.agentInfo.name }}</span>
          </div>
          <div>
            <span>{{ wrapper.agentInfo.cpu }}</span>
            <span>{{ wrapper.agentInfo.memory }}</span>
          </div>
        </v-flex>

        <v-flex>
          Triggered By:
        </v-flex>

      </v-layout>

      <v-divider></v-divider>

      <v-tabs fixed-tabs>
        <v-tab href="#info" class="ml-0">
          {{ $t('job.tab.info') }}
        </v-tab>
        <v-tab href="#logs">
          {{ $t('job.tab.logs') }}
        </v-tab>

        <v-tab-item value="info">
          <detail-tab-info :wrapper="wrapper"></detail-tab-info>
        </v-tab-item>
        <v-tab-item value="logs">
          <detail-tab-logs :steps="steps" ref="stepLogs"></detail-tab-logs>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
  import actions from '@/store/actions'
  import { subscribeTopic, unsubscribeTopic } from '@/store/subscribe'

  import { isJobFinished, JobWrapper } from '@/util/jobs'
  import { icons } from '@/util/agents'
  import { isStepFinished } from '@/util/steps'
  import { mapState } from 'vuex'

  import Nav from '@/components/Common/Nav'
  import DetailTabInfo from '@/view/Job/DetailTabInfo'
  import DetailTabLogs from '@/view/Job/DetailTabLogs'

  export default {
    name: 'JobDetail',
    data () {
      return {
        agentIcons: icons
      }
    },
    components: {
      Nav,
      DetailTabInfo,
      DetailTabLogs
    },
    mounted () {
      this.load()
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
    destroyed () {
      this.$router.push({path: `/flows/${this.flow}/jobs`})

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
        this.$store.dispatch(actions.jobs.select, {flow: this.flow, buildNumber: this.number}).then()
        this.$store.dispatch(actions.jobs.steps.get, {flow: this.flow, buildNumber: this.number}).then()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
