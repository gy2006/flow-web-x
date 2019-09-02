<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-timeline
      align-top
      dense>

    <!-- start status -->
    <v-timeline-item small color="grey" fill-dot>
      <v-layout pt-3>
        <v-flex xs1>
          {{ first.startAt }}
        </v-flex>
      </v-layout>
    </v-timeline-item>

    <!-- logs -->
    <v-timeline-item
        color=""
        small
        v-for="(n, i) in items"
        :key="n.id"
        :icon="n.status.icon"
    >

      <v-layout pt-1>
        <v-flex xs10 @click="onExpand(i)">
          <v-expansion-panel class="elevation-0">
            <v-expansion-panel-content>
              <template v-slot:header>
                <v-layout>
                  <v-flex xs2>
                    <span class="subheading font-weight-bold">{{ n.name }}</span>
                  </v-flex>
                  <v-flex xs1 v-if="n.isFinished">
                    <span class="caption">{{ n.duration }}</span>
                    <span class="ml-1">s</span>
                  </v-flex>
                </v-layout>
              </template>
              <v-card>
                <v-card-text>
                  <div :id="n.id + `-console`"></div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs1 v-if="n.isFinished">
          <v-icon small class="mt-3" @click="onLogDownload(n.id)">flow-icon-download</v-icon>
        </v-flex>
      </v-layout>

    </v-timeline-item>

    <!-- end status -->
    <v-timeline-item small color="grey">
      <v-layout pt-3>
        <v-flex xs1>
          {{ last.startAt }}
        </v-flex>
      </v-layout>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
  import actions from '@/store/actions'
  import { isStepFinished, StepWrapper } from '@/util/steps'
  import { Terminal } from 'xterm'
  import { mapState } from 'vuex'

  export default {
    name: 'JobDetailLogs',
    data () {
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

      items () {
        const wrapperList = []

        this.steps.forEach((s, index) => {
          const stepWrapper = new StepWrapper(s, index)
          wrapperList.push(stepWrapper)
        })

        this.resetConfig(wrapperList)

        return wrapperList
      },

      first () {
        return this.items[0]
      },

      last () {
        return this.items[this.items.length - 1]
      }
    },
    watch: {
      logs (after, before) {
        after.forEach((logWrapper) => {
          this.addLog(logWrapper)
        })
      }
    },
    methods: {
      resetConfig (wrapperList) {
        this.config = {}

        wrapperList.forEach((s) => {
          this.config[ s.id ] = {xterm: null, expended: false, currentRow: 0}
        })
      },

      onExpand (index) {
        let stepWrapper = this.items[ index ]
        let stepId = stepWrapper.id
        let instance = this.config[ stepId ].xterm
        let expanded = this.config[ stepId ].expended

        this.config[ stepId ].expended = expanded = !expanded

        if (!expanded) {
          return
        }

        if (!instance) {
          instance = new Terminal()
          instance.open(document.getElementById(stepId + '-console'))
          instance.fit()
          instance.on('scroll', (e) => {
            this.onTermScroll(stepId, e)
          })

          this.config[ stepId ].xterm = instance

          // load logs from server
          if (isStepFinished(stepWrapper.rawInstance)) {
            this.$store.dispatch(actions.jobs.logs.load, stepId).then()
          }
        }
      },

      onLogDownload (stepId) {
        this.$store.dispatch(actions.jobs.logs.download, stepId).then()
      },

      onTermScroll (stepId, e) {
        this.config[ stepId ].currentRow = e
      },

      // external: invoked by parent component
      updateStep (newStep) {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[ i ]
          if (item.id === newStep.id) {
            this.items[ i ].rawStatus = newStep.status
            return
          }
        }
      },

      // external: invoked by parent component
      addLog (logWrapper) {
        let config = this.config[ logWrapper.id ]

        if (!config || !config.xterm) {
          return
        }

        config.xterm.writeln(logWrapper.log)
      }
    }
  }
</script>

<style lang="scss">
  .v-stepper__step__step {
    .v-icon {
      color: inherit;
    }
  }
</style>
