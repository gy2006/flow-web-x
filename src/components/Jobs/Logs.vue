<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-timeline
      align-top
      dense>

    <!-- start status -->
    <v-timeline-item small color="grey" fill-dot>
      <v-layout pt-1>
        <v-flex xs10>
          <!-- empty expansion panel as placeholder -->
          <v-expansion-panel class="elevation-0" disabled>
            <v-expansion-panel-content hide-actions>
              <template v-slot:header>
                <div></div>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-timeline-item>

    <v-timeline-item
        color=""
        small
        v-for="n in items"
        :key="n.id"
        :icon="n.status.icon"
    >

      <v-layout pt-1>
        <v-flex xs10>
          <v-expansion-panel class="elevation-0">
            <v-expansion-panel-content>
              <template v-slot:header>
                <strong>{{ n.name }}</strong>
              </template>
              <v-card>
                <v-card-text>
                  <div :id="n.id + `-console`"></div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>

    </v-timeline-item>

    <!-- end status -->
    <v-timeline-item small color="grey"></v-timeline-item>
  </v-timeline>
</template>

<script>
  import { StepWrapper } from '@/util/steps'
  import { Terminal } from 'xterm'
  import { fit } from 'xterm/lib/addons/fit/fit';

  export default {
    name: 'JobDetailLogs',
    data () {
      return {}
    },
    props: {
      steps: {
        required: true,
        type: Array
      }
    },
    computed: {
      items () {
        const wrapperList = []

        this.steps.forEach((s, index) => {
          const stepWrapper = new StepWrapper(s, index)
          wrapperList.push(stepWrapper)

          let term = new Terminal()
          term.open(document.getElementById(stepWrapper.id + '-console'))
          term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
          term.fit()
        })

        return wrapperList
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
