<template>
  <v-expansion-panels 
    tile
    accordion 
    focusable>
    <v-expansion-panel
      v-for="(item, i) in items"
      :key="i"
    >
      <v-expansion-panel-header>
         <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="2">
                <span class="subheading font-weight-bold">{{ item.name }}</span>
              </v-col>
              <v-col cols="1" v-if="item.isFinished">
                <span class="caption">{{ item.duration }}</span>
                <span class="ml-1">(s)</span>
              </v-col>
              <v-col cols="1" v-if="item.isFinished">
                <v-btn icon x-small>
                  <v-icon small>flow-icon-download</v-icon>
                </v-btn>
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

<style lang="sass" scoped>

</style>