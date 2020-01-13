<template>
  <v-expansion-panels 
    class="step-logging"
    tile
    accordion 
    focusable>
    <v-expansion-panel
      v-for="(item, i) in items"
      :key="i"
    >
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
              <v-btn icon x-small>
                <v-icon x-small>flow-icon-download</v-icon>
              </v-btn>
              
              <span class="ml-2">{{ item.duration }}</span>
              <span class="ml-1">s</span>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div :id="item.id + `-console`"></div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { StepWrapper } from '@/util/steps'
import { Terminal } from 'xterm'
import { mapState } from 'vuex'

export default {
  name: 'StepLogging',
  data () {
    return {
      color: 'blue',
      items: []
    }
  },
  computed: {
    ...mapState({
      steps: state => state.steps.items,
      stepChange: state => state.steps.change
    }),
  },

  watch: {
    steps (after) {
      this.items.length = 0

      after.forEach((s, index) => {
        const stepWrapper = new StepWrapper(s, index)
        this.items.push(stepWrapper)
      })
    },

    stepChange (after) {
    
    }
  },
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

    .v-expansion-panel-header {
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 1px;
      padding-right: 1px;
      min-height: 38px;
    }

    .v-expansion-panel--active .v-expansion-panel-header {
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 1px;
      padding-right: 1px;
      min-height: 38px;
    }

    .v-expansion-panel-header__icon {
      display: none;
    }
  }
</style>