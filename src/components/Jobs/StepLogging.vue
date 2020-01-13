<template>
  <div class="step-logging">
    <div 
      class="root"
      v-for="(item, i) in items"
      :key="i"
      @click="onPanelClick(item)">

      <v-expansion-panels
        tile
        multiple
        accordion 
        focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <div class="status" :style="{backgroundColor: item.status.config.style.fill}"></div>

              <v-row no-gutters class="ml-4">
                <v-col cols="2">
                  <v-icon small>mdi-chevron-right</v-icon>
                  <span class="caption ml-2">{{ item.name }}</span>
                </v-col>
                <v-col cols="9">
                </v-col>
                <v-col cols="1" class="caption" v-if="item.isFinished">
                  <v-btn icon x-small @click="onLogDownload(item.id)">
                    <v-icon x-small>flow-icon-download</v-icon>
                  </v-btn>
                  
                  <span class="ml-2">{{ item.duration }}</span>
                  <span class="ml-1">s</span>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div :id="`${item.id}-terminal`" class="terminal"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import actions from '@/store/actions'
import { StepWrapper } from '@/util/steps'
import { Terminal } from 'xterm'
import { mapState } from 'vuex'

export default {
  name: 'StepLogging',
  data () {
    return {
      items: [],
      terminals: {}
    }
  },
  computed: {
    ...mapState({
      steps: state => state.steps.items,
      stepChange: state => state.steps.change,
      logs: state => state.logs.items
    }),
  },

  watch: {
    steps (after) {
      this.items.length = 0
      this.terminals = {}

      after.forEach((s, index) => {
        const wrapper = new StepWrapper(s, index)
        this.items.push(wrapper)
      })
    },

    stepChange (after) {
    
    },

    logs(after, before) {
      for (let logWrapper of after) {
        const stepId = logWrapper.id
        const terminal = this.terminals[stepId]

        if (!terminal) {
          return
        }

        terminal.writeln(logWrapper.log)
      }
    }
  },
  methods: {
    onLogDownload(stepId) {
      this.$store.dispatch(actions.jobs.logs.download, stepId).then()
    },

    onPanelClick(wrapper) {
      let t = this.terminals[wrapper.id]

      if (!t) {
        t = this.terminals[wrapper.id] = new Terminal({
          fontSize: 12,
          disableStdin: true,
          rows: 30,
          lineHeight: 1.2,
          theme: {
            background: '#333333',
            foreground: '#f5f5f5'
          }
        })

        t.open(document.getElementById(`${wrapper.id}-terminal`))

        // load logs from server
        if (wrapper.isFinished) {
          this.$store.dispatch(actions.jobs.logs.load, wrapper.id).then()
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .step-logging {
    .status {
      position: absolute;
      min-width: 10px;
      max-width: 20px;
      top: 0;
      bottom: 0;
    }

    .terminal {
      height: 450px;
    }

    .v-expansion-panels {
      border-radius: 0;
    }

    .v-expansion-panel-header {
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 1px;
      padding-right: 3px;
      min-height: 38px;
    }

    .v-expansion-panel--active 
    .v-expansion-panel-header {
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 1px;
      padding-right: 3px;
      min-height: 38px;
    }

    .v-expansion-panel-header__icon {
      display: none;
    }

    .v-expansion-panel-content__wrap {
      padding-left: 1px;
      padding-bottom: 0;
      padding-right: 0;
    }
  }
</style>