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

      <!-- job summary bar -->
      <v-layout align-center class="px-5 py-3 grey lighten-5">
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
          <v-icon small>{{ agentIcons[wrapper.agentInfo.os] }}</v-icon>
          <span class="ml-2">{{ wrapper.agentInfo.name }}</span>
        </v-flex>

        <v-flex>
          <div>cpu: {{ wrapper.agentInfo.cpu }}</div>
          <div>{{ wrapper.agentInfo.freeMemory * 1024 }}</div>
        </v-flex>

        <v-flex>
          <span>{{ $t('job.triggerBy') }}: {{ wrapper.triggerBy }}</span>
          <v-icon small class="ml-2">{{ wrapper.triggerIcon }}</v-icon>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-tabs fixed-tabs class="mt-2 elevation-1">
        <v-tab href="#logs" class="ml-0">
          {{ $t('job.tab.logs') }}
        </v-tab>
        <v-tab href="#context">
          {{ $t('job.tab.context') }}
        </v-tab>
        <v-tab href="#yml">
          {{ $t('job.tab.yml') }}
        </v-tab>

        <v-tab-item value="logs">
          <detail-tab-logs class="ma-2" :steps="steps" ref="stepLogs"></detail-tab-logs>
        </v-tab-item>
        <v-tab-item value="context">
          <detail-tab-context class="ma-2" :wrapper="wrapper"></detail-tab-context>
        </v-tab-item>
        <v-tab-item value="yml">
          <detail-tab-yml class="ma-2"></detail-tab-yml>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
    import actions from '@/store/actions'
    import {subscribeTopic, unsubscribeTopic} from '@/store/subscribe'

    import {isJobFinished, JobWrapper} from '@/util/jobs'
    import {icons} from '@/util/agents'
    import {isStepFinished} from '@/util/steps'
    import {mapState} from 'vuex'

    import Nav from '@/components/Common/Nav'
    import DetailTabLogs from '@/view/Job/DetailTabLogs'
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
      Nav,
      DetailTabContext,
      DetailTabLogs,
      DetailTabYml
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
