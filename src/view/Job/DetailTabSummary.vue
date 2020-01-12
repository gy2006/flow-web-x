<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div>
  <step-graphic></step-graphic>

  <v-timeline
      align-top
      dense
      class="job-summary">

    <!-- logs -->
    <v-timeline-item
        small
        right
        v-for="(n, i) in items"
        :key="n.id"
        color=""
        :icon="n.status.icon"
    >
      <v-row class="console">
        <v-col @click="onExpand(i)">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header class="pa-1">
                <v-row>
                  <v-col cols="2">
                    <span class="subheading font-weight-bold">{{ n.name }}</span>
                  </v-col>
                  <v-col cols="1" v-if="n.isFinished">
                    <span class="caption">{{ n.duration }}</span>
                    <span class="ml-1">(s)</span>
                  </v-col>
                  <v-col cols="1" v-if="n.isFinished">
                    <v-btn icon x-small>
                      <v-icon small @click="onLogDownload(n.id)">flow-icon-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pa-1">
                <div :id="n.id + `-console`"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-col>
      </v-row>
    </v-timeline-item>
  </v-timeline>

</div>
</template>

<script>
  import actions from '@/store/actions'
  import { isStepFinished, StepWrapper } from '@/util/steps'
  import StepGraphic from '@/components/Jobs/StepGraphic'
  import { Terminal } from 'xterm'
  import { mapState } from 'vuex'

  export default {
    name: 'DetailTabSummary',
    components: {
      StepGraphic
    },
    data() {
      return {
        // key=id, value={xterm: object, expended: false, currentRow: 0}
        config: {}
      }
    },
    props: {
      steps: {
        required: true,
        type: Array
      }
    },
    computed: {
      ...mapState({
        logs: state => state.logs.items
      }),

      items() {
        const wrapperList = []

        this.steps.forEach((s, index) => {
          const stepWrapper = new StepWrapper(s, index)
          wrapperList.push(stepWrapper)
        })

        this.resetConfig(wrapperList)

        return wrapperList
      }
    },
    watch: {
      logs(after, before) {
        after.forEach((logWrapper) => {
          this.addLog(logWrapper)
        })
      }
    },
    methods: {
      resetConfig(wrapperList) {
        this.config = {}

        wrapperList.forEach((s) => {
          this.config[s.id] = {xterm: null, expended: false, currentRow: 0}
        })
      },

      onExpand(index) {
        let stepWrapper = this.items[index]
        let stepId = stepWrapper.id
        let instance = this.config[stepId].xterm
        let expanded = this.config[stepId].expended

        this.config[stepId].expended = expanded = !expanded

        if (!expanded) {
          return
        }

        if (!instance) {
          instance = new Terminal()

          instance.open(document.getElementById(stepId + '-console'))
          instance.on('scroll', (e) => {
            this.onTermScroll(stepId, e)
          })
          instance.fit()

          this.config[stepId].xterm = instance

          // load logs from server
          if (isStepFinished(stepWrapper.rawInstance)) {
            this.$store.dispatch(actions.jobs.logs.load, stepId).then()
          }
        }
      },

      onLogDownload(stepId) {
        this.$store.dispatch(actions.jobs.logs.download, stepId).then()
      },

      onTermScroll(stepId, e) {
        this.config[stepId].currentRow = e
      },

      // external: invoked by parent component
      updateStep(newStep) {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i]
          if (item.id === newStep.id) {
            this.items[i].rawStatus = newStep.status
            return
          }
        }
      },

      // external: invoked by parent component
      addLog(logWrapper) {
        let config = this.config[logWrapper.id]

        if (!config || !config.xterm) {
          return
        }

        config.xterm.writeln(logWrapper.log)
      }
    }
  }
</script>

<style lang="scss">
  .job-summary {
    .console {
      .v-expansion-panel-content__wrap {
        padding: 0 !important;
      }
    }
  }
</style>
