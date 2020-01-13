<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div>
  <step-graphic></step-graphic>
  <step-logging></step-logging>
</div>
</template>

<script>
  import actions from '@/store/actions'
  import { isStepFinished, StepWrapper } from '@/util/steps'
  import StepGraphic from '@/components/Jobs/StepGraphic'
  import StepLogging from '@/components/Jobs/StepLogging'
  import { Terminal } from 'xterm'

  export default {
    name: 'DetailTabSummary',
    components: {
      StepGraphic,
      StepLogging
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

<style lang="scss" scoped>
  .logging {
    width: 95%;
  }
  .job-summary {
    .console {
      .v-expansion-panel-content__wrap {
        padding: 0 !important;
      }
    }
  }
</style>
